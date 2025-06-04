import { UNIT, HUNDRED_SIZE, TEXT_LINE_HEIGHT } from './constants.js';

function createSquare(parent) {
  return parent
    .append('rect')
    .attr('width', UNIT)
    .attr('height', UNIT)
    .attr('fill', '#69b3a2')
    .attr('stroke', '#fff')
    .attr('stroke-width', 0.5);
}

function createRod(parent) {
  const g = parent.append('g');
  for (let r = 0; r < 10; r++) {
    createSquare(g).attr('y', r * UNIT);
  }
  return g;
}

export function animatePieces(g, count, createFn, start, end, delay = 100, duration = 500) {
  const layer = g.append('g').attr('class', 'anim-layer');
  const promises = [];
  for (let i = 0; i < count; i++) {
    const piece = createFn(layer).attr('transform', `translate(${start.x},${start.y})`);
    const t = piece
      .transition()
      .delay(i * delay)
      .duration(duration)
      .attr('transform', `translate(${end.x},${end.y})`)
      .on('end', () => piece.remove());
    promises.push(t.end());
  }
  return Promise.all(promises).then(() => layer.remove());
}

export function centerPosition(columnIndex, columnWidth, height) {
  const offset = TEXT_LINE_HEIGHT * 3 + 5;
  const blockHeight = height - offset;
  return {
    x: columnIndex * columnWidth + columnWidth / 2 - UNIT / 2,
    y: offset + blockHeight / 2 - UNIT * 5,
  };
}

export function animateHundredToTens(g, columnWidth, height) {
  const start = centerPosition(0, columnWidth, height);
  const end = centerPosition(1, columnWidth, height);
  return animatePieces(g, 10, createRod, start, end);
}

export function animateTensToOnes(g, columnWidth, height) {
  const start = centerPosition(1, columnWidth, height);
  const end = centerPosition(2, columnWidth, height);
  return animatePieces(g, 10, createSquare, start, end);
}

export function animateTensToHundred(g, columnWidth, height) {
  const start = centerPosition(1, columnWidth, height);
  const end = centerPosition(0, columnWidth, height);
  return animatePieces(g, 10, createRod, start, end);
}

export function animateOnesToTens(g, columnWidth, height) {
  const start = centerPosition(2, columnWidth, height);
  const end = centerPosition(1, columnWidth, height);
  return animatePieces(g, 10, createSquare, start, end);
}
