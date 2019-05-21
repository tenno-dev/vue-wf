<template>
  <div
    v-if="syndicateitems"
    class="max-w-lg md:max-w-md sm:max-w-sm h-auto   overflow-hidden border-transparent"
  >
    <div class="font-bold text-inverse text-4xl mt-1">
      {{ headertext(syndicateitems.Syndicate) }}
    </div>
    <div class="bg-gray-500 text-default pt-1">
      <div class="flex  items-center pb-1">
        <div class="w-full bg-gray-500 h-auto pl-2">Ends in</div>
        <div class="w-1/3 bg-gray-500 h-auto  pr-2">
          {{ timediff(syndicateitems.End) }}
        </div>
      </div>
      <badger-accordion :icons="false">
        <badger-accordion-item
          v-for="job in syndicateitems.Jobs"
          :key="job.Jobtype"
        >
          <div slot="header" class="pl-2  pr-6 flex items-center">
            <p class="w-full">{{ job.Jobtype.split('/').slice(-1)[0] }}</p>
            <span class="flex-shrink-0 p-2 ml-4 mr-2"
              >{{ job.MinEnemyLevel }}-{{ job.MaxEnemyLevel }}</span
            >
          </div>
          <div slot="content" class="break-all">
            <div class="flex  items-center">
              <div class="w-full bg-gray-500 h-auto pl-2">Rewards</div>
              <div class="w-1/3 bg-gray-500 h-auto  pr-2">Standing</div>
            </div>
            <div class="flex items-center px-2">
              <div class="w-full break-all h-auto">
                <span
                  v-for="(reward, index) in job.Rewards"
                  :key="index"
                  :index="index"
                >
                  {{ reward }}<br
                /></span>
              </div>
              <div class="w-1/2 self-stretch content-center text-center ">
                <span
                  v-for="(stand, index) in job.StandingReward"
                  :key="index"
                  :index="index"
                >
                  {{ stand }}<br
                /></span>
              </div>
            </div>
          </div>
        </badger-accordion-item>
      </badger-accordion>
    </div>
  </div>
</template>

<style lang="postcss">
.js-badger-accordion-header {
  @apply bg-gray-600;
  display: block !important;
  &:hover,
  &.-ba-is-active {
    @apply bg-blue-600;
  }
}
.dd {
  margin-inline-start: 0em !important;
  margin-inline-end: 0em !important;
}
.js-badger-accordion-panel-inner {
  cursor: text;
  @apply bg-gray-400;
}
.badger-accordion-toggle {
  padding: 0%;
}
.badger-accordion__panel {
  max-height: 75vh !important;
  transition: max-height ease-in-out 0.5s;
  overflow: hidden;
  &.-ba-is-hidden {
    max-height: 0 !important;
  }
  .badger-accordion--initalised & {
    transition: max-height ease-in-out 0.2s;
  }
}
</style>

<script>
import moment from 'moment'

export default {
  name: 'SyndicatePanel',
  props: ['syndicateitems'],
  data() {
    return {
      platinum: 'platinum'
    }
  },
  methods: {
    headertext(var1) {
      let x = var1
      x = x.replace('Syndicate', ' Jobs')
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
