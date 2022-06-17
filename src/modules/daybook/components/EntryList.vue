<template>
  <div class="entry-list-container">
    <div class="px-2 pt-2">
      <input 
        v-model="term"
        type="text" 
        class="form-control"
        placeholder="Buscar entrada"
        />
    </div>
    <div class="mt-2 d-flex flex-column">
      <button @click="$router.push({name: 'entry', params: {id: 'new'}})" class="btn btn-primary mx-3">
        <i class="fa fa-plus-circle"></i>
        Nueva entrada
      </button>
    </div>
    <div class="entry-scrollarea">
      <Entry v-for="item in entriesByTerm" :key="item.id" :entry="item" />
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from '@vue/runtime-core'
import { mapGetters } from 'vuex'
export default {
  name:'EntryList',
    components: {
    Entry: defineAsyncComponent(() => import('@/modules/daybook/components/EntryComponent.vue'))
  },
  data() {
    return {
      term: ''
    }
  },
  computed:{
    ...mapGetters({
      list: 'journal/getEntriesByTerm',
    }),
    entriesByTerm(){
      return this.list(this.term)
    }
  },
}
</script>

<style lang="scss" scoped>
input {
  height: 25px;
}
.entry-list-container{
  border-right: 1px solid #2c3e50;
  height: calc(100vh - 56px);
}
.entry-scrollarea{
  height: calc(100vh - 110px);
  overflow: scroll;
}
</style>