const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { selectRateVariation, insertComment, getCommentsbyID, insertRateVariationBulk, RateVarWithMarginDiff, ratevariationResolvedList, getResolvedComments, getInsertedVarationData } = require('./RateVariationReport.controller');

router.get('/selectRateVariation', checkToken, selectRateVariation);
router.post('/insertComment', checkToken, insertComment);
router.get('/getCommentsbyID/:id', checkToken, getCommentsbyID);
router.post('/insertRateVariationBulk', checkToken, insertRateVariationBulk);
router.post('/RateVarWithMarginDiff', checkToken, RateVarWithMarginDiff);
router.get('/ratevariationResolvedList', checkToken, ratevariationResolvedList);
router.get('/getResolvedComments/:id', checkToken, getResolvedComments);
router.get('/getInsertedVarationData', checkToken, getInsertedVarationData);

module.exports = router;


