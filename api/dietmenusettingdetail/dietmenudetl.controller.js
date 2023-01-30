const logger = require('../../logger/logger')
const { getItemmaster, dietmenudtlInsert, dietmenusettingInsert, dietmenudtlSelect, updatedietmenusettingdtl,
    updatedietmenusetting, dmenuInsert, checkInsertVal, getItemmasterExtra, getItemRate } = require("../dietmenusettingdetail/dietmenudetl.service")
module.exports = {
    dietmenusettingInsert: (req, res) => {
        const body = req.body
        var diet = body.map((value, index) => {
            return [value.dmenu_slno, value.grp_slno, value.item_slno, value.type_slno,
            value.days, value.qty, value.unit, value.rate_hos, value.rate_cant, value.em_id, value.status]
        })
        dietmenudtlInsert(diet, (err, results) => {
            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Data Inserted Successfully"
            })
        })
    },
    dietmenudtlSelect: (req, res) => {
        dietmenudtlSelect((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }
            if (!results) {
                return res.status(200).json({
                    success: 0,
                    message: "No Data"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results,
            });
        });
    },
    getItemmasterExtra: (req, res) => {
        getItemmasterExtra((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }
            if (!results) {
                return res.status(200).json({
                    success: 0,
                    message: "No Data"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results,
            });
        });
    },
    getItemmaster: (req, res) => {
        const id = req.params.id;
        getItemmaster(id, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length == 0) {
                logger.infologwindow("No Records Found")
                return res.status(200).json({
                    success: 0,
                    message: "No Records Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getItemRate: (req, res) => {
        const id = req.params.id;
        getItemRate(id, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length == 0) {
                logger.infologwindow("No Records Found")
                return res.status(200).json({
                    success: 0,
                    message: "No Records Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    updatedietmenusettingdtl: (req, res) => {
        const body = req.body

        updatedietmenusetting(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: "No Results Found"
                });
            }
            updatedietmenusettingdtl(body, (err, results) => {
                if (err) {
                    return res.status(200).json({
                        success: 0,
                        message: err
                    });
                }
                if (!results) {
                    return res.status(200).json({
                        success: 2,
                        message: "No Results Found"
                    });
                }
            })
            return res.status(200).json({
                success: 1,
                message: "Updated Successfully"
            });
        });
    },
    dmenuInsert: (req, res) => {
        const body = req.body;
        //validate complaintdept Insert function
        // const body_result = validateComplaintRegist.validate(body);
        // if (body_result.error) {
        //     return res.status(200).json({
        //         success: 2,
        //         message: body_result.error.details[0].message
        //     });
        // }
        //let body.complaint_dept_name=body_result
        // body.complaint_dept_name = body_result.value.complaint_dept_name;
        checkInsertVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                dmenuInsert(body, (err, results) => {
                    const id = results.insertId
                    if (err) {
                        logger.logwindow(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        })
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Diet Menu Inserted Successfully",
                        insetid: id
                    });
                });
            }
            else {

                logger.infologwindow("Complaint Department Already Exist")
                return res.status(200).json({
                    success: 5,
                    data: results
                })
            }
        })
    },





}