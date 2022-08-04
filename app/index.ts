import { DmxService } from "./services/dmx";

let count = 0;

setInterval(() => {
  for (let i = 0; i < DmxService.lightCount; i++) {
    const index = i + count;
    switch (index % 3) {
      case 0:
        DmxService.setLight(1, 255, 0, 0);
        break;

      case 1:
        DmxService.setLight(1, 0, 255, 0);
        break;

      case 2:
        DmxService.setLight(1, 0, 0, 255);
        break;
    }
  }
  count += 1;
}, 500);

console.error("Hello world!");
