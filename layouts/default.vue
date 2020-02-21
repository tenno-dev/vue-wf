<template>
  <div
    :class="
      darkmode
        ? 'theme-dark bg-primary min-h-screen '
        : 'antialiased bg-primary  min-h-screen '
    "
  >
    <Navbar class="py-0 w-full fixed pin-t z-10" role="navigation" />
    <nuxt class="py-16 pt-12  min-h-screen" role="main" />
    <Footer class="elevation-24 py-2 fixed w-full z-10 bottom-0 pin-b" />
  </div>
</template>
<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/footer.vue'

export default {
  components: {
    Navbar,
    Footer
  },
  computed: {
    darkmode() {
      return this.$store.state.darkmode
    }
  }
}
</script>
