const { checkToken } = require('../../authentication/token_validation');
const { insertDietSpecialityDetail,
    getAllinsertDietSpecialityDetail,
    updateinsertDietSpecialityDetail
} = require('./dietspecialitymaster.controller');

const router = require('express').Router();


router.post("/insert", checkToken, insertDietSpecialityDetail);
router.get("/getallordertype", checkToken, getAllinsertDietSpecialityDetail);
router.patch("/update", checkToken, updateinsertDietSpecialityDetail);


module.exports = router;