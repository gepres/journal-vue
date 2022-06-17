import {createStore} from 'vuex'
import journal from '@/modules/daybook/store/journal';
import { journalState } from '../../../../mock-data/test-journal-state';

const createVuexStore = (initialState) => createStore({
  modules: {
    journal: {
      ...journal,
      state: {...initialState}
    }
  }
})

describe('Vuex - Pruebas e el Journal', ()  => {

  test('este es el estado inicial, debe de tener este state', () => {
    const store = createVuexStore(journalState)
    const {isLoading, entries} = store.state.journal
    expect(isLoading).toBeFalsy()
    expect(entries).toEqual(journalState.entries)
  });


  // mutations
  test('mutation: setEntries', () => {
    const store = createVuexStore({isLoading: true, entries:[]})

    store.commit('journal/setEntries', journalState.entries)

    expect(store.state.journal.entries.length).toBe(2)
    expect(store.state.journal.isLoading).toBeFalsy()
  });


  test('mutation: updateEntry', () => {
    // create store con entries
    const store = createVuexStore(journalState)

    // updatedEntry
    const updatedEntry = {
      id: '123asdfghjkl',
      date: 1653604972821,
      text: 'hola mundo'
    }

    // commit de la mutation
    store.commit('journal/updateEntry', updatedEntry)
    const storeEntries = store.state.journal.entries
    // expects
    // entries.length = 2
    expect(storeEntries.length).toBe(2)

    // entries tiene q existir updatedEntry toEqual
    expect(storeEntries.find(e => e.id === updatedEntry.id)).toEqual(updatedEntry)

  });

  test('mutation: addEntry deleteEntry', () => {
    // crear el store
    const store = createVuexStore(journalState)

    // addEntry
    store.commit('journal/addEntry', {id: 'ABC-123', text: 'hola mundo'})

    const stateEntries = store.state.journal.entries
    //expects
    // entrada sean 3
    expect(stateEntries.length).toBe(3)

    // entrada con el id ABC-123 exista
    expect(stateEntries.find(e => e.id === 'ABC-123')).toBeTruthy()

    // deleteEntry 'ABC-123'
    store.commit('journal/deleteEntry','ABC-123')
    // expects
    // entrada deben de ser 2
    expect(store.state.journal.entries.length).toBe(2)
    //  entrada con el id ABC-123 no debe existir
    expect(store.state.journal.entries.find(e => e.id === 'ABC-123')).toBeFalsy()
  });


  // Getters
  test('getters: getEntriesByTerm, GetEntryById', () => {
    const store = createVuexStore(journalState)
    const [entry1, entry2] = journalState.entries
    expect(store.getters['journal/getEntriesByTerm']('').length).toBe(2)
    expect(store.getters['journal/getEntriesByTerm']('comoestas').length).toBe(1)

    expect(store.getters['journal/getEntriesByTerm']('comoestas')).toEqual([entry2])

    expect(store.getters['journal/GetEntryById'](entry1.id)).toEqual(entry1)

  });

  // Actions
  test('actions loadEntries',async () => {
    const store = createVuexStore({isLoading: true, entries:[]})
    await store.dispatch('journal/loadEntries')
    expect(store.state.journal.entries.length).toBe(4)
  });

  test('actions updateEntry',async () => {
    const store = createVuexStore(journalState)
    const updateEntry = {
      id: '123asdfghjkl',
      date: 1653604972821,
      text: 'hola mundo',
      otroCampo: true,
      otroMas: {a:1}
    }
    await store.dispatch('journal/updateEntry',updateEntry )
    expect(store.state.journal.entries.length).toBe(2)
    expect(store.state.journal.entries.find(e => e.id === updateEntry.id)).toEqual({ id: '123asdfghjkl',
    date: 1653604972821,
    text: 'hola mundo'})
  });

  test('actions createEntry, deleteEntry', async () => {
    // createStore
    const store = createVuexStore(journalState)
    const newEntry = {date:'98789872312', text:'nueva entrada desde las pruebas'}
    // dispatch de la accion createEntry
    // obtener el id de la nueva entrada
    const {id} = await store.dispatch('journal/createEntry',newEntry )
    // el id debe de ser un string
    expect(typeof id).toBe('string')
    // la nueva entrada debe de existir en el state.journal.entries...
    expect(store.state.journal.entries.find(e => e.id === id)).toBeTruthy()


    // #Segunda parte
    // dispatch deleteEntry
    await store.dispatch('journal/deleteEntry',id )
     // la nueva entrada NO debe de existir en el state.journal.entries...
     expect(store.state.journal.entries.find(e => e.id === id)).toBeFalsy()
  });

})