var regexEnum = {
	integer: "^-?[1-9]\\d*$", //整数
	positiveInteger: "^[1-9]\\d*$", //正整数
	positiveIntegerZero: "^[0-9]\\d*$", //正整数
	negtiveInteger: "^-[1-9]\\d*$", //负整数
	nonnegativeNumber: "^\\d+(\\.{0,1}\\d+){0,1}$", //非负数 xww 20170110 门诊面积只能是数字，或者小数
	digit: "^([+-]?)\\d*\\.?\\d+$", //数字
	positive: "^[1-9]\\d*|0$", //正数（正整数 + 0）
	negtive: "^-[1-9]\\d*|0$", //负数（负整数 + 0）
	bigZeroDigit: "^(?:[1-9][0-9]*(?:\.[0-9]+)?|0\.(?!0+$)[0-9]+)$", // 大于零的所有数字
	digitOrDecmal: "^[1-9]\\d*|0|[1-9]\\d*.\\d*|0.\\d*[1-9]\\d*$", // 正数或者正浮点数
	decmal: "^([+-]?)\\d*\\.\\d+$", //浮点数
	positiveDecmal: "^[1-9]\\d*.\\d*|0.\\d*[1-9]\\d*$",
	　　 //正浮点数
	negtiveDecmal: "^-([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*)$",
	　 //负浮点数
	decmals: "^-?([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*|0?.0+|0)$",
	　 //浮点数
	positiveDecmals: "^[1-9]\\d*.\\d*|0.\\d*[1-9]\\d*|0?.0+|0$",
	　　 //非负浮点数（正浮点数 + 0）
	negtiveDecmals: "^(-([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*))|0?.0+|0$",
	　　 //非正浮点数（负浮点数 + 0）
	email: "^([a-zA-Z0-9]+[\-|_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[\-|\_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}?$", //邮件
	bank_verifu_email: "^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\\.[a-zA-Z0-9_-]{2,3}){1,2})$",
	color: "^[a-fA-F0-9]{6}$", //颜色
	bankNum: "^(\\d{16}|\\d{19})$",
	url: "^http[s]?:\\/\\/([\\w-]+\\.)+[\\w-]+([\\w-./?%&=]*)?$", //url
	china: "^[\\u4E00-\\u9FA5\\uF900-\\uFA2D]+$", //仅中文
	ascii: "^[\\x00-\\xFF]+$", //仅ACSII字符
	zipCode: "^\\d{6}$", //邮编
	mobile: "^((\\+?86)|(\\(\\+86\\)))?(13[0123456789][0-9]{8}|15[012356789][0-9]{8}|18[0123456789][0-9]{8}|17[02356789][0-9]{8}|14[57][0-9]{8})$", //手机
	ip: "^(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)$", //ip地址
	picture: "(.*)\\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$", //图片
	rar: "(.*)\\.(rar|zip|7zip|tgz)$", //压缩文件
	date: "^\\d{4}(\\-|\\/|\.)\\d{1,2}\\1\\d{1,2}$", //日期
	qq: "^[1-9]*[1-9][0-9]*$", //QQ号码
	tel: "(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}", //电话号码的函数(包括验证国内区号,国际区号,分机号)
	userName: "^[a-zA-Z][a-zA-Z0-9_]{7,24}$", //用来用户注册。匹配由数字、26个英文字母或者下划线组成的字符串
	userNameNew: "^[a-zA-Z0-9_]{8,25}$", //用来用户注册。匹配由数字、26个英文字母或者下划线组成的字符串
	name: "^([\\u4e00-\\u9fa5a-zA-Z.·]+\\s{0,1})*[\\u4e00-\\u9fa5a-zA-Z.·]$", //汉字和字母y、圆点、空格(中间只能有一个空格)
	english: "^[A-Za-z]+$", //字母
	bigEnglish: "^[A-Z]+$", //大写字母
	smallEnglish: "^[a-z]+$", //小写字母
	digitOrEnglish: "^[A-Za-z0-9]+$", //数字和字母
	chinaOrEnglish: "^[\\u4e00-\\u9fa5a-zA-Z]+$", //汉字和字母
	china: "^[\\u4e00-\\u9fa5]+$", //汉字
	cEDigit: "^[a-zA-Z0-9\\u4e00-\\u9fa5（）()]+$", //汉字,字母,数字,括号
	digtOrEglsOrspecial: "^[A-Za-z0-9`~!@#$%^&*()_+=\-|{}':;'" + '"' + ",\\[\\].<>/?~·！@#￥……&*（）——|{}【】’‘；：”“'。，、？\\《》]+$", //数字、字母、特殊字符
	chinaOrdigtOrEglsOrspecial: "^[\\u4e00-\\u9fa5A-Za-z0-9`~!@#$%^&*()_+=\-|{}':;'" + '"' + ",\\[\\].<>/?~·！@#￥……&*（）——|{}【】’‘；：”“'。，、？\\《》]+$", //汉字、数字、字母、特殊字符
	special: "^[`~!@#$%^&*()_+=\\-|{}':;'" + '"' + ",\\[\\].<>/?~·！@#￥……&*（）——|{}【】’‘；：”“'。，、？\\《》]+$", //特殊字符
	specials: "[`~!@#$%^&*()_+=\\-|{}':;'" + '"' + ",\\[\\].<>/?~·！@#￥……&*（）——|{}【】’‘；：”“'。，、？\\《》]", //密码强度检查特殊字符
	account: "^[a-zA-Z][a-zA-Z0-9_]{0,}|([a-zA-Z0-9]+[\-|_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[\-|\_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}?|(13[0123456789][0-9]{8}|15[012356789][0-9]{8}|18[0123456789][0-9]{8}|17[678][0-9]{8}|170[059][0-9]{7}|14[57][0-9]{8})$", //登陆名
	accountNew: "^[a-zA-Z0-9_]{8,12}$", //8-12位字母/数字/下划线
	password: "^(?!(?:[^a-zA-Z]|\D|[a-zA-Z0-9])$).{8,}$", //8-16位字母/数字/下划线
	passwordNew: "^[a-zA-Z0-9]{8,16}$", //8-16位字母/数字
	idCard: "(^\\d{15}$)|(^\\d{18}$)|(^\\d{17}(\\d|X|x)$)", //身份证
	taiwanCard: "^[A-Za-z0-9()]{8,8}$|^[A-Za-z0-9()]{10,10}$|^[A-Za-z0-9()]{13,13}$", //台胞证规则
	HKMCard: "^[HM][0-9]{0,10}$", //港澳通行证
	Passport: "^[a-zA-Z0-9]{0,15}$", //护照
	militaryID: "南字第(\\d{8})号|北字第(\\d{8})号|沈字第(\\d{8})号|兰字第(\\d{8})号|成字第(\\d{8})号|济字第(\\d{8})号|广字第(\\d{8})号|/南字第(\\d{8})号|北字第(\\d{8})号|沈字第(\\d{8})号|兰字第(\\d{8})号|成字第(\\d{8})号|济字第(\\d{8})号|广字第(\\d{8})号|海字第(\\d{8})号|空字第(\\d{8})号|参字第(\\d{8})号|政字第(\\d{8})号|后字第(\\d{8})号|装字第(\\d{8})号", //军官证
	huixiangCard: "^[a-zA-Z0-9]{0,25}$", //回乡证
	otherCard: "^[a-zA-Z0-9\-]{0,25}$", //其他证件类型
	money: "^[0-9]+(.[0-9]{0,2})?$", //金额规则
	money1: "^([1-9][\\d]{0,7}|0)(\\.[\\d]{1,2})?$", //金额规则20160623wzb
	detailAddress: "^([a-zA-Z0-9\\u4e00-\\u9fa5（）()，。：；·、#\-_|/——,.]+\\s{0,1})*[a-zA-Z0-9\\u4e00-\\u9fa5（）()，。：；·、#\-_|/——,.]", //详细地址
	digtOrEglsOrspecialOrChina: "^[\\u4e00-\\u9fa5A-Za-z0-9`~!@#$%^&*()_+=\-|{}':;'" + '"' + ",\\[\\].<>/?~·！@#￥……&*（）——|{}【】’‘；：”“'。，、？\\《》]+$", //汉字，数字、字母、特殊字符
	website: "^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+", //网址正则
	pwdInputreg1: "^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$)" //密码强度
};
//通过正则校验数据
function checkValByExp(val, regex) {
	if(val == "" || val == null || val == undefined) {
		return false;
	}
	var reg = new RegExp(eval("regexEnum." + regex));
	if(!reg.test(val)) {
		return false;
	} else {
		return true;
	}
}

//通过正则校验数据
function checkVal(val, regex) {
	if(val == "" || val == null || val == undefined) {
		return false;
	}
	return true;
}

function changePassType() {
	$(".changType").click(function() {
		var left = "";
		var bc = "";
		var type = "";
		var index = $(".changType").index(this);
		var slideObj = $(".changType .slideMain")[index]
		if($(slideObj).css('background-color') == "rgb(133, 179, 248)") {
			left = "0px";
			bc = '#dedede';
			type = "password";
		} else {
			left = "30px";
			type = "text";
			bc = '#85b3f8';
		}
		$(slideObj).animate({ left: left }, 200, function() {
			$(this).css({
				'background-color': bc
			});
			$(slideObj).parent().parent().parent().find('input')[0].type = type;
		});
	});
}

function errorMsg(obj) {
	var html = "<div style='width:100%;height:25px;line-height:25px;text-align: left;color: red;font-size:14px'>" + obj.message + "</div>"
	return html;
}

function checkImfFlag(v) {
	if(v == "" || v == null || v == undefined) {
		return false;
	}
	return true;
}

var bombBoxObj = {
	type: '1', //1 提示语 2 加载
	'content': '' //内容
}

//function bombBox(obj) {
//	var o = $.extend(bombBoxObj, obj);
//	var html = "";
//	html += "<div id='bombBox' style='width:100%;height:100%;position:fixed;top:0;left:0;background-color: rgba(0,0,0,0.8);z-index:10000;display: inline-block;text-align: center;>"
//	html +="<i style='display: inline-block;width: 1px;height: 100%;vertical-align: middle;'></i>"
//	if(o.type == "1") {
//html +="<div style='width:150px;background:white;color: black;vertical-align: middle;display: inline-block;height: 28px;line-height: 28px;border-radius: 4px;'>asdf</div>"
//	}
//	html += "</div>";
//	$("body").append(html);
//}

export {
	changePassType,
	errorMsg,
	checkImfFlag,
	checkValByExp,
	checkVal
}