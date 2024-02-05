const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { EmergncyTypeInsert, EmergncyTypeView, EmergncyTypeUpdate,
    CrmEmerListSelect } = require('../crm_emergncytype_mast/emergency_type.controller');

router.post('/insert', checkToken, EmergncyTypeInsert)
router.get('/view', checkToken, EmergncyTypeView)
router.patch('/update', checkToken, EmergncyTypeUpdate)

router.get('/CrmEmerListSelect', checkToken, CrmEmerListSelect)
module.exports = router