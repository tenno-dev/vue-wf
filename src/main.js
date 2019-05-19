import Vue from "vue";
import "./plugins/fontawesome";
import "./plugins/v-select";
import "./plugins/langflags";
import "./plugins/mqtt";
import "./plugins/accordion";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
