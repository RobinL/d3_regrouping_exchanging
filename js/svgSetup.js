const width = 300;
const height = 200;
const margin = { top: 20, right: 20, bottom: 40, left: 20 };

export function createSvg(container) {
  const svg = d3
    .select(container)
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  const g = svg
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  const labels = ['thousands', 'hundreds', 'tens', 'ones'];
  const columnWidth = (width - margin.left - margin.right) / labels.length;

  labels.forEach((label, i) => {
    const x = i * columnWidth + columnWidth / 2;
    const y = height - margin.bottom + 15;
    g.append('text')
      .attr('x', x)
      .attr('y', y)
      .attr('text-anchor', 'end')
      .attr('transform', `rotate(-45 ${x} ${y})`)
      .text(label);
  });

  return { svg, g, columnWidth, height: height - margin.bottom };
}
