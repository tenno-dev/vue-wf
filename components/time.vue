<template>
  <div
    class="max-w-lg md:max-w-md sm:max-w-sm h-auto rounded overflow-hidden border-transparent"
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
        <div class="flex items-center  w-full  py-2 border-b border-gray-600">
          <div class="ml-5 w-1/3 h-auto pl-2">Earth</div>
          <div class="w-1/5 h-auto  pr-4">
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
          <div class="w-auto h-auto  pr-2">
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
          <div class="ml-5 w-1/3 h-auto pl-2">Cetus</div>
          <div class="w-1/5 h-auto  pr-4">
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
          <div class="w-auto h-auto  pr-2">
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
          <div class="ml-5 w-1/3 h-auto pl-2">Valis</div>
          <div class="w-1/5 h-auto  pr-4">
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
          <div class="w-auto h-auto  pr-2">
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
      this.$refs.myAccordion.init()
    }
  },
  methods: {
    complete: function(prop) {
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
