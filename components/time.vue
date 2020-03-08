<template>
  <div
    class="h-auto max-w-lg overflow-hidden border-transparent rounded md:max-w-md sm:max-w-sm xl:max-w-xl"
  >
    <div
      class="px-4 pt-4 text-4xl font-bold bg-transparent text-primary sm:px-6"
    >
      Timers
    </div>
    <div class="pt-0 bg-box text-primary ">
      <div v-if="!timer" class="text-primary ">
        <div
          class="relative px-4 py-3 text-red-700 bg-transparent border border-red-400 rounded"
          role="alert"
        >
          <strong class="font-bold">No Time info</strong>
        </div>
      </div>
      <div v-else>
        <div class="grid items-center grid-cols-4 p-1 border-b border-gray-600">
          <div class="w-1/4 h-auto col-span-1">Earth</div>
          <div class="w-full h-auto col-span-1 text-right">
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
          <div class="w-full h-auto col-span-2 text-right">
            <span class="number-col"> {{ timediff(timer.Earth[0].End) }}</span>
            left till
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
          <div class="w-full h-auto">Cetus</div>
          <div class="w-full h-auto text-right">
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
          <div class="w-full h-auto col-span-2 text-right">
            <span class="number-col"> {{ timediff(timer.Cetus[0].End) }}</span>
            left till
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
          <div class="w-full h-auto">Valis</div>
          <div class="w-full h-auto text-right">
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
          <div class="w-full h-auto col-span-2 text-right">
            <span class="number-col"> {{ timediff(timer.Vallis[0].End) }}</span>
            left till
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
.number-col {
  font-family: 'Roboto', sans-serif !important;
}

table.table div,
table.table > thead > tr {
  border: 0;
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
      if (ms.minutes() > 0 && ms.seconds() > 0) {
        minutes = ms.minutes() + 'm:'
      }
      if (ms.minutes() > 0 && ms.seconds() < 0) {
        minutes = ms.minutes() + 'm'
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
