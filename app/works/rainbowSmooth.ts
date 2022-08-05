import { Work } from "../queue";
import { DmxService } from "../services/dmx";

// input: h in [0,360] and s,v in [0,1] - output: r,g,b in [0,255]
function hsv2rgb(h: number, s: number, v: number): [number, number, number] {
  const f = (n: number, k = (n + h / 60) % 6): number =>
    Math.floor((v - v * s * Math.max(Math.min(k, 4 - k, 1), 0)) * 255);

  return [f(5), f(3), f(1)];
}

export const rainbowSmoothWork: Work = (nextWork) => {
  let number = 0;

  const startTime = Date.now();

  const rainbowInterval = setInterval(() => {
    const time = Date.now() - startTime;

    for (let i = 0; i < DmxService.lightCount; i++) {
      const color = hsv2rgb(time / 10 + i * 10, 1, 1);

      DmxService.setLight(i, color[0], color[1], color[2]);
    }
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