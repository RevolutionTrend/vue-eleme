<template>
  <div class="content-top">
    <span>当前位置：</span>
    <a class="current-position">德讯科技大厦华博智慧园</a>
    <a class="change-position">[切换地址]</a>
    <Input
      ref="searchInput"
      suffix="ios-search"
      placeholder="Enter text"
      style="width: 284px;"
      @on-focus="changeSearchWidth"
    />
  </div>
</template>

<script>
import { Input } from "iview";
export default {
  name: "ContentHeader",
  methods: {
    changeSearchWidth() {
      this.$refs.searchInput.$el.style.width = "306px";
    }
  },
  components: {
    Input
  }
};
</script>


<style>
.content-top {
  width: 100%;
  height: 52px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.current-position {
  color: #000;
}
.current-position:hover {
  color: #0089dc;
}
.change-position {
  flex: 1;
  margin-left: 10px;
  text-align: left;
}
</style>

