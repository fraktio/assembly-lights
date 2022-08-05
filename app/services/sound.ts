// eslint-disable-next-line no-process-env
const IS_PRODUCTION = process.env.USER === "ubuntu";

export class SoundService {
  private average: number;
  private weight: number;
  private samples: number[];

  constructor() {
    this.samples = [];
    this.weight = 0.01;
    this.average = 0.5;

    if (!IS_PRODUCTION) {
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const AlsaCapture = require("alsa-capture");
    const alsa = new AlsaCapture({
      channels: 1,
      debug: true,
      device: "hw:2,0",
      format: "S16_LE",
      periodSize: 32,
      periodTime: undefined,
      rate: 44100,
    });

    alsa.on("audio", this.handleAudio.bind(this));
    alsa.on("error", this.handleError.bind(this));
  }

  private handleError(error: Error): void {
    console.log(error);
  }

  private handleAudio(data: Buffer): void {
    const bytes = new Uint8Array(data);

    for (let i = 0; i < bytes.length; i += 2) {
      this.samples.push(((bytes[i + 1] << 8) | (bytes[i] & 0xff)) / 32767);
    }

    if (this.samples.length > 1000) {
      const currentAverage =
        this.samples.reduce((prev, cur) => prev + cur, 0) / this.samples.length;

      this.average =
        (currentAverage * this.weight + this.average) / (1 + this.weight);

      this.samples = [];
    }
  }

  /**
   * Returns a percentage between 0 and 1
   */
  public normalizedAverage(): number {
    return Math.min(1, Math.max(0, (this.average - 0.985) * 17));
  }
}

export const soundService = new SoundService();
