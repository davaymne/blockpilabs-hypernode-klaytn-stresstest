import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
    scenarios: {
        contacts: {
            executor: "ramping-vus",
            startVUs: 0,
            stages: [
                { duration: "5m", target: 500 },
                { duration: "5m", target: 1000 },
                { duration: "5m", target: 2000 },
            ],
            gracefulRampDown: "0s",
        },
    },
};

export default function () {
    let response;
    const BASE_URL =
        "https://klaytn.testnet.blockpi.net/v1/rpc/<YOUR API KEY>";

    const data = [
        {
            jsonrpc: "2.0",
            method: "klay_blockNumber",
            params: [],
            id: 1,
        },
        {
            jsonrpc: "2.0",
            method: "klay_getTransactionReceipt",
            params: [
                "0x6ae45925355d3c0a589000579571de0c471900748f8344accb51a66211e6cc0f",
            ],
            id: 1,
        },
        {
            jsonrpc: "2.0",
            method: "klay_getTransactionByBlockNumberAndIndex",
            params: ["latest", "0x0"],
            id: 1,
        },
    ];
    const randMethod = data[Math.floor(Math.random() * data.length)];
    const headers = {
        headers: { "Content-Type": "application/json" },
    };

    response = http.post(BASE_URL, JSON.stringify(randMethod), headers);
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
    //console.log(response);
    sleep(1);
}
