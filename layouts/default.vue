<template>
  <div
    :class="
      darkmode
        ? 'antialiased theme-dark bg-primary min-h-screen  '
        : 'antialiased bg-primary  min-h-screen'
    "
  >
    <Navbar
      class="elevation-24 bg-green-700 p-2 mt-0 fixed w-full z-10 pin-t"
    />
    <nuxt class="pt-10 md:pt-16 sm:pt-16 min-h-screen" />
  </div>
</template>
<style></style>
<script>
import Navbar from '@/components/Navbar.vue'
export default {
  components: {
    Navbar
  },
  computed: {
    darkmode: function() {
      return this.$store.state.darkmode
    }
  }
}
</script>
