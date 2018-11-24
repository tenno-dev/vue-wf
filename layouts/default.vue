<template>
  <v-app :dark="this.$store.state.darkMode">
    <v-toolbar app fixed :clipped-left="clipped">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn icon @click="switchdarkmode()" v-model="this.$store.state.darkMode">
        <v-icon v-html="dark ? 'mdi-weather-sunny' : 'mdi-weather-night'"></v-icon>
      </v-btn>
      <v-toolbar-title>
        <span v-if="this.$route.path =='/'">Warframe Status</span>
        <span v-else>Warframe Info</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu :nudge-width="100">
        <v-toolbar-title slot="activator">
          <v-select
            flat
            dark
            type="button"
            :value="$store.state.activeplatform"
            :items="$store.state.platform"
            item-text="Tag"
            item-value="short"
            @input="changeplatform2"
            single-line
          ></v-select>
        </v-toolbar-title>
      </v-menu>
    </v-toolbar>
    <v-navigation-drawer v-model="drawer" clipped stateless fixed app disable-resize-watcher>
      <v-list>
        <v-list-tile value="true" v-for="(item, i) in items" :key="i">
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <router-link :to="item.link">
              <v-list-tile-title v-text="item.title"></v-list-tile-title>
            </router-link>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <nuxt/>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2018</span>
    </v-footer>
  </v-app>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      loading: true,
      errored: false,
      clipped: true,
      drawer: false,
      fixed: false,
      dark: this.$store.state.counter,
      items1: null,
      platforms: ["pc", "ps4", "xb1", "swi"],
      items: [
        {
          icon: "mdi-chart-bubble",
          title: "Home",
          link: "/"
        },
        {
          icon: "mdi-chart-bubble",
          title: "Patchelogs",
          link: "/Patches"
        }
      ],
      miniVariant: false,
      platform: "pc",
      platformname: "PC",
      title: "Warframe Status",
      test: this.$vuetify.breakpoint
    };
  },
  mounted() {
    // this.loadItemData();
  },
  methods: {
    changeplatform2(val) {
      console.log(val);
      this.$store.commit("setplatform", val);
    },
    switchdarkmode() {
      var x = !this.$store.state.darkMode;
      this.$store.commit("darkmodeswitch", x);
    },
    changeplatform: function(plat) {
      if (plat == "pc") {
        this.platform = "pc";
        this.platformname = "PC";
      } else if (plat == "ps4") {
        this.platform = "ps4";
        this.platformname = "PS 4";
      } else if (plat == "swi") {
        this.platform = "swi";
        this.platformname = "Switch";
      } else {
        this.platform = "xb1";
        this.platformname = "Xbox";
      }
    }
  }
};
</script>
