// dietdeliveryassign.controller.js

const { CreateDietDeliveryAssignment, getCurrentAssignedFoodDetail, FetchDeliveryByAssigny, updateDeliveryStatus, UpdateDeliveryLogDetail, FetchAssignedItemStatus, fetchDeliveryLogDetail, UpdateAssignOrderDetail, getBillingSummary, getBillingDeliveryDetail, getBillingTransactions, getBystanderBill, getPatientDietBill, getPatientExtraOrder, createPatientBillingService, updateBulkPickingUpService, getDeliveryBillDetailsService, CreateBystanderBilling, getBystanderBillingDetails, createBillingPaymentService, getBillablePatientDetail, getProformaDetailsService, convertProformaToBill, insertOrderPacking, getOrderPackingByAssignment, createPrintQueueService, getCashSummaryDetails, getPaymentModeDetails, getPaymentHistoryDetail, getPaymentHistoryBillDetail, getCashReturnDetails, returnAmountSettlement, getReturnDetails, getEmployeePettyCashDetails, getBillCollectionSummary, getCollectionDetails, getEmployeePettyCashDetailsByClosingIds, getPendingBilledDetails, settleBilling } = require("./dietorderassign.service");


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

        if (!data.assignment_detail_id) {
            return res.status(200).json({
                success: 0,
                message: "assignment_detail_id required"
            });
        }

        if (!data.canteen_order_id) {
            return res.status(200).json({
                success: 0,
                message: "canteen_order_id required"
            });
        }

        if (!data.type_slno) {
            return res.status(200).json({
                success: 0,
                message: "type_slno required"
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

        UpdateAssignOrderDetail(data, (err, result) => {

            if (err) {
                return res.status(200).json({
                    success: 0,
                    stage: err.stage || "UNKNOWN",
                    message: err.message || err
                });
            }

            // Notify all connected clients
            req.io.emit(
                "dietDeliveryStatusUpdated",
                {
                    assignment_id: data.assignment_id,
                    assignment_detail_id: data.assignment_detail_id,
                    canteen_order_id: data.canteen_order_id,
                    type_slno: data.type_slno,
                    delivery_status: data.delivery_status,
                    remarks: data.remarks || null,
                    updated_by: data.updated_by,
                    updated_time: new Date(),
                    meal: data.meal || null,
                    item_name: data.item_name || null,
                    schedule_updated: result?.schedule_updated || 0,
                    type: "DELIVERY_STATUS_UPDATED"
                }
            );

            return res.status(200).json({
                success: 1,
                message: result?.message || "Status Updated Successfully",
                schedule_updated: result?.schedule_updated || 0
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
            payments,
            change_amount,
            received_amount,
            remarks,
            change_status
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
                payments,
                change_amount,
                change_status,
                received_amount,
                remarks
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


    getProformaDetails: (req, res) => {

        const { assignment_detail_id } = req.params;

        if (!assignment_detail_id) {
            return res.status(200).json({
                success: 0,
                message: "Assignment detail ID is required",
            });
        }

        getProformaDetailsService(
            assignment_detail_id,
            (err, result) => {

                if (err) {
                    console.error(
                        "getProformaDetails:",
                        err
                    );

                    return res.status(500).json({
                        success: 0,
                        message:
                            err.message ||
                            "Failed to fetch proforma details",
                    });
                }

                return res.status(200).json({
                    success: 1,
                    data: result,
                });
            }
        );
    },
    convertProformaToBillController: (req, res) => {

        const data = req.body;

        const {
            proforma_id,
            bill,
            details
        } = data;

        // ---------------------------------------------
        // VALIDATION
        // ---------------------------------------------

        if (!proforma_id) {
            return res.status(200).json({
                success: 0,
                message: "Proforma ID is required"
            });
        }

        if (!bill) {
            return res.status(200).json({
                success: 0,
                message: "Bill details are required"
            });
        }

        if (!Array.isArray(details) || details.length === 0) {
            return res.status(200).json({
                success: 0,
                message: "Bill details are required"
            });
        }

        // ---------------------------------------------
        // SERVICE
        // ---------------------------------------------

        convertProformaToBill(
            data,
            (err, result) => {

                if (err) {

                    console.error(
                        "convertProformaToBillController:",
                        err
                    );

                    return res.status(500).json({
                        success: 0,
                        message:
                            err.message ||
                            "Failed to convert proforma to bill"
                    });
                }

                return res.status(200).json({
                    success: 1,
                    message: "Proforma converted to bill successfully",
                    data: result
                });
            }
        );
    },
    insertOrderPackingController: (req, res) => {
        const data = req.body;
        const {
            order_id,
            created_by,
            packets,
            type_slno
        } = data;
        // --------------------------------------------------
        // VALIDATION
        // --------------------------------------------------

        if (!order_id) {
            return res.status(200).json({
                success: 0,
                message: "Order ID is required"
            });

        }

        if (!created_by) {
            return res.status(200).json({
                success: 0,
                message: "Created by is required"
            });

        }

        if (!type_slno) {
            return res.status(200).json({
                success: 0,
                message: "Type Slno is Missing!"
            });

        }

        if (!Array.isArray(packets) || packets.length === 0) {
            return res.status(200).json({
                success: 0,
                message: "At least one packet is required"
            });
        }


        // --------------------------------------------------
        // VALIDATE PACKETS
        // --------------------------------------------------

        const invalidPacket =
            packets?.some(packet => {
                if (!packet?.packet_no) {
                    return true;
                }
                if (
                    !Array.isArray(packet?.items) ||
                    packet.items.length === 0
                ) {
                    return true;
                }
                return packet.items.some(
                    item =>
                        !item?.order_item_id
                );
            });


        if (invalidPacket) {
            return res.status(200).json({
                success: 0,
                message:
                    "Invalid packet or packet item details"
            });
        }


        // --------------------------------------------------
        // SERVICE
        // --------------------------------------------------

        insertOrderPacking(
            data,
            (err, result) => {

                if (err) {

                    console.error(
                        "insertOrderPackingController:",
                        err
                    );

                    return res.status(500).json({
                        success: 0,
                        message:
                            err.message ||
                            "Failed to save order packing"
                    });

                }


                return res.status(200).json({

                    success: 1,

                    message:
                        "Order packing saved successfully",

                    data: result

                });

            }
        );

    },
    getOrderPackingByAssignmentController: (req, res) => {

        const { assignment_detail_id } = req.body;

        if (!assignment_detail_id) {

            return res.status(200).json({
                success: 0,
                message: "Assignment detail ID is required"
            });

        }

        getOrderPackingByAssignment(
            assignment_detail_id,
            (error, result) => {

                if (error) {
                    console.error(
                        "getOrderPackingByAssignmentController:",
                        error
                    );

                    return res.status(500).json({
                        success: 0,
                        message:
                            error.message ||
                            "Failed to get packing details"
                    });

                }

                if (!result || result.length === 0) {

                    return res.status(200).json({
                        success: 1,
                        message: "No packing details found",
                        data: []
                    });

                }

                return res.status(200).json({
                    success: 1,
                    message: "Packing details fetched successfully",
                    data: result
                });

            }
        );
    },

    createPrintQueue: (req, res) => {

        const packets = req.body;

        if (!Array.isArray(packets) || packets.length === 0) {
            return res.status(400).json({
                success: 0,
                message: "No packets received"
            });
        }

        const values = packets.map(packet => [
            packet?.packing_id,
            packet?.packet_uid,
            packet?.meal_type,
            packet?.order_id,
            packet?.admission_id,
            packet?.patient_no,
            packet?.patient_name,
            packet?.bed_code,
            packet?.nursing_station,
            packet?.party_name
        ]);

        createPrintQueueService(
            values,
            (error, result) => {

                if (error) {
                    console.error(
                        "createPrintQueueService:",
                        error
                    );

                    return res.status(500).json({
                        success: 0,
                        message:
                            error.message ||
                            "Failed to create print queue"
                    });
                }

                if (
                    result?.duplicatePacketUids?.length > 0
                ) {
                    return res.status(409).json({
                        success: 0,
                        message:
                            "Print UID already exists",
                        duplicatePacketUids:
                            result.duplicatePacketUids
                    });
                }

                return res.status(200).json({
                    success: 1,
                    message:
                        "Print queue created successfully",
                    data: result
                });
            }
        );
    },

    getCashSummaryDetails: (req, res) => {
        const { EmId } = req.params;

        getCashSummaryDetails(EmId, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            return res.status(200).json({
                success: 1,
                data: results,
                message: "Count Fetched SuccessFully"
            });

        });
    },
    getPaymentHistoryDetail: (req, res) => {
        const { EmId } = req.params;

        getPaymentHistoryDetail(EmId, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            return res.status(200).json({
                success: 1,
                data: results,
                message: "Count Fetched SuccessFully"
            });

        });
    },

    getPaymentModeDetails: (req, res) => {
        const { EmId } = req.params;

        getPaymentModeDetails(EmId, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            return res.status(200).json({
                success: 1,
                data: results,
                message: "Count Fetched SuccessFully"
            });

        });
    },
    getPaymentHistoryBillDetail: (req, res) => {
        const { billingId } = req.params;

        getPaymentHistoryBillDetail(billingId, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err,
                });
            }

            return res.status(200).json({
                success: 1,
                data: results,
                message: "Payment History Bill Detail Fetched Successfully",
            });
        });
    },
    getCashReturnDetails: (req, res) => {
        // const { EmId } = req.params;
        getCashReturnDetails((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err,
                });
            }

            return res.status(200).json({
                success: 1,
                data: results,
                message: "Payment History Bill Detail Fetched Successfully",
            });
        });
    },
    returnAmountSettlement: (req, res) => {
        // const { EmId } = req.params;
        const data = req.body;

        returnAmountSettlement(data, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err,
                });
            };

            if (results.affectedRows === 0) {
                return res.status(200).json({
                    success: 0,
                    message: `Payment doesn't exist or cash return is already settled`,
                });
            };

            return res.status(200).json({
                success: 1,
                message: "Updated Successfully",
            });
        });
    },

    getReturnDetails: (req, res) => {
        const { paymentId } = req.params;

        getReturnDetails(paymentId, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err,
                });
            };

            if (results.length === 0) {
                return res.status(200).json({
                    success: 1,
                    message: `No Returned Amount Yet`,
                    data: []
                });
            };

            return res.status(200).json({
                success: 1,
                message: "Updated Successfully",
                data: results
            });
        });
    },

    getEmployeePettyCashDetails: (req, res) => {
        const { empid, status } = req.params;

        getEmployeePettyCashDetails(empid, status, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err,
                });
            };

            if (results.length === 0) {
                return res.status(200).json({
                    success: 1,
                    message: `Petty Cash not Found For the Employee!`,
                    data: []
                });
            };

            return res.status(200).json({
                success: 1,
                message: "Fetched  Successfully",
                data: results
            });
        });
    },

    getBillCollectionSummary: (req, res) => {
        getBillCollectionSummary((err, results) => {
            if (err) {

                return res.status(200).json({
                    success: 0,
                    message: err,
                });
            };

            if (results.length === 0) {
                return res.status(200).json({
                    success: 1,
                    message: `No Bill Summary For Today!`,
                    data: []
                });
            };

            return res.status(200).json({
                success: 1,
                message: "Bill Detail Fetched Successfully !",
                data: results
            });
        });
    },

    getCollectionDetails: (req, res) => {
        const { Empid } = req.params;
        getCollectionDetails(Empid, (err, results) => {
            if (err) {

                return res.status(200).json({
                    success: 0,
                    message: err,
                });
            };

            if (results.length === 0) {
                return res.status(200).json({
                    success: 1,
                    message: `No Bill Summary For Today!`,
                    data: []
                });
            };

            return res.status(200).json({
                success: 1,
                message: "Bill Detail Fetched Successfully !",
                data: results
            });
        });
    },

    getEmployeePettyCashDetailsByClosingIds: (req, res) => {

        const { employee_id, closing_ids } = req.body;

        if (!employee_id) {
            return res.status(400).json({
                success: 0,
                message: "Employee ID is required"
            });
        }

        if (!Array.isArray(closing_ids) || closing_ids.length === 0) {
            return res.status(400).json({
                success: 0,
                message: "Closing IDs are required"
            });
        }

        getEmployeePettyCashDetailsByClosingIds(
            employee_id,
            closing_ids,
            (error, result) => {

                if (error) {
                    console.error(error);

                    return res.status(500).json({
                        success: 0,
                        message: "Failed to get petty cash details"
                    });
                }

                return res.status(200).json({
                    success: 1,
                    data: result
                });
            }
        );
    },

    getPendingBilledDetails: (req, res) => {
        const { admission_id } = req.params;

        if (!admission_id) {
            return res.status(400).json({
                success: 0,
                message: "Admission ID is required"
            });
        }

        getPendingBilledDetails(
            admission_id,
            (err, result) => {
                if (err) {
                    console.error(err);

                    return res.status(500).json({
                        success: 0,
                        message: "Failed to fetch pending billed details"
                    });
                }

                return res.status(200).json({
                    success: 1,
                    data: result
                });
            }
        );
    },


    settleBilling: (req, res) => {
        const { admission_id, billing_ids, employee_id, settle_id } = req.body;

        /*
         * admission_id
         */
        if (
            admission_id === undefined ||
            admission_id === null ||
            String(admission_id).trim() === ""
        ) {
            return res.status(400).json({
                success: 0,
                message: "Admission ID is required"
            });
        }


        /*
         * billing_ids
         */
        if (!Array.isArray(billing_ids)) {
            return res.status(400).json({
                success: 0,
                message: "Billing IDs must be an array"
            });
        }

        if (billing_ids.length === 0) {
            return res.status(400).json({
                success: 0,
                message: "At least one billing ID is required"
            });
        }

        /*
         * Remove duplicate billing IDs
         */
        const uniqueBillingIds = [...new Set(billing_ids)];

        /*
         * Validate every billing ID
         */
        const invalidBillingId = uniqueBillingIds.find(
            id =>
                !Number.isInteger(Number(id)) ||
                Number(id) <= 0
        );

        if (invalidBillingId !== undefined) {
            return res.status(400).json({
                success: 0,
                message: "Invalid billing ID"
            });
        }

        /*
         * employee_id
         */
        if (
            employee_id === undefined ||
            employee_id === null ||
            String(employee_id).trim() === ""
        ) {
            return res.status(400).json({
                success: 0,
                message: "Employee ID is required"
            });
        }



        settleBilling(
            Number(admission_id),
            uniqueBillingIds.map(Number),
            Number(settle_id),
            Number(employee_id),
            (err, result) => {
                if (err) {
                    console.error("Settle Billing Error:", err);

                    return res.status(400).json({
                        success: 0,
                        message: err.message || "Failed to settle billing"
                    });
                }

                return res.status(200).json({
                    success: 1,
                    message: "Billing settled successfully",
                    data: result
                });
            }
        );
    },

};




