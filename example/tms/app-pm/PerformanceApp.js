import React, {PropTypes} from 'react';
import {connect} from '../../../src/index';
import TodoHeader from './view/TodoHeader';
import TodoList from './view/TodoList';
import PerformanceStore from './store/PerformanceStore';
import {addTodo} from './action/PerformanceAction';


class PerformanceApp extends React.Component {

    onClickTodoHeader(){
        addTodo("12121");
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


class PerformanceApp11 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        var state = PerformanceStore.getState();
        this.setState(state);
        PerformanceStore.onChange(this.onPerformanceStoreChange);
    }

    componentWillUnmount() {
        PerformanceStore.offChange(this.onPerformanceStoreChange);
    }

    onPerformanceStoreChange=(name,value)=>{
        this.setState({[name]:value});
    };
    
    render() {
        var props = this.props;
        props = Object.assign({},props,mapStateToProps([this.state],props));
        return (<PerformanceApp {...props} />);

    }

}