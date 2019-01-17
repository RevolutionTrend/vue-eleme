<template>
  <div class="rate-container">
    <div class="rate-star rate-grey">
      <span class="rate-star rate-active" :style="getActiveWidth"></span>
    </div>
    <span class="rate-text" v-if="text" :style="{color: textColor}">{{text}}</span>
  </div>
</template>

<script>
export default {
  name: "CustomRate",
  data() {
    return {
      rating: this.$attrs.rating,
      text: this.$attrs.text,
      textColor: this.$attrs["text-color"] ? this.$attrs["text-color"] : "#fff"
    };
  },
  computed: {
    changeRating() {
      return this.$attrs.rating;
    },
    getActiveWidth() {
      return {
        width: this.$data.rating * 20 + "px"
      };
    }
  },
  watch: {
    changeRating() {
      Object.assign(this.$data, this.$attrs);
    }
  }
};
</script>

<style lang="scss">
@import "../common.scss";
.rate-container {
  width: auto;
  height: 30px;
  min-width: 100px;
  display: inline-block;
  @include flexRowStartCenter;
}
.rate-star {
  font-family: Ionicons;
  font-size: 20px;
  font-weight: 400;
  line-height: 30px;
  &::before {
    content: "\F2BF\F2BF\F2BF\F2BF\F2BF";
    color: #e9e9e9;
  }
}
.rate-grey {
  margin-left: -4px;
}
.rate-active {
  margin-left: -100px;
  overflow: hidden;
  display: inline-block;
  line-height: 18px;
  &::before {
    color: #f5a623;
  }
}
.rate-text {
  font-size: 14px;
  color: #fff;
  margin-left: 8px;
  margin-top: 4px;
}
</style>

