<template>
  <div>
    <div class="appMain">
      <div class="inputMain">
        <div class="main">
          <div class="inputList">
            <div class="error" v-html="moneyMsg"></div>
            <div class="inputOut">
              <input class="mobile" v-model="money" placeholder="请输入充值金额" @blur="inputBlurFun()"/>
            </div>
          </div>
        </div>
      </div>
      <div class="bottomMain" @click="nextStep()">
        <div class="nextBottom">下一步</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        money: '',
        moneyMsg: ''
      }
    },
    methods: {
      inputBlurFun(){
        if(this.money != "" && this.money != null && this.money != undefined){
            this.moneyMsg = "<span style='color: #9b9b9b'>充值金额</span>";
        }
      },
      nextStep(){
        if(this.money == "" || this.money == null || this.money == undefined){
          this.moneyMsg = "<span style='color: red'>请输入充值金额</span>";
          return;
        }
        if (!(/^(\+)?\d+(\.\d+)?$/.test(this.money))) {
          this.moneyMsg = "<span style='color: red'>金额格式有误，请重填</span>";
          return false;
        }
        alert("继续");
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='css'>
  @import "../assets/css/app/appCurrency.css";
</style>
