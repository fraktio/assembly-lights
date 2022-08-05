export const colorService = {
  // input: h in [0,360] and s,v in [0,1] - output: r,g,b in [0,255]
  hsv2rgb: (h: number, s: number, v: number): [number, number, number] => {
    const f = (n: number, k = (n + h / 60) % 6): number =>
      Math.floor((v - v * s * Math.max(Math.min(k, 4 - k, 1), 0)) * 255);

    return [f(5), f(3), f(1)];
  },
};
