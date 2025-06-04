const width = 960;
const height = 360;
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

  const labels = ['hundreds','tens','ones'];
  const columnWidth = (width - margin.left - margin.right) / labels.length;

  labels.forEach((label, i) => {
    const x = i * columnWidth;
    g.append('text')
      .attr('x', x + columnWidth / 2)
      .attr('y', height - margin.bottom + 15)
      .attr('text-anchor', 'middle')
      .text(label);
  });

  return { svg, g, columnWidth, height: height - margin.bottom };
}
