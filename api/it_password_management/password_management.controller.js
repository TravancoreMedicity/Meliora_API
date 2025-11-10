const { getAssetData, PasswordMasterInsert, PasswordMasterView, PasswordDetailInsert, PasswordDetailviewByid,
    CheckAssetInsert, PasswordMasterUpdate, PasswordDetailUpdate, PasswordSoftwareInsert,
    PasswordSoftwareView, PasswordSoftwareUpdate } = require('../it_password_management/password_management.service')
const logger = require('../../logger/logger')
module.exports = {

    getAssetData: (req, res) => {
        const body = req.body;
        getAssetData(body, (err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                data: result
            })
        })
    },

    PasswordMasterInsert: (req, res) => {
        const body = req.body;
        CheckAssetInsert(body, (err, result) => {
            const value = JSON.parse(JSON.stringify(result));
            if (Object.keys(value).length === 0) {
                PasswordMasterInsert(body, (err, result) => {

                    if (err) {
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }

                    return res.status(200).json({
                        success: 1,
                        message: "Data inserted successfully",
                        insertId: result.insertId,


                    })


                })

            }
            else {
                logger.infologwindow("Asset details  Already Exist")
                return res.status(200).json({
                    success: 3,
                    message: "Asset details  Already Exist"
                })
            }
        })

    },
    PasswordMasterView: (req, res) => {
        PasswordMasterView((err, results) => {
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



    PasswordDetailInsert: (req, res) => {
        const body = req.body;
        const data = body && body.map((val) => {
            return [val.pswd_detail_mast_slno,
            val.psw_detail_credintial,
            val.pswd_detail_description,
            val.psw_detail_username,
            val.psw_detail_password,
            val.psw_detail_port,
            val.psw_detail_ip_num,
            val.psw_detail_remarks,
            val.create_user
            ]
        })
        PasswordDetailInsert(data, (err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Data inserted successfully"
            })
        })
    },

    PasswordDetailviewByid: (req, res) => {

        const id = req.params.id;
        PasswordDetailviewByid(id, (err, results) => {

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

    PasswordMasterUpdate: (req, res) => {
        const body = req.body;

        PasswordMasterUpdate(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No record found"

                })
            }
            return res.status(200).json({
                success: 2,
                message: "Data Updated successfully"
            })
        })
    },

    PasswordDetailUpdate: async (req, res) => {
        const body = req.body;
        PasswordDetailUpdate(body).then(results => {
            return res.status(200).json({
                succes: 1,
                messagee: 'Data Updated successfully'
            });
        }).catch(err => {
            return res.status(200).json({
                succes: 0,
                messagee: "Error Occured"
            });
        })
    },


    PasswordSoftwareInsert: (req, res) => {
        const body = req.body;
        PasswordSoftwareInsert(body, (err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Data inserted successfully"
            })
        })
    },
    PasswordSoftwareView: (req, res) => {

        PasswordSoftwareView((err, results) => {
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
    PasswordSoftwareUpdate: (req, res) => {
        const body = req.body;
        PasswordSoftwareUpdate(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No record found"

                })
            }
            return res.status(200).json({
                success: 2,
                message: "Data Updated successfully"
            })
        })
    },



}