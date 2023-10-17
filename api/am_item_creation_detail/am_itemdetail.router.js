const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { checkDetailInsertOrNot, GRNDetailsInsert, GRNDetailsUpdate, BillDetailsInsert,
    BillDetailsUpdate, CustodianDetailsInsert, CustodianDetailsUpdate, DeviceDetailsInsert,
    DeviceDetailsUpdate, LeaseDetailsInsert, LeaseDetailsUpdate, WarentGarantInsertOrNot, WarentGraruntyInsert, WarentGraruntyUpdate,
    AmcPmInsertOrNot, AmcPmInsert, AmcPmUpdate
} = require('../am_item_creation_detail/am_itemdetail.controller');

router.get("/checkDetailInsertOrNot/:id", checkToken, checkDetailInsertOrNot)

router.post('/GRNDetailsInsert', checkToken, GRNDetailsInsert)
router.patch('/GRNDetailsUpdate', checkToken, GRNDetailsUpdate)

router.post('/BillDetailsInsert', checkToken, BillDetailsInsert)
router.patch('/BillDetailsUpdate', checkToken, BillDetailsUpdate)

router.post('/DeviceDetailsInsert', checkToken, DeviceDetailsInsert)
router.patch('/DeviceDetailsUpdate', checkToken, DeviceDetailsUpdate)

router.post('/CustodianDetailsInsert', checkToken, CustodianDetailsInsert)
router.patch('/CustodianDetailsUpdate', checkToken, CustodianDetailsUpdate)

router.post('/LeaseDetailsInsert', checkToken, LeaseDetailsInsert)
router.patch('/LeaseDetailsUpdate', checkToken, LeaseDetailsUpdate)


router.get("/WarentGarantInsertOrNot/:id", checkToken, WarentGarantInsertOrNot)

router.post('/WarentGraruntyInsert', checkToken, WarentGraruntyInsert)
router.patch('/WarentGraruntyUpdate', checkToken, WarentGraruntyUpdate)

router.get("/AmcPmInsertOrNot/:id", checkToken, AmcPmInsertOrNot)

router.post('/AmcPmInsert', checkToken, AmcPmInsert)
router.patch('/AmcPmUpdate', checkToken, AmcPmUpdate)


module.exports = router