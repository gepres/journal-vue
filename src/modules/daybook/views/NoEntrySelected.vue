<template>
  <div class="d-flex justify-content-center">
    <h1 class="align-self-center">
      no ha nada selecionado
    </h1>
  </div>
  <Fab icon="fa-plus" />
</template>

<script>
import { defineAsyncComponent } from '@vue/runtime-core'
export default {
   name:'NoEntrySelected',
    components: {
    Fab: defineAsyncComponent(() => import('@/modules/daybook/components/FabComponent.vue'))
  }
}
</script>

<style lang="scss" scoped>
div {
  height: 100%;
}
</style>