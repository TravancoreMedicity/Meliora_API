const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { requestRegistInsert, InHodExist, getAllReqBasedDept, getDetailItemList, UpdateReqMaster, getApprovListOthers,
    getAllReqBasedDeptreq, deleteItemDetails, getAllPendingApprovalsAboveHOD, getPoList, searchCrfDetails, getStoreMasterInsert, getGetStoreMaster,
    getAllHoldAndRejectItems, getackPending, UpdateItemReceiveStatus, checkStoreReturnItem, insertReturnItemDetails, getCommonMasterUpdate,
    itemReturnDetailsForViewStore, returnReplyDetails, viewItemReturnDetails, getCrfDetailsForBiomedical, getCommonMaster, getCommonMasterGet,
    getCommonMasterGetCat, getGetStoreMasterById, getStoreMasterUpdate, getCommonMasterInsert, getCommonMasterSettingGet, getCommonMasterSettingUpdate,
    getDashBoardMaster, GetDashBoardMaster, getDashboardUpdate, getDashright, getCommonMasterGetByID, GetDataCollectionMasterUpdate, GetDataCollectionMaster,
    Getdatacollection, getdefaultRights, insertDepartmentMapping } = require('./newRequestRegister.controller');

router.post("/InsertRegMast", checkToken, requestRegistInsert);
router.patch("/deleteItemList", checkToken, deleteItemDetails);
router.patch("/UpdateReqMaster", checkToken, UpdateReqMaster);

// router.post("/postDetails", checkToken, requestRegistInsertDetl);
// router.post("/postReqApproval", checkToken, requestApprovalInsert);

router.get("/InHodExist/:id", checkToken, InHodExist)
router.post('/getAllReqBasedDept', checkToken, getAllReqBasedDept);
router.get("/getAllReqBasedDeptreq/:id", checkToken, getAllReqBasedDeptreq);
router.get("/getDetailItemList/:id", checkToken, getDetailItemList);
router.get("/getApprovList/others", checkToken, getApprovListOthers);

// HOLd, reject and closed radiobutton view
router.post("/getPendingList", checkToken, getAllPendingApprovalsAboveHOD);
router.post("/getHoldRejectItems", checkToken, getAllHoldAndRejectItems);
router.post("/getPOList", checkToken, getPoList);
router.post('/searchCrf', checkToken, searchCrfDetails);

// used inform user to user ack pending CRf
router.get("/ackPending/:id", checkToken, getackPending);

// Store Return Details
router.patch("/receiveReturn", checkToken, UpdateItemReceiveStatus);
router.get("/check/:id", checkToken, checkStoreReturnItem);
router.post('/returnDetails', checkToken, insertReturnItemDetails)
router.post('/returnPending', checkToken, itemReturnDetailsForViewStore)
router.post('/returnReply', checkToken, returnReplyDetails);
router.get("/returnView/:id", checkToken, viewItemReturnDetails);

router.post("/biomedicalView", checkToken, getCrfDetailsForBiomedical);
router.post("/CommonMaster", checkToken, getCommonMaster);
router.post("/CommonMasterGet", checkToken, getCommonMasterGet);
router.post("/CommonMasterUpdate/update", checkToken, getCommonMasterUpdate);
router.post("/CommonMasterGetCat", checkToken, getCommonMasterGetCat);
router.post("/StoreMaster", checkToken, getStoreMasterInsert);
router.get("/GetStoreMaster", checkToken, getGetStoreMaster);
router.post("/GetStoreMasterById", checkToken, getGetStoreMasterById);
router.post("/StoreMaster/update", checkToken, getStoreMasterUpdate);
router.post("/CommonMasterInsert", checkToken, getCommonMasterInsert);
router.post("/CommonMasterSettingGet", checkToken, getCommonMasterSettingGet);
router.post("/CommonMasterSetting/update", checkToken, getCommonMasterSettingUpdate);
router.post("/DashBoardMaster", checkToken, getDashBoardMaster);
router.get("/GetDashBoardMaster", checkToken, GetDashBoardMaster);
router.post("/DashBoardMaster/update", checkToken, getDashboardUpdate);
router.post("/Dashright", checkToken, getDashright);
router.post("/CommonMasterGetByID", checkToken, getCommonMasterGetByID);
router.get("/Getdatacollection", checkToken, Getdatacollection);

router.post("/DataCollectionMaster", checkToken, GetDataCollectionMasterUpdate);
router.post("/DataCollectionMaster/update", checkToken, GetDataCollectionMaster);
// router.post("/datacollectionRights", checkToken, getdefaultRights);

router.get("/datacollectionRights/:id", checkToken, getdefaultRights);
router.post("/DepartmentMapping", checkToken, insertDepartmentMapping);

module.exports = router;