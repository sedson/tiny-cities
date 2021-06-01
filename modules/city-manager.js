import * as THREE from 'three';
import { SceneSkeleton } from './scene-skeleton.js';
import { CustomLoader } from './custom-loader.js';
import { City } from './city.js'
import { makeGround, makeGrid } from './geometry-helpers.js'
import CustomRaycaster from './raycaster.js'
import {test} from './test-json.js';

const whiteMaterial = new THREE.MeshLambertMaterial({color: 'white'});
const yellowMaterial = new THREE.MeshBasicMaterial({color: 'yellow'});

const SIZE = 4;
const UNIT_HEIGHT = 0.2;

const camParams = {
  fov: 20,
  near: 0.1,
  far: 1000
}

const loader = new CustomLoader();

class CityManager {
  constructor(city_data, editMode = false) {

    // Load the units from the asset file

    // initializae the scene
    this.scene = new SceneSkeleton(camParams, editMode);
    this.units = {};
    loader.load('../assets/blocks.glb', this.units)

    // a grid of IDs to manage store data for deleting units
    this.unitIDs = {};

    // array of objects to raycast against
    this.raycastObjects = [];

    this.city = new City(city_data);

    // builds the city from data
    // set to a timeout because loading the glb data
    // is async and not im hacking around that

    setTimeout( () => {
      for (let block of Object.values(this.city.blocks)) {
        const { x, z } = block.position;

        block.units.forEach((item, i) => {
          const y = i * UNIT_HEIGHT;
          const u = this.units[item];
          if (u) this.buildUnitMesh(u, x, y, z);
        })

      }
    }, 200)

    this.scene.setBackground(this.city.colors.background);
    this.scene.setFog(this.city.fog);

    this.raycaster = new CustomRaycaster(this.scene);
    this.activePoint = [0,0];

    this.materials = {
    }

    this.editorState = {
    }

    const ground = makeGround(100, whiteMaterial);
    this.scene.add(ground);
    this.raycastObjects.push(ground);

    if (editMode) this.scene.add(makeGrid(SIZE));

    this.previewer = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({color: 'cyan', fog: false, transparent: true, opacity: 0.4})
    );

    this.previewer.rotation.set(- Math.PI / 2, 0, 0)

    this.scene.add(this.previewer);


    if (editMode) {
      this.scene.subscribe(() => {
        this.activePoint = (this.raycaster.raycast(this.raycastObjects, SIZE));
        if (this.activePoint) {
          // console.log(this.activePoint)
          const block = this.city.getBlock(this.activePoint.x, this.activePoint.z);
          // console.log(block);
          this.previewer.position.set(block.position.x, 0.01, block.position.z)
        }
        else {
          this.previewer.position.set(0, -10, 0)
         }

      })

      this.scene.renderer.domElement.addEventListener('contextmenu', () => {
        if (this.activePoint) {
          const block = this.city.getBlock(this.activePoint.x, this.activePoint.z);
          if (block) {
            this.addUnitHandler('Basic', block)
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
    console.log(unit);

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
}


const manager = new CityManager(JSON.parse(test), true);
