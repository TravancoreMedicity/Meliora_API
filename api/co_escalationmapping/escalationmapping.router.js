const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { escmappingInsert, escMappingSelect, checkInservalue } = require('../co_escalationmapping/escalationmapping.controller');

router.post("/", checkToken, escmappingInsert);
router.get("/", checkToken, escMappingSelect);

router.get("/check", checkToken, checkInservalue);



module.exports = router;