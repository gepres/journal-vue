<template>
  <template v-if="entry && !loading">
    <div class="entry-title d-flex justify-content-between p-2">
      <div>
        <span class="text-success fs-3 fw-bold">{{day}}</span>
        <span class="mx-1 fs-3">{{month}}</span>
        <span class="mx-2 fs-4 fw-light">{{yearDay}}</span>
      </div>
      <div>
        <input v-show="false" ref="imageSelector" type="file" @change="onSelectedImage($event)" accept="image/*">
        <button v-if="entry.id" @click="onDeleteEntry" class="btn btn-danger mx-2">
          Borrar
          <i class="fa fa-trash-alt mx-1" />
        </button>
        <button @click="onSelectImage"  class="btn btn-primary">
          Subir foto
          <i class="fa fa-upload mx-1" />
        </button>
      </div>
    </div>
    <hr>
    <div class="d-flex flex-column px-3 h-75">
      <textarea v-model="entry.text" placeholder="¿ Que sucedio hoy?"></textarea>
    </div>
    <!-- <img class="img-thumbnail" src="https://www.solofondos.com/wp-content/uploads/2015/04/Fondos-de-paisajes.jpg" alt="paisaje"> -->
     <img v-if="entry.picture && !localImage" class="img-thumbnail" :src="entry.picture" alt="">
    <img v-if="localImage" class="img-thumbnail" :src="localImage" alt="">
  </template>
  <Loading v-if="loading" />
  <Fab v-if="!loading" icon="fa-save" @fabClick="saveEntry" />
</template>

<script>
import { defineAsyncComponent } from '@vue/runtime-core'
import { mapGetters, mapActions } from 'vuex'
import Swal from 'sweetalert2'
import getDayMothYear from '../helpers/getDayMothYear'
import uploadImage from '../helpers/uploadImage'
export default {
  name:'entryView',
  props:{
    id: {
      type: String,
      required: true
    }
  },
  components: {
    Fab: defineAsyncComponent(() => import('@/modules/daybook/components/FabComponent.vue')),
    Loading: defineAsyncComponent(() => import('@/modules/shared/components/loading.vue'))
  },
  data () {
    return {
      entry:null,
      loading: false,
      localImage: null,
      file: null
    }
  },  
  created(){
    this.loadEntry()
  },
  watch:{
    id(){
      this.loadEntry()
    }
  },
  methods: {
    ...mapActions({
      updateEntry: 'journal/updateEntry',
      createEntry: 'journal/createEntry',
      deleteEntry: 'journal/deleteEntry'
    }),
    loadEntry(){
      let entry
      if(this.id === 'new'){
        entry = {
          text: '',
          date: new Date().getTime()
        }
      }else{
        entry = this.GetEntryById(this.id)
        if(!entry) return this.$router.push({name:'no-entry'})
        this.localImage = entry.picture
      }
      
      this.entry = entry
    },
   async saveEntry (){
     this.loading = true
     Swal.fire({
       title: 'Espere por favor',
       allowOutsideClick: false
     })
     Swal.showLoading()
     const picture = await uploadImage(this.file)
     this.entry.picture = picture
     if(this.entry.id){
        await this.updateEntry({...this.entry})
     } else {
      //  crear una nueva entra
      const {id} = await this.createEntry({...this.entry})
        this.$router.push({name: 'entry', params: {id}})
     }

     this.loading = false
     this.file = null
     Swal.fire('Guardado', 'Entrada registrada con éxito','success')
    },
    async onDeleteEntry() {
      console.log('se llamo aqui');
      this.loading = true
      const {isConfirmed} = await Swal.fire({
        title: '¿ Está seguro ?',
        text: 'una ves borrado no se puede recuperar',
        showDenyButton: true,
        confirmButtonText: 'Si, estoy seguro'
      })
      console.log(isConfirmed);
      if(isConfirmed) {
        Swal.fire({
          title: 'Espere por favor',
          allowOutsideClick: false
        })
        Swal.showLoading()
        console.log('apúnto de eliminar');
        await this.deleteEntry(this.entry.id)
        this.loading = false
        this.$router.push({name: 'no-entry'})
        Swal.fire('Eliminado', '', 'success')
      } else {
        this.loading = false
      }
    },
    onSelectedImage($event) {
      const file = $event.target.files[0]
      if (!file) {
        this.localImage = null
         this.file = null
        return
      } 
      this.file = file
      const fr = new FileReader()
      fr.onload = () => this.localImage = fr.result
      fr.readAsDataURL(file)
    },
    onSelectImage() {
      this.$refs.imageSelector.click()
    }
  },
  computed: {
    ...mapGetters({
      GetEntryById: 'journal/GetEntryById',
    }),
    day(){
      const {day} = getDayMothYear(this.entry.date)
      return day
    },
    month(){
      const {month} = getDayMothYear(this.entry.date)
      return month
    },
    yearDay() {
      const {yearDay} = getDayMothYear(this.entry.date)
      return yearDay
    }
  },
}
</script>

<style lang="scss" scoped>
textarea{
  font-size: 20px;
  border:none;
  height: 100%;
  &:focus{
    outline: none;
  }
}
img{
  width: 200px;
  position: fixed;
  bottom: 150px;
  right: 20px;
  box-shadow:0px 5px 10px rgba($color:#000, $alpha: 0.2);
}
</style>