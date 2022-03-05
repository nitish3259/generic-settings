//controllers.js

const AppConfig = require("../models/models");

exports.registerApp = async (req, res) => {
  try {
    const app = await AppConfig.findOne({ appId: appId });
    if (app) {
      res.status(404).json({
        message: "Sorry your app already exist",
        status: 404,
      });
    } else {
      const response = await AppConfig.create(req.body);
      res.json({
        message: "Cheers!! You have successfully updated TODO",
        response,
      });
    }
  } catch (err) {
    res.status(404).json({
      message: "Sorry your document cannot be added",
      error: err.message,
    });
  }
};

exports.indexDocument = async (req, res) => {
  try {
    const configs = req.body;
    const app = await AppConfig.findOne({ appId: req.params.appId });
    if (app) {
      Object.entries(configs).forEach(([key, value]) => {
        app.configs[key] = value;
      });
      app.markModified("configs");
      await app.save();
      res.json({
        message: "Cheers!! You have successfully added document",
        app,
      });
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

exports.getConfigs = async (req, res) => {
  try {
    const app = await AppConfig.findOne({ appId: req.params.appId });
    if (app) {
      const { configs } = app;
      res.json({
        message: "Cheers!! You have successfully added document",
        configs,
      });
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

exports.getValue = async (req, res) => {
  try {
    const app = await AppConfig.findOne({ appId: req.params.appId });
    if (app) {
      const { configs } = app;
      const { key } = req.body;
      if (configs[key]) {
        const value = configs[key];
        res.json({
          message: "Cheers!! You have successfully added document",
          value,
        });
      } else {
        res.status(404).json({
          message: "Sorry key does not exist",
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
      message: "Sorry your document cannot be added",
      error: err.message,
    });
  }
};

exports.removeConfigs = async (req, res) => {
  try {
    const configs = req.body;
    const app = await AppConfig.findOne({ appId: req.params.appId });
    if (app) {
      app.configs = {};
      app.markModified("configs");
      await app.save();
      res.json({
        message: "Cheers!! You have successfully deleted document",
        app,
      });
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

exports.removeConfig = async (req, res) => {
  try {
    const app = await AppConfig.findOne({ appId: req.params.appId });
    if (app) {
      const { configs } = app;
      const { key } = req.body;
      if (configs[key]) {
        delete app.configs[key];
        app.markModified("configs");
        await app.save();
        res.json({
          message: "Cheers!! You have successfully added document",
          app,
        });
      } else {
        res.status(404).json({
          message: "Sorry key does not exist",
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
      message: "Sorry your document cannot be added",
      error: err.message,
    });
  }
};
