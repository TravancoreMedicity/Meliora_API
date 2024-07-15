const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { OpAssessmentInsert, UpdateServiceTimeOfOPPatients, getAseesementReport } = require('./assessment.controller');

router.post('/insert', checkToken, OpAssessmentInsert);
router.patch('/updateTime', checkToken, UpdateServiceTimeOfOPPatients);
router.post('/view', checkToken, getAseesementReport);


module.exports = router;
