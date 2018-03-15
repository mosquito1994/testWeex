import Vue from 'vue'
import weex from '../../web/assets/weex-render-vue'

/*global Vue*/
weex.init(Vue);
/* weex initialized here, please do not move this line */
const router = require('./router');
const App = require('./index.vue');

/* eslint-disable no-new */
new Vue(Vue.util.extend({el: '#root', router}, App));

router.push("/");
