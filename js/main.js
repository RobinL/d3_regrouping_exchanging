import { createSvg } from './svgSetup.js';
import { update } from './updateVisualization.js';

document.addEventListener('DOMContentLoaded', () => {
  const { g, columnWidth, height } = createSvg('#visualization');
  const input = document.getElementById('number-input');
  const updateViz = () => update(g, columnWidth, height, input.value);

  input.addEventListener('input', updateViz);
  updateViz();
});
