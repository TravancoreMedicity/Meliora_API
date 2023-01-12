const logger = require('../../logger/logger')

const { insertWeEmployee, getWeEmpMapping, updateWeEmployee, CheckinsertVal, getfloorbyEmp, getnursebyfloor } = require('../WeEmpMapping/WeEmpMapping.service')

module.exports = {
    insertWeEmployee: (req, res) => {

        const body = req.body;
        const body_result = ValidationEmpMappingNurStation.validate(body);
        if (body_result.error) {
            logger.warnlogwindow(body_result.error.details[0].message)
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        body.map_slno = body_result.value.map_slno
        CheckinsertVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                insertWeEmployee(body, (err, results) => {
                    if (err) {
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Data inserted successfully",
                    });
                })
            }
            else {
                logger.infologwindow("daily activity in this date is all ready added")
                return res.status(200).json({
                    success: 7,
                    message: "item code is all ready  added"
                })
            }


        })
        // insertWeEmployee(body, (err, results) => {
        //     if (err) {
        //         return res.status(200).json({
        //             success: 0,
        //             message: err
        //         });
        //     }
        //     if (results.length === 0) {
        //         return res.status(200).json({
        //             success: 2,
        //             message: "No Results Found"
        //         });
        //     }
        //     return res.status(200).json({
        //         success: 1,
        //         message: "Data inserted successfully",
        //     });
        // });
    },
    getWeEmpMapping: (req, res) => {
        getWeEmpMapping((err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }

            if (results.length == 0) {
                return res.status(200).json({
                    success: 0,
                    message: "No Result Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results,

            });
        });
    },
    updateWeEmployee: (req, res) => {
        const body = req.body;
        updateWeEmployee(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Results Found"
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Data updated successfully",
            });
        });
    },
    getfloorbyEmp: (req, res) => {
        const id = req.params.id
        getfloorbyEmp(id, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length == 0) {
                // logger.infologwindow("No Record Found")
                return res.status(200).json({
                    success: 2,
                    message: "no employee under this floor"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getnursebyfloor: (req, res) => {
        const id = req.params.id
        getnursebyfloor(id, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length == 0) {
                // logger.infologwindow("No Record Found")
                return res.status(200).json({
                    success: 2,
                    message: "no employee under this floor"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    }
}