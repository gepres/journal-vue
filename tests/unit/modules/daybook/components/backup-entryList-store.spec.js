import { createStore } from "vuex";
import EntryList from '@/modules/daybook/components/EntryList'
import { getEntriesByTerm } from '@/modules/daybook/store/journal/getters'
import {journalState} from '../../../mock-data/test-journal-state'
import { shallowMount } from "@vue/test-utils";


describe('Pruebas en el EntryList', () => {
  const journalMockModule = {
    namespaced: true,
    getters: {
      getEntriesByTerm
    },
    state: () => ({
      isLoading: false,
      entries: journalState.entries
    })
  }

  const store = createStore({
    modules: {
      journal: {...journalMockModule}
    }
  })

  const wrapper = shallowMount(EntryList,{
    global: {
      mocks: {

      },
      plugins:[store]
    }
  })

  test('debe de llamar el getEntriesByTerm sin termino y mostrar 2 entradas', () => {
    console.log(wrapper.html());
  });
})