const joi = require("joi");

module.exports.postSchema = joi.object({
    body: joi.string().required(),
    likes: joi.number(),
});

module.exports.commentSchema = joi.object({
    body: joi.string().required(),
});
