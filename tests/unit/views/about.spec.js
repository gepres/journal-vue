import { shallowMount } from "@vue/test-utils"
import About from '@/views/AboutView'

describe('Pruebas en el about view', () => {
  test('debe de renderizat el componente correctamente', () => {
    const wrapper = shallowMount(About)
    expect(wrapper.html()).toMatchSnapshot()
  })
})