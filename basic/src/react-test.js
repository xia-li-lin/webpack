import React, { Component } from 'react';
import ReactDom from 'react-dom';
import HomePage from '@/HomePage';
import './index.less';
import pic from './1.jpg';

class App extends Component {
    render() {
        return <div>
                    <h1>hello janice!!!</h1>
                    <img src={pic} alt=""/>
               </div>;
    }
};

ReactDom.render(<App/>,document.getElementById('app'));