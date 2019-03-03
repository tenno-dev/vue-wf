<!-- eslint-disable vue/html-closing-bracket-spacing -->
<!-- eslint-disable vue/mustache-interpolation-spacing --> 
<!-- eslint-disable vue/singleline-html-element-content-newline -->
<!-- eslint-disable vue/multiline-html-element-content-newline -->
<template>
  <v-card style="width: 100%;">
    <v-responsive>
      <hr style="height:10px; visibility:hidden;">
      <p class="headline mb-0 text-xs-center" style="text-align: center!important">News</p>
      <v-carousel flat :height="310" hide-delimiters>
        <v-carousel-item v-for="item in news" :key="item.ID">
          <v-card :dark="dark1" :light="light1" flat>
            <v-img :src="returnimgurl(item.Image)" height="200px" contain/>
            <v-card-title primary-title>
              <div>
                <div class=".subtitle-1 font-weight-bold">{{item.Message}}</div>
                <hr style="height:5px; visibility:hidden;">
                <span>Posted: {{formattime2(item.Date)}}</span>
                <br>
                <span>
                  More Infos:
                  <a :href="item.URL" target="_blank">Click</a>
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
import moment from 'moment'
export default {
  /* eslint-disable vue/require-prop-types */
  props: ['news', 'dark'],
  data() {
    return {
      timeremain: null,
      start: null,
      dark1: null,
      light1: null
    }
  },
  watch: {
    '$store.state.darkMode': {
      handler: function(val) {
        if (val === true) {
          this.dark1 = true
          this.light1 = false
        } else {
          this.dark1 = false
          this.light1 = true
        }
      }
    }
  },
  mounted() {
    if (this.$store.state.darkMode === true) {
      this.dark1 = true
      this.light1 = false
    } else {
      this.dark1 = false
      this.light1 = true
    }
  },
  methods: {
    formattime2: function(prop) {
      const x = moment(prop).format('dd[, ]DD[.]MMM YYYY HH:mm')
      return x
    },
    formattime: function(prop) {
      const x = moment(prop).format('X')
      const unix1 = moment(moment().diff(moment.unix(x))).valueOf()
      return moment(unix1).format('dd[, ]DD[.]MMM YYYY HH:mm')
    },
    planetname: function(prop) {
      return prop.match(/\((.*?)\)/)
    },
    nodename: function(prop) {
      return prop.split(' (')
    },
    darkswitch: function() {
      return this.dark1
    },
    lightswitch: function() {
      return this.light1
    },
    returnimgurl: function(prop) {
      const x = 'https://img.mybitti.de/o_webp/' + prop
      return x
    },
    sortByKey(array, key) {
      return array.sort(function(a, b) {
        const x = a[key]
        const y = b[key]
        return x < y ? -1 : x > y ? 1 : 0
      })
    }
  }
}
</script>
