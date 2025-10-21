const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { insertLevel, viewCondemnationLevel, updateLevel, 
    // getCondemnationApprovalRights, getCondemnationAllDetails,
    getActiveCondemnationLevel,getCondemnActiveApprovalLevel
} = require('./approval_level_mast.controller');

router.post('/insertLevel', checkToken, insertLevel)
router.get('/viewCondemnationLevel', checkToken, viewCondemnationLevel)
router.patch('/updateLevel', checkToken, updateLevel)
router.get('/getTopActiveCondemnationLevel', checkToken, getActiveCondemnationLevel)
router.get('/getCondemnActiveApprovalLevel', checkToken, getCondemnActiveApprovalLevel)

// router.post("/getCondemnationApprovalRights", checkToken, getCondemnationApprovalRights);
// router.post("/getCondemnationAllDetails", checkToken, getCondemnationAllDetails);

module.exports = router;