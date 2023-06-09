const { postSchema, commentSchema } = require("./schemas.js");
const CustomError = require("./CustomError.js");

module.exports.validatePosts = (req, res, next) => {
    const result = postSchema.validate(req.body);
    if (result.error) {
        const msg = result.error.message;
        throw new CustomError(msg, 404);
    } else {
        next();
    }
};

module.exports.validateComments = (req, res, next) => {
    const result = postSchema.validate(req.body);
    if (result.error) {
        const msg = result.error.message;
        throw new CustomError(msg, 404);
    } else {
        next();
    }
};

//cheks user if logged in
module.exports.requireLogin = (req, res, next) => {
    if (!req.session.user_id) {
        return res.send("PLEASE LOGIN FIRST");
    }
    next();
};
