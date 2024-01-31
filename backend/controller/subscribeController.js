const addr_Model = require("../view/addresses");

const Moralis = require("moralis").default;

async function subscribeController(req, res){
    // user can subscribe the address that already exists in the db
    const sub_add = req.params.add.toLowerCase();
    const { email } = req.body;
    try {
      // if address doesn't exists in db send error
      const get_addr = await addr_Model.findOne({ eth_add: sub_add });
      if (!get_addr) {
        throw new Error("please search before subscription");
      } 
      else {
        // check if user has already subscribed
        if(get_addr.email.includes(email)){
          throw new Error("user has already subscribed");
        }
        // else add this address to moralis stream for tracking realtime txns
        if(!get_addr.subCnt){
          Moralis.Streams.addAddress({
            id: process.env.STREAM_ID,
            address: [sub_add],
          }).then(() => {
            console.log("address added to stream");
          });
        }
        // add email to address's subscriber list
        await addr_Model.updateOne(
          { eth_add: sub_add },
          { $push: { email: email }, $inc: { subCnt: 1 } }
        );
      }
      return res.status(200).json({ success: "subscription successful" });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  };

module.exports = subscribeController;