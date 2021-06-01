import { Raycaster } from 'three';

export default class CustomRaycaster {
  constructor(scene) {
    this.pointer = {
      x: 0,
      y: 0
    }
    this.raycaster = new Raycaster();
    this.camera = scene.camera;
    this.domElement = scene.renderer.domElement;
    this.domElement.addEventListener('pointermove', () => this.pointerMove())
  }

  pointerMove() {
    this.pointer.x = ( event.clientX / this.domElement.clientWidth ) * 2 - 1;
    this.pointer.y = - ( event.clientY / this.domElement.clientHeight ) * 2 + 1;
  }

  raycast(objects, bounds) {
    this.raycaster.setFromCamera( this.pointer, this.camera );
    const intersects = this.raycaster.intersectObjects( objects );
  	if ( intersects.length > 0 ) {
      let loc = intersects[0].point;
      if ( Math.abs(loc.x) < bounds / 2 && Math.abs(loc.z) < bounds / 2 ) {
        return {
          x: Math.floor(loc.x + bounds / 2),
          z: Math.floor(loc.z + bounds / 2),
        }
      }

      return null;
  	}
  }
}
