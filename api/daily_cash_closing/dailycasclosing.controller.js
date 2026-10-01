
const {
    createCashClosing,
    getTodayClosedEmployees,
    getToadyEmployeePettyCash,
    AssignEmployeePettyCashDetails,
    getClosingDenominationDetails
} = require('./dailycashclosing.service');


module.exports = {

    createCashClosingController: (req, res) => {
        try {
            const data = req.body;
            // BASIC VALIDATION
            if (!data) {
                return res.status(400).json({
                    success: 0,
                    message: 'Request body is required'
                });
            }

            if (!data.employee_id) {
                return res.status(400).json({
                    success: 0,
                    message: 'Employee ID is required'
                });
            }

            if (!data.created_by) {
                return res.status(400).json({
                    success: 0,
                    message: 'Created by is required'
                });
            }

            if (!data.billing_ids || data.billing_ids?.length === 0) {
                return res.status(400).json({
                    success: 0,
                    message: 'Billing Ids Are Missing For the Settlements!'
                });
            }




            // COLLECTION AMOUNT
            const collectionAmount =
                Number(data.collection_amount);

            if (
                !Number.isFinite(collectionAmount) ||
                collectionAmount <= 0
            ) {
                return res.status(400).json({
                    success: 0,
                    message:
                        'Collection amount must be greater than 0'
                });
            }



            // DENOMINATIONS


            if (
                !data.denominations ||
                typeof data.denominations !== 'object'
            ) {
                return res.status(400).json({
                    success: 0,
                    message: 'Denominations are required'
                });
            }


            if (
                typeof data.denominations.cash !== 'object' ||
                typeof data.denominations.coins !== 'object'
            ) {
                return res.status(400).json({
                    success: 0,
                    message:
                        'Cash and coin denominations are required'
                });
            }



            // CHECK AT LEAST ONE


            const cashValues =
                Object.values(data.denominations.cash || {});

            const coinValues =
                Object.values(data.denominations.coins || {});

            const allQuantities = [
                ...cashValues,
                ...coinValues
            ];


            const hasQuantity =
                allQuantities.some(
                    quantity => Number(quantity) > 0
                );


            if (!hasQuantity) {
                return res.status(400).json({
                    success: 0,
                    message:
                        'At least one denomination quantity is required'
                });
            }



            // VALIDATE QUANTITIES


            for (const quantity of allQuantities) {

                const value = Number(quantity);

                if (
                    !Number.isFinite(value) ||
                    value < 0 ||
                    !Number.isInteger(value)
                ) {
                    return res.status(400).json({
                        success: 0,
                        message:
                            'Denomination quantity must be a non-negative whole number'
                    });
                }
            }



            // REMARKS


            if (
                data.remarks &&
                data.remarks.length > 500
            ) {
                return res.status(400).json({
                    success: 0,
                    message:
                        'Remarks cannot exceed 500 characters'
                });
            }



            // CREATE


            createCashClosing(
                data,
                (error, result) => {

                    if (error) {

                        console.error(
                            'Cash closing error:',
                            error
                        );

                        return res.status(500).json({
                            success: 0,
                            message:
                                error?.message ||
                                'Failed to create cash closing'
                        });
                    }


                    return res.status(200).json({
                        success: 1,
                        message:
                            'Cash closing created successfully',
                        data: result
                    });

                }
            );


        } catch (error) {

            console.error(
                'Cash closing controller error:',
                error
            );

            return res.status(500).json({
                success: 0,
                message: 'Internal server error'
            });

        }

    },


    getTodayClosedEmployeesController: (req, res) => {
        try {
            getTodayClosedEmployees(
                (error, result) => {

                    if (error) {

                        console.error(
                            'Get today closed employees error:',
                            error
                        );

                        return res.status(500).json({
                            success: 0,
                            message:
                                error?.message ||
                                'Failed to get today closed employees'
                        });

                    }

                    return res.status(200).json({
                        success: 1,
                        message:
                            'Today closed employees fetched successfully',
                        data: result
                    });

                }
            );

        } catch (error) {

            console.error(
                'Get today closed employees controller error:',
                error
            );

            return res.status(500).json({
                success: 0,
                message: 'Internal server error'
            });

        }

    },


    getToadyEmployeePettyCash: (req, res) => {
        try {
            getToadyEmployeePettyCash((error, result) => {
                if (error) {
                    console.error('Get today  employees petty Cash error:', error);
                    return res.status(500).json({
                        success: 0,
                        message: error?.message || 'Failed to get today closed employees'
                    });
                }

                return res.status(200).json({
                    success: 1,
                    message: 'Today employees Petty Cash fetched !',
                    data: result
                });

            }
            );

        } catch (error) {
            console.error('Get today  employees petty Cash error:', error);
            return res.status(500).json({
                success: 0,
                message: 'Internal server error'
            });

        }

    },


    AssignEmployeePettyCashDetails: (req, res) => {

        const data = {
            employee_id: req.body.employee_id,
            amount: req.body.amount,
            given_by: req.body.given_by,
            remarks: req.body.remarks || null
        };

        try {
            AssignEmployeePettyCashDetails(data, (error, result) => {
                if (error) {
                    return res.status(500).json({
                        success: 0,
                        message: error?.message || 'Error in Inserting Petty Cash Details.!'
                    });
                }

                return res.status(200).json({
                    success: 1,
                    message: 'Inserted Successfully!',
                });

            }
            );

        } catch (error) {
            return res.status(500).json({
                success: 0,
                message: 'Internal server error,Error in Inserting Petty Cash Details.!'
            });

        }

    },



    getClosingDenominationDetails: (req, res) => {

        const data = req.body;
        const { closing_id } = data;

        try {
            getClosingDenominationDetails(closing_id, (error, result) => {
                if (error) {
                    return res.status(500).json({
                        success: 0,
                        message: error?.message || 'Error in Fetching Denomination Details!'
                    });
                }

                return res.status(200).json({
                    success: 1,
                    message: 'Fetching Denomination Details Successfully!',
                    data: result
                });

            }
            );

        } catch (error) {
            return res.status(500).json({
                success: 0,
                message: 'Error in Fetching Denomination Details!'
            });

        }

    },



};




