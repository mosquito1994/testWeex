import Vue from 'vue'
import Router from 'vue-router'
import list from '@/index/components/list'
import test from '@/index/components/test'

Vue.use(Router)

module.exports = new Router({
  routes: [
    {
      path: '/',
      name: 'list',
      component: list
    },
    {
      path: '/test',
      name: 'test',
      component: test
    }
  ]
})
