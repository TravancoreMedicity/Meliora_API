const { safeMessage } = require('../Canteen_Orders/Helper');
const { getCurrentEmId } = require('../../authentication/currentUser');

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
            // created_by is the logged-in employee (requireMenuRight put it in req.currentEmId); the
            // value in the request is ignored. employee_id (whose cash is being closed) stays as sent.
            const data = { ...req.body, created_by: req.currentEmId ?? req.body?.created_by };
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

        // largest amount that can be issued in one go (set PETTY_CASH_MAX_AMOUNT in .env to change it)
        const MAX_AMOUNT = Number(process.env.PETTY_CASH_MAX_AMOUNT) || 50000;

        const body = req.body ?? {};

        const reject = (message) => res.status(200).json({ success: 0, message });

        const employeeId = Number(body.employee_id);

        if (!Number.isInteger(employeeId) || employeeId <= 0) {
            return reject('Select the employee who receives the petty cash');
        }

        // a number or a plain decimal string with at most 2 decimals; no negatives, text, NaN, 1e9 ...
        const amountText = typeof body.amount === 'number' ? String(body.amount) : body.amount;

        if (typeof amountText !== 'string' || !/^\d{1,9}(\.\d{1,2})?$/.test(amountText.trim())) {
            return reject('Enter a valid amount (more than 0, up to 2 decimals)');
        }

        const amount = Number(amountText);

        if (!(amount > 0)) {
            return reject('Amount must be greater than 0');
        }

        if (amount > MAX_AMOUNT) {
            return reject(`Amount cannot be more than ${MAX_AMOUNT} in one issue`);
        }

        const remarks = typeof body.remarks === 'string' ? body.remarks.trim() : '';

        if (remarks.length > 255) {
            return reject('Remarks cannot exceed 255 characters');
        }

        const issuePettyCash = (data) => {
            try {
                AssignEmployeePettyCashDetails(data, (error) => {
                    if (error) {
                        // our own checks are shown as they are, database errors are hidden
                        return reject(
                            safeMessage(error, 'Error in Inserting Petty Cash Details.!')
                        );
                    }

                    return res.status(200).json({
                        success: 1,
                        message: 'Inserted Successfully!',
                    });
                });

            } catch (error) {
                console.error('Petty cash error:', error);
                return res.status(500).json({
                    success: 0,
                    message: 'Internal server error,Error in Inserting Petty Cash Details.!'
                });
            }
        };

        // The person issuing the cash is the LOGGED-IN user, taken from the token (em_id looked up
        // from the login id). given_by from the request is no longer trusted - before, any user could
        // issue cash in somebody else's name.
        getCurrentEmId(req, (identityError, givenBy) => {

            if (identityError) {
                return reject(safeMessage(identityError, 'Could not identify the logged-in user'));
            }

            if (!givenBy) {
                return reject('Your login is not linked to an employee record, so petty cash cannot be issued');
            }

            if (body.given_by !== undefined && Number(body.given_by) !== givenBy) {
                console.warn(
                    `Petty cash: given_by ${body.given_by} in the request differs from the logged-in employee ${givenBy}; using the logged-in employee`
                );
            }

            issuePettyCash({
                employee_id: employeeId,
                amount,
                given_by: givenBy,
                remarks: remarks || null
            });
        });

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




