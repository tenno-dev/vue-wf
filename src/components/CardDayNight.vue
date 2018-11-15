<template>
    <v-card style="width: 100%;">
        <v-responsive>
            <hr style="height:10px; visibility:hidden;">
            <p
                class="headline mb-0 text-xs-center"
                style="text-align: center!important"
            >Day/Night Cycles:</p>
            <div>
                <!-- Earth -->
                <v-card>
                    <div>
                        <hr style="height:10px; visibility:hidden;">
                        <p
                            class="headline mb-0 text-xs-center"
                            style="text-align: center!important"
                        >Earth</p>
                    </div>
                    <div>
                        <v-list dense>
                            <v-list-tile>
                                <v-list-tile-content>
                                    <v-list-tile-title>Currently it is:</v-list-tile-title>
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
                                                    v-if="cylces.EarthisDay"
                                                    class="yellow darken-2"
                                                >mdi-weather-sunny</v-icon>
                                                <v-icon
                                                    v-else
                                                    class="blue darken-2"
                                                >mdi-weather-night</v-icon>
                                            </v-avatar>
                                            <span v-if="cylces.EarthisDay">Day</span>
                                            <span v-else>Night</span>
                                        </v-chip>
                                    </v-list-tile-action-text>
                                </v-list-tile-action>
                            </v-list-tile>
                            <v-list-tile>
                                <v-list-tile-content>
                                    <v-list-tile-title>
                                        Time until
                                        <span v-if="!cylces.EarthisDay">Day</span>
                                        <span v-else>Night</span>:
                                    </v-list-tile-title>
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
                                            <span>
                                                <countdown
                                                    :time="formattime(cylces.Earthexpiry)||0"
                                                >
                                                    <template
                                                        slot-scope="props"
                                                    >{{ props.hours }}h {{ props.minutes }}m {{ props.seconds }}s</template>
                                                </countdown>
                                            </span>
                                        </v-chip>
                                    </v-list-tile-action-text>
                                </v-list-tile-action>
                            </v-list-tile>
                        </v-list>
                    </div>
                </v-card>
                <!-- Cetus -->
                <v-card>
                    <div>
                        <p
                            class="headline mb-0 text-xs-center"
                            style="text-align: center!important"
                        >Cetus</p>
                    </div>
                    <div>
                        <v-list dense>
                            <v-list-tile>
                                <v-list-tile-content>
                                    <v-list-tile-title>Currently it is:</v-list-tile-title>
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
                                                    v-if="cylces.CetusisDay"
                                                    class="yellow darken-2"
                                                >mdi-weather-sunny</v-icon>
                                                <v-icon
                                                    v-else
                                                    class="blue darken-2"
                                                >mdi-weather-night</v-icon>
                                            </v-avatar>
                                            <span v-if="cylces.CetusisDay">Day</span>
                                            <span v-else>Night</span>
                                        </v-chip>
                                    </v-list-tile-action-text>
                                </v-list-tile-action>
                            </v-list-tile>
                            <v-list-tile>
                                <v-list-tile-content>
                                    <v-list-tile-title>
                                        Time until
                                        <span v-if="!cylces.CetusisDay">Day</span>
                                        <span v-else>Night</span>:
                                    </v-list-tile-title>
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
                                            <span>
                                                <countdown
                                                    :time="formattime(cylces.Cetusexpiry)||0"
                                                >
                                                    <template
                                                        slot-scope="props"
                                                    >{{ props.hours }}h {{ props.minutes }}m {{ props.seconds }}s</template>
                                                </countdown>
                                            </span>
                                        </v-chip>
                                    </v-list-tile-action-text>
                                </v-list-tile-action>
                            </v-list-tile>
                        </v-list>
                    </div>
                </v-card>
                <!-- Vallis -->
                <v-card v-if="platform =='pc'">
                    <div>
                        <p
                            class="headline mb-0 text-xs-center"
                            style="text-align: center!important"
                        >Vallis</p>
                    </div>
                    <div>
                        <v-list dense>
                            <v-list-tile>
                                <v-list-tile-content>
                                    <v-list-tile-title>Currently it is:</v-list-tile-title>
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
                                                    v-if="cylces.VallisisWarm"
                                                    class="yellow darken-2"
                                                >mdi-weather-sunny</v-icon>
                                                <v-icon v-else class="blue darken-2">mdi-snowflake</v-icon>
                                            </v-avatar>
                                            <span v-if="cylces.VallisisWarm">Warm</span>
                                            <span v-else>Cold</span>
                                        </v-chip>
                                    </v-list-tile-action-text>
                                </v-list-tile-action>
                            </v-list-tile>
                            <v-list-tile>
                                <v-list-tile-content>
                                    <v-list-tile-title>
                                        Time until
                                        <span v-if="!cylces.VallisisWarm">Warm</span>
                                        <span v-else>Cold</span>:
                                    </v-list-tile-title>
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
                                            <span>
                                                <countdown
                                                    :time="formattime(cylces.Vallisexpiry)||0"
                                                >
                                                    <template
                                                        slot-scope="props"
                                                    >{{ props.hours }}h {{ props.minutes }}m {{ props.seconds }}s</template>
                                                </countdown>
                                            </span>
                                        </v-chip>
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
  props: ["cylces", "platform"],
  methods: {
    formattime: function(prop) {
      return moment(moment.unix(prop).diff(moment())).valueOf();
    }
  }
};
</script>