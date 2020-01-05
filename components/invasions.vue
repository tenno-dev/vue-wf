<template>
  <div
    class="max-w-lg md:max-w-md sm:max-w-sm xl:max-w-xl h-auto rounded overflow-hidden border-transparent"
  >
    <div class="font-bold text-primary text-4xl mt-1 bg-transparent">
      {{ $tc('test.invasions', 2) }}
    </div>
    <div class="bg-box text-primary pt-0 ">
      <div v-if="!invasions[0]" class="text-primary ">
        <div
          class="bg-transparent border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong class="font-bold">No Invasions today</strong>
        </div>
      </div>
      <badger-accordion v-else ref="myAccordion" :icons="false">
        <badger-accordion-item v-for="inva in invasions" :key="inva.id">
          <div slot="header" class="px-3 flex items-center">
            <p class="w-full">
              <span :class="getcolourfaction(inva.AttackerMissionInfo)">
                {{ inva.AttackerMissionInfo }}</span
              >
              vs
              <span :class="getcolourfaction(inva.DefenderMissionInfo)">{{
                inva.DefenderMissionInfo
              }}</span>
            </p>
            <span class="w-3/4 text-right p-2 pr-0">{{ inva.Location }}</span>
          </div>
          <div
            slot="content"
            class=" bg-box break-all border-b border-gray-600"
          >
            <div class="px-3 flex items-center">
              <p class="w-full">
                {{ $t('test.complete') }}
              </p>
              <span class="flex-shrink-0 p-2">
                {{ parseFloat(complete(inva.Completion)).toFixed(2) }} %
                {{ $t('test.complete2') }}</span
              >
            </div>
            <div class="px-3 flex items-center">
              <p class="w-full">
                {{ $t('test.missiontype') }}
              </p>
              <span class="flex-shrink-0 p-2">{{ inva.MissionType }}</span>
            </div>
            <div v-if="inva.AttackerRewardItem" class="px-3 flex items-center">
              <p class="w-full">
                {{ $t('test.attacker') }} {{ $tc('test.rewards', 1) }}:
              </p>
              <span class="flex-shrink-0 p-2">{{
                inva.AttackerRewardItem
              }}</span>
            </div>
            <div v-if="inva.DefenderRewardItem" class="px-3 flex items-center">
              <p class="w-full">
                {{ $t('test.defender') }} {{ $tc('test.rewards', 1) }}:
              </p>
              <span class="flex-shrink-0 p-2">{{
                inva.DefenderRewardItem
              }}</span>
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
  name: 'InvasionsPanel',
  // eslint-disable-next-line
  props: ['invasions'],
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
