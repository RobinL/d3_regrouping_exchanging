import { splitNumber } from './utils.js';

export function update(g, columnWidth, height, value) {
  const digits = splitNumber(value);
  const data = [digits.thousands, digits.hundreds, digits.tens, digits.ones];

  const columns = g.selectAll('.column').data(data);

  columns
    .enter()
    .append('rect')
    .attr('class', 'column')
    .merge(columns)
    .attr('x', (d, i) => i * columnWidth + columnWidth / 4)
    .attr('width', columnWidth / 2)
    .attr('y', d => height - (d / 10) * height)
    .attr('height', d => (d / 10) * height)
    .attr('fill', '#69b3a2');

  columns.exit().remove();
}
