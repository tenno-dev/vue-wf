<template>
  <div id="app">
    <Navbar class="bg-green-700 p-2 mt-0 fixed w-full z-10 pin-t" />
    <router-view class="pt-10 md:pt-16 sm:pt-16" />
  </div>
</template>

<style>
@import "assets/styles/tailwind.postcss";

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
<script>
import Navbar from "@/components/Navbar.vue";

export default {
  name: "App",
  components: {
    Navbar
  }
};
</script>
