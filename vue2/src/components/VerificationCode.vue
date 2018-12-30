<template>
  <div>
    <div class="appMain">
      <div class="inputMain">
        <div class="main">
          <div class="inputList">
            <div class="error">请输入您的手机号码</div>
            <div class="inputOut">
              <input class="mobile"/>
              <span class="reSend">发送验证码</span>
            </div>
          </div>
        </div>
      </div>
      <div class="bottomMain">
        <div class="nextBottom">下一步</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'hello',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='css'>
  @import "../assets/css/app/appCurrency.css";
</style>
