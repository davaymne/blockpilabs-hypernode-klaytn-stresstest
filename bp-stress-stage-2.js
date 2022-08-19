import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '1s', target: 500 },
    { duration: '1s', target: 1000 },
    { duration: '1s', target: 2000 },
  ],
};

const url = 'https://klaytn.testnet.blockpi.net/v1/rpc/cd0571af8418b6f3dd4dd934941fdd9c6b2368c3'
const headers = { headers: { 'Content-Type': 'application/json' },}

export default function () {

    const data = [
        {   
            jsonrpc: "2.0",
            method: "eth_call",
            params: [{"to":"0xc6a2ad8cc6e4a7e08fc37cc5954be07d499e7654","data":"0x313ce567"},"latest"],
            id: 1,
        },
        {   
            jsonrpc: "2.0",
            method: "eth_call",
            params: [{"to":"0xe4f05a66ec68b54a58b17c22107b02e0232cc817","data":"0x313ce567"},"latest"],
            id: 1,
        },
        {   
            jsonrpc: "2.0",
            method: "eth_call",
            params: [{"to":"0xEf71750C100f7918d6Ded239Ff1CF09E81dEA92D","data":"0xd06ca61f000000000000000000000000000000000000000000000000000000000000006400000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000002000000000000000000000000e4f05a66ec68b54a58b17c22107b02e0232cc817000000000000000000000000c6a2ad8cc6e4a7e08fc37cc5954be07d499e7654"},"latest"],
            id: 1,
        },]

    for (var i = 0; i < data.length; i++) {
        var response = http.post(url, JSON.stringify(data[i]), headers);
        //console.log(response);
        check(response, { 'Is status = 200': (r) => r.status == 200 });
        check(response, { 'Is status != 200': (r) => r.status != 200 });
        check(response, {
          'Is error = hypernode not found': (r) =>
            r.body.includes('hypernode not found'),
        });
        check(response, {
          'Is error =  timeout': (r) =>
            r.body.includes('timeout'),
        });
    }
    // Automatically added sleep
    sleep(1)
}
