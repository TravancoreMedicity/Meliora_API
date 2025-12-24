const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { insertRateVariation, selectRateVariation, insertComment, getCommentsbyID, ResolvedRateVariation, insertRateVariationBulk, RateVarWithMarginDiff, ratevariationResolvedList } = require('./RateVariationReport.controller');
router.post('/insertRateVariation', checkToken, insertRateVariation);
router.get('/selectRateVariation', checkToken, selectRateVariation);
router.post('/insertComment', checkToken, insertComment);
router.get('/getCommentsbyID/:id', checkToken, getCommentsbyID);
router.post('/insertRateVariationBulk', checkToken, insertRateVariationBulk);
router.post('/RateVarWithMarginDiff', checkToken, RateVarWithMarginDiff);
router.get('/ratevariationResolvedList', checkToken, ratevariationResolvedList);

module.exports = router;


