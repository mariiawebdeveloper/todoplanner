const db = require("../models");
const User = db.user;

checkDuplicateUsernameOrEmail = async (req, res, next) => {
    try {
        const usernameUser = await User.findOne({ username: req.body.username }).exec();

        if (usernameUser) {
            return res.status(400).send({ message: "Failed! Username is already in use!" });
        }

        const emailUser = await User.findOne({ email: req.body.email }).exec();

        if (emailUser) {
            return res.status(400).send({ message: "Failed! Email is already in use!" });
        }

        next();
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};



const verifySignUp = {
    checkDuplicateUsernameOrEmail,
};

module.exports = verifySignUp;
