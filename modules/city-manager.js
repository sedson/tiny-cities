import * as THREE from 'three';
import { SceneSkeleton } from './scene-skeleton.js';
import { City } from './city.js'
import { makeGround, makeGrid } from './geometry-helpers.js'
import CustomRaycaster from './raycaster.js'
import {test} from './test-json.js';

const whiteMaterial = new THREE.MeshLambertMaterial({color: 'white'});
const yellowMaterial = new THREE.MeshBasicMaterial({color: 'yellow'});

const UNIT_HEIGHT = 0.2;

const camParams = {
  fov: 18,
  near: 0.1,
  far: 1000
}

class CityManager {
  constructor(cityData, gltfData, editMode = false) {

    // Load the units from the asset file

    // initializae the scene
    this.scene = new SceneSkeleton(camParams, editMode);

    // a grid of IDs to manage store data for deleting units
    this.unitIDs = {};

    // array of objects to raycast against
    this.raycastObjects = [];

    this.city = new City(cityData);

    this.editorState = "build"

    // create materials from the city data colors
    this.materials = {
      main: new THREE.MeshLambertMaterial({color: this.city.colors.main}),
      foliage: new THREE.MeshBasicMaterial({color: this.city.colors.foliage}),
      accent: new THREE.MeshBasicMaterial({color: this.city.colors.accent}),
    }

    this.units = parseGLTF(gltfData, this.materials);


    this.activeUnit = 'Basic';

    // builds the city from data

    for (let block of Object.values(this.city.blocks)) {
      const { x, z } = block.position;

      block.units.forEach((item, i) => {
        const y = i * UNIT_HEIGHT;
        const u = this.units[item];
        if (u) this.buildUnitMesh(u, x, y, z);
      })
    }


    this.scene.setFog(this.city.fog);
    this.setColor('background', this.city.colors.background);
    this.setColor('ambient', this.city.colors.ambient);

    this.raycaster = new CustomRaycaster(this.scene);
    this.activePoint = [0,0];


    const ground = makeGround(300, this.materials.main);
    this.scene.add(ground);
    this.raycastObjects.push(ground);

    if (editMode) this.scene.add(makeGrid(this.city.size));

    this.previewMat = new THREE.MeshBasicMaterial({color: 'lawngreen', fog: false, transparent: true, opacity: 0.4})
    this.previewer = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1, 1),
      this.previewMat

    );

    this.previewer.rotation.set(- Math.PI / 2, 0, 0)

    if (editMode) this.scene.add(this.previewer);


    if (editMode) {
      this.scene.subscribe(() => {
        this.activePoint = (this.raycaster.raycast(this.raycastObjects, this.city.size));
        if (this.activePoint) {
          const block = this.city.getBlock(this.activePoint.x, this.activePoint.z);
          if (block) this.previewer.position.set(block.position.x, 0.01, block.position.z)
        } else {
          this.previewer.position.set(0, -10, 0)
         }

      })

      this.scene.renderer.domElement.onpointerdown = (e) => {
        if (e.button === 2){
          this.previewer.visible = false
        }
      }

      this.scene.renderer.domElement.onpointerup = (e) => {
        if (e.button === 2){
          this.previewer.visible = true
        }
      }
      this.scene.renderer.domElement.addEventListener('click', () => {
        if (this.activePoint) {
          const block = this.city.getBlock(this.activePoint.x, this.activePoint.z);
          if (block) {
            this.addUnitHandler(this.activeUnit, block)
          }
        }
      })



      document.addEventListener('keydown', (event) => {
        console.log(event.keyCode);
        if(event.keyCode === 8) {

          this.unstackBlock();
        } else if (event.keyCode === 83) {
          console.log(JSON.stringify(this.city, null, 3))
        }
      })

    }
  }


  //
  buildUnitMesh(unit, x, y, z) {

    const clone = unit.clone();
    clone.position.set(x, y, z);

    // update the memory object for units that can be deleted
    if ( ! this.unitIDs[`${x}, ${z}`]) {
      this.unitIDs[`${x}, ${z}`] = [clone.id];
    } else {
      this.unitIDs[`${x}, ${z}`].push(clone.id);
    }

    // add to raycast array
    this.raycastObjects.push(clone);

    // add to threeJS scene
    this.scene.add(clone);

  }

  addUnitHandler(unitName, block) {
    const unit = this.units[unitName];
    const {x, z} = block.position;
    const y = block.units.length * UNIT_HEIGHT;
    if (unit) {
      this.buildUnitMesh(unit, x, y, z);
      block.units.push(unitName);
    }


  }

  unstackBlock(){
    if (this.activePoint) {
      const block = this.city.getBlock(this.activePoint.x, this.activePoint.z);
      const {x, z} = block.position;
      block.units.pop();
      if (this.unitIDs[`${x}, ${z}`]) {
        const deleteId = this.unitIDs[`${x}, ${z}`].pop();
        this.scene.removeObject(deleteId);
        this.raycastObjects = this.raycastObjects.filter(x => x.id !== deleteId)
      }
    }
  }

  setColor(colorName, colorValue) {
    this.city.colors[colorName] = colorValue;
    const col = new THREE.Color(colorValue);

    if (colorName === "background") {
      this.scene.setBackground(col);
      this.scene.setFog({color: col});
      return;
    }

    if (colorName === 'ambient') {
      this.scene.setAmbient(col);
    }

    if (this.materials[colorName]) {
      this.materials[colorName].color.set(col);
    }
  }

  setFog(params) {
    this.city.fog.start = params.start;
    this.city.fog.end = params.end;
    this.scene.setFog(params);


  }

  setActiveUnit(unit) {
    this.activeUnit = unit;
  }

}

// Loops over the GLTF data imported from blender,
// and resets the transform, and applies proper materials
// returns an object containing the protypes for
// each unit
function parseGLTF(gltf, materials){
const units = {};
  gltf.scene.children.forEach(item => {

    item.position.set(0,0,0);
    if (item.children.length > 0) {
      for (let child of item.children) {
        child.material = materials[child.material.name.toLowerCase()] || materials.main;
      }
    } else {
      item.material = materials[item.material.name.toLowerCase()] || materials.main;
    }

    units[item.name] = item;
  })
  return units;
}


export { CityManager }
