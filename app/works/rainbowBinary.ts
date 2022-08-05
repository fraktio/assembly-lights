import { Work } from "../queue";
import { colorService } from "../services/color";
import { DmxService } from "../services/dmx";

export const rainbowBinaryWork: Work = (nextWork) => {
  let number = 0;
  let tick = 0;

  const rainbowInterval = setInterval(() => {
    const offset = 45 + (Math.sin(tick / 500) + 1) * 50;

    for (let i = 0; i < DmxService.lightCount; i++) {
      const color = colorService.hsv2rgb(tick + i * offset, 1, 1);

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
