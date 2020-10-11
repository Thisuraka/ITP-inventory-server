module.exports = (sequelize, Sequelize) => {
  const Doc = sequelize.define("doc", {
    supplierName: {
      type: Sequelize.STRING,
    },
    date: {
      type: Sequelize.DATE,
    },
    cost: {
      type: Sequelize.INTEGER,
    },
    quantity: {
      type: Sequelize.INTEGER,
    },
    breed: {
      type: Sequelize.STRING,
    },
    complete: {
      type: Sequelize.BOOLEAN,
    },
  });

  return Doc;
};
  