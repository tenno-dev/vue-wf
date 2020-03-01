<template>
  <div>
    <News v-if="News" class="w-full xl:px-2 px-1 h-64" :news="News" />
    <div class="flex flex-wrap xl:px-1">
      <Time
        class="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 px-1 h-64"
        :timer="Time1[0]"
      />
      <Kuva
        class="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 px-1 h-64"
        :kuva="Kuva"
      />
      <Arbitration
        class="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 px-1 h-64"
        :arbitration="Arbitration"
      />
      <Anomaly
        class="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 px-1 h-64"
        :anomaly="Anomaly[0]"
      />
      <Alerts
        class="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 px-1 h-64"
        :alerts="Alerts"
      />
      <Nightwave
        class="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 px-1 h-64"
        :nightwave="Nightwave[0]"
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
        class="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 px-1 h-64"
        :deals="Deals"
      />
    </div>
  </div>
</template>

<script>
import News from '@/components/news.vue'
import Time from '@/components/time.vue'
import Darvo from '@/components/darvo.vue'
import Nightwave from '@/components/nightwave.vue'
import Syndicate from '@/components/syndicate.vue'
import Invasions from '@/components/invasions.vue'
import Alerts from '@/components/alerts.vue'
import BuildP from '@/components/buildprogress.vue'
import Sortie from '@/components/sortie.vue'
import Kuva from '@/components/kuva.vue'
import Arbitration from '@/components/arbitration.vue'
import Anomaly from '@/components/anomaly.vue'

// eslint-disable-next-line import/order
import moment from 'moment'

export default {
  name: 'Index',
  components: {
    News,
    Darvo,
    Nightwave,
    Syndicate,
    Invasions,
    Alerts,
    BuildP,
    Sortie,
    Time,
    Kuva,
    Arbitration,
    Anomaly
  },
  data() {
    return {
      tstamp: '0',
      defaultplatform: { short: 'pc', label: 'PC', icon: ['fas', 'desktop'] },
      defaultlang: { short: 'en', label: 'English' },
      defaulttheme: { short: 'theme-normal', label: 'Default' },
      platform: this.$store.state.activeplatform.short,
      Alerts: '',
      Anomaly: '',
      News: '',
      Syndicates: '',
      Invasion: '',
      Nightwave: '',
      Sortie: '',
      Cycles: '',
      Fissures: '',
      Progress1: '',
      Deals: '',
      Time1: '',
      Events: '',
      Kuva: '',
      Arbitration: '',
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
    },
    activeplat(newVal, oldVal) {
      // watch platform switch & subscribe to new channels
      this.$mqtt.unsubscribe(
        'wf/' + this.$store.state.activelang.short + '/' + oldVal + '/alerts'
      )
      this.$mqtt.unsubscribe(
        'wf/' + this.$store.state.activelang.short + '/' + oldVal + '/nightwave'
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
      this.$mqtt.unsubscribe(
        'wf/' + this.$store.state.activelang.short + '/' + oldVal + '/kuva'
      )
      this.$mqtt.unsubscribe(
        'wf/' +
          this.$store.state.activelang.short +
          '/' +
          oldVal +
          '/arbitration'
      )
      this.$mqtt.unsubscribe(
        'wf/' + this.$store.state.activelang.short + '/' + oldVal + '/anomaly'
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
      this.Kuva = ''
      this.Arbitration = ''
      this.Anomaly = ''
      this.$mqtt.subscribe(
        'wf/' + this.$store.state.activelang.short + '/' + newVal + '/alerts'
      )
      this.$mqtt.subscribe(
        'wf/' + this.$store.state.activelang.short + '/' + newVal + '/nightwave'
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
      this.$mqtt.subscribe(
        'wf/' + this.$store.state.activelang.short + '/' + newVal + '/kuva'
      )
      this.$mqtt.subscribe(
        'wf/' +
          this.$store.state.activelang.short +
          '/' +
          newVal +
          '/arbitration'
      )
      this.$mqtt.subscribe(
        'wf/' + this.$store.state.activelang.short + '/' + newVal + '/anomaly'
      )
    },
    activelang1(newVal, oldVal) {
      // watch platform switch & subscribe to new channels
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
          '/nightwave'
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
      this.$mqtt.unsubscribe(
        'wf/' + oldVal + '/' + this.$store.state.activeplatform.short + '/kuva'
      )
      this.$mqtt.unsubscribe(
        'wf/' +
          oldVal +
          '/' +
          this.$store.state.activeplatform.short +
          '/arbitration'
      )
      this.$mqtt.unsubscribe(
        'wf/' +
          oldVal +
          '/' +
          this.$store.state.activeplatform.short +
          '/anomaly'
      )
      this.Alerts = ''
      this.News = ''
      this.Syndicates = ''
      this.Invasion = ''
      this.Sortie = ''
      this.Cycles = ''
      this.Fissures = ''
      this.Nightwave = ''
      this.Deals = ''
      this.Events = ''
      this.Kuva = ''
      this.Arbitration = ''
      this.Anomaly = ''
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
          '/nightwave'
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
      this.$mqtt.subscribe(
        'wf/' + newVal + '/' + this.$store.state.activeplatform.short + '/kuva'
      )
      this.$mqtt.subscribe(
        'wf/' +
          newVal +
          '/' +
          this.$store.state.activeplatform.short +
          '/arbitration'
      )
      this.$mqtt.subscribe(
        'wf/' +
          newVal +
          '/' +
          this.$store.state.activeplatform.short +
          '/anomaly'
      )
    }
  },
  mounted() {
    this.checkplatform()
    this.checklang()
    this.checktheme()
    // eslint-disable-next-line no-console
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
        '/nightwave'
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
    this.$mqtt.subscribe(
      'wf/' +
        this.$store.state.activelang.short +
        '/' +
        this.$store.state.activeplatform.short +
        '/kuva'
    )
    this.$mqtt.subscribe(
      'wf/' +
        this.$store.state.activelang.short +
        '/' +
        this.$store.state.activeplatform.short +
        '/arbitration'
    )
    this.$mqtt.subscribe(
      'wf/' +
        this.$store.state.activelang.short +
        '/' +
        this.$store.state.activeplatform.short +
        '/anomaly'
    )
  },
  methods: {
    formattime2(prop) {
      prop = prop / 1
      const x = moment(prop).format('DD[.]MM[.]YYYY')
      // const x = moment(prop).fromNow()
      return x
    },
    checkplatform() {
      let x = this.$warehouse.get('platform')
      try {
        x = x.short
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(this.defaultplatform)
        this.$warehouse.set('platform', this.defaultplatform)
      }
      x = this.$warehouse.get('platform')
      // eslint-disable-next-line no-console
      console.log(x)
      this.$store.commit('setplatform', x)
    },
    checklang() {
      // eslint-disable-next-line no-console
      let y = this.$warehouse.get('lang')
      try {
        // eslint-disable-next-line no-console
        console.log(y)

        y = y.short
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log('default2')
        // eslint-disable-next-line no-console
        console.log(this.defaultlang)
        this.$warehouse.set('lang', this.defaultlang)
      }
      y = this.$warehouse.get('lang')
      // eslint-disable-next-line no-console
      console.log(y)
      this.$store.commit('setlang', y)
    },
    checktheme() {
      // eslint-disable-next-line no-console
      let y = this.$warehouse.get('theme')
      try {
        // eslint-disable-next-line no-console
        console.log(y)

        y = y.short
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log('default2')
        // eslint-disable-next-line no-console
        console.log(this.defaulttheme)
        this.$warehouse.set('theme', this.defaulttheme)
      }
      y = this.$warehouse.get('theme')
      // eslint-disable-next-line no-console
      console.log(y)
      this.$store.commit('settheme', y)
    }
  },
  mqtt: {
    'wf/#/#/alerts'(data) {
      this.Alerts = JSON.parse(data.toString())
    },
    'wf/#/#/nightwave'(data) {
      this.Nightwave = JSON.parse(data.toString())
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
    },
    'wf/#/#/kuva'(data) {
      this.Kuva = JSON.parse(data.toString())
    },
    'wf/#/#/arbitration'(data) {
      this.Arbitration = JSON.parse(data.toString())
    },
    'wf/#/#/anomaly'(data) {
      this.Anomaly = JSON.parse(data.toString())
    }
  }
}
</script>
