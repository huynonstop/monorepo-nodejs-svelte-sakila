import {
  findAll,
  findById,
  create,
  update,
  remove,
} from "./actor.repository.js";
export default {
  getById: findById,
  getAll: findAll,
  create,
  update,
  remove,
};
