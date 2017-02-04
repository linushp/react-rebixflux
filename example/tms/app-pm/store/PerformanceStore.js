import {createStore,createMergedStore} from '../../../../src/index';


var x = createMergedStore({
    messages: null,
    friends: null
});

export default createStore({

    initialState: {
        todoList: [],
        name: '',
        sex: ''
    },

    forAction: 'Performance', // 可选 ActionGroup

    onAddTodo: function (action, emitChange, state) {
        emitChange({todoList: [1, 2, 3]});
    },

    'salary#onAddTodo': function (action, emitChange, state) {
        emitChange({todoList: [1, 2, 3]});
    },

    onCmdAddTodo:function(){

    },

    /**
     * Get函数,修改state不管用.state内部一般都是使用immutable对象,只有on函数的返回值才能对state进行修改.
     * View 层,可以直接调用Get函数获取Store中的数据,但是无法修改.
     * 在Get函数内部对state的任何修改,都不会生效.
     */
    'getUserInfo': function (state, a, b, c, d) {
        return {
            name: a
        };
    }

});




