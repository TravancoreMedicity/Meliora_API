
const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { EquipmentInsert, EquipmentViews, EquipmentUpdate } = require('./equipment.controller');
router.post('/insert', checkToken, EquipmentInsert);
router.get('/select', checkToken, EquipmentViews);
router.patch('/update', checkToken, EquipmentUpdate);


module.exports = router;