const router = require('express').Router();
const { checkToken } = require("../../authentication/token_validation");
const { searchPendingStore, getCRSStorePending, getCrsReceiveAllList, getPendingGrnPo, existCheck,
    grnDetailsInsert, grnDetailsUpdate, updateGrnItemQnty, getPOItemDetails, UpdateStoreReceive, getStoreList,
    searchReceivedDetails, getCRFDataForSubstore, getCRFDetails, crfReqItemStoreAcknow, StoreToUserAcknowledgement,
    getUserInfoDetails, updateStoreAcknow, getUserAckDetails, updateUserReply, getReqItemForCRFView
} = require('../crm_store_functns/crm_store.controller')

// CRS STORE
router.get("/getCRSStorePending", checkToken, getCRSStorePending);
router.get("/getCrsReceiveAllList", checkToken, getCrsReceiveAllList);
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

// storeReceivedItem against CRF this is used in CRF User Ack Window
router.get('/storeReceivedItem/:id', checkToken, getReqItemForCRFView);


module.exports = router;