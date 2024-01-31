const txn_Model = require("../view/transactions");

//save list of txns to db
async function saveSearchTxnAsync(txns) {
  for (let txn of txns) {
    try {
      const store_txn = new txn_Model(txn);
      await store_txn.save();
    } catch (err) {
      console.log("saveSearchTxn Error:", err.message);
    }
  }
}

// save single txn to db
async function saveWebhookTxnAsync(txn) {
  try {
    const store_txn = new txn_Model(txn);
    store_txn.save();
  } catch (err) {
    console.log("saveWebhookTxn Error:", err.message);
  }
}

module.exports = { saveWebhookTxnAsync, saveSearchTxnAsync };
