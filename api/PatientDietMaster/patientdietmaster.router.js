const router = require('express').Router();
const { checkToken } = require('../../authentication/token_validation');

const {
    insertPatientDietMaster,
    getAllPatientDietMaster,
    updatePatientDietMaster
} = require('./patientdietmaster.controller');


router.post("/patient/insert", checkToken, insertPatientDietMaster);
router.get("/patient/getallpatientdiet", checkToken, getAllPatientDietMaster);
router.patch("/patient/update", checkToken, updatePatientDietMaster);

module.exports = router;