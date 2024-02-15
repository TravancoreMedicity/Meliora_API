const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");

const { qualityDepInsert, qualityDeptView, qualityDeptUpdate, qualityDeptList } = require('./qidepartment.controller');
router.post('/insert', checkToken, qualityDepInsert);
router.get('/select', checkToken, qualityDeptView);
router.patch('/update', checkToken, qualityDeptUpdate);
router.get('/active', checkToken, qualityDeptList);

module.exports = router;