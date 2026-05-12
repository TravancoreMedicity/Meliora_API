const router = require('express').Router();
const { checkToken } = require('../../authentication/token_validation');
const { insertUnitMaster, getAllUnitMaster, updateUnitMaster } = require('./unitMaster.controller');


router.post("/insert", checkToken, insertUnitMaster);
router.get("/getall", checkToken, getAllUnitMaster);
router.patch("/update", checkToken, updateUnitMaster);

module.exports = router;