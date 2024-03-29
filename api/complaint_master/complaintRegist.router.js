const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { complaintRegistInsert, complaintRegistUpdate, getcomplaintRegistByID,
    getcomplaintListbylogin, getcomplaintListbydept,
    getcomplaintAll, getapptokenbydept } = require('../complaint_master/complaintRegist.controller');

router.post("/", checkToken, complaintRegistInsert);
router.patch("/", checkToken, complaintRegistUpdate);
router.post("/byid", checkToken, getcomplaintRegistByID);
router.get('/loginbysec/:id', checkToken, getcomplaintListbylogin);
router.get('/compltbydept/:id', checkToken, getcomplaintListbydept);
router.get("/compalint/all", checkToken, getcomplaintAll);

router.get('/getapptoken/:id', checkToken, getapptokenbydept);

module.exports = router;