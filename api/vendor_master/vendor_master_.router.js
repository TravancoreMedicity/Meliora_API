const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { InsertVendors, getVendor, updateVendors, inactiveRoomtype, getRoomoracle } = require('./vendor_master_controller');
router.post("/insert", checkToken, InsertVendors);
router.get("/getVendor", checkToken, getVendor);
router.patch("/", checkToken, updateVendors);
router.patch("/inactive", checkToken, inactiveRoomtype);
router.get("/rmtypeoracle", checkToken, getRoomoracle);

module.exports = router;