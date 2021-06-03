import { index, post } from '/modules/requests.js';

console.log(44);

document.querySelector('#new').onclick = () =>{
  post().then(data => {
    window.location.href = `/edit?city=${data._id}`
  })
}

index().then(data => {
  console.log(data)
  const gallery = document.querySelector('.gallery');
  data.data.forEach((item, i) => {
    if(item.cityData){
      const card = document.createElement('a');
      card.classList.add('card');
      card.href = `/view?city=${item._id}`
      console.log(item)
      const bg = item.cityData.colors.background;
      const a = item.cityData.colors.ambient;

      card.style.background =  `linear-gradient(${bg}, ${a})`
      gallery.appendChild(card);
    }

  });

})
