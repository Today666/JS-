/**
 * Created by sofiaZ on 18/4/7.
 */
$(document).ready(function(){
     waterfall();
    //假如这是后台传来的json格式的数据对象
    var dataInt = {"data": [{"src": "0.jpg"}, {"src": "1.jpg"}, {"src": "2.jpg"}]};
    $(window).on("scroll",function(){
        if(checkScrollSlide){
            //$.each()用于遍历指定对象和数组
            $.each(dataInt.data,function(key,value){
                var $box=$("<div></div>").addClass("box").appendTo($("#main"));
                var $Pic=$("<div></div>").addClass("pic").appendTo($box);
                $("<img />").attr("src","images/"+$(value).attr("src")).appendTo($Pic);
            });
            waterfall();

        }
    })
});

//实现瀑布流布局
function waterfall(){
    //选择一代子元素
    var $boxs=$("#main>div");
    var first=$boxs.eq(0);
    var w = first.outerWidth();
    var cols=Math.floor($(window).width()/w);
    $("#main").width(cols*w).css("margin","0 auto");
    var hArr=[];
    //index为选择器的index位置，value为当前遍历元素(是一个DOM对象)
    $boxs.each(function(index,value){
        var h=$boxs.eq(index).outerHeight();
        if(index<cols){
            hArr[index]=h;
        }else{
            var minH=Math.min.apply(null,hArr);
            //$.inArray用于在数组中查找指定值，并放回它的索引值
            var minHIndex= $.inArray(minH,hArr);
            //$()将DOM对象转化为jQuery对象才能使用jQuery方法
            $(value).css({
                "position":"absolute",
                 "top": minH+"px" ,
                  "left":minHIndex*w+"px"
            });
            hArr[minHIndex]+=$boxs.eq(index).outerHeight();
        }

    })
}

//检测是否具备滚动加载数据块的条件
function checkScrollSlide(){
    //last()匹配元素集合中的最后一个元素，构造一个新的jQuery对象
    var $lastbox=$("#main>div").last();
    var lastDis=$lastbox.offset().top+Math.floor($lastbox.outerHeight()/2);
    var scrollTop=$(window).scrollTop();
    var clientH=$(window).height();
    return (lastDis<scrollTop+clientH);
}