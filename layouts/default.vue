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
    <nuxt class="py-16 md:pt-16 sm:pt-16 min-h-screen" />
    <Footer
      class="elevation-24 bg-green-700 p-2 fixed w-full  z-10 bottom-0 pin-b"
    />
  </div>
</template>
<style></style>
<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/footer.vue'

export default {
  components: {
    Navbar,
    Footer
  },
  computed: {
    darkmode: function() {
      return this.$store.state.darkmode
    }
  }
}
</script>
