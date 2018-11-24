<template>
  <v-card style="width: 100%;">
    <v-responsive>
      <hr style="height:10px; visibility:hidden;">
      <p class="headline mb-0 text-xs-center" style="text-align: center!important">News</p>
      <v-carousel :height="360" hide-delimiters>
        <v-carousel-item v-for="item in this.news" :key="item.id">
          <v-card :dark="dark1" :light="light1" flat>
            <v-img :src="item.imageLink" height="200px" contain></v-img>
            <v-card-title primary-title>
              <div>
                <div class="headline">{{item.message}}</div>
                <hr style="height:10px; visibility:hidden;">
                <span>Posted: {{formattime2(item.date)}}</span>
                <br>
                <span>
                  More Infos:
                  <a :href="item.link" target="_blank">Click</a>
                </span>
              </div>
            </v-card-title>
          </v-card>
        </v-carousel-item>
      </v-carousel>
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
  props: ["news", "dark"],
  data() {
    return {
      timeremain: null,
      start: null,
      dark1: null,
      light1: null
    };
  },
  methods: {
    formattime2: function(prop) {
      var x = moment.unix(prop).format("dd[, ]DD[.]MMM YYYY HH:mm");
      return x;
    },
    formattime: function(prop) {
      var x = prop.hours + "h " + prop.minutes + "m " + prop.seconds + "s";
      return x;
    },
    planetname: function(prop) {
      return prop.match(/\((.*?)\)/);
    },
    nodename: function(prop) {
      return prop.split(" (");
    },
    darkswitch: function() {
      return this.dark1;
    },
    lightswitch: function() {
      return this.light1;
    },
    sortByKey(array, key) {
      return array.sort(function(a, b) {
        var x = a[key];
        var y = b[key];
        return x < y ? -1 : x > y ? 1 : 0;
      });
    }
  },
  watch: {
    "$store.state.darkMode": {
      handler: function(val) {
        if (val == true) {
          this.dark1 = true;
          this.light1 = false;
        } else {
          this.dark1 = false;
          this.light1 = true;
        }
      }
    }
  },
  mounted() {
    if (this.$store.state.darkMode == true) {
      this.dark1 = true;
      this.light1 = false;
    } else {
      this.dark1 = false;
      this.light1 = true;
    }
  }
};
</script>