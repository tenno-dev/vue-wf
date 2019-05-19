<template>
  <div
    class="max-w-lg md:max-w-md sm:max-w-sm h-auto rounded overflow-hidden border-transparent"
  >
    <div class="font-bold text-default text-4xl mt-1">{{ headertext }}</div>
    <div class="bg-gray-500 text-default py-2">
      <div v-if="deals">
        <div class="flex mx-1 items-center">
          <div class="w-1/3 bg-gray-500 h-auto">Item</div>
          <div class="w-1/6 bg-gray-500 h-auto">Price</div>
          <div class="w-1/4 bg-gray-500 h-auto">Stock</div>
          <div class="w-1/4 bg-gray-500 h-auto">Ends in</div>
        </div>
        <div
          v-for="item in deals"
          :key="`${item.id}-deal`"
          class="items-center flex mx-1"
        >
          <div class="w-1/3 bg-gray-500 h-auto text-xs">{{ item.Item }}</div>
          <div class="w-1/6 bg-gray-500 h-auto text-green-800 font-black">
            {{ item.DealPrice }}
          </div>
          <div
            v-if="item.Stock - item.Sold > 0"
            class="w-1/4 bg-gray-500 h-auto"
          >
            {{ (((item.Stock - item.Sold) / item.Stock) * 100).toFixed(2) }}%
          </div>
          <div v-else class="w-1/4 bg-gray-500 h-auto text-red-600 font-black">
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
import moment from "moment";

// import platinum from '@/assets/img/general/plat.png';
export default {
  name: "DarvoDealsPanel",
  props: ["deals"],
  data() {
    return {
      platinum: "platinum"
    };
  },
  computed: {
    headertext() {
      return "Darvo's Deals";
    }
  },
  methods: {
    timediff(var1) {
      var1 = var1 * 1;
      const start = moment(var1);
      // eslint-disable-next-line
      var ms = moment.duration(start.diff(moment().valueOf()));
      // eslint-disable-next-line
      var [days, hours, minutes, seconds] = ' ';
      if (ms.days() * -1 > 0) {
        days = ms.days() * -1 + "d ";
      }
      if (ms.hours() > 0) {
        hours = ms.hours() + "h:";
      }
      if (ms.minutes() > 0) {
        minutes = ms.minutes() + "m:";
      }
      if (ms.seconds() > 0) {
        seconds = ms.seconds() + "s";
      }
      const t = days + hours + minutes + seconds;
      // eslint-disable-next-line
      // console.log(ms) /**/
      // const timespan =

      return t;
    }
  }
};
</script>
