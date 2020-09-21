<template>
  <div
    class="h-auto max-w-lg overflow-hidden border-transparent rounded md:max-w-md sm:max-w-sm xl:max-w-xl"
  >
    <div
      class="px-4 pt-4 text-4xl font-bold bg-transparent text-primary sm:px-6"
    >
      Build Progress
    </div>
    <div class="pt-0 bg-box text-primary">
      <div v-if="!progess" class="text-primary">
        <div
          class="relative px-4 py-3 text-red-700 bg-transparent border border-red-400 rounded"
          role="alert"
        >
          <strong class="font-bold">No Progress today</strong>
        </div>
      </div>
      <div v-else class="pt-0 bg-box text-primary">
        <div
          class="grid items-center h-10 grid-cols-2 px-2 border-b-4 border-gray-600 bg-grey-light"
        >
          <div class="col-span-1">Fomorian</div>
          <div
            class="col-span-1 text-primary progress"
            :data-label="progess['P1'].toFixed(0) + '%  Complete'"
          >
            <span
              class="value"
              :style="roundprogress(progess['P1'].toFixed(0))"
            ></span>
          </div>
        </div>
        <div
          class="grid items-center h-10 grid-cols-2 px-2 py-1 border-b-4 border-gray-600 bg-grey-light"
        >
          <div class="col-span-1">Razorback</div>
          <div
            class="col-span-1 text-primary progress"
            :data-label="progess['P2'].toFixed(0) + '%  Complete'"
          >
            <span
              class="value"
              :style="roundprogress(progess['P2'].toFixed(0))"
            ></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.progress {
  height: 1.5em;
  width: 100%;
  background-color: transparent;
  position: relative;
}

.progress::before {
  content: attr(data-label);
  font-size: 0.8em;
  position: absolute;
  text-align: center;
  top: 2px;
  left: 0;
  right: 0;
}

.progress .value {
  @apply bg-red-700;

  display: inline-block;
  height: 100%;
}

.item1 {
  grid-area: 1 / 2 / span 1 / span 3;
}

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
    roundprogress(percents) {
      const x = 'width: ' + percents + '%'
      return x
    },
    widthprop(prop) {
      const x = 'width: ' + prop.toFixed(2) + '%; max-width: auto'
      return x
    },
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
