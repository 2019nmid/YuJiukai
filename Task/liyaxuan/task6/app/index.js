import style from "./main.css";
//给todolist标题每个字母增加一个单独的样式
//添加对代办事件描述
//利用模板字符简化options
//使用一个promise完成一个先得到第一步的数据再进行第二步的操作，显示删除共计多少个标签

const add = document.querySelector('.add-item');//找到添加事件的变表单，之所以需要监听form而不是input是因为这样用户回车时也会触发事件
const container = document.querySelector('.item');//找到将事项加入的元素
var items = JSON.parse(localStorage.getItem('items')) || [];//初始化检查有无以前的待办事件
//        将添加的待办事件push进items数组中
var delSelected = document.querySelector(".del_selected");

function addItem(e){
    e.preventDefault();  //阻止表单提交的默认行为
    const text = (this.querySelector('[name=item]')).value;
    const hour = (this.querySelector("[name=itemHour]")).value;
    const min = (this.querySelector("[name=itemMin]")).value;
    const importance = (this.querySelector("[name=itemImportance]")).selectedIndex;
    const item ={
        text,
        hour,
        min,
        importance,
        done: false
    };
    items.push(item);
    populateList(items, container);
    localStorage.setItem('items', JSON.stringify(items));//localStorage.setItem("key", "value");
    this.reset();//重置表单为默认值
}
//      将items数组中的事件添加到html页面中
function populateList(plate, plateList) {
    plateList.innerHTML=plate.map( (item, i) => {
        return`
        <li class="item-li">
            <input type="checkbox" data-index=${i} id="item${i}" ${item.done ? 'checked' : ''}>
            <lable class="item-text" for="item${i}">${item.text}</lable>
            <input type="button" value="delete" class="delete-item" >
        </li>
    `
    }).join('');
}
//        切换checked状态
function toggleDone(e) {
    if(!e.target.matches("input[type='checkbox']")) return; // 只有点击勾选才可以执行事件
    const el = e.target;
    const index = el.dataset.index;//index是自定义数据
    items[index].done =!items[index].done;//翻转状态
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, container);
}
//        删除事件
function deleteDone(e) {
    const msg ='确定删除该项事件？';
    if(!e.target.matches("input[type='button']")) return; // 只有点击删除按钮才可以执行
    const el = e.target;
    const index = el.dataset.index;
    if(confirm(msg)){
        items.splice(index,1); //将选中数组删除
        localStorage.setItem('items', JSON.stringify(items));//更新存储
        populateList(items, container);//更新页面
    }else{
        return;
    }
}
//删除所有打钩已经完成的选项
function deleteAllSeleccted(e){
    const msg = "确定删除所有已经完成事件？";
    let index=[];
    for(let item of items){
        if(item.done){
            index.push(items.indexOf(item));
        }
        console.log(index);
    }
    if(index!==[]&&confirm(msg)){
        for(let certainIndex of index.reverse()){
            items.splice(certainIndex,1);
        }

        localStorage.setItem('items',JSON.stringify(items));
        populateList(items,container);
    }
    else{return;}

}
//按重要性进行排序
function sortByImportance(e){
    items.sort(compare("importance"));
    localStorage.setItem('items',JSON.stringify(items));
    populateList(items,container);
}

//按时间进行排序
function sortByTime(e){
     items.sort(compare("min"));
    items.sort(compare("hour"));
    localStorage.setItem('items',JSON.stringify(items));
    populateList(items,container);

}
//数组对象按照某一性质进行排序

//定义一个函数
function compare(pro) {
    return function (obj1, obj2) {
        var val1 = obj1[pro];
        var val2 = obj2[pro];
        if (val1 > val2 ) {//从小到大进行排序
            return 1;
        } else if (val1 <val2 ) {
            return -1;
        } else {
            return 0;
        }
    }
}

add.addEventListener('submit', addItem);//绑定监听器，第一个参数为事件类型
container.addEventListener('click', toggleDone);
container.addEventListener('click', deleteDone);
delSelected.addEventListener('click',deleteAllSeleccted);
document.querySelector(".sortByImportance").addEventListener("click",sortByImportance);
document.querySelector(".sortByTime").addEventListener("click",sortByTime);
populateList(items, container);





















