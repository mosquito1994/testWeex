import Vue from 'vue'
import weex from '../../web/assets/weex-render-vue'

/*global Vue*/
weex.init(Vue);

const router = require('./router');
const App = require('@/index/index.vue');

/* eslint-disable no-new */
new Vue(Vue.util.extend({el: '#root', router}, App));

router.push("/");
