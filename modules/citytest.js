import * as THREE from 'three';
import { scene, camera, renderer } from './scene-setup.js'

const rand = x => (Math.random() * (x - 1)) + 1;
const randCol = () => '#' + Math.floor(Math.random()*16777215).toString(16);

const randomQuantized = (max, min = 0, quant = 1) => {
  const rand = Math.random() * (max - min) + min;
  return Math.trunc(rand / quant) * quant;

}
renderer.setClearColor('slateblue');



const randOnGrid = (x, z) => {
  const xPos = Math.floor((Math.random() * x) - (x / 2));
  const zPos = Math.floor((Math.random() * z) - (z / 2));
  return [xPos, zPos];

}

const origin = new THREE.Mesh(
  new THREE.SphereGeometry(0.05,10,10,10),
  new THREE.MeshBasicMaterial({color: "yellow"})
)
scene.add(origin)


const mat = new THREE.MeshBasicMaterial({color: 'gainsboro', side: THREE.DoubleSide, wireframe: false});
const geo = new THREE.PlaneGeometry(4, 4, 4, 4);
const plane = new THREE.Mesh(geo, mat);
plane.position.set(0, 0, 0);
plane.rotation.set(Math.PI / 2, 0, 0);
scene.add(plane);


for (let i = 0; i < 30; i++) {
  let yellow = new THREE.MeshLambertMaterial({color: randCol()});

  const h = randomQuantized(1, 2, 0.04)
  const w = randomQuantized(0.1, 0.8, 0.01);
  const geo = new THREE.BoxGeometry(w, h, w);
  const box = new THREE.Mesh(geo, yellow);
  box.position.set(randOnGrid(4, 4)[0] + 0.5, h / 2, randOnGrid(4, 4)[1] + 0.5);
  scene.add(box);
}

let light = new THREE.DirectionalLight();
let ambient = new THREE.AmbientLight();
scene.add(light);
scene.add(ambient);
