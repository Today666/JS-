/**
 * Created by sofiaZ on 18/3/24.
 */
function startMove(Obj,json,fn) {

    //var curr = Obj.getComputedStyle.

    clearInterval(Obj.timer);
    Obj.timer = setInterval(function () {

        var flag=true;

        //遍历
        for(var attr in json){
        //获去当前值
        var curr=0;
        if(attr=="opacity"){
            curr=Math.round(parseFloat(getStyle(Obj,attr))*100);
        }else{
            curr = parseInt(getStyle(Obj, attr));
        }
        //计算速度
         var speed=(json[attr]-curr)/4;
         speed = speed> 0 ? Math.ceil(speed):Math.floor(speed);
        //进行运动
            if(curr!=json[attr]){
                flag=false;
            }

            if(attr=="opacity"){
                Obj.style[attr]=(curr+speed)/100;
                Obj.filter="alpha(opacity"+curr+speed+")";
            }
            else{
                Obj.style[attr] = curr + speed + "px";
            }
        }

        //判断是否停止,当属性值都达到目标后停止
        if (flag) {
            clearInterval(Obj.timer);
            if(fn){
                fn();
            }
        }

    }, 10);


}

function getStyle(Obj, attr) {
    if (Obj.currentStyle) {
        return Obj.currentStyle[attr];
    } else {
        return getComputedStyle(Obj)[attr];
    }
}