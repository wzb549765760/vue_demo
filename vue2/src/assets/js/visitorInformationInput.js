var visitorInformationInput = angular.module('visitorInformationInput', []);
var clickFlag = true;
visitorInformationInput.controller("visitorInformationCtrl", function($scope, $sce) {
	$scope.obj = {
		"showName": true,
		"hideName": false,
		"showMobile": true,
		"hideMobile": false,
		"showNum": true,
		"hideNum": false,
		"showShiyou": true,
		"hideShiyou": false,
		"showTime": true,
		"hideTime": false,
		"NameTittle": "",
		"MobileTittle": "",
		"NumTittle": "",
		"ShiyouTittle": "",
		"TimeTittle": "",
		"NameError": "来访人",
		"MobileError": "联系方式",
		"NumError": "来访人数",
		"ShiyouError": "来访事由"

	};
	$scope.valName = "";
	$scope.valMobile = "";
	$scope.valNum = "";
	$scope.valShiyou = "";
	$scope.valTime = "";
	$scope.keyupCtrl = function(type) {
		if(checkVal($scope['val' + type])) {
			$scope.obj["show" + type] = false;
			$scope.obj["hide" + type] = true;
			setTimeout(function() {
				document.getElementById(type + 'InputSmall').focus();
				$scope[type + "ErrorTittle"] = $sce.trustAsHtml("<span>" + $scope.obj[type + 'Error'] + "</span>");
			}, 0);
		} else {
			$scope.obj["show" + type] = true;
			$scope.obj["hide" + type] = false;
			setTimeout(function() {
				document.getElementById(type + 'InputBig').focus();
			}, 0);

		}
	}
	$scope.blurCtrl = function(type) {
		var date = document.getElementById('TimeInputBig');
		if(checkVal($scope.valName) && checkVal($scope.valMobile) && checkVal($scope.valNum) && checkVal($scope.valShiyou) && checkVal(date.value)) {
			$scope.style = {
				"background": "#94cea8"
			}
			clickFlag = false;
		} else {
			$scope.style = {
				"background": "#d5d5d5"
			}
			clickFlag = true;
		}
		$scope.obj[type + "Tittle"] = {
			"border-bottom": ""
		}

	}

	$scope.focusCtrl = function(type) {
		$scope.obj[type + "Tittle"] = {
			"border-bottom": "1px solid #94cea8"
		}
	}

	$scope.nextStep = function() {
		//有为空的时候则直接放回
		if(clickFlag) {
			return;
		}
		var flag = true;
		for(var i = 0; i < 2; i++) {
			if(!checkValByExp($scope.valName, "name")) { //姓名
				$scope.NameErrorTittle = returnHtmlApp("来访人格式不正确，请重新输入", $sce);
				flag = false;
			}
			if(!checkValByExp($scope.valMobile, "mobile")) { //联系方式
				$scope.MobileErrorTittle = returnHtmlApp("联系方式格式不正确，请重新输入", $sce);
				flag = false;
			}

			if(!checkValByExp($scope.valNum, "positiveIntegerZero")) { //姓名
				$scope.NumErrorTittle = returnHtmlApp("来访人数格式不正确，请重新输入", $sce);
				flag = false;
			}

			if(!checkValByExp($scope.valShiyou, "detailAddress")) { //事由
				$scope.ShiyouErrorTittle = returnHtmlApp("来访事由格式不正确，请重新输入", $sce);
				flag = false;
			}
		}

		if(!flag) return;
		alert(123123);

	}
})