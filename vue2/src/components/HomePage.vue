<template>
  <div>

    <!--用户不存在则需要注册-->
    <enter-identity-card v-if="comp==='0'"></enter-identity-card>
    <!--用户存在则展示用户信息-->
    <card-show v-if="comp === '1'"></card-show>
    <visit-list v-if="comp === '3'"></visit-list>
   <visitor-registration v-if="comp === '2'"></visitor-registration>
    <interviewee-view v-if="comp === '4'"></interviewee-view>
    <visitor-view v-if="comp === '5'"></visitor-view>
  </div>
</template>

<script>

  import CardShow from '@/components/CardShow'
  import EnterIdentityCard from '@/components/EnterIdentityCard'
  import VisitList from '@/components/VisitList'
  import VisitorRegistration from '@/components/VisitorRegistration'
  import IntervieweeView from '@/components/IntervieweeView'
  import VisitorView from '@/components/VisitorView'


  export default {

  data () {
      return{
        comp : this.GLOBAL.globalComp
      }
  },
  components:{
    CardShow,
    EnterIdentityCard,
    VisitList,
    VisitorRegistration,
    IntervieweeView,
    VisitorView
  }
}
</script>

