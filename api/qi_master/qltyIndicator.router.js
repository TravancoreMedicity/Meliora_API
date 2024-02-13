const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");

const { qualityIndicatorInsert, qualityIndicatorView, qualityIndicatorUpdate } = require('./qltyIndicator.controller');
router.post('/insert', checkToken, qualityIndicatorInsert);
router.get('/select', checkToken, qualityIndicatorView);
router.patch('/update', checkToken, qualityIndicatorUpdate);
module.exports = router;