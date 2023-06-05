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
