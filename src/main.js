import Vue from 'vue'
import App from './App.vue'
import ElementUI from "element-ui";
import { routes } from "./routes/routes.js";
import VueRouter from "vue-router";
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueRouter);
const router = new VueRouter({
  routes
});

new Vue({
  el: "#app",
  router: router,
  render: h => h(App)
});


