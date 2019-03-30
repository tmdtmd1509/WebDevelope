let app = new Vue({
  el: '#app',
  data: {
    tickets: {},

		todos: [],
		message: '',
		show: 'all',
		drag: {},
		earned: 0,
		value: '',
		possible: 0,

		showForm: false,
		showForm2: false,
		user: null,
		//varified: false,
    username: '',
		password: '',
		varifynumber: '',
		error: '',
		totalEarned: 0,
	},
	
	created() {
    this.getUser();
    this.getTickets();
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
			this.varifynumber = "";
			this.showForm = !this.showForm;
		},

		toggleForm2() {
			this.error = "";
			this.varifynumber = "";
			this.showForm2 = !this.showForm2;
		},

		async register() {
			this.error = "";
			try {
				let response = await axios.post("/api/users", {
					username: this.username,
					password: this.password,
					varifynumber: this.varifynumber
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
		async varify() {
			this.error = "";
			try {
				let response = await axios.post("/api/users/varify", {
					username: this.username,
					varifynumber: this.varifynumber
				});
				//this.varified = response.data;
				// close the dialog
				this.toggleForm2();
				//store todos to server
				var todoLen = todos.length;
				for(var i = 0; i < todoLen; i++) {
					this.addTicket(todos[i]);
				}
				//refresh the list
				this.getTickets();
			} catch (error) {
				this.error = error.response.data.message;
			}
		},
		async updateEarned() {
			this.error = "";
			try {
				let response = await axios.post("/api/users/totalEarned", {
					totalEarned: this.totalEarned
				});
				this.user = response.data;
				// close the dialog
				this.toggleForm();
			} catch (error) {
				this.error = error.response.data.message;
			}
		},
		//tickets
		async getTickets() {
      try {
        let response = await axios.get("/api/tickets");
        this.tickets = response.data;
      } catch (error) {
        console.log(error);
      }
		},
    async addTicket(ticket) {
      try {
        let response = await axios.post("/api/tickets", {
          text: ticket.message,
					completed: ticket.completed,
					money: ticket.value
        });
      } catch (error) {
        console.log(error);
      }
    },
    async deleteTicket(ticket) {
      try {
        let response = await axios.delete("/api/tickets/" + ticket._id);
        this.getTickets();
      } catch (error) {
        this.toggleForm();
      }
		},
		async completeTicket(ticket) {
      try {
        let response = await axios.post("/api/tickets/" + ticket._id);
        this.getTickets();
      } catch (error) {
        this.toggleForm();
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
		addPossible(value) {
  		if(value === '') {
  			value = 0;
			}
      this.possible = parseInt(this.possible) + parseInt(value);
		},
		subPossible(value) {
			if(value === '') {
				value = 0;
			}
			let total = 0;
			total = this.possible - parseInt(value);
			this.possible = total;
	  },
	  addItem() {
			this.todos.push({text: this.message, completed: false, money: this.value});
			this.addPossible(this.value);
		  this.message = '';
			this.value = '';
	  },
	  deleteItem(item) {
		  let index = this.todos.indexOf(item);
		  if (index > -1) {
				this.todos.splice(index,1);
				this.subPossible(item.money);
			}
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
	  // deleteCompleted() {
    //   this.tickets = this.tickets.filter(item => {
    //   	return !item.completed;
    //   });
	  // },

	  dragItem(item) {
		  this.drag = item;
	  },
	  dropItem(item) {
		  const indexItem = this.tickets.indexOf(this.drag);
		  const indexTarget = this.tickets.indexOf(item);
      this.tickets.splice(indexItem,1);
      this.tickets.splice(indexTarget,0,this.drag);
		},
		completeItem(item) {
		  item.completed = !item.completed;
		  if(item.completed === false) {
		  	this.subEarned(item.money);
		  } else {
          this.addEarned(item.money);
      }
	  },
  },
  computed: {
	  activeTickets() {
		  return this.tickets.filter(item => {
			  return !item.completed;
		  });
	  },
	  filteredTickets() {
			if (this.show === 'active')
				return this.tickets.filter(item => {
					return !item.completed;
				});
			if (this.show === 'completed')
				return this.tickets.filter(item => {
						return item.completed;
				});
			return this.tickets;
		},
  },

});
