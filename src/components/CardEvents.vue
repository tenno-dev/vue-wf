<template>
<v-layout justify-center>
  <v-card style="width: 100%;">
    <v-responsive>
      <hr style="height:10px; visibility:hidden;" />
      <p class="headline mb-0 text-xs-center" style="text-align: center!important">Current Active Event</p>
      <v-list dense class="text-xs-center">
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title>Name:</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-list-tile-action-text>
              <v-chip style="right: 0px;" small color="grey" text-color="white">
                {{this.description}}
              </v-chip>
              <br>
            </v-list-tile-action-text>
          </v-list-tile-action>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title>Node / Planet:</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-list-tile-action-text>
              <v-chip style="right: 0px;" small color="grey" text-color="white">
                {{this.node}}
                on
                {{this.planet}}
              </v-chip>
              <br>
            </v-list-tile-action-text>
          </v-list-tile-action>
        </v-list-tile>
        <v-list-tile v-if="events.faction">
          <v-list-tile-content>
            <v-list-tile-title>Fraction:</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-list-tile-action-text>
              <v-chip style="right: 0px;" small color="grey" text-color="white">
                {{events.faction}}
              </v-chip>
              <br>
            </v-list-tile-action-text>
          </v-list-tile-action>
        </v-list-tile>
        <v-list-tile v-if="this.status">
          <v-list-tile-content>
            <v-list-tile-title>Status:</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-list-tile-action-text>
              <v-chip style="right: 0px;" small :color="getcolourhealth(this.status)" text-color="white">
                {{this.status}} % Remaining
              </v-chip>
              <br>
            </v-list-tile-action-text>
          </v-list-tile-action>
        </v-list-tile>
        <v-list-tile v-if="this.timeremain">
          <v-list-tile-content>
            <v-list-tile-title>Time remaining:</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-list-tile-action-text>
              <v-chip style="right: 0px;" small color="grey" text-color="white">
                {{this.timeremain}}
              </v-chip>
              <br>
            </v-list-tile-action-text>
          </v-list-tile-action>
        </v-list-tile>
        <v-list-tile v-if="this.ev.rewards.length != 0">
          <v-list-tile-content>
            <v-list-tile-title>Rewards:</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-list-tile-action-text>
              <v-chip style="right: 0px;" small color="grey" text-color="white">
                {{this.rewarditem}}
                &amp;
                {{this.rewardcredit}} Credits
              </v-chip>
              <br>
            </v-list-tile-action-text>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
      <v-divider v-if="events.jobs" style="margin-left: 144px;margin-right: 144px; max-width: calc(100% - 288px)"/>
      <v-card v-if="events.jobs">
        <hr style="height:10px; visibility:hidden;" />
        <p class="headline mb-0 text-xs-center" style="text-align: center!important">Current Event Jobs</p>
        <hr style="height:10px; visibility:hidden;" />
        <v-expansion-panel>
  <v-expansion-panel-content
    v-for="(item,i) in events.jobs"
    :key="i"
  >
    <div slot="header">Job: {{item.type}}  <br>Enemy Level: {{item.enemyLevels[0]}}-{{item.enemyLevels[1]}}</div>
    <v-card>
      <v-card-text>
        Rewards:<br>
        <span v-for="(reward,y) in item.rewardPool" :key="y">
          <v-chip style="right: 0px;" small color="green" text-color="white">
            {{reward}}
          </v-chip>
        </span><br>
        <hr style="height:10px; visibility:hidden;" />
        Standing Stages:<br>
        <span v-for="(stand,x) in item.standingStages" :key="x">
          <v-chip style="right: 0px;" small color="blue" text-color="white">
            {{stand}}
          </v-chip>        </span>
    </v-card-text>
    </v-card>
  </v-expansion-panel-content>
</v-expansion-panel>

      </v-card>
    </v-responsive>
  </v-card>
</v-layout>
</template>
<style scoped>
.v-chip .v-avatar {
  margin-left: -13px;
}
</style>
<script>
import moment from 'moment';
import 'moment-countdown';
export default {
  props: ['events', 'platform'],
  data() {
    return {
      description: null,
      node: null,
      planet: null,
      faction: null,
      status: null,
      rewarditem: null,
      rewardcredit: null,
      ev: this.$props.events,
      timeremain: null
    }
  },
  methods: {
    planetname: function(prop) {
      return prop.match(/\((.*?)\)/)
    },
    getcolourhealth(prop) {
      var x = null
      if (prop < 50) {
        x = "red"
      } else if (prop > 50 && prop < 100) {
        x = "yellow darken-4"
      } else {
        x = "green"
      }
      return x
    },
    nodename: function(prop) {
      return prop.split(' (')
    },
    formattime: function(prop) {
      var x = prop.days + ' days ' + prop.hours + 'h ' + prop.minutes + 'm ' + prop.seconds + 's'
      return x
    },
    parseData: function() {
      if (this.$props.platform == 'PC') {
        this.faction = this.ev.faction
        this.description = this.ev.description
        this.node = this.nodename(this.ev.victimNode)[0]
        this.planet = this.planetname(this.ev.victimNode)[1]
        this.status = this.ev.health
        this.rewardcredit = this.ev.rewards[0].credits
        this.rewarditem = this.ev.rewards[0].itemString
        this.timeremain = this.formattime(moment().countdown(this.ev.expiry))
      }
      if (this.$props.platform == 'PS4') {
        this.faction = this.ev.faction
        this.description = this.ev.asString.split(" : ")[1].split(" (")[0]
        this.node = this.nodename(this.ev.node)[0]
        this.planet = this.planetname(this.ev.node)[1]
        this.status = null
        this.timeremain = this.formattime(moment().countdown(this.ev.expiry))
      }
      if (this.$props.platform == 'XB1') {
        //console.log('platform is xbox')
        this.faction = this.ev.faction
        this.description = this.ev.asString.split(" : ")[1].split(" (")[0]
        this.node = this.nodename(this.ev.node)[0]
        this.planet = this.planetname(this.ev.node)[1]
        this.status = null
        this.timeremain = this.formattime(moment().countdown(this.ev.expiry))
      }
    },
  },
  mounted() {
    this.ev = this.$props.events
    this.parseData()
  },
  watch: {
    '$props.events': {
      handler: function() {
        this.ev = this.$props.events
        this.parseData()
      }
    }
  },
}
</script>