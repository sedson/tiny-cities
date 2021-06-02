import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { CityManager } from '../modules/city-manager.js';
import ColorWidget from '../modules/color-widget.js'


let SELECTED_COLOR = 'background';
let MANAGER;
let COLOR_PICKER;


// loops over element's siblings and deselects them,
// leaving only the click targer with the selected class
const select = (elem) => {
  elem.classList.remove('selected');
  let sibling = elem.parentNode.firstElementChild;
  while (sibling) {
    sibling.classList.remove('selected');
    sibling = sibling.nextElementSibling;
  }
  elem.classList.add('selected');
}


// adds all the units from the citymanager to the
// gui so that they can be selected
const initUnitList = () => {
  const unitList = document.querySelector('#unit-list')
  Object.keys(MANAGER.units).forEach( (unit, index) => {
    const li = document.createElement('li');
    li.innerText = unit;
    li.classList.add('option');
    if (index === 0) li.classList.add("selected");
    li.onclick = () => {
      MANAGER.setActiveUnit(unit);
    }
    unitList.appendChild(li);
  })
}



const hideLoadScreen = () => {
  let loading = document.querySelector('#loading')
  loading.style.opacity = 0;
  loading.style.pointerEvents = "none";
}


// Set up the color picker

const initColorPicker = () => {
  COLOR_PICKER = new ColorWidget();

  COLOR_PICKER.setColor(MANAGER.city.colors.background);

  COLOR_PICKER.onchange = (color) => {
    MANAGER.setColor(SELECTED_COLOR, color);
  }
}


const initListItems = () => {
  for (let elem of document.querySelectorAll('.widget li')) {
    elem.addEventListener('click', e => {
      select(e.target);
    })
  }
}

const initColorSelectors = () => {
  for (let elem of document.querySelectorAll('.color-select')) {
    elem.addEventListener('click', e => {
      const key = e.target.innerText.toLowerCase();
      COLOR_PICKER.setColor(MANAGER.city.colors[key])
      SELECTED_COLOR = key;
    })
  }
}

const updateFog = (e) => {
  e.target.nextElementSibling.innerText = e.target.value;
  MANAGER.setFog({
    start: document.querySelector('#fog-start').value,
    end: document.querySelector('#fog-end').value
  })
}

const initFogControls = () => {
  let start = document.querySelector('#fog-start');
  start.addEventListener('input', updateFog);
  start.value = MANAGER.city.fog.start;
  start.nextElementSibling.innerText = start.value;


  let end = document.querySelector('#fog-end');
  end.addEventListener('input', updateFog);
  end.value = MANAGER.city.fog.end;
  end.nextElementSibling.innerText = end.value;
}



console.log(window.location.search)

const loader = new GLTFLoader();

// the gltf loader operated with a callback,
// therfore mostly everything operates within that callback
loader.load(
  '/assets/blocks.glb',
  (gltf) => {
    MANAGER = new CityManager({}, gltf, true);
    initUnitList();
    initColorPicker();
    initColorSelectors();
    initListItems();
    initFogControls();
    hideLoadScreen();
  }
)
