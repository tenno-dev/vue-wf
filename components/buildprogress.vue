<template>
  <div
    class="h-auto max-w-lg overflow-hidden border-transparent rounded md:max-w-md sm:max-w-sm xl:max-w-xl"
  >
    <div
      class="px-4 pt-4 text-4xl font-bold bg-transparent text-primary sm:px-6"
    >
      Build Progress
    </div>
    <div class="pt-0 bg-box text-primary ">
      <div v-if="!progess" class="text-primary ">
        <div
          class="relative px-4 py-3 text-red-700 bg-transparent border border-red-400 rounded"
          role="alert"
        >
          <strong class="font-bold">No Progress today</strong>
        </div>
      </div>
      <div v-else class="flex pt-3 pb-1 mb-4">
        <div class="w-1/3 text-center">
          <svg-progress-bar
            class="number-col"
            :value="progess['P1']"
            :options="options"
          ></svg-progress-bar>
          Fomorian
        </div>
        <div class="w-1/3 text-center">
          <svg-progress-bar
            class="number-col"
            :value="progess['P2']"
            :options="options"
          ></svg-progress-bar>
          Razorback
        </div>
        <div class="w-1/3 text-center">
          <svg-progress-bar
            class="number-col"
            :value="progess['P3']"
            :options="options"
          ></svg-progress-bar>
          Unknown
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.number-col {
  font-family: 'Roboto', sans-serif !important;
}

table.table div,
table.table th,
table.table > thead > tr {
  border: 0;
}

.circles-text[style] {
  line-height: 90px !important;
}
</style>

<script>
export default {
  name: 'ProgressPanel',
  // eslint-disable-next-line
  props: ['progess'],
  data() {
    return {
      platinum: 'platinum'
    }
  },
  computed: {
    activeplat() {
      return this.$store.state.activeplatform.short
    },
    activelang1() {
      return this.$store.state.activelang.short
    },
    options() {
      return {
        text(value) {
          return (
            this.htmlifyNumber(value) +
            '<span style="font-size: 0.4em;">%</span>'
          )
        },
        textColor: 'rgb(33, 150, 243)'
      }
    }
  },
  methods: {
    complete(prop) {
      let x = prop
      if (prop < 0) {
        x = x * -1
      }
      return x
    }
  }
}
</script>
