'use strict';

module.exports = (sequelize, DataTypes) => {
  const Relative = sequelize.define('Relatives', {
    relationship: DataTypes.STRING
  }, {});

  Relative.associate = function(models) {
  };

  return Relative;
};

