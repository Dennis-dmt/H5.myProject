
require(["../scripts/config.js"], function(){
	require(["jquery","public","cookie"], function($,pub,cookie){
		//注册手机号码
		var arr;
		$("#tele").blur(function(){
			var reg = /^1[0-9]{10}$/;
			var that = $(this);
			if(reg.test($(this).val())){
				var k = localStorage.getItem("user");
				arr = [];
				if(k){
					arr = JSON.parse(k);
					var newarr1=arr.filter(function(value){
						return value.tele == that.val();
					})
					if(newarr1.length == 0){
						arr.push({
							"tele":$(this).val()
						});
						$(this).parent().css({
							"border":'1px solid rgb(30, 230, 30)'
						})
						//localStorage.setItem("user",JSON.stringify(arr));
					}else{
						alert('该手机已经被注册过了')
					}
				}else{					
					arr.push({
						"tele":$(this).val()
					})
					//正确变色
					$(this).parent().css({
						"border":'1px solid rgb(30, 230, 30)'
					})
					//localStorage.setItem("user",JSON.stringify(arr));
				}
			}else{
				alert("请输入11位数的手机号码")
			}			
		})

		//输入密码
		$("#password").blur(function(){
			var reg = /^[\da-zA-Z]{6}$/;
			if(reg.test($(this).val())){
				$(this).parent().css({
					"border":'1px solid rgb(30, 230, 30)'
				})
			}else{
				alert("密码格式不正确")
			}
		})
		
		//确认密码
		$("#confirm").blur(function(){
			if($(this).val()==$("#password").val()){
				arr[arr.length-1].pass=$(this).val()
				arr[arr.length-1].state=1;
				$(this).parent().css({
					"border":'1px solid rgb(30, 230, 30)'
				})
			}else{
				alert("重新校验密码");
			}
		})
		
		//点击提交
		$("#btn").on('click',function(){
			localStorage.setItem("user",JSON.stringify(arr));
			location.href = "http://localhost:8000/pages/index.html";
		})
	

	
	})
})
