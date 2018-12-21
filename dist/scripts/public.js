define([],function(){
    return{
        //1.范围随机数
    random:function(a,b){
        return Math.round(Math.random()*(b-a)+parseFloat(a))
    },
    
    //2.随机颜色
    randomColor:function(){
        var r = random(0,255).toString(16);
        var g = random(0,255).toString(16);
        var b = random(0,255).toString(16);
        return "#"+createZero(r)+createZero(g)+createZero(b)
    },
    
    //3.补零
    createZero:function(n){
        if(n.length<2 || n<10){
            return `0${n}`;
        }else{
            return `${n}`;
        }
    },
    
    //4.封装日期
    myDate:function(){
        //1.获取年月日，时分秒
        var d = new Date();
        //console.log(d);
        var nian = d.getFullYear();
        var yue = d.getMonth(); //月0-11
        var ri = d.getDate();
        var day = d.getDay(); //周几 0-5
        var hour = d.getHours();
        var minutes = d.getMinutes();
        var second = d.getSeconds();
        //console.log(nian,yue,ri,day,hour,minutes,second)
        //2.输出格式化日期,先通过字符窜拼接日期
        return nian+"年"+createZero((yue+1))+"月"+createZero(ri)+"日"+" "+myDay(day)+" "+createZero(hour)+"时"+createZero(minutes)+"分"+createZero(second)+"秒"
        },
    
     //5.数字转化星期几（周几）
    myDay:function(date){
        switch(date){
            case 0 : date = "星期天";break;
            case 1 : date = "星期一";break;
            case 2 : date = "星期二";break;
            case 3 : date = "星期三";break;
            case 4 : date = "星期四";break;
            case 5 : date = "星期五";break;
            case 6 : date = "星期六";break;
            }
            return date;
        },
    
    //6.阻止事件冒泡的兼容函数
    stopBubble:function(e){
        if(e.stopPropagation){
            e.stopPropagation();
        }else{
            e.cancelBubble = true;
        }
    },
    
    //7.阻止默认事件的兼容函数
    stopDefault:function(e){
        if(e.preventDefault){
            e.preventDefault()
        }else{
            e.returnValue = false;
        }
    },
    
    //8.添加事件监听的封装(必须手写出来)
    addEvent:function(ele,type,callback){
        if(ele.addEventListener){
            ele.addEventListener(type,callback)
        }else if(ele.attachEvent){
            ele.attachEvent("on"+type,callback)
        }else{
            ele["on"+type] = callback;
        }
    },
    
    
    //9.删除事件监听的封装(必须手写出来)
    removeEvent:function(ele,type,callback){
        if(ele.removeEventListener){
            ele.removeEventListener(type,callback)
        }else if(ele.detachEvent){
            ele.detachEvent("on"+type,callback)
        }else{
            ele["on"+type] = null;
        }
    },
    
    //10.获得样式的兼容函数
    getStyle:function(ele,attr){
        if(ele.currentStyle){
            return ele.currentStyle[attr]
        }else{
            return getComputedStyle(ele,false)[attr]
        }
    },
    //console.log(getStyle(obox,"position"))
    
    //11.事件委托的封装
    eveEnt:function(achild,callback){
        return function(eve){
            var e = eve || window.event;
            var target = e.target || e.srcElement;
            for(var i=0;i<achild.length;i++){
                if(target === achild[i]){
                    callback.bind(target)()
                }
            }
        }
    }
    //11.cookie的增
    //12.cookie的删
    //13.cookie的查
    }
})

