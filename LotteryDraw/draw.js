/**
 * Created by sofiaZ on 18/3/23.
 */
var data=["iPhone5","Ipad","情侣袜","50元话费充值","1000元代金券","佳能相机","谢谢参与"],
    timer=null,
    state=0;

window.onload=function() {
    var play = document.getElementById("play"),
        stop = document.getElementById("stop");
    //鼠标事件
    play.onclick = playDraw;
    stop.onclick = stopDraw;

    //键盘事件
    document.onkeyup = function (e) {
        e = e || window.event;
        if (e.keyCode == 13) {
            if (state == 0) {
                playDraw();
                state = 1;
            } else {
                stopDraw();
                state = 0;
            }
        }
    }
};

function playDraw(){
    var play=document.getElementById("play");
    play.style.background="#999";
    clearInterval(timer);
    timer=setInterval("show()",50);
}

function show(){
    var title=document.getElementById("title");
    var random=Math.floor(Math.random()*data.length);
    title.innerHTML=data[random];
}
function stopDraw() {
    var play = document.getElementById("play");
    clearInterval(timer);
    play.style.background = "#036";
}