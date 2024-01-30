const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { getdataForInternalTrans } = require('../am_asset_internaltrans/asset_internaltrans.controller');


router.post("/getdataForInternalTrans", checkToken, getdataForInternalTrans)

module.exports = router;