import {
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
  Group,
  Fog,
  Color,
  AmbientLight,
  DirectionalLight,
  MOUSE,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// Constants
// -----------------------------------------
const ROTATION_SPEED = 0.003;
const FOV = 20;
const FOV_MIN = 20;
const FOV_MAX = 50;
const NEAR = 0.1;
const FAR = 1000;
const VIEW_TARGET = 0.5;
const FOG_START = 0;
const FOG_END = 20;

const lerp = (a, b, w) => a + ( b - a) * w;
const clamp01 = x => Math.max(Math.min(x, 1), 0)

// Class that handles basic config and
// init of a threeJS scene.
// -----------------------------------------
class SceneSkeleton {

  constructor(params, editMode = false) {

    this.editMode = editMode;
    this.viewTarget = params.viewTarget || VIEW_TARGET;
    if (! editMode) this.viewTarget = 1;

    this.scene = new Scene();
    // this.scene.fog = new Fog();

    const aspect = window.innerWidth / window.innerHeight;

    this.camera = new PerspectiveCamera(
      lerp(FOV_MIN, FOV_MAX, 1 - clamp01(aspect)),
      aspect,
      params.near || NEAR,
      params.far || FAR
    );

    // configue camera to orbit the center
    this.camera.position.set(9, 4, 9);
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
      this.controls.mouseButtons = {
        RIGHT: MOUSE.ROTATE,
      }
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
    this.ambient.color = color;
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
    const aspect = window.innerWidth / window.innerHeight
    this.camera.aspect = aspect;
    this.camera.fov = lerp(FOV_MIN, FOV_MAX, 1 - clamp01(aspect));
    console.log(clamp01(aspect));
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

    this.scene.remove(this.scene.children.find(x => x.id === objectId))
  }
}

export { SceneSkeleton }
