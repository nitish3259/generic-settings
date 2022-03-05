const express = require("express");

const router = express.Router();

const {
  registerApp,
  indexDocument,
  getConfigs,
  getValue,
  removeConfigs,
  removeConfig,
} = require("../controllers/controllers.js");

router.post("/", registerApp);

router.put("/:appId", indexDocument);

router.get("/:appId", getConfigs);

router.get("/:appId/value", getValue);

router.delete("/:appId/", removeConfigs);

router.delete("/:appId/removeConfig", removeConfig);

module.exports = router;
