const logger = require('../../logger/logger')
const { getinpatientList, insertpatientsurv, InsertDailyActivity, getsurvslno,
    Insertsrvtable, getsurvslnointraction, getsurvslnoonly, getAsignedStaff, getdailyactivity,
    getintraction, updateActivity, updateIntraction, checkinsertintra, getwedetail,
    updateweDetail, selectsurvslno, selectsurlogslno, getTotalAdmission } = require('../WeWork/WeWork.service')
const { validationsurvLog, validationdailyactivity, validationpatientIntraction } = require('../../validation/validation_schema');


module.exports = {
    getinpatientList: (req, res) => {
        const id = req.params.id;
        getinpatientList(id, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (results.length == 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Result Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    insertpatientsurv: (req, res) => {
        const body = req.body;
        insertpatientsurv(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    succs: 0,
                    messagee: err
                });
            }
            if (results.length === 0) {
                return res.status(200).json({
                    succs: 2,
                    messagee: "No Results Found"
                });
            }
            return res.status(200).json({
                succs: 1,
                messagee: "patient survillence inserted succesfully",
            });
        });
    },

    InsertDailyActivity: (req, res) => {
        const body = req.body;
        // const body_result = validationpatientIntraction.validate(body);
        // if (body_result.error) {
        //     // logger.logwindow(body_result.error.details[0].message)
        //     logger.warnlogwindow(body_result.error.details[0].message)
        //     return res.status(200).json({
        //         success: 2,
        //         message: body_result.error.details[0].message
        //     });
        // }
        // body.srv_slno = body_result.value.srv_slno;
        // checkInsertVal(body, (err, results) => {
        //     const value = JSON.parse(JSON.stringify(results))
        //     if (Object.keys(value).length === 0) {
        InsertDailyActivity(body, (err, results) => {
            const id = results.insertId
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Daily Activity inserted succesfully"
            });
        });
        // } else {
        //     logger.infologwindow("daily activity in this date is all ready added")
        //     return res.status(200).json({
        //         success: 7,
        //         message: "daily activity in this date is all ready added"
        //     })
        // }
        // })
    },
    getsurvslno: (req, res) => {
        const id = req.params.id;
        getsurvslno(id, (err, results) => {
            const idip = results.insertId
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (results.length == 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Result Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results,
                insertId: idip
            });
        });
    },
    getsurvslnoonly: (req, res) => {
        const id = req.params.id;
        getsurvslnoonly(id, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (results.length == 0) {
                return res.status(200).json({
                    success: 2,
                    message: "please enter patient survillence before adding the details"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results,

            });
        });
    },

    Insertsrvtable: (req, res) => {
        const body = req.body;
        Insertsrvtable(body, (err, results) => {
            const id = results.insertId
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
                insertId: id
            });
        });
    },
    getsurvslnointraction: (req, res) => {
        const body = req.body;
        const body_result = validationpatientIntraction.validate(body);
        if (body_result.error) {
            // logger.logwindow(body_result.error.details[0].message)
            logger.warnlogwindow(body_result.error.details[0].message)
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        body.srv_slno = body_result.value.srv_slno;
        checkinsertintra(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                getsurvslnointraction(body, (err, results) => {
                    const id = results.insertId
                    if (err) {
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "patient intraction inserted successfully!"
                    });
                })
            } else {
                logger.infologwindow("daily activity in this date is all ready added")
                return res.status(200).json({
                    success: 7,
                    message: "Intraction in this date is all ready added"
                })
            }

        })
    },
    getAsignedStaff: (req, res) => {
        const id = req.params.id;
        getAsignedStaff(id, (err, results) => {
            if (err) {
                // logger.logwindow(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length == 0) {
                // logger.infologwindow("No Record Found")
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
    getdailyactivity: (req, res) => {
        const id = req.params.id
        getdailyactivity(id, (err, results) => {
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
                    message: "please add activity details"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getintraction: (req, res) => {
        const id = req.params.id
        getintraction(id, (err, results) => {
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
                    message: "please add patient intraction"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    updateActivity: (req, res) => {
        const body = req.body;
        updateActivity(body, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (!results) {
                logger.infologwindow("Record Not Found")
                return res.status(200).json({
                    success: 1,
                    message: "Record Not Found"
                });
            }
            return res.status(200).json({
                success: 2,
                message: "Daily Activity Updated succesfully"
            });
        });

    },
    updateIntraction: (req, res) => {
        const body = req.body;
        updateIntraction(body, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (!results) {
                logger.infologwindow("Record Not Found")
                return res.status(200).json({
                    success: 1,
                    message: "Record Not Found"
                });
            }
            return res.status(200).json({
                success: 2,
                message: "Patient Intraction Updated succesfully"
            });
        });

    },
    getwedetail: (req, res) => {
        const body = req.body;
        getwedetail(body, (err, results) => {
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
                    message: "result not found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    updateweDetail: (req, res) => {
        const body = req.body;
        updateweDetail(body, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (!results) {
                logger.infologwindow("Record Not Found")
                return res.status(200).json({
                    success: 1,
                    message: "Record Not Found"
                });
            }
            return res.status(200).json({
                success: 2,
                message: "Patient Survillence Updated succesfully"
            });
        });

    },
    selectsurvslno: (req, res) => {
        const body = req.body;
        selectsurvslno(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (results.length == 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Result Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results,

            });
        });
    },
    selectsurlogslno: (req, res) => {
        const body = req.body;
        selectsurlogslno(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (results.length == 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Result Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results,

            });
        });
    },
    getTotalAdmission: (req, res) => {
        getTotalAdmission((err, results) => {
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
    }
}