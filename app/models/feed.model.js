module.exports = (sequelize, Sequelize) => {
    const Feed = sequelize.define("feed", {
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
      type: {
        type: Sequelize.STRING,
      },
      complete: {
        type: Sequelize.BOOLEAN,
      },
    });
  
    return Feed;
  };
    