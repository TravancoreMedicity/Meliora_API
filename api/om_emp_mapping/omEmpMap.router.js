const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { omEmpInsert, omEmpUpdate, omEmpGet, omEmpGetselect } = require("../om_emp_mapping/omEmpMapp.controller");

router.post("/", checkToken, omEmpInsert);
router.patch("/", checkToken, omEmpUpdate);
router.get("/", checkToken, omEmpGet);
router.get("/select", checkToken, omEmpGetselect);


module.exports = router;