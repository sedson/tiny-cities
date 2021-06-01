import { PlaneGeometry, Mesh, GridHelper } from 'three';

const makeGround = (size, material) => {
  console.log('ground');
  const geo = new PlaneGeometry(size, size, 1 , 1);
  const mesh = new Mesh(geo, material);
  mesh.position.set(0, 0, 0);
  mesh.rotation.set(- Math.PI / 2, 0, 0);
  return mesh;
}

const makeGrid = (size, material) => {
  const geo = new GridHelper(size, size);
  geo.position.set(0, 0.01, 0);
  return geo;
}

export { makeGround, makeGrid }
