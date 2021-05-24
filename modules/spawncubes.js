import * as THREE from 'three';
import { scene, camera, renderer } from './scene-setup.js'

const rand = (scale) => (Math.random() - 0.5) * scale * 2;

let pink = new THREE.MeshLambertMaterial({color: 'pink'});
let light = new THREE.DirectionalLight();
let ambient = new THREE.AmbientLight();

scene.add(light);
scene.add(ambient);

renderer.setClearColor('white')

for ( let i = 0; i < 100; i++) {
  let box = new THREE.TetrahedronGeometry(0.2);
  let mesh = new THREE.Mesh(box, pink);
  mesh.position.set(rand(10), rand(10), rand(10));
  mesh.rotation.set(Math.random() * 360, Math.random() * 360, Math.random() * 360);

  scene.add(mesh);
}
