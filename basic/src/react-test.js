//! 动态链接库建议使用在开发模式下，主要用于优化构建速度的；线上推荐用代码分割
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import _ from 'lodash';
import HomePage from '@/HomePage';
import './index.less';
import './index.css';
// import pic from './1.jpg';
import { add } from './expo';

add(11,98);

console.log(_.join(['a','b','c','****']))

class App extends Component {
    render() {
        return <div>
                    <h1>hello janice!!!</h1>
                    <p>{add(11,12)}</p>
                    {/* <img src={pic} alt=""/> */}    
               </div>;
    }
};

ReactDom.render(<App/>,document.getElementById('app'));