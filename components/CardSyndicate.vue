<template>
    <v-card style="width: 100%;">
        <v-responsive>
            <hr style="height:10px; visibility:hidden;">
            <p
                class="headline mb-0 text-xs-center"
                style="text-align: center!important"
            >Bounty Cycle</p>
            <v-tabs v-model="select" :dark="dark" slider-color="cyan">
                <v-tab v-for="n in this.syndics" :key="n" ripple>{{ n }}</v-tab>
                <v-tab-item v-for="n in this.syndics" :key="n">
                    <v-list dense class="text-xs-center">
                        <v-list-tile>
                            <v-list-tile-content>
                                <v-list-tile-title>Bounties ends in:</v-list-tile-title>
                            </v-list-tile-content>
                            <v-list-tile-action>
                                <v-list-tile-action-text>
                                    <v-chip
                                        slot="activator"
                                        style="right: 0px;"
                                        small
                                        color="red"
                                        text-color="white"
                                    >
                                        <countdown :time="formattime(bounties[n][0].expiry) || 0">
                                            <template slot-scope="props">
                                                {{ props.hours }}h {{ props.minutes }}m
                                                {{ props.seconds }}s
                                            </template>
                                        </countdown>
                                    </v-chip>
                                    <hr style="height:10px; visibility:hidden;">
                                </v-list-tile-action-text>
                            </v-list-tile-action>
                        </v-list-tile>
                    </v-list>
                    <p
                        class="headline mb-0 text-xs-center"
                        style="text-align: center!important"
                    >Bounties</p>
                    <div v-if="bounties[n][0].jobs !== 'none'">
                        <v-expansion-panel v-for="(item, i) in bounties[n][0].jobs" :key="i">
                            <v-expansion-panel-content>
                                <div slot="header">
                                    {{ item.type }}
                                    <br>Level Range:
                                    <v-chip
                                        style="right: 0px;left: 0px;"
                                        small
                                        color="green"
                                        text-color="white"
                                    >{{ item.enemyLevels[0] }} - {{ item.enemyLevels[1] }}</v-chip>
                                </div>
                                <v-card>
                                    <v-card-title>
                                        <div>
                                            Standings:
                                            <span
                                                v-for="(item, i) in item.standingStages"
                                                :key="i"
                                            >
                                                <v-chip
                                                    style="right: 0px;left: 0px;"
                                                    small
                                                    color="grey"
                                                    text-color="white"
                                                >{{ Number(item) }}</v-chip>
                                            </span>
                                            <br>Items:
                                            <span v-for="item in item.rewardPool" :key="item">
                                                <v-chip
                                                    style="right: 0px;left: 0px;"
                                                    small
                                                    color="green"
                                                    text-color="white"
                                                >{{ item }}</v-chip>
                                            </span>
                                            <hr style="height:10px; visibility:hidden;">
                                        </div>
                                    </v-card-title>
                                </v-card>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </div>
                </v-tab-item>
            </v-tabs>
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
import moment from "moment";
export default {
  props: ["bounties", "syndics", "dark"],
  data() {
    return {
      timeremain: null,
      start: null,
      active: 0,
      select: "Ostrons"
    };
  },
  methods: {
    formattime2: function(prop) {
      var x = moment(prop).format("dd[, ]DD[.]MMM YYYY HH:mm");
      return x;
    },
    formattime: function(prop) {
      return moment(moment.unix(prop).diff(moment())).valueOf();
    },
    planetname: function(prop) {
      return prop.match(/\((.*?)\)/);
    },
    nodename: function(prop) {
      return prop.split(" (");
    }
  },
  mounted() {}
};
</script>
