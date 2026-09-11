const Part_model = require('../Model/Part_model');

// Get all parts with optional query filters (category, search, vehicle make/model/year)
const getAllParts = async (req, res, next) => {
  const { category, search, make, model, year } = req.query;

  const query = {};

  if (category) {
    query.category = category;
  }

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { partNumber: { $regex: search, $options: 'i' } },
      { brand: { $regex: search, $options: 'i' } }
    ];
  }

  if (make || model || year) {
    const vehicleQuery = {};
    if (make) vehicleQuery['compatibleVehicles.make'] = new RegExp(`^${make}$`, 'i');
    if (model) vehicleQuery['compatibleVehicles.model'] = new RegExp(`^${model}$`, 'i');
    if (year) vehicleQuery['compatibleVehicles.year'] = Number(year);

    Object.assign(query, vehicleQuery);
  }

  try {
    const parts = await Part_model.find(query);
    return res.status(200).json({ count: parts.length, parts });
  } catch (error) {
    console.error('Error fetching parts:', error);
    return res.status(500).json({ message: 'Error fetching parts', error: error.message });
  }
};

// Get part by ID
const getPartById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const part = await Part_model.findById(id);
    if (!part) {
      return res.status(404).json({ message: 'Part not found' });
    }
    return res.status(200).json({ part });
  } catch (error) {
    console.error('Error fetching part:', error);
    return res.status(500).json({ message: 'Error fetching part', error: error.message });
  }
};

// Add new part
const addPart = async (req, res, next) => {
  const { name, partNumber, brand, category, description, price, countInStock, compatibleVehicles, imageUrl } = req.body;

  try {
    const existingPart = await Part_model.findOne({ partNumber });
    if (existingPart) {
      return res.status(400).json({ message: `Part with part number '${partNumber}' already exists` });
    }

    const part = new Part_model({
      name,
      partNumber,
      brand,
      category,
      description,
      price,
      countInStock,
      compatibleVehicles: compatibleVehicles || [],
      imageUrl
    });

    await part.save();
    return res.status(201).json({ message: 'Part added successfully', part });
  } catch (error) {
    console.error('Error adding part:', error);
    return res.status(500).json({ message: 'Error adding part', error: error.message });
  }
};

// Update part by ID
const updatePart = async (req, res, next) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const part = await Part_model.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!part) {
      return res.status(404).json({ message: 'Part not found to update' });
    }

    return res.status(200).json({ message: 'Part updated successfully', part });
  } catch (error) {
    console.error('Error updating part:', error);
    return res.status(500).json({ message: 'Error updating part', error: error.message });
  }
};

// Delete part by ID
const deletePart = async (req, res, next) => {
  const { id } = req.params;
  try {
    const part = await Part_model.findByIdAndDelete(id);
    if (!part) {
      return res.status(404).json({ message: 'Part not found to delete' });
    }
    return res.status(200).json({ message: 'Part deleted successfully', part });
  } catch (error) {
    console.error('Error deleting part:', error);
    return res.status(500).json({ message: 'Error deleting part', error: error.message });
  }
};

exports.getAllParts = getAllParts;
exports.getPartById = getPartById;
exports.addPart = addPart;
exports.updatePart = updatePart;
exports.deletePart = deletePart;
