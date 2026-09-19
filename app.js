const express = require("express");
const app = express();

const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate=require("ejs-mate");


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

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

// Home
app.get("/", (req, res) => {
    res.send("Hi, I am a root");
});

// Index
app.get("/listings", async (req, res) => {
    const allListings = await Listing.find({});

    res.render("listings/index", { allListings });
});

// New
app.get("/listings/new", (req, res) => {
    res.render("listings/new");
});

// Create
app.post("/listings", async (req, res) => {
    const listing = new Listing(req.body.listing);

    await listing.save();

    console.log("New listing saved");

    res.redirect("/listings");
});

// Edit
app.get("/listings/:id/edit", async (req, res) => {
    const { id } = req.params;

    const listing = await Listing.findById(id);

    if (!listing) {
        return res.send("Listing not found");
    }

    res.render("listings/edit", { listing });
});

// Update
app.put("/listings/:id", async (req, res) => {
    const { id } = req.params;

    await Listing.findByIdAndUpdate(
        id,
        { ...req.body.listing },
        { runValidators: true }
    );

    console.log("Listing updated");

    res.redirect(`/listings/${id}`);
});
// Delete
app.delete("/listings/:id", async (req, res) => {
    const { id } = req.params;

    await Listing.findByIdAndDelete(id);

    console.log("Listing deleted");

    res.redirect("/listings");
});

// Show
app.get("/listings/:id", async (req, res) => {
    const { id } = req.params;

    const listing = await Listing.findById(id);

    if (!listing) {
        return res.send("Listing not found");
    }

    res.render("listings/show", { listing });
});

// Test Listing
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

app.listen(8080, () => {
    console.log("server is listening to port 8080");
});