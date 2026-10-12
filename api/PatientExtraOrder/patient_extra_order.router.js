const router = require('express').Router();
const { checkToken } = require('../../authentication/token_validation');
const { stampActor } = require('../../authentication/userChecks');

const {
    createExtraOrder,
    getAllExtraOrders,
    getExtraOrderById,
    updateExtraOrderStatus,
    cancelExtraOrder,
    deleteExtraOrder
} = require('./patient_extra_order.controller');

/* CREATE */
// "who did it" fields are set from the logged-in employee (stampActor), not taken from the request
router.post("/create", checkToken, stampActor('created_by'), createExtraOrder);

/* READ */
router.post("/list", checkToken, getAllExtraOrders);
router.post("/get", checkToken, getExtraOrderById);

/* UPDATE */
router.patch("/status", checkToken, stampActor('updated_by'), updateExtraOrderStatus);

/* CANCEL */
router.patch("/cancel", checkToken, stampActor('updated_by'), cancelExtraOrder);

/* DELETE */
router.delete("/delete", checkToken, deleteExtraOrder);

module.exports = router;