import sequelize from "../db.js";
import sq from "sequelize";
const { DataTypes } = sq;

const Actor = sequelize.define(
  "actor",
  {
    actorId: {
      type: DataTypes.SMALLINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      //field: "actor_id",
    },
    firstName: DataTypes.STRING(45),
    lastName: DataTypes.STRING(45),
  },
  {
    freezeTableName: true,
    createdAt: false,
    underscored: true,
    updatedAt: "lastUpdate",
  }
);

const sync = async () => {
  await Actor.sync();
  console.log("Actor model Synced");
};

sync();

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

export default Actor;
