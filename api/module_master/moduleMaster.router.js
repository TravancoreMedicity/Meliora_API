const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { moduleInsert, getModule, moduleMasterById, getdataById, moduleUpdate, moduleDelete } = require('../module_master/moduleMaster.controller')

router.post("/", checkToken, moduleInsert);
router.get("/", checkToken, getModule);
router.get("/:id", checkToken, moduleMasterById);
router.patch("/", checkToken, moduleUpdate);
router.post("/getById", checkToken, getdataById)
router.delete("/", checkToken, moduleDelete);


module.exports = router;