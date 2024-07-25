const multer = require('multer');
const path = require('path');
const fs = require("fs")
const { getAlltaskfromtodate, getEmployeeDetails, getAllComplaintsfromtodate, getAllEmployees, getDepttaskfromtodate, getDeptComplaintsfromtodate, getProjectsfromtodate,
    EmployeePendingcompl, EmployeeOnholdcompl, DeptOnholdcompl, DeptPendingcompl, getprojectduedate } = require('./tm_graph.service')
const logger = require('../../logger/logger');



module.exports = {


    getAlltaskfromtodate: (req, res) => {
        const body = req.body;
        getAlltaskfromtodate(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No Data Found",
                    data: []
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })
        })
    },
    getProjectsfromtodate: (req, res) => {
        const body = req.body;
        getProjectsfromtodate(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No Data Found",
                    data: []
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })
        })
    },
    getDepttaskfromtodate: (req, res) => {
        const body = req.body;
        getDepttaskfromtodate(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No Data Found",
                    data: []
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })
        })
    },
    getAllComplaintsfromtodate: (req, res) => {
        const body = req.body;
        getAllComplaintsfromtodate(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No Data Found",
                    data: []
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })
        })
    },

    getEmployeeDetails: (req, res) => {
        const body = req.body;
        getEmployeeDetails(body, (err, results) => {
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
                data: results
            })
        })
    },

    getAllEmployees: (req, res) => {
        const body = req.body;
        getAllEmployees(body, (err, results) => {
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
                data: results
            })
        })
    },
    getDeptComplaintsfromtodate: (req, res) => {
        const body = req.body;
        getDeptComplaintsfromtodate(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No Data Found",
                    data: []
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })
        })
    },

    getEmployeeImage: (req, res) => {
        const id = req.params.id
        const folderPath = `D:/DocMeliora/Meliora/TaskEmployeeImage/${id}`;
        fs.readdir(folderPath, (err, files) => {

            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err.message // Return the error message
                });
            }
            return res.status(200).json({

                success: 1,

                data: files // Send the list of files
            });
        });
    },

    EmployeePendingcompl: (req, res) => {
        const id = req.params.id;
        EmployeePendingcompl(id, (err, results) => {

            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (!results) {
                return res.status(200).json({
                    success: 1,
                    message: "No Data"
                });
            }
            return res.status(200).json({
                success: 2,
                data: results
            });
        })
    },
    EmployeeOnholdcompl: (req, res) => {
        const id = req.params.id;
        EmployeeOnholdcompl(id, (err, results) => {

            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (!results) {
                return res.status(200).json({
                    success: 1,
                    message: "No Data"
                });
            }
            return res.status(200).json({
                success: 2,
                data: results
            });
        })
    },

    DeptOnholdcompl: (req, res) => {
        const id = req.params.id;
        DeptOnholdcompl(id, (err, results) => {

            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (!results) {
                return res.status(200).json({
                    success: 1,
                    message: "No Data"
                });
            }
            return res.status(200).json({
                success: 2,
                data: results
            });
        })
    },


    DeptPendingcompl: (req, res) => {
        const id = req.params.id;
        DeptPendingcompl(id, (err, results) => {

            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (!results) {
                return res.status(200).json({
                    success: 1,
                    message: "No Data"
                });
            }
            return res.status(200).json({
                success: 2,
                data: results
            });
        })
    },
    getprojectduedate: (req, res) => {
        const id = req.params.id;
        getprojectduedate(id, (err, results) => {

            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (!results) {
                return res.status(200).json({
                    success: 1,
                    message: "No Data"
                });
            }
            return res.status(200).json({
                success: 2,
                data: results
            });
        })
    },
}

