const mongoose = require("mongoose");

async function connectDB(){
    await mongoose.connect(`${process.env.DB_URI}`);
    console.log("connected to db");
}

connectDB().catch((err)=>console.log(err));