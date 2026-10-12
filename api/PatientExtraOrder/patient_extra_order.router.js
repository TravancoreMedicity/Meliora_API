const router = require('express').Router();
const { checkToken } = require('../../authentication/token_validation');

const {
    createExtraOrder,
    getAllExtraOrders,
    getExtraOrderById,
    updateExtraOrderStatus,
    cancelExtraOrder,
    deleteExtraOrder
} = require('./patient_extra_order.controller');

/* CREATE */
router.post("/create", checkToken, createExtraOrder);

/* READ */
router.post("/list", checkToken, getAllExtraOrders);
router.post("/get", checkToken, getExtraOrderById);

/* UPDATE */
router.patch("/status", checkToken, updateExtraOrderStatus);

/* CANCEL */
router.patch("/cancel", checkToken, cancelExtraOrder);

/* DELETE */
router.delete("/delete", checkToken, deleteExtraOrder);

module.exports = router;