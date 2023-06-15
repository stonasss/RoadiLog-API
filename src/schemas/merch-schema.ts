import Joi from 'joi';

export const merchSchema = Joi.object({
    image: Joi.string().uri().required(),
    title: Joi.string().required(),
    price: Joi.number().required(),
});
