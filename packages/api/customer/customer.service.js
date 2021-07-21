import {
  findAll,
  findById,
  create,
  update,
  remove,
} from "./customer.repository.js";
export default {
  getById: findById,
  getAll: findAll,
  create,
  update,
  remove,
};
