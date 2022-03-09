const express = require("express");

const router = express.Router();

const {
  registerApp,
  indexDocument,
  getAppConfig,
  getIndexDocument,
  getValue,
  // removeConfigs,
  // removeConfig,
} = require("../controllers/controllers.js");

router.post("/register", registerApp);

router.post("/indexDocument/:appId", indexDocument);

router.get("/getAppConfig/:appId", getAppConfig);

router.get("/getDocument/:appId", getIndexDocument);

router.get("/getValue/:appId", getValue);

// router.delete("/:appId/", removeConfigs);

// router.delete("/:appId/removeConfig", removeConfig);

module.exports = router;
