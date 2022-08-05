import { Work } from "../queue";
import { colorService } from "../services/color";
import { DmxService } from "../services/dmx";
import { soundService } from "../services/sound";

export const rainbowMicWork: Work = (nextWork) => {
  const startTime = Date.now();

  const rainbowInterval = setInterval(() => {
    const time = Date.now() - startTime;
    const soundRange = soundService.normalizedAverage;

    for (let i = 0; i < DmxService.lightCount; i++) {
      const color = colorService.hsv2rgb(time / 10 + i * 10, soundRange, 1);

      DmxService.setLight(i, color[0], color[1], color[2]);
    }
  }, 5);

  setTimeout(() => {
    nextWork();
    clearInterval(rainbowInterval);
  }, 1000 * 120);
};
