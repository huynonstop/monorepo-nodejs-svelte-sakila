import createValidator, { createValidateMiddleware } from "../libs/ajv.js";
const createDTOSchema = {
  properties: {
    storeId: {
      type: "uint16",
    },
    firstName: {
      type: "string",
    },
    lastName: {
      type: "string",
    },
    email: {
      type: "string",
    },
    addressId: {
      type: "uint16",
    },
    active: {
      type: "uint8",
    },
  },
  additionalProperties: false,
};

const updateDTOSchema = {
  optionalProperties: {
    storeId: {
      type: "uint16",
    },
    firstName: {
      type: "string",
    },
    lastName: {
      type: "string",
    },
    email: {
      type: "string",
    },
    addressId: {
      type: "uint16",
    },
    active: {
      type: "uint8",
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
