<template>
  <div
    class="h-auto max-w-lg overflow-hidden border-transparent md:max-w-md sm:max-w-sm xl:max-w-xl"
  >
    <div
      v-if="nightwave && nightwave.DailyChallenges"
      class="px-4 pt-4 text-4xl font-bold bg-transparent text-primary sm:px-6"
    >
      Nightwave S{{ nightwave.Season - 1 }}
    </div>
    <div class="pt-0 bg-box text-primary ">
      <div v-if="!nightwave" class="text-primary ">
        <div
          class="relative px-4 py-3 text-red-700 bg-transparent border border-red-400 rounded"
          role="alert"
        >
          <strong class="font-bold">No Nightwave active</strong>
        </div>
      </div>
      <template v-if="nightwave && nightwave.DailyChallenges">
        <div
          class="grid items-center grid-cols-2 py-2 pl-2 pr-4 border-b-4 border-gray-600"
        >
          <div class="w-full h-auto ">
            Season {{ nightwave.Season }} {{ $t('tracker.endsin2') }}
          </div>
          <span class="w-full h-auto text-right number-col">
            {{ timediff(nightwave.Ends) }}
          </span>
        </div>
        <badger-accordion
          v-if="nightwave && nightwave.DailyChallenges"
          :icons="false"
        >
          <badger-accordion-item
            v-for="job in nightwave.DailyChallenges"
            :key="job.ID"
          >
            <div
              slot="header"
              class="grid items-center grid-cols-2 pl-2 -pr-4"
              style="padding-right: -0, 75rem;"
            >
              <div class="w-full">
                {{ job.Title }}
              </div>
              <div class="w-full p-2 text-right number-col">
                {{ timediff(job.Ends) }}
              </div>
            </div>
            <div slot="content" class="break-all">
              <div class="flex items-center border-b border-gray-600">
                <div class="w-full h-auto py-2 pl-2 bg-box">
                  {{ job.Description }}
                </div>
              </div>
            </div>
          </badger-accordion-item>
          <badger-accordion-item
            v-for="job in nightwave.WeeklyChallenges"
            :key="job.ID"
          >
            <div
              slot="header"
              class="grid items-center grid-cols-2 pl-2 -pr-2"
              style="padding-right: -0, 75rem;"
            >
              <div class="w-full">
                {{ job.Title }}
              </div>
              <div class="w-full p-2 text-right number-col">
                {{ timediff(job.Ends) }}
              </div>
            </div>
            <div slot="content" class="break-all">
              <div class="flex items-center border-b border-gray-600">
                <div class="w-full h-auto py-2 pl-2 bg-box">
                  {{ job.Description }}
                </div>
              </div>
            </div>
          </badger-accordion-item>
          <badger-accordion-item
            v-for="job in nightwave.WeeklyEliteChallenges"
            :key="job.ID"
          >
            <div slot="header" class="grid items-center grid-cols-2 pl-2 -pr-2">
              <div class="w-full">
                {{ job.Title }}
              </div>
              <div class="w-full p-2 text-right number-col">
                {{ timediff(job.Ends) }}
              </div>
            </div>
            <div slot="content" class="break-all">
              <div class="flex items-center border-b border-gray-600">
                <div class="w-full h-auto py-2 pl-2 bg-box">
                  {{ job.Description }}
                </div>
              </div>
            </div>
          </badger-accordion-item>
        </badger-accordion>
      </template>
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
  name: 'NightwavePanel',
  // eslint-disable-next-line
  props: ['nightwave'],
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
      // eslint-disable-next-line
      var ms = moment.duration(moment.unix(var1).diff(moment()))

      let days = ''
      let hours = ''
      let minutes = ' '
      if (ms.days() * 1 > 0) {
        days = ms.days() * 1 + 'd '
      }
      if (ms.hours() > 0) {
        hours = ms.hours() + 'h:'
      }
      if (ms.minutes() > 0) {
        minutes = ms.minutes() + 'm'
      }
      const t = days + hours + minutes
      return t
    }
  }
}
</script>
