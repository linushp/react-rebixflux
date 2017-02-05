import Rebixflux from 'react-rebixflux';


export default Rebixflux.createActions("todomvc",{
    addTodo: function (newTitle) {
        // return newTitle;
        return new Promise(function (resolve) {
            setTimeout(()=>{
                resolve(newTitle);
            },0);
        })
    },
    toggleItem: function (todo) {
        return todo;
    },
    toggleAll: function (selectAll) {
        return selectAll;
    },
    destroyItem: function (todo) {
        return todo;
    },
    saveItem: function (todo, newTitle) {
        return {todo, newTitle};
    },
    changeViewType: function (viewType) {
        return viewType;
    },
    clearCompleted: function () {
    }
});