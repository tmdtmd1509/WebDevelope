<template>
  <div>
    <h1>Register for an account</h1>
    <form @submit.prevent="register" class="pure-form pure-form-aligned">
      <fieldset>
        <p class="pure-form-message-inline">Verify Number is only for the parents</p>

        <div class="pure-control-group">
          <label>Username</label>
          <input v-model="username" type="text" placeholder="Username">
        </div>

        <div class="pure-control-group">
          <label>Password</label>
          <input v-model="password" type="password" placeholder="Password">
        </div>

        <div class="pure-control-group">
          <label>Verify Number</label>
          <input v-model="vnum" type="password" placeholder="VerifyNumber">
        </div>

        <div class="pure-controls">
          <button type="submit" class="pure-button pure-button-primary">Submit</button>
        </div>
      </fieldset>
    </form>
    <p v-if="error" class="error">{{error}}</p>
  </div>
</template>

<script>
    export default {
        name: 'register',
        data() {
            return {
                vnum: '',
                username: '',
                password: '',
                error: '',
            }
        },
        methods: {
            async register() {
                try {
                    this.error = await this.$store.dispatch("register", {
                        vnum: this.vnum,
                        username: this.username,
                        password: this.password
                    });
                    if (this.error === "")
                        this.$router.push('basic');
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }
</script>

<style scoped>
  form {
    border: 1px solid #ccc;
    background-color: #eee;
    border-radius: 4px;
    padding: 20px;
  }

  .pure-controls {
    display: flex;
  }

  .pure-controls button {
    margin-left: auto;
  }
</style>