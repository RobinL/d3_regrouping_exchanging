export function splitNumber(num) {
  const n = Math.max(0, Math.min(999, parseInt(num, 10) || 0));
  return {
    hundreds: Math.floor(n / 100) % 10,
    tens: Math.floor(n / 10) % 10,
    ones: n % 10
  };
}

const WORDS = [
  'zero',
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine'
];

export function digitToWord(digit) {
  return WORDS[digit] || '';
}

export function expandedValue(digit, columnIndex) {
  const multipliers = [100, 10, 1];
  return digit * multipliers[columnIndex];
}

export function digitPhrase(digit, columnIndex) {
  const unit = ['hundred', 'ten', 'one'][columnIndex];
  const plural = digit === 1 ? '' : 's';
  return `${digitToWord(digit)} ${unit}${plural}`;
}
