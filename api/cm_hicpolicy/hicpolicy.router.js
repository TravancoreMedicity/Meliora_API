const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { hicPolicyInsert, hicPolicyUpdate, getHicpolicy, getHicpolicyById,
    hicPolicyDelete, getHicpolicyStatus } = require('../cm_hicpolicy/hicpolicy.controller');

router.post("/", checkToken, hicPolicyInsert);
router.patch("/", checkToken, hicPolicyUpdate);
router.get("/", checkToken, getHicpolicy);


router.post("/byid", checkToken, getHicpolicyById);

router.delete("/", checkToken, hicPolicyDelete);


router.get("/status", checkToken, getHicpolicyStatus);


module.exports = router;