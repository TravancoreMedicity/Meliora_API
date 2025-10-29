const { ContractMasterInsert, GetcontractMaster, ContractMasterUpdated, WorkLocationInsert, GetlocationMaster, LocationMasterUpdated,

} = require("../contract_master/contract.service");

const logger = require("../../logger/logger");

module.exports = {
    ContractMasterInsert: (req, res) => {
        const body = req.body
        ContractMasterInsert(body, (err, results) => {
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

    GetcontractMaster: (req, res) => {
        GetcontractMaster((err, results) => {
            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: err
                })
            }
            if (results.length == 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No Records Found"
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })
        })
    },

    ContractMasterUpdated: (req, res) => {
        const body = req.body
        ContractMasterUpdated(body, (err, results) => {
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

    WorkLocationInsert: (req, res) => {
        const body = req.body
        WorkLocationInsert(body, (err, results) => {
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

    GetlocationMaster: (req, res) => {
        GetlocationMaster((err, results) => {
            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: err
                })
            }
            if (results.length == 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No Records Found"
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })
        })
    },

    LocationMasterUpdated: (req, res) => {
        const body = req.body
        LocationMasterUpdated(body, (err, results) => {
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
}