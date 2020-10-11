module.exports = (sequelize, Sequelize) => {
  const Doc = sequelize.define("doc", {
    supplierName: {
      type: Sequelize.STRING,
    },
    date: {
      type: Sequelize.STRING,
    },
    cost: {
      type: Sequelize.STRING,
    },
    quantity: {
      type: Sequelize.STRING,
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
  