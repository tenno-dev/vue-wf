<template>
  <div>
    <News v-if="News" class="w-full xl:px-2 px-1 min-h-full" :news="News" />
  </div>
</template>

<script>
import News from '@/components/news.vue'
// eslint-disable-next-line import/order
import moment from 'moment'

export default {
  name: 'Index',
  components: {
    News
  },
  data() {
    return {
      tstamp: '0',
      platform: this.$store.state.activeplatform.short,
      Alerts: '',
      News: '',
      Syndicates: '',
      Invasion: '',
      Sortie: '',
      Cycles: '',
      Fissures: '',
      Progress1: '',
      Deals: '',
      Time1: '',
      Events: '',
      syndics: ['Solaris United', 'Ostron'],
      time1: moment().unix(),
      error: 0,
      teststroe: this.$mqtt,
      test2: [],
      synload: false
    }
  },
  computed: {
    activeplat() {
      return this.$store.state.activeplatform.short
    },
    activelang1() {
      return this.$store.state.activelang.short
    },
    darkmode() {
      return this.$store.state.darkmode
    }
  },
  watch: {
    alerts(newVal, oldVal) {
      // watch it
      // eslint-disable-next-line
      console.log('Prop changed: ', newVal, ' | was: ', oldVal)
    },
    activeplat(newVal, oldVal) {
      // watch platform switch & subscribe to new channels
      // eslint-disable-next-line
      console.log('Prop changed: ', newVal, ' | was: ', oldVal)
      this.$mqtt.unsubscribe(
        'wf/' + this.$store.state.activelang.short + '/' + oldVal + '/news'
      )
      this.News = ''
      this.$mqtt.subscribe(
        'wf/' + this.$store.state.activelang.short + '/' + newVal + '/news'
      )
    },
    activelang1(newVal, oldVal) {
      // watch platform switch & subscribe to new channels
      // eslint-disable-next-line
      console.log('Prop changed: ', newVal, ' | was: ', oldVal)
      this.$mqtt.unsubscribe(
        'wf/' + oldVal + '/' + this.$store.state.activeplatform.short + '/news'
      )
      this.News = ''
      this.$mqtt.subscribe(
        'wf/' + newVal + '/' + this.$store.state.activeplatform.short + '/news'
      )
    }
  },
  mounted() {
    // eslint-disable-next-line
    console.log(this.$i18n)
    this.$i18n.locale = this.$store.state.activelang.short
    this.$mqtt.subscribe(
      'wf/' +
        this.$store.state.activelang.short +
        '/' +
        this.$store.state.activeplatform.short +
        '/news'
    )
  },
  methods: {
    formattime2(prop) {
      prop = prop / 1
      const x = moment(prop).format('DD[.]MM[.]YYYY')
      // const x = moment(prop).fromNow()
      return x
    }
  },
  mqtt: {
    'wf/#/#/news'(data) {
      const x = JSON.parse(data.toString())
      this.News = x.reverse()
    }
  }
}
</script>
