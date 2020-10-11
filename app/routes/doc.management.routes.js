module.exports = (app) => {
  const doc = require("../controllers/doc.management.controller.js");

  var router = require("express").Router();

  // Create a new doc
  router.post("/", doc.create);

  // Retrieve all doc
  router.get("/", doc.findAll);

  // Retrieve all published doc
  router.get("/validated", doc.findAllValidated);

  // Retrieve a single doc with id
  router.get("/:id", doc.findOne);

  // Update a doc with id
  router.put("/:id", doc.update);

  // Delete a doc with id
  router.delete("/:id", doc.delete);

  // Delete all doc
  router.delete("/", doc.deleteAll);

  app.use("/api/inventory-management/doc-management", router); //url- necessary for client side
};
