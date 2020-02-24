<template>
  <div
    class="max-w-lg md:max-w-md sm:max-w-sm xl:max-w-xl h-auto   overflow-hidden border-transparent"
  >
    <div
      v-if="nightwave && nightwave.DailyChallenges"
      class="font-bold text-primary text-4xl mt-1"
    >
      Nightwave S{{ nightwave.Season - 1 }}
    </div>
    <div class="bg-box text-primary pt-0 ">
      <div v-if="!nightwave" class="text-primary ">
        <div
          class="bg-transparent border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong class="font-bold">No Nightwave active</strong>
        </div>
      </div>
      <template v-if="nightwave && nightwave.DailyChallenges">
        <div
          class="grid grid-cols-2 items-center pl-2 pr-4 py-2 border-b-4 border-gray-600"
        >
          <div class="w-full h-auto ">
            Season {{ nightwave.Season }} {{ $t('test.endsin2') }}
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
              class="pl-2 -pr-4 grid grid-cols-2 items-center"
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
              <div class="flex  items-center border-b border-gray-600">
                <div class="w-full bg-box h-auto pl-2">
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
              class="pl-2 -pr-2 grid grid-cols-2 items-center"
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
              <div class="flex  items-center border-b border-gray-600">
                <div class="w-full bg-box h-auto pl-2">
                  {{ job.Description }}
                </div>
              </div>
            </div>
          </badger-accordion-item>
          <badger-accordion-item
            v-for="job in nightwave.WeeklyEliteChallenges"
            :key="job.ID"
          >
            <div slot="header" class="pl-2 -pr-2 grid grid-cols-2 items-center">
              <div class="w-full">
                {{ job.Title }}
              </div>
              <div class="w-full p-2 text-right number-col">
                {{ timediff(job.Ends) }}
              </div>
            </div>
            <div slot="content" class="break-all">
              <div class="flex  items-center border-b border-gray-600">
                <div class="w-full bg-box h-auto pl-2">
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
