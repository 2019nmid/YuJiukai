window.onload = function(){
    mv.app.toTip();
}
var mv={};
mv.app={};
mv.ui={};
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
mv.app.toTip=function () {
    var oText1 =document.getElementById('text_1');
    var oText2 =document.getElementById("text_2");
     var oText3 =document.getElementById('text_3');
    var oText4 =document.getElementById("text_4");
      var oText5 =document.getElementById("text1");

    mv.ui.textChange(oText1,"手机号");
    mv.ui.textChange(oText2,"验证码");
       mv.ui.textChange(oText3,"手机号/邮箱");
    mv.ui.textChange(oText4,"密码");
     mv.ui.textChange(oText5,"书籍、电影、音乐、小组、小站、成员");
}