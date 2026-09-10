const express = require("express");
const app = express();

const mongoose = require("mongoose");
const Listing = require("./models/listing.js");

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

app.get("/", (req, res) => {
    res.send("Hi, I am a root");
});

app.get("/testListing", async (req, res) => {
    let sampleListing = new Listing({
        title: "My new villa",
        description: "by the beach",
        price: 1200,
        location: "jaipur, delhi",
        country: "india",
    });

    await sampleListing.save();

    console.log("sample was saved");

    res.send("successful testing");
});

app.listen(8080, () => {
    console.log("server is listening to port 8080");
});