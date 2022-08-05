declare module "alsa-capture" {
  // eslint-disable-next-line no-restricted-syntax
  export default class AlsaCapture {
    constructor(options: {
      channels: number;
      debug: boolean;
      device: string;
      format: string;
      periodSize: 32;
      periodTime: undefined;
      rate: number;
    });
  }
}
