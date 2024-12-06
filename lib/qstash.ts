import { Client } from '@upstash/qstash';

if (process.env.QSTASH_TOKEN === undefined) {
  throw new Error('QSTASH_TOKEN is not defined');
}

const qstashClient = new Client({
  token: process.env.QSTASH_TOKEN!,
});

export default qstashClient;