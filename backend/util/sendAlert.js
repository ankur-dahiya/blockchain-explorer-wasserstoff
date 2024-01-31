const {sendMail, alertMailTemplate} = require("../services/sendMail");
const addr_Model = require("../view/addresses");
const { getSocketUser } = require("./socketHandlers");

const sendWebhookAlert = async (data,io)=>{
    // get subscriber's email addresses
    const addresses = await addr_Model.find({$or :[{eth_add : data.
        from_address},{eth_add : data.to_address}]});
    for(let addr of addresses){
        for(let email of addr.email){
            const user = getSocketUser(email); 
            let alert_addr = `${addr.eth_add.slice(0,8)}...${addr.eth_add.slice(34)}`;
            let txnType = `${data.to_address===addr.eth_add ? "received" : "sent"}`
            let amount = (data.value / 10**18).toFixed(5);
            let msg = `${alert_addr} ${txnType} ${amount} ETH`
            //send alert on frontend if user is online
            if(user){
                io.to(user.socketId).emit("alert",{msg,type:txnType==="received"});
            }
            let mailMsg = `${addr.eth_add} ${txnType} ${(amount)} ETH`
            // send mail alert to user
            sendMail(email,mailMsg,alertMailTemplate(mailMsg,addr.balance));
        }
    }
}

module.exports = {sendWebhookAlert};