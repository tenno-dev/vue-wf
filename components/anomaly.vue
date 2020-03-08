<template>
  <div
    id="root"
    class="h-auto max-w-lg overflow-hidden border-transparent rounded md:max-w-md sm:max-w-sm xl:max-w-xl"
  >
    <div
      class="px-4 pt-4 text-4xl font-bold bg-transparent text-primary sm:px-6"
    >
      Anomaly Location
    </div>
    <div class="pt-0 bg-box text-primary ">
      <div v-if="!anomaly" class="text-primary ">
        <div
          class="relative px-4 py-3 text-red-700 bg-transparent border border-red-400 rounded"
          role="alert"
        >
          <strong class="font-bold">No Anomaly location info</strong>
        </div>
      </div>
      <div v-else>
        <div
          class="grid items-center grid-cols-6 py-2 pl-2 pr-4 border-b-4 border-gray-600"
        >
          <div class="col-span-2">
            Node (Planet)
          </div>
          <div class="col-span-4">
            {{ anomaly.Node }}
          </div>
        </div>
        <div
          class="grid items-center grid-cols-6 px-2 py-2 pl-2 pr-3 border-b border-gray-600"
        >
          <div class="col-span-2 number-col">Started</div>
          <div class="col-span-4 ">
            {{ anomaly.Startstring }}
          </div>
        </div>
        <div
          class="grid items-center grid-cols-6 px-2 py-2 pl-2 pr-3 border-b border-gray-600"
        >
          <div class="col-span-2 number-col">Ended</div>
          <div class="col-span-4 ">
            {{ anomaly.EndString }}
          </div>
        </div>
        <div
          class="grid items-center grid-cols-6 px-2 py-2 pl-2 pr-3 border-b border-gray-600"
        >
          <div class="col-span-2 number-col">Next expected</div>
          <div class="col-span-4 ">
            {{ anomaly.Projectionstring }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.number-col {
  font-family: 'Roboto', sans-serif !important;
}
</style>
<script>
import moment from 'moment'

export default {
  name: 'AnomalyPanel',
  // eslint-disable-next-line
  props: ['anomaly'],
  data() {
    return {
      platinum: 'platinum',
      vallis: 'tracker.missiontype'
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
    },
    timediff(var1) {
      const start = moment(var1)
      // eslint-disable-next-line
      var ms = moment.duration(start.diff(moment().valueOf()))
      // eslint-disable-next-line
      let days = ''
      let hours = ''
      let minutes = ' '
      let seconds = ' '
      if (ms.days() * -1 > 0) {
        days = ms.days() * -1 + 'd '
      }
      if (ms.hours() > 0) {
        hours = ms.hours() + 'h:'
      }
      if (ms.minutes() > 0) {
        minutes = ms.minutes() + 'm:'
      }
      if (ms.seconds() > 0) {
        seconds = ms.seconds() + 's'
      }
      const t = days + hours + minutes + seconds
      return t
    }
  }
}
</script>
