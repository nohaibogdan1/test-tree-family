'use strict';

module.exports = (sequelize, DataTypes) => {
  const Member = sequelize.define('Member', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    middleName: DataTypes.STRING,
    gender: DataTypes.STRING,
    relationship: DataTypes.STRING
  }, {});

  Member.associate = function(models) {
    Member.belongsToMany(models.Member, {as: 'relatives', through: "Relatives", foreignKey: 'relativeId'});
  };

  return Member;
};

