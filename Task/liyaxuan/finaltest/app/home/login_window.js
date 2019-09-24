const logInButton = document.getElementsByClassName("js_login")[0];
logInButton.onclick = function () {
    
}
const registerEnter = document.getElementById("register_enter");
registerEnter.onclick = function () {
    window.location.href = "../log.html";
}
//切换登录的方式
const qqLogBtn = document.getElementsByClassName("qq_log")[0];
const weLogBtn = document.getElementsByClassName("we_log")[0];
const quickLogBtn = document.getElementsByClassName("change_way_button")[0];
const slowLogBtn = document.getElementById("log_by_account");
const qqLogContent = document.getElementsByClassName("qq_log_content")[0];
const weLogContent =document.getElementsByClassName("we_log_content")[0];
const quickLogContent = document.getElementsByClassName("quick_log")[0];
const slowLogContent = document.getElementsByClassName("slow_log")[0];

qqLogBtn.onclick = function(){
    qqLogContent.style.display = "block";
    weLogContent.style.display = "none";
    weLogBtn.style.color ="#565656";
    qqLogBtn.style.color = "#3ac482";

};
weLogBtn.onclick = function(){
     qqLogContent.style.display = "none";
    weLogContent.style.display = "block";
    qqLogBtn.style.color ="#565656";
    weLogBtn.style.color = "#3ac482";

};
quickLogBtn.onclick = function () {
    slowLogContent.style.display = "none";
    quickLogContent.style.display = "block";

};
slowLogBtn.onclick = function () {
        slowLogContent.style.display = "block";
    quickLogContent.style.display = "none";
};
//在点击输入框时改变输入框的border颜色
$(".slow_input").onclick = function () {
    document.getElementsByClassName("slow_input")[0].style.border = "1px solid red";
}
//登录和请求







function checkMailVlidate(x){
                    var atpos = x.indexOf("@");
                    var dotpos = x.lastIndexOf(".");
                    if(atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length){
                        console.log("邮箱不对");
                        return false;
                    }
                    else{return true;}

                }
                function checkPasswordValidate(x) {
                    if(x.length>15||x.length<6){
                        console.log("密码不对");
                        return false;
                    }
                    else {return true;}

                }


         document.getElementById("submitbtn").onclick = function() {

                   var qqusermail = document.getElementById("qqmail").value;
                   var qqpass = document.getElementById("qqpass").value;

                     if (qqusermail === "" || qqpass === "") {
                         alert("用户邮箱和密码不能为空");
                         return false;
                     }
                     else if (!checkMailVlidate(qqusermail)) {
                         alert("不是一个有效的 e-mail 地址");
                         return false;

                     }
                     else if (!checkPasswordValidate(qqpass)) {
                         alert("密码格式错误");
                         return false;
                     }
                     else {
                         let xmlhttp;
                         if (window.XMLHttpRequest) {
                            // IE7+, Firefox, Chrome, Opera, Safari 浏览器执行
                            xmlhttp = new XMLHttpRequest();
                        }
                        else {
                            // IE6, IE5 浏览器执行代码
                            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
                        }
                         xmlhttp.onreadystatechange = function () {

                             if (this.readyState === 4 && this.status === 200) {
                                 let myObj = JSON.parse(this.responseText);
                                 let objstatus = myObj[0].status;
                                 let objuser = myObj[0].user;
                                 console.log(objstatus);
                                 console.log(objuser);
                                 if (!objstatus) {
                                     console.log("登陆失败");
                                     alert("登陆失败");
                                 }

                                 else if (objuser === null) {
                                     console.log("用户不存在！");
                                     alert("用户不存在！");
                                 }
                                 else {
                                     alert("登录成功");
                                     window.location.href = "http://localhost:8080/";
                                 }
                             }
                         }

                         xmlhttp.open("GET", "http://www.ljhhhx.com:8080/Test01/Login?userPsw="+qqpass+"&userMail="+qqusermail, true);

                         xmlhttp.send();
                     }

                     }
