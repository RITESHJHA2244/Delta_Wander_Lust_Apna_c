const express = require("express");
const app = express();

const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path=require("path");

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
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.get("/", (req, res) => {
    res.send("Hi, I am a root");
});


app.get("/listings", async (req, res) => {

    const allListings = await Listing.find({});

    res.render("listings/index.ejs", { allListings });

});

// new route

app.get("/listings/new",(req,rse)=>{
    res.render("listings/new.ejs")
});

// show rout 
app.get("/listings/:id",async (req,res)=>{
    let{id}=req.params;
    const listing= await Listing.findById(id);
    res.render ("listings/show.ejs",{listing});

});



// app.get("/testListing", async (req, res) => {
//     let sampleListing = new Listing({
//         title: "My new villa",
//         description: "by the beach",
//         price: 1200,
//         location: "jaipur, delhi",
//         country: "india",
//     });

//     await sampleListing.save();

//     console.log("sample was saved");

//     res.send("successful testing");
// });

app.listen(8080, () => {
    console.log("server is listening to port 8080");
});