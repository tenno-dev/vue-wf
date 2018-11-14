<template>
  <v-container style="width:100%;" fluid grid-list-sm>
    <v-layout row wrap="">
      <v-flex xs12 md5 lg3>
        <div v-if="!$apollo.queries.Alerts.loading">
          <CardAlerts :alerts="this.Alerts"/>
        </div>
      </v-flex>
      <v-flex xs12 md5 lg3>
        <div v-if="!$apollo.queries.News.loading">
          <CardNews :news="this.News" :dark="this.$props.dark1"/>
        </div>
      </v-flex>
      <v-flex xs12 md5 lg3>
        <div v-if="!$apollo.queries.News.loading">
          <CardNews :news="this.News" :dark="this.$props.dark1"/>
        </div>
      </v-flex>
      <v-flex xs12 md5 lg3>
        <div v-if="!$apollo.queries.News.loading">
          <CardNews :news="this.News" :dark="this.$props.dark1"/>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// @ is an alias to /src
import gql from "graphql-tag";
import CardAlerts from "@/components/CardAlerts.vue";
import CardNews from "@/components/CardNews.vue";

import moment from "moment";

export default {
  props: ["test", "dark1"],
  name: "home",
  components: {
    CardAlerts,
    CardNews
  },
  data() {
    return {
      tstamp: "0",
      Alerts: {},
      News: {},
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
          Expiry_gte: moment().unix(),
          platform: this.test
        };
      },
      fetchPolicy: "network-first",

      // Variables: deep object watch
      deep: false,
      result({ data }) {
        this.Alerts = data.Alerts;
      },
      pollInterval: 60000,
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
    },
    News: {
      query: gql`
        query News {
          News(orderBy: date_DESC) {
            newsid
            message
            link
            imageLink
            date
            update
            primeAccess
            stream
            translations
          }
        }
      `,
      // Reactive parameters
      fetchPolicy: "network-first",

      // Variables: deep object watch
      deep: false,
      result({ data }) {
        this.News = data.News;
      },
      pollInterval: 60000,
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
