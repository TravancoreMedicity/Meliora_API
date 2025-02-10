const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { approvalInsert, viewApproval, updateApproval } = require('./approval.controller');

router.post('/insert', checkToken, approvalInsert)
router.get('/view', checkToken, viewApproval)
router.patch('/update/edit', checkToken, updateApproval)

module.exports = router