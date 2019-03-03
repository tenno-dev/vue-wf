<!-- eslint-disable vue/mustache-interpolation-spacing -->
<!-- eslint-disable vue/html-closing-bracket-spacing -->
<!-- eslint-disable vue/singleline-html-element-content-newline -->
<!-- eslint-disable vue/multiline-html-element-content-newline -->
<template>
  <v-card style="width: 100%;">
    <v-responsive>
      <hr style="height:10px; visibility:hidden;">
      <p
        class="headline mb-0 text-xs-center"
        style="text-align: center!important"
      >Current Ongoing Invasions</p>
      <v-expansion-panel>
        <v-expansion-panel-content v-for="item in invasions" :key="item.ID">
          <div slot="header">
            <span
              :style="{color : getcolourfaction(item.AttackerMissionInfo)}"
            >{{item.AttackerMissionInfo}}</span> vs
            <span
              :style="{color : getcolourfaction(item.DefenderMissionInfo)}"
            >{{item.DefenderMissionInfo}}</span>
            on {{item.Location}})
            <br>
            Attack Status: ~ {{parseFloat(complete(item.Completion)).toFixed(2)}} % completed
          </div>
          <v-card flat>
            <v-list dense class="text-xs-center">
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>Location:</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-list-tile-action-text>
                    <v-chip
                      style="right: 0px;"
                      small
                      color="grey"
                      text-color="white"
                    >{{item.Location}}</v-chip>
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
                    <v-chip
                      style="right: 0px;"
                      small
                      :color="getcolourfaction(item.AttackerMissionInfo)"
                      text-color="white"
                    >{{item.AttackerMissionInfo}}</v-chip>
                    <br>
                  </v-list-tile-action-text>
                </v-list-tile-action>
              </v-list-tile>
              <v-list-tile v-if="item.AttackerRewardItem">
                <v-list-tile-content>
                  <v-list-tile-title>Attacker Reward Items:</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-list-tile-action-text>
                    <v-chip
                      style="right: 0px;"
                      small
                      color="red"
                      text-color="white"
                    >{{item.AttackerRewardCount}} x {{item.AttackerRewardItem}}</v-chip>
                  </v-list-tile-action-text>
                </v-list-tile-action>
              </v-list-tile>
              <v-list-tile v-if="item.attackerRewardCredits > 0">
                <v-list-tile-content>
                  <v-list-tile-title>Attacker Reward Credits:</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-list-tile-action-text>
                    <v-chip
                      style="right: 0px;"
                      small
                      color="red"
                      text-color="white"
                    >{{item.attackerRewardCredits}} Credits</v-chip>
                  </v-list-tile-action-text>
                </v-list-tile-action>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>Defender:</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-list-tile-action-text>
                    <v-chip
                      style="right: 0px;"
                      small
                      :color="getcolourfaction(item.DefenderMissionInfo)"
                      text-color="white"
                    >{{item.DefenderMissionInfo}}</v-chip>
                    <br>
                  </v-list-tile-action-text>
                </v-list-tile-action>
              </v-list-tile>
              <v-list-tile v-if="item.DefenderRewardItem">
                <v-list-tile-content>
                  <v-list-tile-title>Def. Reward Items:</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-list-tile-action-text>
                    <v-chip
                      style="right: 0px;"
                      small
                      :color="getcolourfaction(item.DefenderMissionInfo)"
                      text-color="white"
                    >{{item.DefenderRewardCount}} x {{item.DefenderRewardItem}}</v-chip>
                  </v-list-tile-action-text>
                </v-list-tile-action>
              </v-list-tile>
              <v-list-tile v-if="item.defenderRewardCredits > 0">
                <v-list-tile-content>
                  <v-list-tile-title>Def. Reward Credits:</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-list-tile-action-text>
                    <v-chip
                      style="right: 0px;"
                      small
                      :color="getcolourfaction(item.DefenderMissionInfo)"
                      text-color="white"
                    >{{item.defenderRewardCredits}} 0 Credits</v-chip>
                  </v-list-tile-action-text>
                </v-list-tile-action>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>Attacking Status:
                    <v-progress-linear height="15" value="81"/>
                  </v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-tooltip top>
                    <v-progress-linear
                      slot="activator"
                      style="width:180px"
                      :value="complete(item.Completion)"
                      :height="15"
                      :background-color="getcolourfaction(item.DefenderMissionInfo)"
                      :color="getcolourfaction(item.AttackerMissionInfo)"
                    />
                    <span>{{parseFloat(complete(item.Completion)).toFixed(2)}} % completed</span>
                  </v-tooltip>
                </v-list-tile-action>
              </v-list-tile>
            </v-list>
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
import moment from 'moment'
export default {
  /* eslint-disable vue/require-prop-types */
  props: ['invasions'],
  data() {
    return {
      timeremain: null,
      start: null
    }
  },
  mounted() {},
  methods: {
    getcolourfaction(prop) {
      let x = null
      if (prop === 'Grineer') {
        x = 'red'
      } else if (prop === 'Corpus') {
        x = 'blue'
      } else if (prop === 'Infested') {
        x = 'green'
      } else {
        x = 'white'
      }
      return x
    },
    formattime2: function(prop) {
      const x = moment(prop).format('dd[, ]DD[.]MMM YYYY HH:mm')
      return x
    },
    roundnumber: function(prop) {
      const x = Math.round(prop, 2)
      return x
    },
    complete: function(prop) {
      let x = prop
      if (prop < 0) {
        x = x * -1
      }
      return x
    },
    formattime: function(prop) {
      const x = prop.hours + 'h ' + prop.minutes + 'm ' + prop.seconds + 's'
      return x
    },
    planetname: function(prop) {
      return prop.match(/\((.*?)\)/)
    },
    nodename: function(prop) {
      return prop.split(' (')
    }
  }
}
</script>
