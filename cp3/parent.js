import store from 'store.js'
import send from 'send.js'

let parent = new Vue({
    el: '#parent',
    data: {
        todos: store.state.todos,
        message: '',
        show: 'all',
        drag: {},
    },
    //
    // showAll() {
    //     this.show = 'all';
    // },
    // showActive() {
    //     this.show = 'active';
    // },
    // showCompleted() {
    //     this.show = 'completed';
    // },
    // deleteCompleted() {
    //     this.todos = this.todos.filter(item => {
    //         return !item.completed;
    //     });
    // },

    methods: {
        approveRequest() {
            send.setTodosAction(todos);
        },
        addItem() {
            this.todos.push({text: this.message, completed: false});
            this.message = '';
        },
        completeItem(item) {
            item.completed = !item.completed;
        },
        deleteItem(item) {
            let index = this.todos.indexOf(item);
            if (index > -1)
                this.todos.splice(index,1);
        },
        showAll() {
            this.show = 'all';
        },
        showActive() {
            this.show = 'active';
        },
        showCompleted() {
            this.show = 'completed';
        },
        deleteCompleted() {
            this.todos = this.todos.filter(item => {
                return !item.completed;
            });
        },

        dragItem(item) {
            this.drag = item;
        },
        dropItem(item) {
            const indexItem = this.todos.indexOf(this.drag);
            const indexTarget = this.todos.indexOf(item);
            this.todos.splice(indexItem,1);
            this.todos.splice(indexTarget,0,this.drag);
        },
    },
    computed: {
        activeTodos() {
            return this.todos.filter(item => {
                return !item.completed;
            });
        },
        filteredTodos() {
            if (this.show === 'active')
                return this.todos.filter(item => {
                    return !item.completed;
                });
            if (this.show === 'completed')
                return this.todos.filter(item => {
                    return item.completed;
                });
            return this.todos;
        },
    },

});
