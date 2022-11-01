const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { InsertNurseStation, getNurseStation, UpdateNurseStation, getNurstation } = require("../co_nursestation/nursestation.controller");

router.post("/", checkToken, InsertNurseStation);
router.get("/", checkToken, getNurseStation);
router.patch("/", checkToken, UpdateNurseStation);

router.get('/getnurstn', checkToken, getNurstation)

module.exports = router;