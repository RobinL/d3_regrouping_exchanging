import { splitNumber, digitPhrase, expandedValue, digitsToNumber } from './utils.js';
import { UNIT, GAP, HUNDRED_SIZE, TEXT_LINE_HEIGHT } from './constants.js';
import {
  animateHundredToTens,
  animateTensToOnes,
  animateTensToHundred,
  animateOnesToTens,
} from './animations.js';

export function update(g, columnWidth, height, value) {
  const digits = typeof value === 'object' ? value : splitNumber(value);
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
        drawHundreds(blocksG, d, blockHeight, async () => {
          if (digits.hundreds > 0) {
            const layer = await animateHundredToTens(
              g,
              columnWidth,
              height,
              digits.hundreds,
              digits.tens
            );
            digits.hundreds -= 1;
            digits.tens += 10;
            document.getElementById('number-input').value = digitsToNumber(digits);
            update(g, columnWidth, height, digits);
            layer.remove();
          }
        });
      } else if (i === 1) {
        drawTens(
          blocksG,
          d,
          blockHeight,
          async () => {
            if (digits.tens > 0) {
              const layer = await animateTensToOnes(
                g,
                columnWidth,
                height,
                digits.tens,
                digits.ones
              );
              digits.tens -= 1;
              digits.ones += 10;
              document.getElementById('number-input').value = digitsToNumber(digits);
              update(g, columnWidth, height, digits);
              layer.remove();
            }
          },
          async () => {
            if (digits.tens >= 10) {
              const layer = await animateTensToHundred(
                g,
                columnWidth,
                height,
                digits.tens,
                digits.hundreds
              );
              digits.tens -= 10;
              digits.hundreds += 1;
              document.getElementById('number-input').value = digitsToNumber(digits);
              update(g, columnWidth, height, digits);
              layer.remove();
            }
          }
        );
      } else {
        drawOnes(blocksG, d, blockHeight, async () => {
          if (digits.ones >= 10) {
            const layer = await animateOnesToTens(
              g,
              columnWidth,
              height,
              digits.ones,
              digits.tens
            );
            digits.ones -= 10;
            digits.tens += 1;
            document.getElementById('number-input').value = digitsToNumber(digits);
            update(g, columnWidth, height, digits);
            layer.remove();
          }
        });
      }
    });
}

function drawHundreds(group, count, height, onClick) {
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
          .attr('stroke-width', 0.5)
          .on('click', onClick);
      }
    }
  }
}

function drawTens(group, count, height, onClick, onRightClick) {
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
        .attr('stroke-width', 0.5)
        .on('click', onClick)
        .on('contextmenu', (e) => {
          e.preventDefault();
          onRightClick();
        });
    }
  }
}

function drawOnes(group, count, height, onRightClick) {
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
      .attr('stroke-width', 0.5)
      .on('contextmenu', (e) => {
        e.preventDefault();
        onRightClick();
      });
  }
}
