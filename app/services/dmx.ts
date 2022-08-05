import axios from "axios";
// import chalk from "chalk";
import FormData from "form-data";

import { toFailure, toSuccess, Try } from "../utils";

// 1-8
const DMX_COUNT = 8;
// 0-255
const LIGHT_MULTIPLIER = 230;
// eslint-disable-next-line no-process-env
const IS_PRODUCTION = process.env.USER === "ubuntu";

export enum LightResponse {
  OK = "OK",
  INVALID_INDEX = "INVALID_INDEX",
  INVALID_R = "INVALID_R",
  INVALID_G = "INVALID_G",
  INVALID_B = "INVALID_B",
}

export const BLOCK = "██";

const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

const multiplyInRange = (value: number, max: number): number =>
  Math.floor(value * (max / 255));

const defaultColor: Color = {
  r: 255,
  g: 255,
  b: 255,
};

export type Color = {
  r: number;
  g: number;
  b: number;
};

class DMX {
  private lights: Color[];
  private lightMultiplier: number;
  private isDeBug: boolean;
  private interval: NodeJS.Timeout | null;

  constructor(
    lightCount = DMX_COUNT,
    lightMultiplier = LIGHT_MULTIPLIER,
    isDebug = IS_PRODUCTION,
  ) {
    this.lights = Array.from(Array(lightCount)).map(() => defaultColor);
    this.lightMultiplier = lightMultiplier;
    this.isDeBug = !isDebug;
    this.interval = null;
  }

  public get lightCount(): number {
    return this.lights.length;
  }

  public setLight(
    index: number,
    r: number,
    g: number,
    b: number,
  ): LightResponse {
    if (index < 0 || index >= this.lights.length) {
      return LightResponse.INVALID_INDEX;
    }

    const RGBr = clamp(Math.floor(r), 0, 255);

    if (RGBr !== r) {
      return LightResponse.INVALID_R;
    }

    const RGBg = clamp(Math.floor(g), 0, 255);

    if (RGBg !== g) {
      return LightResponse.INVALID_G;
    }

    const RGBb = clamp(Math.floor(b), 0, 255);

    if (RGBb !== b) {
      return LightResponse.INVALID_B;
    }

    this.lights[index] = {
      r: RGBr,
      g: RGBg,
      b: RGBb,
    };

    return LightResponse.OK;
  }

  public startWorker(): void {
    this.interval = setInterval(() => {
      this.sendData();
    }, 20);
  }

  public stopWorker(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  private async sendData(): Promise<Try<true, Error>> {
    const values = this.lights.flatMap((light) => [
      multiplyInRange(light.r, this.lightMultiplier),
      multiplyInRange(light.g, this.lightMultiplier),
      multiplyInRange(light.b, this.lightMultiplier),
    ]);
    /*
    process.stdout.write("\r");
    this.lights.forEach((light): void => {
      const coloredText = chalk.rgb(light.r, light.g, light.b);
      process.stdout.write(coloredText(BLOCK));
    });

    process.stdout.write(` Sending values: ${values} `);
*/
    const formData = new FormData();

    formData.append("u", 0);
    formData.append("d", values.join(","));

    if (!IS_PRODUCTION) {
      return toSuccess(true);
    }

    try {
      const result = await axios.post(
        "http://127.0.0.1:9090/set_dmx",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } },
      );

      if (this.isDeBug) {
        console.log(`Status code: ${result.status} (${result.statusText})`);
      }

      return toSuccess(true);
    } catch (e) {
      const error = e as Error;
      console.error(error.message);

      return toFailure(error);
    }
  }
}

export const DmxService = new DMX();

DmxService.startWorker();
