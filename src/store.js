import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: null,
        todostore: [],
        tickets: [],
        total: 0,
        vnum: null,
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        setTodostore(state, todostore) {
          state.todostore = todostore;
        },
        setTickets(state, tickets) {
            state.tickets = tickets;
        },
        setTotal(state, total) {
            state.total = total;
        },
        setVnum(state, vnum) {
          state.vnum = vnum;
        }
    },
    actions: {
        async register(context, data) {
            try {
                let response = await axios.post("/api/users", data);
                context.commit('setUser', response.data);
                // context.commit('setVnum', response.data.vnum);
                return "";
            } catch (error) {
                return error.response.data.message;
            }
        },
        async login(context, data) {
            try {
                let response = await axios.post("/api/users/login", data);
                context.commit('setUser', response.data);
                // context.commit('setVnum', response.data.vnum);
                return "";
            } catch (error) {
                return error.response.data.message;
            }
        },
        async logout(context) {
            try {
                await axios.delete("/api/users");
                context.commit('setUser', null);
                context.commit('setVnum', null);
                return "";
            } catch (error) {
                return error.response.data.message;
            }
        },
        async getUser(context) {
            try {
                let response = await axios.get("/api/users");
                context.commit('setUser', response.data);
                //context.commit('setVnum', response.data.vnum);
                return "";
            } catch (error) {
                return "";
            }
        },
        async approve(context, data) {
            try {
                await axios.post('/api/tickets', data);
                return "";
            } catch (error) {
                return error.response.data.message;
            }
        },
        async verify(context, data) {
            try {
                //await axios.post('/api/users/verify', data);
                let response = await axios.post('/api/users/verify', data);
                context.commit("setVnum", response.data);
                return "";
            } catch (error) {
                // return "";
                return error.response.data.message;
            }
        },
        async getTickets(context) {
            try {
                let response = await axios.get("/api/tickets");
                context.commit('setTickets', response.data);
                return "";
            } catch (error) {
                return "";
            }
        },
        async deleteTicket(context, ticket) {
            try {
                let response = await axios.delete("/api/tickets/edit", ticket);
                context.commit('setTickets', response.data);
            } catch (error) {
                return error.response.data.message;
            }
        },
        async completeTicket(context, ticket) {
            try {
                let response = await axios.post("/api/tickets/edit", ticket);
                context.commit('setTickets', response.data);
            } catch (error) {
                return error.response.data.message;
            }
        },
        async getTotal(context, data) {
            try {
                // console.log("called");
                let response = await axios.get("/api/users/total", data);
                context.commit('setTotal', response.data);
                return "";
            } catch (error) {
                return "";
            }
        },
        async saveTotal(context, data) {
            try {
                // console.log(data);
                let response = await axios.post("/api/users/total", data);
                context.commit('setTotal', response.data);
                return "";
            } catch (error) {
                return error.response.data.message;
            }
        },
    }
})