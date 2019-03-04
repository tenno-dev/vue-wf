<!-- eslint-disable vue/mustache-interpolation-spacing -->
<!-- eslint-disable vue/singleline-html-element-content-newline -->
<!-- eslint-disable vue/multiline-html-element-content-newline -->
<template>
  <v-card style="width: 100%;">
    <v-responsive>
      <hr style="height:10px; visibility:hidden;">
      <p
        class="headline mb-0 text-xs-center"
        style="text-align: center!important"
      >Current Void Fissues</p>
      <v-expansion-panel>
        <v-expansion-panel-content v-for="item in fissures" :key="item.id">
          <div slot="header">
            <span>{{item.MissionType}}</span>vs
            <span :style="{color : getcolourfaction(item.MissionFaction)}">{{item.MissionFaction}}</span>
            on
            {{item.MissionLocation}}&nbsp;
            <br>
            <v-tooltip top :max-width="400">
              <span slot="activator">{{formattime(item.Ends)[1]}}</span>
              <span>{{formattime(item.Ends)[0]}}</span>
            </v-tooltip>remaining
          </div>
          <div>
            <v-list dense class="text-xs-center">
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>Fissue:</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-list-tile-action-text>
                    <v-chip
                      style="right: 0px;"
                      small
                      color="grey"
                      text-color="white"
                    >{{item.Tier}} - T{{item.TierLevel}}</v-chip>
                    <br>
                  </v-list-tile-action-text>
                </v-list-tile-action>
              </v-list-tile>
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
                    >{{item.MissionLocation}}</v-chip>
                    <br>
                  </v-list-tile-action-text>
                </v-list-tile-action>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>Ends in:</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-list-tile-action-text>
                    <v-tooltip top :max-width="400">
                      <v-chip
                        slot="activator"
                        style="right: 0px;"
                        small
                        color="grey"
                        text-color="white"
                      >
                        <v-avatar>
                          <v-icon dark class="black darken-2">mdi-clock-outline</v-icon>
                        </v-avatar>
                        {{formattime(item.Ends)[1]}}
                      </v-chip>
                      <span>{{formattime(item.Ends)[0]}} UTC</span>
                    </v-tooltip>
                    <br>
                  </v-list-tile-action-text>
                </v-list-tile-action>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>Enemy:</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-list-tile-action-text>
                    <v-chip
                      style="right: 0px;"
                      small
                      :color="getcolourfaction(item.MissionFaction)"
                      text-color="white"
                    >{{item.MissionFaction}}</v-chip>
                    <br>
                  </v-list-tile-action-text>
                </v-list-tile-action>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>Mission Type</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-list-tile-action-text>
                    <v-chip style="right: 0px;" small color="grey" text-color="white">
                      <v-avatar>
                        <v-icon v-if="item.MissionType ==='Spy'" class="grey darken-4">mdi-incognito</v-icon>
                        <v-icon
                          v-else-if="item.MissionType ==='Rescue'"
                          class="red darken-4"
                        >mdi-lifebuoy</v-icon>
                        <v-icon
                          v-else-if="item.MissionType ==='Defense' | item.MissionType ==='Mobile Defense'"
                          class="blue darken-4"
                        >mdi-shield</v-icon>
                        <v-icon
                          v-else-if="item.MissionType ==='Capture'"
                          class="grey darken-4"
                        >mdi-target</v-icon>
                        <v-icon
                          v-else-if="item.MissionType ==='Excavation'"
                          class="green darken-4"
                        >mdi-shovel</v-icon>
                        <v-icon v-else class="grey darken-4">mdi-pistol</v-icon>
                      </v-avatar>
                      {{item.MissionType}}
                    </v-chip>
                  </v-list-tile-action-text>
                </v-list-tile-action>
              </v-list-tile>
            </v-list>
          </div>
          <br>
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
  props: ['fissures'],
  data() {
    return {
      timeremain: null,
      start: null
    }
  },
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
        x = 'grey'
      }
      return x
    },
    roundnumber: function(prop) {
      const x = Math.round(prop, 2)
      return x
    },
    formattime: function(prop) {
      const format = 'YYYY-MM-DD HH:mm Z'
      const now = moment()
        .utc()
        .toISOString()
      const timeDuration = moment(
        moment.utc(moment(prop, format)).diff(moment(now, format))
      )
        .utc()
        .format('H:mm:ss')
      const timeDurationlocal = moment(
        moment.utc(moment(prop, format)).diff(moment(now, format))
      )
        .local()
        .format('H:mm:ss')
      // eslint-disable-next-line no-console
      console.log(timeDuration)

      return [timeDuration, timeDurationlocal]
    },
    planetname: function(prop) {
      return prop.match(/\((.*)\)/)[1]
    },
    nodename: function(prop) {
      return prop.split('(')[0]
    }
  }
}
</script>
