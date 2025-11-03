const { pool } = require('../../config/database');
const logger = require('../../logger/logger')
const { insertLevel, viewCondemnationLevel, updateLevel, getCondemnationApprovalRights, getCondemnationAllDetails,
    getActiveCondemnationLevel,
    getCondemnActiveApprovalLevel,
    updateLevelDetail
} = require('./approval_level_mast.service');

module.exports = {

    insertLevel: (req, res) => {
        const body = req.body;
        insertLevel(body, (err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Condemnation Approval Level Created Successfully"
            })
        })
    },
    viewCondemnationLevel: (req, res) => {
        viewCondemnationLevel((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results === 0) {
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

    getCondemnActiveApprovalLevel: (req, res) => {
        getCondemnActiveApprovalLevel((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results === 0) {
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
    
    updateLevel: (req, res) => {
        const body = req.body;      
      updateLevel(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
    
            if (results.affectedRows === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No record found in master table"
                });
            }
    
            // Proceed to update the second table
            updateLevelDetail(body, (err2) => {
                if (err2) {
                    return res.status(200).json({
                        success: 0,
                        message: err2
                    });
                }
    
                return res.status(200).json({
                    success: 2,
                    message: "Condemnation Approval Level Updated Successfully"
                });
            });
        });
    },    

    // getCondemnationApprovalRights: (req, res) => {
    //     const body = req.body;
    //     getCondemnationApprovalRights(body, (err, results) => {
    //         if (err) {
    //             return res.status(200).json({
    //                 success: 0,
    //                 message: err
    //             })
    //         }
    //         if (results.length === 0) {
    //             return res.status(200).json({
    //                 success: 2,
    //                 message: "No record found"
    //             })
    //         }
    //         return res.status(200).json({
    //             success: 1,
    //             data: results
    //         })
    //     })
    // },

    // getCondemnationAllDetails: (req, res) => {
    //     const body = req.body;
    //     getCondemnationAllDetails(body, (err, results) => {

    //         if (err) {
    //             return res.status(200).json({
    //                 success: 0,
    //                 message: err
    //             })
    //         }
    //         if (results.length === 0) {
    //             return res.status(200).json({
    //                 success: 2,
    //                 message: "No record found"
    //             })
    //         }
    //         return res.status(200).json({
    //             success: 1,
    //             data: results
    //         })
    //     })
    // },
    getActiveCondemnationLevel: (req, res) => {

        getActiveCondemnationLevel((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results === 0) {
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
    

}