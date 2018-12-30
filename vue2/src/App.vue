<template>
  <div>
    <router-view></router-view>
  </div>
</template>


<script>
  export default {
    name: 'app',
    created(){
      let self = this;
      //判断用户点击进入的页面
      $.ajax({
        type: "GET",
        async: false,
        url: "http://www.tnfunds.com/plat/getKey",
        success: function (res) {
          let data=res.key;
          self.GLOBAL.visitId=res.visitId;
            if(data==='1'){
              //用户登录进来的时候查询是否有此用户的信息
              $.ajax({
                type: "GET",
                async: false,
                url: "http://www.tnfunds.com/plat/getUserInfo",
                success: function (data) {
                  if ("SUCCESS" === data.respCode) {
                    self.GLOBAL.globalComp = '1';
                    self.GLOBAL.name = data.alias;
                    self.GLOBAL.realName=data.name;
                    self.GLOBAL.phone = data.phone;
                    self.GLOBAL.amount = data.amount;
//            self.GLOBAL.openId = data.openId;
                    self.GLOBAL.companyName = data.companyName;
                    if (data.photo === '') {
                      self.GLOBAL.picData = self.GLOBAL.placeholder;
                    } else {
                      self.GLOBAL.picData = data.photo;
                    }

                    wx.config({
//                       debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                      appId: data.appId, // 必填，公众号的唯一标识
                      timestamp: data.timestamp, // 必填，生成签名的时间戳
                      nonceStr: data.nonceStr, // 必填，生成签名的随机串
                      signature: data.signature,// 必填，签名，见附录1
                      jsApiList: ['getLocation'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    });
//                    wx.getLocation({
//                      type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
//                      success: function (res) {
//                          console.log("rest:"+res);
//                        self.GLOBAL.lng=res.longitude;
//                        self.GLOBAL.lat=res.latitude;
//                      }})
                  } else {
                    self.GLOBAL.globalComp = '0';
                  }
                },
                error: function () {
//          alert("服务器连接失败");
                }

              });
            }else if(data==='2'){
              self.GLOBAL.globalComp = '2';
                //访客信息
              $.ajax({
                type: "GET",
                async: false,
                url: "/plat/getVisitorInformation",
                success: function (data) {
                  if (data.success) {
                    self.GLOBAL.visitorFlag = '00';
                    self.GLOBAL.visitorName = data.obj.visitName;
                    self.GLOBAL.visitorCompName = data.obj.companyName;
                    self.GLOBAL.visitorPhone=data.obj.visitPhone;
                  } else {
                    self.GLOBAL.visitorFlag = '01';
                  }
                },
                error: function () {
//          alert("服务器连接失败");
                }

              });
            }
            else{
              self.GLOBAL.globalComp = data;
            }
        },
        error: function () {
//          alert("服务器连接失败");
        }

      });

    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    box-sizing: border-box;
  }

  * {
    margin: 0;
    padding: 0;
  }

  img {
    display: block;
    margin: 0 auto;
  }

  input[type='file'] {
    outline: none;
    margin-top: 20px;
  }

  #clip_button {
    position: absolute;
    right: 10%;
    bottom: 20px;
    width: 80px;
    height: 40px;
    border: none;
    border-radius: 2px;
    background: #1AAD19;
    color: #fff;
  }

  #cancel_clip {
    position: absolute;
    left: 10%;
    bottom: 20px;
    width: 80px;
    height: 40px;
    border: none;
    border-radius: 2px;
    color: #fff;
    background: #E64340;
  }

  #clip_container.container {
    z-index: 99;
    position: fixed;
    padding-top: 60px;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 1);
  }

  #clip_container.container > div {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }

  #clip_image {
    max-width: 100%;
  }

  .cropper-container {
    font-size: 0;
    line-height: 0;
    position: relative;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    direction: ltr;
    -ms-touch-action: none;
    touch-action: none
  }

  .crop_loading, .crop_success {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9;
  }

  .crop_loading .crop_content {
    position: absolute;
    top: 50%;
    left: 50%;
    text-align: center;
    background: #000;
    opacity: 0.9;
    height: 100px;
    width: 100px;
    vertical-align: middle;
    color: #fff;
    padding-top: 20px;
    font-size: 16px;
    -webkit-border-radius: 3px;
    border-radius: 3px;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }

  .crop_loading .crop_content img {
    margin-top: 15px;
    margin-bottom: 10px;
  }

  .crop_success .crop_success_text {
    position: absolute;
    top: 50%;
    left: 50%;
    text-align: center;
    background: #000;
    opacity: 0.9;
    width: 120px;
    height: 30px;
    color: #fff;
    line-height: 30px;
    font-size: 16px;
    -webkit-border-radius: 3px;
    border-radius: 3px;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }

  .cropper-container img {
    /* Avoid margin top issue (Occur only when margin-top <= -height) */
    display: block;
    min-width: 0 !important;
    max-width: none !important;
    min-height: 0 !important;
    max-height: none !important;
    width: 100%;
    height: 100%;
    image-orientation: 0deg
  }

  .cropper-wrap-box,
  .cropper-canvas,
  .cropper-drag-box,
  .cropper-crop-box,
  .cropper-modal {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .cropper-wrap-box {
    overflow: hidden;
  }

  .cropper-drag-box {
    opacity: 0;
    background-color: #fff;
  }

  .cropper-modal {
    opacity: .5;
    background-color: #000;
  }

  .cropper-view-box {
    display: block;
    overflow: hidden;

    width: 100%;
    height: 100%;

    outline: 1px solid #39f;
    outline-color: rgba(51, 153, 255, 0.75);
  }

  .cropper-dashed {
    position: absolute;

    display: block;

    opacity: .5;
    border: 0 dashed #eee
  }

  .cropper-dashed.dashed-h {
    top: 33.33333%;
    left: 0;
    width: 100%;
    height: 33.33333%;
    border-top-width: 1px;
    border-bottom-width: 1px
  }

  .cropper-dashed.dashed-v {
    top: 0;
    left: 33.33333%;
    width: 33.33333%;
    height: 100%;
    border-right-width: 1px;
    border-left-width: 1px
  }

  .cropper-center {
    position: absolute;
    top: 50%;
    left: 50%;

    display: block;

    width: 0;
    height: 0;

    opacity: .75
  }

  .cropper-center:before,
  .cropper-center:after {
    position: absolute;
    display: block;
    content: ' ';
    background-color: #eee
  }

  .cropper-center:before {
    top: 0;
    left: -3px;
    width: 7px;
    height: 1px
  }

  .cropper-center:after {
    top: -3px;
    left: 0;
    width: 1px;
    height: 7px
  }

  .cropper-face,
  .cropper-line,
  .cropper-point {
    position: absolute;

    display: block;

    width: 100%;
    height: 100%;

    opacity: .1;
  }

  .cropper-face {
    top: 0;
    left: 0;

    background-color: #fff;
  }

  .cropper-line {
    background-color: #39f
  }

  .cropper-line.line-e {
    top: 0;
    right: -3px;
    width: 5px;
    cursor: e-resize
  }

  .cropper-line.line-n {
    top: -3px;
    left: 0;
    height: 5px;
    cursor: n-resize
  }

  .cropper-line.line-w {
    top: 0;
    left: -3px;
    width: 5px;
    cursor: w-resize
  }

  .cropper-line.line-s {
    bottom: -3px;
    left: 0;
    height: 5px;
    cursor: s-resize
  }

  .cropper-point {
    width: 5px;
    height: 5px;

    opacity: .75;
    background-color: #39f
  }

  .cropper-point.point-e {
    top: 50%;
    right: -3px;
    margin-top: -3px;
    cursor: e-resize
  }

  .cropper-point.point-n {
    top: -3px;
    left: 50%;
    margin-left: -3px;
    cursor: n-resize
  }

  .cropper-point.point-w {
    top: 50%;
    left: -3px;
    margin-top: -3px;
    cursor: w-resize
  }

  .cropper-point.point-s {
    bottom: -3px;
    left: 50%;
    margin-left: -3px;
    cursor: s-resize
  }

  .cropper-point.point-ne {
    top: -3px;
    right: -3px;
    cursor: ne-resize
  }

  .cropper-point.point-nw {
    top: -3px;
    left: -3px;
    cursor: nw-resize
  }

  .cropper-point.point-sw {
    bottom: -3px;
    left: -3px;
    cursor: sw-resize
  }

  .cropper-point.point-se {
    right: -3px;
    bottom: -3px;
    width: 20px;
    height: 20px;
    cursor: se-resize;
    opacity: 1
  }

  @media (min-width: 768px) {

    .cropper-point.point-se {
      width: 15px;
      height: 15px
    }
  }

  @media (min-width: 992px) {

    .cropper-point.point-se {
      width: 10px;
      height: 10px
    }
  }

  @media (min-width: 1200px) {

    .cropper-point.point-se {
      width: 5px;
      height: 5px;
      opacity: .75
    }
  }

  .cropper-point.point-se:before {
    position: absolute;
    right: -50%;
    bottom: -50%;
    display: block;
    width: 200%;
    height: 200%;
    content: ' ';
    opacity: 0;
    background-color: #39f
  }

  .cropper-invisible {
    opacity: 0;
  }

  .cropper-bg {
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC');
  }

  .cropper-hide {
    position: absolute;

    display: block;

    width: 0;
    height: 0;
  }

  .cropper-hidden {
    display: none !important;
  }

  .cropper-move {
    cursor: move;
  }

  .cropper-crop {
    cursor: crosshair;
  }

  .cropper-disabled .cropper-drag-box,
  .cropper-disabled .cropper-face,
  .cropper-disabled .cropper-line,
  .cropper-disabled .cropper-point {
    cursor: not-allowed;
  }
</style>



