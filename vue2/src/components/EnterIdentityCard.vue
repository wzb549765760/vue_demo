<template>
  <div>
    <div class="appMain" style="background-color: white">
      <div class="inputMain">
        <div class="main">
          <div class="inputList">
            <div class="error" v-html="certNoMsg"></div>
            <div class="inputOut" style="margin-bottom: 10px;">
              <input class="mobile" v-model="certNo" placeholder="请输入您的身份证号码" @blur="inputBlurFun('certNo','身份证')"/>
            </div>
            <div class="error" v-html="verificationCodeMsg"></div>
            <div class="inputOut">
              <input class="mobile" v-model="verificationCode" style="flex: 1" placeholder="请输入验证码"
                     @blur="inputBlurFun('verificationCode','验证码')" maxlength="6"/>
              <div id="bottom" :class='btClass' @click="sendCode()" disabled="disabled">
                {{codeTips}}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bottomMain" @click="registerUser()">
        <div class="nextBottom">注册用户</div>
        <span id="msg">{{msg}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        certNo: '',
        verificationCode: '',
        codeTips: '获取验证码',
        time: 60,
        timeFun: "",
        clickFlag: true,
        btClass: 'clickAfter',
        msg: '',
        certNoMsg: '',
        verificationCodeMsg: ''
      }
    },
    methods: {
      sendCode(){
          var flag = false;
        this.msg = '';
        if (this.certNo == "" || this.certNo == null || this.certNo == undefined) {
          this.certNoMsg = '<span style="color: red;">请先输入您的身份证</span>';
          flag = true;
        }
        if (!this.clickFlag || flag) {
          return;
        }
        this.clickFlag = false;
        let self = this;
        //获取动态码
        self.$http.get('/plat/authCode', {params: {'certNo': this.certNo}}).then(
          (res) => {
            if(res.body.respCode == "SUCCESS"){
                self.btClass='clickAfter';
                self.timeFun = setInterval(function () {
                self.time = self.time - 1;
                if (self.time == 0) {
                  self.codeTips = "获取验证码";
                  self.clickFlag = true;
                  self.time = 60;
                  clearInterval(self.timeFun);
                  self.btClass='normal';
                } else {
                  self.codeTips = self.time + "秒之后重新获取";
                }

               }, 1000)
            }else{
                this.certNoMsg = '<span style="color: red;">'+res.body.respInfo+'</span>';
                self.clickFlag = true;
            }
          }, (err) => {
          alert(err);
          }
        );

      },
      inputBlurFun(type, val){
        if (this[type] != "" && this[type] != null && this[type] != undefined) {
          this[type + "Msg"] = "<span style='color:#9b9b9b'>" + val + "</span>";
        }else{
           this[type + "Msg"] = "";
        }
      },
      registerUser(){
        this.msg = '';
        if (this.certNo === '' || this.certNo === '') {
          this.msg = '请先输入身份证号码';
          return false;
        }
        if (this.certNo === '' || this.verificationCode === '') {
          this.msg = '请先输入验证码';
          return false;
        }

        let self = this;
        //先注册用户
        this.$http.get('/plat/registerUser', {
          params: {
            'code': this.verificationCode,
            'certNo': this.certNo
          }
        }).then((res) => {
          if ("ERRORCODE" === res.data) {
            this.msg = '验证码错误,请重新输入';
          } else if ("SUCCESS" === res.data) {
            //用户注册成功后先获取该用户的信息用于展示
            $.ajax({
              type: "GET",
              async: false,
              url: "/plat/getUserInfo",
              success: function (data) {
                if ("SUCCESS" === data.respCode) {
                  self.GLOBAL.globalComp = false;
                  self.GLOBAL.name = data.alias;
                  self.GLOBAL.realName=data.name;
                  self.GLOBAL.phone = data.phone;
                  self.GLOBAL.amount = data.amount;
//            self.GLOBAL.openId = data.openId;
                  self.GLOBAL.companyName = data.companyName;
                  if (data.photo === '') {
                    self.GLOBAL.picData = self.GLOBAL.placeholder;
                  } else {
                    self.GLOBAL.picData = data.photo;
                  }

                  wx.config({
                    // debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: data.appId, // 必填，公众号的唯一标识
                    timestamp: data.timestamp, // 必填，生成签名的时间戳
                    nonceStr: data.nonceStr, // 必填，生成签名的随机串
                    signature: data.signature,// 必填，签名，见附录1
                    jsApiList: ['getLocation'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                  });
                  wx.getLocation({
                    type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                    success: function (res) {
                      self.GLOBAL.lng=res.longitude;
                      self.GLOBAL.lat=res.latitude;
                    }})
                  self.$router.push('/CardShow');
                } else {
                  self.GLOBAL.globalComp = true;
                }
              },
              error: function () {
//          alert("服务器连接失败");
              }

            });

          } else {
            this.msg = '用户注册失败';
          }
        }).catch((err) => {

        });

      },
    },
    watch: {
      certNo: function (val) {
        if (val.length === 18) {
          let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
          if (reg.test(val)) {
            this.btClass = 'normal'
          }
        } else {
          this.btClass = 'clickAfter'
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='css'>
  @import "../assets/css/app/appCurrency.css";

  #bottom {
    width: 100px;
    height: 35px;
    margin-top: 5px;
    border-radius: 8px;
    text-align: center;
    line-height: 35px;
    color: white;
    font-size: 12px;
  }

  #msg {
    width: 80%;
    margin: auto auto;
    height: 30px;
    display: block;
    line-height: 30px;
    font-size: 12px;
    color: red;
  }

  input{
    border-radius: 0px;
  }


  .normal {
    background-color: #72ab86;
  }

  .clickAfter {
    background-color: #c4c4c4;
  }
</style>
