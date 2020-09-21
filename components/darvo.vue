<template>
  <div
    class="h-auto max-w-lg overflow-hidden border-transparent rounded md:max-w-md sm:max-w-sm xl:max-w-xl"
  >
    <div
      class="px-4 pt-4 text-4xl font-bold bg-transparent text-primary sm:px-6"
    >
      {{ headertext }}
    </div>
    <div class="py-0 bg-box">
      <div v-if="!deals" class="text-primary">
        <div
          class="relative px-4 py-3 text-red-700 bg-transparent border border-red-400 rounded"
          role="alert"
        >
          <strong class="font-bold">No Deals active</strong>
        </div>
      </div>
      <div
        v-else
        class="grid items-center grid-cols-8 px-2 py-2 border-b-4 border-gray-600 text-primary"
      >
        <div class="h-auto col-span-2">Item</div>
        <div class="h-auto col-span-2">{{ $t('tracker.price') }}</div>
        <div class="h-auto col-span-2">{{ $t('tracker.stock') }}</div>
        <div class="h-auto col-span-2">{{ $t('tracker.endsin') }}</div>
      </div>

      <div
        v-for="item in deals"
        :key="`${item.id}-deal`"
        class="grid items-center grid-cols-8 px-2 py-2 text-primary"
      >
        <div class="h-auto col-span-2 text-md">{{ item.Item }}</div>
        <div
          class="h-auto col-span-2 font-black text-left text-green-800 number-col"
        >
          {{ item.DealPrice }}
        </div>
        <div
          v-if="item.Stock - item.Sold > 0"
          class="h-auto col-span-2 number-col"
        >
          {{ (((item.Stock - item.Sold) / item.Stock) * 100).toFixed(2) }}%
        </div>
        <div v-else class="h-auto col-span-2 font-black">Sold Out</div>
        <div class="col-span-2 number-col">
          {{ timediff(item.Ends) }}
        </div>
        <!---->
      </div>
    </div>
  </div>
</template>

<style scoped>
.number-col {
  font-family: 'Roboto', sans-serif !important;
}
</style>

<script>
import moment from 'moment'

export default {
  name: 'DarvoDealsPanel',
  // eslint-disable-next-line
  props: ['deals'],
  data() {
    return {
      platinum: 'platinum'
    }
  },
  computed: {
    headertext() {
      return "Darvo's Deals"
    }
  },
  methods: {
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
