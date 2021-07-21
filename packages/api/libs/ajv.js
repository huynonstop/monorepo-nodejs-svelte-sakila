import Ajv from "ajv/dist/jtd.js";
const ajv = new Ajv({ allErrors: true });

const createValidator = (schema) => ajv.compile(schema);

export const createValidateMiddleware = (validate) => (req, res, next) => {
  if (!validate(req.body)) {
    return res.status(400).json({
      message: "Bad request",
      error: validate.errors,
    });
  }
  next();
};
export default createValidator;
