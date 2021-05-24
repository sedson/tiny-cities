import { Scene, WebGLRenderer, PerspectiveCamera } from 'three';

const params = {
  fov: 45,
  near: 0.1,
  far: 1000,
  width: window.innerWidth,
  height: window.innerHeight
}


const scene = new Scene();

const camera = new PerspectiveCamera(params.fov, params.width / params.height, params.near, params.far);
camera.position.set(0, 0, 0);
const renderer = new WebGLRenderer({alpha: true});
renderer.setSize(params.width, params.height);
renderer.setClearColor("slategray");
document.body.appendChild(renderer.domElement);

function drawLoop() {
  requestAnimationFrame(drawLoop);
  renderer.render(scene, camera);
  camera.rotation.y += 0.01;
}

drawLoop();



window.addEventListener('resize', onWindowResize, false);


function onWindowResize() {
  params.width = window.innerWidth;
  params.height = window.innerHeight;
  camera.aspect = params.width / params.height;
  camera.updateProjectionMatrix();
  renderer.setSize(params.width, params.height);
}

export { scene, camera, renderer}
