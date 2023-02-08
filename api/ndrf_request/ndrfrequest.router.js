const router = require('express').Router();
const { checkToken } = require("../../authentication/token_validation");
const { InsertNdrf, getNdrfList } = require('../ndrf_request/ndrfrequest.controller')


router.post("/NdrfInsert", checkToken, InsertNdrf)
router.get("/", checkToken, getNdrfList);


module.exports = router;