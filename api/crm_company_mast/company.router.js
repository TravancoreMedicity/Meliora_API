const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { companyInsert, viewCompany, updateCompany, getActiveCompany } = require('./company.controller');

router.post('/insert', checkToken, companyInsert)
router.get('/view', checkToken, viewCompany)
router.patch('/update', checkToken, updateCompany)
router.get('/active', checkToken, getActiveCompany)

module.exports = router