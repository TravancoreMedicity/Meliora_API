const { CancelCanteenOrders } = require('../Canteen_Orders/canteenorder.service');
const {
    insertExtraOrder,
    getExtraOrders,
    getExtraOrderSingle,
    updateStatus,
    cancelOrder,
    deleteOrder,
    updateStatusBulk
} = require('./patient_extra_order.service');

module.exports = {

    createExtraOrder: (req, res) => {
        const { order, order_status, created_by, patient_id } = req.body;
    

        if (!Array.isArray(order) || order.length === 0) {
            return res.status(200).json({
                success: 0,
                message: "Invalid payload"
            });
        }

        //  MAP VALUES HERE
        const mappedValues = order.map(item => ([
            patient_id,
            item.item_id,
            item.qty,
            order_status || 'PENDING',
            item.price,
            item.gst,
            item.gst_amount,
            created_by
        ]));

        insertExtraOrder(mappedValues, (err, result) => {
            if (err) return res.status(200).json({ success: 0, message: err });

            return res.status(200).json({
                success: 1,
                message: "Extra Orders Created",
                data: result
            });
        });
    },
    getAllExtraOrders: (req, res) => {
        const { status, lastTime, lastId, limit = 50 } = req.body;

        getExtraOrders(status, lastTime, lastId, limit, (err, result) => {
            if (err) return res.status(200).json({ success: 0, message: err });

            return res.status(200).json({
                success: 1,
                data: result,
                hasMore: result.length === limit
            });
        });
    },

    getExtraOrderById: (req, res) => {
        const { admission_id, order_status } = req.body;

        if (!admission_id) {
            return res.status(200).json({
                success: 0,
                message: "Extra Order ID missing"
            });
        }

        if (order_status === "") {
            return res.status(200).json({
                success: 0,
                message: "Order Status is Missing"
            });
        }

        getExtraOrderSingle(admission_id, order_status, (err, result) => {
            if (err) return res.status(200).json({ success: 0, message: err });

            return res.status(200).json({
                success: 1,
                data: result
            });
        });
    },

    updateExtraOrderStatus: (req, res) => {
        const { ExtraOrder, status, updated_by } = req.body;

        if (!Array.isArray(ExtraOrder) || ExtraOrder.length === 0) {
            return res.status(200).json({
                success: 0,
                message: "Invalid Order Payload"
            });
        }

        updateStatusBulk(ExtraOrder, status, updated_by, (err) => {
            if (err) return res.status(200).json({ success: 0, message: err });

            return res.status(200).json({
                success: 1,
                message: "Status Updated (Bulk)"
            });
        });
    },
    cancelExtraOrder: (req, res) => {
        const { extra_order_id, updated_by, FoodName, is_active, canteen_order_item_id } = req.body;


        cancelOrder(extra_order_id, updated_by, (err) => {
            if (err) return res.status(200).json({
                success: 0,
                message: err
            });

            if (canteen_order_item_id) {
                CancelCanteenOrders(is_active, canteen_order_item_id, (err) => {
                    if (err) return res.status(200).json({ success: 0, message: err });
                });
            }

            return res.status(200).json({
                success: 1,
                message: `Extra item ${FoodName} cancelled successfully`
            });
        });
    },

    deleteExtraOrder: (req, res) => {
        const { extra_order_id } = req.body;

        deleteOrder(extra_order_id, (err) => {
            if (err) return res.status(200).json({ success: 0, message: err });

            return res.status(200).json({
                success: 1,
                message: "Order Deleted"
            });
        });
    }
};