const express = require("express");

const router = express.Router();

const {
  registerApp,
  indexDocument,
  // getAllSettings,
  // getSetting,
  // getValue,
  // deleteSetting,
} = require("../controllers/controllers.js");

router.post("/", registerApp);

router.post("/:appId", indexDocument);

// router.get("/:appId", getAllSettings);

// router.get("/:appId/:documentId", getSetting);

// router.get("/value/:appId/:documentId", getValue);

// router.put("/:appId/:documentId", deleteSetting);

module.exports = router;
