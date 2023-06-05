const User = require("../models/user");

module.exports.createUser = async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.send(user);
};
