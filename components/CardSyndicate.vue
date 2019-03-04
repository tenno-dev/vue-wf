<!-- eslint-disable vue/mustache-interpolation-spacing -->
<!-- eslint-disable vue/singleline-html-element-content-newline -->
<!-- eslint-disable vue/multiline-html-element-content-newline -->
<template>
  <v-card style="width: 100%;height: 100%;">
    <v-responsive>
      <hr style="height:10px; visibility:hidden;">
      <p class="headline mb-0 text-xs-center" style="text-align: center!important">Bounty Cycle</p>
      <div>
        <v-tabs v-model="select" :dark="dark" slider-color="cyan">
          <v-tab v-for="(item,index) in syndics" :key="index">{{ item }}</v-tab>
          <v-tab-item v-for="itemno in syndicates" :key="itemno.ID">
            <v-list dense class="text-xs-center">
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>Bounties ends in:</v-list-tile-title>
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
                        {{formattime(itemno.Ends)[1]}}
                      </v-chip>
                      <span>{{formattime(itemno.Ends)[0]}} UTC</span>
                    </v-tooltip>
                    <hr style="height:10px; visibility:hidden;">
                  </v-list-tile-action-text>
                </v-list-tile-action>
              </v-list-tile>
            </v-list>
            <v-expansion-panel>
              <v-expansion-panel-content v-for="(item, i) in itemno.Jobs" :key="i">
                <template v-slot:header>
                  <div>
                    {{ item.Jobtype }}
                    <br>Level Range:
                    <v-chip
                      style="right: 0px;"
                      small
                      color="green"
                      text-color="white"
                    >{{ item.MinEnemyLevel }} - {{ item.MaxEnemyLevel }}</v-chip>
                  </div>
                </template>
                <table style="padding: 12px 24px;">
                  <tr class="show-border">
                    <th>Standings:</th>
                    <th>Rewards:</th>
                  </tr>
                  <tr>
                    <td style="width:50% ;">
                      <span v-for="(items, i1) in item.StandingReward" :key="i1">
                        <v-chip
                          style="right: 0px;"
                          small
                          color="grey"
                          text-color="white"
                        >{{ Number(items) }}</v-chip>
                      </span>
                    </td>
                    <td>
                      <span v-for="(itemr,id1) in item.Rewards" :key="id1">
                        <v-chip
                          style="right: 0px;"
                          small
                          color="green"
                          text-color="white"
                        >{{ itemr }}</v-chip>
                      </span>
                    </td>
                  </tr>
                </table>
                <br>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-tab-item>
        </v-tabs>
      </div>
      <!-- -->
    </v-responsive>
  </v-card>
</template>
<style scoped>
.v-chip .v-avatar {
  margin-left: -13px;
}
.show-border th {
  border-bottom: thin solid;
  font-weight: normal;
}
.v-chip {
  margin: 3px;
}
</style>
<script>
import moment from 'moment'
export default {
  /* eslint-disable vue/require-prop-types */
  props: ['syndicates', 'syndics', 'dark'],
  data() {
    return {
      timeremain: null,
      start: null,
      active: 0,
      select: 'Ostrons'
    }
  },
  mounted() {},
  methods: {
    formattime2: function(prop) {
      const x = moment(prop).format('dd[, ]DD[.]MMM YYYY HH:mm')
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
      return prop.match(/\((.*?)\)/)
    },
    splitstring: function(prop) {
      return prop.split(',')
    },
    nodename: function(prop) {
      return prop.split(' (')
    }
  }
}
</script>
