var {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
  } = require("../controllers/user");
  var express = require("express");
  var router = express.Router();
  
  router.get("/", getAllUsers);
  router.get("/:username", getUser);
  router.post("/", createUser);
  router.put("/:username", updateUser);
  router.delete("/:username", deleteUser);
  
  module.exports = router;