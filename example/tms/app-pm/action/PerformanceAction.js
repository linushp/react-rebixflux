function createActions() {
}


export default createActions('Performance', {

    addTodo: function (a,bv,c) {
        return 12121;
    },

    getTodoList: function () {
        return new Promise(function (resolve) {
            setTimeout(()=> {
                resolve(23432);
            }, 100)
        });
    }

});