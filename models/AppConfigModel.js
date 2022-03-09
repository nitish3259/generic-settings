const mongoose = require("mongoose");
const { Schema } = mongoose;

const appSchema = new Schema({
  appId: String,
  config: Schema.Types.Mixed,
});

const AppConfig = mongoose.model("apps", appSchema);

module.exports = AppConfig;
