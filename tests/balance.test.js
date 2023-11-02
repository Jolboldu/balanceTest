const axios = require('axios');
const http = require('http');
const https = require('https');
const timeout = 20000;

// Create HTTP and HTTPS agents with Keep-Alive settings
const httpAgent = new http.Agent({ keepAlive: true, maxSockets: 100 });
const httpsAgent = new https.Agent({ keepAlive: true, maxSockets: 100 });

async function deductBalance(headers, userID, amount) {
    const axiosInstance = axios.create({
        httpAgent,
        httpsAgent,
      });

    let response = await axiosInstance.post('http://localhost:3000/deductBalance', 
    { userID, amount }, headers);
    return response;
}

async function setBalance(headers, userID, amount) {
    console.log('setting balance')
    let response = await axios.post('http://localhost:3000/setBalance', 
    { userID, amount }, headers);
    return response;
}


test('10000 requests', async () => {
    let appliedCounter = 0;
    let rejectedCounter = 0;
    try{
        
        const headers = {
            'Content-Type': 'application/json',
        }

        const promises = [];

        for(let i = 0; i < 10000; ++i) {
            promises.push(deductBalance(headers,1,2));
        }

        const responses = await Promise.allSettled(promises)
        
        for(let i = 0; i < responses.length; ++i) {
            if(responses[i].status ==='fulfilled') appliedCounter++;
            else if(responses[i].reason.response.data === 'CONSTRAINT VIOLATION')
                rejectedCounter++;
        }

        // set init balance
        await setBalance(headers, 1, 10000)

    } catch(e){
        console.log(e.message)
    }
    expect(appliedCounter).toBe(5000);
    expect(rejectedCounter).toBe(5000);
}, timeout);
  