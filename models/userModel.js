const { DataTypes, Model } = require("sequelize");
const bcrypt = require("bcryptjs");
const db = require("../database/dbConnection");

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userName: {
        type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true,
      },
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("user", "admin"),
      defaultValue: "user",
    },
    isEmailVerified:{
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  { sequelize: db, modelName: "user" }
);

User.beforeSave(async (user, options) => {
  if (user.changed("password")) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
  }
});

module.exports = User;
