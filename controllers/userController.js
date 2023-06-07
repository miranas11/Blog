const User = require("../models/user");

module.exports.createUser = async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.send(user);
};

module.exports.showUserById = async (req, res) => {
    console.log(req.params.id);
    const user = await User.findById(req.params.id).populate({
        path: "posts",
        select: "body",
    });
    console.log(user);
    res.send(user);
};
