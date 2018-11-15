<template>
    <v-card style="width: 100%;">
        <v-responsive>
            <hr style="height:10px; visibility:hidden;">
            <p
                class="headline mb-0 text-xs-center"
                style="text-align: center!important"
            >Daily Reward Timer</p>
            <v-list dense class="text-xs-center">
                <v-list-tile>
                    <v-list-tile-content>
                        <v-list-tile-title>Resets in:</v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                        <v-list-tile-action-text>
                            <v-chip style="right: 0px;" small color="green" text-color="white">
                                <countdown :time="this.timeremain||0">
                                    <template
                                        slot-scope="props"
                                    >{{ props.hours }}h {{ props.minutes }}m {{ props.seconds }}s</template>
                                </countdown>
                            </v-chip>
                            <br>
                        </v-list-tile-action-text>
                    </v-list-tile-action>
                </v-list-tile>
            </v-list>
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
  data() {
    return {
      timeremain: null
    };
  },
  methods: {
    formattime: function(prop) {
      var x = prop.hours + "h " + prop.minutes + "m " + prop.seconds + "s";
      return x;
    }
  },
  mounted() {
    this.timeremain = moment()
      .endOf("day")
      .valueOf();
  }
};
</script>