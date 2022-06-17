import journalApi from "@/api/journalApi"

export const loadEntries = async ({commit}) => {
  const {data} = await journalApi.get('/entries.json')
  if(!data){
    commit('setEntries',[])
    return
  }
  const entries = []
  for (const id of Object.keys(data)) {
    entries.push({
      id,
      ...data[id]
    })
  }
  commit("setEntries",entries)
}

export const updateEntry = async ({commit},item) => {
  // quitar el id   delete item['id'];
  const { date, picture, text } = item
  const dataToSave = { date, picture, text }
  await journalApi.put(`/entries/${item.id}.json`,dataToSave)
  dataToSave.id = item.id
  commit('updateEntry',{...dataToSave})
}

export const createEntry = async ({commit}, item) => {
  const { date, picture, text } = item
  const dataToSave = { date, picture, text }
  const {data} = await journalApi.post(`/entries.json`,dataToSave)
  dataToSave.id = data.name
  commit('addEntry',dataToSave)
  return {id:data.name}
}

export const deleteEntry = async ({commit},id) => {
  await journalApi.delete(`/entries/${id}.json`)
  commit('deleteEntry',id)
}