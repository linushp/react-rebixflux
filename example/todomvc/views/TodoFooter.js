import React, {PropTypes} from 'react';
import classNames from 'classname';
import TodoStore from '../store/TodoStore';
import TodoActions from '../actions/TodoActions';
import Rebixflux from 'react-rebixflux';

class TodoFooter extends React.Component {

    render() {
        var actions = TodoActions;
        
        var {unCompletedCount,viewType} = this.props;
        return (
            <footer className="footer">
                <span className="todo-count">
                    <strong>{unCompletedCount}</strong>
                    <span> item left</span>
                </span>
                <ul className="filters">
                    <li>
                        <a className={classNames({selected:viewType==='all'})}
                           onClick={()=>{actions.changeViewType('all')}}>All</a>
                    </li>
                    <span/>
                    <li>
                        <a className={classNames({selected:viewType==='active'})}
                           onClick={()=>{actions.changeViewType('active')}}>Active</a>
                    </li>
                    <span/>
                    <li>
                        <a className={classNames({selected:viewType==='completed'})}
                           onClick={()=>{actions.changeViewType('completed')}}>Completed</a>
                    </li>
                </ul>
                <button className="clear-completed" onClick={actions.clearCompleted}>Clear completed</button>
            </footer>
        )
    }
}


export default Rebixflux.connect(TodoFooter, TodoStore ,function (state) {
    return {
        unCompletedCount:state.unCompletedCount,
        viewType:state.viewType
    };
});