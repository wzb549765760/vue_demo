<template>
  <div>
    <div class="endOfVisit">
      <div class="applyStaus" v-if="status=='2'">访问中</div>
      <div class="applyStaus" v-if="status=='3'">访问结束</div>
      <div class="applyStaus" v-if="status=='4'">访问拒绝</div>
    </div>
    <div class="visitLists">
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
          <div class="value">{{visitName}}</div>
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
    <div class="laifangErWeiMa">
      <div class="erweima" id="qrcode" ref="qrcode"></div>
      <!--<img src="https://gss0.bdstatic.com/94o3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=7bcb659c9745d688a302b5a29cf91a23/2934349b033b5bb571dc8c5133d3d539b600bc12.jpg" width="100%" height="100%"/>-->
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
                let qrcode = new QRCode(this.$refs.qrcode, {
                  width: 100,//设置宽高
                  height: 100
                });
                qrcode.makeCode(res.visit);
              }

          }, (err) => {

          }
        )
      },
    methods:{

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='css'>
  @import "../assets/css/app/visitEnd.css";
</style>
