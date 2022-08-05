import { Work } from "../queue";
import { DmxService } from "../services/dmx";

export const kouhanMiehenRitariAssaWork: Work = (nextWork) => {
  let number = 0;

  const aInterval = setInterval(() => {
    const color = [255, 10, 10];
    for (let i = 0; i < DmxService.lightCount; i++) {
      const index = number % (DmxService.lightCount * 2 - 2);
      if (index < DmxService.lightCount) {
        if (index === i) {
          DmxService.setLight(i, color[0], color[1], color[2]);
          continue;
        }
        DmxService.setLight(i, 15, 15, 15);
      } else {
        if (DmxService.lightCount * 2 - index - 2 === i) {
          DmxService.setLight(i, color[0], color[1], color[2]);
          continue;
        }
        DmxService.setLight(i, 15, 15, 15);
      }
    }
  }, 5);

  const countInterval = setInterval(() => {
    number++;
    if (number === 256) {
      nextWork();
      clearInterval(aInterval);
      clearInterval(countInterval);
    }
  }, 100);
};
