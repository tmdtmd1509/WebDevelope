let send = {
    state: {
        todos:[]
    },
    setTodosAction(newValue) {
        this.state.todos = newValue
    },
    // clearTodosAction() {
    //     this.state.todos = 'something'
    // }
}

export default send;