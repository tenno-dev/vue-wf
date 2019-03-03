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
      >Current Darvo Deals:</p>
      <div>
        <v-card v-if="!deals" style="width: 100%;">
          <v-alert :value="true" type="error" stye="margin: 0px !important" outline>No active Deals!</v-alert>
        </v-card>
        <v-card v-else style="width: 100%;">
          <div>
            <v-list dense>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>Item:</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-list-tile-action-text>
                    <v-chip
                      style="right: 0px;"
                      small
                      color="grey"
                      text-color="white"
                    >{{deals[0].Item}}</v-chip>
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
                      {{formattime(deals[0].Ends)}}
                    </v-chip>
                  </v-list-tile-action-text>
                </v-list-tile-action>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>Normal Price:</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-list-tile-action-text>
                    <v-chip style="right: 0px;" small color="red" text-color="white">
                      <v-avatar>
                        <img
                          style="height: 20px;width: 20px;"
                          class=".v-chip .v-icon .v-chip--small"
                          alt="Platinum"
                          src="https://hub.warframestat.us/img/general/plat.png"
                        >
                      </v-avatar>
                      <s>{{deals[0].Price}}</s>
                    </v-chip>
                  </v-list-tile-action-text>
                </v-list-tile-action>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>Deal Price:</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-list-tile-action-text>
                    <v-chip style="right: 0px;" small color="green" text-color="white">
                      <v-avatar>
                        <img
                          style="height: 20px;width: 20px;"
                          class=".v-chip .v-icon .v-chip--small"
                          alt="Platinum"
                          src="https://hub.warframestat.us/img/general/plat.png"
                        >
                      </v-avatar>
                      {{deals[0].DealPrice}}
                    </v-chip>
                  </v-list-tile-action-text>
                </v-list-tile-action>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>Stock:</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-list-tile-action-text>
                    <span v-if="deals[0].Sold !== deals[0].Stock">
                      <v-chip
                        style="right: 0px;"
                        small
                        :color="getcolour(deals[0].Stock)"
                        text-color="white"
                      >{{deals[0].Stock - deals[0].Sold }} of {{deals[0].Stock}} left</v-chip>
                    </span>
                    <span v-else>
                      <v-chip style="right: 0px;" small color="red" text-color="white">Sold Out</v-chip>
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
  props: ['deals'],
  methods: {
    formattime: function(prop) {
      const x = moment(prop).format('X')
      const unix1 = moment(moment.unix(x).diff(moment())).valueOf()
      return moment(unix1).format('mm:ss')
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
