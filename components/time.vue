<template>
  <div
    class="max-w-lg md:max-w-md sm:max-w-sm xl:max-w-xl h-auto rounded overflow-hidden border-transparent"
  >
    <div class="font-bold text-primary text-4xl mt-1 bg-transparent">
      Warframe Clocks
    </div>
    <div class="bg-box text-primary pt-0 ">
      <div v-if="!timer" class="text-primary ">
        <div
          class="bg-transparent border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong class="font-bold">No Time info</strong>
        </div>
      </div>
      <div v-else>
        <div
          class="flex items-center justify-between  w-full  py-2 border-b border-gray-600"
        >
          <div class="ml-3 w-1/2 h-auto">Earth</div>
          <div class="w-1/2 text-left h-auto">
            <fa
              v-if="timer.Earth[0].State == 'day'"
              icon="sun"
              fixed-width
              :style="{
                color: 'yellow'
              }"
            /><fa
              v-else
              icon="moon"
              fixed-width
              :style="{
                color: 'white'
              }"
            />
            {{ timer.Earth[0].State }}
          </div>
          <div class="w-full  text-right h-auto  mr-3">
            {{ timediff(timer.Earth[0].End) }} left till
            <fa
              v-if="timer.Earth[0].State == 'day'"
              icon="moon"
              fixed-width
            /><fa
              v-else
              icon="sun"
              fixed-width
              :style="{
                color: 'yellow'
              }"
            />
          </div>
        </div>
        <div class="flex items-center  w-full  py-2 border-b border-gray-600">
          <div class="ml-3 w-1/2 h-auto">Cetus</div>
          <div class="w-1/2 text-left h-auto">
            <fa
              v-if="timer.Cetus[0].State == 'day'"
              icon="sun"
              fixed-width
              :style="{
                color: 'yellow'
              }"
            /><fa
              v-else
              icon="moon"
              fixed-width
              :style="{
                color: 'white'
              }"
            />
            {{ timer.Cetus[0].State }}
          </div>
          <div class="w-full text-right h-auto mr-3">
            {{ timediff(timer.Cetus[0].End) }} left till
            <fa
              v-if="timer.Cetus[0].State == 'day'"
              icon="moon"
              fixed-width
            /><fa
              v-else
              icon="sun"
              fixed-width
              :style="{
                color: 'yellow'
              }"
            />
          </div>
        </div>
        <div class="flex items-center  w-full  py-2 border-b border-gray-600">
          <div class="ml-3 w-1/2 h-auto">Valis</div>
          <div class="w-1/2 text-left h-auto">
            <fa
              v-if="timer.Vallis[0].State == 'cold'"
              icon="snowflake"
              fixed-width
              :style="{
                color: 'cyan'
              }"
            /><fa
              v-else
              icon="sun"
              fixed-width
              :style="{
                color: 'yellow'
              }"
            />

            {{ timer.Vallis[0].State }}
          </div>
          <div class="w-full text-right h-auto mr-3">
            {{ timediff(timer.Vallis[0].End) }} left till
            <fa
              v-if="timer.Vallis[0].State == 'cold'"
              icon="sun"
              fixed-width
              :style="{
                color: 'yellow'
              }"
            /><fa
              v-else
              icon="snowflake"
              fixed-width
              :style="{
                color: 'cyan'
              }"
            />
          </div>
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
import moment from 'moment'

export default {
  name: 'TimePanel',
  // eslint-disable-next-line
  props: ['timer'],
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
