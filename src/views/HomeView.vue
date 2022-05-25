<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1>Hola mundo</h1>
    <button @click="goToDayBook" class="btn btn-primary">Primary</button>
    <button class="btn btn-secondary">Secundary</button>
    <button class="btn btn-success">Success</button>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  methods:{
    goToDayBook() {
      this.$router.push({name:'no-entry'})
    }
  }
}
</script>
