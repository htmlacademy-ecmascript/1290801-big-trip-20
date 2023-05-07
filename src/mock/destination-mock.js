const destinationMock = [
  {
    'id': 'b8bbe9a6-9fde-4713-930b-8105ed8decbb',
    'description': 'Barcelona - with a beautiful old town',
    'name': 'Barcelona',
    'pictures': [
      {
        'src': 'https://20.objects.pages.academy/static/destinations/1.jpg',
        'description': 'Barcelona with a beautiful old town'
      },
      {
        'src': 'https://20.objects.pages.academy/static/destinations/19.jpg',
        'description': 'Barcelona a true asian pearl'
      },
      {
        'src': 'https://20.objects.pages.academy/static/destinations/10.jpg',
        'description': 'Barcelona with an embankment of a mighty river as a centre of attraction'
      }
    ]
  },
  {
    'id': '0ac9df44-6b6d-4233-8d29-3e227a3e470f',
    'description': 'Moscow - with crowded streets',
    'name': 'Moscow',
    'pictures': [
      {
        'src': 'https://20.objects.pages.academy/static/destinations/18.jpg',
        'description': 'Moscow is a beautiful city'
      },
      {
        'src': 'https://20.objects.pages.academy/static/destinations/3.jpg',
        'description': 'Moscow with a beautiful old town'
      },
      {
        'src': 'https://20.objects.pages.academy/static/destinations/11.jpg',
        'description': 'Moscow a true asian pearl'
      },
      {
        'src': 'https://20.objects.pages.academy/static/destinations/3.jpg',
        'description': 'Moscow full of of cozy canteens where you can try the best coffee in the Middle East'
      },
      {
        'src': 'https://20.objects.pages.academy/static/destinations/9.jpg',
        'description': 'Moscow is a beautiful city'
      }
    ]
  },
  {
    'id': '115c1f07-f50e-4811-8b30-6e386023d457',
    'description': 'Helsinki - a perfect place to stay with a family',
    'name': 'Helsinki',
    'pictures': [
      {
        'src': 'https://20.objects.pages.academy/static/destinations/18.jpg',
        'description': 'Helsinki with crowded streets'
      }
    ]
  },
  {
    'id': '1ad0d08f-7172-4c3b-9fa1-5da21ea95bb2',
    'description': 'Geneva - full of of cozy canteens where you can try the best coffee in the Middle East',
    'name': 'Geneva',
    'pictures': [
      {
        'src': 'https://20.objects.pages.academy/static/destinations/5.jpg',
        'description': 'Geneva middle-eastern paradise'
      }
    ]
  },
  {
    'id': '8e1901ba-1e26-43fa-b740-95a8286ce345',
    'description': 'Vien - middle-eastern paradise',
    'name': 'Vien',
    'pictures': []
  }
];

function getDestination(id){
  return destinationMock.find((e) => e.id === id);
}

export {getDestination};
