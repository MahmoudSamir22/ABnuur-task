const { Model, DataTypes } = require("sequelize");
const db = require("../database/dbConnection");

class Book extends Model {}

Book.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    author: {
        type: DataTypes.STRING
    }
  },
  { sequelize: db, modelName: "book" }
);

module.exports = Book;
