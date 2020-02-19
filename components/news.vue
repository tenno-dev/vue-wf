<template>
  <div class="w-full h-auto  rounded overflow-hidden border-transparent">
    <div
      class="font-bold text-primary text-4xl text-center mt-1 bg-transparent"
    >
      News
    </div>
    <div class=" bg-netransparentwsbox border-transparent text-default">
      <div v-if="!news[0]" class="text-primary ">
        <div
          class="bg-transparent border border-red-400 text-red-700 px-4 py-3 rounded relative"
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
              class="vueperslide__content-wrapper bg-transparent absolute bottom-0 mb-2 inset-x-0"
              style="height:23%;"
            >
              <div class="vueperslide__title -mt-8">
                {{ slide.Message }}
              </div>
              <a class="text-primary" target="_blank" :href="slide.URL"
                >Posted: {{ formattime2(slide.Date) }}</a
              >
            </div>
          </template>
        </vueper-slide>
      </vueper-slides>
    </div>
  </div>
</template>
<style>
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
  @apply bg-transparent;
  @apply my-0;
  width: 100%;
  top: 80% !important;
  bottom: 0 !important;
}
@media (min-width: 1024px) {
  .vueperslide__content-wrapper {
    @apply bg-transparent;
    @apply my-0;
    width: 100%;
    top: 80% !important;
    bottom: 0 !important;
  }
}
@media (min-width: 1224px) {
  .vueperslide__content-wrapper {
    @apply bg-transparent;
    @apply my-0;
    width: 100%;
    top: 80% !important;
    bottom: 0 !important;
  }
}

@media (min-width: 120px) {
  .vueperslide__content-wrapper {
    @apply bg-newsbox;
    @apply my-0;
    width: 100%;
    top: 86% !important;
    bottom: 0% !important;
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
