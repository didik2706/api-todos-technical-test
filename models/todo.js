'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Todo.belongsTo(models.Activity, { foreignKey: "activity_group_id" });
    }
  }
  Todo.init({
    activity_group_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    priority: {
      type: DataTypes.ENUM,
      values: ["very-high", "high", "medium", "low", "very-low"],
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate: (todo, opt) => {
        todo.created_at = new Date();
        todo.updated_at = new Date();
      },
      afterUpdate: (todo, opt) => {
        todo.updated_at = new Date();
      }
    },
    modelName: 'Todo',
  });
  return Todo;
};