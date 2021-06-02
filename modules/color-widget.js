import { rgbToHex, hexToRGB, hslToRgb, rgbToHsl} from './color-conversions.js'


const parseHsl = (hsl) => {
  return hsl.match(/\d+/g).map(Number);
}

export default class ColorWidget {
  constructor() {

    this.h = 180;
    this.s = 50;
    this.l = 50;
    this.color = "";
    this.onchange = () => {}

    this.hSlider = document.querySelector('#hue-slider');
    this.hSlider.addEventListener('input', e => {
      this.h = e.target.value;
      e.target.nextElementSibling.innerText = this.h;
      this.handleChange();
    })

    this.sSlider = document.querySelector('#saturation-slider');
    this.sSlider.addEventListener('input', e => {
      this.s = e.target.value;
      e.target.nextElementSibling.innerText = this.s;
      this.handleChange();
    })

    this.lSlider = document.querySelector('#lightness-slider');
    this.lSlider.addEventListener('input', e => {
      this.l = e.target.value;
      e.target.nextElementSibling.innerText = this.l;
      this.handleChange();
    })
  }


  handleChange() {
    this.updateColor();
    document.querySelector('#swatch-preview').style.background = this.color;
    document.documentElement.style.setProperty('--current-selection', this.color);
    this.onchange(this.color);
  }

  setColor(color) {
    [this.h, this.s, this.l] = parseHsl(color);
    this.hSlider.value = this.h;
    this.sSlider.value = this.s;
    this.lSlider.value = this.l;

    this.hSlider.nextElementSibling.innerText = this.h;
    this.sSlider.nextElementSibling.innerText = this.s;
    this.lSlider.nextElementSibling.innerText = this.l;



    this.updateColor();
    document.querySelector('#swatch-preview').style.background = this.color;
    document.documentElement.style.setProperty('--current-selection', this.color);


  }

  updateColor() {
    this.color = `hsl(${this.h}, ${this.s}%, ${this.l}%)`
  }
}
