<template>
    <transition v-if="show" name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <div class="modal-header">
                        <h1 class="modal-title">Verify new todos</h1>
                    </div>
                    <div class="modal-body">
                        <p v-if="error" class="error">{{error}}</p>
                        <form v-if="user" @submit.prevent="approve(user, todos)">
                            <div  v-if="verified">
                                <li class="list" v-for="item in todos" v-bind:key="item._id">
                                    <input type="checkbox" v-model="item.completed" />
                                    <label v-bind:class="{ completed: item.completed }">{{ item.text }}</label>
                                    <label>you earn ${{ item.money }}</label>
                                    <!--<button v-on:click="deleteItem(item)" class="delete">X</button>-->
                                </li>
                                <button type="button" @click="close" class="pure-button">Close</button>
                                <button type="submit" class="pure-button pure-button-secondary">Approve</button>
                            </div>
                            <div v-else>
                                <label>Verify Number</label>
                                <input v-model="vnum" type="password" placeholder="Verify Number">
                                <button type="button" @click="close" class="pure-button">Close</button>
                                <button type="button" @click="verify(user)" class="pure-button pure-button-secondary">Verify</button>
                            </div>
                        </form>
                        <form v-else>
                            <router-link to="/login" class="pure-button">Login</router-link>
                        </form>
                        <p v-if="error" class="error">{{error}}</p>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'Verify',
        props: {
            show: Boolean,
        },
        data() {
            return {
                vnum: '',
                error: '',
            }
        },
        computed: {
            todos() {
                return this.$store.state.todostore;
            },
            user() {
                return this.$store.state.user;
            },
            verified() {
                return this.$store.state.vnum;
            }
        },
        async created() {
            await this.$store.dispatch("getUser");
        },
        methods: {
            close() {
                this.$emit('escape');
            },
            async verify(user) {
                try {
                    //console.log(this.vnum);
                    this.error = await this.$store.dispatch("verify", {
                        user: user,
                        vnum: this.vnum,
                    });
                    if (!this.error) {
                        this.vnum = null;
                    }
                } catch (error) {
                    console.log(error);
                }
            },
            async approve(user, todos) {
                try {
                    this.error = await this.$store.dispatch("approve", {
                        user: user,
                        todos: todos,
                    });
                    if (!this.error) {
                        this.vnum = null;
                    }
                } catch (error) {
                    console.log(error);
                }
            },
        }
    }
</script>

<style scoped>
    input {
        width: 100%;
    }

    textarea {
        width: 100%;
        height: 100px
    }

    .pure-button-secondary {
        float: right;
    }
</style>