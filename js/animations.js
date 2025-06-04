import { UNIT } from './constants.js';
import { hundredPosition, tenPosition, onePosition } from './layout.js';

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

export function animatePieces(
  g,
  count,
  createFn,
  startPositions,
  endPositions,
  delay = 100,
  duration = 500
) {
  const layer = g.append('g').attr('class', 'anim-layer');
  const promises = [];
  for (let i = 0; i < count; i++) {
    const start = Array.isArray(startPositions) ? startPositions[i] : startPositions;
    const end = Array.isArray(endPositions) ? endPositions[i] : endPositions;
    const piece = createFn(layer).attr('transform', `translate(${start.x},${start.y})`);
    const t = piece
      .transition()
      .delay(i * delay)
      .duration(duration)
      .attr('transform', `translate(${end.x},${end.y})`);
    promises.push(t.end());
  }
  return Promise.all(promises).then(() => layer);
}

export function animateHundredToTens(g, columnWidth, height, hundredsCount, tensCount, blocksG) {
  if (blocksG) {
    blocksG.select(`g.hundred-block[data-index="${hundredsCount - 1}"]`).remove();
  }
  const startBase = hundredPosition(hundredsCount - 1, columnWidth, height);
  const startPositions = Array.from({ length: 10 }, (_, i) => ({
    x: startBase.x + i * UNIT,
    y: startBase.y,
  }));
  const endPositions = Array.from({ length: 10 }, (_, i) =>
    tenPosition(tensCount + i, columnWidth, height)
  );
  return animatePieces(g, 10, createRod, startPositions, endPositions);
}

export function animateTensToOnes(g, columnWidth, height, tensCount, onesCount, blocksG) {
  if (blocksG) {
    blocksG.select(`g.ten-rod[data-index="${tensCount - 1}"]`).remove();
  }
  const rodPos = tenPosition(tensCount - 1, columnWidth, height);
  const startPositions = Array.from({ length: 10 }, (_, i) => ({
    x: rodPos.x,
    y: rodPos.y + i * UNIT,
  }));
  const endPositions = Array.from({ length: 10 }, (_, i) =>
    onePosition(onesCount + i, columnWidth, height)
  );
  return animatePieces(g, 10, createSquare, startPositions, endPositions);
}

export function animateTensToHundred(g, columnWidth, height, tensCount, hundredsCount) {
  const startPositions = Array.from({ length: 10 }, (_, i) =>
    tenPosition(tensCount - 10 + i, columnWidth, height)
  );
  const hundredBase = hundredPosition(hundredsCount, columnWidth, height);
  const endPositions = Array.from({ length: 10 }, (_, i) => ({
    x: hundredBase.x + i * UNIT,
    y: hundredBase.y,
  }));
  return animatePieces(g, 10, createRod, startPositions, endPositions);
}

export function animateOnesToTens(g, columnWidth, height, onesCount, tensCount) {
  const startPositions = Array.from({ length: 10 }, (_, i) =>
    onePosition(onesCount - 10 + i, columnWidth, height)
  );
  const rodPos = tenPosition(tensCount, columnWidth, height);
  const endPositions = Array.from({ length: 10 }, (_, i) => ({
    x: rodPos.x,
    y: rodPos.y + i * UNIT,
  }));
  return animatePieces(g, 10, createSquare, startPositions, endPositions);
}
