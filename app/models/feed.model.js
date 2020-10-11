module.exports = (sequelize, Sequelize) => {
    const Feed = sequelize.define("feed", {
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
      type: {
        type: Sequelize.STRING,
      },
      complete: {
        type: Sequelize.BOOLEAN,
      },
    });
  
    return Feed;
  };
    