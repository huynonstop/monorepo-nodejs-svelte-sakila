import {
  findAll,
  findById,
  create as createCustomer,
  update as updateCustomer,
  remove as removeCustomer,
} from "./customer.model.js";

export const test = (req, res) => {
  res.json({
    message: "Loaded customer",
  });
};

export const get = async (req, res) => {
  const { customerId } = req.params;
  const customer = await findById(customerId);
  res.json(customer);
};

export const getAll = async (req, res) => {
  const { page, limit = 100 } = req.query;
  const options = {};
  if (page === 0 || page) {
    options.offset = page * +limit;
    options.limit = limit;
  }
  const customers = await findAll(options);
  res.json(customers);
};

export const create = async (req, res) => {
  const { storeId, firstName, lastName, email, addressId, active } = req.body;
  const customer = await createCustomer({
    storeId,
    firstName,
    lastName,
    email,
    addressId,
    active,
  });
  res.json(customer);
};

export const update = async (req, res) => {
  const { customerId } = req.params;
  const { storeId, firstName, lastName, email, addressId, active } = req.body;

  const updatedCustomer = await updateCustomer(customerId, {
    storeId,
    firstName,
    lastName,
    email,
    addressId,
    active,
  });
  res.json(updatedCustomer);
};

export const remove = async (req, res) => {
  const { customerId } = req.params;
  const removedCustomer = await removeCustomer(customerId);
  res.json(removedCustomer);
};
