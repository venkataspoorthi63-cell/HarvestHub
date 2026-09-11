const mongoose = require("mongoose");

const cropSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },

        name: {
            type: String,
            required: true,
            trim: true
        },

        category: {
            type: String,
            required: true
        },

        quantity: {
            type: Number,
            required: true
        },

        unit: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Crop = mongoose.model("Crop", cropSchema);

module.exports = Crop;