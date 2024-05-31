'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const posts = require('./posts');

class users extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
  }
}
users.init({
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  avatar: DataTypes.STRING,
  pass: DataTypes.STRING,
  token: DataTypes.STRING
}, {
  sequelize,
  modelName: 'users',
});

module.exports = users;