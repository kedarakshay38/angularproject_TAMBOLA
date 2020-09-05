const express = require("express");
const cors = require("cors");


const app = express();

// Middelware :: Programs :: Which runs in advance.
app.use(cors()); // unblocking cors policy
app.use(express.json()); // BODY :: RAW :: JSON


const dbadduser = require("./db.add.user");

// http://localhost:3000/welcome
app.get("/a", (req, res) => {
    res.json({ title: "Welcome!!" });
});

// created an API
// learnt how to read the input; coming from client.
// http://localhost:3000/adduser?username=hello
app.get("/adduse", async(req, res) => {
    try {
        // lets read the query parameter
        const input = req.query;

        // calling db logic :: async :: non blocking
        await dbadduser.addUser(input);
        res.json({ message: "success" });
    } catch (err) {
        res.json({ message: "failure" });
    }
});

// POST API :: FOR TESTIG POSTMAN :: ANDROID :: IOS :: BROWSER
//http://localhost:3000/adduser
app.post("/adduser", async(req, res) => {
    try {
        const input = req.body; // before doing this


        await dbadduser.addUser(input);
        res.json({ message: "success post" });
    } catch (err) {
        res.json({ message: "failure post" });
    }
});

app.post("/auth-user", async(req, res) => {
    try {
        const input = req.body;

        await dbadduser.authenticateUser(input);
        res.json({ opr: true });
    } catch (err) {
        res.json({ opr: false });
    }
});
app.listen(3000, () => { console.log("server started") });