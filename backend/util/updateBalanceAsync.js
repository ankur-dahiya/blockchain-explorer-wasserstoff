const Moralis = require("moralis").default;
const addr_Model = require("../view/addresses");

// update balance in db after fetching from moralis
async function updateBalanceAsync(addr) {
    try {
      addr_balance = await Moralis.EvmApi.balance.getNativeBalance({
        chain: "0x5",
        address: addr,
      });
      addr_balance = addr_balance.toJSON().balance;
      console.log("balance is: ",addr_balance);
      await addr_Model.updateOne({eth_add:addr},{$set:{balance:addr_balance}});
      return { addr, balance: addr_balance };
    } catch (err) {
      return undefined;
    }
  }

module.exports = updateBalanceAsync;