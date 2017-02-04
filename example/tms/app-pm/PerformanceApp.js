import React, {PropTypes} from 'react';
import {connect} from '../../../src/index';
import TodoHeader from './view/TodoHeader';
import TodoList from './view/TodoList';
import PerformanceStore from './store/PerformanceStore';
import PerformanceAction from './action/PerformanceAction';


class PerformanceApp extends React.Component {

    onClickTodoHeader(){
        PerformanceAction.addTodo("12121");
    };

    render() {

        var viewTodoList = this.props.viewTodoList;

        return (
            <div>
                <TodoHeader onClick={this.onClickTodoHeader}/>
                <TodoList viewTodoList={viewTodoList} />
            </div>
        );
    }

}

export default connect(PerformanceApp,[PerformanceStore],function ([state1],props) {
    return {
        viewTodoList: []
    }
});


