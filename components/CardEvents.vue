<!-- eslint-disable vue/mustache-interpolation-spacing -->
<!-- eslint-disable vue/singleline-html-element-content-newline -->
<!-- eslint-disable vue/multiline-html-element-content-newline -->
<template>
  <v-card style="width: 100%;">
    <v-responsive>
      <hr style="height:10px; visibility:hidden;">
      <p class="headline mb-0 text-xs-center" style="text-align: center!important">Current active Events:</p>
      <v-card v-if="!events" style="width: 100%;">
        <v-alert :value="true" type="error" stye="margin: 0px !important" outline>No active Events!</v-alert>
      </v-card>
      <div v-if="events">
        <div v-for="event in events" :key="event.id">
          <hr style="height:20px; visibility:hidden;">
          <p
            class="subtitle-1 font-weight-bold mb-3 text-xs-center"
            style="text-align: center!important"
          >{{event.Tooltip}}</p>
          <v-card flat style="width: 100%;">
            <div>
              <v-list dense>
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>Description/Type:</v-list-tile-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-list-tile-action-text>
                      <v-chip
                        style="right: 0px;"
                        small
                        color="grey"
                        text-color="white"
                      >{{event.Description}}</v-chip>
                      <br>
                    </v-list-tile-action-text>
                  </v-list-tile-action>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>Time left:</v-list-tile-title>
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
                          {{formattime(event.Ends)[1]}}
                        </v-chip>
                        <span>{{formattime(event.Ends)[0]}} UTC</span>
                      </v-tooltip>
                    </v-list-tile-action-text>
                  </v-list-tile-action>
                </v-list-tile>
                <v-list-tile v-if="event.Faction != ''">
                  <v-list-tile-content>
                    <v-list-tile-title>Faction:</v-list-tile-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-list-tile-action-text>
                      <v-chip
                        style="right: 0px;"
                        small
                        :color="getcolourfaction(event.Faction)"
                        text-color="white"
                      >{{event.Faction}}</v-chip>
                      <br>
                    </v-list-tile-action-text>
                  </v-list-tile-action>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>Status:</v-list-tile-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-list-tile-action-text>
                      <v-chip
                        style="right: 0px;"
                        small
                        :color="getcolour( event.CurrScore)"
                        text-color="white"
                      >{{event.CurrScore }}% of {{event.MaxScore}}% done</v-chip>
                    </v-list-tile-action-text>
                  </v-list-tile-action>
                </v-list-tile>
              </v-list>
            </div>
          </v-card>
        </div>
      </div>
    </v-responsive>
  </v-card>
</template>
<style scoped>
.v-chip .v-avatar {
  margin-left: -13px;
}
.v-alert {
  font-weight: bold;
  margin: 0px;
  margin-top: 9px;
}
</style>
<script>
import moment from 'moment'

export default {
  /* eslint-disable vue/require-prop-types */
  props: ['events'],
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
      } else if (prop === 'Infested') {
        x = 'green'
      } else {
        x = 'grey'
      }
      return x
    },
    getcolour(prop) {
      let x = null
      if (prop < prop / 2) {
        x = 'yellow'
      } else {
        x = 'green'
      }
      return x
    }
  }
}
</script>
