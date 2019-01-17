import Vue from 'vue'
import Router from 'vue-router'

import Restaurants from './views/Restaurants.vue';
import Order from './views/Order.vue';
import Join from './views/Join.vue';
import Service from './views/Service.vue';
import Detail from './views/Detail.vue';

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: Restaurants
    }, {
      path: '/order',
      name: 'Order',
      component: Order
    }, {
      path: '/join',
      name: 'Join',
      component: Join
    }, {
      path: '/service',
      name: 'Service',
      component: Service
    }, {
      path: '/merchant/:id',
      name: 'Detail',
      component: Detail
    }
  ]
})
