const router = require("express").Router();
const { ModelInsert, ModelView, ModelUpdate } = require('../am_model/model.contoller');

router.post('/insert', ModelInsert)
router.get('/view', ModelView)
router.patch('/update', ModelUpdate)
module.exports = router