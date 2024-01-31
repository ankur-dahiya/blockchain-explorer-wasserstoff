1. Title of the project

- Blockchain Explorer

2. Technology stack/libraries used

- mongoDB,express.js,react.js,node.js,socket.io,moralis,moment.js,nodemailer,mongoose

3. Steps to run/build the project

- i. clone the repo from this github repo
  ii. run npm install command in frontend and backend code for installing dependencies
  iii. specify environment varialbes in .env file in backend folder.
    MORALIS_KEY= (get it by signing up on moralis.io)
    STREAM_ID= (after signup go to streams and create stream that will give you an stream id on moralis.io)
    DB_URI= (your mongodb URI get it from atlas or local mongodb server)
    SMTP_EMAIL= (smtp email... gmail will also work)
    SMTP_PASSWORD= (smtp password)
    PORT= (specify port to start listening on the port by default its set to 5000)

4. A public Video link (5-10 min) explaining demo of the project

-https://www.youtube.com/watch?v=JAAvy8Cdqso&ab_channel=AnkurDahiya

5. A vercel or any other public hosted link.

- https://blockchain-explorer-wasserstoff.up.railway.app

6. A paragraph explaining how you approached the task.

- The task was to create the blockchain explorer app while minimizing 3rd-party API calls and showing real-time transaction alerts to users. I used Goerli Ethereum testnet coin that works on the 0x5 chain. I utilized the Moralis API to fetch transactions from the Ethereum test network. At the backend, I implemented a condition (addr_info.subCnt == 0 && addr_info.searchCnt < 3) to determine whether to retrieve the transaction using a 3rd-party Moralis API call or fetch it from the MongoDB server. If this condition evaluates to false, the server will fetch the transactions from MongoDB. However, if it evaluates to true, the server will fetch the transactions using the 3rd-party API.

We'll keep the searchCnt for the address. If searchCnt is greater than or equal to 3, it means this address has a high frequency of searches. In such cases, we'll add this address to the Moralis stream to receive real-time updates on the server via webhook and store the transaction in the database. However, we'll decrement this searchCnt every minute. If searchCnt falls below 3, we'll remove it from the Moralis stream, and we'll no longer receive real-time updates.

The second condition is if the address has at least 1 subscriber to receive the latest updates, we'll add the address to the Moralis stream for real-time updates.

For notifications, I used Nodemailer for email alerts and Socket.io for push notifications. Socket.io enables us to maintain the connection with clients and emit events that we use for sending alerts from the backend to the frontend.

For testing use :
crypto wallet : https://metamask.io/
get free goerli testnet coins : https://goerli-faucet.pk910.de/
