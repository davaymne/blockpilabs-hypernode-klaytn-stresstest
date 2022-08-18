// http.batch generates RPC in parallel per VU, which leads to significant

import http from 'k6/http';
import { check } from 'k6';

export const options = {
  stages: [
    { duration: '5m', target: 500 }, 
    { duration: '5m', target: 1000 },
    { duration: '5m', target: 2000 },
  ],
};

const url = 'https://klaytn.testnet.blockpi.net/v1/rpc/<YOUR API KEY>'
const params = { headers: { 'Content-Type': 'application/json' },}

export default function () {
  const req1 = {
    method: 'POST',
    url: url,
    body: JSON.stringify({
        'jsonrpc': '2.0',
        'method': 'klay_blockNumber',
        'params': [],
        'id': 1
    }),
    params: params
  };

  const req2 = {
    method: 'POST',
    url: url,
    body: JSON.stringify({
        'jsonrpc': '2.0',
        'method': 'klay_getTransactionReceipt',
        'params': ['0x56551074780c6606504b24ea0dc923acfcb562fc54d06dc52fae40ad1a8778c8'],
        'id': 1
    }),
    params: params
  };

  const req3 = {
    method: 'POST',
    url: url,
    body: JSON.stringify({
        'jsonrpc': '2.0',
        'method': 'klay_getTransactionByBlockHashAndIndex',
        'params': ['0xaca5d9a1ed8b86b1ef61431b2bedfc99a66eaefc3a7e1cffdf9ff53653956a67', '0x0'],
        'id': 1
    }),
    params: params
  };

  const responses = http.batch([req1, req2, req3]);
  console.log(responses);
}
