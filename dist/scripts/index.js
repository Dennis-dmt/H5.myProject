require(["../scripts/config.js"], function(){
	require(["jquery","public","cookie","swiper"], function($,pub,cookie,Swiper){
		//用户登入改名字
		let k;
		if(localStorage.getItem("user")){
			k= JSON.parse(localStorage.getItem("user"));
			for(var j=0;j<k.length;j++){
				if(k[j].state==1){
					$(".bar").find("li:nth-child(5)").html(k[j].tele+'<a href="#">退出</a>')
					break;
				}
			}
			$(".bar").find("li:nth-child(5)").on('click',"a",function(){
				k[j].state = 0;
				localStorage.setItem("user",JSON.stringify(k));
				$(this).parent().html('<a href="login.html">登入</a>');
			})
		}

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

		//导航显示2级菜单
		$(".nav li:nth-child(1)").hover(function(){
			$(this).find(".main").stop().slideDown(100)
		},function(){
			$(this).find(".main").stop().slideUp(100)
		})

		//轮播图
		var mySwiper1 = new Swiper('#swiper1',{
			autoplay: true,//可选选项，自动滑动
			effect: 'fade',
			loop: true, // 循环模式选项
	  
			// 如果需要分页器
			pagination: {
			  el: '#swiper1 .swiper-pagination',
			  clickable :true,
			},
			 // 如果需要前进后退按钮
			navigation: {
			  nextEl: '#swiper1 .swiper-button-next',
			  prevEl: '#swiper1 .swiper-button-prev',
			}
		});
		$("#swiper1").hover(function(){
			mySwiper1.autoplay.stop()
		},function(){
			mySwiper1.autoplay.start()
		})

		//轮播按钮颜色
		$(".swiper-container").hover(function(){
			$(this).find(".swiper-button-prev").show();
			$(this).find(".swiper-button-next").show();
		},function(){
			$(this).find(".swiper-button-prev").hide();
			$(this).find(".swiper-button-next").hide();
		})

		//60s限购轮播图渲染数据
		$.ajax({
			dataType:"json",
			url:"http://localhost:8000/abc?_=1544527123722",
			success:function(data){
				var str = ``;
				for(let i=0;i<data.data.length;i++){
					str+=`<div class="swiper-slide">
							<a href="#">
								<img src="${data.data[i].pic}" alt="">
								<p class="title">
									<em>${data.data[i].tag}</em>
									${data.data[i].name}
								</p>
								<p class="now">${data.data[i].now}</p>
								<p class="old">市场价：￥${data.data[i].old}</p>
								<p class="btn">立即抢购</p>
								<p class="bg"></p>
							</a>
						</div>`
				};
				//请求过来的数据插入html
				$("#swiper2").find(".swiper-wrapper").append(str);
				//swiper插件生成轮播图
				var mySwiper2 = new Swiper('#swiper2',{
					//carousel mode下定义slides的数量多少为一组。
					slidesPerGroup : 3,
					slidesPerView : 3,
					//在slide之间设置距离
					spaceBetween : 20,
					//autoplay: true,//可选选项，自动滑动
					loop: true, // 循环模式选项
					// 如果需要分页器
					pagination: {
					  el: '#swiper2 .swiper-pagination',
					  clickable :true,
					},
					 // 如果需要前进后退按钮
					navigation: {
					  nextEl: '#swiper2 .swiper-button-next',
					  prevEl: '#swiper2 .swiper-button-prev',
					}
				});

				//绑定事件
				$("#swiper2 a").hover(function(){
					$(this).find("p.bg").show().animate({
						bottom:0
					})
				},function(){
					$(this).find("p.bg").animate({
						bottom:-122
					})
				})
			}
		});

		//加载shoplist数据
		for(let j=1;j<12;j++){
			$.ajax({
				url:`http://localhost:8000/data/${j}.json`,
				success:function(data){
					var str = "";
					for(let i=0;i<data.items.length;i++){
						str+=`<a href="product.html?itemNum=${data.items[i].itemNum}">
								<dl>
									<dt>
										<img src="${data.items[i].picUrl}" alt="">
									</dt>
									<dd>
										<p>${data.items[i].title}</p>
										<strong class="price">￥${data.items[i].nowPrice}</strong>
										<span class="sale">${data.items[i].salesVolume}</span>
									</dd>
								</dl>
							</a>`
					}
					$(".wrapper .shop_wall").append(data.cms+'<div class="shop_list">'
					+str+'</div>')
				}
			})
		};

		//侧边导航栏高度
		$("#g_sidebar").css({
			height:$(window).height()
		})
		$(".sb_btm li").find("a").hover(function(){
			$(this).next().fadeIn(100).stop(true,true).animate({right:34},100)
		},function(){
			$(this).next().stop(true,true).animate({right:46},100).fadeOut(100)
		})
		
	})
})

