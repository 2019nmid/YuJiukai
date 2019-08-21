var http = require("http");
var url = require("url");
var qs = require("querystring");
var fs = require("fs");

http.createServer(function (req , res) {
//设置请求头
  res.setHeader("Access-Control-Allow-Origin","*");
  if(req.method == "POST"){
    //接收发来的用户名和密码
    var result = "";
//获取前端代码发来的路由地址
    var pathName = url.parse(req.url).pathname;
    req.addListener("data",function (chunk) {
      result += chunk;
    });

    req.on("end" , function () {
      let user = qs.parse(result);
      console.log(user);
      if(user.userMail){
        fs.readFile("./userdata.txt" , "utf-8" , function (err,data) {
          if (!err){
            console.log("读取文件成功");
            console.log(data);
            if (!data){
              console.log("文件中没有数据");
               if (pathName === "/login") {
                      res.end("用户名不存在!");
                      return;
              }

              else if (pathName === "/register") {
                  let arr = [];
//创建新对象写入数据
                  let obj = {};
                  obj.userName = user.userName;
                  obj.userPsw = user.userPsw;
                  obj.userMail = user.userMail;
                  arr.push(obj);
                  fs.writeFileSync("./userdata.txt", JSON.stringify(arr), "utf-8");
                  res.end("注册成功!");
                  return;
              }

            }
            else {
                console.log("文件中有数据");
                let arr = JSON.parse(data);
                console.log(arr);
//遍历整个保存数据的数组 判断登录注册
                for (let i = 0; i < arr.length; i++) {
                    let obj = arr[i];
                    console.log(obj);
                    if (obj.userMail === user.userMail) {
                        if (pathName === "/login") {

                            if (obj.userPsw === user.userPsw) {

                                res.end("登录成功!");
                                return;
                            }
                            else {
                                res.end("密码错误！");
                                return;
                            }
                        }
                        else if (pathName === "/register") {
                            res.end("该用户已存在!");
                            return;
                        }
                    }
                }
                 if (pathName === "/login") {
                      res.end("用户名不存在!");
                      return;
              }

              else if (pathName === "/register") {
//创建新对象写入数据
                  let obj = {};
                  obj.userName = user.userName;
                  obj.userPsw = user.userPsw;
                  obj.userMail = user.userMail;
                  arr.push(obj);
                  fs.writeFileSync("./userdata.txt", JSON.stringify(arr), "utf-8");
                  res.end("注册成功!");
                  return;
              }

            }

          }

          else {
            console.log("读取文件失败");
          }
        })
      }
    });
  }
  else {
    res.end("get请求");
  }
}).listen(3000 , function (err) {
  if (!err){
    console.log("服务器启动成功，正在监听port3000...");
  }
});