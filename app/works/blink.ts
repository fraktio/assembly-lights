import { Work } from "../queue";
import { DmxService } from "../services/dmx";

export const blinkWork: Work = (nextWork) => {
  let tick = 0;

  const White = [255, 255, 255];
  const Dimm = [20, 20, 20];

  const setLights = (): void => {
    for (let i = 0; i < DmxService.lightCount; i++) {
      const isEnabled = (tick + i) % 2 === 0;

      if (isEnabled) {
        DmxService.setLight(i, White[0], White[1], White[2]);
        continue;
      }

      DmxService.setLight(i, Dimm[0], Dimm[1], Dimm[2]);
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
