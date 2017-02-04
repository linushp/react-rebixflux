import React from 'react';
import ReactDOM from 'react-dom';
import TodoApp from './views/TodoApp';
import './css/base.css';
import './css/index.css';
// import "babel-polyfill";



ReactDOM.render(
    <TodoApp />,
    document.getElementById('todoapp')
);