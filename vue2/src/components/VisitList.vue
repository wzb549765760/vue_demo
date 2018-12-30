<template>
  <div>
    <div class="visitListMain">
      <div class="visitListTop" style="border-bottom: 1px solid #dfdfdf;border-radius: 0px;">
        <div class="search" ></div>
        <input type="text" v-model="filterKey">
      </div>

      <div class="visitLists"  v-for="(visit,index) in visitListCmputed">
        <div class="leftHead"  @click = "toDetail(visit)">
          <div class="head"></div>
          <div class="content"  v-show="visit.status =='1'||visit.status =='2'">查看详情</div>
        </div>
        <div class="rightImf">
          <div class="name">{{visit.visitName}}</div>
          <div class="name">{{visit.visitTime}}</div>
          <div class="statue" v-if="visit.status==='1'" @click="updateStatus(index,'2')">接受</div>
          <div class="statue"  v-else-if="visit.status==='2'" @click="updateStatus(index,'3')">结束访问</div>
          <div class="statue" v-else @click="toSeeDetail(visit)">查看</div>
          <div class="applyStaus" v-if="visit.status==='1'">申请中</div>
          <div class="applyStaus"  v-else-if="visit.status==='2'">访问中</div>
          <div class="applyStaus"  v-else-if="visit.status==='3'">访问结束</div>
          <div class="applyStaus"  v-else>拒绝访问</div>
        </div>
      </div>
      <div>
        <span v-if="more==='1'" class="getMore" @click="toGetMore()">查看更多</span>
        <span v-else-if="more==='2'" class="moreImg"></span>
        <span class="getMore" v-else>木有数据了</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'hello',
    data () {
      return {
        visitList:[],
        filterKey:'',
        pageNum:1,
        pageSize:5,
        more:'1'
      }
    },
    created(){
      this.more='2';
      this.$http.get('/plat/getVisitorList',{params: {'pageNum': this.pageNum,'pageSize':this.pageSize}}).then(
        (res) => {
            if(res.data.success)
            {
              this.pageNum=this.pageNum+1;
              this.visitList=res.data.list;
              if(res.data.hasNextPage)
              {
                this.more='1'
              }else {
                this.more='3'
              }
            }else{
                this.more='3'
            }
        }, (err) => {
        }
      );

    },
    methods:{
      toGetMore(){
        let item=[];
        this.more='2';
        this.$http.get('/plat/getVisitorList',{params: {'pageNum': this.pageNum,'pageSize':this.pageSize}}).then(
          (res) => {
            if(res.data.success)
            {
              this.pageNum=this.pageNum+1;
              res.data.list.forEach((item)=>{
                this.visitList.push(item);
              });
              if(res.data.hasNextPage)
              {
                this.more='1'
              }else {
                this.more='3'
              }
            }else{
              this.more='3'
            }
          }, (err) => {
          }
        );
      } ,

      toDetail(visitor){
       if(visitor.status==='1'||visitor.status==='2')
       {
           this.toSeeDetail(visitor);
       }
      },
      toSeeDetail(visitor){
        this.$router.push({ name: 'VisitImg', params: { visit: visitor }})

      },
      updateStatus(index,vStataus){
        let visitor = this.visitListCmputed[index];
        this.$http.get('/plat/updateStatus',{params: {'id': visitor.id,'status':vStataus}}).then(
          (res) => {
              if(res.data==='SUCCESS')
              {
                visitor.status=vStataus;
                this.$set(this.visitListCmputed,index,visitor);
              }
          }, (err) => {
          }
        )
      }
    },
    computed: {
      visitListCmputed:function() {
        let key = this.filterKey;
        return this.visitList.filter(function (item) {
            return item.visitName.indexOf(key) != -1
        })
      }
    }
  }
</script>


<style scoped lang='css'>
  @import "../assets/css/app/visitList.css";

  .getMore {
    width: 100%;
    height: 30px;
    display: inline-block;
    text-align: center;
    line-height: 30px;
    color: #9b9b9b;
    font-size: 16px;
  }

  .moreImg {
    height: 30px;
    width: 100%;
    background: url("../assets/image/app/load.jpg") no-repeat center;
    background-size: 20px;
    display: inline-block;
  }
</style>
