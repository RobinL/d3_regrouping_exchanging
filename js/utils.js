export function splitNumber(num) {
  const n = Math.max(0, Math.min(9999, parseInt(num, 10) || 0));
  return {
    thousands: Math.floor(n / 1000) % 10,
    hundreds: Math.floor(n / 100) % 10,
    tens: Math.floor(n / 10) % 10,
    ones: n % 10
  };
}
