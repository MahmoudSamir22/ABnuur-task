const { Model, DataTypes } = require("sequelize");
const db = require("../database/dbConnection");

const Book = require("./bookModel");
const User = require("./userModel");

class ReadingList extends Model {}

ReadingList.init(
  {},
  { sequelize: db, modelName: "reading_list", timestamps: false }
);

User.belongsToMany(Book, { through: ReadingList, foreignKey: "user_id" });
Book.belongsToMany(User, { through: ReadingList, foreignKey: "book_id" });

module.exports = ReadingList;
