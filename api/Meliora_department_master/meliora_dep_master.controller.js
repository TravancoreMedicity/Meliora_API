
const logger = require('../../logger/logger')
const { createDept, DeptMasterGet, Updatedeptmaster, createDeptSecMaster, DeptSecMasterGet, UpdatedeptSecmaster, UpdatedeptSecmasterID, GetdeptSecEmp } = require('../Meliora_department_master/meliora_dep_master.service');

module.exports = {

    createDept: (req, res) => {
        const body = req.body
        createDept(body, (err, results) => {
            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: err
                })
            }
            return res.status(200).json({
                success: 1,
                message: "Data Inserted Successfully",
                insertid: results.insertId
            })
        })
    },

    DeptMasterGet: (req, res) => {
        DeptMasterGet((err, results) => {
            if (err) {
                // logger.logwindow(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }
            if (!results) {
                // logger.infologwindow("No Results Found")
                return res.status(200).json({
                    success: 0,
                    message: "No Results Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    Updatedeptmaster: (req, res) => {
        const body = req.body
        Updatedeptmaster(body, (err, results) => {
            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: err
                })
            }
            return res.status(200).json({
                success: 1,
                message: "Data Updated Successfully",
                insertid: results.insertId
            })
        })
    },


    createDeptSecMaster: (req, res) => {
        const body = req.body
        createDeptSecMaster(body, (err, results) => {
            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: err
                })
            }
            return res.status(200).json({
                success: 1,
                message: "Data Inserted Successfully",
                insertid: results.insertId
            })
        })
    },
    DeptSecMasterGet: (req, res) => {
        DeptSecMasterGet((err, results) => {
            if (err) {
                // logger.logwindow(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }
            if (!results) {
                // logger.infologwindow("No Results Found")
                return res.status(200).json({
                    success: 0,
                    message: "No Results Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    UpdatedeptSecmaster: (req, res) => {
        const body = req.body
        UpdatedeptSecmaster(body, (err, results) => {
            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: err
                })
            }
            return res.status(200).json({
                success: 1,
                message: "Data Updated Successfully",
                insertid: results.insertId
            })
        })
    },

    UpdatedeptSecmasterID: (req, res) => {
        const id = req.params.id;
        UpdatedeptSecmasterID(id, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length == 0) {
                logger.infologwindow("No Record Found")
                return res.status(200).json({
                    success: 0,
                    message: "No Record Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },

    GetdeptSecEmp: (req, res) => {
        const id = req.params.id;
        GetdeptSecEmp(id, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length == 0) {
                logger.infologwindow("No Record Found")
                return res.status(200).json({
                    success: 0,
                    message: "No Record Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },
}
