const router = require("express").Router();
const { CustodianDeptInsert, CustodianDepView, CustodianDepUpdate, CustodianDepSelect } = require('../am_custodian_department/am_custodian_dept.controller');

router.post('/insert', CustodianDeptInsert)
router.get('/view', CustodianDepView)
router.patch('/update', CustodianDepUpdate)
router.get('/select', CustodianDepSelect)
module.exports = router