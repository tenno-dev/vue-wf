<template>
    <v-card style="width: 100%;">
        <v-responsive>
            <br>
            <p
                class="headline mb-0 text-xs-center"
                style="text-align: center!important"
            >Current Darvo Deals:</p>
            <div>
                <v-card style="width: 100%;">
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
                                        >{{deals.item}}</v-chip>
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
                                            <countdown :time="formattime(deals.expiry)||0">
                                                <template
                                                    slot-scope="props"
                                                >{{ props.hours }}h {{ props.minutes }}m {{ props.seconds }}s</template>
                                            </countdown>
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
                                        <v-chip
                                            style="right: 0px;"
                                            small
                                            color="red"
                                            text-color="white"
                                        >
                                            <v-avatar>
                                                <img
                                                    style="height: 20px;width: 20px;"
                                                    class=".v-chip .v-icon .v-chip--small"
                                                    src="https://hub.warframestat.us/img/general/plat.png"
                                                >
                                            </v-avatar>
                                            <s>{{deals.originalPrice}}</s>
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
                                        <v-chip
                                            style="right: 0px;"
                                            small
                                            color="green"
                                            text-color="white"
                                        >
                                            <v-avatar>
                                                <img
                                                    style="height: 20px;width: 20px;"
                                                    src="https://hub.warframestat.us/img/general/plat.png"
                                                >
                                            </v-avatar>
                                            {{deals.salePrice}}
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
                                        <span v-if="deals.sold !== deals.total">
                                            <v-chip
                                                style="right: 0px;"
                                                small
                                                :color="getcolour(deals.total)"
                                                text-color="white"
                                            >{{deals.total - deals.sold }} of {{deals.total}} left</v-chip>
                                        </span>
                                        <span v-else>
                                            <v-chip
                                                style="right: 0px;"
                                                small
                                                color="red"
                                                text-color="white"
                                            >Sold Out</v-chip>
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
</style>
<script>
import moment from "moment";

export default {
  props: ["deals"],
  methods: {
    formattime: function(prop) {
      return moment(moment.unix(prop).diff(moment())).valueOf();
    },
    getcolour(prop) {
      var x = null;
      if (prop < prop / 2) {
        x = "yellow";
      } else {
        x = "green";
      }
      return x;
    }
  }
};
</script>