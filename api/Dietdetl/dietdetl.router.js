const router = require('express').Router();
const { checkToken } = require("../../authentication/token_validation");
const { dietdetlinsert, getdatadetl, updatedietdetl, getdatedeittype } = require('../Dietdetl/dietdetl.controller')
const { requireMenuRight } = require("../../authentication/menuRights");
const { stampActor } = require("../../authentication/userChecks");
const { MENU_DIET_MENU_SETTING } = require("../../authentication/menuNumbers");

router.post('/insert', checkToken, requireMenuRight(MENU_DIET_MENU_SETTING), stampActor('em_id'), dietdetlinsert)
router.get('/getdietdetl', checkToken, getdatadetl)
router.patch('/update/dietdetl', checkToken, requireMenuRight(MENU_DIET_MENU_SETTING), stampActor('em_id'), updatedietdetl)
router.get('/date/:id', checkToken, getdatedeittype)


module.exports = router;