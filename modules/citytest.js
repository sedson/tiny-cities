import * as THREE from 'three';
import { scene, camera, renderer, updateSubscribe } from './scene-setup.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import iro from '@jaames/iro';

const rand = x => (Math.random() * (x - 1)) + 1;
const randCol = () => '#' + Math.floor(Math.random()*16777215).toString(16);

let mainCol = 0x0a1b22;
const objects = [];

const randomQuantized = (max, min = 0, quant = 1) => {
  const rand = Math.random() * (max - min) + min;
  return Math.trunc(rand / quant) * quant;

}
renderer.setClearColor(mainCol);
const color = mainCol;
const density = 0.01;
scene.fog = new THREE.Fog(color, 0, 30);



const randOnGrid = (x, z) => {
  const xPos = Math.floor((Math.random() * x) - (x / 2));
  const zPos = Math.floor((Math.random() * z) - (z / 2));
  return [xPos, zPos];

}

const origin = new THREE.Mesh(
  new THREE.SphereGeometry(0.05,10,10,10),
  new THREE.MeshBasicMaterial({color: "yellow", fog: false})
)
scene.add(origin)


const makeGround = (scene, size) => {
  const geo = new THREE.PlaneGeometry(size, size, 1 , 1);
  const mat = new THREE.MeshLambertMaterial({color: 'white'});
  const ground = new THREE.Mesh(geo, mat);
  ground.position.set(0, 0, 0);
  ground.rotation.set(- Math.PI / 2, 0, 0);
  scene.add(ground);
  objects.push(ground);
  return ground;
}
const makeWireFrame = (scene, size) => {
  const geo = new THREE.PlaneGeometry(size, size, size , size);
  const mat = new THREE.MeshBasicMaterial({color: 0xbbcfb8, wireframe: true});
  const frame = new THREE.Mesh(geo, mat);
  frame.position.set(0, 0.1, 0);
  frame.rotation.set(- Math.PI / 2, 0, 0);
  scene.add(frame);
}

const ground = makeGround(scene, 100);
makeWireFrame(scene, 4);




const building = new THREE.MeshLambertMaterial({color: 'white'});


for (let i = 0; i < 24; i++) {
  let yellow = new THREE.MeshLambertMaterial({color: "white"});

  const h = randomQuantized(1, 2, 0.04)
  const w = randomQuantized(0.1, 0.8, 0.01);
  const geo = new THREE.BoxGeometry(w, h, w);
  const box = new THREE.Mesh(geo, building);
  box.position.set(randOnGrid(4, 4)[0] + 0.5, h / 2, randOnGrid(4, 4)[1] + 0.5);
  scene.add(box);
  objects.push(box);
}



function colorCycle() {
  let b = Math.floor((Math.sin(Date.now()/ 5000) + 1) / 2 * 255);
  // console.log((b >>> 2).toString(16))

  mainCol = new THREE.Color(`hsl(${((255 * 2) - b) % 255 }, 100%, 95%)`)
  scene.fog.color = mainCol;
  renderer.setClearColor(mainCol);
  building.color = new THREE.Color(`hsl(${b}, 100%, 50%)`)
}

// updateSubscribe(colorCycle)


function generateBuildings(string) {
  console.log(string = string.substring(0, 16));
  for(let x in string){
    if (x !={})
    console.log((x.charCodeAt(0) * 545 >>> 0).toString(4));
  }
}

// build(generateBuildings);

let light = new THREE.PointLight("white", 0.9, 4, 1);
let light2 = new THREE.DirectionalLight("white", 0.3, 4, 1);
light.position.y = 2.5;
light2.position.set(30, 50, 10);
let ambient = new THREE.AmbientLight(mainCol, 1);
// scene.add(light);
scene.add(light2);
scene.add(ambient);


const loader = new GLTFLoader();

loader.load(
  '../assets/tree.glb',
  function (gltf) {
    // gltf.position.set(1.5, 0 ,3.5);
    applyMats(gltf);
    gltf.scene.position.set(1.5, 0.02, 1.5);
    scene.add(gltf.scene);
  }
)




function applyMats(obj) {
  // console.log(obj.scene.children[0].children);
  let meshParts = obj.scene.children[0].children;
  for (let mesh of meshParts) {
    console.log(mesh.material)
    const mat = new THREE.MeshBasicMaterial({color: mesh.material.color})

    mesh.material = mat
  }
}

function applyMat(obj, mat) {
  // console.log(obj.scene.children[0].children);
  let meshParts = obj.scene.children[0].children;
  if (obj.scene.children[0].material) obj.scene.children[0].material = mat;
  for (let mesh of meshParts) {
    mesh.material = mat
  }
}

function setCol(col) {
  mainCol = col;
  scene.fog.color = col;
  renderer.setClearColor(col);
}


const colorPicker = new iro.ColorPicker('#picker', 200);
// listen to a color picker's color:change event
// color:change callbacks receive the current color
colorPicker.on('color:change', function(color) {
  // log the current color as a HEX string
  const col = new THREE.Color(color.hexString);
  setCol(col)
});

// const colorPicker2 = new iro.ColorPicker('#picker2');
// colorPicker2.on('color:change', function(color) {
//   // log the current color as a HEX string
//   const col = new THREE.Color(color.hexString);
//
//   ambient.color = col;
// });


const raycaster = new THREE.Raycaster();

function onPointerMove(event) {

  let pointer = {
    x: 0,
    y: 0
  }
  pointer.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;
	raycaster.setFromCamera( pointer, camera );

	// See if the ray from the camera into the world hits one of our meshes
	const intersects = raycaster.intersectObjects( objects );

	// Toggle rotation bool for meshes that we clicked
	if ( intersects.length > 0 ) {

		origin.position.set( 0, 0, 0 );
		origin.lookAt( intersects[ 0 ].face.normal );
    let loc = intersects[0].point;
		origin.position.copy( intersects[ 0 ].point );
    // console.log(loc.x, loc.y)
    

	}


}

renderer.domElement.addEventListener('pointermove', onPointerMove)
