const Moralis = require("moralis").default;
const addr_Model = require("../view/addresses");

// automatically decerement the search cnt
setInterval(async () => {
  let addr_info = await addr_Model.find({searchCnt:{$gt:0}});
  for (let addr of addr_info) {
    try {
      if (addr.searchCnt == 3 && !addr.email.length) {
        Moralis.Streams.deleteAddress({
          id: process.env.STREAM_ID,
          address: [addr.eth_add],
        }).then(() => {
          console.log("address deleted from stream");
        });
      }
      addr.searchCnt -= 1;
      addr.save();
    } catch (err) {
        console.log("error occured while decrement search count:", err.message);
    }
}
}, 1000*60);