import { splitNumber, digitPhrase, expandedValue, digitsToNumber } from './utils.js';
import { UNIT, GAP, HUNDRED_SIZE, TEXT_LINE_HEIGHT } from './constants.js';
import { hundredPosition, tenPosition, onePosition } from './layout.js';

let pieces = [];
let nextId = 0;
let digitsState = null;
let gRoot, columnWidthRoot, heightRoot;

function computePositions(digits, columnWidth, height) {
  const positions = [];
  for (let h = 0; h < digits.hundreds; h++) {
    const base = hundredPosition(h, columnWidth, height);
    for (let r = 0; r < 10; r++) {
      for (let c = 0; c < 10; c++) {
        positions.push({
          x: base.x + c * UNIT,
          y: base.y + r * UNIT,
          column: 'hundreds',
        });
      }
    }
  }

  for (let t = 0; t < digits.tens; t++) {
    const pos = tenPosition(t, columnWidth, height);
    for (let r = 0; r < 10; r++) {
      positions.push({
        x: pos.x,
        y: pos.y + r * UNIT,
        column: 'tens',
      });
    }
  }

  for (let o = 0; o < digits.ones; o++) {
    const pos = onePosition(o, columnWidth, height);
    positions.push({ x: pos.x, y: pos.y, column: 'ones' });
  }

  return positions;
}

function updateTexts(columns, data, columnWidth) {
  const enter = columns.enter().append('g').attr('class', 'column-group');
  enter.append('g').attr('class', 'value-text');
  columns.exit().remove();

  columns = enter.merge(columns);
  columns.attr('transform', (d, i) => `translate(${i * columnWidth},0)`);

  columns.each(function (d, i) {
    const group = d3.select(this);
    const textG = group.select('.value-text');
    const centerX = columnWidth / 2;

    const value = textG
      .selectAll('text')
      .data([d, expandedValue(d, i), digitPhrase(d, i)]);

    value
      .enter()
      .append('text')
      .merge(value)
      .attr('x', centerX)
      .attr('y', (_, idx) => TEXT_LINE_HEIGHT * (idx + 1))
      .attr('text-anchor', 'middle')
      .text((t) => t);

    value.exit().remove();
  });
}

function handleClick(piece) {
  if (piece.column === 'hundreds' && digitsState.hundreds > 0) {
    digitsState.hundreds -= 1;
    digitsState.tens += 10;
  } else if (piece.column === 'tens' && digitsState.tens > 0) {
    digitsState.tens -= 1;
    digitsState.ones += 10;
  } else {
    return;
  }
  document.getElementById('number-input').value = digitsToNumber(digitsState);
  update(gRoot, columnWidthRoot, heightRoot, digitsState);
}

function handleRightClick(piece) {
  if (piece.column === 'tens' && digitsState.tens >= 10) {
    digitsState.tens -= 10;
    digitsState.hundreds += 1;
  } else if (piece.column === 'ones' && digitsState.ones >= 10) {
    digitsState.ones -= 10;
    digitsState.tens += 1;
  } else {
    return;
  }
  document.getElementById('number-input').value = digitsToNumber(digitsState);
  update(gRoot, columnWidthRoot, heightRoot, digitsState);
}

export function update(g, columnWidth, height, value) {
  digitsState = typeof value === 'object' ? value : splitNumber(value);
  gRoot = g;
  columnWidthRoot = columnWidth;
  heightRoot = height;

  const columnData = [digitsState.hundreds, digitsState.tens, digitsState.ones];
  const columnGroups = g.selectAll('.column-group').data(columnData);
  updateTexts(columnGroups, columnData, columnWidth);

  const pos = computePositions(digitsState, columnWidth, height);

  if (pieces.length < pos.length) {
    for (let i = pieces.length; i < pos.length; i++) {
      pieces.push({ id: nextId++ });
    }
  } else if (pieces.length > pos.length) {
    pieces.splice(pos.length);
  }

  pos.forEach((p, i) => Object.assign(pieces[i], p));

  const layer = g.selectAll('g.pieces-layer').data([null]);
  const layerEnter = layer.enter().append('g').attr('class', 'pieces-layer');
  const piecesLayer = layerEnter.merge(layer);

  const rects = piecesLayer.selectAll('rect.unit').data(pieces, (d) => d.id);

  rects
    .enter()
    .append('rect')
    .attr('class', 'unit')
    .attr('width', UNIT)
    .attr('height', UNIT)
    .attr('fill', '#69b3a2')
    .attr('stroke', '#fff')
    .attr('stroke-width', 0.5)
    .on('click', (e, d) => handleClick(d))
    .on('contextmenu', (e, d) => {
      e.preventDefault();
      handleRightClick(d);
    })
    .merge(rects)
    .transition()
    .attr('x', (d) => d.x)
    .attr('y', (d) => d.y);

  rects.exit().remove();
}

