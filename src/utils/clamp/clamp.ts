interface Clamp {
  value: number;
  min: number;
  max: number;
}

function clamp({ value, min, max }: Clamp) {
  return Math.min(Math.max(value, min), max);
}

export default clamp;
