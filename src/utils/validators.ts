import Joi from 'joi';

export const userInputValidator = () => {
    return Joi.object({
        firstName: Joi.string().alter({
            create: (schema) => schema.required(),
            update: (schema) => schema.optional(),
        }),
        lastName: Joi.string().alter({
            create: (schema) => schema.required(),
            update: (schema) => schema.optional(),
        }),
        email: Joi.string()
            .email()
            .alter({
                create: (schema) => schema.required(),
                update: (schema) => schema.optional(),
            }),
        social: Joi.object({
            facebook: Joi.string().optional(),
            twitter: Joi.string().optional(),
            github: Joi.string().optional(),
            website: Joi.string().optional(),
        }).optional(),
    })
}