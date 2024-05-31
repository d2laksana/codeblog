'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const users = require('./users');

class posts extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
  }
}
posts.init({
  title: DataTypes.STRING,
  tag: DataTypes.STRING,
  content: DataTypes.TEXT,
  created_by: {
    type: DataTypes.INTEGER,
    references: {
      model: users,
      key: 'id',
    },
  },
  visit_count: DataTypes.INTEGER,

}, {
  sequelize,
  modelName: 'posts',
});
module.exports = posts