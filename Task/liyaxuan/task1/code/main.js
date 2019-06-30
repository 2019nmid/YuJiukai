window.onload = function(){
    mv.app.toTip();
    mv.app.toBanner();
}

var mv={};//命名空间

mv.tools={};
mv.ui={};

mv.tools.getByClass=function(oParent,sClass){
    var aEle = Oparent.getElementsByTagName("*");
    var arr = [];
    for(var i=0;i<aEle.length;i++){
        if(aEle[i]==sClass){
            arr.push(aEle[i]);
        }
    }
    return arr;
}

mv.ui.fadeIn = function(obj){
    var value=0;
    clearInterval(obj.timer);
    obj.timer=setInterval(function () {
        var iSpeed=5;
        if(value==100){
            clearInterval(obj.timer);
        }
        else{
            value+=iSpeed;
            obj.style.opacity = value/100;
            obj.style.filter="alpha(opacity="+value+")";
        }

    },30)
};
mv.ui.fadeOut = function(obj){
      var value=100;
    clearInterval(obj.timer);
    obj.timer=setInterval(function () {
        var iSpeed=-5;
        if(value==0){
            clearInterval(obj.timer);
        }
        else{
            value+=iSpeed;
            obj.style.opacity = value/100;
            obj.style.filter="alpha(opacity="+value+")";
        }

    },30)
};

mv.ui.textChange = function(obj,str) {
    obj.onfocus = function () {
        if (this.value == str) {
            this.value = "";
        }
    }
    obj.onblur = function () {
        if (this.value == '') {
            this.value = str;
        }
    }
}


mv.app={};
mv.app.toTip=function () {
    var oText1 =document.getElementById('text1');
    var oText2 =document.getElementById("text2");

    mv.ui.textChange(oText1,"Search Websites");
    mv.ui.textChange(oText2,"Search Websites");
}

mv.app.toBanner=function(){
    var oDd = document.getElementById("ad");
    var aLi = oDd.getElementsByTagName("li");
    var oPreBg=mv.tools.getByClass(oDd,"prev_bg")[0];
    var oNextBg=mv.tools.getByClass(oDd,"next_bg")[0];

    var oPrev = mv.tools.getByClass(oDd,"prev")[0];
    var oNext = mv.tools.getByClass(oDd,"next")[0];

    var iNow=0;
    var timer=setInterval(auto,3000);
    function auto() {
        if(iNow == aLi.length-1) {

            iNow = 0;
        }
        else{
            iNow++;
        }
        for(var i=0;i<aLi.length;i++){
            mv.ui.fadeOut(aLi[i]);
        }
        mv.ui.fadeIn(aLi[iNow]);

    }
    function autoPre() {
        if(iNow == 0) {

            iNow = aLi.length-1;
        }
        else{
            iNow--;
        }
        for(var i=0;i<aLi.length;i++){
            mv.ui.fadeOut(aLi[i]);
        }
        mv.ui.fadeIn(aLi[iNow]);

    }
    oPreBg.onmouseover = oPrev.onmouseover= function(){
        oPrev.style.display="block";
        clearInterval(timer);

    };
    oNextBg.onmouseover = oNext.onmouseover=function(){
        oNext.style.display="block";
        clearInterval(timer);

    };
     oPreBg.onmouseout = oPrev.onmouseout= function(){
        oPrev.style.display="none";
        timer=setInterval(auto,3000);

    };
     oNextBg.onmouseout  = oNext.onmouseout= function(){
        oNext.style.display="none";
        timer=setInterval(auto,3000);

    };
    oPrev.onclick = function(){
        autoPre();

    };
    oNext.onclick = function() {
        auto();
    };
};