<template>
  <div
    class="h-auto max-w-lg overflow-hidden border-transparent rounded md:max-w-md sm:max-w-sm xl:max-w-xl"
  >
    <div
      class="px-4 pt-4 text-4xl font-bold bg-transparent text-primary sm:px-6"
    >
      {{ $t('test.alerts') }}
    </div>
    <div class="pt-0 bg-box text-primary ">
      <div v-if="!alerts" class="text-primary ">
        <div
          class="relative px-4 py-3 antialiased bg-transparent border border-red-400 text-alert"
          role="alert"
        >
          <strong class="font-bold">No Alerts today</strong>
        </div>
      </div>
      <badger-accordion v-else ref="myAccordion" :icons="false">
        <badger-accordion-item v-for="alert in alerts" :key="alert.id">
          <div slot="header" class="flex items-center px-3">
            <p class="w-full">
              <span>
                {{ alert.MissionType }}<br />{{ $t('test.on') }}
                {{ alert.MissionLocation }}</span
              >
            </p>
            <!--
              vs
              <span :class="getcolourfaction(inva.DefenderMissionInfo)">{{
                inva.DefenderMissionInfo
              }}</span>
            </p>-->
            <span class="flex-shrink-0 p-2 pr-0">
              {{ timediff(alert.Ends) }} left
            </span>
          </div>

          <div slot="content" class="break-all border-b border-gray-600 bg-box">
            <div class="flex items-center px-3">
              <p class="w-full ml-4">{{ $t('test.enemylevel') }}</p>
              <span class="flex-shrink-0 p-2 ml-4 mr-2">
                {{ alert.MinEnemyLevel }}
                - {{ alert.MaxEnemyLevel }}</span
              >
            </div>
            <div class="flex items-center px-3">
              <p class="w-full ml-4">
                {{ $t('test.enemyfaction') }}
              </p>
              <span class="flex-shrink-0 p-2 ml-4 mr-2">
                <span :class="getcolourfaction(alert.MissionFaction)">{{
                  alert.MissionFaction
                }}</span>
              </span>
            </div>
            <div class="flex items-center px-3">
              <p class="w-full ml-4">Credits {{ $tc('test.rewards', 1) }}:</p>
              <span class="flex-shrink-0 p-2 ml-4 mr-2">
                {{ alert.RewardCredits }}
              </span>
            </div>
            <div v-if="alert.RewardItem" class="flex items-center px-3">
              <p class="w-full ml-4">Item {{ $tc('test.rewards', 1) }}:</p>
              <span class="flex-shrink-0 p-2 ml-4 mr-2">
                <span v-if="alert.RewardItemManyCount"
                  >{{ alert.RewardItemManyCount }}x </span
                ><span v-else>1x </span>
                {{ alert.RewardItem }}
              </span>
            </div>
            <div v-if="alert.RewardItemMany" class="flex items-center px-3">
              <p class="w-full ml-4">Item {{ $tc('test.rewards', 1) }}:</p>
              <span class="flex-shrink-0 p-2 ml-4 mr-2">
                <span v-if="alert.RewardItemManyCount"
                  >{{ alert.RewardItemManyCount }}x </span
                ><span v-else>1x </span>
                {{ alert.RewardItemMany }}
              </span>
            </div>
          </div>
        </badger-accordion-item>
      </badger-accordion>
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
  name: 'AlertsPanel',
  // eslint-disable-next-line
  props: ['alerts'],
  data() {
    return {
      platinum: 'platinum'
    }
  },
  computed: {
    headertext() {
      return 'Invasions'
    },
    activeplat() {
      return this.$store.state.activeplatform.short
    },
    activelang1() {
      return this.$store.state.activelang.short
    }
  },
  watch: {
    activeplat(newVal, oldVal) {
      // eslint-disable-next-line no-console
      // console.log(this)
      // this.$refs.myAccordion.init()
    },
    activelang1(newVal, oldVal) {
      // watch platform switch & subscribe to new channels
      // this.$refs.myAccordion.init()
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
    complete(prop) {
      let x = prop
      if (prop < 0) {
        x = x * -1
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
