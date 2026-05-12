// dietdeliveryassign.controller.js

const { CreateDietDeliveryAssignment, getCurrentAssignedFoodDetail } = require("./dietorderassign.service");


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


};