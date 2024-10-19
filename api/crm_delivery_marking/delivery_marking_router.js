const router = require('express').Router();
const { checkToken } = require("../../authentication/token_validation");
const { insertDeliveryMarking, InsertDeliveredPO, checkPOExist, getItemDetails, InsertCheckedItems,
    updateDeliveredItemQty, updatePOStatus, getSupplier, getAllDeliveredDetails, getAllPoDetails,
    getPendingPoSup } = require('./delivery_marking.controller')

router.post("/delMarkInsert", checkToken, insertDeliveryMarking);
router.post("/insertPo", checkToken, InsertDeliveredPO);
// router.get("/existBill/:id", checkToken, checkDeliveryExist);
router.get("/existPo/:id", checkToken, checkPOExist);
router.get("/getitem/:id", checkToken, getItemDetails);
router.post('/updateqty', checkToken, updateDeliveredItemQty);
router.post('/updatePoStatus', checkToken, updatePOStatus);
router.post('/insertCheckItems', checkToken, InsertCheckedItems);
router.get("/supplier", checkToken, getSupplier);
// router.post("/viewAll", checkToken, getAllDeliveredDetails);
router.get("/getpo/:id", checkToken, getAllPoDetails);
router.get("/pendingPo/:id", checkToken, getPendingPoSup);


module.exports = router;