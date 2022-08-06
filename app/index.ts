import { Queue } from "./queue";
import { blinkWork } from "./works/blink";
import { kouhanMiehenRitariAssaWork } from "./works/kouhanMiehenRitariAssa";
import { rainbowBinaryWork } from "./works/rainbowBinary";
// import { rainbowMicWork } from "./works/rainbowMic";
import { rainbowSmoothWork } from "./works/rainbowSmooth";
import { rainbowStaticWork } from "./works/rainbowStatic";

const queue = new Queue([
  // rainbowMicWork,
  rainbowStaticWork,
  blinkWork,
  kouhanMiehenRitariAssaWork,
  rainbowBinaryWork,
  rainbowSmoothWork,
]);

queue.start();
