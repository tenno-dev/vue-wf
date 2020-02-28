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
          <div
            class="hidden sm:block pr-2 py-2 rounded-md text-md font-medium leading-5 text-white focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
          >
            Warframe Info Hub
          </div>
          <div
            class="block sm:hidden pr-2 py-2 rounded-md text-md font-medium leading-5 text-white focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
          >
            Warframe Info Hub for
          </div>
          <span class="block sm:hidden flex pr-2 py-2">
            <fa
              :icon="$store.state.activeplatform.icon"
              fixed-width
              :style="{
                color: 'white'
              }"
          /></span>
          <div
            class="block sm:hidden pr-2 py-2 rounded-md text-md font-medium leading-5 text-white focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
          >
            in
          </div>
          <span class="block sm:hidden flex pr-2 py-2"
            ><lang-flag :iso="$store.state.activelang.short" :squared="false"
          /></span>
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
          <div class="relative flex">
            <div class="hidden sm:block py-3">
              <v-select
                class="w-auto number-col"
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
                  <span class="-ml-2 mr-1"
                    ><fa :icon="['fas', 'palette']" fixed-width
                  /></span>
                  {{ option.label }}
                </template>
                <template slot="selected-option" slot-scope="option">
                  <span class=" mr-1"
                    ><fa :icon="['fas', 'palette']" fixed-width
                  /></span>
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
                  <span class=" mr-1"
                    ><fa :icon="option.icon" fixed-width
                  /></span>
                  {{ option.label }}
                </template></v-select
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <transition
      enter-active-class="transform duration-150 ease-out"
      enter-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transform duration-100 ease-in"
      leave-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-show="opennav"
        class="origin-top-left left-0 w-full rounded-md shadow-lg z-40"
      >
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
              <span class=" mr-1"><fa :icon="option.icon" fixed-width/></span>
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
              <span class="-ml-2 mr-1"
                ><fa :icon="['fas', 'palette']" fixed-width
              /></span>
              {{ option.label }}
            </template>
            <template slot="selected-option" slot-scope="option">
              <span class=" mr-1"
                ><fa :icon="['fas', 'palette']" fixed-width
              /></span>
              {{ option.label }}
            </template>
          </v-select>
        </div>
      </div>
    </transition>
  </nav>
</template>

<style>
.number-col {
  font-family: 'Roboto', sans-serif !important;
  max-width: 14rem !important;
  min-width: 9rem !important;
}

.vs__dropdown-menu {
  max-width: 14rem !important;
  min-width: 14rem !important;

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
  mounted() {
    document.addEventListener('click', evt => {
      evt.stopPropagation()
      if (!this.$el.contains(evt.target)) {
        this.opennav = false
      }
    })
  },
  methods: {
    toggle() {
      this.open = !this.open
    },
    setSelectedlang(value) {
      this.$i18n.locale = value.short
      this.$store.commit('setlang', value)
      this.opennav = false
    },
    setSelectedplatform(value) {
      this.$store.commit('setplatform', value)
      this.opennav = false
    },
    setSelectedtheme(value) {
      this.$store.commit('settheme', value)
      this.opennav = false
    }
  }
}
</script>
