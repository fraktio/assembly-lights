import { Queue } from "./queue";
import { blinkWork } from "./works/blink";
import { kouhanMiehenRitariAssaWork } from "./works/kouhanMiehenRitariAssa";
import { rainbowBinaryWork } from "./works/rainbowBinary";

const queue = new Queue([
  blinkWork,
  kouhanMiehenRitariAssaWork,
  rainbowBinaryWork,
]);

queue.start();
