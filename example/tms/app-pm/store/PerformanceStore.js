
var Rebixflux = {createStore:null};


export default Rebixflux.createStore({

    initialState:{
        todoList:[],
        name:'',
        sex:''
    },

    onAddTodo:function (action,emitChange,state) {
        emitChange({todoList:[1,2,3]});
    }


});
