const express = require("express");
const axios = require("axios");
const path = require("path"); 

const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Home Route
app.get("/", (req, res) => {
    res.render("index");
});

// Search Route
app.post("/search", async (req, res) => {
    const barcode = req.body.barcode;
    const apiUrl = `https://world.openfoodfacts.org/api/v0/product/"${barcode}".json`;

    try {
        const response = await axios.get(apiUrl);
        const product = response.data.product;
        console.log("API response:", response.data);
        console.log(product);

        res.render("result", { product });
    } catch (error) {
        console.error("Error fetching product details:", error);
        res.render("result", { product: null });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
