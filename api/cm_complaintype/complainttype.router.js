const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { complaintTypeInsert, complaintTypeUpdate, getcomplaintType,
    getcomplaintTypeById, deletecomplaintType, complaintTypeById, getcomplaintTypeStatus } = require('../cm_complaintype/complainttype.controller');

router.post("/", checkToken, complaintTypeInsert);
router.patch("/", checkToken, complaintTypeUpdate);
router.get("/", checkToken, getcomplaintType);


router.post("/byid", checkToken, getcomplaintTypeById);
router.get("/status", checkToken, getcomplaintTypeStatus);

router.delete("/", checkToken, deletecomplaintType);
router.get("/:id", checkToken, complaintTypeById);

module.exports = router;