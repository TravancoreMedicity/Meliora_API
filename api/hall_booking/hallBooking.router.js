const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { hallbookingInsert, getHallBooking, hallbookingUpdate } = require('./hallBooking.controller')

router.post("/", checkToken, hallbookingInsert);
router.get("/", checkToken, getHallBooking);
router.patch("/", checkToken, hallbookingUpdate);


module.exports = router;