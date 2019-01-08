<template>
  <div class="content-top">
    <span>当前位置：</span>
    <a class="current-position">德讯科技大厦华博智慧园</a>
    <a class="change-position">[切换地址]</a>
    <span class="child-title">{{childTitle}}</span>
    <Input
      ref="searchInput"
      :search="isSearch"
      placeholder="搜索商家,美食..."
      style="width: 284px;"
      @on-search="searchRestaurants"
    />
  </div>
</template>

<script>
import { Input } from "iview";

export default {
  name: "ContentHeader",
  data() {
    return {
      isSearch: true,
      searchText: "",
      childTitle: this.$route.path === "/order" ? ">  近三个月订单" : ""
    };
  },
  methods: {
    searchRestaurants(value) {
      if (value) {
        console.log(value);
      }
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
  margin-left: 10px;
  text-align: left;
}
.child-title {
  flex: 1;
  margin-left: 10px;
  text-align: left;
}
.ivu-input-search-icon {
  font-weight: bolder !important;
}
.ivu-input-search-icon:hover {
  color: #0089dc !important;
}
</style>

