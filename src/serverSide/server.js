const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const db = require("./models");
const {signup, signin} = require("./controllers/auth.controller");

const app = express();

let corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
    cookieSession({
        name: "planner-session",
        keys: ["COOKIE_SECRET"],
        httpOnly: true
    })
);

db.mongoose
    .connect(`mongodb+srv://mariiamarchenko:PKTnoGYF66RnnNCg@planner.ff7nfot.mongodb.net/`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Successfully connect to MongoDB.");
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });

app.get("/", (req, res) => {
    res.json({ message: "Test." });
});
app.post("/api/auth/signup", (req, res) => {
   signup(req, res);
});
app.post("/api/auth/signin", (req, res) => {
   signin(req, res);
});

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/todo.routes')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
