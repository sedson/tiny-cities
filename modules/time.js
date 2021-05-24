// Basic class for monitoring and using
// frame rate data.Roughly modeled on my
// memory of Unity's Time class.
// -----------------------------------------
const SMOOTHING = 20;
const add = (a, b) => a + b;
const averageArr = (arr) => arr.reduce(add) / arr.length;

export default class Time {
  constructor() {
    this.prevFram = Date.now();
    this.deltaTime = 0;
    this.fps = 0;
    this.smoothfps = 0;
    this.smoothDeltaTime = 0;
    this.smoothingArr = [];
  }

  update () {
    this.deltaTime = (Date.now() - this.prevFrame) / 1000;
    this.prevFrame = Date.now();
    this.fps = 1 / this.deltaTime;
    if (this.smoothingArr.length == SMOOTHING) this.smoothingArr.shift();
    this.smoothingArr.push(this.deltaTime);
    this.smoothDeltaTime = averageArr(this.smoothingArr);
    this.smoothfps = Math.floor((1 / this.smoothDeltaTime) * 100) / 100;
  }
}
