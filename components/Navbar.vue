<template>
  <nav class="flex items-center flex-wrap bg-navbar px-2 ">
    <div class="flex items-center flex-no-shrink text-white mr-6">
      <span class="font-semibold text-xl tracking-tight"
        >Warframe Info Hub</span
      >
    </div>
    <div class="flex flex-grow" @click="setDarkmode($store.state.darkmode)">
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
        aria-label="Switch between Dark and Light theme"
        class="flex items-center px-3 py-2 border rounded text-teal-lighter border-teal-light hover:text-white hover:border-white"
        @click="toggle"
      >
        <fa icon="bars" fixed-width class="fill-current text-primary" />
      </button>
    </div>
    <div
      :class="open ? 'block' : 'hidden'"
      class="flex-grow sm:flex sm:items-center sm:w-auto"
    >
      <div class="text-sm sm:flex-grow"></div>
      <div class="mr-1 px-2 w-40">
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
              ><fa :icon="option.icon" fixed-width class="fill-current"
            /></span>
            {{ option.label }}
          </template>
          <template slot="selected-option" slot-scope="option">
            <span class=" mr-1 px-2"
              ><fa :icon="option.icon" fixed-width
            /></span>
            {{ option.label }}
          </template></v-select
        >
      </div>
      <div class="mr-1 px-2  w-40">
        <v-select
          class="text-primary "
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
  max-width: 9rem !important;
  min-width: 9rem !important;
}
.vs--single .vs__selected {
  @apply text-primary;
}
.vs__dropdown-menu {
  @apply bg-navbar;
  @apply text-primary;
}
.vs__open-indicator {
  @apply text-primary;

  @apply fill-current;
}
.vs__dropdown-option {
  @apply text-primary;
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
      // eslint-disable-next-line
      console.log(this.$i18n)
      this.$i18n.locale = value.short
      this.$store.commit('setlang', value)
    },
    setDarkmode(value) {
      value = !value
      this.$store.commit('darkmodeswitch', value)
    },
    setSelectedplatform(value) {
      // eslint-disable-next-line
      console.log(this.$i18n)
      this.$store.commit('setplatform', value)
    }
  }
}
</script>
