const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { CondemnationList, ServiceList } = require('../am_spare_condemnation/am_spare_condemnation.controller')

router.get("/CondemnationList/:id", checkToken, CondemnationList)
router.get("/ServiceList/:id", checkToken, ServiceList)


module.exports = router