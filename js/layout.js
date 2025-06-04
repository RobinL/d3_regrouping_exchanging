import { UNIT, HUNDRED_SIZE, GAP, TEXT_LINE_HEIGHT, COLUMN_GAP } from './constants.js';

function columnOffset() {
  return TEXT_LINE_HEIGHT * 3 + 5;
}

function blockHeight(height) {
  return height - columnOffset();
}

export function hundredPosition(index, columnWidth, height, columnIndex = 0) {
  const row = Math.floor(index / 3);
  const col = index % 3;
  const x = columnIndex * (columnWidth + COLUMN_GAP) + col * (HUNDRED_SIZE + GAP);
  const y = blockHeight(height) - HUNDRED_SIZE - row * (HUNDRED_SIZE + GAP);
  return { x, y: columnOffset() + y };
}

export function tenPosition(index, columnWidth, height, columnIndex = 1) {
  const row = Math.floor(index / 10);
  const col = index % 10;
  const x = columnIndex * (columnWidth + COLUMN_GAP) + col * (UNIT + GAP);
  const y = blockHeight(height) - HUNDRED_SIZE - row * (HUNDRED_SIZE + GAP);
  return { x, y: columnOffset() + y };
}

export function onePosition(index, columnWidth, height, columnIndex = 2) {
  const row = Math.floor(index / 10);
  const col = index % 10;
  const x = columnIndex * (columnWidth + COLUMN_GAP) + col * (UNIT + GAP);
  const y = blockHeight(height) - UNIT - row * (UNIT + GAP);
  return { x, y: columnOffset() + y };
}
