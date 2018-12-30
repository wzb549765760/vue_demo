<template>
<div id="QEMain">
  <div id="allmap"></div>
  <i></i>
  <div id="qrcode" ref="qrcode">
    <span id="msg">{{msg}}</span>
  </div>
  <div id = "box" v-show="boxFlag">
      <i></i>
      <div class="boxMain">
          <div class="content">
            <span>{{merchantName}}</span>
            <span>{{consumptionAmount}}</span>
            <input type="password" v-model="password" placeholder="请输入密码" v-show="boxInputFlag">
          </div>
          <div class="bottom">
              <span @click="wsSendMsg('sure');">确认</span>
              <span @click="wsSendMsg('close');">取消</span>
          </div>
      </div>
  </div>
</div>
</template>

<script>
var eventData = "";
  export default {

    data () {
      return {
        websocket:[],
        msg:'',
        boxFlag:false,
        boxInputFlag:false,
        consumptionAmount:'',
        merchantName:'',
        password:''
      }
    },
    created(){

    },
    mounted() {
      let _self=this;

// 百度地图API功能

      let map = new BMap.Map("allmap");
      //map.centerAndZoom("上海",1);  //初始化地图,设置城市和地图级别
      let geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(function(r){
        if(this.getStatus() == BMAP_STATUS_SUCCESS){
//          locationSuccess({params:{'lng':r.point.lng,"lat":r.point.lat}});
          _self.$http.get('/plat/getQrcode',{params:{'lng':r.point.lng,"lat":r.point.lat}}).then(
            (res)=> {
                if(res.data.success)
                {
                  let qrcode = new QRCode(_self.$refs.qrcode, {
                    width : 200,//设置宽高
                    height : 200
                  });
                  qrcode.makeCode(res.data.result);
                  _self.wsUrl=_self.GLOBAL.wsUrl+"?"+_self.GLOBAL.openId;
                  _self.websoketClient();
                }else {
                  _self.msg=res.data.msg;
                }

            }, (err)=> {
            }
          )
        }
        else {
          alert('定位失败，failed'+this.getStatus());
        }
      },{enableHighAccuracy: true});
      //关于状态码
      //BMAP_STATUS_SUCCESS	检索成功。对应数值“0”。
      //BMAP_STATUS_CITY_LIST	城市列表。对应数值“1”。
      //BMAP_STATUS_UNKNOWN_LOCATION	位置结果未知。对应数值“2”。
      //BMAP_STATUS_UNKNOWN_ROUTE	导航结果未知。对应数值“3”。
      //BMAP_STATUS_INVALID_KEY	非法密钥。对应数值“4”。
      //BMAP_STATUS_INVALID_REQUEST	非法请求。对应数值“5”。
      //BMAP_STATUS_PERMISSION_DENIED	没有权限。对应数值“6”。(自 1.1 新增)
      //BMAP_STATUS_SERVICE_UNAVAILABLE	服务不可用。对应数值“7”。(自 1.1 新增)
      //BMAP_STATUS_TIMEOUT	超时。对应数值“8”。(自 1.1 新增)

    },
    methods:{
        websoketClient()
        {
            let self=this;
          //判断当前浏览器是否支持WebSocket
          if ('WebSocket' in window) {
            self.websocket = new WebSocket(self.wsUrl);
          }
          else {
            alert('当前浏览器 Not support websocket')
          }

          //连接发生错误的回调方法
//          self.websocket.onerror = function () {
//            self.msg="WebSocket连接发生错误";
//          };

          //连接成功建立的回调方法
//          self.websocket.onopen = function () {
//            self.msg="WebSocket连接成功";
//            self.wsSendMsg();
//          };

          //接收到消息的回调方法
          self.websocket.onmessage = function (event) {
            let result = JSON.parse(event.data);
            eventData = result;
              if('S'===result.respStat)
              {
                  if('KQ'===result.flag)
                  {
                    self.msg="签到成功";
                  }else{
                    //添加用户消费确认
                    if('INFM' == result.extInfo){
                     self.msg="消费成功";
                    }
                       
                    if('PERM' == result.extInfo){
                      self.boxFlag = true;
                      self.merchantName=result.merName;
                      self.consumptionAmount=parseInt(result.transAmt, 10)/100;
                    }

                    if('PSWD' == result.extInfo){
                    self.boxFlag = true;
                    self.boxInputFlag = true;
                      self.merchantName=result.merName;
                      self.consumptionAmount=parseInt(result.transAmt, 10)/100;
                    }

                    self.$http.get('/plat/getBalance').then(
                       (res)=> {
                        self.GLOBAL.amount=res.data;
                        }, (err)=> {
                       }
                     );
                  }
                setTimeout(function () {
                  self.closeWebSocket();
                  self.$router.push('/PersonalCenter')
                }, 3000)
              }else{
                self.msg="失败,请重新扫描";
              }
          };

          //连接关闭的回调方法
//          self.websocket.onclose = function () {
//            self.msg="WebSocket连接关闭";
//          }

        },
      closeWebSocket() {
        this.websocket.close();
      },
      //发送消息
       wsSendMsg(type) {
       var obj = eventData;
       if(this.boxInputFlag){//需要密码
          obj['password'] = this.password;
       }  
        if(type=='sure'){
            obj['consumPermit'] = "Y";
        }else if(type=='close'){
         this.websocket.send(JSON.stringify(obj));
            obj['consumPermit'] = "N";
            this.boxFlag = true;
            return;
        }
        this.websocket.send(JSON.stringify(obj));
     }
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='css'>
  /*@import "../assets/css/app/QRCode.css";*/
  .map {
    width: 100%;
    height: 300px;
  }

  body{
    margin: 0;
    padding: 0;
  }

  #qrcode{
    height: 200px;
    width: 200px;
    display: inline-block;
    vertical-align: middle;
    position: relative;
  }

  #QEMain{
    width: 100%;
    height:100%;
    position: fixed;
    top:0;
    left:0;
    text-align: center;
  }

  #QEMain i{
    display: inline-block;
    width: 1px;
    height:100%;
    vertical-align: middle;
  }
  #qrcode span{
    position: absolute;
    display: inline-block;
    width: 100%;
    height: 40px;
    text-align: center;
    line-height: 40px;
    bottom: -40px;
    left: 0;
    font-size: 16px;
    color: #4d4d4d;
    }

  #box{
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    top: 0;
    left: 0;
    text-align: center;
  }

  #box i{
    display: inline-block;
    width: 1px;
    height:100%;
    vertical-align: middle;
  }

  #box .boxMain{
    width: 240px;
    height: auto;
    vertical-align: middle;
    display: inline-block;
    background-color: white;
    border-radius: 8px;

  }

   #box .boxMain .content{
      height:auto;
      width:100%;
      border-bottom:1px solid #e5e5e5;
      text-align:center;
  }
  #box .boxMain .bottom{
    height:40px;
    width:100%;
    display: flex;
  }
  #box .boxMain .content span{
    width: 100%;
    height: auto;
    text-align: center;
    line-height: 25px;
    display: inline-block;
    color: #1d1d1d;
    padding: 5px 10px;
    box-sizing: border-box;
  }
  #box .boxMain .content span:first-child{
        font-size: 16px;
  }
  #box .boxMain .content span:last-child{
        font-size: 14px;
  }
  #box .boxMain .content input{
    width:100%;
    height: 40px;
    border: 0px;
    text-align:center;
    border-radius: 10px;
    outline:none;
  }

  #box .boxMain .bottom span{
   height:40px;
   flex:1;
   text-align:center;
   line-height:40px;
  }
    
  #box .boxMain .bottom span:first-child{
    border-left:1px solid #e5e5e5;
    color: #f26f21;
    box-sizing: border-box;
  }
  #box .boxMain .bottom span:last-child{
    border-left:1px solid #e5e5e5;
    color: #a4a4a4;
  }
  /*body, html,#allmap {width: 100%;height: 100%;overflow: hidden;margin:0;font-family:"微软雅黑";padding: 0;}*/
</style>
