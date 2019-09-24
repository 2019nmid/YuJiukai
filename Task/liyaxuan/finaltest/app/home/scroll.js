const toUp = document.getElementsByClassName("btn_bottom_top")[0];
toUp.onclick = function () {
    window.location.href="#";
}
/*监听页面的滚动*/

window.onscroll = function(){
    var t = document.documentElement.scrollTop || document.body.scrollTop;
    if( t >= 20) {
        toUp.style.display = "block";
    } else {
        toUp.style.display = "none";
    }
}