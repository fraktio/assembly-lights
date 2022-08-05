import { Work } from "../queue";
import { colorService } from "../services/color";
import { DmxService } from "../services/dmx";

export const rainbowSmoothWork: Work = (nextWork) => {
  let number = 0;

  const startTime = Date.now();

  const rainbowInterval = setInterval(() => {
    const time = Date.now() - startTime;

    for (let i = 0; i < DmxService.lightCount; i++) {
      const color = colorService.hsv2rgb(time / 10 + i * 10, 1, 1);

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
