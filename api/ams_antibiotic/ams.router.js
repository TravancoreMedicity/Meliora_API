const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const {
  insertAntibiotic,
  getAllAntibiotics,
  updateAntibiotic,
} = require("./ams.controller");

router.post("/insert", checkToken, insertAntibiotic);
router.get("/getAntibiotics", checkToken, getAllAntibiotics);
router.patch("/update", checkToken, updateAntibiotic);

module.exports = router;
