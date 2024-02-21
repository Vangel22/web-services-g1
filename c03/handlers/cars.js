const {
  addCar,
  removeCar,
  updateCar,
  getAllCars,
  getOneCar,
} = require("../pkg/cars/mongo");

//source of data => cars manupulation => handlers for cars =>  /api/cars

const getAll = async (req, res) => {
  try {
    const cars = await getAllCars();
    return res.status(200).send(cars);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

//cars/:id?month=10
const getOne = async (req, res) => {
  try {
    const car = await getOneCar(req.params.id);
    return res.status(200).send(car);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

const create = async (req, res) => {};

const update = async (req, res) => {};

const remove = async (req, res) => {};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
