const { pool } = require('../../config/database');
const { safeMessage, priceCanteenItems } = require('./Helper');

// statuses the canteen_order table uses (see the order tabs in the web app)
const ALLOWED_ORDER_STATUS = ['PENDING', 'CONFIRMED', 'CANCELLED'];

const {
    addItemsToOrder,
    createOrder,
    getOrderById,
    updateOrderStatus,
    cancelOrder,
    deleteOrder,
    insertExtraOrderItems,
    getFullOrders,
    CancelCanteenOrders,
    getActivePatientDetail,
    CanteenOrderDetail,
    ExtraCanteenOrderDetail,
    getAllActivePatients,
    GetAllActiveBedDetail,
    PatientLastWeekOrders,
    UpdateAllQuantitiesService,
    getBatchItemDetail,
    UpdateItemQuantity
} = require('./canteenorder.service');

module.exports = {

    createCanteenOrder: (req, res) => {
        const { order, items } = req.body;

        if (!order || !items?.length) {
            return res.status(200).json({
                success: 0,
                message: "Invalid payload"
            });
        }

        // price, gst and gst_amount are rebuilt from canteen_item_price - the client values are ignored
        priceCanteenItems(pool, order.party_type_id, items, (priceErr, pricedItems) => {
            if (priceErr) return res.status(200).json({ success: 0, message: safeMessage(priceErr) });

            createOrder(order, pricedItems, (err, result) => {
                if (err) return res.status(200).json({ success: 0, message: safeMessage(err) });

                req.io?.emit("newCanteenOrder", {
                    orderId: result?.orderId
                });

                return res.status(200).json({
                    success: 1,
                    message: "Order Created",
                    data: result
                });
            });
        });
    },

    getAllCanteenOrders: (req, res) => {

        const { status } = req.body;

        getFullOrders(status, (err, result) => {

            if (err) {
                return res.status(200).json({ success: 0, message: safeMessage(err) });
            }
            if (result && result.length === 0) {
                return res.status(200).json({
                    success: 1,
                    data: [],
                });
            }

            return res.status(200).json({
                success: 2,
                data: result,
            });
        });
    },

    getCanteenOrderById: (req, res) => {
        const { canteen_order_id } = req.body;

        if (!canteen_order_id) {
            return res.status(200).json({
                success: 0,
                message: "Order ID missing"
            });
        }

        getOrderById(canteen_order_id, (err, result) => {
            if (err) return res.status(200).json({ success: 0, message: safeMessage(err) });

            return res.status(200).json({
                success: 1,
                data: result
            });
        });
    },

    updateCanteenOrderStatus: (req, res) => {
        const { canteen_order_id, status, updated_by } = req.body;

        if (!canteen_order_id) {
            return res.status(200).json({ success: 0, message: "Order ID missing" });
        }

        if (!ALLOWED_ORDER_STATUS.includes(status)) {
            return res.status(200).json({ success: 0, message: "Invalid order status" });
        }

        updateOrderStatus(canteen_order_id, status, updated_by, (err, result) => {
            if (err) return res.status(200).json({ success: 0, message: safeMessage(err) });

            if (result?.affectedRows === 0) {
                return res.status(200).json({
                    success: 0,
                    message: "Order not found or it is already cancelled"
                });
            }

            return res.status(200).json({
                success: 1,
                message: "Status Updated"
            });
        });
    },

    cancelCanteenOrder: (req, res) => {
        const { canteen_order_id } = req.body;

        if (!canteen_order_id) {
            return res.status(200).json({ success: 0, message: "Order ID missing" });
        }

        cancelOrder(canteen_order_id, (err, result) => {
            if (err) return res.status(200).json({ success: 0, message: safeMessage(err) });

            if (result?.affectedRows === 0) {
                return res.status(200).json({ success: 0, message: "Order not found" });
            }

            req.io?.emit("cancelCanteenOrder", {
                orderId: canteen_order_id,
                status: 'CANCELLED'
            });

            return res.status(200).json({
                success: 1,
                message: "Order Cancelled"
            });
        });
    },

    deleteCanteenOrder: (req, res) => {
        const { canteen_order_id } = req.body;

        if (!canteen_order_id) {
            return res.status(200).json({ success: 0, message: "Order ID missing" });
        }

        deleteOrder(canteen_order_id, (err) => {
            if (err) return res.status(200).json({ success: 0, message: safeMessage(err) });

            return res.status(200).json({
                success: 1,
                message: "Order Deleted"
            });
        });
    },


    CancelCanteenOrders: (req, res) => {
        const { canteen_order_item_id, is_active, FoodName } = req.body;

        if (!canteen_order_item_id) {
            return res.status(200).json({
                success: 0,
                message: "Order Detail Id is Misssing!"
            });
        };

        CancelCanteenOrders(is_active, canteen_order_item_id, (err) => {
            if (err) return res.status(200).json({ success: 0, message: safeMessage(err) });

            return res.status(200).json({
                success: 1,
                message: `${FoodName} has Cancelled!`
            });
        });
    },


    getActivePatientDetail: (req, res) => {
        const { bd_code } = req.body;

        if (!bd_code) {
            return res.status(200).json({
                success: 0,
                message: "Bed Code is Missing!"
            });
        };

        getActivePatientDetail(bd_code, (err, result) => {
            if (err) return res.status(200).json({ success: 0, message: safeMessage(err) });

            return res.status(200).json({
                success: 1,
                message: `Fetch SuccessFully!`,
                data: result
            });
        });
    },

    CanteenOrderDetail: (req, res) => {
        const { admission_Id, party_type_id } = req.body;

        if (!admission_Id) {
            return res.status(200).json({
                success: 0,
                message: "Admission Id is Missing!"
            });
        };

        CanteenOrderDetail(admission_Id, party_type_id, (err, result) => {
            if (err) return res.status(200).json({ success: 0, message: safeMessage(err) });

            return res.status(200).json({
                success: 1,
                message: `Fetch SuccessFully!`,
                data: result
            });
        });
    },
    PatientLastWeekOrders: (req, res) => {
        const { admission_Id, party_type_id } = req.body;

        if (!admission_Id) {
            return res.status(200).json({
                success: 0,
                message: "Admission Id is Missing!"
            });
        };

        PatientLastWeekOrders(admission_Id, party_type_id, (err, result) => {
            if (err) return res.status(200).json({ success: 0, message: safeMessage(err) });

            return res.status(200).json({
                success: 1,
                message: `Fetch SuccessFully!`,
                data: result
            });
        });
    },


    ExtraCanteenOrderDetail: (req, res) => {
        const { patient_id } = req.body;

        if (!patient_id) {
            return res.status(200).json({
                success: 0,
                message: "Patient Id is Missing!"
            });
        };

        ExtraCanteenOrderDetail(patient_id, (err, result) => {
            if (err) return res.status(200).json({ success: 0, message: safeMessage(err) });

            return res.status(200).json({
                success: 1,
                message: `Fetch SuccessFully!`,
                data: result
            });
        });
    },
    getAllActivePatients: (req, res) => {
        const { ns_code } = req.body;

        if (!ns_code) {
            return res.status(200).json({
                success: 0,
                message: "Patient Id is Missing!"
            });
        };

        getAllActivePatients(ns_code, (err, result) => {
            if (err) return res.status(200).json({ success: 0, message: safeMessage(err) });

            return res.status(200).json({
                success: 1,
                message: `Fetch SuccessFully!`,
                data: result
            });
        });
    },
    GetAllActiveBedDetail: (req, res) => {
        GetAllActiveBedDetail((err, result) => {
            if (err) return res.status(200).json({ success: 0, message: safeMessage(err) });

            return res.status(200).json({
                success: 1,
                message: `Fetch SuccessFully!`,
                data: result
            });
        });
    },


    addItemsToExistingOrder: (req, res) => {

        const { canteen_order_id, itemDetail, isExtra, patient_id, created_by, order_status } = req.body;

        if (!canteen_order_id) {
            return res.status(200).json({
                success: 0,
                message: "Order ID Missing"
            });
        };

        if (!Array.isArray(itemDetail) || !itemDetail?.length) {
            return res.status(200).json({
                success: 0,
                message: "No Items to Add"
            });
        };

        if (isExtra && !patient_id) {
            return res.status(200).json({
                success: 0,
                message: "Patient ID missing for the extra order"
            });
        }

        // one transaction: canteen items + extra order rows, prices from canteen_item_price,
        // and the answer is sent once, after the commit
        addItemsToOrder(
            { canteen_order_id, itemDetail, isExtra, patient_id, created_by, order_status },
            (err, results) => {
                if (err) {
                    return res.status(200).json({
                        success: 0,
                        message: safeMessage(err)
                    });
                }

                return res.status(200).json({
                    success: 1,
                    message: "Items Added Successfully",
                    data: results
                });
            }
        );
    },

    UpdateAllQuantities: (req, res) => {
        const { canteen = [], diet = [], extra = [] } = req.body;

        const validateItems = (items, idField, requireUpdatedBy = false) => {
            if (!Array.isArray(items)) return `${idField} must be an array`;
            if (items.length > 50) return `Max 50 items allowed`;

            for (const item of items) {
                if (!Number.isInteger(item[idField])) return `Invalid ${idField}`;

                if (!Number.isInteger(item.quantity) || item.quantity < 0) {
                    return `Invalid quantity`;
                }

                if (requireUpdatedBy && !Number.isInteger(item.updated_by)) {
                    return `Invalid updated_by`;
                }
            }

            return null;
        };

        const error =
            validateItems(diet, "order_detail_id", false) ||
            validateItems(canteen, "canteen_order_item_id", false) ||
            validateItems(extra, "extra_order_id", true);

        if (error) {
            return res.status(400).json({ success: 0, message: error });
        }

        if (!diet.length && !canteen.length && !extra.length) {
            return res.status(400).json({ success: 0, message: "No data" });
        }

        UpdateAllQuantitiesService(canteen, diet, extra, (err) => {
            if (err) {
                console.log({ err });

                return res.status(500).json({
                    success: 0,
                    message: "DB error"
                });
            }

            res.status(200).json({
                success: 1,
                message: "Updated successfully"
            });
        });
    },

    getBatchItemDetail: (req, res) => {

        const { canteenIds } = req.body;

        if (!Array.isArray(canteenIds) || !canteenIds?.length) {
            return res.status(200).json({
                success: 0,
                message: "No Items to Add"
            });
        }

        getBatchItemDetail(canteenIds, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: safeMessage(err)
                });
            }


            return res.status(200).json({
                success: 1,
                message: "Items Added Successfully",
                data: results
            });
        });
    },

    UpdateItemQuantity: (req, res) => {

        const { canteen_order_item_id, updatedQty } = req.body;

        if (!canteen_order_item_id) {
            return res.status(200).json({
                success: 0,
                message: "Order Item Detail Id is Missing!"
            });
        }

        // whole number between 1 and 999 (was only "not below 1": decimals and text got through)
        if (!Number.isInteger(Number(updatedQty)) || Number(updatedQty) < 1 || Number(updatedQty) > 999) {
            return res.status(200).json({
                success: 0,
                message: "Enter a Valid Quantity"
            });
        }

        UpdateItemQuantity(canteen_order_item_id, Number(updatedQty), (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: safeMessage(err)
                });
            }

            if (results?.affectedRows === 0) {
                return res.status(200).json({
                    success: 0,
                    message: "Order item not found"
                });
            }

            return res.status(200).json({
                success: 1,
                message: "Quantity Updated Successfully!"
            });
        });
    },

};