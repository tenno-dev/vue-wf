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
                          v-if="cycle.EarthIsDay"
                          dark
                          class="yellow darken-2"
                        >mdi-weather-sunny</v-icon>
                        <v-icon v-else dark class="blue darken-2">mdi-weather-night</v-icon>
                      </v-avatar>
                      <span v-if="cycle.EarthIsDay">Day</span>
                      <span v-else>Night</span>
                    </v-chip>
                  </v-list-tile-action-text>
                </v-list-tile-action>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>
                    Time until
                    <span v-if="!cycle.EarthIsDay">Day</span>
                    <span v-else>Night</span>:
                  </v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-list-tile-action-text>
                    <v-chip style="right: 0px;" small color="grey" text-color="white">
                      <v-avatar>
                        <v-icon dark class="black darken-2">mdi-clock-outline</v-icon>
                      </v-avatar>
                      <span>{{formattime(cycle.EarthEnds)}}</span>
                    </v-chip>
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
                          v-if="cycle.CetusIsDay"
                          dark
                          class="yellow darken-2"
                        >mdi-weather-sunny</v-icon>
                        <v-icon v-else dark class="blue darken-2">mdi-weather-night</v-icon>
                      </v-avatar>
                      <span v-if="cycle.CetusIsDay">Day</span>
                      <span v-else>Night</span>
                    </v-chip>
                  </v-list-tile-action-text>
                </v-list-tile-action>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>
                    Time until
                    <span v-if="!cycle.CetusIsDay">Day</span>
                    <span v-else>Night</span>:
                  </v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-list-tile-action-text>
                    <v-chip style="right: 0px;" small color="grey" text-color="white">
                      <v-avatar>
                        <v-icon dark class="black darken-2">mdi-clock-outline</v-icon>
                      </v-avatar>
                      <span>{{formattime(cycle.CetusEnds)}}</span>
                    </v-chip>
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
                          v-if="cycle.VallisIsWarm"
                          dark
                          class="yellow darken-2"
                        >mdi-weather-sunny</v-icon>
                        <v-icon v-else dark class="blue darken-2">mdi-snowflake</v-icon>
                      </v-avatar>
                      <span v-if="cycle.VallisIsWarm">Warm</span>
                      <span v-else>Cold</span>
                    </v-chip>
                  </v-list-tile-action-text>
                </v-list-tile-action>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>
                    Time until
                    <span v-if="!cycle.VallisIsWarm">Warm</span>
                    <span v-else>Cold</span>:
                  </v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-list-tile-action-text>
                    <v-chip style="right: 0px;" small color="grey" text-color="white">
                      <v-avatar>
                        <v-icon class="black darken-2">mdi-clock-outline</v-icon>
                      </v-avatar>
                      <span>{{formattime(cycle.VallisEnds)}}</span>
                    </v-chip>
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
      const x = moment(prop).format('X')
      const unix1 = moment(moment.unix(x).diff(moment())).valueOf()
      return moment(unix1).format('mm:ss')
    }
  }
}
</script>
