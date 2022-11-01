const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { ratelistInsertData, ratelistUpdateData, ratelistSelectData, ratelistGetDataById, roomcatSelect, dietSelect, dietTypeSelect } = require("../ratelist/ratelist.controller");
router.post("/", checkToken, ratelistInsertData);
router.patch("/", checkToken, ratelistUpdateData);
router.get("/", checkToken, ratelistSelectData);
router.post("/byId", checkToken, ratelistGetDataById);

router.get("/rmcatora", checkToken, roomcatSelect);
router.get("/diet", checkToken, dietSelect)
router.get("/diettype", checkToken, dietTypeSelect)


module.exports = router;
