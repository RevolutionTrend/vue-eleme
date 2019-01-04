import Vue from 'vue'
import Vuex from 'vuex'

import { CHANGE_POSITION } from './actions';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    position: {
      adInfo: '江苏省南京市雨花台区',
      address: '江苏省南京市雨花台区中国南京软件谷德讯科技大厦华博智慧园',
      city: '南京市',
      city_id: 6,
      geohash: 'wtsmyu9gn4fu',
      latitude: 31.973492,
      longitude: 118.775858,
      name: '德讯科技大厦华博智慧园',
      plainCount: 2777,
      premiumCount: 261
    }
  },
  mutations: {
    changePosition(state, newPos) {
      Object.assign(state.position, newPos);
    }
  },
  actions: {
    [CHANGE_POSITION]({ commit }, newPosition) {
      commit('changePosition', newPosition);
    }
  }
})
