import React, { Component } from 'react';
import ReactDom from 'react-dom';

class App extends Component {
    render() {
        return <div>hello janice!!!</div>;
    }
};

ReactDom.render(<App/>,document.getElementById('app'));