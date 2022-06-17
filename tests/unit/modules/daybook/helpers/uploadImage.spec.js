import 'setimmediate'
import cloudinary from 'cloudinary';
import uploadImage from "@/modules/daybook/helpers/uploadImage";
import axios from "axios";

cloudinary.v2.config({
  cloud_name: 'gepres',
  api_key: '394632552148947',
  api_secret: 'sROstwHlcVdfKsEd3taQ7Jg3WSo'
})


describe('Pruebas en el helper uploadImage', () => {

  test('debe de cargar un archivo y retornar el url', async () => {
    const {data} = await axios.get('https://res.cloudinary.com/gepres/image/upload/v1653608096/journal-vue/mvkw0srtpeh8d3ijdazl.jpg',{
      responseType: 'arraybuffer'
    })
    const file = new File([data], 'foto.jpg')

    const url = await uploadImage(file)
    expect(typeof url).toBe('string')

    const segments = url.split('/')
    const imageId = segments[segments.length - 1].replace('.jpg','')

    await cloudinary.v2.api.delete_resources(`journal-vue/${imageId}`,{},
      () =>{});
  },30000);


})