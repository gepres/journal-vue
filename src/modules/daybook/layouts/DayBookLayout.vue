<template>
  <NavBar />
  <Loading v-if="isLoading" />
  <div v-else class="d-flex">
    <div class="col-4">
      <EntryList />
    </div>
    <div class="col">
      <router-view />
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from '@vue/runtime-core'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'dayBookLayout',
  components: {
    NavBar: defineAsyncComponent(() => import('@/modules/daybook/components/NavBar.vue')),
    EntryList: defineAsyncComponent(() => import('@/modules/daybook/components/EntryList.vue')),
    Loading: defineAsyncComponent(() => import('@/modules/shared/components/loading.vue'))
  },
  methods: {
    ...mapActions({
      loadEntries: 'journal/loadEntries'
    })
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.journal.isLoading
    })
  },
  async created(){
    await this.loadEntries()
  }
}
</script>

<style>

</style>