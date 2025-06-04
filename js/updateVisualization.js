import { splitNumber, digitPhrase, expandedValue } from './utils.js';

const UNIT = 10; // size of a single unit square in pixels
const GAP = 2; // gap between blocks
const HUNDRED_SIZE = UNIT * 10;
const TEXT_LINE_HEIGHT = 18;

export function update(g, columnWidth, height, value) {
  const digits = splitNumber(value);
  const data = [digits.hundreds, digits.tens, digits.ones];

  const columns = g.selectAll('.column-group').data(data);
  const enter = columns.enter().append('g').attr('class', 'column-group');
  enter.append('g').attr('class', 'value-text');
  enter.append('g').attr('class', 'blocks');
  columns.exit().remove();

  columns
    .attr('transform', (d, i) => `translate(${i * columnWidth}, 0)`)
    .each(function (d, i) {
      const group = d3.select(this);
      const textG = group.select('.value-text');
      const blocksG = group.select('.blocks');
      textG.selectAll('*').remove();
      blocksG.selectAll('*').remove();

      const centerX = columnWidth / 2;
      textG
        .append('text')
        .attr('x', centerX)
        .attr('y', TEXT_LINE_HEIGHT)
        .attr('text-anchor', 'middle')
        .text(d);

      textG
        .append('text')
        .attr('x', centerX)
        .attr('y', TEXT_LINE_HEIGHT * 2)
        .attr('text-anchor', 'middle')
        .text(expandedValue(d, i));

      textG
        .append('text')
        .attr('x', centerX)
        .attr('y', TEXT_LINE_HEIGHT * 3)
        .attr('text-anchor', 'middle')
        .text(digitPhrase(d, i));

      const offset = TEXT_LINE_HEIGHT * 3 + 5;
      blocksG.attr('transform', `translate(0, ${offset})`);
      const blockHeight = height - offset;

      if (i === 0) {
        drawHundreds(blocksG, d, blockHeight);
      } else if (i === 1) {
        drawTens(blocksG, d, blockHeight);
      } else {
        drawOnes(blocksG, d, blockHeight);
      }
    });
}

function drawHundreds(group, count, height) {
  for (let idx = 0; idx < count; idx++) {
    const row = Math.floor(idx / 3);
    const col = idx % 3;
    const xStart = col * (HUNDRED_SIZE + GAP);
    const yStart = height - HUNDRED_SIZE - row * (HUNDRED_SIZE + GAP);

    for (let r = 0; r < 10; r++) {
      for (let c = 0; c < 10; c++) {
        group
          .append('rect')
          .attr('x', xStart + c * UNIT)
          .attr('y', yStart + r * UNIT)
          .attr('width', UNIT)
          .attr('height', UNIT)
          .attr('fill', '#69b3a2')
          .attr('stroke', '#fff')
          .attr('stroke-width', 0.5);
      }
    }
  }
}

function drawTens(group, count, height) {
  for (let idx = 0; idx < count; idx++) {
    const row = Math.floor(idx / 10);
    const col = idx % 10;
    const xStart = col * (UNIT + GAP);
    const yStart = height - HUNDRED_SIZE - row * (HUNDRED_SIZE + GAP);

    for (let r = 0; r < 10; r++) {
      group
        .append('rect')
        .attr('x', xStart)
        .attr('y', yStart + r * UNIT)
        .attr('width', UNIT)
        .attr('height', UNIT)
        .attr('fill', '#69b3a2')
        .attr('stroke', '#fff')
        .attr('stroke-width', 0.5);
    }
  }
}

function drawOnes(group, count, height) {
  for (let idx = 0; idx < count; idx++) {
    const row = Math.floor(idx / 10);
    const col = idx % 10;
    const x = col * (UNIT + GAP);
    const y = height - UNIT - row * (UNIT + GAP);

    group
      .append('rect')
      .attr('x', x)
      .attr('y', y)
      .attr('width', UNIT)
      .attr('height', UNIT)
      .attr('fill', '#69b3a2')
      .attr('stroke', '#fff')
      .attr('stroke-width', 0.5);
  }
}
