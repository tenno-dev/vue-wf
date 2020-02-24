<template>
  <div
    class="max-w-lg md:max-w-md sm:max-w-sm xl:max-w-xl h-auto rounded overflow-hidden border-transparent"
  >
    <div class="font-bold text-primary text-4xl mt-1 bg-transparent">
      Arbitration Missions
    </div>
    <div class="bg-box text-primary pt-0 ">
      <div v-if="!arbitration" class="text-primary ">
        <div
          class="bg-transparent border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong class="font-bold">No Time info</strong>
        </div>
      </div>
      <div v-else>
        <div
          v-for="(mission, id) in arbitration"
          :key="id"
          class="grid grid-cols-3 items-center  px-1 border-b border-gray-600"
        >
          <div>{{ mission.Node }} ({{ mission.Planet }})</div>
          <div>{{ mission.Missiontype }}</div>
          <div>{{ timediff(mission.Ends) }} left</div>
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
</style>
<script>
import moment from 'moment'

export default {
  name: 'ArbitrationPanel',
  // eslint-disable-next-line
  props: ['arbitration'],
  data() {
    return {
      platinum: 'platinum',
      vallis: 'test.missiontype'
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
