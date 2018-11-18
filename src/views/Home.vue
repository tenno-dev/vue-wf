<template>
  <v-container style="width:100%;" fluid grid-list-md>
    <v-layout row :wrap="true">
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
        <div>
          <CardDailyReset :dark="this.$props.dark1"/>
        </div>
        <br>
        <div>
          <CardDarvoDeals :deals="this.DailyDeals" :dark="this.$props.dark1"/>
        </div>
      </v-flex>
      <v-flex xs12 md5 lg3>
        <div v-if="!$apollo.queries.dayNightCycle.loading">
          <CardDayNight :cylces="this.Cycles" :platform="this.test" :dark="this.$props.dark1"/>
        </div>
      </v-flex>
      <br>
      <v-flex xs12 md5 lg3>
        <div v-if="!$apollo.queries.SyndicateMissions.loading && this.synload">
          <CardSyndicate
            :bounties="this.SyndicateMissions"
            :syndics="this.test2"
            :dark="this.$props.dark1"
          />
          <!---->
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
import CardSyndicate from "@/components/CardSyndicate.vue";
import CardDailyReset from "@/components/CardDailyReset.vue";
import CardDayNight from "@/components/CardDayNight.vue";
import CardDarvoDeals from "@/components/CardDarvoDeals.vue";

var _ = require("lodash");

import moment from "moment";

export default {
  props: ["test", "dark1"],
  name: "home",
  components: {
    CardAlerts,
    CardNews,
    CardSyndicate,
    CardDailyReset,
    CardDayNight,
    CardDarvoDeals
  },
  data() {
    return {
      tstamp: "0",
      Alerts: {},
      News: {},
      SyndicateMissions: {},
      Cycles: {},
      time1: 0,
      error: 0,
      test2: [],
      synload: false
    };
  },
  mounted() {
    this.time1 = moment().unix();
    //this.$apollo.queries.News.refresh();
    //this.$apollo.queries.dayNightCycle.refresh();
    this.interval = setInterval(
      function() {
        this.time1 = moment().unix();
      }.bind(this),
      60000 // 60sec
    );
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
          Expiry_gte: this.time1,
          platform: this.test
        };
      },
      // Variables: deep object watch
      deep: true,
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
      // Variables: deep object watch
      deep: true,
      result({ data }) {
        this.News = data.News;
      },
      fetchPolicy: "network-first",
      pollInterval: 3600000,
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
    SyndicateMissions: {
      query: gql`
        query SyndicateMissions($Expiry_gte: Int, $platform: String) {
          SyndicateMissions(
            where: { expiry_gte: $Expiry_gte, platform: $platform }
          ) {
            missionid
            platform
            activation
            expiry
            syndicate
            nodes
            jobs
          }
        }
      `,
      // Reactive parameters
      variables() {
        // Use vue reactive properties here
        return {
          Expiry_gte: this.time1,
          platform: this.test
        };
      },
      // Variables: deep object watch
      deep: true,
      result({ data }) {
        this.synload = false;
        this.SyndicateMissions = _.groupBy(data.SyndicateMissions, "syndicate");
        var v1 = Object.keys(this.SyndicateMissions);
        this.test2.length = 0;
        for (var i = 0; i < v1.length; i++) {
          var t = v1[i];
          if (this.SyndicateMissions[t][0]["jobs"].length > 0) {
            this.test2.push(v1[i]);
          } else {
            this.SyndicateMissions[t] = null;
            delete this.SyndicateMissions[t];
          }
        }
        this.synload = true;
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
    },
    DailyDeals: {
      query: gql`
        query DailyDeals($Expiry_gte: Int, $platform: String) {
          DailyDeals(where: { Expiry_gte: $Expiry_gte, platform: $platform }) {
            Dealid
            platform
            item
            expiry
            originalPrice
            salePrice
            total
            sold
            discount
          }
        }
      `,
      // Reactive parameters
      variables() {
        // Use vue reactive properties here
        return {
          Expiry_gte: this.time1,
          platform: this.test
        };
      },
      // Variables: deep object watch
      deep: true,
      result({ data }) {
        this.DailyDeals = data.DailyDeals;
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
    },
    dayNightCycle: {
      query: gql`
        query dayNightCycle {
          dayNightCycle {
            Cycleid
            EarthisDay
            Earthexpiry
            CetusisDay
            Cetusexpiry
            Vallisexpiry
            VallisisWarm
          }
        }
      `,
      // Reactive parameters
      // Variables: deep object watch
      deep: true,
      result({ data }) {
        this.Cycles = data.dayNightCycle[0];
      },
      fetchPolicy: "network-first",
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
