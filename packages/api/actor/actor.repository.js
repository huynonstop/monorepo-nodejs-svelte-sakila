import Actor from "./actor.model.js";

export const create = (firstName, lastName) => {
  return Actor.create({ firstName, lastName });
};

export const findById = (id) => {
  return Actor.findByPk(id);
};

export const findAll = () => {
  return Actor.findAll();
};

export const update = (id, data) => {
  return Actor.update(data, {
    where: {
      actorId: id,
    },
  });
};

export const remove = (id) => {
  return Actor.destroy({
    where: {
      actorId: id,
    },
  });
};
