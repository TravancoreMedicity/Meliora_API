const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { getAllListDashboard, getApprvPendingDashboard, getAprvlDetailsView, getCRFPurchaseDashboard, gePurchaseDetails,
    getPurchaseApprvlView, getCrfStoreDetailsDashborad, getCRFStoreDetails, getStoreApprvlViewCRF,
    getDeliveryMarkingDetails, getAllPoDetails, getAllItemDetails, getStoreAckDetails, getUserAckDetails, getCompletedCRF

} = require('./crmDasboard.controller');

router.get("/crfApproval", checkToken, getAllListDashboard);
router.get("/getApprvPending/Dashboard/:id", checkToken, getApprvPendingDashboard);
router.get("/AprvlDetailsView/:id", checkToken, getAprvlDetailsView);

router.get("/crfPurchase", checkToken, getCRFPurchaseDashboard);
router.get("/gePurchaseDetails/Dashboard/:id", checkToken, gePurchaseDetails);
router.post("/purchaseApprvlView", checkToken, getPurchaseApprvlView);

router.get("/crfStore", checkToken, getCrfStoreDetailsDashborad);
router.get("/getStore/Dashboard/:id", checkToken, getCRFStoreDetails);
router.post("/storeApprvlView", checkToken, getStoreApprvlViewCRF);

router.post("/delivery", checkToken, getDeliveryMarkingDetails);

router.get("/getpo/:id", checkToken, getAllPoDetails);
router.post("/checkItem", checkToken, getAllItemDetails);
router.post("/storeack", checkToken, getStoreAckDetails);
router.post("/userack", checkToken, getUserAckDetails);
router.post("/compCRF", checkToken, getCompletedCRF);


module.exports = router;