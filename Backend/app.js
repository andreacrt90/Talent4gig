// Create express app to manage routing
var express = require("express")
var app = express()
var db = require("./connect.js")

// Server port
var HTTP_PORT = 8000
// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT))
});

// enable CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Root endpoint
app.get("/", (req, res, next) => {
    res.json({ "message": "Ok" })
});

// routes endpoint
app.get("/processes", (req, res, next) => {
    var sql = "SELECT * FROM processes pr LEFT JOIN processExecutions ex ON ex.processId = pr.id LEFT JOIN finalStates st ON ex.finalStateId = st.id "
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        })
    });
});

// Default response for any other request
app.use(function (req, res) {
    res.status(404);
});
