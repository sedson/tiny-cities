import { index, post } from '/modules/requests.js';

console.log(44);

document.querySelector('#new').onclick = () =>{
  post().then(data => {
    window.location.href = `/edit?city=${data._id}`
  })
}

index().then(data => {

  const gallery = document.querySelector('.gallery');
  data = data.data.filter(x => x.cityData);
  console.log(data);
  for (let i = 0; i< Math.min(data.length, 5); i++){
    const item = data[i];
    const card = document.createElement('a');
    card.classList.add('card');
    card.href = `/view?city=${item._id}`
    console.log(item)
    const bg = item.cityData.colors.background;
    const a = item.cityData.colors.ambient;
    const title = document.createElement('span');
    title.innerText = item.title;
    card.appendChild(title);


    gallery.appendChild(card);
  }

})
