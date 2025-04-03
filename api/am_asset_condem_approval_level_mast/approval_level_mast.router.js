const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { insertLevel, viewCondemnationLevel, updateLevel, getCondemnationApprovalRights, getCondemnationAllDetails,
    getActiveCondemnationLevel
} = require('./approval_level_mast.controller');

router.post('/insertLevel', checkToken, insertLevel)
router.get('/viewCondemnationLevel', checkToken, viewCondemnationLevel)
router.patch('/updateLevel', checkToken, updateLevel)
router.post("/getCondemnationApprovalRights", checkToken, getCondemnationApprovalRights);
router.post("/getCondemnationAllDetails", checkToken, getCondemnationAllDetails);

router.get('/getActiveCondemnationLevel', checkToken, getActiveCondemnationLevel)

module.exports = router;