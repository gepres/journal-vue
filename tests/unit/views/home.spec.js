import { shallowMount } from "@vue/test-utils"
import home from '@/views/HomeView'

describe('Pruebas en el home view', () => {
  test('debe de renderizat el componente correctamente', () => {
    const wrapper = shallowMount(home)
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('hacer Click en un boton debe de redireccionar a no-entry', () => {
    const mockRouter = {
      push: jest.fn()
    }

    const wrapper = shallowMount(home, {
      global:{
        mocks: {
          $router: mockRouter
        }
      }
    })
    wrapper.find('button').trigger('click')
    expect(mockRouter.push).toHaveBeenCalled()
    expect(mockRouter.push).toHaveBeenCalledWith({name: 'no-entry'})
  })
})