//controllers.js

const mongoose = require("mongoose");

const Models = require("../models/models");

exports.registerApp = async (req, res) => {
  const { appId, config } = req.body;
  const configArray = Object.entries(config);
  let schemaObj = {};
  configArray.forEach(([key, value]) => {
    schemaObj[key] = {};
    Object.entries(value).forEach(([option, val]) => {
      if (option === "type") {
        if (val === "input") {
          if (value["valueType"] && value["valueType"] === "number") {
            schemaObj[key].type = Number;
          } else schemaObj[key].type = String;
        } else if (val === "select") {
          schemaObj[key].type = String;
          schemaObj[key].enum = value["options"];
        } else if (val === "checkbox") {
          schemaObj[key].type = Boolean;
        } else if (val === "group") {
          schemaObj[key].type = String;
          let options = [];
          value.options.forEach(({ value }) => {
            options.push(value);
          });
          schemaObj[key].enum = options;
        }
      } else if (option === "required") {
        if (val === true) {
          schemaObj[key].required = true;
        } else {
          schemaObj[key].required = false;
        }
      } else if (option === "readonly") {
        if (val === true) {
          schemaObj[key].immutable = true;
        }
      }
    });
  });
  try {
    const AppSchema = new mongoose.Schema(schemaObj);
    var App = mongoose.model(appId, AppSchema);
    console.log(AppSchema);
    res.json({
      message: "Cheers!! You have successfully updated TODO",
      //Apps,
    });
  } catch (err) {
    res.status(404).json({
      message: "Sorry your document cannot be added",
      error: err.message,
    });
  }
};

exports.indexDocument = async (req, res) => {
  try {
    const { appId, settings } = req.body;
    const App = mongoose.model(appId);
    console.log(App);
    await App.create(settings);
    res.json({
      message: "Cheers!! You have successfully added document",
      settings,
    });
  } catch (err) {
    res.status(404).json({
      message: "Sorry your document cannot be added",
      error: err.message,
    });
  }
};

// exports.getAllSettings = (req, res) => {
//   Apps.findOne({ appId: req.params.appId })
//     .then((app) => {
//       console.log({ app });
//       res.json(app.settings);
//     })
//     .catch((err) => {
//       res.status(404).json({
//         message: "There isnt any setting available",
//         error: err.message,
//       });
//     });
// };

// exports.getSetting = (req, res) => {
//   Apps.findOne({ appId: req.params.appId })
//     .then((app) => {
//       let requiredSetting = {};
//       app.settings.forEach((setting) => {
//         if (setting._id.toString() === req.params.documentId) {
//           requiredSetting = setting;
//         }
//       });
//       res.json(requiredSetting);
//     })
//     .catch((err) => {
//       res.status(404).json({
//         message: "There isnt any setting available",
//         error: err.message,
//       });
//     });
// };

// exports.getValue = (req, res) => {
//   Apps.findOne({ appId: req.params.appId })
//     .then((app) => {
//       let requiredSetting = {};
//       app.settings.forEach((setting) => {
//         if (setting._id.toString() === req.params.documentId) {
//           requiredSetting = setting;
//         }
//       });
//       const { key } = req.body;
//       res.json(requiredSetting[key]);
//     })
//     .catch((err) => {
//       res.status(404).json({
//         message: "There isnt any setting available",
//         error: err.message,
//       });
//     });
// };

// exports.deleteSetting = async (req, res) => {
//   try {
//     const app = await Apps.findOne({ appId: req.params.appId });
//     app.settings = app.settings.filter(
//       (setting) => setting._id.toString() !== req.params.documentId
//     );
//     console.log(app.settings);
//     await app.save();
//     res.json({
//       message: "Cheers!! You have successfully deleted TODO",
//       app,
//     });
//   } catch (err) {
//     res.status(404).json({
//       message: "Sorry your todo list cannot be deleted",
//       error: err.message,
//     });
//   }
// };
