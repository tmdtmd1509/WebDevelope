<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
    </div>
    <div class="content">
      <router-view />
    </div>
    <!--footer start-->
  <footer>
    &copy; 2018 Heeseung Hwang. All rights reserved.
    <br> <a href="https://github.com/tmdtmd1509">
    Heeseung Hwang's GitHub repository.</a>
  </footer>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.content {
  margin: 50px 100px;
}
html {
  height: 100%;
  box-sizing: border-box;
}

body {
  height: 100%;
}
footer {
  position: relative;
  margin-top: 30px;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 50px;
  color: white;
  text-align: center;
  background-color: #26dd5c;

}
</style>
