// dietdeliveryassign.controller.js

const { CreateDietDeliveryAssignment, getCurrentAssignedFoodDetail, FetchDeliveryByAssigny, updateDeliveryStatus, UpdateDeliveryLogDetail, FetchAssignedItemStatus, fetchDeliveryLogDetail, UpdateAssignOrderDetail } = require("./dietorderassign.service");


module.exports = {

    // CREATE DELIVERY ASSIGNMENT
    CreateDietDeliveryAssignment: (req, res) => {

        const data = req.body;

        // REQUIRED VALIDATION
        if (!data.assigned_to) {
            return res.status(200).json({
                success: 0,
                message: "Assigned employee required"
            });
        }

        if (!data.assigned_by) {
            return res.status(200).json({
                success: 0,
                message: "Assigned by required"
            });
        }

        if (!Array.isArray(data.orders) || data.orders.length === 0) {
            return res.status(200).json({
                success: 0,
                message: "Orders required"
            });
        }

        CreateDietDeliveryAssignment(data, (err, result) => {

            if (err) {
                return res.status(200).json({
                    success: 0,
                    stage: err.stage || "UNKNOWN",
                    message: err.message || err
                });
            }

            return res.status(200).json({
                success: 1,
                message: "Delivery Assignment Created Successfully",
                assignment_id: result.assignment_id
            });
        });
    },

    getCurrentAssignedFoodDetail: (req, res) => {
        getCurrentAssignedFoodDetail((err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err.message || err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Data Fetched SuccessFully!",
                data: result
            });
        });
    },
    FetchDeliveryByAssigny: (req, res) => {
        const { assign_to } = req.body;
        FetchDeliveryByAssigny(assign_to, (err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err.message || err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Data Fetched SuccessFully!",
                data: result
            });
        });
    },
    FetchAssignedItemStatus: (req, res) => {
        const { assign_to, assignment_id } = req.body;
        FetchAssignedItemStatus(assign_to, assignment_id, (err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err.message || err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Data Fetched SuccessFully!",
                data: result
            });
        });
    },
    fetchDeliveryLogDetail: (req, res) => {
        const { canteen_order_id, type_slno } = req.body;
        fetchDeliveryLogDetail(canteen_order_id, type_slno, (err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err.message || err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Data Fetched SuccessFully!",
                data: result
            });
        });
    },



    updateDeliveryStatus: (req, res) => {

        const data = req.body;

        if (!data.assignment_id) {
            return res.status(200).json({
                success: 0,
                message: "assignment_id required"
            });
        }

        if (!data.canteen_order_id) {
            return res.status(200).json({
                success: 0,
                message: "canteen_order_id required"
            });
        }

        if (!data.delivery_status) {
            return res.status(200).json({
                success: 0,
                message: "delivery_status required"
            });
        }

        updateDeliveryStatus(data, (err, result) => {

            if (err) {
                return res.status(200).json({
                    success: 0,
                    stage: err.stage || "UNKNOWN",
                    message: err.message || err
                });
            }

            req.io.emit(
                "dietDeliveryStatusUpdated",
                {
                    assignment_id: data.assignment_id,
                    canteen_order_id: data.canteen_order_id,
                    delivery_status: data.delivery_status,
                    remarks: data.remarks,
                    updated_by: data.updated_by,
                    updated_time: new Date(),
                    meal: data.meal,
                    item_name: data.item_name,
                    type: "DELIVERY_STATUS_UPDATED"
                }
            );

            return res.status(200).json({
                success: 1,
                message: " Status Updated Successfully"
            });
        });
    },

    UpdateAssignOrderDetail: (req, res) => {

        const data = req.body;

        if (!data.assignment_id) {
            return res.status(200).json({
                success: 0,
                message: "assignment_id required"
            });
        }

        if (!data.canteen_order_id) {
            return res.status(200).json({
                success: 0,
                message: "canteen_order_id required"
            });
        }

        if (!data.delivery_status) {
            return res.status(200).json({
                success: 0,
                message: "delivery_status required"
            });
        }

        UpdateAssignOrderDetail(data, (err, result) => {

            if (err) {
                return res.status(200).json({
                    success: 0,
                    stage: err.stage || "UNKNOWN",
                    message: err.message || err
                });
            }

            req.io.emit(
                "dietDeliveryStatusUpdated",
                {
                    assignment_id: data.assignment_id,
                    canteen_order_id: data.canteen_order_id,
                    delivery_status: data.delivery_status,
                    remarks: data.remarks,
                    updated_by: data.updated_by,
                    updated_time: new Date(),
                    meal: data.meal,
                    item_name: data.item_name,
                    type: "DELIVERY_STATUS_UPDATED"
                }
            );

            return res.status(200).json({
                success: 1,
                message: " Status Updated Successfully"
            });
        });
    },


    UpdateDeliveryLogDetail: (req, res) => {

        const data = req.body;

        // REQUIRED VALIDATIONS
        if (!data.assignment_id) {
            return res.status(200).json({
                success: 0,
                message: "assignment_id required"
            });
        }

        if (!data.canteen_order_id) {
            return res.status(200).json({
                success: 0,
                message: "canteen_order_id required"
            });
        }

        if (!data.item_id) {
            return res.status(200).json({
                success: 0,
                message: "item_id required"
            });
        }

        if (!data.delivery_status) {
            return res.status(200).json({
                success: 0,
                message: "delivery_status required"
            });
        }

        if (!data.updated_by) {
            return res.status(200).json({
                success: 0,
                message: "updated_by required"
            });
        }

        UpdateDeliveryLogDetail(data, (err, result) => {

            if (err) {
                return res.status(200).json({
                    success: 0,
                    stage: err.stage || "UNKNOWN",
                    message: err.message || err
                });
            }

            req.io.emit("dietDeliveryStatusUpdated", {
                assignment_id: data.assignment_id,
                canteen_order_id: data.canteen_order_id,
                item_id: data.item_id,
                item_name: data?.item_name,
                meal: data?.meal,
                type_slno: data.type_slno,
                delivery_status: data.delivery_status,
                assignment_status: result?.assignment_status,
                updated_by: data.updated_by,
                updated_time: new Date()
            });

            return res.status(200).json({
                success: 1,
                message: "Delivery Status Updated Successfully"
            });

        });
    },



};


