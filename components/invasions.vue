<template>
  <div
    class="max-w-lg md:max-w-md sm:max-w-sm h-auto rounded overflow-hidden border-transparent"
  >
    <div class="font-bold text-primary text-4xl mt-1 bg-transparent">
      {{ headertext }}
    </div>
    <div class="bg-box text-primary pt-1 ">
      <badger-accordion v-if="invasions[0]" :icons="false" ref="myAccordion">
        <badger-accordion-item v-for="inva in invasions" :key="inva.id">
          <div slot="header" class="pl-2  pr-6 flex items-center">
            <p class="w-full">
              <span :class="getcolourfaction(inva.AttackerMissionInfo)">
                {{ inva.AttackerMissionInfo }}</span
              >
              vs
              <span :class="getcolourfaction(inva.DefenderMissionInfo)">{{
                inva.DefenderMissionInfo
              }}</span>
            </p>
            <span class="flex-shrink-0 p-2 ml-4 mr-2">{{ inva.Location }}</span>
          </div>
          <div
            slot="content"
            class=" bg-box break-all border-b border-gray-600"
          >
            <div class="pl-2  pr-6 flex items-center">
              <p class="w-full">
                Completion:
              </p>
              <span class="flex-shrink-0 p-2 ml-4 mr-2">
                {{ parseFloat(complete(inva.Completion)).toFixed(2) }} %
                completed</span
              >
            </div>
            <div class="pl-2  pr-6 flex items-center">
              <p class="w-full">
                Mission Type:
              </p>
              <span class="flex-shrink-0 p-2 ml-4 mr-2">{{
                inva.MissionType
              }}</span>
            </div>
            <div
              v-if="inva.AttackerRewardItem"
              class="pl-2  pr-6 flex items-center"
            >
              <p class="w-full">
                Attack Reward:
              </p>
              <span class="flex-shrink-0 p-2 ml-4 mr-2"
                >{{ inva.AttackerRewardCount }}&nbsp;x&nbsp;{{
                  inva.AttackerRewardItem
                }}</span
              >
            </div>
            <div
              v-if="inva.DefenderRewardItem"
              class="pl-2  pr-6 flex items-center"
            >
              <p class="w-full">
                Defender Reward:
              </p>
              <span class="flex-shrink-0 p-2 ml-4 mr-2"
                >{{ inva.DefenderRewardCount }}&nbsp;x&nbsp;{{
                  inva.DefenderRewardItem
                }}</span
              >
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
    activeplat: function() {
      return this.$store.state.activeplatform.short
    },
    activelang1: function() {
      return this.$store.state.activelang.short
    }
  },
  watch: {
    activeplat: function(newVal, oldVal) {
      // watch platform switch & subscribe to new channels
      // eslint-disable-next-line
      console.log('Prop changed inva: ', invasions.length, ' | was: ', oldVal)
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
    complete: function(prop) {
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
