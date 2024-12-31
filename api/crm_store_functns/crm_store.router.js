const router = require('express').Router();
const { checkToken } = require("../../authentication/token_validation");
const { searchPendingStore, getCRSStorePending, getCrsReceiceAllList, getPendingGrnPo, existCheck,
    grnDetailsInsert, grnDetailsUpdate, updateGrnItemQnty, getPOItemDetails, UpdateStoreReceive, getStoreList,
    searchReceivedDetails, getCRFDataForSubstore, getCRFDetails, crfReqItemStoreAcknow, StoreToUserAcknowledgement,
    getUserInfoDetails, updateStoreAcknow, getUserAckDetails, updateUserReply, getReqItemForCRFView
} = require('../crm_store_functns/crm_store.controller')

// CRS STORE
router.get("/getCRSStorePending", checkToken, getCRSStorePending);
router.get("/getCrsReceiceAllList", checkToken, getCrsReceiceAllList);
router.post('/searchData', checkToken, searchPendingStore);
router.post('/searchFullReceive', checkToken, searchReceivedDetails);
router.get("/getGrnPO", checkToken, getPendingGrnPo);
router.post('/existPO', checkToken, existCheck);
router.post('/grnInsert', checkToken, grnDetailsInsert);
router.post('/grnUpdate', checkToken, grnDetailsUpdate);
router.post('/updateQty', checkToken, updateGrnItemQnty);
router.post('/getItems', checkToken, getPOItemDetails);
router.post('/storeReceive', checkToken, UpdateStoreReceive);
router.get('/getStores', checkToken, getStoreList);


// SUBSTORE
router.get("/crfPOView", checkToken, getCRFDataForSubstore);
router.get("/crfReq/:id", checkToken, getCRFDetails);
router.post('/insert', checkToken, crfReqItemStoreAcknow);
router.patch('/updateReceive', checkToken, StoreToUserAcknowledgement);
router.post("/getAckSave", checkToken, getUserInfoDetails);
router.patch("/update", checkToken, updateStoreAcknow);
router.get("/viewStoreAck/:id", checkToken, getUserAckDetails);
router.patch("/userReply", checkToken, updateUserReply);

router.get('/storeReceivedItem/:id', checkToken, getReqItemForCRFView);





// router.get("/getGrnCount", checkToken, grnCountView);
// router.patch("/ReceiveUpdate", checkToken, storeReceiveUpdate);

// router.get("/getPORecivedList/:id", checkToken, getPORecivedList);
// router.post("/InsertPoDetailsLog", checkToken, InsertPoDetailsLog);
// router.post("/InsertPoDetailsLogFully", checkToken, InsertPoDetailsLogFully);
// router.get("/getPOListSubStorewisePend/:id", checkToken, getPOListSubStorewisePend);
// router.get("/getPOListSubStorewiseAllList/:id", checkToken, getPOListSubStorewiseAllList);
// router.patch("/SubstoreReciverdataUpdate", checkToken, SubstoreReciverdataUpdate);

module.exports = router;