const mongoose = require("mongoose");

const initData = require("./data.js");
const Listing = require("../models/listing.js");

const wander_lust = "mongodb://127.0.0.1:27017/test";

main()
    .then(() => {
        console.log("connected to db");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(wander_lust);
}

const initDB = async () => {
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("data was initialized");

    mongoose.connection.close();
};

initDB();