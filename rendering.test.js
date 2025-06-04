import assert from 'node:assert/strict';
import { readFileSync } from 'fs';
import { JSDOM } from 'jsdom';
import * as d3 from 'd3';
import { test } from 'node:test';
import { createSvg } from './js/svgSetup.js';
import { update } from './js/updateVisualization.js';

const html = readFileSync('./index.html', 'utf8');
const dom = new JSDOM(html);
const { document } = dom.window;

// Provide globals expected by the visualization code
global.document = document;
global.d3 = d3;

test('index.html renders SVG', () => {
  const { g, columnWidth, height } = createSvg('#visualization');
  const input = document.getElementById('number-input');
  update(g, columnWidth, height, input.value);
  const svg = document.querySelector('svg');
  assert.ok(svg, 'SVG element should exist');
});
