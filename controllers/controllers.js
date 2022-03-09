//controllers.js

const AppConfig = require("../models/AppConfigModel");
const AppConfigValues = require("../models/AppConfigValuesModel");

exports.registerApp = async (req, res) => {
  const { appId, config } = req.body;
  try {
    const app = await AppConfig.findOne({ appId: appId });
    if (app) {
      res.status(404).json({
        message: "Sorry your app already exist",
        status: 404,
      });
    } else {
      const response = await AppConfig.create({ appId: appId, config: config });
      res.json({
        message: "Cheers!! You have successfully registered your app",
        response,
      });
    }
  } catch (err) {
    res.status(404).json({
      message: "Sorry your app cannot be registered",
      error: err.message,
    });
  }
};

exports.indexDocument = async (req, res) => {
  try {
    const configs = req.body;
    const app = await AppConfig.findOne({ appId: req.params.appId });
    if (app) {
      const configDocument = await AppConfigValues.findOne({
        appId: req.params.appId,
      });
      if (configDocument) {
        Object.entries(configs).forEach(([key, value]) => {
          configDocument.configValues[key] = value;
        });
        configDocument.markModified("configValues");
        await configDocument.save();
        res.json({
          message:
            "Cheers!! You have successfully updated your config document",
          configDocument,
        });
      } else {
        let configDocument = {};
        configDocument.configValues = {};
        Object.entries(configs).forEach(([key, value]) => {
          configDocument.configValues[key] = value;
        });
        configDocument["appId"] = req.params.appId;
        const response = await AppConfigValues.create(configDocument);
        res.json({
          message: "Cheers!! You have successfully added your config document",
          response,
        });
      }
    } else {
      res.status(404).json({
        message: "Sorry your app does not exist",
        status: 404,
      });
    }
  } catch (err) {
    res.status(404).json({
      message: "Sorry your document cannot be added",
      error: err.message,
    });
  }
};

exports.getIndexDocument = async (req, res) => {
  try {
    const app = await AppConfig.findOne({ appId: req.params.appId });
    if (app) {
      const configDocument = await AppConfigValues.findOne({
        appId: req.params.appId,
      });
      if (configDocument) {
        const document = configDocument["configValues"];
        res.json({
          message:
            "Cheers!! You have successfully fetched your config document",
          document,
        });
      } else {
        res.status(404).json({
          message: "Sorry your app does not contain any document",
          status: 404,
        });
      }
    } else {
      res.status(404).json({
        message: "Sorry your app does not exist",
        status: 404,
      });
    }
  } catch (err) {
    res.status(404).json({
      message: "Sorry couldn't fetch any document",
      error: err.message,
    });
  }
};

exports.getAppConfig = async (req, res) => {
  try {
    const app = await AppConfig.findOne({ appId: req.params.appId });
    if (app) {
      const { config } = app;
      res.json({
        message: "Cheers!! You have successfully fetched app config.",
        config,
      });
    } else {
      res.status(404).json({
        message: "Sorry your app does not exist",
        status: 404,
      });
    }
  } catch (err) {
    res.status(404).json({
      message: "Sorry couldn't fetch app config",
      error: err.message,
    });
  }
};

exports.getValue = async (req, res) => {
  try {
    const app = await AppConfig.findOne({ appId: req.params.appId });
    if (app) {
      const configDocument = await AppConfigValues.findOne({
        appId: req.params.appId,
      });
      if (configDocument) {
        const { key } = req.body;
        if (configDocument["configValues"][key]) {
          const value = configDocument["configValues"][key];
          res.json({
            message: "Cheers!! You have successfully fetched value",
            value,
          });
        } else {
          res.status(404).json({
            message: "Sorry your document does not contain the specified key",
            status: 404,
          });
        }
      } else {
        res.status(404).json({
          message: "Sorry your app does not contain any document",
          status: 404,
        });
      }
    } else {
      res.status(404).json({
        message: "Sorry your app does not exist",
        status: 404,
      });
    }
  } catch (err) {
    res.status(404).json({
      message: "Sorry couldn't fetch any value",
      error: err.message,
    });
  }
};

// exports.removeConfigs = async (req, res) => {
//   try {
//     const configs = req.body;
//     const app = await AppConfig.findOne({ appId: req.params.appId });
//     if (app) {
//       app.configs = {};
//       app.markModified("configs");
//       await app.save();
//       res.json({
//         message: "Cheers!! You have successfully deleted document",
//         app,
//       });
//     } else {
//       res.status(404).json({
//         message: "Sorry your app does not exist",
//         status: 404,
//       });
//     }
//   } catch (err) {
//     res.status(404).json({
//       message: "Sorry your document cannot be added",
//       error: err.message,
//     });
//   }
// };

// exports.removeConfig = async (req, res) => {
//   try {
//     const app = await AppConfig.findOne({ appId: req.params.appId });
//     if (app) {
//       const { configs } = app;
//       const { key } = req.body;
//       if (configs[key]) {
//         delete app.configs[key];
//         app.markModified("configs");
//         await app.save();
//         res.json({
//           message: "Cheers!! You have successfully added document",
//           app,
//         });
//       } else {
//         res.status(404).json({
//           message: "Sorry key does not exist",
//           status: 404,
//         });
//       }
//     } else {
//       res.status(404).json({
//         message: "Sorry your app does not exist",
//         status: 404,
//       });
//     }
//   } catch (err) {
//     res.status(404).json({
//       message: "Sorry your document cannot be added",
//       error: err.message,
//     });
//   }
// };
