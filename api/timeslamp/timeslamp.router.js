const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { timeslampInsertData, timeslampUpdateData, timeslampSelectData, timeslampGetDataById } = require("../timeslamp/timeslamp.controller");
router.post("/", checkToken, timeslampInsertData);
router.patch("/", checkToken, timeslampUpdateData);
router.get("/", checkToken, timeslampSelectData);
router.post("/byid", checkToken, timeslampGetDataById);
module.exports = router;