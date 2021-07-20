import sequelize from "../db.js";
import sq from "sequelize";
const { DataTypes } = sq;

const Customer = sequelize.define(
  "customer",
  {
    customerId: {
      type: DataTypes.SMALLINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    storeId: DataTypes.TINYINT.UNSIGNED,
    firstName: DataTypes.STRING(45),
    lastName: DataTypes.STRING(45),
    email: DataTypes.STRING(50),
    addressId: DataTypes.SMALLINT.UNSIGNED,
    active: DataTypes.TINYINT(1),
  },
  {
    freezeTableName: true,
    underscored: true,
    createdAt: "createDate",
    updatedAt: "lastUpdate",
  }
);

const sync = async () => {
  await Customer.sync();
  console.log("Customer model Synced");
};

sync();

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

export default Customer;
