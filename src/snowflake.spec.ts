import { SnowFlake } from "./snowflake";

describe('Test_NextId', () => {
  let snowFlakeTx: SnowFlake;
  let snowFlakeOrder: SnowFlake;
  let checkMap: Map<string, boolean>;
  beforeAll(() => {
    const epoch: bigint = BigInt(Date.now() - 300000);
    snowFlakeTx = new SnowFlake(0n, epoch); 
    snowFlakeOrder = new SnowFlake(1n, epoch);
    checkMap = new Map<string, boolean>();
  });
  afterAll(() => {
    checkMap.clear();
  })
  beforeEach(()=>{
    jest.setTimeout(300000)
  });
  it('test if has duplicateKey', async () => {
    console.time('test1');
    for (let i = 0; i <= 100000; i++) {
      let txId = snowFlakeTx.NextID();
      let orderId = snowFlakeOrder.NextID();
      expect(checkMap.has(txId)).toBe(false);
      expect(checkMap.has(orderId)).toBe(false);
      checkMap.set(txId, true);
      checkMap.set(orderId, true);
    }
    console.timeEnd('test1');
  });
})