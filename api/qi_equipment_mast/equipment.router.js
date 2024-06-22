
const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { EquipmentInsert, EquipmentViews, EquipmentUpdate, EquipmentActive, GetProcedureList } = require('./equipment.controller');
router.post('/insert', checkToken, EquipmentInsert);
router.get('/select', checkToken, EquipmentViews);
router.patch('/update', checkToken, EquipmentUpdate);
router.get('/active/:id', checkToken, EquipmentActive);
router.get('/procedure/:id', checkToken, GetProcedureList);

module.exports = router;