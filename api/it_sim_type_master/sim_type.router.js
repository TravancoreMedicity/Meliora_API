const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { SimTypeInsert, SimTypeView, SimtypeUpdate } = require('../it_sim_type_master/sim_type.controller');

router.post('/insert', checkToken, SimTypeInsert)
router.get('/view', checkToken, SimTypeView)
router.patch('/update', checkToken, SimtypeUpdate)
module.exports = router