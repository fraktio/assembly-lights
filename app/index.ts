import { Queue } from "./queue";
import { kouhanMiehenRitariAssaWork } from "./works/kouhanMiehenRitariAssa";
import { rainbowBinaryWork } from "./works/rainbowBinary";

const queue = new Queue([kouhanMiehenRitariAssaWork, rainbowBinaryWork]);

queue.start();
