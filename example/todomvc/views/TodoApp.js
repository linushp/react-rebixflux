import React from 'react';
import TodoHeader from './TodoHeader';
import TodoSection from './TodoSection';
import TodoFooter from './TodoFooter';
import RebixFlux from 'react-rebixflux';
import TodoStore from '../store/TodoStore';


var Hello = RebixFlux.createPureComponent(function(props){
    return (
        <div>{props.value}</div>
    );
});

class TodoApp extends RebixFlux.PureRenderComponent{
    render() {


        return (
            <div>
                <Hello value="abc"/>
                <TodoHeader />
                <TodoSection />
                <TodoFooter />
            </div>
        );
    }
}



export default RebixFlux.connect(TodoApp, [TodoStore], function (state) {
    console.log('TodoSection connect');
    return {
        viewTodoList:state.viewTodoList
    };
},{exposeStore:'RootStoreContextName'});


