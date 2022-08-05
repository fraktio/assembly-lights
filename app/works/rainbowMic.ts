import { Work } from "../queue";
import { DmxService } from "../services/dmx";
import { soundService } from "../services/sound";

export const rainbowMicWork: Work = (nextWork) => {
  const rainbowInterval = setInterval(() => {
    for (let i = 0; i < DmxService.lightCount; i++) {
      console.error(255 * soundService.normalizedAverage);
      DmxService.setLight(
        i,
        Math.max(15, Math.min(255 * soundService.normalizedAverage, 255)),
        0,
        0
      );
    }
  }, 5);

  setTimeout(() => {
    nextWork();
    clearInterval(rainbowInterval);
  }, 1000 * 120);
};
