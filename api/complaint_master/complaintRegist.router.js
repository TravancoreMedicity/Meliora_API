const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { complaintRegistInsert, complaintRegistUpdate, getcomplaintRegist, getcomplaintRegistByID,
    getcomplaintListbylogin, getcomplaintListbydept, getAssignedcomplaint,
    getRctifiedcomplaint, getverifiedcmp } = require('../complaint_master/complaintRegist.controller');

router.post("/", checkToken, complaintRegistInsert);

router.patch("/", checkToken, complaintRegistUpdate);

router.get("/complit", checkToken, getcomplaintRegist);

router.post("/byid", checkToken, getcomplaintRegistByID);

router.get('/loginbysec/:id', checkToken, getcomplaintListbylogin);

router.get('/compltbydept/:id', checkToken, getcomplaintListbydept);
router.get('/assigncmpl', checkToken, getAssignedcomplaint);
router.get('/getreccmp', getRctifiedcomplaint, getRctifiedcomplaint);

router.get('/verified', checkToken, getverifiedcmp);



module.exports = router;