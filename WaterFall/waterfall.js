/**
 * Created by sofiaZ on 18/3/31.
 */
window.onload = function () {
    //实现瀑布流
    waterfall("main", "box");
    //假如这是后台传来的json格式的数据对象
    var dataInt = {"data": [{"src": "0.jpg"}, {"src": "1.jpg"}, {"src": "2.jpg"}]};
    //拖动窗口滚动条时发生的事
    window.onscroll = function () {
        if (checkScrollSlide) {
            var oParent = document.getElementById("main");
            //将数据块渲染到当前页面的尾部
            for (var i = 0; i < dataInt.data.length; i++) {
                var oBox = document.createElement("div");
                oBox.className = "box";
                oParent.appendChild(oBox);
                var oPic = document.createElement("div");
                oPic.className = "pic";
                oBox.appendChild(oPic);
                var oImg = document.createElement("img");
                oImg.src = "images/" + dataInt.data[i].src;
                oPic.appendChild(oImg);
            }
            waterfall("main", "box");
        }

    }

};

//实现瀑布流布局
function waterfall(parentid, childName) {
    //parentid为父元素的id,childName为子元素的classname
    //将main下的所有class为box的元素取出
    var oParent = document.getElementById(parentid);
    var oBoxs = getByClass(oParent, childName);
    //计算当前列数
    //每一个box的宽度一样，获取一个即可
    var oBoxW = oBoxs[0].offsetWidth;
    var cols = Math.floor(document.documentElement.clientWidth / oBoxW);
    //设置main的当前宽度
    oParent.style.cssText = "width:" + oBoxW * cols + "px;" + "margin:0 auto;";
    //将下一张图片放在高度最矮的列中
    //存放每一列高度的数组
    var hArr = [];
    for (var i = 0; i < oBoxs.length; i++) {
        if (i < cols) {
            hArr.push(oBoxs[i].offsetHeight);
        } else {
            var minH = Math.min.apply(null, hArr);   //这里没有对象调用，只是借用方法，所以用null？？？
            var index = getMinhIndex(hArr, minH);
            oBoxs[i].style.position = "absolute";
            oBoxs[i].style.top = minH + "px";
            //oBoxs[i].style.left=oBoxW*index+"px";
            oBoxs[i].style.left = oBoxs[index].offsetLeft + "px";
            //更新高度
            hArr[index] = hArr[index] + oBoxs[i].offsetHeight;
        }


    }

}



//获得arr数组中值为val的数的下标
function getMinhIndex(arr, val) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == val) {
            return i;
        }
    }
}

//检测是否具备滚动加载数据块的条件
function checkScrollSlide() {
    var oParent = document.getElementById("main");
    var oBoxs = getByClass(oParent, "box");
    var lastNum = oBoxs.length - 1;
    var lastH = oBoxs[lastNum].offsetTop + Math.floor(oBoxs[lastNum].offsetHeight / 2);
    var scrollH = document.body.scrollTop || document.documentElement.scrollTop;  //混杂模式/严格模式
    var clientH = document.body.clientHeight || document.documentElement.clientHeight;
    return (lastH < scrollH + clientH);
    /*
     if(lastH<scrollH+clientH){

     return true;
     }
     return false;
     */
}

//寻找id为oParent父元素下className为clsName的元素
function getByClass(oParent, clsName) {  //oParent为父元素对象，clasNAme为要获取的所有子元素的类名
    var oElements = oParent.getElementsByTagName("*"),
        boxArr = [];
    for (var i = 0; i < oElements.length; i++) {
        if (oElements[i].className == clsName) {
            boxArr.push(oElements[i]);
        }
    }
    return boxArr;
    //返回的是一个数组
}