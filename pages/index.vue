<template>
  <div>
    <News v-if="News" class="w-full mx-1 h-64" :news="News" />
    <div class="flex flex-wrap ">
      <Time
        class="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 px-1 h-64"
        :timer="Time1[0]"
      />
      <Alerts
        class="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 px-1 h-64"
        :alerts="Alerts"
      />
      <Syndicate
        class="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 px-1 h-64"
        :syndicateitems="Syndicates[0]"
      />
      <Syndicate
        class="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 px-1 h-64"
        :syndicateitems="Syndicates[1]"
      />
      <Invasions
        class="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 px-1 h-64"
        :invasions="Invasion"
      />
      <BuildP
        class="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 px-1 h-64"
        :progess="Progress1[0]"
      />
      <Sortie
        class="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 px-1 h-64"
        :sortie="Sortie[0]"
      />
      <Darvo
        class="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3 h-64 px-1"
        :deals="Deals"
      />
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import News from '@/components/news.vue'
import Darvo from '@/components/darvo.vue'
import Syndicate from '@/components/syndicate.vue'
import Invasions from '@/components/invasions.vue'
import Alerts from '@/components/alerts.vue'
import BuildP from '@/components/buildprogress.vue'
import Sortie from '@/components/sortie.vue'
import Time from '@/components/time.vue'

export default {
  name: 'Index',
  components: {
    News,
    Darvo,
    Syndicate,
    Invasions,
    Alerts,
    BuildP,
    Sortie,
    Time
  },
  head: {
    title: 'Welcome',
    meta: [{ hid: 'description', name: 'description', content: 'Welcome' }]
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
    activeplat: function() {
      return this.$store.state.activeplatform.short
    },
    activelang1: function() {
      return this.$store.state.activelang.short
    },
    darkmode: function() {
      return this.$store.state.darkmode
    }
  },
  watch: {
    alerts: function(newVal, oldVal) {
      // watch it
      // eslint-disable-next-line
      console.log('Prop changed: ', newVal, ' | was: ', oldVal)
    },
    activeplat: function(newVal, oldVal) {
      // watch platform switch & subscribe to new channels
      // eslint-disable-next-line
      console.log('Prop changed: ', newVal, ' | was: ', oldVal)
      this.$mqtt.unsubscribe(
        'wf/' + this.$store.state.activelang.short + '/' + oldVal + '/alerts'
      )
      this.$mqtt.unsubscribe(
        'wf/' +
          this.$store.state.activelang.short +
          '/' +
          oldVal +
          '/syndicates'
      )
      this.$mqtt.unsubscribe(
        'wf/' + this.$store.state.activelang.short + '/' + oldVal + '/news'
      )
      this.$mqtt.unsubscribe(
        'wf/' + this.$store.state.activelang.short + '/' + oldVal + '/invasions'
      )
      this.$mqtt.unsubscribe(
        'wf/' + this.$store.state.activelang.short + '/' + oldVal + '/sorties'
      )
      this.$mqtt.unsubscribe(
        'wf/' + this.$store.state.activelang.short + '/' + oldVal + '/cycles'
      )
      this.$mqtt.unsubscribe(
        'wf/' + this.$store.state.activelang.short + '/' + oldVal + '/fissures'
      )
      this.$mqtt.unsubscribe(
        'wf/' +
          this.$store.state.activelang.short +
          '/' +
          oldVal +
          '/darvodeals'
      )
      this.$mqtt.unsubscribe(
        'wf/' + this.$store.state.activelang.short + '/' + oldVal + '/events'
      )
      this.$mqtt.unsubscribe(
        'wf/' + this.$store.state.activelang.short + '/' + oldVal + '/progress'
      )
      this.Alerts = ''
      this.News = ''
      this.Syndicates = ''
      this.Invasions = ''
      this.Sortie = ''
      this.Cycles = ''
      this.Fissures = ''
      this.Deals = ''
      this.Events = ''
      this.$mqtt.subscribe(
        'wf/' + this.$store.state.activelang.short + '/' + newVal + '/alerts'
      )
      this.$mqtt.subscribe(
        'wf/' +
          this.$store.state.activelang.short +
          '/' +
          newVal +
          '/syndicates'
      )
      this.$mqtt.subscribe(
        'wf/' + this.$store.state.activelang.short + '/' + newVal + '/invasions'
      )
      this.$mqtt.subscribe(
        'wf/' + this.$store.state.activelang.short + '/' + newVal + '/news'
      )
      this.$mqtt.subscribe(
        'wf/' + this.$store.state.activelang.short + '/' + newVal + '/sorties'
      )
      this.$mqtt.subscribe(
        'wf/' + this.$store.state.activelang.short + '/' + newVal + '/cycles'
      )
      this.$mqtt.subscribe(
        'wf/' + this.$store.state.activelang.short + '/' + newVal + '/fissures'
      )
      this.$mqtt.subscribe(
        'wf/' +
          this.$store.state.activelang.short +
          '/' +
          newVal +
          '/darvodeals'
      )
      this.$mqtt.subscribe(
        'wf/' + this.$store.state.activelang.short + '/' + newVal + '/events'
      )
      this.$mqtt.subscribe(
        'wf/' + this.$store.state.activelang.short + '/' + newVal + '/progress'
      )
    },
    activelang1: function(newVal, oldVal) {
      // watch platform switch & subscribe to new channels
      // eslint-disable-next-line
      console.log('Prop changed: ', newVal, ' | was: ', oldVal)
      this.$mqtt.unsubscribe(
        'wf/' +
          oldVal +
          '/' +
          this.$store.state.activeplatform.short +
          '/alerts'
      )
      this.$mqtt.unsubscribe(
        'wf/' +
          oldVal +
          '/' +
          this.$store.state.activeplatform.short +
          '/syndicates'
      )
      this.$mqtt.unsubscribe(
        'wf/' + oldVal + '/' + this.$store.state.activeplatform.short + '/news'
      )
      this.$mqtt.unsubscribe(
        'wf/' +
          oldVal +
          '/' +
          this.$store.state.activeplatform.short +
          '/invasions'
      )
      this.$mqtt.unsubscribe(
        'wf/' +
          oldVal +
          '/' +
          this.$store.state.activeplatform.short +
          '/sorties'
      )
      this.$mqtt.unsubscribe(
        'wf/' +
          oldVal +
          '/' +
          this.$store.state.activeplatform.short +
          '/cycles'
      )
      this.$mqtt.unsubscribe(
        'wf/' +
          oldVal +
          '/' +
          this.$store.state.activeplatform.short +
          '/fissures'
      )
      this.$mqtt.unsubscribe(
        'wf/' +
          oldVal +
          '/' +
          this.$store.state.activeplatform.short +
          '/darvodeals'
      )
      this.$mqtt.unsubscribe(
        'wf/' +
          oldVal +
          '/' +
          this.$store.state.activeplatform.short +
          '/events'
      )
      this.$mqtt.unsubscribe(
        'wf/' +
          oldVal +
          '/' +
          this.$store.state.activeplatform.short +
          '/progress'
      )
      this.Alerts = ''
      this.News = ''
      this.Syndicates = ''
      this.Invasion = ''
      this.Sortie = ''
      this.Cycles = ''
      this.Fissures = ''
      this.Deals = ''
      this.Events = ''
      this.$mqtt.subscribe(
        'wf/' +
          newVal +
          '/' +
          this.$store.state.activeplatform.short +
          '/alerts'
      )
      this.$mqtt.subscribe(
        'wf/' +
          newVal +
          '/' +
          this.$store.state.activeplatform.short +
          '/syndicates'
      )
      this.$mqtt.subscribe(
        'wf/' +
          newVal +
          '/' +
          this.$store.state.activeplatform.short +
          '/invasions'
      )
      this.$mqtt.subscribe(
        'wf/' + newVal + '/' + this.$store.state.activeplatform.short + '/news'
      )
      this.$mqtt.subscribe(
        'wf/' +
          newVal +
          '/' +
          this.$store.state.activeplatform.short +
          '/sorties'
      )
      this.$mqtt.subscribe(
        'wf/' +
          newVal +
          '/' +
          this.$store.state.activeplatform.short +
          '/cycles'
      )
      this.$mqtt.subscribe(
        'wf/' +
          newVal +
          '/' +
          this.$store.state.activeplatform.short +
          '/fissures'
      )
      this.$mqtt.subscribe(
        'wf/' +
          newVal +
          '/' +
          this.$store.state.activeplatform.short +
          '/darvodeals'
      )
      this.$mqtt.subscribe(
        'wf/' +
          newVal +
          '/' +
          this.$store.state.activeplatform.short +
          '/events'
      )
      this.$mqtt.subscribe(
        'wf/' +
          newVal +
          '/' +
          this.$store.state.activeplatform.short +
          '/progress'
      )
    }
  },
  mqtt: {
    'wf/#/#/alerts'(data) {
      this.Alerts = JSON.parse(data.toString())
    },
    'wf/#/#/news'(data) {
      const x = JSON.parse(data.toString())
      this.News = x.reverse()
    },
    'wf/#/#/syndicates'(data) {
      this.Syndicates = JSON.parse(data.toString())
    },
    'wf/#/#/invasions'(data) {
      this.Invasion = ''
      this.Invasion = JSON.parse(data.toString())
    },
    'wf/#/#/sorties'(data) {
      this.Sortie = JSON.parse(data.toString())
    },
    'wf/#/#/cycles'(data) {
      this.Cycles = JSON.parse(data.toString())
    },
    'wf/#/#/fissures'(data) {
      this.Fissures = JSON.parse(data.toString())
    },
    'wf/#/#/darvodeals'(data) {
      this.Deals = JSON.parse(data.toString())
    },
    'wf/#/#/events'(data) {
      this.Events = JSON.parse(data.toString())
    },
    'wf/#/#/progress'(data) {
      this.Progress1 = JSON.parse(data.toString())
    },
    'wf/#/#/time'(data) {
      this.Time1 = JSON.parse(data.toString())
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
        '/alerts'
    )
    this.$mqtt.subscribe(
      'wf/' +
        this.$store.state.activelang.short +
        '/' +
        this.$store.state.activeplatform.short +
        '/news'
    )
    this.$mqtt.subscribe(
      'wf/' +
        this.$store.state.activelang.short +
        '/' +
        this.$store.state.activeplatform.short +
        '/syndicates'
    )
    this.$mqtt.subscribe(
      'wf/' +
        this.$store.state.activelang.short +
        '/' +
        this.$store.state.activeplatform.short +
        '/invasions'
    )
    this.$mqtt.subscribe(
      'wf/' +
        this.$store.state.activelang.short +
        '/' +
        this.$store.state.activeplatform.short +
        '/sorties'
    )
    this.$mqtt.subscribe(
      'wf/' +
        this.$store.state.activelang.short +
        '/' +
        this.$store.state.activeplatform.short +
        '/cycles'
    )
    this.$mqtt.subscribe(
      'wf/' +
        this.$store.state.activelang.short +
        '/' +
        this.$store.state.activeplatform.short +
        '/fissures'
    )
    this.$mqtt.subscribe(
      'wf/' +
        this.$store.state.activelang.short +
        '/' +
        this.$store.state.activeplatform.short +
        '/darvodeals'
    )
    this.$mqtt.subscribe(
      'wf/' +
        this.$store.state.activelang.short +
        '/' +
        this.$store.state.activeplatform.short +
        '/events'
    )
    this.$mqtt.subscribe(
      'wf/' +
        this.$store.state.activelang.short +
        '/' +
        this.$store.state.activeplatform.short +
        '/progress'
    )
    this.$mqtt.subscribe(
      'wf/' +
        this.$store.state.activelang.short +
        '/' +
        this.$store.state.activeplatform.short +
        '/time'
    )
  },
  methods: {
    formattime2: function(prop) {
      prop = prop / 1
      const x = moment(prop).format('DD[.]MM[.]YYYY')
      // const x = moment(prop).fromNow()
      return x
    }
  }
}
</script>
