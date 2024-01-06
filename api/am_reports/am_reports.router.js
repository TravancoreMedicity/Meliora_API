const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { getItemList, getItemsFronList } = require('../am_reports/am_reorts.controller');


router.get("/getItemList", checkToken, getItemList);
router.post('/getItemsFronList', checkToken, getItemsFronList)
module.exports = router;


