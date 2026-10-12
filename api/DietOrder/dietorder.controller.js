const { pool } = require('../../config/database');
const { safeMessage, priceCanteenItems } = require('../Canteen_Orders/Helper');

// statuses used by diet_order (same vocabulary as canteen_order)
const ALLOWED_DIET_STATUS = ['PENDING', 'CONFIRMED', 'CANCELLED'];

const isWholeQty = (value, max = 999) => {
    const n = Number(value);
    return Number.isInteger(n) && n >= 1 && n <= max;
};

const {
    insertNewDietOrder,
    getOrderByPatient,
    updateDietTemplate,
    getAllDietDeliveryDetail,
    getDeliveryDetailStatus,
    NewPatientOrderDetail,
    InacitveCurrentBatchOrder,
    TakeExtraDietFoodOrders,
    CancelPatientBatch,
    CancelledOrderDetails,
    UpdateDietStatus,
    UpdateFoodStatus,
    AddDietItem,
    // UpdateFoodQuantity
} = require('./dietorder.service');

module.exports = {

    insertNewDietOrder: (req, res) => {

        const { order, details, canteenorder, canteenorderdetail } = req.body;

        // The service only creates the canteen order when this is exactly `false`; a missing
        // value used to save the diet order and silently skip the canteen (billing) part.
        const isPending = req.body.isPending === true;

        if (!order || !Array.isArray(details) || details.length === 0) {
            return res.status(200).json({
                success: 0,
                message: "Invalid payload"
            });
        }

        if (!details.every(item => isWholeQty(item?.quantity))) {
            return res.status(200).json({
                success: 0,
                message: "Quantity must be a whole number between 1 and 999"
            });
        }

        if (!isPending && (!canteenorder || !Array.isArray(canteenorderdetail) || canteenorderdetail.length === 0)) {
            return res.status(200).json({
                success: 0,
                message: "Canteen Order is Not valid Please Order Again"
            });
        }

        const place = (pricedCanteenDetail) => {
            insertNewDietOrder(order, details, canteenorder, pricedCanteenDetail, isPending, (err, result) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: safeMessage(err)
                    });
                }

                req.io?.emit("newDietOrder", {
                    message: "New Diet Order",
                    status: 'Order'
                });

                return res.status(200).json({
                    success: 1,
                    message: "Order Created Successfully",
                    order_id: result
                });
            });
        };

        if (isPending) {
            return place(canteenorderdetail);
        }

        // price / gst / gst_amount are rebuilt from canteen_item_price - client values are ignored
        priceCanteenItems(pool, canteenorder.party_type_id, canteenorderdetail, (priceErr, priced) => {
            if (priceErr) {
                return res.status(200).json({
                    success: 0,
                    message: safeMessage(priceErr)
                });
            }

            place(priced);
        });
    },

    AddDietItem: (req, res) => {

        const { order_id, details } = req.body;

        if (!order_id || !Array.isArray(details) || details.length === 0) {
            return res.status(200).json({
                success: 0,
                message: "Invalid payload"
            });
        }

        if (!details.every(item => isWholeQty(item?.quantity))) {
            return res.status(200).json({
                success: 0,
                message: "Quantity must be a whole number between 1 and 999"
            });
        }

        const dietDetailValues = details.map(item => [
            order_id,
            item.diet_type_id,
            item.item_id,
            item.quantity,
            item.unit_id,
            item.is_substitute,
            item.patient_diet_id
        ]);

        AddDietItem(dietDetailValues, (err, result) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: safeMessage(err)
                });
            }

            return res.status(200).json({
                success: 1,
                message: "Order Created Successfully",
                order_id: result
            });
        });
    },


    getDietOrderById: (req, res) => {
        const { patient_id } = req.body;
        getOrderByPatient(patient_id, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: safeMessage(err)
                });
            }
            if (results?.length === 0) {
                return res.status(200).json({
                    success: 2,
                    data: [],
                    message: 'no data FOund'
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getAllDietDeliveryDetail: (req, res) => {

        const { collected_by } = req.body;

        getAllDietDeliveryDetail(collected_by, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: safeMessage(err)
                });
            }
            if (results?.length === 0) {
                return res.status(200).json({
                    success: 2,
                    data: [],
                    message: 'no data FOund'
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },


    getDeliveryDetailStatus: (req, res) => {
        const {
            patient_diet_id,
            item_id,
            delivered_qty,
            delivery_status,
            delivery_remarks,
            develivered_by
        } = req.body;


        if (!patient_diet_id) {
            return res.status(200).json({
                success: 0,
                message: "Patient diet ID is required"
            });
        }

        if (!item_id) {
            return res.status(200).json({
                success: 0,
                message: "Item ID is required"
            });
        }

        if (!delivered_qty || delivered_qty <= 0) {
            return res.status(200).json({
                success: 0,
                message: "Delivered quantity must be greater than 0"
            });
        }


        if (!develivered_by) {
            return res.status(200).json({
                success: 0,
                message: "Delivered by is required"
            });
        }

        if (delivery_remarks && delivery_remarks.length > 250) {
            return res.status(200).json({
                success: 0,
                message: "Remarks too long (max 250 chars)"
            });
        }


        getDeliveryDetailStatus(
            patient_diet_id,
            item_id,
            delivered_qty,
            delivery_status,
            delivery_remarks,
            develivered_by,
            (err, result) => {

                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: safeMessage(err)
                    });
                }

                return res.status(200).json({
                    success: 1,
                    message: "Delivery updated successfully"
                });
            }
        );
    },


    NewPatientOrderDetail: (req, res) => {
        const { plan_id, type_id, batch_id } = req.body;


        if (!plan_id || !type_id || !batch_id) {
            return res.status(200).json({
                success: 0,
                message: "Required Id Missing"
            });
        }

        NewPatientOrderDetail(plan_id, type_id, batch_id, (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: safeMessage(err)
                });
            }

            return res.status(200).json({
                success: 1,
                message: "Fetch SucessFully",
                data: result
            });
        }
        );
    },

    CancelledOrderDetails: (req, res) => {
        const { plan_id, type_id, batch_id } = req.body;


        if (!plan_id || !type_id || !batch_id) {
            return res.status(200).json({
                success: 0,
                message: "Required Id Missing"
            });
        }

        CancelledOrderDetails(plan_id, type_id, batch_id, (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: safeMessage(err)
                });
            }

            return res.status(200).json({
                success: 1,
                message: "Fetch SucessFully",
                data: result
            });
        }
        );
    },


    InacitveCurrentBatchOrder: (req, res) => {
        const data = req.body;

        const { plan_id, production_item_id, emp_id } = data;

        if (!plan_id || !production_item_id) {
            return res.status(200).json({
                success: 0,
                message: "Required Id Missing"
            });
        }

        if (!emp_id) {
            return res.status(200).json({
                success: 0,
                message: "Cancelled Employee Data is Missing"
            });
        }

        InacitveCurrentBatchOrder(data, (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: safeMessage(err)
                });
            }

            if (result?.affectedRows === 0) {
                return res.status(200).json({
                    success: 0,
                    message: "Food item is not active (already cancelled) or was not found"
                });
            }

            return res.status(200).json({
                success: 1,
                message: "Food Item Inactive Successfully",
            });
        }
        );
    },

    TakeExtraDietFoodOrders: (req, res) => {
        const data = req.body;
        const {
            batch_id, type_id, diet_Id,
            plan_id, new_order_taken_by, newOrderItem
        } = data ?? {}

        if (!plan_id || !type_id || !batch_id || !diet_Id) {
            return res.status(200).json({
                success: 0,
                message: "Required Id Missing"
            });
        }

        if (!new_order_taken_by) {
            return res.status(200).json({
                success: 0,
                message: "Cancelled Employee Data is Missing"
            });
        }
        // was `newOrderItem && length === 0`: a missing array skipped the check and crashed on .map
        if (!Array.isArray(newOrderItem) || newOrderItem.length === 0) {
            return res.status(200).json({
                success: 0,
                message: "No New Order to be Found!"
            });
        }

        if (!newOrderItem.every(item => item?.item_id && isWholeQty(item?.qty))) {
            return res.status(200).json({
                success: 0,
                message: "Quantity must be a whole number between 1 and 999"
            });
        }
        // ?? Prepare values for bulk insert
        const values = newOrderItem.map(item => ([
            batch_id,
            item.item_id,
            item.qty,
            item.measure,
            diet_Id,
            plan_id,
            new_order_taken_by,
            new Date()
        ]));
        TakeExtraDietFoodOrders(values, (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: safeMessage(err)
                });
            }

            return res.status(200).json({
                success: 1,
                message: "New Order Taken Success Fully",
            });
        }
        );
    },
    CancelPatientBatch: (req, res) => {
        const data = req.body;
        const {
            patient_name,
            type_name,
            batch_id,
            plan_id,
            cancel_reason,
            cancelled_by
        } = data ?? {}

        if (!plan_id || !batch_id) {
            return res.status(200).json({
                success: 0,
                message: "Required Id Missing"
            });
        }

        if (!cancel_reason) {
            return res.status(200).json({
                success: 0,
                message: "Cancel Reason Requirued"
            });
        }
        if (!cancelled_by) {
            return res.status(200).json({
                success: 0,
                message: "Cancel Employee Not FOund!"
            });
        }
        CancelPatientBatch(data, (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: safeMessage(err)
                });
            }

            if (result?.affectedRows === 0) {
                return res.status(200).json({
                    success: 0,
                    message: "Nothing to cancel: this batch is already cancelled or was not found"
                });
            }

            return res.status(200).json({
                success: 1,
                message: `${patient_name} FULL ${type_name} CANCELLED!`,
            });
        }
        );
    },

    UpdateDietStatus: (req, res) => {
        const data = req.body;
        const {
            order_status,
            order_id,
            updated_by
        } = data ?? {}

        if (!order_id) {
            return res.status(200).json({
                success: 0,
                message: "Required Id Missing"
            });
        }

        if (!ALLOWED_DIET_STATUS.includes(order_status)) {
            return res.status(200).json({
                success: 0,
                message: "Invalid order status"
            });
        }

        UpdateDietStatus(order_status, order_id, updated_by, (err, result) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: safeMessage(err)
                });
            }

            if (result?.affectedRows === 0) {
                return res.status(200).json({
                    success: 0,
                    message: "Diet order not found or it is already cancelled"
                });
            }

            // the message used to say "Confirmed" whatever status was sent
            return res.status(200).json({
                success: 1,
                message: order_status === 'CANCELLED'
                    ? 'Diet Order Cancelled'
                    : order_status === 'CONFIRMED'
                        ? 'Diet Order Confirmed'
                        : 'Diet Order Updated',
            });
        }
        );
    },
    UpdateFoodStatus: (req, res) => {
        const data = req.body;
        const {
            item_id,
            order_id,
            is_active,
            FoodName
        } = data ?? {}

        if (!order_id || !item_id) {
            return res.status(200).json({
                success: 0,
                message: "Required Id Missing"
            });
        }

        // is_active is a 0/1 flag
        if (![0, 1, '0', '1', true, false].includes(is_active)) {
            return res.status(200).json({
                success: 0,
                message: "Invalid food status"
            });
        }

        UpdateFoodStatus(is_active, item_id, order_id, (err, result) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: safeMessage(err)
                });
            }

            if (result?.affectedRows === 0) {
                return res.status(200).json({
                    success: 0,
                    message: "Food item not found in this order"
                });
            }

            const activated = [1, '1', true].includes(is_active);

            return res.status(200).json({
                success: 1,
                message: `${FoodName || 'Food'} ${activated ? 'Activated' : 'Cancelled'} SuccessFully`,
            });
        }
        );
    },

    // UpdateFoodQuantity: (req, res) => {
    //     const data = req.body.data;

    //     if (!data || data.length === 0) {
    //         return res.status(200).json({
    //             success: 0,
    //             message: "No data for updation"
    //         });
    //     }

    //     const dietQuantityUpdate = data.map(item => [
    //         item.quantity,
    //         item.updated_by,
    //         item.order_detail_id
    //     ]);

    //     UpdateFoodQuantity(dietQuantityUpdate, (err, result) => {
    //         if (err) {
    //             return res.status(500).json({
    //                 success: 0,
    //                 message: safeMessage(err)
    //             });
    //         }

    //         return res.status(200).json({
    //             success: 1,
    //             message: "Updated Successfully"
    //         });
    //     });
    // },







    // updateDietTemplate: (req, res) => {

    //     const data = req.body;
    //     const { template_name, diet_id, effective_from, effective_to, template_id } = data;

    //     if (!template_name || template_name.trim() === "") {
    //         return res.status(200).json({
    //             success: 0,
    //             message: "Template Name is required"
    //         });
    //     }

    //     if (!diet_id) {
    //         return res.status(200).json({
    //             success: 0,
    //             message: "Diet is required"
    //         });
    //     }

    //     if (!template_id) {
    //         return res.status(200).json({
    //             success: 0,
    //             message: "Template ID is required"
    //         });
    //     }

    //     //  DATE VALIDATION
    //     if (new Date(effective_to) <= new Date(effective_from)) {
    //         return res.status(200).json({
    //             success: 0,
    //             message: "Effective To must be greater than Effective From"
    //         });
    //     }

    //     //  STEP 1: CHECK OVERLAP (excluding current record)
    //     checkDateOverlapForUpdate(data, (err, results) => {

    //         if (err) {
    //             return res.status(200).json({
    //                 success: 0,
    //                 message: safeMessage(err)
    //             });
    //         }

    //         if (results.length > 0) {
    //             return res.status(200).json({
    //                 success: 0,
    //                 message: "Date range overlaps with existing diet template"
    //             });
    //         }

    //         //  STEP 2: UPDATE
    //         updateDietTemplate(data, (err, results) => {

    //             if (err) {
    //                 return res.status(200).json({
    //                     success: 0,
    //                     message: safeMessage(err)
    //                 });
    //             }

    //             return res.status(200).json({
    //                 success: 2,
    //                 data: results,
    //                 message: "Updated Successfully"
    //             });

    //         });

    //     });

    // },

};