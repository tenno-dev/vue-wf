<template>
  <div
    v-if="syndicateitems"
    class="max-w-lg md:max-w-md sm:max-w-sm h-auto rounded overflow-hidden border-transparent"
  >
    <div class="font-bold text-default text-4xl mt-1">
      {{ headertext(syndicateitems.Syndicate) }}
    </div>
    <div class="bg-gray-500 text-default py-2">
      <div>test</div>
      <badger-accordion :icons="false">
        <badger-accordion-item
          v-for="job in syndicateitems.Jobs"
          :key="job.Jobtype"
        >
          <div slot="header">{{ job.Jobtype.split('/').slice(-1)[0] }}</div>
          <div slot="content" class="break-all px-5">{{ job }}</div>
        </badger-accordion-item>
      </badger-accordion>
    </div>
  </div>
</template>

<style lang="scss">
.js-badger-accordion-header {
  @apply bg-gray-600;
  &:hover,
  &.-ba-is-active {
    @apply bg-blue-600;
  }
}

.js-badger-accordion-panel-inner {
  // @apply p-4;
  cursor: text;
  @apply bg-gray-400;
}

.badger-accordion-toggle {
  @apply px-6;
  @apply py-3;
}

.badger-accordion__panel {
  max-height: 75vh !important;
  transition: max-height ease-in-out 0.5s;
  overflow: hidden;
  &.-ba-is-hidden {
    max-height: 0 !important;
  }
  // transition is added via `badger-accordion--initalised` to stop animation on initalition
  .badger-accordion--initalised & {
    transition: max-height ease-in-out 0.2s;
  }
}
</style>

<script>
import moment from 'moment'

// import platinum from '@/assets/img/general/plat.png';
export default {
  name: 'DarvoDealsPanel',
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
      var [days, hours, minutes, seconds] = ' '
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
      // eslint-disable-next-line
      // console.log(ms) /**/
      // const timespan =

      return t
    }
  }
}
</script>
