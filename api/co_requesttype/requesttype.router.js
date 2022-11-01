const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { requestTypeInsert, getRequestType, getRequestTypeById, requestTypeUpdate,
    deleteRequestType, getRequestTypeStatus } = require('../co_requesttype/requesttype.controller');

router.post("/", checkToken, requestTypeInsert);
router.get("/", checkToken, getRequestType);
router.patch("/", checkToken, requestTypeUpdate);

router.post("/byid", checkToken, getRequestTypeById);

router.delete("/", checkToken, deleteRequestType);


router.get("/status", checkToken, getRequestTypeStatus)

module.exports = router;