<template>
  <div class="hello" @click="getImg()">
      <img  v-bind:src="newPicData"  alt="" id="img">
      <input type="file" accept="image/png,image/jpg,image/jpeg" id="file" @change="change($event)" style="display:none;">
  </div>
</template>

<script>
export default {
  data () {
    return {
      newPicData:this.GLOBAL.picData
    }
  },
  methods : {
    change( event ) {
        let image = document.getElementById('img'); //预览对象
        this.clip(event , {
          resultObj : image,
          aspectRatio : 1
        })
    },
    getImg(){
      document.getElementById('file').click();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    img{
        display: block;
        width: 200px;
        height: 200px;
    }
    .hello{
      position:fixed;
      top:50%;
      left:50%;
      margin:-100px 0 0 -100px ;
    }
    h3{
        text-align: center;
    }
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
