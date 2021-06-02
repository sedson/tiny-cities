const DEF_SIZE = 5;

const DEF_COLORS = {
  background: 'hsl(0, 0%, 60%)',
  ambient: 'hsl(0, 0%, 35%)',
  main: 'hsl(0, 0%, 100%)',
  foliage: 'hsl(120, 50%, 70%)',
  accent: 'hsl(320, 50%, 70%)',
};

const DEF_FOG = {
  color: DEF_COLORS.background,
  start: 0,
  end: 30
};

class City {
  constructor(data) {
    this.size = data.size || DEF_SIZE;
    this.colors = data.colors || DEF_COLORS;
    this.fog =  data.fog || DEF_FOG;
    this.blocks = data.blocks || initGrid(this.size);
  }

  getBlock(x, z) {
    return (this.blocks[`${x}, ${z}`])
  }

  pushUnit(unitName, x, z, height){
    this.blocks[`${x}, ${z}`].units.push(unitName);
  }
}

const initGrid = (size) => {
  const blocks = {}
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      blocks[`${i}, ${j}`] = {
        position: {x: ( - (size / 2) + i + 0.5), z: ( - (size / 2) + j + 0.5)},
        height: 0,
        units: []
      }
    }
  }
  return blocks;
}

export { City }
