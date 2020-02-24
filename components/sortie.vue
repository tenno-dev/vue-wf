<template>
  <div
    class="max-w-lg md:max-w-md sm:max-w-sm xl:max-w-xl h-auto rounded overflow-hidden border-transparent"
  >
    <div class="font-bold text-primary text-4xl mt-1 bg-transparent">
      Sortie
    </div>
    <div class="bg-box text-primary pt-0 ">
      <div v-if="!sortie" class="text-primary ">
        <div
          class="bg-transparent border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong class="font-bold">No Sortie today</strong>
        </div>
      </div>
      <div v-else>
        <div class="px-2 grid grid-cols-2 gap-0">
          <div class="w-full h-auto">
            Boss:
          </div>
          <div class="w-full3 h-auto">
            <span :class="getcolourfaction(sortie.Faction)"
              >{{ sortie.Boss }} ( {{ sortie.Faction }} )</span
            >
          </div>
          <div class="w-full h-auto">
            {{ $t('test.endsin') }}
          </div>
          <div class="w-full h-auto number-col">
            {{ timediff(sortie.Ends) }}
          </div>
        </div>
        <div class="px-2 grid grid-cols-2 gap-0 border-t border-gray-600 ">
          <div
            v-if="typeof sortie !== 'undefined' && sortie.Variants[0]"
            class="py-2 w-full h-auto"
          >
            {{ sortie.Variants[0].MissionType }}
          </div>
          <div
            v-if="typeof sortie !== 'undefined' && sortie.Variants[0]"
            class="w-full h-auto"
          >
            {{ sortie.Variants[0].MissionLocation }}
          </div>
        </div>
        <div class="grid grid-cols-1 border-b border-gray-600 ">
          Mod: {{ sortie.Variants[0].MissionMod }}
        </div>

        <div class="px-2 grid grid-cols-2 gap-0">
          <div
            v-if="typeof sortie !== 'undefined'"
            class="flex items-center py-2 w-full h-auto"
          >
            {{ sortie.Variants[1].MissionType }}
          </div>
          <div class="grid grid-cols-1">
            {{ sortie.Variants[1].MissionLocation }}
          </div>
        </div>
        <div class="grid grid-cols-1 border-b border-gray-600 ">
          Mod: {{ sortie.Variants[1].MissionMod }}
        </div>
        <div class="px-2 grid grid-cols-2 gap-0">
          <div
            v-if="typeof sortie !== 'undefined'"
            class="flex items-center py-2  -full h-auto"
          >
            {{ sortie.Variants[2].MissionType }}
          </div>
          <div v-if="typeof sortie !== 'undefined'" class="w-full h-auto">
            {{ sortie.Variants[2].MissionLocation }}
          </div>
        </div>
        <div class="grid grid-cols-1">
          Mod: {{ sortie.Variants[2].MissionMod }}
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
  font-family: 'Roboto' !important;
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
