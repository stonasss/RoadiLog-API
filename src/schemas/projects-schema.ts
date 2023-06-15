import Joi from 'joi';

export const projectSchema = Joi.object({
    name: Joi.string().required(),
    instruments: Joi.string().required(),
    description: Joi.string().allow(''),
});
