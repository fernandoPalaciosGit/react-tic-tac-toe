import React from "react";
import ReactDOM from 'react-dom';
import Game from './assets/Game'
import Hello from './messages/Hello'
import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Game/>,
    document.getElementById('root')
);
ReactDOM.render(
    <Hello owner={'El Menda'}/>,
    document.getElementById('hello')
);
registerServiceWorker();
