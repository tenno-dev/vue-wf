<!-- eslint-disable vue/mustache-interpolation-spacing -->
<!-- eslint-disable vue/singleline-html-element-content-newline -->
<!-- eslint-disable vue/multiline-html-element-content-newline -->
<template>
  <v-card v-if="sortie" style="width: 100%;">
    <v-responsive>
      <hr style="height:10px; visibility:hidden;">
      <p class="headline mb-0 text-xs-center" style="text-align: center!important">Current Sortie:</p>
      <div>
        <v-card style="width: 100%;">
          <hr style="height:10px; visibility:hidden;">
          <v-list dense subheader>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>Sortie ends in:</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-list-tile-action-text>
                  <v-tooltip top :max-width="400">
                    <v-chip
                      slot="activator"
                      style="right: 0px;"
                      small
                      color="red"
                      text-color="white"
                    >
                      <v-avatar>
                        <v-icon dark class="red darken-2">mdi-clock-outline</v-icon>
                      </v-avatar>
                      {{formattime(sortie.Ends)[1]}}
                    </v-chip>
                    <span>{{formattime(sortie.Ends)[0]}} UTC</span>
                  </v-tooltip>
                  <hr style="height:10px; visibility:hidden;">
                </v-list-tile-action-text>
              </v-list-tile-action>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>Boss:</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-list-tile-action-text>
                  <v-chip style="right: 0px;" small color="red" text-color="white">{{sortie.Boss}}</v-chip>
                  <br>
                </v-list-tile-action-text>
              </v-list-tile-action>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>Faction:</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-list-tile-action-text>
                  <v-chip
                    style="right: 0px;"
                    small
                    :color="getcolourfaction(sortie.Faction)"
                    text-color="white"
                  >{{sortie.Faction}}</v-chip>
                  <br>
                </v-list-tile-action-text>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
          <v-expansion-panel>
            <v-expansion-panel-content v-for="(variant,index) in sortie.Variants" :key="index">
              <div slot="header">
                <span>{{index+1}}. Variant</span>
              </div>
              <div>
                <v-list dense>
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
                        >{{variant.MissionLocation}}</v-chip>
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
                            <v-icon
                              v-if="variant.MissionType ==='Spy'"
                              class="grey darken-4"
                            >mdi-incognito</v-icon>
                            <v-icon
                              v-else-if="variant.MissionType ==='Rescue'"
                              class="red darken-4"
                            >mdi-lifebuoy</v-icon>
                            <v-icon
                              v-else-if="variant.MissionType ==='Defense' | variant.MissionType ==='Mobile Defense'"
                              class="blue darken-4"
                            >mdi-shield</v-icon>
                            <v-icon
                              v-else-if="variant.MissionType ==='Capture'"
                              class="grey darken-4"
                            >mdi-target</v-icon>
                            <v-icon
                              v-else-if="variant.MissionType ==='Excavation'"
                              class="green darken-4"
                            >mdi-shovel</v-icon>
                            <v-icon v-else class="grey darken-4">mdi-pistol</v-icon>
                          </v-avatar>
                          {{variant.MissionType}}
                        </v-chip>
                      </v-list-tile-action-text>
                    </v-list-tile-action>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>
                      <v-list-tile-title>Active Mods:</v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                      <v-list-tile-action-text>
                        <v-tooltip top :max-width="400">
                          <v-chip
                            slot="activator"
                            style="right: 0px;"
                            small
                            color="red"
                            text-color="white"
                          >{{variant.MissionMod}}</v-chip>
                          <span>{{variant.MissionModDesc}}</span>
                        </v-tooltip>
                      </v-list-tile-action-text>
                    </v-list-tile-action>
                  </v-list-tile>
                </v-list>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-card>
      </div>
    </v-responsive>
  </v-card>
</template>
<style scoped>
.v-chip .v-avatar {
  margin-left: -13px;
}
</style>
<script>
import moment from 'moment'

export default {
  /* eslint-disable vue/require-prop-types */
  props: ['sortie'],
  methods: {
    getcolour(prop) {
      let x = null
      if (prop < prop / 2) {
        x = 'yellow'
      } else {
        x = 'green'
      }
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
    getcolourfaction(prop) {
      let x = null
      if (prop === 'Grineer') {
        x = 'red'
      } else if (prop === 'Corpus') {
        x = 'blue'
      } else if (prop === 'Infestation' || prop === 'Infested') {
        x = 'green'
      } else {
        x = 'grey'
      }
      return x
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
