<template>
  <div
    id="root"
    class="h-auto max-w-lg overflow-hidden border-transparent md:max-w-md sm:max-w-sm xl:max-w-xl"
  >
    <div
      v-if="syndicateitems"
      class="px-4 pt-4 text-4xl font-bold bg-transparent text-primary sm:px-6"
    >
      {{ headertext(syndicateitems.Syndicate) }}{{ $t('tracker.syndicate') }}
    </div>
    <div class="pt-0 bg-box text-primary ">
      <div v-if="!syndicateitems" class="text-primary ">
        <div
          class="relative px-4 py-3 text-red-700 bg-transparent border border-red-400 rounded"
          role="alert"
        >
          <strong class="font-bold">No Jobs today</strong>
        </div>
      </div>
      <div
        v-if="syndicateitems"
        class="flex items-center py-2 pl-2 pr-4 border-b-4 border-gray-600"
      >
        <div class="w-3/5 h-auto ">{{ $t('tracker.endsin') }}</div>
        <div class="w-2/5 h-auto text-center number-col">
          {{ timediff(syndicateitems.End) }}
        </div>
      </div>
      <badger-accordion v-if="syndicateitems" :icons="false">
        <badger-accordion-item
          v-for="job in syndicateitems.Jobs"
          :key="job.Jobtype"
        >
          <div slot="header" class="grid grid-cols-4 gap-1 px-2">
            <div class="col-span-3 py-2">
              {{ job.Jobtype.split('/').slice(-1)[0] }}
            </div>
            <div class="w-1/5 p-2 text-center number-col">
              {{ job.MinEnemyLevel }}-{{ job.MaxEnemyLevel }}
            </div>
          </div>
          <div slot="content" class="break-all bg-box">
            <div class="grid grid-cols-4 gap-0 px-2">
              <div class="w-full col-span-3 py-2 border-b">
                {{ $tc('tracker.rewards', 2) }}
              </div>
              <div class="w-full py-2 text-center border-b">
                {{ $t('tracker.standing') }}
              </div>
              <div class="w-full h-auto col-span-3 py-1 break-all">
                <span
                  v-for="(reward, index) in job.Rewards"
                  :key="index"
                  :index="index"
                  class="border-b"
                >
                  {{ reward }}<br
                /></span>
              </div>
              <div class="content-center self-stretch w-full py-1 text-center">
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
  @apply bg-box;
  @apply border-gray-600;
  @apply border-b;

  display: block !important;

  &:hover,
  &.-ba-is-active {
    @apply bg-blue-600;
  }
}

.number-col {
  font-family: 'Roboto', sans-serif !important;
}

.dd {
  margin-inline-start: 0 !important;
  margin-inline-end: 0 !important;
}

.dl {
  margin-block-start: 0 !important;
}

.js-badger-accordion-panel-inner {
  cursor: text;

  @apply bg-box;
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
  // eslint-disable-next-line
  props: ['syndicateitems'],
  data() {
    return {
      platinum: 'platinum',
      test: false
    }
  },
  methods: {
    headertext(var1) {
      let x = var1
      x = x.replace('Syndicate', ' ')
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
