<template>
  <div id="Restaurants">
    <div class="content-header"></div>
    <div class="content-container main-width">
      <ContentHeader/>
      <div class="content-category">
        <span class="content-all-category category-text">全部商家：</span>
        <div class="content-category-right">
          <ul class="category-ul">
            <li
              v-for="(item, index) in categorys"
              :key="item.id"
              class="category-li"
              :class="index === selectedIndex ? 'category-li-selected' : ''"
              @click="changeCagegory(index)"
            >
              <span class="category-text">{{item.name}}</span>
            </li>
          </ul>
          <ul
            class="category-ul"
            :style="{backgroundColor: '#f6f6f6', padding: '6px 0'}"
            v-if="subCategorys.length>0"
          >
            <li
              v-for="(item, index) in subCategorys"
              :key="item.id"
              class="category-li"
              :class="index === subSelectedIndex ? 'category-subli-selected' : ''"
              @click="changeSubCagegory(index)"
            >
              <span class="category-text">{{item.name}}</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="content-merchant">
        <ul class="merchant-ul">
          <li
            class="merchant-width merchant-li"
            v-for="merchant in restaurants"
            :key="merchant.id"
            @click="gotoDetail(merchant.id)"
          >
            <Poptip
              trigger="hover"
              content="message"
              class="merchant-poptip"
              placement="right-start"
            >
              <div class="merchant-in-tip">
                <div class="merchant-logo-area">
                  <img :src="getLogoPath(merchant.image_path)">
                  <span
                    :class="merchant.order_lead_time>45?'time-long':'time-normal'"
                  >{{(merchant.order_lead_time>45?'45+': merchant.order_lead_time) + ' 分钟'}}</span>
                  <!-- <span v-if="merchant.order_lead_time<=45">{{merchant.order_lead_time + ' 分钟'}}</span>
                  <span v-if="merchant.order_lead_time>45" style="color: red;">45+ 分钟</span>-->
                </div>
                <div class="merchant-main">
                  <span class="merchant-name">{{merchant.name}}</span>
                  <CustomRate :rating="merchant.rating" :text="merchant.rating" text-color="#999"/>
                  <span class="merchant-fee">{{merchant.piecewise_agent_fee.description}}</span>
                  <div class="merchant-flags">
                    <span class="support-flag support-flag-new" v-if="merchant.is_new">新</span>
                    <span
                      class="support-flag"
                      v-for="support in merchant.supports"
                      :key="support.id"
                    >{{support.icon_name}}</span>
                  </div>
                </div>
              </div>
              <div class="poptip-merchant" slot="content">
                <span class="merchant-name">{{merchant.name}}</span>
                <div class="merchant-subtitle-area">
                  <span v-for="flavor in merchant.flavors" :key="flavor.id">{{flavor.name}}</span>
                </div>
                <div class="merchant-rstFlag" v-if="merchant.is_new">
                  <span class="support-flag support-flag-new" v-if="merchant.is_new">新</span>
                  <span class="merchant-rst-desc">新店开张，欢迎光临</span>
                </div>
                <div class="merchant-rstFlag" v-for="flag in merchant.supports" :key="flag.id">
                  <span class="support-flag">{{flag.icon_name}}</span>
                  <span class="merchant-rst-desc">{{flag.description}}</span>
                </div>
                <ul class="merchant-time-fee">
                  <li>{{merchant.piecewise_agent_fee.tips}}</li>
                  <li>
                    平均
                    <span>{{merchant.order_lead_time}}</span>分钟送达
                  </li>
                </ul>
                <span
                  class="merchant-promotion"
                  v-if="merchant.promotion_info"
                >{{merchant.promotion_info}}</span>
              </div>
            </Poptip>
          </li>
        </ul>
        <div class="restaurant-loading" v-if="restaurantsLoading">
          <img src="../assets/loading.gif">
          <span>正在载入更多商家...</span>
        </div>
        <div
          class="restaurant-loadmore"
          v-if="!restaurantsLoading&&restaurantsCount>restaurants.length"
          @click="getNextPage()"
        >点击加载更多商家...</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Poptip } from "iview";
import ContentHeader from "../components/ContentHeader.vue";
import vueFetch from "../utils/connection.js";
import globalTools from "../utils/tools.js";
import CustomRate from "../components/CustomRate.vue";

// let categorys = [];
// vueFetch("GET", "category", {
//   latitude: 31.973492,
//   longitude: 118.775854
// }).then(function(data) {
//   if (data && Array.isArray(data)) {
//     categorys = data;
//   }
// });

// vueFetch("GET", "restaurants", {
//   "extras[]": "activities",
//   geohash: "wtsmyu9gjfzu",
//   latitude: 31.973492,
//   limit: 24,
//   longitude: 118.775854,
//   offset: 0,
//   terminal: "web"
// }).then(function(data) {
//   console.log(data);
// });

const pageLimit = 24;
const getRestaurants = (vm, offset) => {
  vueFetch("GET", "restaurants", {
    "extras[]": "activities",
    geohash: "wtsmyu9gjfzu",
    latitude: 31.973492,
    limit: pageLimit,
    longitude: 118.775854,
    offset: offset,
    terminal: "web"
  }).then(data => {
    if (data && Array.isArray(data)) {
      vm.$data.restaurants = [...vm.$data.restaurants, ...data];
    }
    vm.$data.restaurantsLoading = false;
  });
};

export default {
  name: "Restaurants",
  data() {
    return {
      categorys: [],
      subCategorys: [],
      restaurants: [],
      selectedIndex: 0,
      subSelectedIndex: 0,
      itemsPerLine: document.body.clientWidth >= 1260 ? 4 : 3,
      restaurantsLoading: true,
      restaurantsCount: 0,
      page: 0
    };
  },
  computed: {
    // showMoreArea() {
    //   console.log(this.$data);
    //   return (
    //     !this.$data.restaurantsLoading &&
    //     this.$data.restaurantsCount > this.$data.restaurants.length
    //   );
    // }
  },
  methods: {
    changeCagegory(index) {
      if (index === this.$data.selectedIndex) return;
      this.$data.selectedIndex = index;
      this.$data.subSelectedIndex = 0;
      this.$data.subCategorys =
        this.$data.categorys.length > 0 &&
        this.$data.categorys[index].hasOwnProperty("sub_categories")
          ? this.$data.categorys[index].sub_categories
          : [];
    },
    changeSubCagegory(index) {
      if (index === this.$data.subSelectedIndex) return;
      this.$data.subSelectedIndex = index;
    },
    getLogoPath(path) {
      return globalTools.convertImagePath(path);
    },
    getRateGrey(rating) {
      const width = 20 * (5 - rating);
      return {
        width: width + "px",
        marginLeft: 100 - width + "px"
      };
    },
    gotoDetail(id) {
      this.$router.push({
        name: "Detail",
        params: {
          id
        }
      });
    },
    getNextPage() {
      this.$data.restaurantsLoading = true;
      const page = this.$data.page + 1;
      this.$data.page = page;
      const offset = page * pageLimit;
      getRestaurants(this, offset);
    }
  },
  components: {
    ContentHeader,
    CustomRate,
    Poptip
  },
  created() {
    console.log("created");
    vueFetch("GET", "category", {
      latitude: 31.973492,
      longitude: 118.775854
    }).then(data => {
      console.log("data response");
      if (data && Array.isArray(data)) {
        this.$data.categorys = data;
        this.$data.restaurantsCount = parseInt(data[0].count, 10);
        // this.$set(this.$data, "categorys", data);
      }
    });
    getRestaurants(this, 0);
    // window.onresize = () => {
    //   this.$data.itemsPerLine = document.body.clientWidth >= 1260 ? 4 : 3;
    // };
  },
  mounted() {
    console.log("mounted");
  }
};
</script>


<style lang="scss">
@import "../common.scss";
.content-category {
  width: 100%;
  height: auto;
  background-color: #fff;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  font-size: 14px;
  padding: 10px;
  border: 1px solid #e6e6e6;
  transition: height 1s;
}
.content-all-category {
  color: #999;
}
.category-text {
  width: auto;
  padding: 1px 10px;
  margin: 5px 0;
  display: block;
  line-height: 26px;
}
.content-category-right {
  flex: 1;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
.category-ul {
  display: block;
  width: 100%;
  height: auto;
  list-style: none;
  padding: 0;
  margin: 0;
}
.category-li {
  width: auto;
  height: auto;
  float: left;
  padding: 0 6px;
  cursor: pointer;
  color: #666;
}
.category-li > .category-text:hover {
  background-color: #f6f6f6;
  border-radius: 3px;
}
.category-li-selected {
  background-color: #f6f6f6;
  color: #0089dc !important;
}
.category-subli-selected {
  .category-text {
    color: #fff !important;
    background-color: #0089dc !important;
    border-radius: 3px;
  }
}
.content-merchant {
  width: 100%;
  height: auto;
  border: 1px solid #e6e6e6;
  background-color: #fff;
  margin-top: 20px;
}
.merchant-ul {
  width: 100%;
  height: auto;
  list-style: none;
  display: inline-block;
  margin-bottom: -5px;
}
.merchant-li {
  height: 140px;
  float: left;
  cursor: pointer;
}
.merchant-li:hover {
  background-color: #f5f5f5;
}
.merchant-poptip {
  width: 100%;
  & > .ivu-poptip-rel {
    width: 100%;
  }
}
.merchant-in-tip {
  padding: 20px;
  width: 100%;
  height: 140px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.merchant-logo-area {
  width: 70px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  & > img {
    width: 70px;
    height: 70px;
  }
  & > span {
    font-weight: 400;
    font-size: 12px;
    color: #999;
  }
  .time-normal {
    color: #999;
  }
  .time-long {
    color: #c00;
  }
}
.merchant-main {
  width: calc(100% - 90px);
  height: 100%;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
}
.merchant-name {
  width: 100%;
  font-size: 16px;
  font-weight: 800;
  color: #000;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: left;
}
.merchant-name:hover {
  color: #0089dc;
}
.ivu-rate-star {
  margin-right: 0 !important;
}
.merchant-fee {
  font-size: 12px;
  font-weight: 400;
  color: #999;
}
.merchant-flags {
  width: 100%;
  height: 20px;
}
.support-flag {
  width: 18px;
  height: 18px;
  border: 1px solid #999;
  font-size: 12px;
  color: #999;
  line-height: 16px;
  float: left;
  border-radius: 2px;
  margin-right: 3px;
  margin-top: 1px;
}
.support-flag-new {
  border-color: #e75959 !important;
  background-color: #e75959;
  color: #fff !important;
}
.grey-rate {
  position: absolute;
  height: 32px;
  margin-top: 26px;
  overflow: hidden;
}
.grey-rate-container {
  float: right;
  width: 100px;
  height: 32px;
}
.ivu-rate-text {
  color: #999 !important;
  & > span:last-child {
    display: none;
  }
}
.ivu-poptip-inner {
  padding: 16px 14px;
}
.poptip-merchant {
  width: 292px;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  & > * {
    width: 100%;
  }
}
.merchant-subtitle-area {
  display: block;
  height: auto;
  padding: 5px 0;
  border-bottom: 1px solid #dcdcdc;
  margin-bottom: 5px;
  & > span {
    width: auto;
    height: auto;
    font-size: 12px;
    float: left;
    margin-right: 4px;
    color: #999;
  }
}
.merchant-rstFlag {
  height: auto;
  @include flexRowStartStart;
  margin-top: 5px;
}
.merchant-rst-desc {
  height: auto;
  font-size: 12px;
  color: #666;
  flex: 1;
  margin-left: 2px;
  white-space: normal;
  text-align: left;
}
.merchant-time-fee {
  display: table;
  background-color: #f2f2f2;
  padding: 8px 0;
  margin-top: 10px;
  li {
    display: table-cell;
    font-size: 12px;
    color: #333;
  }
  li:last-child {
    border-left: 1px solid #ddd;
  }

  span {
    color: #f74342;
    margin-right: 3px;
  }
}
.merchant-promotion {
  height: auto;
  color: #999;
  font-size: 12px;
  white-space: normal;
  word-break: break-all;
  margin-top: 20px;
  text-align: left;
}
.restaurant-loading {
  width: 100%;
  height: 150px;
  @include flexRowCenterCenter;
  & > img {
    width: 36px;
    height: 36px;
  }
  & > span {
    font-size: 14px;
    color: #999;
  }
}
.restaurant-loadmore {
  width: 100%;
  height: 54px;
  background-image: linear-gradient(to bottom, #f9f9f9, #eee);
  color: #777;
  font-size: 18px;
  line-height: 54px;
  text-align: center;
  cursor: pointer;
}
</style>
