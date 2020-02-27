<template>
  <nav x-data="{ open: true }" class="bg-gray-800">
    <div class=" mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <button
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white transition duration-150 ease-in-out"
            @click="opennav = !opennav"
          >
            <svg
              class="h-6 w-6"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                :class="{ hidden: opennav, 'inline-flex': !opennav }"
                class=""
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path
                :class="{ hidden: !opennav, 'inline-flex': opennav }"
                class=""
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div
          class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start"
        >
          <div class="flex-shrink-0">
            <img
              class="block lg:hidden h-8 w-auto"
              src="/img/logos/workflow-mark-on-dark.svg"
              alt=""
            />
            <img
              class="hidden lg:block h-8 w-auto"
              src="/img/logos/workflow-logo-on-dark.svg"
              alt=""
            />
          </div>
          <div
            class="pr-2 py-2 rounded-md text-md font-medium leading-5 text-white focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
          >
            Warframe Info Tracker
          </div>
          <div class="hidden sm:block sm:ml-6">
            <div class="flex">
              <a
                href="#"
                class="px-3 py-2 rounded-md text-sm font-medium leading-5 text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
                >Home</a
              >
            </div>
          </div>
        </div>
        <div
          class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
        >
          <div class="ml-3 relative flex" x-data="{ open: false }">
            <div class="hidden sm:block py-3">
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
            <div class="hidden sm:block py-3">
              <v-select
                class="w-auto number-col"
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
                </template>
              </v-select>
            </div>
            <div class=" py-3 hidden sm:block">
              <v-select
                :value="$store.state.activeplatform"
                class="w-auto number-col"
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
            <div
              v-show="open"
              x-transition:enter="transition ease-out duration-100"
              x-transition:enter-start="transform opacity-0 scale-95"
              x-transition:enter-end="transform opacity-100 scale-100"
              x-transition:leave="transition ease-in duration-75"
              x-transition:leave-start="transform opacity-100 scale-100"
              x-transition:leave-end="transform opacity-0 scale-95"
              class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg"
            >
              <div class="py-1 rounded-md bg-white shadow-xs">
                <a
                  href="#"
                  class="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                  >Your Profile</a
                >
                <a
                  href="#"
                  class="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                  >Settings</a
                >
                <a
                  href="#"
                  class="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                  >Sign out</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div :class="{ block: opennav, hidden: !opennav }" class="sm:hidden">
      <div class="px-2 pt-2 pb-3">
        <a
          href="#"
          class="block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
          >Home</a
        >
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
        <v-select
          :value="$store.state.activeplatform"
          class="text-primary"
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
        <v-select
          class="text-primary"
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
          </template>
        </v-select>
      </div>
    </div>
  </nav>
  <!-- <nav class=" flex items-center flex-wrap bg-navbar px-2 py-2">
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
  </nav> -->
</template>

<style>
.number-col {
  font-family: 'Roboto', sans-serif !important;
  max-width: 14rem !important;
  min-width: 9rem !important;
}

.vs__dropdown-menu {
  max-width: auto !important;
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
      opennav: false,
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
