const db = require("../models"); 
const Doc = db.doc;
const Op = db.Sequelize.Op;

// Create and Save a new Doc
exports.create = (req, res) => {
  // Validate request
  if (!req.body.supplierName) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a doc
  const doc = {
    supplierName: req.body.supplierName,
    date: req.body.date,
    cost: req.body.cost,
    quantity: req.body.quantity,
    breed: req.body.breed,
    complete: req.body.complete ? req.body.complete : false,
  };

  // Save doc in the database
  Doc.create(doc)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the doc.",
      });
    });
};

// Retrieve all Docs from the database.
exports.findAll = (req, res) => {
    //need to check
  const supplierName = req.query.supplierName; //supplierName means title  

  var condition = supplierName ? {supplierName: { [Op.like]: `%${supplierName}%` } } : null;

  Doc.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving doc.",
      });
    });
};

// Find a single doc with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Doc.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving doc with id=" + id,
      });
    });
};

// Update a doc by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Doc.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "doc was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update doc with id=${id}. Maybe doc was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating doc with id=" + id,
      });
    });
};

// Delete a doc with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Doc.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "doc was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete doc with id=${id}. Maybe doc was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete doc with id=" + id,
      });
    });
};

// Delete all doc from the database.
exports.deleteAll = (req, res) => {
  Doc.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: `${nums} docs were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while removing all docs.",
      });
    });
};

// Find all published docs
exports.findAllValidated = (req, res) => {
  Doc.findAll({ where: { complete: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Docs.",
      });
    });
};
