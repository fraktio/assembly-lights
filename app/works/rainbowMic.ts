import { Work } from "../queue";
import { DmxService } from "../services/dmx";
import { soundService } from "../services/sound";

export const rainbowMicWork: Work = (nextWork) => {
  const rainbowInterval = setInterval(() => {
    for (let i = 0; i < DmxService.lightCount; i++) {
      const red = 255 * soundService.normalizedAverage();
      DmxService.setLight(i, Math.floor(Math.max(red, 20)), 0, 0);
    }
  }, 5);

  setTimeout(() => {
    nextWork();
    clearInterval(rainbowInterval);
  }, 1000 * 120);
};
