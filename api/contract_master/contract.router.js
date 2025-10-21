const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { ContractMasterInsert, GetcontractMaster, ContractMasterUpdated, WorkLocationInsert, GetlocationMaster, LocationMasterUpdated
} = require('../contract_master/contract.controller');

router.post("/insert", checkToken, ContractMasterInsert);
router.get("/GetcontractMaster", checkToken, GetcontractMaster);
router.post("/Updated", checkToken, ContractMasterUpdated);


router.post("/Locationinsert", checkToken, WorkLocationInsert);
router.get("/GetlocationMaster", checkToken, GetlocationMaster);
router.post("/LocationUpdated", checkToken, LocationMasterUpdated);



module.exports = router;
