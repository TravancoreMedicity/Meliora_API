const router = require("express").Router();
const { SubmodelInsert, Submodelview, SubmodelUpdate } = require('../am_submodel/submodel.controller');

router.post('/insert', SubmodelInsert)
router.get('/view', Submodelview)
router.patch('/update', SubmodelUpdate)
module.exports = router