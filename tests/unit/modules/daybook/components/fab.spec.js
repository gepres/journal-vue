import { shallowMount } from "@vue/test-utils"
import Fab from '@/modules/daybook/components/FabComponent.vue'

describe('Pruebas en el FAB component', () => {
  test('debe de mostrar el icono por defecto', () => {
    const warpper = shallowMount( Fab )
    const iTag = warpper.find('i')
    expect(iTag.classes('fa-plus')).toBeTruthy()
  })

  test('debe de mostrar el icono por argumento: fa-circle', () => {
    const warpper = shallowMount( Fab, {
      props: {
        icon: 'fa-circle'
      }
    } )
    const iTag = warpper.find('i')
    expect(iTag.classes('fa-circle')).toBeTruthy()

  })

  test('debe de emitir el evento on:click cuando se hace click', () => {
    const wrapper = shallowMount( Fab )
    wrapper.find('button').trigger('click')
    expect(wrapper.emitted('fabClick')).toHaveLength(1)
  })
})