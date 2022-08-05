import { Work } from "../queue";
import { colorService } from "../services/color";
import { DmxService } from "../services/dmx";

export const rainbowStaticWork: Work = (nextWork) => {
  let tick = 0;

  const rainbowInterval = setInterval(() => {
    for (let i = 0; i < DmxService.lightCount; i++) {
      const color = colorService.hsv2rgb(tick, 1, 1);

      DmxService.setLight(i, color[0], color[1], color[2]);
    }
    tick += 1;

    if (tick > 20000) {
      clearInterval(rainbowInterval);
      nextWork();
    }
  }, 5);
};
