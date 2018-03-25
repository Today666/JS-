/**
 * Created by sofiaZ on 18/3/22.
 */


 window.onload=drag;


//将获取类名封装起来，IE10以前的浏览器不兼容getElementByClassName()

function  getByClass(clsName,parent){  //必选的参数写在前面
    var oParent=document.getElementById(parent),
        eles=[],
        elements=oParent.getElementsByTagName("*");
    for(var i= 0, l=elements.length; i<l;i++){  //可以同时声明多个变量
        if(clsName==elements[i].className){
            eles.push(elements[i]);
        }
    }
    return eles;
}


//在标题区域按下时，页面移动；释放鼠标时，停止移动
function drag(){
    var oTitle=getByClass("login_logo_webqq","loginPanel")[0];
    //拖曳
    //var oTitle=document.getElementsByClassName("login_logo_webqq")[0];
    //onmousedown在用户按下任何鼠标按钮时触发
    oTitle.onmousedown=fnDown;
    //关闭
    var oClose=document.getElementById("ui_boxyClose");
    oClose.onclick=function(){
        document.getElementById("loginPanel").style.display="none";
    };
    //切换状态
    var loginState=document.getElementById("loginState"),
        stateList=document.getElementById("loginStatePanel"),
        list=stateList.getElementsByTagName("li"),
        stateText=document.getElementById("login2qq_state_txt"),
        loginStateShow=document.getElementById("loginStateShow");

    loginState.onclick=function (e){
        //阻止点击stateList时冒泡到document
        e= e || window.event;
        if(e.stopPropagation){
            e.stopPropagation();
        }else{
            e.cancelBubble=true;
        }
        stateList.style.display="block";
    };
    //鼠标滑过、离开和点击状态列表
    for(var i= 0,l=list.length;i<l;i++){
        list[i].onmouseover=function(){
            this.style.background="#567";
        };
        list[i].onmouseout=function(){
            this.style.background="#fff";
        };
        list[i].onclick= function(e){
            e= e || window.event;
            if(e.stopPropagation){
                e.stopPropagation();
            }else{
                e.cancelBubble=true;
            }
            var id=this.id;
            stateList.style.display="none"; //阻止冒泡后，ul的点击不会触及loginState的点击
            stateText.innerHTML=getByClass("stateSelect_text",id)[0].innerHTML;
            loginStateShow.className="";
            loginStateShow.className="login-state-show"+" "+id;
        }
    }
    document.onclick=function(){
        stateList.style.display="none";
    }
}
 function fnDown(event){
     event=event || window.event;
     var oDrag=document.getElementById("loginPanel"),
         //光标按下时光标和面板之间的距离
         disX=event.clientX-oDrag.offsetLeft,
         disY=event.clientY-oDrag.offsetTop;
     //移动
     document.onmousemove=function(event){
         event=event || window.event;
         fnMove(event,disX,disY);
     };
     //释放鼠标
     document.onmouseup=function(){
         document.onmousemove=null;
         document.onmouseup=null;
     }
 }
function fnMove(e,PosX,PosY){
    var l= e.clientX-PosX,
        b= e.clientY-PosY,
        oDrag=document.getElementById("loginPanel"),
        winW=document.documentElement.clientWidth || document.body.clientWidth,
        winH=document.documentElement.clientHeight || document.body.clientHeight;
        maxW=winW-oDrag.offsetWidth-10;   //关闭钮设置的top=-10，right=-10
        maxH=winH-oDrag.offsetHeight;
        if(l<0){
            l=0;
        }else if(l>maxW){
            l=maxW;
        }
        if(b<0){
            b=10;
        }else if(b>maxH){
            b=maxH;
        }
    oDrag.style.left=l+"px";
    oDrag.style.top=b+"px";
}