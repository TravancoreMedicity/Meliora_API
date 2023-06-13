const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { PriorityInsertData, PriorityUpdateData, PrioritySelectData, PrioritySelectCmp } = require("../cm_prority_mst/cm_priority.controller");

router.post("/", checkToken, PriorityInsertData);

router.patch("/", checkToken, PriorityUpdateData);

router.get("/", checkToken, PrioritySelectData);

router.get("/select", checkToken, PrioritySelectCmp);


module.exports = router;