<template lang="pug">
.resources
  .resources__wrapper
    ResourcesConsole.resources__content
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import ResourcesConsole from '@/components/ResourcesConsole.vue'

export default defineComponent({
  components: { ResourcesConsole }
})
</script>

<style lang="stylus" scoped>
.resources
  display: flex
  background-color: lightgray
  &__wrapper
    display: flex
    flex-direction: column
  &__content
    flex: 1
    width: 750px
    border-right: 1px solid gray
</style>
