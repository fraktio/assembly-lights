import { DmxService } from "./services/dmx";

const Red = [255, 0, 0];
const Green = [0, 255, 0];
const Blue = [0, 0, 255];

const values = [
  Red,
  Green,
  Blue,
  Red,
  Green,
  Blue,
  Red,
  Green,
  Blue,
  Red,
  Green,
  Blue,
];

let offset = 0;

setInterval(() => {
  for (let i = 0; i < DmxService.lightCount; i++) {
    const index = (i + offset) % 3;

    const colors = [...values].slice(index, 8);

    colors.map((color, i): void => {
      DmxService.setLight(i, color[0], color[1], color[2]);
    });
    offset += 1;
  }
}, 500);

console.error("Hello world!");
