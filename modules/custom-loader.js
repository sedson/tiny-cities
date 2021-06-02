
import { MeshLambertMaterial, MeshBasicMaterial } from 'three';

const def = new MeshLambertMaterial({color: 0xffffff})

class CustomLoader {
  constructor() {
    this.loader = new GLTFLoader();
  }

  load(filePath, blockData, materials) {
    this.loader.load(
      filePath,
      function (gltf) {
        parseGLTF(gltf, blockData, materials);
        // scene.add(gltf.scene)
        // callback(parsedData);
      },

    );
  }


}


function parseGLTF(gltf, blockData, materials) {
  console.log(materials)
  gltf.scene.children.forEach(item => {
    item.position.set(0,0,0);
    if (item.children.length > 0) {
      for (let child of item.children) {
        child.material = materials[child.material.name.toLowerCase()] || materials.main;
      }
    } else {
      item.material = materials[item.material.name.toLowerCase()] || materials.main;
    }

    blockData[item.name] = item;
  })
}


export { CustomLoader }
