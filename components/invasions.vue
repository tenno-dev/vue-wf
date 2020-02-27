<template>
  <div
    class="max-w-lg md:max-w-md sm:max-w-sm xl:max-w-xl h-auto rounded overflow-hidden border-transparent"
  >
    <div
      class="font-bold text-primary text-4xl px-4 pt-4 bg-transparent sm:px-6"
    >
      {{ $tc('test.invasions', 2) }}
    </div>
    <div class="bg-box text-primary pt-0 ">
      <div v-if="invasions.length < 1" class="text-primary ">
        <div
          class="bg-transparent border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong class="font-bold">No Invasions today</strong>
        </div>
      </div>
      <template v-else>
        <badger-accordion ref="myAccordion" :icons="false">
          <badger-accordion-item v-for="inva in invasions" :key="inva.id">
            <div slot="header" class="px-2 flex items-center">
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
              <div class="px-2 grid grid-cols-2 gap-0 py-1">
                <div class="w-full">
                  {{ $t('test.complete') }}
                </div>
                <div class="w-full">
                  {{ parseFloat(complete(inva.Completion)).toFixed(2) }} %
                  {{ $t('test.complete2') }}
                </div>
                <div class="w-full">
                  {{ $t('test.missiontype') }}
                </div>
                <div class="w-full break-normal">{{ inva.MissionType }}</div>
                <div v-if="inva.AttackerRewardItem" class="w-full">
                  {{ $t('test.attacker') }} {{ $tc('test.rewards', 1) }}:
                </div>
                <div v-if="inva.AttackerRewardItem" class="w-full break-normal">
                  {{ inva.AttackerRewardItem }}
                </div>
                <div v-if="inva.DefenderRewardItem" class="w-full">
                  {{ $t('test.defender') }} {{ $tc('test.rewards', 1) }}:
                </div>
                <div v-if="inva.DefenderRewardItem" class="w-full break-normal">
                  {{ inva.DefenderRewardItem }}
                </div>
              </div>
            </div>
          </badger-accordion-item>
        </badger-accordion>
      </template>
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
