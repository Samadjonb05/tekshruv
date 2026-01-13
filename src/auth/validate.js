import Joi from "joi";

export const userValidate = Joi.object({
  jshshir: Joi.string().min(14).max(14).required(),
  phone: Joi.string().min(12).max(12).required(),
});

export const userValidateCode = Joi.object({
  authToken: Joi.string().min(2).max(20).required(),
  code: Joi.number().min(2).max(10000).required(),
});

export const userValidateCodeToken = Joi.object({
  authToken: Joi.string().min(2).max(20).required(),
  login: Joi.string().min(2).max(20).required(),
  pasword: Joi.string().min(2).max(20).required(),
});
export const userPasportID = Joi.object({
  serya: Joi.string().min(2).max(2).required(),
  ID: Joi.number().min(1000000).max(9999999).required(),
  kun: Joi.number().min(1).max(31).required(),
  yil: Joi.number().min(1960).max(2010).required(),
  oy: Joi.number().min(1).max(12).required(),

  phone: Joi.string().min(12).max(12).required(),
});

export function validate(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const messages = error.details.map((d) => d.message);
      return res.status(400).json({ errors: messages });
    }
    next();
  };
}
