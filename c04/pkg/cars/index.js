const { readData, writeData } = require("../files");
// const DATA_SOURCE = `${__dirname}/../../data`;

///Users/vangelhristov/semos-education/web-services-g1/c03/data.json
//ova e apsolutna pateka

// ../files
// simbolicna pateka

//add car
const addCar = async (car) => {};

//remove car
const removeCar = async (index) => {};

//update car
const updateCar = async (index, car) => {};

//get all cars
const getAllLocalCars = async () => {
  return await readData();
};

//get car by index
const getCarByIndex = async (index) => {};

module.exports = {
  addCar,
  removeCar,
  updateCar,
  getAllLocalCars,
  getCarByIndex,
};
