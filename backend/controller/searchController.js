const { saveSearchTxnAsync } = require("../util/saveTxnAsync");
const updateBalanceAsync = require("../util/updateBalanceAsync");
const addr_Model = require("../view/addresses");
const txn_Model = require("../view/transactions");

const Moralis = require("moralis").default;

async function searchController(req, res){
    try {
      const {email} = req.body;
      let response = [];
      const search_add = req.params.add.toLowerCase();
      let addr_info = await addr_Model.findOne({ eth_add: search_add });
      let addr_balance = addr_info?.balance;
      // if address doesn't exists in database or address is not being monitored get txns from moralis
      // else fetch txns from database
      if (!addr_info || (addr_info.subCnt == 0 && addr_info.searchCnt < 3)) {
        let transactions =
          await Moralis.EvmApi.transaction.getWalletTransactionsVerbose({
            address: search_add,
            limit: 15,
            chain: "0x5",
          });
        transactions = transactions.toJSON();
        saveSearchTxnAsync(transactions.result); //save txns in db
        //save address in db if doesn't exists
        if (!addr_info) {
          const new_add = new addr_Model({ eth_add: search_add });
          await new_add.save();
        } else {
          // add address to stream api if searchCnt>=2
          if (addr_info.searchCnt >= 2) {
            Moralis.Streams.addAddress({
              id: process.env.STREAM_ID,
              address: [search_add],
            }).then(() => {
              console.log("address added to stream");
            });
          }
        }
        // fetching balance from api and update in db
        addr_balance = await updateBalanceAsync(search_add);
        addr_balance = addr_balance?.balance;
        console.log("stream balance is: ",addr_balance);
        console.log("api txns");
        response = transactions.result;
      } else {
        // fetch txns from db
        response = await txn_Model.find({
          $or: [{ to_address: search_add }, { from_address: search_add }],
        }).sort({"block_timestamp":-1});
        console.log("catched txns");
      }
      // increment the searchCnt and balance
      addr_Model
        .updateOne({ eth_add: search_add }, { $inc: { searchCnt: 1 },$set:{balance:addr_balance} })
        .then((val) => {
          console.log("cnt update success");
        });
      return res.status(200).json({data:response,balance:addr_balance,isSubbed:addr_info?.email?.includes(email)});
    } catch (err) {
      console.log("error occured: ", err);
      return res.sendStatus(400);
    }
  };

module.exports = searchController;