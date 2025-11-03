const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { AuthoriztnInsertData, AuthorizationGets, AuthUpdateData, getDeptSeconId, AuthUpdateMelData,
    getDeptSeconIncharge, getDeptSeconHod, getDeptSeconHodbyDep, AuthoriztnInsertMelData, AuthorizationMelGets
} = require("../co_inchhod_authriztn/inchhod_authoriztn.controller");

router.post("/", checkToken, AuthoriztnInsertData);
router.get("/", checkToken, AuthorizationGets);
router.patch("/", checkToken, AuthUpdateData);

router.get("/getDeptSeconId/:id", checkToken, getDeptSeconId)
router.get("/getDeptSeconIncharge/:id", checkToken, getDeptSeconIncharge)
router.get("/getDeptSeconHod/:id", checkToken, getDeptSeconHod)

router.get("/getDeptSeconHodbyDep/:id", checkToken, getDeptSeconHodbyDep)

//meliora authorisation
router.post("/InchHODAuthMeliora", checkToken, AuthoriztnInsertMelData);
router.get("/GetInchHODAuthMeliora", checkToken, AuthorizationMelGets);
router.patch("/inactive", checkToken, AuthUpdateMelData);



module.exports = router;