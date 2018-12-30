<template>
  <div>
    <div class="visitLists">
      <div class="visitList">
        <div class="logo time"></div>
        <div class="content">
          <div class="name">来访时间</div>
          <div class="value">2017-08-02   13:21:29</div>
        </div>
      </div>
      <div class="visitList">
        <div class="logo laifangName"></div>
        <div class="content">
          <div class="name ">来访人</div>
          <div class="value">Pony</div>
        </div>
      </div>
      <div class="visitList">
        <div class="logo gongshiName"></div>
        <div class="content">
          <div class="name">公司名称</div>
          <div class="value">Tencent</div>
        </div>
      </div>
      <div class="visitList">
        <div class="logo laifangNum"></div>
        <div class="content">
          <div class="name">来访人数</div>
          <div class="value">8</div>
        </div>
      </div>
      <div class="visitList">
        <div class="logo lianxifangshi" style="background-size: 19px;"></div>
        <div class="content">
          <div class="name">联系方式</div>
          <div class="value">+86 139 0166 9321</div>
        </div>
      </div>
      <div class="visitList">
        <div class="logo shiyou"></div>
        <div class="content">
          <div class="name">来访事由</div>
          <div class="value">商务洽谈</div>
        </div>
      </div>
    </div>
    <div class="endVisit pa42">
      <div class="endVisitRefuse">拒绝</div>
      <div class="endVisitAccept">接受
        <img src="../assets/image/app/accept.png"/></div>
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
  @import "../assets/css/app/visitEnd.css";
</style>
