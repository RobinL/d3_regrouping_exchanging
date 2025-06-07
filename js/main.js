import { createSvg } from './svgSetup.js';
import { update } from './updateVisualization.js';
import { splitNumber } from './utils.js';

// Some browsers can execute module scripts before the DOM is fully parsed even
// with the `defer` attribute.  To guarantee the elements exist when we build the
// SVG, wait for `DOMContentLoaded` before initialising the visualisation.
document.addEventListener('DOMContentLoaded', () => {
  const { g, columnWidth, height } = createSvg('#visualization');
  const input = document.getElementById('number-input');
  let digits = splitNumber(input.value);

  const render = () => update(g, columnWidth, height, digits);

  input.addEventListener('input', () => {
    digits = splitNumber(input.value);
    render();
  });

  // Render once on start so the user immediately sees the visualization.
  render();
});
