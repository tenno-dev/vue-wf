<template>
  <v-app :dark="this.$store.state.darkMode">
    <v-toolbar app fixed :clipped-left="clipped">
      <v-toolbar-side-icon @click.stop="drawer = !drawer" />
      <v-btn v-model="this.$store.state.darkMode" icon @click="switchdarkmode()">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <v-icon v-html="dark ? 'mdi-weather-sunny' : 'mdi-weather-night'" />
      </v-btn>
      <v-toolbar-title>
        <span v-if="this.$route.path ==='/'">Warframe Status</span>
        <span v-else>Warframe Info</span>
      </v-toolbar-title>
      <v-spacer />
      <v-menu :nudge-width="100">
        <v-toolbar-title slot="activator">
          <v-select
            flat
            type="button"
            :value="$store.state.activeplatform"
            :items="$store.state.platform"
            item-text="Tag"
            item-value="short"
            single-line
            @input="changeplatform2"
          />
        </v-toolbar-title>
      </v-menu>
    </v-toolbar>
    <v-navigation-drawer v-model="drawer" clipped stateless fixed app disable-resize-watcher>
      <v-list>
        <v-list-tile v-for="(item, i) in items" :key="i" value="true">
          <v-list-tile-action>
            <!-- eslint-disable-next-line vue/no-v-html -->
            <v-icon v-html="item.icon" />
          </v-list-tile-action>
          <v-list-tile-content>
            <router-link :to="item.link">
              <v-list-tile-title v-text="item.title" />
            </router-link>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <nuxt />
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2018</span>
    </v-footer>
  </v-app>
</template>
<script>
export default {
  name: 'App',
  data() {
    return {
      loading: true,
      errored: false,
      clipped: true,
      drawer: false,
      fixed: false,
      dark: this.$store.state.counter,
      items1: null,
      platforms: ['pc', 'ps4', 'xb1', 'swi'],
      items: [
        {
          icon: 'mdi-chart-bubble',
          title: 'Home',
          link: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Patchelogs',
          link: '/Patches'
        }
      ],
      miniVariant: false,
      platform: 'pc',
      platformname: 'PC',
      title: 'Warframe Status',
      test: this.$vuetify.breakpoint
    }
  },
  mounted() {
    // this.loadItemData();
  },
  methods: {
    changeplatform2(val) {
      this.$store.commit('setplatform', val)
    },
    switchdarkmode() {
      const x = !this.$store.state.darkMode
      this.$store.commit('darkmodeswitch', x)
    },
    changeplatform: function(plat) {
      if (plat === 'pc') {
        this.platform = 'pc'
        this.platformname = 'PC'
      } else if (plat === 'ps4') {
        this.platform = 'ps4'
        this.platformname = 'PS 4'
      } else if (plat === 'swi') {
        this.platform = 'swi'
        this.platformname = 'Switch'
      } else {
        this.platform = 'xb1'
        this.platformname = 'Xbox'
      }
    }
  }
}
</script>
