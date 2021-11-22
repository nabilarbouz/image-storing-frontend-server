const express = require('express');
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, "..", "build")));

app.listen(80, () => {
    console.log("web server running port 80");
})