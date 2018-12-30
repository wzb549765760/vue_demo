<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div>
    <div class="cardMain">
      <div class="cardTop">
        <div class="topLeft">{{companyName}}</div>
        <div class="topRight" @click="topRightClick()"></div>
      </div>
      <div class="cardOut" v-bind:class="{ 'hide': typeFlag}" id="showErWeiMa">
        <div class="close" id="close"></div>
        <div class="erweima" id="qrcode" ref="qrcode"></div>
        <div class="content">向收银员出示二维码以进行支付</div>
      </div>
      <div class="cardOut" id="accountImf" v-bind:class="{ 'hide': !typeFlag}">
        <div class="cardDetailTop">
          <div class="head">
            <img v-bind:src="newPicData" alt="" id="img" width="100%" style="border-radius: 106px;">
          </div>
        </div>
        <div class="contentMain">
          <div class="eng">{{name}}</div>
          <div class="eng">{{realName}}</div>
          <div class="job">
            <span>{{companyName}}</span>
            <span>{{deptName}}</span>
          </div>
          <div class="userCard">点击使用员工卡</div>
        </div>
      </div>
    </div>
    <div id="box" v-show="boxFlag" @click="hideBox()">
      <i></i>
      <div class="ts">{{msg}}</div>
      <!--<div class="boxMain">-->
      <!--<div class="content">-->
      <!--<span>{{merchantName}}</span>-->
      <!--<span>{{consumptionAmount}}</span>-->
      <!--<input type="password" v-model="password" placeholder="请输入密码" v-show="boxInputFlag">-->
      <!--</div>-->
      <!--<div class="bottom">-->
      <!--<span @click="wsSendMsg('sure');">确认</span>-->
      <!--<span @click="wsSendMsg('close');">取消</span>-->
      <!--</div>-->
      <!--</div>-->
    </div>

  </div>
</template>

<script>
  var clickFlag = true;
  var eventData = "";
  export default {
    data () {
      return {
        name: this.GLOBAL.name,
        realName: this.GLOBAL.realName,
        companyName: this.GLOBAL.companyName,
        deptName: this.GLOBAL.deptName,
        msg: '',
        boxFlag: false,
        boxInputFlag: false,
        consumptionAmount: '',
        merchantName: '',
        password: '',
        accountName: this.GLOBAL.name,
        newPicData: this.GLOBAL.picData,
        typeFlag: ""
      }
    },
    created(){
      if ("QRCode" === this.$route.params.type) {
        this.typeFlag = false;
      } else {
        this.typeFlag = true;
      }

    },
    mounted() {
      if (!this.typeFlag) {
        this.createQrcode();
      }
      this.showErwer();

    },
    methods: {

      websoketClient()
      {
        let self = this;
        //判断当前浏览器是否支持WebSocket
        if ('WebSocket' in window) {
          self.websocket = new WebSocket(self.wsUrl);
        }
        else {
          alert('当前浏览器 Not support websocket')
        }

        //连接发生错误的回调方法
//        self.websocket.onerror = function () {
////            self.msg="WebSocket连接发生错误";
//          console.log("WebSocket连接发生错误");
//        };
//
//        // 连接成功建立的回调方法
//        self.websocket.onopen = function () {
////            self.msg="WebSocket连接成功";
//          console.log("WebSocket连接成功");
////            self.wsSendMsg();
//        };

        //接收到消息的回调方法
        self.websocket.onmessage = function (event) {
          let result = JSON.parse(event.data);
          eventData = result;
          var flag = false;
          if ('KQ' === result.flag) {
            if ('S' === result.respStat) {
              self.msg = "签到成功";
              self.boxFlag = true;
            } else {
              self.msg = "签到失败";
              self.boxFlag = true;
              flag = true;
            }
          } else {
            //添加用户消费确认
            if ('INFM' == result.extInfo) {
              if ('S' === result.respStat) {
                self.msg = "消费成功";
                self.boxFlag = true;
                self.$http.get('/plat/getBalance').then(
                  (res) => {
                    self.GLOBAL.amount = res.data;
                  }, (err) => {
                  }
                );
              } else {
                self.msg = "消费失败";
                self.boxFlag = true;
                flag = true;
              }
            }
//
//            if ('PERM' == result.extInfo) {
//              self.boxFlag = true;
//              self.merchantName = result.merName;
//              self.consumptionAmount = parseInt(result.transAmt, 10) / 100;
//            }
//
//            if ('PSWD' == result.extInfo) {
//              self.boxFlag = true;
//              self.boxInputFlag = true;
//              self.merchantName = result.merName;
//              self.consumptionAmount = parseInt(result.transAmt, 10) / 100;
//            }


          }
          if (flag) {
            setTimeout(function () {
              self.boxFlag = false;
            }, 3000);
          } else {
            setTimeout(function () {
              self.closeWebSocket();
              self.$router.push('/PersonalCenter')
            }, 3000);
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
      hideBox(){
        this.boxFlag = false;
      },
      //发送消息
      wsSendMsg(type) {
        var obj = eventData;
        if (this.boxInputFlag) {//需要密码
          obj['password'] = this.password;
        }
        if (type == 'sure') {
          obj['consumPermit'] = "Y";
        } else if (type == 'close') {
          this.websocket.send(JSON.stringify(obj));
          obj['consumPermit'] = "N";
          this.boxFlag = true;
          return;
        }
        this.websocket.send(JSON.stringify(obj));
      },


      topRightClick(){
        this.$router.push('/PersonalCenter');
      },

      showErwer(){
        let _self = this;
        $("#showErWeiMa .close").click(function () {
          if (clickFlag) {
            clickFlag = false;
          }
          $("#showErWeiMa").addClass("transForm");
          $("#accountImf").addClass("hide");
          setTimeout(function () {
            $("#showErWeiMa").addClass("hide");
            $("#accountImf").removeClass("hide");
            $("#accountImf").addClass("transForm1");
          }, 1000);
          setTimeout(function () {
            $("#accountImf").removeClass("transForm1");
            $("#accountImf").removeClass("transForm");
            $("#showErWeiMa").removeClass("transForm1");
            $("#showErWeiMa").removeClass("transForm");
            clickFlag = true;
            $('#qrcode').children().remove();
          }, 2000);
        });
        $("#accountImf").click(function () {
          if (clickFlag) {
            clickFlag = false;
          }
          $('#qrcode').children().remove();
          _self.createQrcode();
          $("#accountImf").addClass("transForm");
          $("#showErWeiMa").addClass("hide");
          setTimeout(function () {
            $("#accountImf").addClass("hide");
            $("#showErWeiMa").removeClass("hide");
            $("#showErWeiMa").addClass("transForm1");
          }, 1000);
          setTimeout(function () {
            $("#accountImf").removeClass("transForm1");
            $("#accountImf").removeClass("transForm");
            $("#showErWeiMa").removeClass("transForm1");
            $("#showErWeiMa").removeClass("transForm");
            clickFlag = true;
          }, 2000);


        })
      },
      createQrcode(){
        let _self = this;

        this.$http.get('/plat/getQrcode', {params: {'lng': this.GLOBAL.lng, "lat": this.GLOBAL.lat}}).then(
              (res) => {
                if (res.data.success) {
                  let qrcode = new QRCode(_self.$refs.qrcode, {
                    width: 200,//设置宽高
                    height: 200
                  });
                  qrcode.makeCode(res.data.result);
                  _self.wsUrl = _self.GLOBAL.wsUrl + "?" + _self.GLOBAL.phone;
                  _self.websoketClient();
                } else {
                  _self.boxFlag = true;
                  _self.msg = res.data.msg;
                }

              }, (err) => {
              }
            )
//        _self.wsUrl = _self.GLOBAL.wsUrl + "?" + '17621282637';//_self.GLOBAL.phone;
//        _self.websoketClient();

//        let qrcode = new QRCode(_self.$refs.qrcode, {
//          width: 200,//设置宽高
//          height: 200
//        });
//        qrcode.makeCode('fffff');

//        wx.getLocation({
//          type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
//          success: function (res) {
////          var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
////          var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
//            _self.$http.get('/plat/getQrcode', {params: {'lng': res.longitude, "lat": res.latitude}}).then(
//              (res) => {
//                if (res.data.success) {
//                  let qrcode = new QRCode(_self.$refs.qrcode, {
//                    width: 200,//设置宽高
//                    height: 200
//                  });
//                  qrcode.makeCode(res.data.result);
//                  _self.wsUrl = _self.GLOBAL.wsUrl + "?" + _self.GLOBAL.phone;
//                  _self.websoketClient();
//                } else {
//                  _self.msg = res.data.msg;
//                }
//
//              }, (err) => {
//              }
//            )
//          }
//        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='css'>
  @import "../assets/css/app/cardShow.css";

  #box {
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0);
    top: 0;
    left: 0;
    text-align: center;
  }

  #box i {
    display: inline-block;
    width: 1px;
    height: 100%;
    vertical-align: middle;
  }

  #box .ts {
    width: auto;
    padding: 10px 20px;
    background-color: black;
    vertical-align: middle;
    display: inline-block;
    border-radius: 8px;
    color: white;
    font-size: 14px;
  }

  #box .boxMain {
    width: 240px;
    height: auto;
    vertical-align: middle;
    display: inline-block;
    background-color: white;
    border-radius: 8px;

  }

  #box .boxMain .content {
    height: auto;
    width: 100%;
    border-bottom: 1px solid #e5e5e5;
    text-align: center;
  }

  #box .boxMain .bottom {
    height: 40px;
    width: 100%;
    display: flex;
  }

  #box .boxMain .content span {
    width: 100%;
    height: auto;
    text-align: center;
    line-height: 25px;
    display: inline-block;
    color: #1d1d1d;
    padding: 5px 10px;
    box-sizing: border-box;
  }

  #box .boxMain .content span:first-child {
    font-size: 16px;
  }

  #box .boxMain .content span:last-child {
    font-size: 14px;
  }

  #box .boxMain .content input {
    width: 100%;
    height: 40px;
    border: 0px;
    text-align: center;
    border-radius: 10px;
    outline: none;
  }

  #box .boxMain .bottom span {
    height: 40px;
    flex: 1;
    text-align: center;
    line-height: 40px;
  }

  #box .boxMain .bottom span:first-child {
    border-left: 1px solid #e5e5e5;
    color: #f26f21;
    box-sizing: border-box;
  }

  #box .boxMain .bottom span:last-child {
    border-left: 1px solid #e5e5e5;
    color: #a4a4a4;
  }
</style>
