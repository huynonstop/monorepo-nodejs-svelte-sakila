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

export const sync = async () => {
  await Actor.sync();
  console.log("Actor model Synced");
};

export default Actor;
