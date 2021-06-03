import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { CityManager } from '../modules/city-manager.js';
import {test} from '/modules/test-json.js'
import { get } from '/modules/requests.js'


let MANAGER;
let CITY_ID;

const loader = new GLTFLoader();

const hideLoadScreen = () => {
  let loading = document.querySelector('#loading')
  loading.style.opacity = 0;
  loading.style.pointerEvents = "none";
}


const urlParams = new URLSearchParams(window.location.search);
CITY_ID = urlParams.get('city');

// the gltf loader operated with a callback,
// therfore mostly everything operates within that callback
loader.load(
  '/assets/blocks.glb',
  (gltf) => {
    get(CITY_ID).then(data => {
      console.log(data);
      let city = {};
      if (! data.data ) {
        window.location.href = '/';
        return;
      }
      if (data.data.cityData) city = data.data.cityData;
      MANAGER = new CityManager(city, gltf, false);

      document.querySelector('#edit').onclick = () => {
        window.location.href = '/edit?city=' + CITY_ID;
      }

      hideLoadScreen();
    })
  }
)
