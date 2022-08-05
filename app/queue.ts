export type Work = (done: () => void) => void;

const createHash = (): number => new Date().getTime();

export class Queue {
  private currentNextHash: number;
  private works: Work[];
  private index: number;

  constructor(works: Work[]) {
    this.works = works;
    this.index = 0;
    this.currentNextHash = createHash();
  }

  private generateNewHash(): void {
    this.currentNextHash = createHash();
  }

  public start(): void {
    if (this.works.length === 0) {
      return;
    }

    this.startWork();
  }

  private startWork(): void {
    const work = this.works[this.index];

    const callback = (): void => {
      const value = this.currentNextHash;

      this.checkForNextWork(value);
    };

    work(callback);
  }

  private checkForNextWork(hash: number): void {
    if (hash !== this.currentNextHash) {
      return;
    }

    const newIndex = this.index + 1;
    this.index = newIndex >= this.works.length ? 0 : newIndex;

    this.generateNewHash();
    this.startWork();
  }
}
