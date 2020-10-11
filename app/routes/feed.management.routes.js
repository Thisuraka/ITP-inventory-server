module.exports = (app) => {
    const feed = require("../controllers/feed.management.controller.js");
  
    var router = require("express").Router();
  
    // Create a new feed
    router.post("/", feed.create);
  
    // Retrieve all feed
    router.get("/", feed.findAll);
  
    // Retrieve all published feed
    router.get("/validated", feed.findAllValidated);
  
    // Retrieve a single feed with id
    router.get("/:id", feed.findOne);
  
    // Update a feed with id
    router.put("/:id", feed.update);
  
    // Delete a feed with id
    router.delete("/:id", feed.delete);
  
    // Delete all feed
    router.delete("/", feed.deleteAll);
  
    app.use("/api/inventory-management/feed-management", router); //url- necessary for client side
  };
  