<template>
  <div
    class="max-w-lg md:max-w-md sm:max-w-sm xl:max-w-xl h-auto rounded overflow-hidden border-transparent"
  >
    <div
      class="font-bold text-primary text-4xl px-4 pt-4 bg-transparent sm:px-6"
    >
      {{ headertext }}
    </div>
    <div class="bg-box  py-0">
      <div v-if="!deals" class="text-primary ">
        <div
          class="bg-transparent border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong class="font-bold">No Deals active</strong>
        </div>
      </div>
      <div
        v-else
        class="text-primary grid  grid-cols-8 items-center border-b-4 border-gray-600 py-2 px-2"
      >
        <div class="col-span-2 h-auto">Item</div>
        <div class="col-span-2 h-auto">{{ $t('test.price') }}</div>
        <div class="col-span-2 h-auto">{{ $t('test.stock') }}</div>
        <div class="col-span-2 h-auto">{{ $t('test.endsin') }}</div>
      </div>

      <div
        v-for="item in deals"
        :key="`${item.id}-deal`"
        class="text-primary grid  grid-cols-8 items-center py-2 px-2"
      >
        <div class="col-span-2 h-auto text-md">{{ item.Item }}</div>
        <div
          class="col-span-2 h-auto text-green-800 font-black number-col text-left"
        >
          {{ item.DealPrice }}
        </div>
        <div
          v-if="item.Stock - item.Sold > 0"
          class="col-span-2 h-auto number-col"
        >
          {{ (((item.Stock - item.Sold) / item.Stock) * 100).toFixed(2) }}%
        </div>
        <div v-else class="col-span-2 h-auto font-black">
          Sold Out
        </div>
        <div class="number-col col-span-2">
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
