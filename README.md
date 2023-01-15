# typescript_snowflake

Snowflake implementation in typescript
 
## [snowflake id](https://zh.wikipedia.org/zh-tw/%E9%9B%AA%E8%8A%B1%E7%AE%97%E6%B3%95)

A distributed monotone incremented Identifier generate algorithm

## format
| timestamp       | shardId        |  seqId     |               
|-----------------|----------------|------------|
| timestamp difference in millisecond(41bit) | shardId(10bit)| seqId(12bit)|


## functionality

1. in 1 millisecond could generate 2^12 different id 

2. if more than 2^12 request in 1 millisecond, this service will block this request