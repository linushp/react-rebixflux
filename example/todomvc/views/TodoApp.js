import React from 'react';
import TodoHeader from './TodoHeader';
import TodoSection from './TodoSection';
import TodoFooter from './TodoFooter';
import Rebixflux from 'react-rebixflux';
import TodoStore from '../store/TodoStore';


class TodoApp extends React.Component {
    render() {
        return (
            <div>
                <TodoHeader />
                <TodoSection />
                <TodoFooter />
            </div>
        );
    }
}


var TodoApp = Rebixflux.createComponent(
    function (props) {
        return (
            <div>
                <TodoHeader />
                <TodoSection />
                <TodoFooter />
            </div>
        );
    }, function (state) {

        return {}
    }
);


export default Rebixflux.connect(TodoApp, [TodoStore], function (state) {
    console.log('TodoSection connect');
    return {
        viewTodoList:state.viewTodoList
    };
},{exposeStore:'RootStoreContextName'});


