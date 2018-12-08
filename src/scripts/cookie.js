define([],function(){
	return {
		//1.设置cookie
	setCookie:function(key,value,num){
		if(num){
			var d = new Date()
			d.setDate(d.getDate()+num)
			document.cookie = key +"="+ value +";expires="+ d;
		}else{
			document.cookie = key +"="+ value;
		}
	},

//2.删除指定cookie
	removeCookie:function(key){
		setCookie(key,"1",-1)
	},

//3.读取指定cookie
	getCookie:function(key){
		var str = document.cookie
		for(var i=0;i<str.split("; ").length;i++){
			if(str.split("; ")[i].split("=")[0] == key){
				return str.split("; ")[i].split("=")[1]
			}
		}
		return "";
	}
	}
})
