const db = require("../models"); 
const Feed = db.feed;
const Op = db.Sequelize.Op;

// Create and Save a new Feed
exports.create = (req, res) => {
  // Validate request
  if (!req.body.supplierName) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a feed
  const feed = {
    supplierName: req.body.supplierName,
    date: req.body.date,
    cost: req.body.cost,
    quantity: req.body.quantity,
    type: req.body.type,
    complete: req.body.complete ? req.body.complete : false,
  };

  // Save feed in the database
  Feed.create(feed)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the feed.",
      });
    });
};

// Retrieve all feed from the database.
exports.findAll = (req, res) => {
    //need to check
  const supplierName = req.query.supplierName; //supplierName means title  

  var condition = supplierName ? {supplierName: { [Op.like]: `%${supplierName}%` } } : null;

  Feed.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving feed.",
      });
    });
};

// Find a single feed with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Feed.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving feed with id=" + id,
      });
    });
};

// Update a feed by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Feed.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Feed was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update feed with id=${id}. Maybe feed was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating feed with id=" + id,
      });
    });
};

// Delete a feed with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Feed.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "feed was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete feed with id=${id}. Maybe feed was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete feed with id=" + id,
      });
    });
};

// Delete all feed from the database.
exports.deleteAll = (req, res) => {
  Feed.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: `${nums} feed were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while removing all feeds.",
      });
    });
};

// Find all published feed
exports.findAllValidated = (req, res) => {
    Feed.findAll({ where: { complete: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving feeds.",
      });
    });
};
