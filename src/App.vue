<template>
  <v-app :dark="dark">
    <v-toolbar app fixed :clipped-left="clipped">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn icon @click.stop="dark = !dark">
        <v-icon v-html="dark ? 'mdi-weather-sunny' : 'mdi-weather-night'"></v-icon>
      </v-btn>
      <v-toolbar-title>
        <span v-if="this.$route.path =='/'">Warframe Status</span>
        <span v-else>Warframe Info</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu :nudge-width="100">
        <v-toolbar-title slot="activator">
          <span>{{this.platformname}}</span>
        </v-toolbar-title>
        <v-list>
          <v-list-tile :v-model="platform" @click="changeplatform('pc')">
            <v-list-tile-title>Pc</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="changeplatform('ps4')">
            <v-list-tile-title>Ps4</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="changeplatform('xb1')">
            <v-list-tile-title>Xbox</v-list-tile-title>
          </v-list-tile>
        </v-list>
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
      <router-view :test="this.platform" :dark1="this.dark" :items1="this.items1"/>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2017</span>
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
      dark: true,
      items1: null,
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
    changeplatform: function(plat) {
      // console.log(plat)
      if (plat == "pc") {
        this.platform = "pc";
        this.platformname = "PC";
      } else if (plat == "ps4") {
        this.platform = "ps4";
        this.platformname = "PS 4";
      } else {
        this.platform = "xb1";
        this.platformname = "Xbox";
      }
    }
  }
};
</script>