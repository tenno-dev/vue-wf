<template>
  <div
    class="max-w-lg md:max-w-md sm:max-w-sm h-auto rounded overflow-hidden border-transparent"
  >
    <div class="font-bold text-primary text-4xl mt-1 bg-transparent">
      Build Progress
    </div>
    <div class="bg-box text-primary pt-0 ">
      <div v-if="!progess" class="text-primary ">
        <div
          class="bg-transparent border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong class="font-bold">No Progress today</strong>
        </div>
      </div>
      <div v-else class="flex pt-3 pb-1  mb-4">
        <div class="w-1/3 text-center">
          <svg-progress-bar
            :value="progess['P1']"
            :options="options"
          ></svg-progress-bar>
          Fomorian
        </div>
        <div class="w-1/3 text-center">
          <svg-progress-bar
            :value="progess['P2']"
            :options="options"
          ></svg-progress-bar>
          Razorback
        </div>
        <div class="w-1/3 text-center">
          <svg-progress-bar
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
table.table div,
table.table th,
table.table > thead > tr {
  border: 0;
}
circles-text[style] {
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
    activeplat: function() {
      return this.$store.state.activeplatform.short
    },
    activelang1: function() {
      return this.$store.state.activelang.short
    },
    options() {
      return {
        text: function(value) {
          return (
            this.htmlifyNumber(value) +
            '<span style="font-size: 0.4em;">%</span>'
          )
        },
        textColor: 'rgb(33, 150, 243)'
      }
    }
  },
  watch: {
    activeplat: function(newVal, oldVal) {
      // watch platform switch & subscribe to new channels
      // eslint-disable-next-line
      console.log(
        'Prop changed inva: ',
        this.$props.invasions.length,
        ' | was: ',
        oldVal
      )
    },
    activelang1: function(newVal, oldVal) {
      // watch platform switch & subscribe to new channels
      // eslint-disable-next-line
      console.log(
        'Prop changed inva: ',
        this.$props.invasions,
        ' | was: ',
        oldVal
      )
    }
  },
  methods: {
    complete: function(prop) {
      let x = prop
      if (prop < 0) {
        x = x * -1
      }
      return x
    }
  }
}
</script>
