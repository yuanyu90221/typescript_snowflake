const seqIdLength: bigint = 12n;
const shardIdLength: bigint = 10n;
const seqIdMax: bigint = (1n << seqIdLength) - 1n;
const shardIdMax: bigint = (1n << shardIdLength) - 1n;
const shardShift: bigint = seqIdLength;
const timeShift: bigint = shardIdLength + seqIdLength; 
export class SnowFlake {
  private epoch: bigint;
  private lastTime: bigint;
  private shardId: bigint;
  private seqId: bigint;
  constructor(shardId: bigint, epoch: bigint) {
    if (shardId < 0n || shardId > shardIdMax) {
      throw new Error(`shardId is not in correct range`);
    }
    this.epoch = epoch;
    this.lastTime = 0n;
    this.shardId = shardId;
    this.seqId = 0n;
  }
  public NextID(): string {
    let currentTime: bigint = this.currentTime();
    // check if clock moved backwards, refusing to generate id for
    if (currentTime < this.lastTime) {
      throw new Error(`Clock moved backwards. Refusing to generate id for ${this.lastTime - currentTime}`);
    }
    if (currentTime === this.lastTime) { // in the same milliseconds
      this.seqId = this.seqId + 1n;
      if (this.seqId > seqIdMax) { // current seqId reach max
        // loop for next milliseconds
        currentTime = this.waitForNextMilliseconds(this.lastTime);
      }
    } else {
      this.seqId = 0n;
    }
    this.lastTime = currentTime;
    let id: bigint = ((this.lastTime - this.epoch) << timeShift) | 
    (this.shardId << shardShift) | this.seqId;
    return id.toString()
  }
  private waitForNextMilliseconds(lastTimestamp: bigint): bigint {
    let timestamp: bigint = this.currentTime();
    while (timestamp <= lastTimestamp) {
      timestamp = lastTimestamp;
    }
    return timestamp;
  }
  /**
   * currentTime in millisecond
   * @returns 
   */
  private currentTime(): bigint {
    return BigInt(Date.now())
  }
}