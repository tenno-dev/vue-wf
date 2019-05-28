<template>
  <div
    class="max-w-lg md:max-w-md sm:max-w-sm h-auto rounded overflow-hidden border-transparent"
  >
    <div class="font-bold text-primary text-4xl mt-1 bg-transparent">
      {{ headertext }}
    </div>
    <div class="bg-box  py-2">
      <div v-if="deals" class="text-primary ">
        <div class="flex mx-1 items-center border-b border-gray-600">
          <div class="w-5/12 h-auto">Item</div>
          <div class="w-2/12 h-auto">Price</div>
          <div class="w-2/12 h-auto">Stock</div>
          <div class="w-2/12 h-auto">Ends in</div>
        </div>
        <div
          v-for="item in deals"
          :key="`${item.id}-deal`"
          class="items-center flex mx-1"
        >
          <div class="w-5/12 h-auto text-xs">{{ item.Item }}</div>
          <div class="w-2/12 h-auto text-green-800 font-black">
            {{ item.DealPrice }}
          </div>
          <div v-if="item.Stock - item.Sold > 0" class="w-2/12 h-auto">
            {{ (((item.Stock - item.Sold) / item.Stock) * 100).toFixed(2) }}%
          </div>
          <div v-else class="w-2/12 h-auto text-red-600 font-black">
            Sold Out
          </div>
          {{ timediff(item.Ends) }}
        </div>
      </div>
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
