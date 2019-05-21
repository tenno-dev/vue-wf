<template>
  <div
    :class="
      darkmode
        ? 'theme-dark bg-inverse min-h-screen  '
        : 'bg-inverse min-h-full'
    "
  >
    <Navbar class="bg-green-700 p-2 mt-0 fixed w-full z-10 pin-t" />
    <nuxt class="pt-10 md:pt-16 sm:pt-16" />
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
