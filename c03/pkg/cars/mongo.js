const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  model: String,
  manufacturer: String,
  year: Number,
  color: String,
  dealership: String,
});

const Car = mongoose.model("cars", carSchema);

const addCar = async (car) => {};

//remove car
const removeCar = async (id) => {};

//update car
const updateCar = async (id, car) => {};

//get all cars
const getAllCars = async () => {};

//get one car
const getOneCar = async (id) => {};

module.exports = {
  addCar,
  removeCar,
  updateCar,
  getAllCars,
  getOneCar,
};
