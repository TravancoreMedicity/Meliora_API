const router = require('express').Router();
const { checkToken } = require("../../authentication/token_validation");
const { insertDeliveryMarking, InsertDeliveredPO, checkPOExist, getItemDetails, InsertCheckedItems,
    updateDeliveredItemQty, updatePOStatus, getSupplier, getAllDeliveredDetails, viewItemChecking,
    getPendingPoSup, getSupplierDetailsForItemChecking } = require('./delivery_marking.controller')

router.post("/delMarkInsert", checkToken, insertDeliveryMarking);
router.post("/insertPo", checkToken, InsertDeliveredPO);
// router.get("/existBill/:id", checkToken, checkDeliveryExist);
router.get("/existPo/:id", checkToken, checkPOExist);
router.get("/getitem/:id", checkToken, getItemDetails);
router.post('/updateqty', checkToken, updateDeliveredItemQty);
router.post('/updatePoStatus', checkToken, updatePOStatus);
router.post('/insertCheckItems', checkToken, InsertCheckedItems);
router.get("/supplier", checkToken, getSupplier);
router.post("/viewDelv", checkToken, getAllDeliveredDetails);
router.get("/viewSupplier", checkToken, getSupplierDetailsForItemChecking);
router.post("/itemCheck", checkToken, viewItemChecking);
router.get("/pendingPo/:id", checkToken, getPendingPoSup);


module.exports = router;