const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { AuthoriztnInsertData, AuthorizationGets, AuthUpdateData, getDeptSeconId,
    getDeptSeconIncharge, getDeptSeconHod
} = require("../co_inchhod_authriztn/inchhod_authoriztn.controller");

router.post("/", checkToken, AuthoriztnInsertData);
router.get("/", checkToken, AuthorizationGets);
router.patch("/", checkToken, AuthUpdateData);

router.get("/getDeptSeconId/:id", checkToken, getDeptSeconId)
router.get("/getDeptSeconIncharge/:id", checkToken, getDeptSeconIncharge)
router.get("/getDeptSeconHod/:id", checkToken, getDeptSeconHod)

module.exports = router;