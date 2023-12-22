const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const db = require("./models");

const app = express();

let corsOptions = {
    origin: "http://localhost:8081"
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

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
