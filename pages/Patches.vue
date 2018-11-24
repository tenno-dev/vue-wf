/* eslint-disable */
<template>
  <v-container
    style="width:100%;"
    v-bind:disabled="this.Patches"
    v-if="!$apollo.queries.Patchlogs.loading"
  >
    Debug: Patches loaded
    {{this.Patches.length}}
    <v-tabs dark color="cyan" show-arrows>
      <v-tab v-for="n in this.Tabcount" :key="n" ripple>
        <span v-if="n == 1">Log 1-{{ n + 1 * 50 }}</span>
        <span v-else>Log {{ (n - 1) * 50 + 1 }}-{{ n * 50 }}</span>
      </v-tab>
      <v-tab-item v-for="(n,index) in this.Patches" :key="index">
        <v-card flat>
          <v-expansion-panel>
            <v-expansion-panel-content v-for="(item,index) in n" :key="index">
              <div slot="header">
                Patchname: {{item.Name}}
                <br>
                Type: {{item.type}}
                <br>Forum Thread:
                <a :href="item.Url" target="_blank">Click here</a>
              </div>
              <v-card>
                <v-card-text>
                  Released on: {{formattime2(item.date)}}
                  <br>
                  <div>Changes
                    <div v-html="item.changes"></div>
                  </div>
                  <br>
                  <div>Additions
                    <div v-html="item.additions"></div>
                  </div>
                  <br>
                  <div>Fixes
                    <div v-html="item.fixes"></div>
                  </div>
                </v-card-text>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-container>
</template>

<script>
// @ is an alias to /src
import gql from "graphql-tag";
import moment from "moment";

export default {
  props: ["test", "dark1"],
  name: "home",
  components: {},
  data() {
    return {
      tstamp: "0",
      Patchlogs: {},
      Tabcount: 0,
      active: "",
      time1: 0,
      parsed: 0,
      error: 0,
      Patches: null,
      test2: [],
      synload: false
    };
  },
  methods: {
    formattime2: function(prop) {
      var x = moment.unix(prop).format("DD[.]MM[.]YYYY HH:mm");
      return x;
    },
    formatttext2: function(prop, prop2) {
      if (prop2) {
        var x = prop.replace(prop2, "<ul><li>");
        x = x.replace(/\n/g, "</li><li>");
        x = x.replace(/(<li><\/li>)/g, "");
        x = x.replace(/(<\/li><li>)\s*$/, "</ul>");
      } else {
        x = prop.replace(/\n/g, "</li><li>");
        x = x.replace(/(<li><\/li>)/g, "");
        x = x.replace(/(<\/li><li>)\s*$/, "</ul>");
      }
      return x;
    }
  },
  mounted() {},
  apollo: {
    // Advanced query with parameters
    // The 'variables' method is watched by vue
    Patchlogs: {
      query: gql`
        query Patchlogs {
          Patchlogs(orderBy: date_DESC) {
            Name
            fixes
            type
            Url
            imgUrl
            changes
            additions
            date
          }
        }
      `,
      // Variables: deep object watch
      deep: false,
      result({ data }) {
        this.parsed = 0;
        this.Patchlogs = data.Patchlogs;
        this.Tabcount = Math.ceil(data.Patchlogs.length / 50);
        function chunk(array, size) {
          const chunked_arr = [];
          let index = 0;
          while (index < array.length) {
            chunked_arr.push(array.slice(index, size + index));
            index += size;
          }
          return chunked_arr;
        }
        var patch1 = chunk(data.Patchlogs, 50);
        if (patch1.length == this.Tabcount) {
          this.Patches = patch1;
          this.parsed = 1;
        }
      },
      pollInterval: 0,

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
