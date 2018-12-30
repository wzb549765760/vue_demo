<template>
  <div>
    <div class="transactionTop">
      <div class="logo">
        <img src="../assets/image/app/logo.png" width="100%" height="100%"/>
      </div>
      <div class="tittle">交易金额</div>
      <div class="content">￥30.45</div>
    </div>
    <div class="detailMain">
      <div class="detailList">
        <div class="name">当前状态</div>
        <div class="value">交易成功</div>
      </div>
      <div class="detailList">
        <div class="name">交易时间</div>
        <div class="value">2017-08-20  11:46:00</div>
      </div>
      <div class="detailList">
        <div class="name">支付方式</div>
        <div class="value">实体卡</div>
      </div>
      <div class="detailList">
        <div class="name">交易单号</div>
        <div class="value">4004082001201701206940898490</div>
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
  @import "../assets/css/app/transactionDetails.css";
  body {
    padding: 0px;
    margin: 0px;
    font-family: "微软雅黑";
    background-color: #f3f3f3;
  }
</style>
