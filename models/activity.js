'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Activity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Activity.hasMany(models.Todo, { foreignKey: "activity_group_id", as: "todos" });
    }
  }
  Activity.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    created_at: {
      type: DataTypes.TIMESTAMP,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.TIMESTAMP,
      allowNull: false,
    },
    deleted_at: {
      type: DataTypes.TIMESTAMP,
      allowNull: true,
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate: (activity, opt) => {
        activity.created_at = new Date();
        activity.updated_at = new Date();
      },
      afterUpdate: (activity, opt) => {
        activity.updated_at = new Date();
      }
    },
    modelName: 'Activity',
  });
  return Activity;
};