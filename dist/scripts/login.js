
require(["../scripts/config.js"], function(){
	require(["jquery","public","cookie"], function($,pub,cookie){
		
		var k;
		if(localStorage.getItem("user")){
			k = JSON.parse(localStorage.getItem("user"));
			console.log(k);
		var obj = {};
		$("#username").blur(function(){
			obj.tele = $(this).val()
		})
		$("#password").blur(function(){
			obj.pass = $(this).val()
		})


		$("#btn").click(function(){
			console.log(obj)
			var onOff = false;
			for(var i=0;i<k.length;i++){
				// console.log(k[i].tele,k[i].pass)
				// console.log(k[i].tele==obj.tele&&k[i].pass==obj.pass)
				if(k[i].tele==obj.tele&&k[i].pass==obj.pass){
					onOff = true;
					break;			
				}
			}
			if(onOff){
				k[i].state = 1;
				localStorage.setItem("user",JSON.stringify(k))
				location.href = "http://localhost:8000/pages/index.html"

			}else{
				alert('您输入的密码和手机有误')
			}		
		})
		}else{
			alert("快去注册")
		}


	})
})
