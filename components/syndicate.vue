<template>
  <div
    class="max-w-lg md:max-w-md sm:max-w-sm xl:max-w-xl h-auto   overflow-hidden border-transparent"
  >
    <div v-if="syndicateitems" class="font-bold text-primary text-4xl mt-1">
      {{ headertext(syndicateitems.Syndicate) }}{{ $t('test.syndicate') }}
    </div>
    <div class="bg-box text-primary pt-0 ">
      <div v-if="!syndicateitems" class="text-primary ">
        <div
          class="bg-transparent border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong class="font-bold">No Jobs today</strong>
        </div>
      </div>
      <div
        v-if="syndicateitems"
        class="flex items-center pl-2 pr-4 py-2 border-b border-gray-600"
      >
        <div class="w-4/5 h-auto ">{{ $t('test.endsin') }}</div>
        <div class="w-1/5 h-auto text-center">
          {{ timediff(syndicateitems.End) }}
        </div>
      </div>
      <badger-accordion v-if="syndicateitems" :icons="false">
        <badger-accordion-item
          v-for="job in syndicateitems.Jobs"
          :key="job.Jobtype"
        >
          <div slot="header" class="pl-2  -pr-2 flex   row items-center">
            <p class="w-4/5">
              {{ job.Jobtype.split('/').slice(-1)[0] }}
            </p>
            <span class="w-1/5 p-2 text-center"
              >{{ job.MinEnemyLevel }}-{{ job.MaxEnemyLevel }}</span
            >
          </div>
          <div slot="content" class="break-all bg-box">
            <div class="px-2 grid grid-cols-2 gap-2">
              <div class="w-full">
                {{ $tc('test.rewards', 2) }}
              </div>
              <div class="w-full  text-center ">
                {{ $t('test.standing') }}
              </div>
              <div class="w-full break-all h-auto">
                <span
                  v-for="(reward, index) in job.Rewards"
                  :key="index"
                  :index="index"
                >
                  {{ reward }}<br
                /></span>
              </div>
              <div class="w-full self-stretch content-center text-center ">
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

.dd {
  margin-inline-start: 0em !important;
  margin-inline-end: 0em !important;
}

.dl {
  margin-block-start: 0em !important;
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
