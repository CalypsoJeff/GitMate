import Joi from "joi";
export const updateUserSchema = Joi.object({
    location: Joi.string().max(100),
    blog: Joi.string().uri().allow(""),
    bio: Joi.string().max(300),
});
//# sourceMappingURL=userValidation.js.map