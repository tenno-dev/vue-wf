<template>
  <div>
    <hr style="height:10px; visibility:hidden;">
    <div v-if="!$apollo.queries.Alerts.loading">Loading...not
      <CardAlerts :alerts="this.Alerts"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import gql from "graphql-tag";
import CardAlerts from "@/components/CardAlerts.vue";

export default {
  props: ["test", "dark1"],
  name: "home",
  components: {
    CardAlerts
  },
  data() {
    return {
      tstamp: "0",
      Alerts: {},
      error: 0
    };
  },
  apollo: {
    // Advanced query with parameters
    // The 'variables' method is watched by vue
    Alerts: {
      query: gql`
        query Alerts($Expiry_gte: Int, $platform: String) {
          Alerts(where: { Expiry_gte: $Expiry_gte, platform: $platform }) {
            alertid
            Expiry
            MissionType
            MissionFaction
            MissionLocation
            MissionRewardItem
            MissionRewardCredits
            MissionRewardImg
            MissionMinEnemyLvl
            MissionMaxEnemyLevel
            MissionNightmareMode
            MissionAchwingRequired
          }
        }
      `,
      // Reactive parameters
      variables() {
        // Use vue reactive properties here
        return {
          Expiry_gte: 1542200525,
          platform: this.test
        };
      },
      fetchPolicy: "network-only",
      // Variables: deep object watch
      deep: false,
      result({ data }) {
        this.Alerts = data.Alerts;
      },
      // We use a custom update callback because
      // the field names don't match
      // By default, the 'pingMessage' attribute
      // would be used on the 'data' result object
      // Here we know the result is in the 'ping' attribute
      // considering the way the apollo server works
      // Optional result hook
      // Error handling
      error(error) {
        // eslint-disable-next-line
        console.error("We've got an error!", error);
        this.error = 1;
      },
      // Loading state
      // loadingKey is the name of the data property
      // that will be incremented when the query is loading
      // and decremented when it no longer is.
      loadingKey: "loadingQueriesCount"
      // watchLoading will be called whenever the loading state changes
    }
  }
};
</script>
