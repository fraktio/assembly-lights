import { Work } from "../queue";
import { DmxService } from "../services/dmx";

export const blinkWork: Work = (nextWork) => {
  let tick = 0;

  const Red = [255, 0, 0];
  const Blue = [0, 0, 255];

  const setLights = (): void => {
    for (let i = 0; i < DmxService.lightCount; i++) {
      const isEnabled = (tick + i) % 2 === 0;

      if (isEnabled) {
        DmxService.setLight(i, Red[0], Red[1], Red[2]);
        continue;
      }

      DmxService.setLight(i, Blue[0], Blue[1], Blue[2]);
    }
    tick += 1;

    if (tick > 10) {
      clearTimeout(rainbowInterval);
      nextWork();
    }
  };

  setLights();

  const rainbowInterval = setInterval(() => {
    setLights();
  }, 500);
};
