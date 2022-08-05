import { Queue } from "./queue";
import { blinkWork } from "./works/blink";
import { kouhanMiehenRitariAssaWork } from "./works/kouhanMiehenRitariAssa";
import { rainbowBinaryWork } from "./works/rainbowBinary";
import { rainbowStaticWork } from "./works/rainbowStatic";

const queue = new Queue([
  rainbowStaticWork,
  blinkWork,
  kouhanMiehenRitariAssaWork,
  rainbowBinaryWork,
]);

queue.start();
