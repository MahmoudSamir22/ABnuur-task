const { Model, DataTypes } = require("sequelize");
const db = require("../database/dbConnection");
const User = require("./userModel");

class VerifyCodes extends Model {}

VerifyCodes.init(
  {
    emailVerifyCode: DataTypes.STRING,
    emailVerifyCodeExpiration: DataTypes.DATE,
  },
  { sequelize: db, modelName: "verify_codes", timestamps: false }
);

VerifyCodes.belongsTo(User, {foreignKey: "user_id"});
User.hasOne(VerifyCodes, {foreignKey: "user_id"});

module.exports = VerifyCodes;
