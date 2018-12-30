<template>
  <div>
    <div class="visitLists" style="margin-top: 30px;">
      <div class="visitList">
        <div class="logo time"></div>
        <div class="content">
          <div class="name">来访时间</div>
          <div class="value">{{visitTime}}</div>
        </div>
      </div>
      <div class="visitList">
        <div class="logo laifangName"></div>
        <div class="content">
          <div class="name ">来访人</div>
          <div class="value" >{{visitName}}</div>
        </div>
      </div>
      <div class="visitList">
        <div class="logo gongshiName"></div>
        <div class="content">
          <div class="name">公司名称</div>
          <div class="value">{{companyName}}</div>
        </div>
    </div>
      <div class="visitList">
        <div class="logo laifangNum"></div>
        <div class="content">
          <div class="name">来访人数</div>
          <div class="value">{{visitNum}}</div>
        </div>
      </div>
      <div class="visitList">
        <div class="logo lianxifangshi" style="background-size: 19px;"></div>
        <div class="content">
          <div class="name">联系方式</div>
          <div class="value">{{visitPhone}}</div>
        </div>
      </div>
      <div class="visitList">
        <div class="logo shiyou"></div>
        <div class="content">
          <div class="name">来访事由</div>
          <div class="value">{{visitReason}}</div>
        </div>
      </div>
    </div>
    <div class="endVisit pa42" v-if="status=='1'">
      <div class="endVisitRefuse" @click="updateStatus('4')">拒绝</div>
      <div class="endVisitAccept" @click="updateStatus('2')">接受
        <img src="../assets/image/app/accept.png"/></div>
    </div>
    <div class="endVisit" v-if="status=='2'">
      <div class="endVisitMain"  @click="updateStatus('3')">访问结束</div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        id:this.GLOBAL.visitId,
        visitName: '',
        visitTime: '',
        status: '',
        companyName: '',
        visitPhone: '',
        visitNum: '',
        visitReason: ''
      }
    },
    created(){
      this.$http.get('/plat/visitInfo',{params: {'id': this.id}}).then(
        (resource) => {
//          console.log('rrrrr');
//          console.log(res);
//          this.visitName=res.visitName;
//          this.visitTime=res.visitTime;
//          this.status=res.status;
//          this.companyName=res.companyName;
//          this.visitPhone=res.visitPhone;
//          this.visitNum=res.visitNum;
//          this.visitReason=res.visitReason;
          let res=resource.data;
          if("SUCCESS"===res.respCode)
          {
            this.visitName=res.visit.visitName;
            this.visitTime=res.visit.visitTimeStr;
            this.status=res.visit.status;
            this.companyName=res.visit.companyName;
            this.visitPhone=res.visit.visitPhone;
            this.visitNum=res.visit.visitNum;
            this.visitReason=res.visit.visitReason;
          }
        }, (err) => {
        }
      )
    },
    methods:{
      updateStatus(newStatus){
        this.$http.get('/plat/updateStatus',{params: {'id': this.id,'status':newStatus}}).then(
          (res) => {
            this.$router.push('/VisitList')
          }, (err) => {
          }
        )
        }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='css'>
  @import "../assets/css/app/visitEnd.css";
</style>
