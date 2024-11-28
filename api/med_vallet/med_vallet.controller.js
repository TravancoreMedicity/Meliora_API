const { date } = require('joi');
const logger = require('../../logger/logger');
const { createZonemaster,
    getAllZoneMaster,
    updatezonemaster,
    deleteZoneMaster,
    createUserMaster,
    getAlluserMaster,
    updataUserMaster,
    createslotmaster,
    getAllSlotMaster,
    updateslotmaster
} = require("../med_vallet/med_vallet.service");

module.exports = {
    createZonemaster: (req, res) => {
        const body = req.body;
        createZonemaster(body, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }
            if (!results) {
                logger.infologwindow("No Results Found")
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
    getAllZoneMaster: (req, res) => {
        getAllZoneMaster((err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 10,
                    message: err
                });
            }
            if (!results) {
                logger.infologwindow("No Results Found")
                return res.status(400).json({
                    success: 3,
                    message: "No Results Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    updatezonemaster: (req, res) => {
        const body = req.body;
        updatezonemaster(body, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 2,
                    message: "error in updating data"
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Updated Data successfully"
            });
        })
    },
    deleteZoneMaster: (req, res) => {
        const body = req.body;
        deleteZoneMaster(body, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 2,
                    message: "error in updating data"
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Updated Data successfully"
            });
        })
    },
    createUserMaster: (req, res) => {
        const body = req.body;
        createUserMaster(body, (err, result) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 2,
                    message: 'error in inserting data'
                })
            }
            return res.status(200).json({
                success: 1,
                message: 'Inserted successfully!'
            })
        })
    },
    getAlluserMaster: (req, res) => {
        getAlluserMaster((err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 10,
                    message: err
                });
            }
            if (!results) {
                logger.infologwindow("No Results Found")
                return res.status(400).json({
                    success: 3,
                    message: "No Results Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },
    updataUserMaster:(req,res) =>{
        const body = req.body;
        updataUserMaster(body,(err,results)=>{
            if(err){
                logger.logwindow(err)
                return res.status(400).json({
                    success:2,
                    message:'error in updating data'
                })
            };
            return res.status(200).json({
                success:1,
                message:'Updated succesfully!'
            })
        })
    },
    createslotmaster:(req,res) =>{
        const body = req.body;
        createslotmaster(body,(err,results)=>{
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Inserted successfully!"
            });
        })
    },getAllSlotMaster:(req,res) =>{
        getAllSlotMaster((err,results)=>{
            if(err){
                logger.logwindow(err)
                return res.status(400).json({
                    success:2,
                    message:'Error in fetching data'
                })
            };
            if(!results){
                return res.status(400).json({
                    success:3,
                    message:'No data found here!'
                })
            }
            return res.status(200).json({
                success:1,
                data:results
            })
        })
    },
    updateslotmaster:(req,res) =>{
        const body =req.body;
        updateslotmaster(body, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 2,
                    message: "error in updating data"
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Updated Data successfully"
            });
        })
    }
}
