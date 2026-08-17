// dietdeliveryassign.controller.js

const { CreateDietDeliveryAssignment, getCurrentAssignedFoodDetail, FetchDeliveryByAssigny, updateDeliveryStatus, UpdateDeliveryLogDetail, FetchAssignedItemStatus, fetchDeliveryLogDetail, UpdateAssignOrderDetail, getBillingSummary, getBillingDeliveryDetail, getBillingTransactions, getBystanderBill, getPatientDietBill, getPatientExtraOrder, createPatientBillingService, updateBulkPickingUpService, getDeliveryBillDetailsService, CreateBystanderBilling, getBystanderBillingDetails, createBillingPaymentService, getBillablePatientDetail } = require("./dietorderassign.service");


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



    getBillingSummary: (req, res) => {

        const { ptNo, ipNo } = req.params;

        getBillingSummary(ptNo, ipNo, (err, result) => {

            if (err) {
                return res.status(200).json({
                    success: 0,
                    stage: err.stage || "UNKNOWN",
                    message: err.message || err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Fetched SuccessFully",
                data: result
            });

        });
    },

    getBillingDeliveryDetail: (req, res) => {

        const { ptNo, ipNo } = req.params;

        getBillingDeliveryDetail(ptNo, ipNo, (err, result) => {

            if (err) {
                return res.status(200).json({
                    success: 0,
                    stage: err.stage || "UNKNOWN",
                    message: err.message || err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Fetched SuccessFully",
                data: result
            });

        });
    },

    getBillingTransactions: (req, res) => {

        const { ptNo, ipNo, status } = req.params;

        getBillingTransactions(ptNo, ipNo, status, (err, result) => {

            if (err) {
                return res.status(200).json({
                    success: 0,
                    stage: err.stage || "UNKNOWN",
                    message: err.message || err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Fetched SuccessFully",
                data: result
            });

        });
    },


    getBystanderBill: (req, res) => {

        const { ptNo, ipNo, status } = req.params;

        getBystanderBill(ipNo, ptNo, status, (err, result) => {

            if (err) {
                return res.status(200).json({
                    success: 0,
                    stage: err.stage || "UNKNOWN",
                    message: err.message || err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Fetched SuccessFully",
                data: result
            });

        });
    },


    getPatientExtraOrder: (req, res) => {

        const { ptNo, ipNo, status } = req.params;

        getPatientExtraOrder(ipNo, ptNo, status, (err, result) => {

            if (err) {
                return res.status(200).json({
                    success: 0,
                    stage: err.stage || "UNKNOWN",
                    message: err.message || err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Fetched SuccessFully",
                data: result
            });

        });
    },

    getPatientDietBill: (req, res) => {

        const { ptNo, ipNo, status } = req.params;

        getPatientDietBill(ptNo, ipNo, status, (err, result) => {

            if (err) {
                return res.status(200).json({
                    success: 0,
                    stage: err.stage || "UNKNOWN",
                    message: err.message || err
                });
            }

            return res.status(200).json({
                success: 1,
                message: "Fetched SuccessFully",
                data: result
            });

        });
    },

    createPatientBilling: (req, res) => {
        const data = req.body;
        const {
            patient_id,
            admission_id,
            created_by,
            items = []
        } = data;

        if (!patient_id || !admission_id || !created_by) {
            return res.status(200).json({
                success: 0,
                message: "Patient Id is Missing",
            });
        }

        if (!Array.isArray(items) || items.length === 0) {
            return res.status(200).json({
                success: 0,
                message: "Item is Missings",
            });
        }
        createPatientBillingService(data, (err, result) => {
            if (err) {
                console.error("createPatientBilling:", err);
                return res.status(500).json({
                    success: 0,
                    message: err.message || "Failed to create billing.",
                });
            }
            return res.status(201).json({
                success: 1,
                message: "Billing created successfully.",
                data: result,
            });

        });

    },
    updateBulkPickingUp: (req, res) => {
        const { Items } = req.body;

        if (!Array.isArray(Items) || Items.length === 0) {
            return res.status(200).json({
                success: 0,
                message: "Items are missing",
            });
        }

        updateBulkPickingUpService(Items, (err, result) => {
            if (err) {
                console.error("updateBulkPickingUp:", err);
                return res.status(500).json({
                    success: 0,
                    message: err.message || "Failed to update pickup status.",
                });
            }

            return res.status(200).json({
                success: 1,
                message: "Orders picked up successfully.",
                data: result,
            });
        });
    },

    getDeliveryBillDetails: (req, res) => {

        const body = req.body;

        getDeliveryBillDetailsService(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            };

            if (!results || results?.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Delivery For this Order",
                    data: []
                });
            };

            return res.status(200).json({
                success: 1,
                data: results
            });

        });
    },

    CreateBystanderBilling: (req, res) => {
        const data = req.body;
        CreateBystanderBilling(data, (err, result) => {
            if (err) {
                console.error(
                    "Create Bystander Billing Error:",
                    err
                );
                return res.status(500).json({
                    success: 0,
                    message: "Failed to generate bill"
                });
            }
            // Service response
            return res.status(200).json(result);

        });

    },

    GetBystanderBillingDetails: (req, res) => {
        const data = req.body;
        getBystanderBillingDetails(data, (err, result) => {
            if (err) {
                console.error(
                    "Get Bystander Billing Error:",
                    err
                );
                return res.status(500).json({
                    success: 0,
                    message: "Failed to fetch billing details"
                });
            }
            return res.status(200).json(
                result
            );

        });

    },
    createBillingPayment: (req, res) => {

        const {
            amount,
            payment_mode,
            collected_by,
            collected_location,
            transaction_id,
            payments
        } = req.body;

        if (!Array.isArray(payments) || !payments.length) {
            return res.status(200).json({
                success: 0,
                message: "Payment details are missing"
            });
        }

        if (!amount || Number(amount) <= 0) {
            return res.status(200).json({
                success: 0,
                message: "Invalid payment amount"
            });
        }

        if (!payment_mode) {
            return res.status(200).json({
                success: 0,
                message: "Payment mode is required"
            });
        }

        if (!collected_by) {
            return res.status(200).json({
                success: 0,
                message: "Collected by is required"
            });
        }

        if (!collected_location) {
            return res.status(200).json({
                success: 0,
                message: "Collected location is required"
            });
        }

        createBillingPaymentService(
            {
                amount,
                payment_mode,
                collected_by,
                collected_location,
                transaction_id,
                payments
            },
            (err, result) => {
                if (err) {
                    console.error("createBillingPayment error:", err);
                    return res.status(200).json({
                        success: 0,
                        message: err.message ||
                            "Payment failed"
                    });
                }

                return res.status(200).json({
                    success: 1,
                    message: "Payment completed successfully",
                    data: result
                });
            }
        );
    },

    getBillablePatientDetail: (req, res) => {
        const { status } = req.params;
        getBillablePatientDetail(status, (err, result) => {
            if (err) {
                console.error("Billable Patient Fetching Error :", err);
                return res.status(200).json({
                    success: 0,
                    message: err.message ||
                        "Fetching Error~!"
                });
            }

            return res.status(200).json({
                success: 1,
                message: "Billable Patient Fetched successfully",
                data: result
            });
        }
        );
    },




};


