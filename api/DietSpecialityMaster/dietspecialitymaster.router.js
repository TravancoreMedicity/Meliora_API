const { checkToken } = require('../../authentication/token_validation');
const { requireMenuRight } = require('../../authentication/menuRights');
const { stampActor } = require('../../authentication/userChecks');
const { MENU_SPECIALITY } = require('../../authentication/menuNumbers');
const { insertDietSpecialityDetail,
    getAllinsertDietSpecialityDetail,
    updateinsertDietSpecialityDetail
} = require('./dietspecialitymaster.controller');

const router = require('express').Router();


// Writes need the right of the "Diet Speciality Master" screen (menu 349)
router.post("/insert", checkToken, requireMenuRight(MENU_SPECIALITY), stampActor('created_by'), insertDietSpecialityDetail);
router.get("/getallordertype", checkToken, getAllinsertDietSpecialityDetail);
router.patch("/update", checkToken, requireMenuRight(MENU_SPECIALITY), stampActor('updated_by'), updateinsertDietSpecialityDetail);


module.exports = router;