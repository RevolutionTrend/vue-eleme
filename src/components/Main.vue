<template>
  <div id="main">
    <Layout>
      <Header :style="headerStyle">
        <div class="main-width main-header">
          <div class="main-header-left">
            <i class="main-header-logo icon-eleme topbar-logo"></i>
            <Menu mode="horizontal" active-name="/" theme="primary">
              <MenuItem to="/home" name="/">首页</MenuItem>
              <MenuItem to="/order" name="/order">我的订单</MenuItem>
              <MenuItem to="/join" name="/join">加盟合作</MenuItem>
              <MenuItem to="/service" name="/service">我的客服</MenuItem>
              <MenuItem name="other"></MenuItem>
            </Menu>
          </div>
          <div class="main-header-right"></div>
        </div>
      </Header>
      <Content>
        <router-view></router-view>
      </Content>
      <Footer :style="{height: '90px'}"></Footer>
    </Layout>
  </div>
</template>

<script>
import Vue from "vue";
import { Layout, Header, Content, Footer, Menu, MenuItem } from "iview";

Vue.component("Layout", Layout);
Vue.component("Header", Header);
Vue.component("Content", Content);
Vue.component("Footer", Footer);
Vue.component("Menu", Menu);
Vue.component("MenuItem", MenuItem);

export default {
  name: "Main",
  data() {
    return {
      headerStyle: {
        position: "fixed",
        width: "100%",
        padding: 0,
        backgroundColor: "transparent",
        height: "60px"
      }
    };
  }
};
</script>

<style lang="scss">
.main-width {
  width: 960px;
}
.main-header {
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.main-header-left {
  width: auto;
  height: 100%;
}
.main-header-logo {
  float: left;
  width: 105px;
  height: 100%;
  margin-right: 30px;
  line-height: inherit;
}
.main-header-logo::before {
  color: #fff;
  font-size: 30px;
  vertical-align: top;
}
.ivu-menu-horizontal {
  background-color: transparent !important;
  float: left !important;
  // height: 61px !important;
}
.ivu-menu-item {
  border: none !important;
  font-size: 16px !important;
  padding: 0 !important;
  width: 100px !important;
  text-align: center !important;
}
.ivu-menu-item:last-child {
  width: 0 !important;
}
.ivu-menu-item-selected {
  background-color: #006bc7;
}

@media (min-width: 1260px) {
  .main-width {
    width: 1180px;
  }
}
</style>

