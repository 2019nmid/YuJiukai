
const khd =document.getElementById("khd");
const khdMessage = document.getElementsByClassName("client_privilege")[0];
/* 这里应该使用的是数组形式*/
khd.onmouseover=function(){
    khdMessage.style.display="block";
}
khd.onmouseout=function () {
     khdMessage.style.display="none";
}

const search_btn = document.getElementsByClassName("search_input__btn")[0];
const btn_icon =document.getElementsByClassName("sprite")[0];
search_btn.onmouseover = function () {

}
const searchInput = document.getElementsByClassName("search_input__input")[0];
searchInput.onclick = function(){

}
