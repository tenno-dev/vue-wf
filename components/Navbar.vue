<template>
  <nav class=" flex items-center flex-wrap bg-navbar px-2 py-2">
    <div class="flex flex-shrink xs:flex-grow text-white mr-6">
      <span class="static font-semibold text-xl tracking-tight"
        >Warframe Info Hub</span
      >
    </div>
    <div class="sm:hidden static inset-y-0 right-0">
      <button
        aria-label="Open Nav drawer"
        class="flex items-center p-3 border rounded text-teal-lighter border-teal-light hover:text-white hover:border-white"
        @click="toggle"
      >
        <fa icon="bars" fixed-width class="fill-current text-primary" />
      </button>
    </div>
    <div
      :class="open ? 'block' : 'hidden'"
      class="flex-grow sm:flex sm:items-center sm:w-auto"
    >
      <div class="mr-1 px-2   w-full number-col">
        <v-select
          :value="$store.state.activetheme"
          :searchable="false"
          :clearable="false"
          :filterable="false"
          :v-model="$store.state.activetheme"
          :options="$store.state.theme"
          @input="setSelectedtheme"
        >
          <template slot="option" slot-scope="option">
            {{ option.label }}
          </template>
          <template slot="selected-option" slot-scope="option">
            {{ option.label }}
          </template></v-select
        >
      </div>
      <div class="mr-1 px-2 w-40 number-col">
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
      <div class="mr-1 px-2 pb-1  w-50 number-col">
        <v-select
          class="text-primary "
          :value="$store.state.activelang"
          :searchable="false"
          :clearable="false"
          :filterable="false"
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
.number-col {
  font-family: 'Roboto', sans-serif !important;
  max-width: 14rem !important;
  min-width: 9rem !important;
}

.vs__dropdown-menu {
  max-width: 11rem !important;
  min-width: 5rem !important;

  @apply pb-1;
  @apply bg-navbar;
  @apply text-primary;
}

.vs--single .vs__selected {
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
      this.$i18n.locale = value.short
      this.$store.commit('setlang', value)
    },
    setDarkmode(value) {
      value = !value
      this.$store.commit('darkmodeswitch', value)
    },
    setSelectedplatform(value) {
      this.$store.commit('setplatform', value)
    },
    setSelectedtheme(value) {
      this.$store.commit('themeswitch', value)
    }
  }
}
</script>
