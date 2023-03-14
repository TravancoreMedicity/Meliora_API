const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { getcomplaintAll } = require('../complaint_hic/complaintHic.controller');

router.get("/compalint/all", checkToken, getcomplaintAll);


module.exports = router;