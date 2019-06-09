<template>
  <div
    class="max-w-lg md:max-w-md sm:max-w-sm h-auto rounded overflow-hidden border-transparent"
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
        <div class="flex items-center pt-2">
          <div class="w-full h-auto pl-2">
            {{ sortie.Boss }}
          </div>
          <div class="w-1/3 h-auto  mr-2">
            <span :class="getcolourfaction(sortie.Faction)">{{
              sortie.Faction
            }}</span>
          </div>
        </div>
        <div class="flex items-center pb-2 border-b border-gray-600">
          <div class="w-full h-auto pl-2">
            {{ $t('test.endsin') }}
          </div>
          <div class="w-1/3 h-auto  mr-2">
            {{ timediff(sortie.Ends) }}
          </div>
        </div>
      </div>
      <div
        v-if="typeof sortie !== 'undefined'"
        class="flex items-center py-2 border-b border-gray-600"
      >
        <div class="ml-4 w-full h-auto">
          {{ sortie.Variants[0].MissionType }}<br />{{
            sortie.Variants[0].MissionMod
          }}
        </div>
        <div class="w-1/3 h-auto  mr-2">
          {{ sortie.Variants[0].MissionLocation }}
        </div>
      </div>
      <div
        v-if="typeof sortie !== 'undefined'"
        class="flex items-center py-2 border-b border-gray-600"
      >
        <div class="ml-4 w-full h-auto">
          {{ sortie.Variants[1].MissionType }}<br />{{
            sortie.Variants[1].MissionMod
          }}
        </div>
        <div class="w-1/3 h-auto  mr-2">
          {{ sortie.Variants[1].MissionLocation }}
        </div>
      </div>
      <div
        v-if="typeof sortie !== 'undefined'"
        class="flex items-center py-2 border-b border-gray-600"
      >
        <div class="ml-4 mr-2 w-full h-auto">
          {{ sortie.Variants[2].MissionType }}<br />{{
            sortie.Variants[2].MissionMod
          }}
        </div>
        <div class="w-1/3 h-auto  mr-2">
          {{ sortie.Variants[2].MissionLocation }}
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
  name: 'SortiePanel',
  // eslint-disable-next-line
  props: ['sortie'],
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
