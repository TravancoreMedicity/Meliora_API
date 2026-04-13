const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { getCRFDatas, insertWorkOrderDetails, getWorkOrderDetails, getmaterialData, getLastWoNumber, woLevelApproval, getApprovedWo, getCrfItem } = require('./workOrder.controller');

router.get('/getCRFDatas', checkToken, getCRFDatas)
router.post('/insertWorkOrderDetails', checkToken, insertWorkOrderDetails)
router.get('/getWorkOrderDetails', checkToken, getWorkOrderDetails);
router.get('/getmaterialData/:id', checkToken, getmaterialData);
router.get('/getLastWoNumber', checkToken, getLastWoNumber);
router.post('/woLevelApproval', checkToken, woLevelApproval)
router.get('/getApprovedWo', checkToken, getApprovedWo);
router.get('/getCrfItem/:id', checkToken, getCrfItem);

module.exports = router


