import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { CityManager } from '../modules/city-manager.js';
import {test} from '/modules/test-json.js'


let MANAGER;

const loader = new GLTFLoader();
const city = JSON.parse(test);

const hideLoadScreen = () => {
  let loading = document.querySelector('#loading')
  loading.style.opacity = 0;
  loading.style.pointerEvents = "none";
}

// the gltf loader operated with a callback,
// therfore mostly everything operates within that callback
loader.load(
  '/assets/blocks.glb',
  (gltf) => {
    MANAGER = new CityManager(city, gltf, false);
    hideLoadScreen();
  }
)
