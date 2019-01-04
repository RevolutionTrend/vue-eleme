<template>
  <div id="Restaurants">
    <div class="content-header"></div>
    <div class="content-container main-width">
      <ContentHeader/>
    </div>
  </div>
</template>

<script>
import ContentHeader from "../components/ContentHeader.vue";
// import vueFetch from "../utils/connection.js";

// vueFetch("POST", "map", {
//   ip: "117.136.46.108"
// }).then(function(res) {
//   console.log(res);
// });

export default {
  name: "Restaurants",
  components: {
    ContentHeader
  }
};
</script>


<style lang="scss">
.content-container {
  height: auto;
  margin: 0 auto;
}
</style>

