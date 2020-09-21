<template>
  <div class="w-full h-auto border-transparent rounded">
    <div
      class="px-4 pt-4 text-4xl font-bold bg-transparent text-primary sm:px-6"
    >
      News
    </div>
    <div class="border-transparent text-default">
      <div v-if="!news[0]" class="text-primary">
        <div
          class="relative px-4 py-3 text-red-700 border border-red-400 rounded"
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
        lazy
        lazy-load-on-drag
        :touchable="true"
        slide-image-inside
        :slide-ratio="0.3"
      >
        <vueper-slide
          v-for="(slide, i) in news"
          :key="i"
          :image="getPathFromUrl(imgproxy + slide.Image)"
        >
          <template v-slot:content>
            <div
              class="absolute inset-x-0 bottom-0 bg-transparent vueperslide__content-wrapper"
            >
              <div class="-mt-6 text-xl vueperslide__title">
                {{ slide.Message }}
              </div>
              <a
                class="vueperslide__title text-primary"
                rel="noreferrer"
                target="_blank"
                :href="slide.URL"
                >Posted:
                <span class="vueperslide__title2 number-col">{{
                  formattime2(slide.Date)
                }}</span></a
              >
            </div>
          </template>
        </vueper-slide>
      </vueper-slides>
    </div>
  </div>
</template>
<style>
.vueperslide__image {
  @apply bg-contain;
  @apply bg-no-repeat;
}

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
  .vueperslide__title {
    @apply text-primary;
    @apply text-left;

    font-size: 13px !important;
    font-weight: 700;
  }

  .vueperslide__title2 {
    @apply text-primary;

    font-size: 13px !important;
  }

  .vueperslides--fixed-height {
    @apply bg-transparent;

    height: 24vh;
  }

  .vueperslide__content-wrapper {
    @apply bg-newsbox;
    @apply my-0;

    margin-bottom: 0% !important;
    height: 40% !important;
    width: 100%;
    top: 66% !important;
    bottom: 0% !important;
  }
}

@media (min-width: 520px) {
  .vueperslide__content-wrapper {
    @apply bg-newsbox;
    @apply my-0;

    height: 36% !important;
    width: 100%;
    top: 55% !important;
    bottom: 0 !important;
  }

  .vueperslide__title {
    @apply text-primary;
    @apply text-left;

    font-size: 14px !important;
    font-weight: 700;
  }

  .vueperslide__title2 {
    @apply text-primary;

    font-size: 14px !important;
  }
}

@media (min-width: 1024px) {
  .vueperslides--fixed-height {
    @apply bg-transparent;

    height: 35vh;
  }

  .vueperslide__title {
    @apply text-primary;
    @apply text-left;

    font-size: 18px !important;
    font-weight: 700;
  }

  .vueperslide__title2 {
    @apply text-primary;

    font-size: 18px !important;
  }

  .vueperslide__content-wrapper {
    @apply bg-newsbox;
    @apply my-0;

    height: 28% !important;
    width: 100%;
    top: 75% !important;
    bottom: 0 !important;
  }
}

@media (min-width: 1280px) {
  .vueperslide__content-wrapper {
    @apply bg-newsbox;
    @apply my-0;

    height: 32% !important;
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
  data() {
    return {
      imgproxy: 'https://img.tenno.dev/o_webp/'
    }
  },
  methods: {
    formattime2(prop) {
      prop = prop / 1
      const x = moment(prop).format('DD[.]MM[.]YYYY  HH:mm')
      // const x = moment(prop).fromNow()
      return x
    },
    getPathFromUrl(url) {
      // eslint-disable-next-line no-unused-vars
      const url1 = url.split(/[?#]/)[0]
      const url2 = url.split(/[?#]/)[1]
      if (url2) {
        url = url1 + '%3F' + escape(url2)
      }
      // eslint-disable-next-line no-console
      console.log(url1)
      return url
    }
  }
}
</script>
