const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { dietInsertData, dietUpdateData, dietSelectData, dietGetDataById, roomSelectData } = require("../diet/diet.controller");

router.post("/", checkToken, dietInsertData);

router.patch("/", checkToken, dietUpdateData);

router.get("/", checkToken, dietSelectData);

router.post("/byid", checkToken, dietGetDataById);

router.get("/select", checkToken, roomSelectData);

module.exports = router;