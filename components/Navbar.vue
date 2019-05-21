<template>
  <nav class="flex items-center flex-wrap bg-navbar">
    <div class="flex items-center flex-no-shrink text-white mr-6">
      <span class="font-semibold text-xl tracking-tight"
        >Warframe Info Hub</span
      >
    </div>
    <div class="flex flex-grow" v-on:click="setDarkmode($store.state.darkmode)">
      <fa v-if="!$store.state.darkmode" icon="moon" fixed-width /><fa
        v-else
        icon="sun"
        fixed-width
        :style="{
          color: 'white'
        }"
      />
    </div>
    <div class="block sm:hidden mr-4">
      <button
        class="flex items-center px-3 py-2 border rounded text-teal-lighter border-teal-light hover:text-white hover:border-white"
        @click="toggle"
      >
        <svg
          class="fill-current h-3 w-3"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </button>
    </div>
    <div
      :class="open ? 'block' : 'hidden'"
      class="w-full flex-grow sm:flex sm:items-center sm:w-auto"
    >
      <div class="text-sm sm:flex-grow"></div>
      <div class="w-32 mr-1">
        <v-select
          :value="$store.state.activeplatform"
          :searchable="false"
          :clearable="false"
          :v-model="$store.state.activeplatform"
          :options="$store.state.platform"
          @input="setSelectedplatform"
        >
          <template slot="option" slot-scope="option">
            <span class="-ml-2 mr-1"
              ><fa :icon="option.icon" fixed-width
            /></span>
            {{ option.label }}
          </template>
          <template slot="selected-option" slot-scope="option">
            <span class=" mr-1"><fa :icon="option.icon" fixed-width/></span>
            {{ option.label }}
          </template></v-select
        >
      </div>
      <div class="w-40">
        <v-select
          :value="$store.state.activelang"
          :searchable="false"
          :clearable="false"
          :v-model="$store.state.activelang"
          :options="$store.state.lang"
          @input="setSelectedlang"
        >
          <template slot="option" slot-scope="option">
            <span class="-ml-2 mr-1"
              ><lang-flag :iso="option.short" :squared="false"
            /></span>
            {{ option.label }}
          </template>
          <template slot="selected-option" slot-scope="option">
            <span class=" mr-1"
              ><lang-flag :iso="option.short" :squared="false"
            /></span>
            {{ option.label }}
          </template>
        </v-select>
      </div>
    </div>
  </nav>
</template>

<style>
.vs__dropdown-menu {
  max-width: 10rem !important;
  min-width: 10rem !important;
}
</style>

<script>
import 'vue-select/dist/vue-select.css'

export default {
  data() {
    return {
      open: false,
      selected: ''
    }
  },
  methods: {
    toggle() {
      this.open = !this.open
    },
    setSelectedlang(value) {
      this.$store.commit('setlang', value)
    },
    setDarkmode(value) {
      value = !value
      this.$store.commit('darkmodeswitch', value)
    },
    setSelectedplatform(value) {
      this.$store.commit('setplatform', value)
    }
  }
}
</script>
