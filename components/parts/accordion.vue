<template>
  <article class="wrap__accordion items-center pl-2 pr-4 py-2 border-b">
    <div class="title__accordion">
      <a href="#" @click.prevent="active = !active">
        <slot name="title" />
        <span v-if="active">&#9650;</span>
        <span v-else>&#9660;</span>
      </a>
    </div>
    <div v-show="active" class="content__accordion">
      <slot name="content" />
    </div>
  </article>
</template>

<script>
export default {
  name: 'Accordion',
  props: {
    title: {
      type: String,
      default: ''
    },
    happy: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      active: false
    }
  }
}
</script>
