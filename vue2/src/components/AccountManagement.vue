<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div>
    <div class="manageTop">
        <div @click="getImg()">
      <img  v-bind:src="newPicData"  alt="" id="img" >
      <input type="file" accept="image/png,image/jpg,image/jpeg" id="file" @change="change($event)" style="display:none;">
  </div>
      <div class="content">{{accountName}}</div>
    </div>
    <div class="accountManagementList">
      <div class="main">
        <span>卡片挂失</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      accountName: this.GLOBAL.realName,
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
  @import "../assets/css/app/accountManagement.css";

      img{
        display: block;
        width: 110px;
        height: 110px;
        border-radius: 110px;
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


