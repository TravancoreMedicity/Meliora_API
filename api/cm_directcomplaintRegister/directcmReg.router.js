const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { directcomplaintRegistInsert, getdirectcomplaintList, directcomplaintUpdate } = require('../cm_directcomplaintRegister/directcmReg.controller')

router.post("/", checkToken, directcomplaintRegistInsert);
router.get("/:id", checkToken, getdirectcomplaintList);
router.patch("/", checkToken, directcomplaintUpdate);


module.exports = router;