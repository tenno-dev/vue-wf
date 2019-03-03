<!-- eslint-disable vue/html-closing-bracket-spacing -->
<template>
  <v-container style="width:100%;" fluid grid-list-md>
    <v-layout align-start justify-start row fill-height :wrap="true">
      <v-flex xs12 md4 lg3>
        <div v-if="Object.keys(Alerts).length !== 0">
          <CardAlerts :alerts="Alerts"/>
        </div>
      </v-flex>
      <v-flex xs12 md4 lg3>
        <div v-if="Object.keys(News).length !== 0">
          <CardNews :news="News" :dark="this.$props.dark1"/>
        </div>
      </v-flex>
      <v-flex xs12 md4 lg3>
        <!-- <div>
          <CardDailyReset :dark="this.$props.dark1"/>
        </div>-->
        <div v-if="Object.keys(Deals).length !== 0 ">
          <CardDarvoDeals :deals="Deals[0]" :dark="this.$props.dark1"/>
        </div>
      </v-flex>
      <v-flex xs12 md4 lg3>
        <div v-if="Object.keys(Cycles).length !== 0 ">
          <CardDayNight
            :cycle="Cycles"
            :platform="this.$store.state.activeplatform"
            :dark="this.$props.dark1"
          />
        </div>
      </v-flex>
      <br>
      <v-flex xs12 md4 lg3>
        <div v-if="Object.keys(Syndicates).length !== 0 ">
          <CardSyndicate :syndicates="Syndicates" :syndics="syndics" :dark="$props.dark1"/>
        </div>
      </v-flex>
      <v-flex xs12 md4 lg3>
        <div v-if="Object.keys(Sortie).length !== 0">
          <CardSortie :sortie="Sortie[0]" :platform="this.$store.state.activeplatform"/>
        </div>
      </v-flex>
      <v-flex xs12 md4 lg3>
        <div v-if="Object.keys(Fissures).length !== 0 ">
          <CardVoidFissures :fissures="Fissures" :platform="this.$store.state.activeplatform"/>
        </div>
      </v-flex>
      <v-flex xs12 md4 lg3>
        <div v-if="Object.keys(Invasions).length !== 0">
          <CardInvasions :invasions="Invasions" :platform="this.$store.state.activeplatform"/>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
/* eslint-disable vue/require-prop-types */
// @ is an alias to /src.
import moment from 'moment'
import CardAlerts from '@/components/CardAlerts.vue'
import CardNews from '@/components/CardNews.vue'
import CardSyndicate from '@/components/CardSyndicate.vue'
// import CardDailyReset from '@/components/CardDailyReset.vue'
import CardDayNight from '@/components/CardDayNight.vue'
import CardDarvoDeals from '@/components/CardDarvoDeals.vue'
import CardSortie from '@/components/CardSortie.vue'
import CardVoidFissures from '@/components/CardVoidFissures.vue'
import CardInvasions from '@/components/CardInvasions.vue'

// eslint-disable-next-line
let _ = require('lodash')

export default {
  name: 'Home',
  components: {
    CardAlerts,
    CardNews,
    CardSyndicate,
    // CardDailyReset,
    CardDayNight,
    CardDarvoDeals,
    CardSortie,
    CardVoidFissures,
    CardInvasions
  },
  props: ['test', 'dark1'],
  data() {
    return {
      tstamp: '0',
      platform: this.$store.state.activeplatform,
      Alerts: '',
      News: '',
      Syndicates: '',
      Invasions: '',
      Sortie: '',
      Cycles: '',
      Fissures: '',
      Deals: '',
      Events: '',
      syndics: ['Ostron', 'Solaris United'],
      time1: moment().unix(),
      error: 0,
      teststroe: this.$mqtt,
      test2: [],
      test3: this.$vuetify.breakpoint,
      synload: false
    }
  },
  computed: {
    myObjVals: function() {
      return this.$store.state.activeplatform
    }
  },
  watch: {
    alerts: function(newVal, oldVal) {
      // watch it
      // eslint-disable-next-line
      console.log('Prop changed: ', newVal, ' | was: ', oldVal)
    },
    myObjVals: function(newVal, oldVal) {
      // watch platform switch & subscribe to new channels
      // eslint-disable-next-line
      console.log('Prop changed: ', newVal, ' | was: ', oldVal)
      this.$mqtt.unsubscribe('/wf/' + oldVal + '/alerts')
      this.$mqtt.unsubscribe('/wf/' + oldVal + '/syndicates')
      this.$mqtt.unsubscribe('/wf/' + oldVal + '/news')
      this.$mqtt.unsubscribe('/wf/' + oldVal + '/invasions')
      this.$mqtt.unsubscribe('/wf/' + oldVal + '/sorties')
      this.$mqtt.unsubscribe('/wf/' + oldVal + '/cycles')
      this.$mqtt.unsubscribe('/wf/' + oldVal + '/fissures')
      this.$mqtt.unsubscribe('/wf/' + oldVal + '/darvodeals')
      this.$mqtt.unsubscribe('/wf/' + oldVal + '/events')
      this.Alerts = ''
      this.News = ''
      this.Syndicates = ''
      this.Invasions = ''
      this.Sortie = ''
      this.Cycles = ''
      this.Fissures = ''
      this.Deals = ''
      this.Events = ''
      this.$mqtt.subscribe('/wf/' + newVal + '/alerts')
      this.$mqtt.subscribe('/wf/' + newVal + '/syndicates')
      this.$mqtt.subscribe('/wf/' + newVal + '/invasions')
      this.$mqtt.subscribe('/wf/' + newVal + '/news')
      this.$mqtt.subscribe('/wf/' + newVal + '/sorties')
      this.$mqtt.subscribe('/wf/' + newVal + '/cycles')
      this.$mqtt.subscribe('/wf/' + newVal + '/fissures')
      this.$mqtt.subscribe('/wf/' + newVal + '/darvodeals')
      this.$mqtt.subscribe('/wf/' + newVal + '/events')
    }
  },
  mqtt: {
    '/wf/#/alerts'(data) {
      this.Alerts = JSON.parse(data.toString())
    },
    '/wf/#/news'(data) {
      // eslint-disable-next-line no-console
      console.log('test')
      this.News = JSON.parse(data.toString())
    },
    '/wf/#/syndicates'(data) {
      this.Syndicates = JSON.parse(data.toString())
    },
    '/wf/#/invasions'(data) {
      this.Invasions = JSON.parse(data.toString())
    },
    '/wf/#/sorties'(data) {
      this.Sortie = JSON.parse(data.toString())
    },
    '/wf/#/cycles'(data) {
      this.Cycles = JSON.parse(data.toString())
    },
    '/wf/#/fissures'(data) {
      this.Fissures = JSON.parse(data.toString())
    },
    '/wf/#/darvodeals'(data) {
      this.Deals = JSON.parse(data.toString())
    },
    '/wf/#/events'(data) {
      this.Events = JSON.parse(data.toString())
    }
  },
  mounted() {
    // eslint-disable-next-line no-console
    console.log('test')
    this.$mqtt.subscribe('/wf/' + this.$store.state.activeplatform + '/alerts')
    this.$mqtt.subscribe('/wf/' + this.$store.state.activeplatform + '/news')
    this.$mqtt.subscribe(
      '/wf/' + this.$store.state.activeplatform + '/syndicates'
    )
    this.$mqtt.subscribe(
      '/wf/' + this.$store.state.activeplatform + '/invasions'
    )
    this.$mqtt.subscribe('/wf/' + this.$store.state.activeplatform + '/sorties')
    this.$mqtt.subscribe('/wf/' + this.$store.state.activeplatform + '/cycles')
    this.$mqtt.subscribe(
      '/wf/' + this.$store.state.activeplatform + '/fissures'
    )
    this.$mqtt.subscribe(
      '/wf/' + this.$store.state.activeplatform + '/darvodeals'
    )
    this.$mqtt.subscribe('/wf/' + this.$store.state.activeplatform + '/events')
  }
}
</script>
