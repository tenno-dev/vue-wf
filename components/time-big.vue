<template>
  <div class="h-auto mt-4 overflow-hidden border-transparent rounded">
    <div v-if="timer" class="flex grid grid-cols-12">
      <div
        class="col-span-2 px-2 text-4xl font-bold bg-transparent text-primary sm:px-6"
      >
        Timer
      </div>
      <div
        class="self-center col-span-3 px-2 text-2xl font-bold bg-transparent text-primary"
      >
        Earth:
        <fa
          v-if="timer.Earth[0].State == 'day'"
          class="text-xl"
          icon="sun"
          fixed-width
          :style="{
            color: 'yellow'
          }"
        /><fa
          v-else
          class="items-center text-xl"
          icon="moon"
          fixed-width
          :style="{
            color: 'white'
          }"
        />
        <span class="number-col"> {{ timediff(timer.Earth[0].End) }}</span>
        left
      </div>
      <div
        class="self-center col-span-3 px-2 text-2xl font-bold bg-transparent text-primary"
      >
        Cetus:
        <fa
          v-if="timer.Cetus[0].State == 'day'"
          class="text-xl"
          icon="sun"
          fixed-width
          :style="{
            color: 'yellow'
          }"
        /><fa
          v-else
          class="items-center text-xl"
          icon="moon"
          fixed-width
          :style="{
            color: 'white'
          }"
        />
        <span class="number-col"> {{ timediff(timer.Cetus[0].End) }}</span>
        left
      </div>
      <div
        class="self-center col-span-3 px-2 text-2xl font-bold bg-transparent text-primary"
      >
        Vallis:
        <fa
          v-if="timer.Vallis[0].State == 'cold'"
          class="text-xl"
          icon="snowflake"
          fixed-width
          :style="{
            color: 'cyan'
          }"
        /><fa
          v-else
          class="items-center text-2xl"
          icon="sun"
          fixed-width
          :style="{
            color: 'yellow'
          }"
        />
        <span class="number-col"> {{ timediff(timer.Vallis[0].End) }}</span>
        left
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
