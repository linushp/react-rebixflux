import React, {PropTypes} from 'react';
import TodoStore from '../store/TodoStore';
import TodoActions from '../actions/TodoActions';
import Rebixflux from 'react-rebixflux';
import TodoItem from './TodoItem';

var actions = TodoActions;

class TodoSection extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    isAllCompleted=()=>{
        var {viewTodoList} = this.props;
        var todoList = viewTodoList ||[];
        if(!todoList || todoList.length===0){
            return false;
        }

        for(var i = 0;i<todoList.length;i++){
            var todo = todoList[i];
            if(!todo.completed){
                return false;
            }
        }
        return true;
    };

    toggleAll=()=>{
        var isAllChecked = this.isAllCompleted();
        actions.toggleAll(!isAllChecked);
    };

    render() {

        var {viewTodoList} = this.props;
        viewTodoList = viewTodoList || [];
        var isAllChecked = this.isAllCompleted();
        return (
            <div className="main">
                <input className="toggle-all" type="checkbox" checked={isAllChecked} onChange={this.toggleAll}/>
                <ul className="todo-list">
                    {
                        viewTodoList.map(function(todo){
                            return <TodoItem key={todo.id} todo={todo}></TodoItem>
                        })
                    }
                </ul>
            </div>
        );

    }

}

export default Rebixflux.connect(TodoSection, TodoStore, function (state) {
    console.log('TodoSection connect');
    return {
        viewTodoList:state.viewTodoList
    };
});