//页面中的hover效果
var song_masks = $(".mod_cover");
for(let i=0;i<song_masks.length;i++){
    var songMaskObj = song_masks[i];
    songMaskObj.onmouseenter = function (e) {
        //showPlayer(e);
    }
}
/*var masks = $(".playlist__cover");
for(let i=0;i<masks.length;i++){
    var maskObj = masks[i];
    maskObj.onmouseenter=function (e) {
        showPlayer(e);
    }
}
*/
/*
function showPlayer(e) {

    var player = $(e.target).find(".mod_cover__icon_play") || $(e.target).siblings(".mod_cover__icon_play");
    var img = $(e.target).find("img");
    var line = $(e.target).find(".toplist__line");
    if($(img)[0]!==undefined){
        $(player).animate({opacity: 1, zoom: 1.5}, 150);
        //console.log($(img[0]));
    $(img)[0].style.objectFit = "none";
    $(img)[0].style.filter = "brightness(70%)";
    e.target.onmouseleave = function () {
        $(player).animate({opacity: 0, zoom: 0.5}, 150);
        $(img)[0].style.objectFit = "cover";
        $(img)[0].style.filter = "brightness(100%)";
    }}
    else {
        $(player).animate({opacity: 1, zoom: 1.5}, 150);
        $(line)[0].style.opacity = 0;
        e.target.onmouseleave = function () {

        $(player).animate({opacity: 0, zoom: 0.5}, 150);
        $(line).animate({opacity:1,},700);

    }

    }
}
*/

function showArrow(ar) {
    $(ar[0]).animate({width:"66px"},200);
    $(ar[1]).animate({width:"66px"},200);
}
function hideArrow(ar) {
   $(ar[0]).animate({width:"5px"},200);
    $(ar[1]).animate({width:"5px"},200);
}
const itemBoxes = $(".mod_index");
for(let i=0;i<itemBoxes.length;i++){
    var itemBox = itemBoxes[i];
    itemBox.onmouseenter = function (e) {
        let ar = $(e.target).find(".slide_action__arrow");
        showArrow(ar);
        this.onmouseleave = function (e) {
            hideArrow(ar);

        }

    }
}
//页面中的切换图片的效果
const switcherGroup = $(".mod_slide_switch");
for(let i=0;i<switcherGroup.length;i++){
    var switchers = switcherGroup[i];
    switchers.onclick = function (e) {
         var  switcher = $(e.target).find(".slide_switch__item");
          var allswitches = $(this).find(".slide_switch__item");
          console.log(allswitches);
           for (let i = 0; i < allswitches.length; i++) {
                   var currentS = allswitches[i];
                   if ($(currentS).context.style.backgroundColor = "rgba(0, 0, 0, 0.3)") {//为什么这里就是可以用等于符号来表示
                       $(currentS).context.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
                       //break;
                   }
               }
           if($(switcher).context.className===("js_jump slide_switch__item")||$(switcher).context.className===("js_jump slide_switch__item slide_switch__item--current")) {//需要将类的名称全部打印出来
                $(switcher).context.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
           }

          //$(bg).context.style.margin = "0 auto";
        //$(bg).context.style.borderRadius = "12px";

       var index = $(switcher).find(".icon_txt");
       //console.log(index);
       var j = index.context.innerText;
       console.log(j);
       var string = "-"+(j-1)+"00%";
       //console.log(string);
       var list = $(this).siblings(".mod_slide").find(".slide__list");
       $(list[0]).animate({left:string},800);
         //list[0].style.left = string  ;
      // console.log(list);
//点击过快会出现bug

    }

}
//左右箭头按钮的轮播效果
//使用for循环使得点击过快时，循环没有进行到相应的位置
const arrows = $(".slide_action__arrow");
for(let i=0;i<arrows.length;i++){
    var arr = arrows[i];
    arr.onclick = function (e) {
        //点击箭头触发底部按钮亮灭的联动
        var preLeft;
        console.log(e.target);
        var list;
        var currentLeft;
        if($(e.target).is(".slide_action__arrow--right")){

            list = $(e.target).parents(".mod_slide_action").siblings(".section_inner").find(".slide__list");

            var len = $(e.target).parents(".mod_slide_action").siblings(".section_inner").find(".slide_switch__item").length;
            lightUpRight(list,len);
            console.log(len);
            preLeft = list[0].style.left;//记录以前的位置
            console.log(parseInt(preLeft));

            if(parseInt(preLeft)<= -(len-1)*100){
                currentLeft = 0+"%";
            }
            else{
                currentLeft = (parseInt(preLeft)-100)+"%";
            }
            $(list[0]).animate({left:currentLeft},800);
        }
        else if($(e.target).is(".slide_action__arrow--left")){

            list = $(e.target).parents(".mod_slide_action").siblings(".section_inner").find(".slide__list");
            var len2 = $(e.target).parents(".mod_slide_action").siblings(".section_inner").find(".slide_switch__item").length;
            console.log(len2);
            lightUpLeft(list,len2);

            preLeft = list[0].style.left;//记录当前的位置
            console.log(parseInt(preLeft));
            if(parseInt(preLeft)>=0){
                currentLeft = -(len2-1)*100+"%";
            }
            else{
                currentLeft = (parseInt(preLeft)+100)+"%";
            }
            $(list[0]).animate({left:currentLeft},800);

        }
    }
}
//箭头和底部按钮的联动关系



function lightUpRight (list,max){
        var currentLeft = parseInt(list[0].style.left);
        var index;
        if(max===4){
              switch(currentLeft){
            case 0:index=1;
            break;
            case -100:index = 2;
            break;
            case -200:index = 3;
            break;
            case -300:index = 0;
            break;
        }
        }
        else if(max===2) {
            switch (currentLeft) {
                case 0:
                    index = 0;
                    break;
                case -100:
                    index = 1;
                    break;
            }
        }
        console.log(index);
        var btn = $(list[0]).parents(".mod_slide").siblings(".mod_slide_switch");
       console.log($(list[0]));
        //console.log($(btn[0]));
          //      console.log($(btn[0]).find(".slide_switch__item"));
        var lightBtn = $(btn[0]).find(".slide_switch__item")[index];
        console.log(lightBtn);
            for (let i = 0; i <  $(btn[0]).find(".slide_switch__item").length; i++) {
                   var currentS =  $(btn[0]).find(".slide_switch__item")[i];
                   if ($(currentS).context.style.backgroundColor = "rgba(0, 0, 0, 0.3)") {//为什么这里就是可以用等于符号来表示
                       $(currentS).context.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
                   }
               }
        if($(lightBtn).context.className===("js_jump slide_switch__item")||$(lightBtn).context.className===("js_jump slide_switch__item slide_switch__item--current")) {//需要将类的名称全部打印出来
            $(lightBtn).context.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
        }

}

function lightUpLeft(list,max) {
        var currentLeft = parseInt(list[0].style.left);
        var index;
        if(max===4){ switch(currentLeft){
            case 0:index = 3;
            break;
            case -100:index = 0;
            break;
            case -200:index = 1;
            break;
            case -300:index = 2;
            break;
        }
        }
        else if(max===2){
            switch(currentLeft){
            case 0:index = 1;
            break;
            case -100:index = 0;
            break;
        }
        }

        console.log(index);
        var btn = $(list[0]).parents(".mod_slide").siblings(".mod_slide_switch");
       // console.log($(list[0]));
        //console.log($(btn[0]));
          //      console.log($(btn[0]).find(".slide_switch__item"));
        var lightBtn = $(btn[0]).find(".slide_switch__item")[index];
        console.log(lightBtn);
            for (let i = 0; i <  $(btn[0]).find(".slide_switch__item").length; i++) {
                   var currentS =  $(btn[0]).find(".slide_switch__item")[i];
                   if ($(currentS).context.style.backgroundColor = "rgba(0, 0, 0, 0.3)") {//为什么这里就是可以用等于符号来表示
                       $(currentS).context.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
                   }
               }
        if($(lightBtn).context.className===("js_jump slide_switch__item")||$(lightBtn).context.className===("js_jump slide_switch__item slide_switch__item--current")) {//需要将类的名称全部打印出来
            $(lightBtn).context.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
        }

}

