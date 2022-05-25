export default () => ({
  isLoading: true,
  entries: [
    {
      id: new Date().getTime(),
      date: new Date().toDateString(),
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus consectetur asperiores qui! Assumenda, eius, numquam adipisci fugiat qui neque nesciunt rem natus quisquam tempora officiis expedita dicta optio, nobis ab!',
      picture: null
    },
    {
      id: new Date().getTime()+1000,
      date: new Date().toDateString(),
      text: 'Lorem ipsum dolors expedita dicta optio, nobis ab!',
      picture: null
    },
    {
      id: new Date().getTime() + 2000,
      date: new Date().toDateString(),
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, aliquid? Eum nobis, enim natus quia praesentium ullam ipsum recusandae quibusdam est saepe harum cupiditate deserunt asperiores ratione nostrum temporibus similique eius ex quis libero maxime atque. Omnis delectus nisi itaque!',
      picture: null
    }
  ]
})
