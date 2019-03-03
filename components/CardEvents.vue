<!-- eslint-disable vue/mustache-interpolation-spacing -->
<!-- eslint-disable vue/singleline-html-element-content-newline -->
<!-- eslint-disable vue/multiline-html-element-content-newline -->
<template>
  <v-card style="width: 100%;">
    <v-responsive>
      <hr style="height:10px; visibility:hidden;">
      <p class="headline mb-0 text-xs-center" style="text-align: center!important">Current Events:</p>
      <div>
        <p
          v-if="events"
          class="subtitle-1 font-weight-bold mb-3 text-xs-center"
          style="text-align: center!important"
        >{{events[0].Tooltip}}</p>
        <v-card v-if="!events" style="width: 100%;">
          <v-alert
            :value="true"
            type="error"
            stye="margin: 0px !important"
            outline
          >No active Events!</v-alert>
        </v-card>
        <v-card v-else style="width: 100%;">
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
                    >{{events[0].Description}}</v-chip>
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
                    <v-chip style="right: 0px;" small color="grey" text-color="white">
                      <v-avatar>
                        <v-icon dark class="black darken-2">mdi-clock-outline</v-icon>
                      </v-avatar>
                      {{formattime(events[0].Ends)}}
                    </v-chip>
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
                      :color="getcolourfaction(events[0].Faction)"
                      text-color="white"
                    >{{events[0].Faction}}</v-chip>
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
                    <span>
                      <v-chip
                        style="right: 0px;"
                        small
                        :color="getcolour( events[0].CurrScore)"
                        text-color="white"
                      >{{events[0].CurrScore }}% of {{events[0].MaxScore}}% done</v-chip>
                    </span>
                  </v-list-tile-action-text>
                </v-list-tile-action>
              </v-list-tile>
            </v-list>
          </div>
        </v-card>
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
      const x = moment(prop).format('X')
      const unix1 = moment(moment.unix(x).diff(moment())).valueOf()
      return moment(unix1).format('mm:ss')
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
