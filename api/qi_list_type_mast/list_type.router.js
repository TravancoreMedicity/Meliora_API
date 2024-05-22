
const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { qiTypeListInsert, QITypeView, QITypeUpdate, getQITypeActive } = require('./list_type.controller');
router.post('/insert', checkToken, qiTypeListInsert);
router.get('/select', checkToken, QITypeView);
router.patch('/update', checkToken, QITypeUpdate);
router.get('/active', checkToken, getQITypeActive);

module.exports = router;