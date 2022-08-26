'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Todos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      activity_group_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: true
      },
      priority: {
        type: Sequelize.ENUM,
        values: ["very-high", "high", "medium", "low", "very-low"],
        allowNull: true,
        defaultValue: "very-high"
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });

    await queryInterface.addConstraint("Todos", {
      fields: ["activity_group_id"],
      type: "foreign key",
      references: {
        table: "Activities",
        field: "id"
      },
      onDelete: "CASCADE"
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Todos');
  }
};