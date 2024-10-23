import { index } from '/modules/requests.js';



index().then(data => {
  const gallery = document.querySelector('#map');
  data = data.filter(x => x.cityData);
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    const node = document.createElement('a');
    node.classList.add('node');

    const nodeButton = document.createElement('div');
    nodeButton.classList.add('node-button');

    node.href = `/view?city=${item.id}`

    let { background, ambient } = item.cityData.colors;
    let gradient = `linear-gradient(${background}, ${ambient})`
    nodeButton.style.background = gradient;

    const title = document.createElement('p');
    title.classList.add('label');
    title.innerText = item.title;

    let s = 0;
    for (let i = 0; i < item.title.length; i++) {
      s += item.title.charCodeAt(i) * i;
    }
    s *= item.title.length * item.title.charCodeAt(0);
    let a = 337;
    let b = 733;
    console.log(s);
    node.style.top = ((s % a) / a) * 90 + 5 + '%';
    console.log(node.style.top)
    node.style.left = ((s % b) / b) * 90 + 5 + '%';

    node.appendChild(nodeButton);
    node.appendChild(title);


    gallery.appendChild(node);
  }

})
