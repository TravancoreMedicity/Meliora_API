const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { CustodianDeptInsert, CustodianDepView, CustodianDepUpdate, CustodianDepSelect, selectById,
    // getDeptSecAsset

} = require('../am_custodian_department/am_custodian_dept.controller');

router.post('/insert', checkToken, CustodianDeptInsert)
router.get('/view', checkToken, CustodianDepView)
router.patch('/update', checkToken, CustodianDepUpdate)
router.get('/select', checkToken, CustodianDepSelect)
router.get("/selectById/:id", checkToken, selectById)

// router.post('/getDeptSecAsset', checkToken, getDeptSecAsset)


module.exports = router