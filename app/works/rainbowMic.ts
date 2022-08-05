import { Work } from "../queue";
import { colorService } from "../services/color";
import { DmxService } from "../services/dmx";
import { mathService } from "../services/math";
import { soundService } from "../services/sound";

export const rainbowMicWork: Work = (nextWork) => {
  const startTime = Date.now();

  const rainbowInterval = setInterval(() => {
    const time = Date.now() - startTime;
    const soundRange = soundService.normalizedAverage;
    console.error("kek", soundRange);
    const multiplier = mathService.convertRange(soundRange, [0, 1], [0.4, 1]);

    for (let i = 0; i < DmxService.lightCount; i++) {
      const color = colorService.hsv2rgb(time / 10 + i * 10, 1, 1);

      DmxService.setLight(
        i,
        color[0] * multiplier,
        color[1] * multiplier,
        color[2] * multiplier,
      );
    }
  }, 5);

  setTimeout(() => {
    nextWork();
    clearInterval(rainbowInterval);
  }, 1000 * 60);
};
