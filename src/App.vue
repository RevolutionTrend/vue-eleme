<template>
  <div id="app">
    <Main/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>


<script>
import Vue from "vue";
import Main from "./components/Main.vue";

Vue.component("Main", Main);

export default {
  name: "App"
};
</script>

