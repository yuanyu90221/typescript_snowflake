import { SnowFlake } from './snowflake';
const shardTxId: bigint = 1n;
const shardOrderId: bigint = 0n;
const epoch: bigint = BigInt(Date.now() - 300000);
const snowFlakeTx: SnowFlake = new SnowFlake(shardTxId, epoch);
const snowFlakeOrder: SnowFlake = new SnowFlake(shardOrderId, epoch);
console.time('test')
for (let i = 0; i <= 1000; i++) {
  let txId = snowFlakeTx.NextID();
  let orderId = snowFlakeOrder.NextID();
  console.log({ txId, orderId});
}
console.timeEnd('test')