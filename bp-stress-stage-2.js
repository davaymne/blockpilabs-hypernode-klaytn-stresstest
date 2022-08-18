import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '5m', target: 500 },
    { duration: '5m', target: 1000 },
    { duration: '5m', target: 2000 },
  ],
};

const url = 'https://klaytn.testnet.blockpi.net/v1/rpc/<YOUR API KEY>'
const headers = { headers: { 'Content-Type': 'application/json' },}

export default function () {
    const response1 = http.post(
        url,
        '{"jsonrpc":"2.0","method":"eth_call","params":[{"to":"0xc6a2ad8cc6e4a7e08fc37cc5954be07d499e7654","data":"0x313ce567"},"latest"],"id":1}',
        {headers: headers}
      )
    //console.log(response1);

    const response2 = http.post(
        url,
        '{"jsonrpc":"2.0","method":"eth_call","params":[{"to":"0xe4f05a66ec68b54a58b17c22107b02e0232cc817","data":"0x313ce567"},"latest"],"id":1}',
        {headers: headers}
      )

    //console.log(response2); 

    const response3 = http.post(
        url,
        '{"jsonrpc":"2.0","method":"eth_call","params":[{"to":"0xEf71750C100f7918d6Ded239Ff1CF09E81dEA92D","data":"0xd06ca61f000000000000000000000000000000000000000000000000000000000000006400000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000002000000000000000000000000e4f05a66ec68b54a58b17c22107b02e0232cc817000000000000000000000000c6a2ad8cc6e4a7e08fc37cc5954be07d499e7654"},"latest"],"id":1}',
        {headers: headers}
      )
    //console.log(response3); 
    // Automatically added sleep
    sleep(1)
}
