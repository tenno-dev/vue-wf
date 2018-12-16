<template>
  <v-container style="width:100%;" fluid grid-list-md>
    <v-layout row :wrap="true">
      <v-flex xs12 md5 lg3>
        <div v-if="Alerts">
          <CardAlerts :alerts="this.Alerts"/>
        </div>
      </v-flex>
      <v-flex xs12 md5 lg3>
        <div v-if="News">
          <CardNews :news="this.News" :dark="this.$props.dark1"/>
        </div>
      </v-flex>
      <v-flex xs12 md5 lg3>
        <div>
          <CardDailyReset :dark="this.$props.dark1"/>
        </div>
        <br>
        <div v-if="DailyDeals">
          <CardDarvoDeals :deals="DailyDeals" :dark="this.$props.dark1"/>
        </div>
      </v-flex>
      <v-flex xs12 md5 lg3>
        <div v-if="dayNightCycle">
          <CardDayNight
            :cylces="dayNightCycle"
            :platform="this.$store.state.activeplatform"
            :dark="this.$props.dark1"
          />
        </div>
      </v-flex>
      <br>
      <v-flex xs12 md5 lg3>
        <div v-if="SyndicateMissions && this.synload">
          <CardSyndicate
            :bounties="SyndicateMissions"
            :syndics="this.test2"
            :dark="this.$props.dark1"
          />
          <!---->
        </div>
      </v-flex>
      <v-flex xs12 md5 lg3>
        <div v-if="Sortie">
          <CardSortie :sortie="Sortie[0]" :platform="this.$store.state.activeplatform"/>
        </div>
      </v-flex>
      <v-flex xs12 md5 lg3>
        <div v-if="Fissures">
          <CardVoidFissures :fissures="Fissures" :platform="this.$store.state.activeplatform"/>
        </div>
      </v-flex>
      <v-flex xs12 md5 lg3>
        <div v-if="Invasions">
          <CardInvasions :invasions="Invasions" :platform="this.$store.state.activeplatform"/>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// @ is an alias to /src.
import gql from "graphql-tag";
import CardAlerts from "@/components/CardAlerts.vue";
import CardNews from "@/components/CardNews.vue";
import CardSyndicate from "@/components/CardSyndicate.vue";
import CardDailyReset from "@/components/CardDailyReset.vue";
import CardDayNight from "@/components/CardDayNight.vue";
import CardDarvoDeals from "@/components/CardDarvoDeals.vue";
import CardSortie from "@/components/CardSortie.vue";
import CardVoidFissures from "@/components/CardVoidFissures.vue";
import CardInvasions from "@/components/CardInvasions.vue";

var _ = require("lodash");

import moment from "moment";
import firebase from "~/plugins/firebase.js";

export default {
  props: ["test", "dark1"],
  name: "home",
  components: {
    CardAlerts,
    CardNews,
    CardSyndicate,
    CardDailyReset,
    CardDayNight,
    CardDarvoDeals,
    CardSortie,
    CardVoidFissures,
    CardInvasions
  },
  data() {
    return {
      tstamp: "0",
      platform: this.$store.state.activeplatform,
      Alerts: {},
      News: {},
      messaging: undefined,
      SyndicateMissions: {},
      Cycles: {},
      time1: moment().unix(),
      error: 0,
      test2: [],
      synload: false
    };
  },
  async mounted() {
    const messaging = firebase.messaging();
    messaging.usePublicVapidKey(
      "BAaOEFckzfxBDeDCLzlW23dvue4I5NEw0CKXmv87XpnHrrJE5z0JnEyHa4pbf2C8wKpYHtfy8f-Ngqe_yEwjGuA"
    );
    navigator.serviceWorker
      .register(`/vue-wf/firebase-messaging-sw.js`)
      .then(registration => {
        messaging.useServiceWorker(registration);
        messaging
          .requestPermission()
          .then(function() {
            messaging
              .requestPermission()
              .then(() => firebase.messaging().getToken())
              .then(token => {
                console.log(token); // Receiver Token to use in the notification
              })
              .catch(function(err) {
                console.log("Unable to get permission to notify.", err);
              });
            messaging.onMessage(function(payload) {
              console.log("Message received. ", payload);
              // [START_EXCLUDE]
              // Update the UI to include the received message.
              // Customize notification here
              var notificationTitle = "Foreground Message Title";
              var notificationOptions = {
                body: "Foreground Message body.",
                image: payload.data.image
              };
              if (!("Notification" in window)) {
                console.log(
                  "This browser does not support system notifications"
                );
              }
              // Let's check whether notification permissions have already been granted
              else if (Notification.permission === "granted") {
                // If it's okay let's create a notification
                var notification = new Notification(
                  notificationTitle,
                  notificationOptions
                );
                notification.onclick = function(event) {
                  event.preventDefault(); // prevent the browser from focusing the Notification's tab
                  notification.close();
                };
              }
              // [END_EXCLUDE]
            });
          })
          .catch(function(err) {
            console.log("Unable to get permission to notify.", err);
          });
      });
    //console.log(this.messaging);
    this.time1 = moment().unix();
    //this.$apollo.queries.News.refresh();
    //this.$apollo.queries.dayNightCycle.refresh();
    this.interval = setInterval(
      function() {
        this.time1 = moment().unix();
      }.bind(this),
      60000 // 60secs
    );
  },
  computed: {
    myObjVals: function() {
      return this.$store.state.activeplatform;
    }
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
          platform: this.$store.state.activeplatform
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
        query SyndicateMissions(
          $expiry_gte: Int
          $platform: String
          $syndicate: String
          $syndicate2: String
        ) {
          SyndicateMissions(
            where: {
              expiry_gte: $expiry_gte
              platform: $platform
              OR: [{ syndicate: $syndicate }, { syndicate: $syndicate2 }]
            }
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
          expiry_gte: this.time1,
          platform: this.$store.state.activeplatform,
          syndicate: "Ostrons",
          syndicate2: "Solaris United"
        };
      },
      // Variables: deep object watch
      deep: true,
      result({ data }) {
        this.synload = false;
        this.SyndicateMissions = _.groupBy(data.SyndicateMissions, "syndicate");
        this.test2.length = 0;
        var v1 = Object.keys(this.SyndicateMissions);
        for (var i = 0; i < v1.length; i++) {
          this.test2.push(v1[i]);
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
        query DailyDeals($expiry_gte: Int, $platform: String) {
          DailyDeals(where: { expiry_gte: $expiry_gte, platform: $platform }) {
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
          expiry_gte: this.time1,
          platform: this.$store.state.activeplatform
        };
      },
      // Variables: deep object watch
      deep: true,
      update(data) {
        return data.DailyDeals[0];
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
    Sortie: {
      query: gql`
        query Sortie($expiry_gte: Int, $platform: String) {
          Sortie(where: { expiry_gte: $expiry_gte, platform: $platform }) {
            SortieId
            activation
            expiry
            rewardPool
            variants
            boss
            faction
          }
        }
      `,
      // Reactive parameters
      variables() {
        // Use vue reactive properties here
        return {
          expiry_gte: this.time1,
          platform: this.$store.state.activeplatform
        };
      },
      // Variables: deep object watch
      deep: true,
      update(data) {
        return data.Sortie;
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
    Fissures: {
      query: gql`
        query Fissures($expiry_gte: Int, $platform: String) {
          Fissures(where: { expiry_gte: $expiry_gte, platform: $platform }) {
            FissureId
            platform
            activation
            expiry
            node
            missionType
            enemy
            tier
            tierNum
          }
        }
      `,
      // Reactive parameters
      variables() {
        // Use vue reactive properties here
        return {
          expiry_gte: this.time1,
          platform: this.$store.state.activeplatform
        };
      },
      // Variables: deep object watch
      deep: true,
      update(data) {
        return data.Fissures;
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
    Invasions: {
      query: gql`
        query Invasions($completed: Boolean, $platform: String) {
          Invasions(where: { completed: $completed, platform: $platform }) {
            InvasionId
            platform
            activation
            node
            desc
            attackerRewardItem
            attackerRewardCount
            attackerRewardThumb
            attackerRewardCredits
            attackingFaction
            defenderRewardItem
            defenderRewardCount
            defenderRewardThumb
            defenderRewardCredits
            defendingFaction
            vsInfestation
            completion
            completed
          }
        }
      `,
      // Reactive parameters
      variables() {
        // Use vue reactive properties here
        return {
          completed: false,
          platform: this.$store.state.activeplatform
        };
      },
      // Variables: deep object watch
      deep: true,
      update(data) {
        return data.Invasions;
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
      update(data) {
        console.log(data.dayNightCycle[0]);
        return data.dayNightCycle[0];
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
