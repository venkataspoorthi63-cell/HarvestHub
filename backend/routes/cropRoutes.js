const express = require("express");

const router = express.Router();

const {
    createCrop,
    getCrops,
    getCropById,
    updateCrop,
    deleteCrop
} = require("../controllers/cropController");


// Create Crop
router.post("/", createCrop);

// Get All Crops
router.get("/", getCrops);

// Get Single Crop
router.get("/:id", getCropById);

// Update Crop
router.put("/:id", updateCrop);

// Delete Crop
router.delete("/:id", deleteCrop);


module.exports = router;