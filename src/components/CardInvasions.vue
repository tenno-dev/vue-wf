<template>
<v-card style="width: 100%;">
  <v-responsive >
    <hr style="height:10px; visibility:hidden;" />
    <p class="headline mb-0 text-xs-center" style="text-align: center!important">Current Ongoing Invasions</p>
    <v-expansion-panel >
      <v-expansion-panel-content v-for="item in this.$props.invasions" :key="item.id">
        <div slot="header">
          <span :style="{color : getcolourfaction(item.attackingFaction)}"> {{item.attackingFaction}}</span> vs
          <span :style="{color : getcolourfaction(item.defendingFaction)}">{{item.defendingFaction}}</span> on {{nodename(item.node)[0 ]}}({{planetname(item.node)[1]}})
          <br>Attack Status: ~{{parseFloat(item.completion).toFixed(0)}} % completed
        </div>
<v-card flat>
    <v-list  dense class="text-xs-center">
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>Location:</v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-list-tile-action-text>
              <v-chip  style="right: 0px;" small color="grey" text-color="white">
              {{nodename(item.node)[0 ]}} on {{planetname(item.node)[1]}}
              </v-chip>
            <br>
          </v-list-tile-action-text>
        </v-list-tile-action>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>Attacker:</v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-list-tile-action-text>
              <v-chip  style="right: 0px;" small :color="getcolourfaction(item.attackingFaction)" text-color="white">
              {{item.attackingFaction}}
              </v-chip>
            <br>
          </v-list-tile-action-text>
        </v-list-tile-action>
      </v-list-tile>
      <v-list-tile v-if="item.attackerRewardItem !== 'none'">
        <v-list-tile-content>
          <v-list-tile-title>Attacker Reward Items:</v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-action >
          <v-list-tile-action-text>
              <v-chip  style="right: 0px;" small color="red" text-color="white">
              {{item.attackerRewardCount}} x {{item.attackerRewardItem}}
              </v-chip>
          </v-list-tile-action-text>
        </v-list-tile-action>
      </v-list-tile>
      <v-list-tile v-if="item.attackerRewardCredits > 0">
        <v-list-tile-content>
          <v-list-tile-title>Attacker Reward Credits:</v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-list-tile-action-text>
              <v-chip  style="right: 0px;" small color="red" text-color="white">
              {{item.attackerRewardCredits}} Credits
              </v-chip>
          </v-list-tile-action-text>
        </v-list-tile-action>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>Defender:</v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-list-tile-action-text>
              <v-chip  style="right: 0px;" small  :color="getcolourfaction(item.defendingFaction)" text-color="white">
              {{item.defendingFaction}}
              </v-chip>
            <br>
          </v-list-tile-action-text>
        </v-list-tile-action>
      </v-list-tile>
      <v-list-tile v-if="item.defenderRewardItem != 'none'">
        <v-list-tile-content>
          <v-list-tile-title>Def. Reward Items:</v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-list-tile-action-text>
              <v-chip  style="right: 0px;" small :color="getcolourfaction(item.defendingFaction)" text-color="white">
              {{item.defenderRewardCount}} {{item.defenderRewardItem}}
              </v-chip>
          </v-list-tile-action-text>
        </v-list-tile-action>
      </v-list-tile>
      <v-list-tile v-if="item.defenderRewardCredits > 0">
        <v-list-tile-content>
          <v-list-tile-title>Def. Reward Credits:</v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-list-tile-action-text>
              <v-chip  style="right: 0px;" small :color="getcolourfaction(item.defendingFaction)" text-color="white">
              {{item.defenderRewardCredits}} Credits
              </v-chip>
          </v-list-tile-action-text>
        </v-list-tile-action>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>Attacking Status:<v-progress-linear height="15" value="81"></v-progress-linear></v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-tooltip top>
          <v-progress-linear
          slot="activator"
          style="width:180px"
             :value="item.completion"
             :height="15"
             :background-color="getcolourfaction(item.defendingFaction)"
             :color="getcolourfaction(item.attackingFaction)"
           ></v-progress-linear>
           <span>{{parseFloat(item.completion).toFixed(2)}} %</span>
         </v-tooltip>
        </v-list-tile-action>
      </v-list-tile>
    </v-list><br>
    </v-card>
  </v-expansion-panel-content>
</v-expansion-panel>
  </v-responsive>
</v-card>
</template>
<style scoped>
.v-chip .v-avatar {
  margin-left: -13px;
}

.v-chip {
  margin: 3px;
}
</style>
<script>
import moment from 'moment';
export default {
  props: ['invasions'],
  data() {
    return {
      timeremain: null,
      start: null
    }
  },
  methods: {
    getcolourfaction(prop) {
      var x = null
      if (prop == 'Grineer') {
        x = "red"
      } else if (prop == 'Corpus') {
        x = "blue"
      } else if (prop == 'Infested'){
        x = "green"
      } else {
        x = "white"
      }
      return x
    },
    formattime2: function(prop) {
      var x = moment(prop).format('dd[, ]DD[.]MMM YYYY HH:mm')
      return x
    },
    roundnumber: function(prop) {
      var x = Math.round(prop,2)
      return x
    },
    formattime: function(prop) {
      var x = prop.hours + 'h ' + prop.minutes + 'm ' + prop.seconds + 's'
      return x
    },
    planetname: function(prop) {
      return prop.match(/\((.*?)\)/)
    },
    nodename: function(prop) {
      return prop.split(' (')
    },
  },
  mounted() {
  }
};
</script>