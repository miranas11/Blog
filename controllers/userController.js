const User = require("../models/user");

module.exports.createUser = async (req, res) => {
    const user = new User(req.body);
    await user.save();
    req.session.user_id = user._id;
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

module.exports.validateUser = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findAndValidate(username, password);
    if (user) {
        req.session.user_id = user._id;
        res.send(`Succesfully logged in ${user.username}`);
    } else {
        res.send("TRY AGAIN WRONG CREDENTIALS");
    }
};

module.exports.logout = async (req, res) => {
    if (req.session.user_id) return res.send("LOGIN FIRST");

    req.session.user_id = null;
    res.send("SUCCESFULLY LOGGED OUT");
};
