import { Work } from "../queue";
import { DmxService } from "../services/dmx";
import { soundService } from "../services/sound";

export const rainbowMicWork: Work = (nextWork) => {
  const rainbowInterval = setInterval(() => {
    for (let i = 0; i < DmxService.lightCount; i++) {
      const red = 255 * soundService.normalizedAverage();
      const result = DmxService.setLight(i, Math.max(red, 20), 0, 0);
      console.error(red, result);
    }
  }, 5);

  setTimeout(() => {
    nextWork();
    clearInterval(rainbowInterval);
  }, 1000 * 120);
};
