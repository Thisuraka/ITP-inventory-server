module.exports = (sequelize, Sequelize) => {
    const Med = sequelize.define("med", {
      brandName: {
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
  
    return Med;
  };
    