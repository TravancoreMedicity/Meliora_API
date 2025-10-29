const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { insertCondemMasterData, UpdateItemDetails, getItemDetails, getItemSlno, updateCondemMasterData, getpendingApprovals, getItemUnderForm, updateScarpStoreData,
    ApproveData, getAllpendingApprovals, getCondemnationList,  UpdateAssetStatus, UpdateSpareStatus, getDeptScrapStore,AddmoreItemsInForm,
    getScrapNotUnderCategorization,getAddedScrapNotUnderCategorization,getInsertNewItemUnderCondemnation,UpdateScrapCategorize,UpdateItemScrapCategorize,
    getcondemdAssetCategoryWiseDashboard,ViewCategorizedItems,ViewCategorizedAddedItems,getSelectedSupplierRateDetails,submitScrapForm,getSubmittedScarpForms,
    getEmployeeScrapApprovalLevel,getCategoryQualityUnderscrapForm,ViewCategorizedItemsUnderscrapForm,ViewCategorizedAddedItemsUnderscrapForm,getRateDetailsForCategoryQuality,
    UpdateScrapForm,getScrapsApproved,getScrapApprovePanels,EditScrapForm,getCondemnInchargePendingApproval,getCondemnHodPendingApproval,InchargeReview,HodReview,
    getEmployeeCondemnApprovalLevel,getPendingCondemApprovalList,getCondemnLlevelsApproved,CondemnUpdateLevel,getcondemlevelDetails,
    getAllDeptApprovedOrRejected,getCondemnInchargeApprovalList
} = require('./am_condem.controller')


router.post('/insertCondemMasterData', checkToken, insertCondemMasterData)
router.patch('/UpdateItemDetails', checkToken, UpdateItemDetails)
router.post("/getItemDetails", checkToken, getItemDetails);
router.post("/getItemSlno", checkToken, getItemSlno);
router.patch('/updateCondemMasterData', checkToken, updateCondemMasterData)
router.post("/getItemUnderForm", checkToken, getItemUnderForm);
router.patch('/updateScarpStoreData', checkToken, updateScarpStoreData)
router.patch('/ApproveData', checkToken, ApproveData)
router.patch('/UpdateAssetStatus', checkToken, UpdateAssetStatus)
router.patch('/UpdateSpareStatus', checkToken, UpdateSpareStatus)
router.post("/getDeptScrapStore", checkToken, getDeptScrapStore);
router.post("/getpendingApprovals", checkToken, getpendingApprovals);
// router.post("/getDeptAllApprovedCondemnationList", checkToken, getDeptAllApprovedCondemnationList);

router.post("/getAllpendingApprovals", checkToken, getAllpendingApprovals);
router.post("/getCondemnationList", checkToken, getCondemnationList);
router.post('/AddmoreItemsInForm', checkToken, AddmoreItemsInForm)
router.get('/getScrapNotUnderCategorization', checkToken, getScrapNotUnderCategorization)
router.get('/getAddedScrapNotUnderCategorization', checkToken, getAddedScrapNotUnderCategorization)
router.post("/insertNewScrapUnderCondemnation", checkToken, getInsertNewItemUnderCondemnation);
router.patch('/UpdateScrapCategorize', checkToken, UpdateScrapCategorize)
router.patch('/UpdateItemScrapCategorize', checkToken, UpdateItemScrapCategorize)
router.get('/getcondemdAssetCategoryWiseDashboard', checkToken, getcondemdAssetCategoryWiseDashboard)
router.post("/ViewCategorizedItems", checkToken, ViewCategorizedItems);
router.post("/ViewCategorizedAddedItems", checkToken, ViewCategorizedAddedItems);
router.post("/getSelectedSupplierRateDetails", checkToken, getSelectedSupplierRateDetails);
router.post('/submitScrapForm', checkToken, submitScrapForm)  
router.get('/getSubmittedScarpForms', checkToken, getSubmittedScarpForms)
router.get("/getEmployeeScrapApprovalLevel/:id", checkToken, getEmployeeScrapApprovalLevel)
router.get("/getCategoryQualityUnderscrapForm/:id", checkToken, getCategoryQualityUnderscrapForm)

router.post("/ViewCategorizedItemsUnderscrapForm", checkToken, ViewCategorizedItemsUnderscrapForm);
router.post("/ViewCategorizedAddedItemsUnderscrapForm", checkToken, ViewCategorizedAddedItemsUnderscrapForm);
router.post("/getRateDetailsForCategoryQuality", checkToken, getRateDetailsForCategoryQuality);
router.patch('/EditScrapForm', checkToken, EditScrapForm)
router.patch('/UpdateScrapForm', checkToken, UpdateScrapForm)
router.post("/getScrapsApproved", checkToken, getScrapsApproved)
router.get("/getScrapApprovePanels/:id", checkToken, getScrapApprovePanels)

router.post("/getCondemnInchargePendingApproval", checkToken, getCondemnInchargePendingApproval);
router.post("/getCondemnHodPendingApproval", checkToken, getCondemnHodPendingApproval);
router.patch('/inchargeReview', checkToken, InchargeReview)
router.patch('/HodReview', checkToken, HodReview)
router.get("/getEmployeeCondemnApprovalLevel/:id", checkToken, getEmployeeCondemnApprovalLevel)
router.post("/getPendingCondemApprovalList", checkToken, getPendingCondemApprovalList);
router.get("/getCondemnLlevelsApproved/:id", checkToken, getCondemnLlevelsApproved)
router.patch('/CondemnUpdateLevel', checkToken, CondemnUpdateLevel)
router.post("/getcondemlevelDetails", checkToken, getcondemlevelDetails);
router.post("/getAllDeptApprovedOrRejected", checkToken, getAllDeptApprovedOrRejected);

router.post("/getCondemnInchargeApprovalList", checkToken, getCondemnInchargeApprovalList);


module.exports = router