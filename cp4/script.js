let app = new Vue({
  el: '#app',
  data: {
		todos: [],
		message: '',
		show: 'all',
		drag: {},
		earned: 0,
		value: '',
		progress: '',

		showForm: false,
    user: null,
    username: '',
    password: '',
    error: '',
	},
	
	created() {
    this.getUser();
    //this.getTickets();
  },

  methods: {
		async getUser() {
      try {
        let response = await axios.get("/api/users");
        this.user = response.data;
      } catch (error) {
        // Not logged in. That's OK!
      }
		},

		toggleForm() {
			this.error = "";
			this.username = "";
			this.password = "";
			this.showForm = !this.showForm;
		},

		async register() {
			this.error = "";
			try {
				let response = await axios.post("/api/users", {
					username: this.username,
					password: this.password
				});
				this.user = response.data;
				// close the dialog
				this.toggleForm();
			} catch (error) {
				this.error = error.response.data.message;
			}
		},
		async login() {
			this.error = "";
			try {
				let response = await axios.post("/api/users/login", {
					username: this.username,
					password: this.password
				});
				this.user = response.data;
				// close the dialog
				this.toggleForm();
			} catch (error) {
				this.error = error.response.data.message;
			}
		},
		async logout() {
			try {
				let response = await axios.delete("/api/users");
				this.user = null;
			} catch (error) {
				// don't worry about it
			}
		},
		
  	addEarned(value) {
  		if(value === '') {
  			value = 0;
			}
      this.earned = parseInt(this.earned) + parseInt(value);
		},
		subEarned(value) {
			if(value === '') {
				value = 0;
			}
			let total = 0;
			total = this.earned - parseInt(value);
			this.earned = total;
	  },
	  addItem() {
		  this.todos.push({text: this.message, completed: false, money: this.value});
		  this.message = '';
		  this.value = '';
	  },
	  completeItem(item) {
		  item.completed = !item.completed;
		  if(item.completed === false) {
		  	this.subEarned(item.money);
		  } else {
          this.addEarned(item.money);
      }
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
