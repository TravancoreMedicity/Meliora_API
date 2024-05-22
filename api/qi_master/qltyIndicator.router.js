const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");

const { qualityIndicatorInsert, qualityIndicatorView, qualityIndicatorUpdate, getQualityIndicatorsDeptWise } = require('./qltyIndicator.controller');
router.post('/insert', checkToken, qualityIndicatorInsert);
router.get('/select', checkToken, qualityIndicatorView);
router.patch('/update', checkToken, qualityIndicatorUpdate);
router.get('/getqi/:id', checkToken, getQualityIndicatorsDeptWise);
module.exports = router;