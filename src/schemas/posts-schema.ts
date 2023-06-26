import Joi from "joi";

export const postSchema = Joi.object({
    title: Joi.string().allow(""),
    description: Joi.string().required(),
    link: Joi.string().allow(""),
});
