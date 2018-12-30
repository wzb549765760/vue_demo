<template>
  <div>
    <div class="appMain">
      <div class="inputMain">
        <div class="main">
          <div class="inputList">
            <div class="error" v-html="phoneMsg"></div>
            <div class="inputOut">
              <input class="mobile" v-model="phone" placeholder="请输入您的手机号码" @blur="inputBlurFun()"/>
            </div>
          </div>
        </div>
      </div>
      <div class="bottomMain" @click="registerUser()">
        <div class="nextBottom">注册用户</div>
        <div id="msg">{{errorMsg}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        phone: '',
        phoneMsg: '',
        errorMsg:''
      }
    },
    methods: {
      registerUser(){
        if (this.phone == "" || this.phone == null || this.phone == undefined) {
          this.phoneMsg = "<span style='color: red'>请输入您的手机号码</span>";
          return;
        }

        if (!(/^1(3|4|5|7|8)\d{9}$/.test(this.phone))) {
          this.phoneMsg = "<span style='color: red'>手机号码有误，请重填</span>";
          return false;
        }
        this.$http.post('/plat/registerUser', {
          'cardId': this.$route.params.cardId,
          'phone': this.phone
        }).then(function (res) {
            this.errorMsg = res.body;
        }, function () {
          this.errorMsg = "请求失败处理"; //失败处理
        });

      },
      inputBlurFun(){
        if (this.phone != "" && this.phone != null && this.phone != undefined) {
          this.phoneMsg = "<span style='color: #9b9b9b;'>手机号码</span>";
        }
      },
      postRequest(url, params) {
        return new Promise((resolve, reject) => {
          Vue.http.post(
            url,
            {
              params
            },
            {emulateJSON: true}
          )
            .then((res) => {
              resolve(res.body);
            })
            .catch((res) => {
              reject(res.body);
            });
        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='css'>
  @import "../assets/css/app/appCurrency.css";

  #msg {
    width: 80%;
    margin: auto auto;
    height: 30px;
    display: block;
    line-height: 30px;
    font-size: 12px;
    color: red;
  }

</style>
