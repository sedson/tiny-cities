const randOneToX = x => (Math.random() * (x - 1)) + 1;

const randColor = () => '#' + Math.floor(Math.random()*16777215).toString(16);

const randQuantized = (max, min = 0, quant = 1) => {
  const rand = Math.random() * (max - min) + min;
  return Math.trunc(rand / quant) * quant;
}

const randOnGrid = (x, z) => {
  const xPos = Math.floor((Math.random() * x) - (x / 2));
  const zPos = Math.floor((Math.random() * z) - (z / 2));
  return [xPos, zPos];
}

export {
  randOneToX,
  randColor,
  randQuantized,
  randOnGrid
}
