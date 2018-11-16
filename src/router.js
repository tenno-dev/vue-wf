import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Patches from "./views/Patches.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/Patches",
      name: "patches",
      component: Patches
    }
  ]
});
