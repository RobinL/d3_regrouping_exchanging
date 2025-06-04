import { splitNumber } from './utils.js';

const UNIT = 10; // size of a single unit square in pixels
const GAP = 2; // gap between blocks
const HUNDRED_SIZE = UNIT * 10;

export function update(g, columnWidth, height, value) {
  const digits = splitNumber(value);
  const data = [digits.hundreds, digits.tens, digits.ones];

  const columns = g.selectAll('.column-group').data(data);
  columns.enter().append('g').attr('class', 'column-group');
  columns.exit().remove();

  columns
    .attr('transform', (d, i) => `translate(${i * columnWidth}, 0)`)
    .each(function (d, i) {
      const group = d3.select(this);
      group.selectAll('*').remove();

      if (i === 0) {
        // hundreds column - 10x10 blocks arranged in a 3x3 grid
        for (let idx = 0; idx < d; idx++) {
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
        return;
      }

      if (i === 1) {
        // tens column - rods (1x10 blocks) laid out in two rows
        for (let idx = 0; idx < d; idx++) {
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
        return;
      }

      if (i === 2) {
        // ones column - single squares in two rows
        for (let idx = 0; idx < d; idx++) {
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
    });
}
