const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { getPendingLIst, getTotalLIst, getDeliveryLIst } = require("../dietdelivery_status/deliverystatus.controller");

router.post("/pending", checkToken, getPendingLIst);
router.post("/totalList", checkToken, getTotalLIst);
router.post("/deliveryList", checkToken, getDeliveryLIst);

module.exports = router;