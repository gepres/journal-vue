import axios from 'axios'

const journalApi = axios.create({
  baseURL: 'https://journal-vue-bd4aa-default-rtdb.firebaseio.com'
})

export default journalApi