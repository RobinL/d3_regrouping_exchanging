import { createSvg } from './svgSetup.js';
import { update } from './updateVisualization.js';
import { splitNumber } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
  const { g, columnWidth, height } = createSvg('#visualization');
  const input = document.getElementById('number-input');
  let digits = splitNumber(input.value);

  const render = () => update(g, columnWidth, height, digits);

  input.addEventListener('input', () => {
    digits = splitNumber(input.value);
    render();
  });

  render();
});
