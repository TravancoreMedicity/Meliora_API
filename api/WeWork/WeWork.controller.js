const logger = require('../../logger/logger')
const { getinpatientList, insertpatientsurv, InsertDailyActivity, getsurvslno,
    Insertsrvtable, getsurvslnointraction, getsurvslnoonly, getAsignedStaff, getdailyactivity,
    getintraction, updateActivity, updateIntraction, getwedetail, updateweDetail, selectsurvslno, selectsurlogslno } = require('../WeWork/WeWork.service')
const { validationsurvLog } = require('../../validation/validation_schema');
const { log } = require('winston');

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
        InsertDailyActivity(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "please sumbit patient survillence"
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Daily Activity inserted succesfully"
            });
        });
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
                    message: "pleade enter patient survillence before adding the details"
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
        getsurvslnointraction(body, (err, results) => {
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
                    message: "Add patient intarction after submit patient intaction"
                });
            }
            return res.status(200).json({
                success: 1,
                message: "patient intraction inserted successfully!"
            });
        });
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
    }
}