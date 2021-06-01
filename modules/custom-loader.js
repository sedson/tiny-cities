import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshLambertMaterial, MeshBasicMaterial } from 'three';

const def = new MeshLambertMaterial({color: 0xffffff})

class CustomLoader {
  constructor() {
    this.loader = new GLTFLoader();
  }

  load(filePath, blockData) {
    this.loader.load(
      filePath,
      function (gltf) {
        parseGLTF(gltf, blockData);
        // scene.add(gltf.scene)
        // callback(parsedData);
      },

    );
  }


}


function parseGLTF(gltf, blockData) {
  gltf.scene.children.forEach(item => {
    item.position.set(0,0,0);
    item.material = def;
    blockData[item.name] = item;
  })
}


export { CustomLoader }
