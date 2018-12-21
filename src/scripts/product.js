require(["../scripts/config.js"],function(){
    require(["jquery","public","cookie","swiper"],function($,pub,cookie,Swiper){
		
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
        
		//获取商品num号码
		var productNum = location.search.match(/\d+/)[0];
		//商品详情渲染
		for(var i=1;i<12;i++){
			$.ajax({
				url:`http://localhost:8000/data/${i}.json`,
				success:function(data){
					//console.log(data.items)
					for(let j=0;j<data.items.length;j++){
						if(data.items[j].itemNum==productNum){
							var str=`<div class="view">
										<img src="${data.items[j].picUrl}" alt="">
										<span id="mirror"></span>
									</div>
									<div class="view_big">
										<img src="${data.items[j].picUrl}" alt="">
									</div>
									<div class="view_thumbs">
										<ul>
											<li><img src="${data.items[j].picUrl}" alt=""></li>
											<li><img src="${data.items[data.items.length-2].picUrl}" alt=""></li>
											<li><img src="${data.items[data.items.length-4].picUrl}" alt=""></li>
											<li><img src="${data.items[data.items.length-6].picUrl}" alt=""></li>
										</ul>		
									</div>`;
									$(".pro_right").append(str);
							
							var str2 =`<dt class="item_name">;
											<h1>${data.items[j].title}</h1>
											<p>清清爽爽收毛孔</p>
										</dt>
										<dd class="item_info">
											<ul>
												<li><span>市场价</span><s>￥173.00</s></li>
												<li><span>丽子价</span>￥<i>${data.items[j].nowPrice}.00</i></li>
												<li><span>销&nbsp;&nbsp;&nbsp;量</span>最近出售<i>${data.items[j].salesVolume}</i>件</li>
												<li><span>评&nbsp;&nbsp;&nbsp;价</span><i>4.9分</i>（<a href="#">已有1569人评价</a>）</li>
												<li><span>规&nbsp;&nbsp;&nbsp;格</span><a href="#" id="box">盒装</a></li>
												<li>
													<span>数&nbsp;&nbsp;&nbsp;量</span><input type="button" value="-" id="btndown"><input type="text" name="" id="txt" value="1"><input type="button" value="+" id="btnup">件（存库60件）
												</li>
												<li id="entercar">
													<a itemNum=${data.items[j].itemNum} id="btn_entercar" href="cart.html"></a>
												</li>
												<li>
													<img src="../images/car_bottom.png" alt="">
												</li>
											</ul>
										</dd>`;
										$(".item_detail").append(str2)

							var str3 =`<h3>看了又看</h3>
										<ul>
											<li><a href=""><img src="${data.items[data.items.length-2].picUrl}" alt=""></a><span>${data.items[data.items.length-2].nowPrice}.00</span></li>
											<li><a href=""><img src="${data.items[data.items.length-4].picUrl}" alt=""></a><span>${data.items[data.items.length-4].nowPrice}.00</span></li>
											<li><a href=""><img src="${data.items[data.items.length-6].picUrl}" alt=""></a><span>${data.items[data.items.length-6].nowPrice}.00</span></li>
										</ul>`
										$(".pro_left").append(str3)

							
							break;						
						}
						//console.log(j)
					}
				}
			})
		}


		//商品详情缩略图
		$(".pro_right").on("mouseenter","li",function(){
			$(".view,.view_big").find("img").attr("src",$(this).find("img").attr("src"));

		})
		//商品详情放大镜显示
		$(".pro_right").on("mouseover",".view",function(){
			//显示span和放大的图片
			$(this).find("span").show();
		 	$(this).next().show();
		})
		$(".pro_right").on("mouseout",".view",function(){
			//显示span和放大的图片
			$(this).find("span").hide();
		 	$(this).next().hide();
		})
		$(".pro_right").on("mousemove",".view",function(e){
			var $span=$(".view span");
			var $img=$(".view img");
			var _left=e.pageX-$(".view img").offset().left-$span.width()/2;
			var _top=e.pageY-$(".view img").offset().top-$span.height()/2;
			
			//边界限定
			$span.css({
				top:Math.min($img.height()-$span.height(),Math.max(_top,0)),
				left:Math.min($img.width()-$span.width(),Math.max(_left,0))
			})

			//比率
			var scale = $(".view_big img").width()/$span.prev().width();
			$(".view_big img").css({
				left:-scale*$span.position().left,
				top:-scale*$span.position().top
			})
		})

		//加入购物车数量增减
		$(".item_detail").on("click","#btnup",function(){
			var num = parseInt($("#btnup").prev().val());
			num++;
			$("#btnup").prev().val(num);
		})
		$(".item_detail").on("click","#btndown",function(){
			var num = parseInt($("#btndown").next().val());
			if(num==1){
				num=1;
			}else{
				num--;
			}
			$("#btndown").next().val(num);
		})


		//加入购物车setcookie
		$(".item_detail").on("click","#btn_entercar",function(){
			var jitemNum = $(this).attr("itemNum");
			var jsrc = $(".view").find("img").attr("src");
			var jtitle = $(".item_name").find("h1").html();
			var jnowPrice = $(this).parent().siblings().eq(1).find("i").html();
			var joldPrice = $(this).parent().siblings().eq(0).find("s").html();
			var jgoodNum = $(this).parent().siblings().eq(5).find("#txt").val();
			
			var obj = {
				"itemNum":jitemNum,
				"src":jsrc,
				"title":jtitle,
				"nowPrice":jnowPrice,
				"oldPrice":joldPrice,
				"goodNum":jgoodNum
			}
			console.log(obj)

			var k = cookie.getCookie("plist");
			var arr = [];
			if(k){
                var arr = JSON.parse(k);
                //console.log(arr)
                var newarr1=arr.filter(function(value){
                    return value.itemNum == obj.itemNum
                })
                if(newarr1 == 0 ){
                arr.push(obj)
                //console.log(arr)
                cookie.setCookie("plist",JSON.stringify(arr),7)
                }
            }else{
                arr.push(obj);
                console.log(arr)
                cookie.setCookie("plist",JSON.stringify(arr),7)
            }

        })


		//侧边导航栏高度
		$("#g_sidebar").css({
			height:$(window).height()
		})
		$(".sb_btm li").find("a").hover(function(){
			$(this).next().fadeIn(100).stop(true,true).animate({right:34},100)
		},function(){
			$(this).next().stop(true,true).animate({right:46},100).fadeOut(100)
		})

		//tab切换
		var $tab = $(".detail_left").find("li")
		$tab.click(function(){
			$(this).css({
				background:'#fff'
			}).siblings().css({
				background:'#eeeeee'
			})
			$("#detail_part").find(".part_box").eq($(this).index()).show().siblings().hide()
		})
    })
})