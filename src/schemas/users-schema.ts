import Joi from "joi";

export const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    photo_url: Joi.string(),
});

export const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
});