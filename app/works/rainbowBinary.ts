import { Work } from "../queue";
import { DmxService } from "../services/dmx";

export const rainbowBinaryWork: Work = (nextWork) => {
  let number = 0;

  // input: h in [0,360] and s,v in [0,1] - output: r,g,b in [0,255]
  function hsv2rgb(h: number, s: number, v: number): [number, number, number] {
    const f = (n: number, k = (n + h / 60) % 6): number =>
      Math.floor((v - v * s * Math.max(Math.min(k, 4 - k, 1), 0)) * 255);

    return [f(5), f(3), f(1)];
  }

  let tick = 0;

  const rainbowInterval = setInterval(() => {
    const offset = 45 + (Math.sin(tick / 500) + 1) * 50;

    for (let i = 0; i < DmxService.lightCount; i++) {
      const color = hsv2rgb(tick + i * offset, 1, 1);

      const bitMask = 1 << i;
      const enabled = (number & bitMask) === bitMask;
      if (enabled) {
        DmxService.setLight(i, color[0], color[1], color[2]);
        continue;
      }
      DmxService.setLight(i, 15, 15, 15);
    }
    tick += 1;
  }, 5);

  const countingInterval = setInterval(() => {
    number++;
    if (number === 256) {
      nextWork();
      clearInterval(rainbowInterval);
      clearInterval(countingInterval);
    }
  }, 500);
};