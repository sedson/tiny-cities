import {
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
  Group,
  Fog,
  Color,
  AmbientLight,
  DirectionalLight
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// Constants
// -----------------------------------------
const ROTATION_SPEED = 0.003;
const FOV = 20;
const NEAR = 0.1;
const FAR = 1000;
const VIEW_TARGET = 0.5;
const FOG_START = 0;
const FOG_END = 20;


// Class that handles basic config and
// init of a threeJS scene.
// -----------------------------------------
class SceneSkeleton {

  constructor(params, editMode = false) {

    this.editMode = editMode;
    this.viewTarget = params.viewTarget || VIEW_TARGET;

    this.scene = new Scene();
    // this.scene.fog = new Fog();

    this.camera = new PerspectiveCamera(
      params.fov || FOV,
      window.innerWidth / window.innerHeight,
      params.near || NEAR,
      params.far || FAR
    );

    // configue camera to orbit the center
    this.camera.position.set(7, 3.5, 7);
    this.camera.lookAt(0, this.viewTarget, 0);
    this.camGroup = new Group();
    this.camGroup.add(this.camera);
    this.scene.add(this.camGroup);

    this.renderer = new WebGLRenderer({alpha: true});
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    // LIGHTS
    this.ambient = new AmbientLight(0x404040);
    this.scene.add(this.ambient);

    this.direct = new DirectionalLight(0x404040, 0.4);
    this.scene.add(this.direct);


    if (this.editMode) {
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.target.set(0, this.viewTarget, 0);
      this.controls.enableZoom = false;
      this.controls.enablePan  = false;
      this.controls.maxPolarAngle = (Math.PI / 2) - (Math.PI / 50);
      this.controls.update();
    }



    // array of external functions to be called
    // every update frame
    this.callbacks = [];

    this.drawLoop();
    window.addEventListener('resize', () => this.resize(), false);

  }

  // drawLoop gets called each frame and handles
  // rendering, moving cam, and any subscribed updates
  drawLoop() {
    requestAnimationFrame(() => this.drawLoop());
    if (this.editMode) {
      this.controls.update;
    } else {
      this.camGroup.rotation.y += ROTATION_SPEED;
    }
    this.callbacks.forEach(x => x());
    this.renderer.render(this.scene, this.camera);
  }

  subscribe(callback) {
    this.callbacks.push(callback);
  }

  unsubscribe(callback) {
    this.callbacks = this.callbacks.filter(x => x !== callback);
  }

  setBackground(color) {
    this.renderer.setClearColor(color);
  }

  setAmbient(color) {

  }

  setFog(params) {
    if (! this.scene.fog) {
      this.scene.fog = new Fog(
        params.color,
        params.start || FOG_START,
        params.end || FOG_END
      );
    } else {
      if (params.color) this.scene.fog.color = params.color;
      if (params.start) this.scene.fog.near = params.start;
      if (params.end) this.scene.fog.far = params.end;
    }
  }

  resize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth ,  window.innerHeight);
  }

  add(object) {
    this.scene.add(object);
  }

  lockOrbit(){
    this.controls.enableRotate = false;
  }

  removeObject(objectId) {
    console.log(objectId);
    // .removeFromParent();
    this.scene.remove(this.scene.children.find(x => x.id === objectId))
  }
}

export { SceneSkeleton }
