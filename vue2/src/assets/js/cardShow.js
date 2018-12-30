var clickFlag = true;
$(function(){
	$("#showErWeiMa .close").click(function(){
		if(clickFlag){
			clickFlag = false;
		}
		$("#showErWeiMa").addClass("transForm");
		$("#accountImf").addClass("hide");
		setTimeout(function(){
			$("#showErWeiMa").addClass("hide");
			$("#accountImf").removeClass("hide");
			$("#accountImf").addClass("transForm1");
		},1400);
		setTimeout(function(){
			$("#accountImf").removeClass("transForm1");
			$("#accountImf").removeClass("transForm");
			$("#showErWeiMa").removeClass("transForm1");
			$("#showErWeiMa").removeClass("transForm");
			clickFlag = true;
		},2800);
	});
	$("#accountImf").click(function(){
		if(clickFlag){
			clickFlag = false;
		}
		$("#accountImf").addClass("transForm");
		$("#showErWeiMa").addClass("hide");
		setTimeout(function(){
			$("#accountImf").addClass("hide");
			$("#showErWeiMa").removeClass("hide");
			$("#showErWeiMa").addClass("transForm1");
		},1400);
		setTimeout(function(){
			$("#accountImf").removeClass("transForm1");
			$("#accountImf").removeClass("transForm");
			$("#showErWeiMa").removeClass("transForm1");
			$("#showErWeiMa").removeClass("transForm");
			clickFlag = true;
		},2800);
	})
})
