
const { InsertToken, getToken, updatetoken, Insertdate, checkInsertDateVal, Getdate, GetDateThisMonth, Insertdivision, Getdivision, updatedivision, InsertTax, Gettax, updatetax, GetDashboardTokens } = require('../tokenmaster/tokenmaster.service')
module.exports = {

    InsertToken: (req, res) => {
        const body = req.body;
        InsertToken(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results.length === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No Records"
                })
            }
            return res.status(200).json({
                success: 1,
                data: results,
                message: "Data Inserted Sucessfully"
            })
        })
    },

    getToken: (req, res) => {
        getToken((error, results) => {
            if (error) {
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error",
                });
            }

            if (results?.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "no data",
                });
            }

            return res.status(200).json({
                success: 1,
                data: results,
            });
        });
    },
    updatetoken: (req, res) => {
        const body = req.body;
        updatetoken(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results.length === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No Records"
                })
            }
            return res.status(200).json({
                success: 2,
                data: results,
                message: "Data Updated Sucessfully"

            })
        })
    },

    Insertdate: (req, res) => {
        const body = req.body;
        checkInsertDateVal(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }

            const value = JSON.parse(JSON.stringify(results));
            if (Object.keys(value).length === 0) {
                Insertdate(body, (err, results) => {
                    if (err) {
                        return res.status(200).json({
                            success: 0,
                            message: err
                        })
                    }
                    if (results.length === 0) {
                        return res.status(200).json({
                            success: 1,
                            message: "No Records"
                        })
                    }
                    return res.status(200).json({
                        success: 1,
                        data: results,
                        message: "Data Inserted Sucessfully"
                    })
                })
            } else {
                return res.status(200).json({
                    success: 7,
                    message: "Appointment Date Already Exist"
                })
            }
        })
    },


    Getdate: (req, res) => {
        Getdate((error, results) => {
            if (error) {
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error",
                });
            }

            if (results?.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "no data",
                });
            }

            return res.status(200).json({
                success: 1,
                data: results,
            });
        });
    },
    GetDateThisMonth: (req, res) => {
        GetDateThisMonth((error, results) => {
            if (error) {
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error",
                });
            }

            if (results?.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "no data",
                });
            }

            return res.status(200).json({
                success: 1,
                data: results,
            });
        });
    },
    Insertdivision: (req, res) => {
        const body = req.body;
        Insertdivision(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results.length === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No Records"
                })
            }
            return res.status(200).json({
                success: 1,
                data: results,
                message: "Data Inserted Sucessfully"
            })
        })
    },

    Getdivision: (req, res) => {
        Getdivision((error, results) => {
            if (error) {
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error",
                });
            }

            if (results?.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "no data",
                });
            }

            return res.status(200).json({
                success: 1,
                data: results,
            });
        });
    },

    updatedivision: (req, res) => {
        const body = req.body;
        updatedivision(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results.length === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No Records"
                })
            }
            return res.status(200).json({
                success: 2,
                data: results,
                message: "Data Updated Sucessfully"

            })
        })
    },
    InsertTax: (req, res) => {
        const body = req.body;
        InsertTax(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results.length === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No Records"
                })
            }
            return res.status(200).json({
                success: 1,
                data: results,
                message: "Data Inserted Sucessfully"
            })
        })
    },

    Gettax: (req, res) => {
        Gettax((error, results) => {
            if (error) {
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error",
                });
            }

            if (results?.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "no data",
                });
            }

            return res.status(200).json({
                success: 1,
                data: results,
            });
        });
    },
    updatetax: (req, res) => {
        const body = req.body;
        updatetax(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results.length === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No Records"
                })
            }
            return res.status(200).json({
                success: 2,
                data: results,
                message: "Data Updated Sucessfully"

            })
        })
    },
    GetDashboardTokens: (req, res) => {
        GetDashboardTokens((error, results) => {
            if (error) {
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error",
                });
            }

            if (results?.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "no data",
                });
            }

            return res.status(200).json({
                success: 1,
                data: results,
            });
        });
    },
}