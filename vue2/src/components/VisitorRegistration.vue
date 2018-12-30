<template>
  <div>
    <div class="visitLists" style="margin-top: 30px;">
      <div class="visitList">
        <div class="logo laifangName"></div>
        <div class="content">
          <div class="name ">来访人</div>
          <div class="value">
            <input type="text" v-model="visitName" v-if="flag==='01'"/>
            <span v-if="flag!='01'">{{visitName}}</span>
          </div>
        </div>
      </div>
      <div class="visitList">
        <div class="logo gongshiName"></div>
        <div class="content">
          <div class="name">公司名称</div>
          <div class="value">
            <input type="text" v-model="companyName" v-if="flag==='01'"/>
            <span v-if="flag!='01'">{{companyName}}</span>
          </div>
        </div>
      </div>
      <div class="visitList">
        <div class="logo lianxifangshi" style="background-size: 19px;"></div>
        <div class="content">
          <div class="name">联系方式</div>
          <div class="value">
            <input type="number" v-model.number="visitPhone" v-if="flag==='01'"/>
            <span v-if="flag!='01'">{{visitPhone}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="endVisit">
      <div class="nextStep">
        <span style=" background-color: #94cea8; " @click="nextStep();">下一步</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        flag:this.GLOBAL.visitorFlag,
        visitName:'',
        companyName:'',
        visitPhone:''
      }
    },
    created(){
        if(this.flag==='00'){
          this.visitName=this.GLOBAL.visitorName;
          this.companyName=this.GLOBAL.visitorCompName;
          this.visitPhone=this.GLOBAL.visitorPhone;
        }
    },
    methods:{
      nextStep(){
          let params={'visitName':this.visitName,'companyName':this.companyName,'visitPhone':''+this.visitPhone,'flag':this.flag};
//        if(!this.flag){
//          this.$http.post(
//            '/plat/saveVisitor',
//            {
//              params
//            }).then(function (res) {
//            // console.log(res);
//          }, function () {
//            // 失败回调
//          });
//        }
        this.$router.push({ name: 'VisitorInformationInput', params: { visitor: params }})
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='css'>
  @import "../assets/css/app/visitEnd.css";
</style>
