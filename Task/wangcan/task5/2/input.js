const good = "hello";

import HelloReact from './HelloReact.jsx';

import img1 from'./img/pic_1.jpg';
import img2 from'./img/pic_2.png';

async function sayHello(){
    const result = await fetch('https://www.baidu.com');
    console.log(result);
}
sayHello();
