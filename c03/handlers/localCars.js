// make the other functions local
const getCarsLocal = async (req, res) => {
  const cars = await getAllLocalCars();
  res.status(200).send(cars);
};

module.exports = {
  getCarsLocal,
};
