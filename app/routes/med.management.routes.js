module.exports = (app) => {
    const med = require("../controllers/med.management.controller.js");
  
    var router = require("express").Router();
  
    // Create a new med
    router.post("/", med.create);
  
    // Retrieve all med
    router.get("/", med.findAll);
  
    // Retrieve all published med
    router.get("/validated", med.findAllValidated);
  
    // Retrieve a single med with id
    router.get("/:id", med.findOne);
  
    // Update a med with id
    router.put("/:id", med.update);
  
    // Delete a med with id
    router.delete("/:id", med.delete);
  
    // Delete all med
    router.delete("/", med.deleteAll);
  
    app.use("/api/inventory-management/med-management", router); //url- necessary for client side
  };
  