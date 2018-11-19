<template>
    <v-card style="width: 100%;">
        <v-responsive>
            <hr style="height:10px; visibility:hidden;">
            <p
                class="headline mb-0 text-xs-center"
                style="text-align: center!important"
            >Current Void Fissues</p>
            <v-expansion-panel>
                <v-expansion-panel-content v-for="item in this.$props.fissures" :key="item.id">
                    <div slot="header">
                        <span>{{item.missionType}}</span>vs
                        <span :style="{color : getcolourfaction(item.enemy)}">{{item.enemy}}</span>
                        on
                        {{nodename(item.node)}}({{planetname(item.node)}})&nbsp;
                        <br>
                        <countdown :time="formattime(item.expiry)||0">
                            <template
                                slot-scope="props"
                            >{{ props.hours }}h {{ props.minutes }}m {{ props.seconds }}s</template>
                        </countdown> remaining
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
                                        >{{item.tier}} - T{{item.tierNum}}</v-chip>
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
                                        >{{nodename(item.node)}} on {{planetname(item.node)}}</v-chip>
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
                                                <v-icon class="black darken-2">mdi-clock-outline</v-icon>
                                            </v-avatar>
                                            <countdown :time="formattime(item.expiry)||0">
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
                                    <v-list-tile-title>Enemy:</v-list-tile-title>
                                </v-list-tile-content>
                                <v-list-tile-action>
                                    <v-list-tile-action-text>
                                        <v-chip
                                            style="right: 0px;"
                                            small
                                            :color="getcolourfaction(item.enemy)"
                                            text-color="white"
                                        >{{item.enemy}}</v-chip>
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
                                        <v-chip
                                            style="right: 0px;"
                                            small
                                            color="grey"
                                            text-color="white"
                                        >
                                            <v-avatar>
                                                <v-icon
                                                    v-if="item.missionType ==='Spy'"
                                                    class="grey darken-4"
                                                >mdi-incognito</v-icon>
                                                <v-icon
                                                    v-else-if="item.missionType ==='Rescue'"
                                                    class="red darken-4"
                                                >mdi-lifebuoy</v-icon>
                                                <v-icon
                                                    v-else-if="item.missionType ==='Defense' | item.missionType ==='Mobile Defense'"
                                                    class="blue darken-4"
                                                >mdi-shield</v-icon>
                                                <v-icon
                                                    v-else-if="item.missionType ==='Capture'"
                                                    class="grey darken-4"
                                                >mdi-target</v-icon>
                                                <v-icon
                                                    v-else-if="item.missionType ==='Excavation'"
                                                    class="green darken-4"
                                                >mdi-shovel</v-icon>
                                                <v-icon v-else class="grey darken-4">mdi-pistol</v-icon>
                                            </v-avatar>
                                            {{item.missionType}}
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
import moment from "moment";

export default {
  props: ["fissures"],
  data() {
    return {
      timeremain: null,
      start: null
    };
  },
  methods: {
    getcolourfaction(prop) {
      var x = null;
      if (prop == "Grineer") {
        x = "red";
      } else if (prop == "Corpus") {
        x = "blue";
      } else if (prop == "Infested") {
        x = "green";
      } else {
        x = "grey";
      }
      return x;
    },
    roundnumber: function(prop) {
      var x = Math.round(prop, 2);
      return x;
    },
    formattime: function(prop) {
      return moment(moment.unix(prop).diff(moment())).valueOf();
    },
    planetname: function(prop) {
      return prop.match(/\((.*)\)/)[1];
    },
    nodename: function(prop) {
      return prop.split("(")[0];
    }
  },
  mounted() {}
};
</script>