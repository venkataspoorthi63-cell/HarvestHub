const Crop = require("../models/crop");
// Create Crop
const createCrop = async (req, res) => {
    try {
        const { name, category, quantity, unit } = req.body;

        const userId = req.headers["x-user-id"] || "demo-user";

        const crop = await Crop.create({
            userId,
            name,
            category,
            quantity,
            unit
        });

        res.status(201).json({
            message: "Crop added successfully",
            crop
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to add crop",
            error: error.message
        });
    }
};


// Get All Crops
const getCrops = async (req, res) => {
    try {
        const userId = req.headers["x-user-id"] || "demo-user";

        const crops = await Crop.find({ userId })
            .sort({ createdAt: -1 });

        res.status(200).json(crops);

    } catch (error) {
        res.status(500).json({
            message: "Failed to get crops",
            error: error.message
        });
    }
};


// Get Single Crop
const getCropById = async (req, res) => {
    try {
        const userId = req.headers["x-user-id"] || "demo-user";

        const crop = await Crop.findOne({
            _id: req.params.id,
            userId
        });

        if (!crop) {
            return res.status(404).json({
                message: "Crop not found"
            });
        }

        res.status(200).json(crop);

    } catch (error) {
        res.status(500).json({
            message: "Failed to get crop",
            error: error.message
        });
    }
};


// Update Crop
const updateCrop = async (req, res) => {
    try {
        const userId = req.headers["x-user-id"] || "demo-user";

        const crop = await Crop.findOneAndUpdate(
            {
                _id: req.params.id,
                userId
            },
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!crop) {
            return res.status(404).json({
                message: "Crop not found"
            });
        }

        res.status(200).json({
            message: "Crop updated successfully",
            crop
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to update crop",
            error: error.message
        });
    }
};


// Delete Crop
const deleteCrop = async (req, res) => {
    try {
        const userId = req.headers["x-user-id"] || "demo-user";

        const crop = await Crop.findOneAndDelete({
            _id: req.params.id,
            userId
        });

        if (!crop) {
            return res.status(404).json({
                message: "Crop not found"
            });
        }

        res.status(200).json({
            message: "Crop deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to delete crop",
            error: error.message
        });
    }
};


module.exports = {
    createCrop,
    getCrops,
    getCropById,
    updateCrop,
    deleteCrop
};