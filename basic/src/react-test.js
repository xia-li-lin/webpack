import React, { Component } from 'react';
import ReactDom from 'react-dom';
import HomePage from '@/HomePage';
import './index.less';

class App extends Component {
    render() {
        return <div>hello janice!!!</div>;
    }
};

ReactDom.render(<App/>,document.getElementById('app'));