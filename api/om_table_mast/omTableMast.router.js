const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { omTableInsert, omTableUpdate, omtableGet, omtableGetselect } = require("../om_table_mast/omTableMast.controller");

router.post("/", checkToken, omTableInsert);
router.patch("/", checkToken, omTableUpdate);
router.get("/", checkToken, omtableGet);
router.get("/select", checkToken, omtableGetselect);


module.exports = router;