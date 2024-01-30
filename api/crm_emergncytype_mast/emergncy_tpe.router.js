const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { EmergncyTypeInsert, EmergncyTypeView, EmergncyTypeUpdate } = require('../crm_emergncytype_mast/emergency_type.controller');

router.post('/insert', checkToken, EmergncyTypeInsert)
router.get('/view', checkToken, EmergncyTypeView)
router.patch('/update', checkToken, EmergncyTypeUpdate)
module.exports = router