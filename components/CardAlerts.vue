<template>
    <v-card style="width: 100%;">
        <v-responsive>
            <hr style="height:10px; visibility:hidden;">
            <p
                class="headline mb-0 text-xs-center"
                style="text-align: center!important"
            >Current Alerts:</p>
            <hr style="height:10px; visibility:hidden;">
            <v-expansion-panel>
                <v-expansion-panel-content v-for="(alert, index) in alerts" :key="index">
                    <div slot="header">
                        <span>
                            <span
                                v-if="alert.MissionNightmareMode"
                                class="red--text"
                            >Nightmare&nbsp;</span>
                            {{alert.MissionType}}
                        </span>vs
                        <span
                            :style="{color : getcolourfaction(alert.MissionFaction)}"
                        >{{alert.MissionFaction}}</span>
                        on
                        {{node(alert.MissionLocation)}}({{planet(alert.MissionLocation)}})
                        <br>
                        <countdown :time="formattime(alert.Expiry)">
                            <template
                                slot-scope="props"
                            >{{ props.hours }}h {{ props.minutes }}m {{ props.seconds }}s left</template>
                        </countdown>
                    </div>
                    <div>
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
                                        >{{node(alert.MissionLocation)}} on {{planet(alert.MissionLocation)}}</v-chip>
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
                                        <v-chip
                                            style="right: 0px;"
                                            small
                                            color="grey"
                                            text-color="white"
                                        >
                                            <v-avatar>
                                                <v-icon
                                                    dark
                                                    class="black darken-2"
                                                >mdi-clock-outline</v-icon>
                                            </v-avatar>
                                            <countdown :time="formattime(alert.Expiry)||0">
                                                <template
                                                    slot-scope="props"
                                                >{{ props.hours }}h {{ props.minutes }}m {{ props.seconds }}s</template>
                                            </countdown>
                                        </v-chip>
                                        <br>
                                    </v-list-tile-action-text>
                                </v-list-tile-action>
                            </v-list-tile>
                            <v-list-tile>
                                <v-list-tile-content>
                                    <v-list-tile-title>Mission Type:</v-list-tile-title>
                                </v-list-tile-content>
                                <v-list-tile-action>
                                    <v-list-tile-action-text>
                                        <v-chip
                                            style="right: 0px;"
                                            small
                                            v-if="alert.MissionNightmareMode"
                                            color="red"
                                            text-color="white"
                                        >
                                            <v-avatar>
                                                <v-icon class="red darken-4">mdi-skull</v-icon>
                                            </v-avatar>Nightmare
                                        </v-chip>&nbsp;
                                        <v-chip
                                            style="right: 0px;"
                                            small
                                            color="grey"
                                            text-color="white"
                                        >
                                            <v-avatar>
                                                <v-icon
                                                    v-if="alert.MissionType ==='Spy'"
                                                    dark
                                                    class="grey darken-4"
                                                >mdi-incognito</v-icon>
                                                <v-icon
                                                    v-else-if="alert.MissionType ==='Rescue'"
                                                    dark
                                                    class="red darken-4"
                                                >mdi-lifebuoy</v-icon>
                                                <v-icon
                                                    v-else-if="alert.MissionType ==='Defense'| alert.MissionType ==='Mobile Defense'"
                                                    dark
                                                    class="blue darken-4"
                                                >mdi-shield</v-icon>
                                                <v-icon
                                                    v-else-if="alert.MissionType ==='Capture'"
                                                    dark
                                                    class="grey darken-4"
                                                >mdi-target</v-icon>
                                                <v-icon
                                                    v-else-if="alert.MissionType ==='Excavation'"
                                                    dark
                                                    class="green darken-4"
                                                >mdi-shovel</v-icon>
                                                <v-icon v-else dark class="grey darken-4">mdi-pistol</v-icon>
                                            </v-avatar>
                                            {{alert.MissionType}}
                                        </v-chip>
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
                                            :color="getcolourfaction(alert.MissionFaction)"
                                            text-color="white"
                                        >
                                            <v-avatar>
                                                <v-icon
                                                    dark
                                                    :class="getcolourfaction(alert.MissionFaction,1)"
                                                >mdi-sword</v-icon>
                                            </v-avatar>
                                            {{alert.MissionFaction}}
                                        </v-chip>
                                        <br>
                                    </v-list-tile-action-text>
                                </v-list-tile-action>
                            </v-list-tile>
                            <v-list-tile>
                                <v-list-tile-content>
                                    <v-list-tile-title>Level Range:</v-list-tile-title>
                                </v-list-tile-content>
                                <v-list-tile-action>
                                    <v-list-tile-action-text>
                                        <v-chip
                                            style="right: 0px;"
                                            small
                                            color="grey"
                                            text-color="white"
                                        >{{alert.MissionMinEnemyLvl}} - {{alert.MissionMaxEnemyLevel}}</v-chip>
                                        <br>
                                    </v-list-tile-action-text>
                                </v-list-tile-action>
                            </v-list-tile>
                            <v-list-tile>
                                <v-list-tile-content>
                                    <v-list-tile-title>Credit Reward:</v-list-tile-title>
                                </v-list-tile-content>
                                <v-list-tile-action>
                                    <v-list-tile-action-text>
                                        <v-chip
                                            style="right: 0px;"
                                            small
                                            color="yellow  darken-2"
                                            text-color="white"
                                        >
                                            <v-avatar>
                                                <v-icon dark class="yellow darken-4">mdi-cash</v-icon>
                                            </v-avatar>
                                            {{alert.MissionRewardCredits}}
                                        </v-chip>
                                        <br>
                                    </v-list-tile-action-text>
                                </v-list-tile-action>
                            </v-list-tile>
                            <v-list-tile v-if="alert.MissionRewardItem !=='none'">
                                <v-list-tile-content>
                                    <v-list-tile-title>Item Reward:</v-list-tile-title>
                                </v-list-tile-content>
                                <v-list-tile-action>
                                    <v-list-tile-action-text>
                                        <v-chip
                                            style="right: 0px;"
                                            small
                                            color="grey"
                                            text-color="white"
                                        >{{alert.MissionRewardItem}}</v-chip>
                                        <br>
                                    </v-list-tile-action-text>
                                </v-list-tile-action>
                            </v-list-tile>
                        </v-list>
                    </div>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-responsive>
    </v-card>
</template>
<style scoped>
.v-chip .v-avatar {
  margin-left: -13px;
}

a:hover,
a:visited,
a:link,
a:active {
  text-decoration: none;
  color: white;
}
</style>
<script>
import moment from "moment";

export default {
  props: ["alerts"],
  data() {
    return {
      timeremain: null,
      start: null,
      dark1: null,
      light1: null
    };
  },
  watch: {
    "$store.state.darkMode": {
      handler: function(val) {
        if (val == true) {
          this.dark1 = true;
          this.light1 = false;
        } else {
          this.dark1 = false;
          this.light1 = true;
        }
      }
    }
  },
  mounted() {
    if ("$store.state.darkMode" == true) {
      this.dark1 = true;
      this.light1 = false;
    } else {
      this.dark1 = false;
      this.light1 = true;
    }
  },
  methods: {
    formattime: function(prop) {
      return moment(moment.unix(prop).diff(moment())).valueOf();
    },
    getcolourfaction(prop, icon) {
      var x = null;
      if (prop == "Grineer") {
        x = "red";
      } else if (prop == "Corpus") {
        x = "blue";
      } else if (prop == "Infested") {
        x = "green";
      } else if (prop == "Orokin") {
        x = "yellow darken-2";
      } else {
        x = "grey";
      }
      if (icon == 1 && prop !== "Orokin") {
        x = x + " darken-4";
      }
      if (icon == 1 && prop == "Orokin") {
        x = x = "yellow darken-4";
      }
      return x;
    },
    timecheck: function(prop) {
      return moment(prop).isBefore();
    },
    formattime2: function(prop) {
      return moment(prop).valueOf();
    },
    itemlink(prop) {
      return "/Item/" + prop;
    },
    planet: function(prop) {
      return prop.match(/\((.*)\)/)[1];
    },
    node: function(prop) {
      return prop.split("(")[0];
    }
  }
};
</script>