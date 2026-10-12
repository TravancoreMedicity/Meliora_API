const router = require('express').Router();
const { checkToken } = require('../../authentication/token_validation');

const {
    insertDietTemplate,
    getAllDietTemplate,
    updateDietTemplate
} = require('./diettemplate.controller');

router.post("/insert", checkToken, insertDietTemplate);
router.get("/getall", checkToken, getAllDietTemplate);
router.patch("/update", checkToken, updateDietTemplate);

module.exports = router;