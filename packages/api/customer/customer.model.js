import sequelize from "../libs/sequelize.js";
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

export const sync = async () => {
  await Customer.sync();
  console.log("Customer model Synced");
};

export default Customer;
