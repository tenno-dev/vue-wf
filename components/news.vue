<template>
  <div class="w-full h-auto  rounded border-transparent">
    <div
      class="font-bold text-primary text-4xl px-4 pt-4 bg-transparent sm:px-6"
    >
      News
    </div>
    <div class="border-transparent text-default">
      <div v-if="!news[0]" class="text-primary ">
        <div
          class="border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong class="font-bold">No News today</strong>
        </div>
      </div>
      <vueper-slides
        v-else
        :fixed-height="true"
        fade
        infinite
        :touchable="true"
        :slide-ratio="0.3"
      >
        <vueper-slide
          v-for="(slide, i) in news"
          :key="i"
          :image="'https://cdn.warframestat.us/o_webp/' + slide.Image"
        >
          <template v-slot:content>
            <div
              class="vueperslide__content-wrapper bg-transparent absolute bottom-0 inset-x-0"
            >
              <div class="vueperslide__title -mt-8 text-xl">
                {{ slide.Message }}
              </div>
              <a
                class="text-primary"
                rel="noreferrer"
                target="_blank"
                :href="slide.URL"
                >Posted:
                <span class="number-col">{{ formattime2(slide.Date) }}</span></a
              >
            </div>
          </template>
        </vueper-slide>
      </vueper-slides>
    </div>
  </div>
</template>
<style>
.number-col {
  font-family: 'Roboto', sans-serif !important;
}

.vueperslides--fixed-height {
  @apply bg-transparent;

  height: 52vh;
}

.vueperslide {
  @apply bg-transparent;

  background-repeat: no-repeat !important;
  background-size: contain !important;
}

.vueperslide__content-wrapper {
  @apply bg-newsbox;
  @apply my-0;

  height: 33% !important;
  width: 100%;
  top: 80% !important;
  bottom: 0 !important;
}

@media (min-width: 120px) {
  .vueperslides--fixed-height {
    @apply bg-transparent;

    height: 26vh;
  }

  .vueperslide__content-wrapper {
    @apply bg-newsbox;
    @apply my-0;

    margin-bottom: 0% !important;
    height: 35% !important;
    width: 100%;
    top: 66% !important;
    bottom: 0% !important;
  }
}

@media (min-width: 520px) {
  .vueperslide__content-wrapper {
    @apply bg-newsbox;
    @apply my-0;

    height: 22% !important;
    width: 100%;
    top: 55% !important;
    bottom: 0% !important;
  }
}

@media (min-width: 1024px) {
  .vueperslides--fixed-height {
    @apply bg-transparent;

    height: 35vh;
  }

  .vueperslide__content-wrapper {
    @apply bg-newsbox;
    @apply my-0;

    height: 21% !important;
    width: 100%;
    top: 75% !important;
    bottom: 0 !important;
  }
}

@media (min-width: 1224px) {
  .vueperslide__content-wrapper {
    @apply bg-newsbox;
    @apply my-0;

    height: 36% !important;
    width: 100%;
    top: 85% !important;
    bottom: 0 !important;
  }
}

.vueperslides__bullets {
  bottom: -16px !important;
}

.vueperslide__content {
  @apply text-primary;

  width: 100%;
  font-size: 16px;
  font-weight: 600;
}

.vueperslide__title {
  @apply text-primary;

  font-size: 18px;
  font-weight: 700;
}
</style>
<script>
// In your VueJS component.
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'
import moment from 'moment'

export default {
  name: 'News',
  components: { VueperSlides, VueperSlide },
  // eslint-disable-next-line
  props: ['news'],
  methods: {
    formattime2(prop) {
      prop = prop / 1
      const x = moment(prop).format('DD[.]MM[.]YYYY  HH:mm')
      // const x = moment(prop).fromNow()
      return x
    }
  }
}
</script>
