require(["../scripts/config.js"],function(){
    require(["jquery","public","cookie"],function($,pub,cookie){
        //二维码
		$(".bar li:nth-child(3)").hover(function(){
			$(this).find("div").fadeIn(100).animate({
				top:24
			},100)
		},function(){
			$(this).find("div").fadeOut(100).animate({
				top:30
			},100)
        })
        
		//获取cookie渲染数据
		var arrcookie = JSON.parse(cookie.getCookie("plist"))
		var str = "";
		for(var i=0;i<arrcookie.length;i++){
			str+=`<ul>
					<li><input type="checkbox" name="" class="c_box"></li>
					<li>
						<img src="${arrcookie[i].src}" alt="">
						<span>${arrcookie[i].title}</span> 
					</li>
					<li><p>规格：300ml</p></li>
					<li><s>${arrcookie[i].oldPrice}</s><p>${arrcookie[i].nowPrice}</p></li>
					<li>
						<span class="num_op minus" title="减少1个数量">-</span>
						<input type="text" name="" id="txt" value="${arrcookie[i].goodNum}">
						<span class="num_op add" title="增加1个数量">+</span>
					</li>
					<li>￥<i>${arrcookie[i].nowPrice*arrcookie[i].goodNum}</i></li>
					<li><span itemNum=${arrcookie[i].itemNum} id="delete_car">删除</span></li>
				</ul>`
		}
		$(".shop_items").append(str);
       
		$(".shop_items").on("click","#delete_car",function(){
			$(this).parent().parent().remove()
			var id = $(this).attr("itemNum")
			console.log(id)
			for(var i=0;i<arrcookie.length;i++){
				if(arrcookie[i].itemNum==id){
					arrcookie.splice(i,1)
					cookie.setCookie("plist",JSON.stringify(arrcookie),7)
				}
			}
			if(arrcookie.length==0){
				cookie.setCookie("plist","1",-1)
			}
		})

		//购物车数量增减
		$(".shop_items").on("click",".minus",function(){
			var num = parseInt($(this).next().val())
			if(num==1){
				num=1
			}else{
				num--
			}
			$(this).next().val(num);
			$(this).parent().next().find("i").html(num*$(this).parent().prev().find("p").html())
			// var id = $("#delete_car").attr("itemNum")
			// for(var i=0;i<arrcookie.length;i++){
			// 	if(arrcookie[i].itemNum==id){
			// 		arrcookie[i].goodNum = num;
			// 		cookie.setCookie("plist",JSON.stringify(arrcookie),7)
			// 	}
			// }
			setcookie(function(i){
				arrcookie[i].goodNum = num;
			})
		})
		$(".shop_items").on("click",".add",function(){
			var num = parseInt($(this).prev().val());
			num++;
			$(this).prev().val(num);
			$(this).parent().next().find("i").html(num*$(this).parent().prev().find("p").html())
			setcookie(function(i){
				arrcookie[i].goodNum = num;
			})
		})
		//数量改变存cookie
		$(".shop_items").on("input","#txt",function(){
			// var id = $("#delete_car").attr("itemNum");
			// for(var i=0;i<arrcookie.length;i++){
			// 	if(arrcookie[i].itemNum==id){
			// 		arrcookie[i].goodNum = $(this).val();
			// 		cookie.setCookie("plist",JSON.stringify(arrcookie),7)
			// 	}
			// }
			var that = $(this)
			setcookie(function(i){
				arrcookie[i].goodNum = that.val();
			})
			$(this).parent().next().find("i").html($(this).val()*$(this).parent().prev().find("p").html())
		})

		function setcookie(callback){
			var id = $("#delete_car").attr("itemNum")
			for(var i=0;i<arrcookie.length;i++){
				if(arrcookie[i].itemNum==id){
					callback(i);
					cookie.setCookie("plist",JSON.stringify(arrcookie),7)
				}
			}
		}













    })
})