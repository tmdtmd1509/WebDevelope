<template>
  <div v-if="user">
    <a href="#" @click="logout">Logout</a>

    <!-- total money earned -->
    <div>
      <h1>Total Earned Pocket Money</h1>
      <p class="money_earned">$ {{ earned }}</p>
    </div>

    <!-- add task start -->
    <p v-show="todos.length === 0">Add a task to earn some pocket money!</p>
    <form v-on:submit.prevent="addItem">
      <input type="text" v-model="message" placeholder="task">
      <input class="value" type="number" v-model="value" placeholder="$value">
      <button type="submit">Add</button>
    </form>
    <!-- add task end -->

    <!-- list of add start-->
    <div>
      <ul>
        <li class="list" v-for="item in todos" v-bind:key="item._id">
          <input type="checkbox" v-model="item.completed" />
          <label v-bind:class="{ completed: item.completed }">{{ item.text }}</label>
          <label>you earn ${{ item.money }}</label>
          <button v-on:click="deleteItem(item)" class="delete">X</button>
        </li>
      </ul>
      <!-- possible -->
      <div>
        <h2>Total you can earn</h2>
        <p class="money_possible">$ {{ possible }}</p>
      </div>
      <!-- approve button -->
      <p>You need to get approved by your parent to add your task</p>
      <button @click="toggleApprove" type="button">Approve</button>
    </div>
    <!-- list of add end -->

    <Verify :show="showForm2" @escape="escape" @uploadFinished="uploadFinished"/>

    <!-- todo list start -->
    <div>
      <h1>A List of Things To Do</h1>
    </div>
    <!-- controler -->
    <div class="controls">
      <button v-on:click="showAll()">Show All</button>
      <button v-on:click="showActive()">Show Active</button>
      <button v-on:click="showCompleted()">Show Completed</button>
      <!-- <button v-on:click="deleteCompleted()">Delete Completed</button> -->
    </div>
    <!-- todo list logged  in-->
    <ul>
      <!--<li class="list" v-for="ticket in filteredTickets" draggable='true' v-on:dragstart="dragItem(ticket)" v-on:dragover.prevent v-on:drop="dropItem(ticket)">-->
      <li class="list" v-for="ticket in filtered"  v-bind:key="ticket._id" >
      <input type="checkbox" v-model="ticket.completed" v-on:click="completeTicket(ticket)"/>
        <label v-bind:class="{ completed: ticket.completed }">{{ ticket.text }}</label>
        <label>you earn ${{ ticket.money }}</label>
        <button v-on:click="deleteTicket(ticket)" class="delete">X</button>
      </li>
    </ul>

    <button @click="saveTotal()" type="button">Save</button>

    <!--todo list sample (looged out) -->
    <!--<div v-else>-->
      <!--<ul>-->
        <!--<li class="list">-->
          <!--<input type="checkbox" />-->
          <!--<label>Example task1</label>-->
          <!--<label>you earn $3</label>-->
        <!--</li>-->
        <!--<li class="list">-->
          <!--<input type="checkbox" />-->
          <!--<label>Example task2</label>-->
          <!--<label>you earn $5</label>-->
        <!--</li>-->
      <!--</ul>-->
    <!--</div>-->
    <!-- todo list end -->
  </div>

  <div v-else>
    <h1>Welcome to Pocket Money App</h1>
    <p>To start please log in or register!</p>
    <router-link to="/register" class="pure-button">Register</router-link>
    <router-link to="/login" class="pure-button">Login</router-link>
  </div>
</template>



<script>
    import Verify from '@/components/Verify.vue'
    //import EscapeEvent from '@/components/EscapeEvent.vue'

    export default {
        name: 'basic',
        components: {
          Verify,
          //EscapeEvent,
        },
        data() {
          return {
              showForm2: false,
              todos: [],
              message: '',
              value: '',
              possible: 0,
              filtered: [],
              show: 'all',
              drag: {},
              earned: 0,
              changedTickets: [],

              showForm: false,
            //user: null,
            //username: '',
            //password: '',
            //vnum: '',
            error: '',
            // totalEarned: 0,
          }
        },

        async created() {
            await this.$store.dispatch("getUser");
            await this.$store.dispatch("getTickets");
            await this.$store.dispatch("getTotal");
            this.changedTickets = this.$store.state.tickets;
            this.earned = this.$store.state.total;
            this.filtered = this.changedTickets;//
            //console.log(this.changedTickets);
            //console.log(this.earned);

            // await this.$store.dispatch("getVerified");
        },

        methods: {
            toggleApprove() {
                this.showForm2 = true;
            },
            escape() {
                this.showForm2 = false;
            },
            async uploadFinished() {
                this.showForm2 = false;
                try {
                    this.error = await this.$store.dispatch("getTickets");
                } catch (error) {
                    console.log(error);
                }
            },
            async logout() {
                try {
                    this.error = await this.$store.dispatch("logout");
                } catch (error) {
                    console.log(error);
                }
            },

            async deleteTicket(ticket) {
                try {
                    this.error = await this.$store.dispatch("deleteTicket", {
                        ticket: ticket,
                    });
                    if (this.error === "")
                        this.$router.push('home');
                } catch (error) {
                    console.log(error);
                }
            },
            async completeTicket(ticket) {
                ticket.completed = !ticket.completed;
                if(ticket.completed === false) {
                    this.subEarned(ticket.money);
                } else {
                    this.addEarned(ticket.money);
                }
                try {
                    this.error = await this.$store.dispatch("completeTicket", {
                        ticket: ticket,
                    });
                    if (this.error === "")
                        this.$router.push('home');
                } catch (error) {
                    console.log(error);
                }
            },
            addEarned(value) {
                if(value === '') {
                    value = 0;
                }
                this.earned = this.earned + parseInt(value);
            },
            subEarned(value) {
                if(value === '') {
                    value = 0;
                }
                let total = 0;
                total = this.earned - parseInt(value);
                this.earned = total;
            },

            async saveTotal() {
                try {
                    this.error = await this.$store.dispatch("saveTotal", {
                        total: this.earned,
                    });
                    if (this.error === "")
                        this.$router.push('home');
                } catch (error) {
                    console.log(error);
                }
            },

            addPossible(value) {
                if(value === '') {
                    value = 0;
                }
                this.possible = this.possible + parseInt(value);
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
                this.todos.push({
                    text: this.message,
                    completed: false,
                    money: this.value
                });
                this.addPossible(this.value);
                this.message = '';
                this.value = '';
                this.$store.commit("setTodostore", this.todos);
            },
            deleteItem(item) {
                let index = this.todos.indexOf(item);
                if (index > -1) {
                    this.todos.splice(index,1);
                    this.subPossible(item.money);
                }
                this.$store.commit("setTodostore", this.todos);
            },
            // filteredTickets() {
            //     if (this.show === 'active') {
            //         this.filtered = this.changedTickets.filter(item => {return !item.completed;});
            //     }
            //     else if (this.show === 'completed') {
            //         this.filtered = this.changedTickets.filter(item => {return item.completed;});
            //     }
            //     else {this.filtered = this.changedTickets;}
            // },

            showAll() {
                this.show = 'all';
                this.filtered = this.changedTickets;
            },
            showActive() {
                this.show = 'active';
                this.filtered = this.changedTickets.filter(item => {return !item.completed;});
            },
            showCompleted() {
                this.show = 'completed';
                this.filtered = this.changedTickets.filter(item => {return item.completed;});
            },

            // async completeTicket(ticket) {
            //     try {
            //         this.error = await this.$store.dispatch("completeTicket", {
            //             ticket: ticket,
            //         });
            //         if (this.error === "")
            //             this.$router.push('home');
            //     } catch (error) {
            //         console.log(error);
            //     }
            // },
            // async updateEarned() {
            //     this.error = "";
            //     try {
            //         let response = await axios.post("/api/users/totalEarned", {
            //             totalEarned: this.totalEarned
            //         });
            //         this.user = response.data;
            //         // close the dialog
            //     } catch (error) {
            //         this.error = error.response.data.message;
            //     }
            // },
            // dragItem(item) {
            //     this.drag = item;
            // },
            // dropItem(item) {
            //     const indexItem = this.tickets.indexOf(this.drag);
            //     const indexTarget = this.tickets.indexOf(item);
            //     this.tickets.splice(indexItem,1);
            //     this.tickets.splice(indexTarget,0,this.drag);
            // },
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
            tickets() {
                return this.$store.state.tickets;
            },
            total() {
                return this.$store.state.total;
            },

            // activeTickets() {
            //     return this.tickets.filter(item => {
            //         return !item.completed;
            //     });
            // },
        },

    }
</script>

<style scoped>
  /*:root { --translateValue: 0; }*/

  html,
  body,
  main {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    background-color: #26dd5c;
    color: brown;
  }

  header {
    position: relative;
    top: 0;
    width: 100%;
    background-color: #47da45;
    font-size: 30px;
    color: white;
    text-align: center;
    padding-top: 20px;
    padding-bottom: 20px;
    font-size: 30px;
  }
  h1 {
    font-size: 30px;
    color: red;
    text-align: center;
    padding: 5px;
    /*border-bottom: 2px black solid;*/
  }

  h2 {
    font-size: 20px;
    color: #a5cd0c;
    text-align: center;
  }

  h3 {
    text-align: center;
  }

  p {
    font-size: 12px;
    color: darkblue;
    padding: 5px;
    text-align: center;
  }

  footer {
    position: relative;
    bottom: 0;
    width: 100%;
    background-color: #26dd5c;
    color: white;
    text-align: center;
    padding-top: 20px;
    padding-bottom: 10px;
  }

  section {
    display: flex;
  }

  aside {
    flex: 1
  }

  article {
    flex: 4
  }

  img {
    width: 100%;
  }



  /* List */

  ul {
    list-style: none;
    text-align: center;
  }

  .list {
    background: #fff;
    width: max-content;
    min-height: 30px;
    padding: 10px;
    margin-bottom: 10px;
    font-size: 1em;
    display: inline-block;
    text-align: center;
  }

  .delete {
    display: none;
    margin-left: auto;
  }

  li:hover .delete {
    display: block;
  }

  label {
    width: 400px;
    text-align: center;
    margin-right: 30px;
  }

  .completed {
    text-decoration: line-through;
  }

  /* Form */
  form {
    text-align: center;
  }

  input[type=checkbox] {
    transform: scale(1.5);
    margin-right: 10px;
  }

  input[type=text] {
    font-size: 1em;
  }
  .value {
    width: 50px;
  }
  button {
    font-family: 'Arvo';
    font-size: 1em;
    text-align: center;
  }

</style>