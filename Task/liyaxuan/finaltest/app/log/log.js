import "./log.css";
/*在此页面进行账号的注册，注册成功后，在此页面进行登录，登陆成功后跳转到主页面*/
/*此页面上既可以登录也可以注册*/
/*小窗口的页面上只能进行登录*/
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


            document.getElementById("onsubmit").onclick = function() {

                   var usermail = document.getElementById("usermail").value;
                   var pass = document.getElementById("pass").value;
                     if (usermail === "" || pass === "") {
                         alert("用户邮箱和密码不能为空");
                         return false;
                     }
                     else if (!checkMailVlidate(usermail)) {
                         alert("不是一个有效的 e-mail 地址");
                         return false;

                     }
                     else if (!checkPasswordValidate(pass)) {
                         alert("密码格式错误");
                         return false;
                     }
                     else {
                         var xmlhttp;
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
                                 var myObj = JSON.parse(this.responseText);
                                 var objstatus = myObj[0].status;
                                 var objuser = myObj[0].user;
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

                         xmlhttp.open("GET", "http://www.ljhhhx.com:8080/Test01/Login?userPsw="+pass+"&userMail="+usermail, true);

                         xmlhttp.send();
                     }

                     }



              document.getElementById("getsubmit").onclick = function () {
                    var getusername = document.getElementById("getusername").value;
                    var getpass = document.getElementById("getpass").value;
                    var getusermail = document.getElementById("getusermail").value;
                    var repass = document.getElementById("repass").value;
                    if (getusername === "" || getpass === "" || getusermail === "") {
                        alert("注册的用户名、密码、邮箱不能为空");
                        return false;
                    }
                    else if (!checkMailVlidate(getusermail)) {
                        alert("不是一个有效的邮箱地址");
                        return false;
                    }
                    else if (!checkPasswordValidate(getpass)) {

                        alert("密码格式错误");
                        return false;

                    }
                    else if (repass !== getpass) {
                        alert("  前后两次输入的密码不一致");
                        return false;
                    }
                    else {
                        var xmlhttp;
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

                               var  myObj = JSON.parse(this.responseText);

                                var objstatus = myObj[0].status;

                               var  objuserMail = myObj[0].user.mail;
                               var  objuserPass = myObj[0].user.psw;

                                console.log(objstatus);
                                console.log(objuserMail);


                                if (!objstatus) {
                                    alert("注册失败");
                                }
                                else {
                                    console.log("you can logon now!");
                                    alert("注册成功！将为您自动跳转至登录界面");
                                    setTimeout("document.getElementById('form2').style.display = 'none';//切换注册和登录界面\n" +
                                        "               document.getElementById('form1').style.display = 'block';\n" +
                                        "                document.getElementById(\"welcome\").innerHTML = \"欢迎登录QQ\";", 2000);
                                }

                            }
                        }

                        xmlhttp.open("GET", "http://www.ljhhhx.com:8080/Test01/Regiter?userName=" + getusername + "&userPsw=" + getpass + "&userMail=" + getusermail, true);
                        xmlhttp.send();

                    }

                }



            document.getElementById('getform2').onclick = function(){
                document.getElementById('form1').style.display= 'none';//切换注册和登录界面
                document.getElementById('form2').style.display= 'block';
                document.getElementById("welcome").innerHTML = "欢迎注册QQ";
                return false;
            }
        document.getElementById('getform1').onclick = function(){
                document.getElementById('form2').style.display= 'none';
                document.getElementById('form1').style.display= 'block';
                document.getElementById("welcome").innerHTML = "欢迎登录QQ";
                return false;
            }
