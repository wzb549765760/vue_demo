<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="transaction">
    <div class="transactionListTop" id="moveTop">
      <div class="listMain"></div>
    </div>
    <div class="dateTittle"><span id="year"></span>年<span id="month"></span>月</div>
    <div class="transactionListMain" v-bind:style="heightStyle">
      <div class="list" v-for="comsume in comsumeList">
        <div class="left">
          <div class="xf">{{comsume.xf}}</div>
          <div class="rq">{{comsume.rq}}</div>
        </div>
        <div class="right">{{comsume.money}}</div>
      </div>
      <!--加载时加 moreImg-->

      <div>
        <span v-if="more===1" class="getMore" @click="toGetMore()">查看更多</span>
        <span v-else-if="more===2" class="moreImg"></span>
        <span class="getMore" v-else>木有数据了</span>
      </div>

    </div>
  </div>
</template>


<script>
  let marginLeft = "";
  let mouveFlag = true;
  let indexThis = 2;
  let leftOrRightFlag;
  let clientW = '';
  let clienX = '';
  let endFlag = false;

  export default {
    data () {
      return {
        comsumeList: [],
        heightStyle: [],
        time: '',
        originalSize: 5,
        size: 5,
        increase: 5,
        more: 1
      }
    },
    created(){
      var date = new Date();
      var mounth = "";
      if ((date.getMonth() + 1) < 10) {
        mounth = "0" + (date.getMonth() + 1);
      } else {
        mounth = date.getMonth() + 1
      }
      this.getTransactionList(date.getFullYear() + '' + mounth, this.originalSize);
    },
    mounted() {

      this.moveinit();
    },
    methods: {
      getTransactionList(comsumeDay, size)
      {
        this.more = 2;
        this.$http.get('/plat/getTransactionList', {params: {'comsumeDay': comsumeDay, 'size': size}}).then(
          (res) => {
            this.comsumeList = res.data;
            this.more = 3;
          }, (err) => {
          }
        );
        this.heightStyle = {
          'height': screen.height - 280 + 'px'
        }

      },
      toGetMore()
      {
        this.size = this.size + this.increase;
        this.getTransactionList(this.time, this.size);
      },

      moveinit() {
        clientW = $(window).width();
        clienX = "";
        document.getElementById("moveTop").addEventListener("touchstart", this.touchstart, false);
        document.getElementById("moveTop").addEventListener("touchmove", this.touchmove, false);
        document.getElementById("moveTop").addEventListener("touchend", this.touchend, false);
        var date = new Date();
        var mounth = "";
        if ((date.getMonth() + 1) < 10) {
          mounth = "0" + (date.getMonth() + 1);
        } else {
          mounth = date.getMonth() + 1
        }
        $("#year").html(date.getFullYear());
        $("#month").html(mounth);
        this.getDateList(date.getFullYear(), mounth); //当月高亮选中
        self.time = date.getFullYear() + "/" + date.getMonth() + 1;
      },

      touchstart(event) {
        event = event || window.event;
        clienX = event.touches[0].clientX;
        marginLeft = $("#moveTop .listMain").css("margin-left").replace("px", "");
        endFlag = false;
      },

      touchmove(event) {
        leftOrRightFlag = "";
        // if (!mouveFlag) {
        //   return;
        // }
        endFlag = true;
        event = event || window.event;
        var thisX = event.touches[0].clientX;
        var cha = thisX - clienX;
        var ma = parseInt(marginLeft) + parseInt(cha);
        $("#moveTop .listMain").css("margin-left", ma + "px");
        var clideCha = (clientW / 3) - Math.abs(cha);
        if (0 < clideCha < 1) {
          mouveFlag = false;
        }
        if (cha > 0) {
          leftOrRightFlag = "right";
          this.changeStyle(cha, "right");
          indexThis = 1;
        } else if (cha < 0) {
          leftOrRightFlag = "left";
          this.changeStyle(cha, "left");
          indexThis = 3;
        }
      },

      touchend(event) {
        let self = this;
        let day = '';
        if (!endFlag) {
          mouveFlag = true;
          return;
        }
        var marginVal = "";
        if (leftOrRightFlag == "left") {
          marginVal = "-66.66%";
        } else if (leftOrRightFlag == "right") {
          marginVal = "0";
        } else {
          return;
        }
        $("#moveTop .listMain").animate({
          "margin-left": marginVal
        }, 300, function () {
          $("#moveTop .listMain").attr("style", "");
          $("#moveTop .listMain .dateList span").attr("style", "");
          mouveFlag = true;
          var obj = $("#moveTop .listMain .dateList");
          var year = parseInt($(obj[indexThis]).find("span").attr('data-year'));
          var mounth = parseInt($(obj[indexThis]).find("span").attr('data-mounth'));
          $("#year").html(year);
//      if(mounth<10){
//          mounth="0"+mounth;
//      }
          $("#month").html(mounth);
          self.getDateList(year, mounth);
//      document.getElementById('time').value=year+"/"+mounth;
          self.time = year + "/" + mounth;
        });
        return day;
      },

      getDateList(year, mounth) {
        var html = "";
        for (var i = -2; i < 3; i++) {
          html += "<div class='dateList'>"
          var className = "";
          if (i == 0) {
            className = "big";
          } else {
            className = "small";
          }
          var thisYear = "";
          var thisMounth = "";
          var date1 = new Date(year, (mounth + i - 1));
          thisYear = date1.getFullYear();
          thisMounth = date1.getMonth() + 1;
          html += "<span class='" + className + "' data-year='" + thisYear + "' data-mounth='" + thisMounth + "'>" + thisYear + "年" + thisMounth + "月" + "</span></div>"
        }
        $("#moveTop .listMain").html(html);

      },

      changeStyle(cha, type) {
        var bl = (cha / (clientW / 3)) * 20;
        var index = "";
        var obj = $("#moveTop .dateList");
        if (type == "right") {
          $(obj[2]).find("span").css({
            "width": (100 - bl) + "px",
            "height": (100 - bl) + "px",
            "line-height": (100 - bl) + "px",
            "border-radius": (100 - bl) + "px"
          });
          $(obj[1]).find("span").css({
            "width": (80 + bl) + "px",
            "height": (80 + bl) + "px",
            "line-height": (80 + bl) + "px",
            "border-radius": (80 + bl) + "px"
          });
        } else if (type == "left") {
          $(obj[2]).find("span").css({
            "width": (100 + bl) + "px",
            "height": (100 + bl) + "px",
            "line-height": (100 + bl) + "px",
            "border-radius": (100 + bl) + "px"
          });
          $(obj[3]).find("span").css({
            "width": (80 - bl) + "px",
            "height": (80 - bl) + "px",
            "line-height": (80 - bl) + "px",
            "border-radius": (80 - bl) + "px"
          })
        }
      }
    },
    watch: {
      time: function (val) {

        this.size = this.originalSize;
        this.getTransactionList(val, this.originalSize);

      },
    }
  }


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='css'>
  @import "../assets/css/app/transactionList.css";



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
