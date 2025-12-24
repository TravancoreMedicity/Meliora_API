const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { InsertStoremasterRights, getStoreReportViewRights, updateReportRightsView, StoreReportRights } = require("./store_master.controller");

router.post("/InsertStoremasterRights", checkToken, InsertStoremasterRights);
router.get("/getStoreReportViewRights", checkToken, getStoreReportViewRights);
router.post("/updateReportRightsView", checkToken, updateReportRightsView);
router.post("/StoreReportRights", checkToken, StoreReportRights);

module.exports = router;
