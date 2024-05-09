const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { checkDetailInsertOrNot, GRNDetailsInsert, GRNDetailsUpdate, BillDetailsInsert,
    BillDetailsUpdate, CustodianDetailsInsert, CustodianDetailsUpdate, DeviceDetailsInsert,
    DeviceDetailsUpdate, LeaseDetailsInsert, LeaseDetailsUpdate, WarentGarantInsertOrNot, WarentGraruntyInsert, WarentGraruntyUpdate,
    AmcPmInsertOrNot, AmcPmInsert, AmcPmUpdate, checkDetailInsertOrNotSpare, WarentGarantInsertOrNotSpare,
    AmcPmInsertOrNotSpare, GRNDetailsInsertSpare, GRNDetailsUpdateSpare, BillDetailsInsertSpare,
    BillDetailsUpdateSpare, DeviceDetailsInsertSpare, DeviceDetailsUpdateSpare,
    LeaseDetailsInsertSpare, LeaseDetailsUpdateSpare, WarentGraruntyInsertSpare,
    WarentGraruntyUpdateSpare, AmcPmInsertSpare, AmcPmUpdateSpare, getdeptsecBsedonCustdept,
    getdeptsecBsedonCustdeptSpare, SpecificationInsertOrNot, SpecificationInsert, SepcifiDelete,
    GetFreespareList, SpareDetailsInsert, SpareDetailsInsertOrNot, SpareDelete,
    AmcCMCInsert, AmcCmcview, AmcCmcUpdate, AmcCmcviewSelect, BillMasterInsert,
    BillMasterview, BillMasterUpdate, BillMasterviewSelect, GetBillMasterById,
    GetAmcCmcMasterById
} = require('../am_item_creation_detail/am_itemdetail.controller');

router.get("/checkDetailInsertOrNot/:id", checkToken, checkDetailInsertOrNot)
router.get("/checkDetailInsertOrNotSpare/:id", checkToken, checkDetailInsertOrNotSpare)

router.post('/GRNDetailsInsert', checkToken, GRNDetailsInsert)
router.patch('/GRNDetailsUpdate', checkToken, GRNDetailsUpdate)
router.post('/GRNDetailsInsertSpare', checkToken, GRNDetailsInsertSpare)
router.patch('/GRNDetailsUpdateSpare', checkToken, GRNDetailsUpdateSpare)

router.post('/BillDetailsInsert', checkToken, BillDetailsInsert)
router.patch('/BillDetailsUpdate', checkToken, BillDetailsUpdate)
router.post('/BillDetailsInsertSpare', checkToken, BillDetailsInsertSpare)
router.patch('/BillDetailsUpdateSpare', checkToken, BillDetailsUpdateSpare)

router.post('/DeviceDetailsInsert', checkToken, DeviceDetailsInsert)
router.patch('/DeviceDetailsUpdate', checkToken, DeviceDetailsUpdate)
router.post('/DeviceDetailsInsertSpare', checkToken, DeviceDetailsInsertSpare)
router.patch('/DeviceDetailsUpdateSpare', checkToken, DeviceDetailsUpdateSpare)

router.post('/CustodianDetailsInsert', checkToken, CustodianDetailsInsert)
router.patch('/CustodianDetailsUpdate', checkToken, CustodianDetailsUpdate)

router.post('/LeaseDetailsInsert', checkToken, LeaseDetailsInsert)
router.patch('/LeaseDetailsUpdate', checkToken, LeaseDetailsUpdate)
router.post('/LeaseDetailsInsertSpare', checkToken, LeaseDetailsInsertSpare)
router.patch('/LeaseDetailsUpdateSpare', checkToken, LeaseDetailsUpdateSpare)

router.get("/WarentGarantInsertOrNot/:id", checkToken, WarentGarantInsertOrNot)
router.get("/WarentGarantInsertOrNotSpare/:id", checkToken, WarentGarantInsertOrNotSpare)

router.post('/WarentGraruntyInsert', checkToken, WarentGraruntyInsert)
router.patch('/WarentGraruntyUpdate', checkToken, WarentGraruntyUpdate)
router.post('/WarentGraruntyInsertSpare', checkToken, WarentGraruntyInsertSpare)
router.patch('/WarentGraruntyUpdateSpare', checkToken, WarentGraruntyUpdateSpare)

router.get("/AmcPmInsertOrNot/:id", checkToken, AmcPmInsertOrNot)
router.get("/AmcPmInsertOrNotSpare/:id", checkToken, AmcPmInsertOrNotSpare)

router.post('/AmcPmInsert', checkToken, AmcPmInsert)
router.patch('/AmcPmUpdate', checkToken, AmcPmUpdate)
router.post('/AmcPmInsertSpare', checkToken, AmcPmInsertSpare)
router.patch('/AmcPmUpdateSpare', checkToken, AmcPmUpdateSpare)

router.get("/getdeptsecBsedonCustdept/:id", checkToken, getdeptsecBsedonCustdept)
router.get("/getdeptsecBsedonCustdeptSpare/:id", checkToken, getdeptsecBsedonCustdeptSpare)

router.get("/SpecificationInsertOrNot/:id", checkToken, SpecificationInsertOrNot)

router.post("/SpecificationInsert", checkToken, SpecificationInsert);
router.patch("/SepcifiDelete", checkToken, SepcifiDelete);


router.post("/GetFreespareList", checkToken, GetFreespareList);
router.post("/SpareDetailsInsert", checkToken, SpareDetailsInsert);
router.get("/SpareDetailsInsertOrNot/:id", checkToken, SpareDetailsInsertOrNot)
router.patch("/SpareDelete", checkToken, SpareDelete);

router.post('/AmcCMCInsert', checkToken, AmcCMCInsert)
router.get('/AmcCmcview', checkToken, AmcCmcview)
router.patch('/AmcCmcUpdate', checkToken, AmcCmcUpdate)
router.get('/AmcCmcviewSelect', checkToken, AmcCmcviewSelect)


router.post('/BillMasterInsert', checkToken, BillMasterInsert)
router.get('/BillMasterview', checkToken, BillMasterview)
router.patch('/BillMasterUpdate', checkToken, BillMasterUpdate)
router.get('/BillMasterviewSelect', checkToken, BillMasterviewSelect)
router.get("/GetBillMasterById/:id", checkToken, GetBillMasterById)
router.get("/GetAmcCmcMasterById/:id", checkToken, GetAmcCmcMasterById)


module.exports = router