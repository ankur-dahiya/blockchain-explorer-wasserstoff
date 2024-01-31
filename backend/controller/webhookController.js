const { saveWebhookTxnAsync} = require("../util/saveTxnAsync");
const { sendWebhookAlert } = require("../util/sendAlert");
const updateBalanceAsync = require("../util/updateBalanceAsync");

async function webhookController(req, res){
    const { body,io } = req;
    console.log("webhook request");
    try {
      // if txn is not confirmed only then use it (because this'll be the first request sent by webhook for the txn )
      if (!body.confirmed) {
        const timestamp = new Date(+body.block.timestamp * 1000).toISOString(); //unix timestamp to iso timestamp conversion
        const txn = body.txs[0];
        // convert the webhook txn format to already saved format for consistency
        txn.block_timestamp = timestamp;
        txn.block_number = body.block.number;
        txn.from_address = txn.fromAddress,
        txn.to_address = txn.toAddress,
        txn.gas_price = txn.gasPrice
        saveWebhookTxnAsync(txn); //save latest txn to db asynchronously
        await updateBalanceAsync(txn.to_address); // update balance
        await updateBalanceAsync(txn.from_address); // update balance
        sendWebhookAlert(txn,io).then(()=>{console.log("alert sent successfully")}); //send alerts
      }
    } catch (err) {
      console.log("webhook error: ", err.message);
    }
    return res.status(200).json();
  };

module.exports = webhookController;