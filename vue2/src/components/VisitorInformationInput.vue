<template>
  <div>
    <div class="visitLists" style="margin-top: 30px;">
      <div class="visitList">
        <div class="logo laifangName"></div>
        <div class="content">
          <div class="name" v-show="!nameFlag" v-html="nameErrorMsg"></div>
          <input class="inputMain psection" :style="nameFlag ? 'height:100%':'height:28px' " type="text"
                 v-model="name" placeholder="被访人姓名" @blur="inputBlurfun('name');"/>
        </div>
      </div>

      <div class="visitList">
        <div class="logo lianxifangshi" style="background-size: 19px;"></div>
        <div class="content">
          <div class="name" v-show="!mobileFlag" v-html="mobileErrorMsg"></div>
          <input class="inputMain psection" :style="mobileFlag ? 'height:100%':'height:28px' " v-model.number="mobile"
                 placeholder="被访人联系方式" type="number"
                 @blur="inputBlurfun('mobile');"/>
        </div>
      </div>

      <div class="visitList">
        <div class="logo laifangNum"></div>
        <div class="content">
          <div class="name" v-show="!numFlag" v-html="numErrorMsg"></div>
          <input class="inputMain psection" :style="numFlag ? 'height:100%':'height:28px' "
                 id="NumInputBig" v-model.number="num" type="number"
                 placeholder="来访人数" @blur="inputBlurfun('num');"/>
        </div>
      </div>

      <div class="visitList">
        <div class="logo shiyou"></div>
        <div class="content">
          <div class="name" v-show="!shiyouFlag" v-html="shiyouErrorMsg"></div>
          <input class="inputMain psection" id="ShiyouInputBig" :style="shiyouFlag ? 'height:100%':'height:28px' "
                 v-model="shiyou" placeholder="来访事由" type="text"
                 @blur="inputBlurfun('shiyou');"/>
        </div>
      </div>

      <div class="visitList">
        <div class="logo time"></div>
        <div class="content">
          <input class="inputMain" type="datetime-local" id="TimeInputBig" @change="inputBlurfun('time');" v-model="time"
                 placeholder="来访时间"/>
        </div>
      </div>

    </div>
    <div class="endVisit">
      <div class="nextStep">
        <span :style="clickFlag ? '' : 'background-color: #94cea8;' " @click="nextStep();">登记</span>
      </div>
    </div>
    <div style="padding: 0 45px;color: red;">{{errorMsg}}</div>
  </div>
</template>

<script>
  //  import {reg} from '../assets/js/reg'
  export default {
    data () {
      return {
        mobile: '',
        num: '',
        name: '',
        shiyou: '',
        time: '',
        mobileFlag: true,
        numFlag: true,
        nameFlag: true,
        shiyouFlag: true,
        nameErrorMsg: '',
        numErrorMsg: '',
        shiyouErrorMsg: '',
        mobileErrorMsg: '',
        clickFlag: true,
        errorMsg:""
      }
    },
    methods: {
      inputBlurfun(type){
        var obj = {
          "name": "被访人姓名",
          "mobile": "被访人联系方式",
          "num": "来访人数",
          "shiyou": "来访事由"
        };
        this.errorMsg="";
        if (this[type] != "" && this[type] != null && this[type] != undefined) {
          this[type + "Flag"] = false;
          this[type + "ErrorMsg"] = obj[type];
        } else {
          this[type + "Flag"] = true;
          this[type + "ErrorMsg"] = "";
        }
        if (
          this.mobile != "" && this.mobile != undefined && this.mobile != null
          && this.num != "" && this.num != undefined && this.num != null
          && this.name != "" && this.name != undefined && this.name != null
          && this.shiyou != "" && this.shiyou != undefined && this.shiyou != null
          && this.time != "" && this.time != undefined && this.time != null
        ) {
          this.clickFlag = false;
        } else {
          this.clickFlag = true;
        }

      },
      nextStep(){
        if (this.clickFlag) {
          return;
        }
        this.clickFlag = true;
        let params={'visitName':this.$route.params.visitor.visitName,
          'companyName':this.$route.params.visitor.companyName,
          'visitPhone':this.$route.params.visitor.visitPhone,
          'visitTimeStr':this.time,
          'status':'1',
          'interviewee':this.name,
          'intervieweePhone':''+this.mobile,
          'visitNum':''+this.num,
          'visitReason':this.shiyou,
          'flag':this.$route.params.visitor.flag};
          this.$http.post(
            '/plat/newVisit',
              params
            ).then(function (res) {
           if('000'===res.data)
           {
//               this.errorMsg = "访问登记成功，正在接受申请中";
             this.$router.push('/SuccessfuRegistration');
           }else if('001'===res.data){
             this.clickFlag = false;
             this.errorMsg = "访问登记失败，访问人联系方式不存在";
           }else if('002'===res.data){
             this.clickFlag = false;
             this.errorMsg = "访问登记失败，访问公司不存在";
           }else {
             this.clickFlag = false;
             this.errorMsg = "访问登记失败";
           }
          }, function () {
            // 失败回调
          });
//        var errorFLag = true;
//        if (!(checkValByExp(this.name, "name"))) {
//          this.nameErrorMsg = "<span style='color: red'>姓名格式有误，请重填</span>";
//          errorFLag = false;
//        }
//
//        if (checkValByExp(this.mobile, "mobile")) {
//          this.moneyMsg = "<span style='color: red'>联系方式格式有误，请重填</span>";
//          errorFLag = false;
//        }
//
//        if (!(checkValByExp(this.num, "positiveInteger"))) {
//          this.numErrorMsg = "<span style='color: red'>来访人数格式有误，请重填</span>";
//          errorFLag = false;
//        }
//        if (!(checkValByExp(this.shiyou, "name "))) {
//          this.shiyouErrorMsg = "<span style='color: red'>来访事由格式有误，请重填</span>";
//          errorFLag = false;
//        }
//        if (!errorFLag) {
//          return;
//        }
//        alert("success");
      }
    }
  }
  var regexEnum = {
    name: "^([\\u4e00-\\u9fa5a-zA-Z.·]+\\s{0,1})*[\\u4e00-\\u9fa5a-zA-Z.·]$", //汉字和字母y、圆点、空格(中间只能有一个空格)
    mobile: "^((\\+?86)|(\\(\\+86\\)))?(13[0123456789][0-9]{8}|15[012356789][0-9]{8}|18[0123456789][0-9]{8}|17[02356789][0-9]{8}|14[57][0-9]{8})$", //手机
    positiveInteger: "^[1-9]\\d*$" //正整数
  };
  //通过正则校验数据
  function checkValByExp(val, regex) {
    var reg = new RegExp(eval("regexEnum." + regex));
    if (!reg.test(val)) {
      return false;
    } else {
      return true;
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='css'>
  body{
    margin-top: 0px;
  }
  @import "../assets/css/app/visitEnd.css";
  .visitLists .visitList .content input, body {
    background-color: white;
  }
</style>
