import Vue from 'vue'
import Router from 'vue-router'
import list from '@/components/list'
import test from '@/components/test'

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
