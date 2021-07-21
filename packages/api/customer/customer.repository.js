import Customer from "./customer.model.js";

export const create = (data) => {
  return Customer.create(data);
};

export const findById = (id) => {
  return Customer.findByPk(id);
};

export const findAll = (options = {}) => {
  return Customer.findAll(options);
};

export const update = (id, data) => {
  return Customer.update(data, {
    where: {
      customerId: id,
    },
  });
};

export const remove = (id) => {
  return Customer.destroy({
    where: {
      customerId: id,
    },
  });
};
