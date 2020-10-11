const db = require("../models"); 
const Med = db.med;
const Op = db.Sequelize.Op;

// Create and Save a new Med
exports.create = (req, res) => {
  // Validate request
  if (!req.body.brandName) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Med
  const med = {
    brandName: req.body.brandName,
    date: req.body.date,
    cost: req.body.cost,
    quantity: req.body.quantity,
    type: req.body.type,
    complete: req.body.complete ? req.body.complete : false,
  };

  // Save Med in the database
  Med.create(med)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Med.",
      });
    });
};

// Retrieve all feed from the database.
exports.findAll = (req, res) => {
    //need to check
  const brandName = req.query.brandName;  

  var condition = brandName ? {brandName: { [Op.like]: `%${brandName}%` } } : null;

  Med.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Meds.",
      });
    });
};

// Find a single med with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Med.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Med with id=" + id,
      });
    });
};

// Update a feed by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Med.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Med was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Med with id=${id}. Maybe Med was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Med with id=" + id,
      });
    });
};

// Delete a Med with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Med.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Med was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Med with id=${id}. Maybe Med was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Med with id=" + id,
      });
    });
};

// Delete all Med from the database.
exports.deleteAll = (req, res) => {
    Med.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: `${nums} Med were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while removing all Med.",
      });
    });
};

// Find all published Med
exports.findAllValidated = (req, res) => {
    Med.findAll({ where: { complete: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Med.",
      });
    });
};
