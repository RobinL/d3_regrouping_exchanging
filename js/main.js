import { createSvg } from './svgSetup.js';
import { update } from './updateVisualization.js';
import { splitNumber } from './utils.js';

// The script tag in index.html uses the `module` type which loads after the DOM
// is parsed. That means we can safely run our initialization code immediately
// without waiting for the `DOMContentLoaded` event. This ensures the initial
// visualization appears as soon as the page is loaded.

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
