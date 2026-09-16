const express = require("express");
const app = express();

const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");

const wander_lust = "mongodb://127.0.0.1:27017/test";

// MongoDB connection
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

// EJS setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.urlencoded({ extended: true }));

// Home route
app.get("/", (req, res) => {
    res.send("Hi, I am a root");
});

// INDEX ROUTE
app.get("/listings", async (req, res) => {
    const allListings = await Listing.find({});

    res.render("listings/index", { allListings });
});

// NEW ROUTE
app.get("/listings/new", (req, res) => {
    res.render("listings/new");
});

// CREATE ROUTE
app.post("/listings", async (req, res) => {
    const listing = new Listing(req.body);

    await listing.save();

    console.log("New listing saved");

    res.redirect("/listings");
});

// Edit express
app.get("/listings/:id/edit",(req,res)=>{

});

// SHOW ROUTE
app.get("/listings/:id", async (req, res) => {
    const { id } = req.params;

    const listing = await Listing.findById(id);

    if (!listing) {
        return res.send("Listing not found");
    }

    res.render("listings/show", { listing });
});

// TEST LISTING ROUTE
app.get("/testListing", async (req, res) => {
    const sampleListing = new Listing({
        title: "My new villa",
        description: "by the beach",
        price: 1200,
        location: "Jaipur, Delhi",
        country: "India",
    });

    await sampleListing.save();

    console.log("sample was saved");

    res.send("successful testing");
});

// Start server
app.listen(8080, () => {
    console.log("server is listening to port 8080");
});