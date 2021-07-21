import createValidator, { createValidateMiddleware } from "../libs/ajv.js";
const createDTOSchema = {
  properties: {
    firstName: {
      type: "string",
    },
    lastName: {
      type: "string",
    },
  },
  additionalProperties: false,
};

const updateDTOSchema = {
  optionalProperties: {
    firstName: {
      type: "string",
    },
    lastName: {
      type: "string",
    },
  },
  additionalProperties: false,
};

export const createDTOValidatorMiddleware = createValidateMiddleware(
  createValidator(createDTOSchema)
);

export const updateDTOValidatorMiddleware = createValidateMiddleware(
  createValidator(updateDTOSchema)
);
