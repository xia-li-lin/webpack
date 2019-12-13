import ('./index.css');

var btn = document.createElement('button');
btn.innerHTML = '新增';
document.body.appendChild(btn);

var time = 0;

btn.onclick = function () {
    time++;
    var div = document.createElement('div');
    div.innerHTML = 'item ' + time;
    document.body.appendChild(div);
}
