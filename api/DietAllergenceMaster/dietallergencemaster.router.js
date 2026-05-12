const router = require('express').Router();
const { checkToken } = require('../../authentication/token_validation');

const {
    insertDietAllergenMaster,
    getAllDietAllergenceMaster,
    updateDietAllergenceMaster
} = require('./dietallergencemaster.controller');

router.post("/insert", checkToken, insertDietAllergenMaster);
router.get("/getall", checkToken, getAllDietAllergenceMaster);
router.patch("/update", checkToken, updateDietAllergenceMaster);

module.exports = router;