import daybookRouter from "@/modules/daybook/router";

describe('Pruebas en el router modules', () => {
  test('el router debe de tener esta configuración', async () => {
    // console.log('daybookRouter',daybookRouter);
    expect(daybookRouter).toMatchObject({
      name:'daybook',
      component: expect.any(Function),
      children:[
        {
          path: '',
          name: 'no-entry',
          component: expect.any(Function)
        },
        {
          path: ':id',
          name: 'entry',
          component: expect.any(Function),
          props: expect.any(Function)
        },
      ]
    })

    const promisesRoutes = []
    daybookRouter.children.forEach(child => {
      promisesRoutes.push(child.component())
    });
    const routes = (await Promise.all(promisesRoutes)).map(r => r.default.name)

    expect(routes).toContain('entryView')
    expect(routes).toContain('NoEntrySelected')
  });

  test('debe de retornar el id de la ruta', () => {
    const route = {
      params: {
        id:'ABC-123'
      }
    }
    // expect(daybookRouter.children[1].props(route)).toEqual({id: 'ABC-123'})
    const entryRoute = daybookRouter.children.find(route => route.name === 'entry')
    expect(entryRoute.props(route)).toEqual({id: 'ABC-123'})
  });
})