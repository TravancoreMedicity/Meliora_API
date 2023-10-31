const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { ModelInsert, ModelView, ModelUpdate } = require('../am_model/model.contoller');

router.post('/insert', checkToken, ModelInsert)
router.get('/view', checkToken, ModelView)
router.patch('/update', checkToken, ModelUpdate)
module.exports = router