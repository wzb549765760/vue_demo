<template>
  <div>
    <div class="endOfVisit">
      <div class="applyStaus">访问结束</div>
    </div>
    <div class="visitLists">
      <div class="visitList">
        <div class="logo time"></div>
        <div class="content">
          <div class="name">来访时间</div>
          <div class="value">2017-08-02 13:21:29</div>
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
        <div class="logo laifangNum"></div>
        <div class="content">
          <div class="name">来访人数</div>
          <div class="value">8</div>
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
    <div class="laifangErWeiMa">
      <img src="https://gss0.bdstatic.com/94o3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=7bcb659c9745d688a302b5a29cf91a23/2934349b033b5bb571dc8c5133d3d539b600bc12.jpg" width="100%" height="100%"/>
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
