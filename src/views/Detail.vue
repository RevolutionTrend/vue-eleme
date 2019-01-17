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
        <div class="detail-header-right"></div>
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
      }
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
}
</style>
