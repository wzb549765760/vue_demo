<template>
  <div class="successfulMain">
    <div class="successful">
      <!--<div v-bind:class="[{ successfulLogo: isSuccess },errorLogo]"/>-->
      <div v-bind:class="[isSuccess ? 'successfulLogo' : 'errorLogo', '']"/>
      <div class="content">{{msg}}</div>
      <div class="bottom" @click="toCardShow()">
        <span>完成</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        isSuccess: "",
        msg:''
      }
    },
    created(){
        let self=this;
        let result=self.$route.params.results;
      if ('KQ' === result.flag) {
        if ('S' === result.respStat) {
          self.msg = "签到成功";
          self.isSuccess=true;
        } else {
          self.msg = "签到失败";
          self.isSuccess=false;
        }
      } else {
        //添加用户消费确认
        if ('INFM' == result.extInfo) {
          if ('S' === result.respStat) {
            self.msg = "消费成功";
            self.isSuccess=true;
            self.$http.get('/plat/getBalance').then(
              (res) => {
                self.GLOBAL.amount = res.data;
              }, (err) => {
              }
            );
          } else {
            self.msg = "消费失败";
            self.isSuccess=false;
          }
        }
      }
    },
    methods:{
      toCardShow(){
        this.$router.push('/CardShow');
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='css'>
  @import "../assets/css/app/successfuRegistration.css";
</style>
