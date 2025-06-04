import { UNIT, HUNDRED_SIZE, GAP, TEXT_LINE_HEIGHT, COLUMN_GAP } from './constants.js';

function columnOffset() {
  return TEXT_LINE_HEIGHT * 3 + 5;
}

const HUNDRED_GRID_WIDTH = HUNDRED_SIZE * 3 + GAP * 2;
const TEN_GRID_WIDTH = UNIT * 10 + GAP * 9;

function blockHeight(height) {
  return height - columnOffset();
}

export function hundredPosition(index, columnWidth, height, columnIndex = 0) {
  const row = Math.floor(index / 3);
  const col = index % 3;
  const offset = (columnWidth - HUNDRED_GRID_WIDTH) / 2;
  const x =
    columnIndex * (columnWidth + COLUMN_GAP) + offset + col * (HUNDRED_SIZE + GAP);
  const y = blockHeight(height) - HUNDRED_SIZE - row * (HUNDRED_SIZE + GAP);
  return { x, y: columnOffset() + y };
}

export function tenPosition(index, columnWidth, height, columnIndex = 1) {
  const row = Math.floor(index / 10);
  const col = index % 10;
  const offset = (columnWidth - TEN_GRID_WIDTH) / 2;
  const x = columnIndex * (columnWidth + COLUMN_GAP) + offset + col * (UNIT + GAP);
  const y = blockHeight(height) - HUNDRED_SIZE - row * (HUNDRED_SIZE + GAP);
  return { x, y: columnOffset() + y };
}

export function onePosition(index, columnWidth, height, columnIndex = 2) {
  const row = Math.floor(index / 10);
  const col = index % 10;
  const offset = (columnWidth - TEN_GRID_WIDTH) / 2;
  const x = columnIndex * (columnWidth + COLUMN_GAP) + offset + col * (UNIT + GAP);
  const y = blockHeight(height) - UNIT - row * (UNIT + GAP);
  return { x, y: columnOffset() + y };
}
