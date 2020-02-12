'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.transaction(async t => {
      await queryInterface.createTable("Members", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        gender: {
          allowNull: false,
          type: Sequelize.STRING
        },
        firstName: {
          allowNull: false,
          type: Sequelize.STRING
        },
        lastName: {
          allowNull: false,
          type: Sequelize.STRING
        },
        middleName: {
          allowNull: true,
          type: Sequelize.STRING
        },

      }, {transaction: t});

      await queryInterface.createTable("Relatives", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        memberId: {
          allowNull: false,
          type: Sequelize.INTEGER
        },
        relativeId: {
          allowNull: false,
          type: Sequelize.INTEGER
        },
        relationship: {
          allowNull: true,
          type: Sequelize.STRING
        },
      }, {transaction: t});


      await queryInterface.addConstraint("Relatives", ['relativeId'], {
        type: 'foreign key',
        name: 'fkeyRelativeId',
        references: {
          table: 'Members',
          field: 'id'
        },
        transaction: t
      });
      await queryInterface.addConstraint("Relatives", ['memberId'], {
        type: 'foreign key',
        name: 'fkeyMemberId',
        references: {
          table: 'Members',
          field: 'id'
        },
        transaction: t
      });
    });

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.transaction(async t => {
      await queryInterface.dropTable("Relatives", {transaction: t});
      await queryInterface.dropTable("Members", {transaction: t});
    });
  }
};
