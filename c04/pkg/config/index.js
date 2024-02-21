const fs = require("fs");

const CONFIG_SOURCE = `${__dirname}/../../config.json`; //config source ni e patekata do config.json fajlot

let config = null;

if (config === null) {
  const file = fs.readFileSync(CONFIG_SOURCE, "utf-8");
  config = JSON.parse(file);
}

// za da mozeme da dojdeme do development, staging, live
const getSection = (section) => {
  // stringot "development"
  if (!config[section])
    throw `Configuration section ${section} does not exist!`;
  return config[section];

  //config["development"]
  //   {
  //   "port": 10000,
  //   "MONGO_USERNAME": "test",
  //   "MONGO_PASSWORD": "test"
  //   }
};

module.exports = {
  getSection,
};
