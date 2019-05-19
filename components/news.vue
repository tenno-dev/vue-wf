<template>
  <div
    class=" max-w-lg md:max-w-md   sm:max-w-sm h-auto rounded overflow-hidden  border-transparent"
  >
    <div class="font-bold  text-default text-4xl mt-1 bg-transparent ">
      News
    </div>
    <div class="bg-bgnew  text-default  pb-1">
      <vueper-slides
        v-if="news"
        :fixed-height="true"
        fade
        infinite
        :touchable="true"
        :slide-ratio="0.3"
      >
        <vueper-slide
          v-for="(slide, i) in news"
          :key="i"
          :image="
            'https://cdn.warframestat.us/o_webp,rs_760_fit/' + slide.Image
          "
          :title="slide.Message"
          ><div slot="slideContent">
            <a target="_blank" :href="slide.URL"
              >Posted: {{ formattime2(slide.Date) }}</a
            >
          </div>
        </vueper-slide>
      </vueper-slides>
    </div>
  </div>
</template>
<style>
.vueperslides--fixed-height {
  @apply h-64;
}
.vueperslide__content-wrapper {
  background-color: rgba(64, 64, 64, 0.829) !important;
  width: 100%;
  top: 74% !important;
  bottom: 0% !important;
  left: 50% !important;
  right: 50% !important;
}
.vueperslides__bullets {
  bottom: -16px !important;
}
.vueperslide__content {
  width: 100%;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  background-color: rgba(64, 64, 64, 0.829) !important;
}
.vueperslide__title {
  font-size: 18px;
  font-weight: 700;
  color: #fff;
}
</style>
<script>
// In your VueJS component.
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'

import moment from 'moment'

// Since v. 1.6.0, you need to include Vueper Slides CSS file for default styles.
export default {
  name: 'News',
  components: { VueperSlides, VueperSlide },
  props: ['news'],
  methods: {
    formattime2: function(prop) {
      prop = prop / 1
      const x = moment(prop).format('DD[.]MM[.]YYYY  HH:mm')
      // const x = moment(prop).fromNow()
      return x
    }
  }
}
</script>
