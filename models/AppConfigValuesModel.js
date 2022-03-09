const mongoose = require("mongoose");
const { Schema } = mongoose;

const appSchema = new Schema({
  appId: String,
  configValues: Schema.Types.Mixed,
});

const AppConfigValues = mongoose.model("appConfigValues", appSchema);

module.exports = AppConfigValues;
