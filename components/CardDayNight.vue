<!-- eslint-disable vue/mustache-interpolation-spacing -->
<!-- eslint-disable vue/singleline-html-element-content-newline -->
<!-- eslint-disable vue/multiline-html-element-content-newline -->
<template>
  <v-card style="width: 100%;">
    <v-responsive>
      <hr style="height:10px; visibility:hidden;">
      <p class="headline mb-0 text-xs-center" style="text-align: center!important">Day/Night Cycles:</p>
      <div>
        <v-card>
          <div>
            <hr style="height:5px; visibility:hidden;">
            <p class="headline mb-0 text-xs-center" style="text-align: center!important">Earth</p>
          </div>
          <div>
            <v-list dense>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>Currently it is:</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-list-tile-action-text>
                    <v-chip style="right: 0px;" small color="grey" text-color="white">
                      <v-avatar>
                        <v-icon
                          v-if="cycle[0].EarthIsDay"
                          dark
                          class="yellow darken-2"
                        >mdi-weather-sunny</v-icon>
                        <v-icon v-else dark class="blue darken-2">mdi-weather-night</v-icon>
                      </v-avatar>
                      <span v-if="cycle[0].EarthIsDay">Day</span>
                      <span v-else>Night</span>
                    </v-chip>
                  </v-list-tile-action-text>
                </v-list-tile-action>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>
                    Time until
                    <span v-if="!cycle[0].EarthIsDay">Day</span>
                    <span v-else>Night</span>:
                  </v-list-tile-title>
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
                        {{formattime(cycle[0].EarthEnds)[1]}}
                      </v-chip>
                      <span>{{formattime(cycle[0].EarthEnds)[0]}} UTC</span>
                    </v-tooltip>
                  </v-list-tile-action-text>
                </v-list-tile-action>
              </v-list-tile>
            </v-list>
          </div>
        </v-card>

        <v-card>
          <div>
            <p class="headline mb-0 text-xs-center" style="text-align: center!important">Cetus</p>
          </div>
          <div>
            <v-list dense>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>Currently it is:</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-list-tile-action-text>
                    <v-chip style="right: 0px;" small color="grey" text-color="white">
                      <v-avatar>
                        <v-icon
                          v-if="cycle[0].CetusIsDay"
                          dark
                          class="yellow darken-2"
                        >mdi-weather-sunny</v-icon>
                        <v-icon v-else dark class="blue darken-2">mdi-weather-night</v-icon>
                      </v-avatar>
                      <span v-if="cycle[0].CetusIsDay">Day</span>
                      <span v-else>Night</span>
                    </v-chip>
                  </v-list-tile-action-text>
                </v-list-tile-action>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>
                    Time until
                    <span v-if="!cycle[0].CetusIsDay">Day</span>
                    <span v-else>Night</span>:
                  </v-list-tile-title>
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
                        {{formattime(cycle[0].CetusEnds)[1]}}
                      </v-chip>
                      <span>{{formattime(cycle[0].CetusEnds)[0]}} UTC</span>
                    </v-tooltip>
                  </v-list-tile-action-text>
                </v-list-tile-action>
              </v-list-tile>
            </v-list>
          </div>
        </v-card>
        <v-card>
          <div>
            <p class="headline mb-0 text-xs-center" style="text-align: center!important">Vallis</p>
          </div>
          <div>
            <v-list dense>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>Currently it is:</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-list-tile-action-text>
                    <v-chip style="right: 0px;" small color="grey" text-color="white">
                      <v-avatar>
                        <v-icon
                          v-if="cycle[0].VallisIsWarm"
                          dark
                          class="yellow darken-2"
                        >mdi-weather-sunny</v-icon>
                        <v-icon v-else dark class="blue darken-2">mdi-snowflake</v-icon>
                      </v-avatar>
                      <span v-if="cycle[0].VallisIsWarm">Warm</span>
                      <span v-else>Cold</span>
                    </v-chip>
                  </v-list-tile-action-text>
                </v-list-tile-action>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>
                    Time until
                    <span v-if="!cycle[0].VallisIsWarm">Warm</span>
                    <span v-else>Cold</span>:
                  </v-list-tile-title>
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
                        {{formattime(cycle[0].VallisEnds)[1]}}
                      </v-chip>
                      <span>{{formattime(cycle[0].VallisEnds)[0]}} UTC</span>
                    </v-tooltip>
                  </v-list-tile-action-text>
                </v-list-tile-action>
              </v-list-tile>
            </v-list>
          </div>
        </v-card>
        <!--  -->
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
  props: ['cycle'],
  methods: {
    formattime: function(prop) {
      const format = 'YYYY-MM-DD HH:mm Z'
      const now = moment()
        .utc()
        .toISOString()
      const timeDuration = moment(
        moment.utc(moment(prop, format)).diff(moment(now, format))
      )
        .utc()
        .format('HH:mm:ss')
      const timeDurationlocal = moment(
        moment.utc(moment(prop, format)).diff(moment(now, format))
      )
        .local()
        .format('HH:mm:ss')
      // eslint-disable-next-line no-console
      console.log(timeDuration)

      return [timeDuration, timeDurationlocal]
    }
  }
}
</script>
