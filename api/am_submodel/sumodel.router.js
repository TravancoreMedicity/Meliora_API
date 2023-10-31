const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { SubmodelInsert, Submodelview, SubmodelUpdate } = require('../am_submodel/submodel.controller');

router.post('/insert', checkToken, SubmodelInsert)
router.get('/view', checkToken, Submodelview)
router.patch('/update', checkToken, SubmodelUpdate)
module.exports = router