<template>
  <div
    class="h-auto max-w-lg overflow-hidden border-transparent rounded md:max-w-md sm:max-w-sm xl:max-w-xl"
  >
    <div
      class="px-4 pt-4 text-4xl font-bold bg-transparent text-primary sm:px-6"
    >
      Sortie
    </div>
    <div class="pt-0 bg-box text-primary ">
      <div v-if="!sortie" class="text-primary ">
        <div
          class="relative px-4 py-3 text-red-700 bg-transparent border border-red-400 rounded"
          role="alert"
        >
          <strong class="font-bold">No Sortie today</strong>
        </div>
      </div>
      <div v-else>
        <div
          class="grid items-center grid-cols-6 px-2 py-2 pl-2 pr-4 border-b border-gray-600"
        >
          <div class="w-full col-span-4 ">
            Boss:
          </div>
          <div class="w-full col-span-2">
            {{ $t('tracker.endsin') }}
          </div>
        </div>
        <div class="grid items-center grid-cols-6 px-2 py-2 pl-2 pr-4 ">
          <div
            :class="getcolourfaction(sortie.Faction) + ' col-span-4 text-left '"
          >
            {{ sortie.Boss }} ({{ sortie.Faction }})
          </div>

          <div class="w-full h-auto col-span-1 text-right">
            {{ timediff(sortie.Ends) }}
          </div>
        </div>
        <div v-for="(guess, i) in 3" :key="i">
          <div class="grid grid-cols-2 gap-0 px-2 border-t-4 border-gray-600 ">
            <div
              v-if="typeof sortie !== 'undefined' && sortie.Variants[i]"
              class="w-full h-auto pt-1"
            >
              {{ sortie.Variants[i].MissionType }}
            </div>
            <div
              v-if="typeof sortie !== 'undefined' && sortie.Variants[i]"
              class="w-full h-auto text-center"
            >
              {{ sortie.Variants[i].MissionLocation }}
            </div>
          </div>
          <div class="grid grid-cols-1 px-2 pb-1 border-b border-gray-600 ">
            Mod: {{ sortie.Variants[i].MissionMod }}
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

.number-col {
  font-family: 'Roboto', sans-serif !important;
}
</style>

<script>
import moment from 'moment'

export default {
  name: 'SortiePanel',
  // eslint-disable-next-line
  props: ['sortie'],
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
    getcolourfaction(prop) {
      let x = null
      if (prop === 'Grineer') {
        x = 'text-red-600'
      } else if (prop === 'Corpus') {
        x = 'text-blue-600'
      } else if (prop === 'Infested') {
        x = 'text-green-600'
      } else {
        x = 'text-white'
      }
      return x
    },
    timediff(var1) {
      var1 = var1 * 1
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
