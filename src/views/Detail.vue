<template>
  <div id="Detail">
    <div class="detail-header">
      <div class="detail-header-container main-width">
        <div class="detail-header-left">
          <img :src="getImagePath">
          <div class="detail-header-nameAndRate">
            <span>{{merchant.name}}</span>
            <CustomRate :rating="merchant.rating" :text="'('+merchant.rating_count+')'"/>
          </div>
        </div>
        <div class="detail-header-right">
          <div class="detail-header-rightText">
            <span>
              <em>起送价</em>
              <em class="shopguide-server-value">{{merchant.float_minimum_order_amount}}元</em>
            </span>
            <span>
              <em>配送费</em>
              <em class="shopguide-server-value">{{merchant.piecewise_agent_fee.description}}</em>
            </span>
            <span>
              <em>平均送达速度</em>
              <em class="shopguide-server-value">{{merchant.order_lead_time}}分钟</em>
            </span>
          </div>
          <div class="detail-header-favor" @click="changeFavor()">
            <i class="icon-eleme" :class="getFavorIcon"></i>
            <span>{{getFavor?'取消收藏':'收藏'}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="content-container main-width">
      <div class></div>
    </div>
  </div>
</template>

<script>
import globalTools from "../utils/tools.js";
import vueFetch from "../utils/connection.js";
import CustomRate from "../components/CustomRate.vue";

export default {
  name: "Detail",
  data() {
    return {
      merchant: {
        id: this.$route.params.id,
        image_path: "",
        name: "",
        rating: 0,
        rating_count: 0
      },
      menu: []
    };
  },
  computed: {
    getImagePath() {
      return globalTools.convertImagePath(this.$data.merchant.image_path);
    },
    getOverRate() {
      return {
        marginTop: "-32px",
        width: 20 * this.$data.merchant.rating + "px",
        overflow: "hidden"
      };
    },
    getFavor() {
      return this.$data.merchant.favored;
    },
    getFavorIcon() {
      return this.$data.merchant.favored ? "icon-unfavorite" : "icon-favorite";
    }
  },
  methods: {
    changeFavor() {
      this.$data.merchant.favored = !this.$data.merchant.favored;
    }
  },
  components: {
    CustomRate
  },
  created() {
    vueFetch("GET", "merchant", {
      id: this.$route.params.id
    }).then(data => {
      console.log(data);
      if (data) {
        this.$data.merchant = data;
      }
    });
    vueFetch("GET", "menu", {
      id: this.$route.params.id
    }).then(data => {
      if (data && Array.isArray(data)) {
        console.log(data);
        this.$data.menu = data;
      }
    });
  }
};
</script>

<style lang="scss">
@import "../common.scss";
.detail-header {
  width: 100%;
  height: 190px;
  background-image: url("../assets/shop-bg.jpg");
  background-position: 0 0;
  background-repeat: no-repeat;
  background-size: 1920px 190px;
  padding-top: 60px;
}
.detail-header-container {
  height: 130px;
  margin: 0 auto;
}
.detail-header-left {
  width: 471px;
  height: 130px;
  float: left;
  @include flexRowStartCenter;
  img {
    width: 95px;
    height: 95px;
    border-radius: 50%;
    border: 4px solid rgba(255, 255, 255, 0.3);
  }
  &:hover {
    height: auto;
  }
}
.detail-header-nameAndRate {
  flex: 1;
  margin-left: 15px;
  height: 64px;
  & > * {
    float: left;
    height: 32px;
  }
  & > span {
    width: 100%;
    font-size: 20px;
    font-weight: 400;
    line-height: 32px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: left;
    color: #fff;
  }
  .detail-header-ratebg {
    width: 100%;
  }
  .ivu-rate {
    float: left;
  }
}
.detail-header-right {
  width: 491px;
  height: 130px;
  float: right;
  @include flexRowStartStart;
}
.detail-header-rightText {
  height: 100%;
  flex: 1;
  padding: 0 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: white;
  span {
    width: atuo;
    display: inline-block;
    vertical-align: top;
    text-align: center;
    font-size: 14px;
  }
  em {
    font-style: normal;
    font-weight: 400;
  }
  .shopguide-server-value {
    display: block;
    margin-top: 12px;
    margin-bottom: 3px;
    font-size: 18px;
  }
}
.detail-header-favor {
  width: 80px;
  height: 65px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 0 0 5px 5px;
  color: #eee;
  cursor: pointer;
  @include flexColStartCenter;
  i {
    font-size: 20px;
  }
  span {
    font-size: 14px;
  }
}
</style>
