import TechPartItem from "../model/techPartItem.js";

// Add TechPart Item
export const addTechPartItem = async (req, res) => {
  try {
    const { name, quantity, stock, image, price, labelprice } = req.body;

    const newItem = new TechPartItem({
      name,
      quantity,
      stock,
      image,
      price,
      labelprice,
    });

    const savedItem = await newItem.save();

    res.status(201).json({
      message: "TechPart item added successfully",
      item: savedItem,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding TechPart item",
      error: error.message,
    });
  }
};

// Get all TechPart Items
export const getAllTechPartItems = async (req, res) => {
  try {
    const items = await TechPartItem.find();

    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({
      message: "Error getting TechPart items",
      error: error.message,
    });
  }
};

// Get TechPart Item by ID
export const getTechPartItemById = async (req, res) => {
  try {
    const item = await TechPartItem.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        message: "TechPart item not found",
      });
    }

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({
      message: "Error getting TechPart item",
      error: error.message,
    });
  }
};

// Update TechPart Item
export const updateTechPartItem = async (req, res) => {
  try {
    const updatedItem = await TechPartItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedItem) {
      return res.status(404).json({
        message: "TechPart item not found",
      });
    }

    res.status(200).json({
      message: "TechPart item updated successfully",
      item: updatedItem,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating TechPart item",
      error: error.message,
    });
  }
};

// Delete TechPart Item
export const deleteTechPartItem = async (req, res) => {
  try {
    const deletedItem = await TechPartItem.findByIdAndDelete(
      req.params.id
    );

    if (!deletedItem) {
      return res.status(404).json({
        message: "TechPart item not found",
      });
    }

    res.status(200).json({
      message: "TechPart item deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting TechPart item",
      error: error.message,
    });
  }
};