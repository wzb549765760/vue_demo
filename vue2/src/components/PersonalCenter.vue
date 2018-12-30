
<template>

<div>
  <div class="centerTop">
    <img src="../assets/image/app/personalTop.png" width="100%"/>
    <div class="content">
      <div class="name">账户余额</div>
      <div class="value">¥{{balance}}</div>
    </div>
  </div>
  <div class="centerTable">
    <div class="table" >
      <div class="img">
        <img src="../assets/image/app/balanceRecharge.png" width="100%"/>
      </div>
      <div class="content">余额充值</div>
    </div>
    <div class="table">
      <div class="img">
        <img src="../assets/image/app/transactionRecord.png" width="100%"/>
      </div>
      <div class="content">交易记录</div>
    </div>
    <div class="table" @click="toAccountManagement()">
      <div class="img">
        <img src="../assets/image/app/accountManagement.png" width="100%"/>
      </div>
      <div class="content">账户管理</div>
    </div>
  </div>
  <div class="getErWeiMa" @click="toQRCode()">
    <img src="../assets/image/app/getErWeiMa.png" width="100%" />
  </div>
</div>
</template>

<script>
export default {

  data () {
    return{
      balance:this.GLOBAL.amount
    }
  },
  methods:{
    toInnerMoney(){
      this.$router.push('/InnerMoney')

      // 字符串
    //  this.$router.push('/home/first')
// 对象
    //  this.$router.push({ path: '/home/first' })
// 命名的路由
   //   this.$router.push({ name: 'home', params: { userId: wise }})
    },
    toTransactionList()
    {
      this.$router.push('/TransactionList')
    },
    toAccountManagement()
    {
      this.$router.push('/AccountManagement')
    },
    toQRCode()
    {
//      this.$router.push('/QRCodePay')
     this.$router.push({ name: 'CardShow', params: { type: 'QRCode' }})
    }

  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='css'>
  @import "../assets/css/app/personalCenter.css";

</style>
