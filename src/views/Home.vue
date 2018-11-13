<template>
  <div class="home">
  <v-tabs fixed-tabs>

      <v-tab
        key="1"
        ripple
      > PC</v-tab>
            <v-tab
        key="2"
        ripple
      >XBox</v-tab>
                  <v-tab
        key="3"
        ripple
      >PS4</v-tab>
            <v-tab-item
        key="1"
      >
      <div>
    <ApolloQuery
  :query="require('../graphql/Alerts.gql')"
  :variables="{ Expiry_gte:1542146730 , platform: 'pc' }"
>
  <template slot-scope="{ result: { loading, error, data } }">
    <!-- Loading -->
    <div v-if="loading" class="loading apollo">Loading...</div>

    <!-- Error -->
    <div v-else-if="error" class="error apollo">An error occured</div>

    <!-- Result -->
    <div v-else-if="data" class="result apollo">{{ data.hello }}
        <v-flex xs12 sm6 offset-sm3>

             <div   v-for="alert in data.Alerts"  :key="alert.index">
                     <v-card>
        <v-img
          :src=alert.MissionRewardImg
          aspect-ratio="2.75"
        ></v-img>
            {{alert.alertid}}<br>
            {{alert.Expiry}}<br>
            {{alert.MissionType}}<br>
            {{alert.MissionFaction}}<br>
            {{alert.MissionLocation}}<br>
            {{alert.MissionRewardItem}}<br>
            {{alert.MissionRewardCredits}}<br>
           {{alert.MissionRewardImg}}<br>
            {{alert.MissionMinEnemyLvl}}<br>
            {{alert.MissionMaxEnemyLevel}}<br>
            {{alert.MissionNightmareMode}}<br>
            {{alert.MissionAchwingRequired}}<br>
                     </v-card>
<br><br>
             </div>
        </v-flex></div>
  </template>
</ApolloQuery></div> </v-tab-item>
      <v-tab-item
        key="2"
      >
      <div>
    <ApolloQuery
  :query="require('../graphql/Alerts.gql')"
  :variables="{ Expiry_gte:1542146730 , platform: 'xb1' }"
>
  <template slot-scope="{ result: { loading, error, data } }">
    <!-- Loading -->
    <div v-if="loading" class="loading apollo">Loading...</div>

    <!-- Error -->
    <div v-else-if="error" class="error apollo">An error occured</div>

    <!-- Result -->
    <div v-else-if="data" class="result apollo">{{ data.hello }}
        <v-flex xs12 sm6 offset-sm3>

             <div   v-for="alert in data.Alerts"  :key="alert.index">
                     <v-card>
        <v-img
          :src=alert.MissionRewardImg
          aspect-ratio="2.75"
        ></v-img>
            {{alert.alertid}}<br>
            {{alert.Expiry}}<br>
            {{alert.MissionType}}<br>
            {{alert.MissionFaction}}<br>
            {{alert.MissionLocation}}<br>
            {{alert.MissionRewardItem}}<br>
            {{alert.MissionRewardCredits}}<br>
           {{alert.MissionRewardImg}}<br>
            {{alert.MissionMinEnemyLvl}}<br>
            {{alert.MissionMaxEnemyLevel}}<br>
            {{alert.MissionNightmareMode}}<br>
            {{alert.MissionAchwingRequired}}<br>
                     </v-card>
<br><br>
             </div>
        </v-flex></div>
  </template>
</ApolloQuery></div>
      </v-tab-item>
           <v-tab-item
        key="3"
      >
      <div>
    <ApolloQuery
  :query="require('../graphql/Alerts.gql')"
  :variables="{ Expiry_gte:1542146730 , platform: 'ps4' }"
>
  <template slot-scope="{ result: { loading, error, data } }">
    <!-- Loading -->
    <div v-if="loading" class="loading apollo">Loading...</div>

    <!-- Error -->
    <div v-else-if="error" class="error apollo">An error occured</div>

    <!-- Result -->
    <div v-else-if="data" class="result apollo">{{ data.hello }}
        <v-flex xs12 sm6 offset-sm3>

             <div   v-for="alert in data.Alerts"  :key="alert.index">
                     <v-card>
        <v-img
          :src=alert.MissionRewardImg
          aspect-ratio="2.75"
        ></v-img>
            {{alert.alertid}}<br>
            {{alert.Expiry}}<br>
            {{alert.MissionType}}<br>
            {{alert.MissionFaction}}<br>
            {{alert.MissionLocation}}<br>
            {{alert.MissionRewardItem}}<br>
            {{alert.MissionRewardCredits}}<br>
           {{alert.MissionRewardImg}}<br>
            {{alert.MissionMinEnemyLvl}}<br>
            {{alert.MissionMaxEnemyLevel}}<br>
            {{alert.MissionNightmareMode}}<br>
            {{alert.MissionAchwingRequired}}<br>
                     </v-card>
<br><br>
             </div>
        </v-flex></div>
  </template>
</ApolloQuery></div>
      </v-tab-item>
    </v-tabs>

    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  components: {
    HelloWorld
  },
  data() {
    return {
      tstamp: "0",
      Alerts: {},
      error: 0
    };
  }
};
</script>
