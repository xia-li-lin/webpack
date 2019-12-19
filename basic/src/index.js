// import axios from 'axios';

// axios.get('/api/info').then((res) => {
//     console.log(res);
// })

import number from './number.js';
import counter from './counter.js';

number();
counter();


// HMR对Js模块支持程度没有css模块那么友好，需要额外的手动处理
// HMR是否开启
if (module.hot) {
    module.hot.accept('./number.js', function () {
        document.body.removeChild(document.getElementById('number'));
        number();
    });
}