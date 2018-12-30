<template>
  <div style="height: 120px;">
    <mt-swipe :auto="4000">
      <mt-swipe-item>1</mt-swipe-item>
      <mt-swipe-item>2</mt-swipe-item>
      <mt-swipe-item>3</mt-swipe-item>
    </mt-swipe>
    <mt-spinner type="snake" color="red"></mt-spinner>
    <mt-spinner type="double-bounce"></mt-spinner>
    <mt-spinner type="triple-bounce"></mt-spinner>
    <mt-spinner type="fading-circle"></mt-spinner>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  created(){
    Toast({
      message: '提示',
      position: 'bottom',
      duration: 5000
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
