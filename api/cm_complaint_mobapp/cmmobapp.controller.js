const logger = require('../../logger/logger');
const { getTotalNotAssigncomplaints, getComDetlcountEmp, getAssignListEmp, getAssistListEmp,
    getOnHoldListEmp, getOnProgressListEmp, getforVerifyListEmp, getCompleteListEmp,
    getAssignListDeptWise, getAssistListDeptWise, getOnHoldListDeptWise, getOnHoldBeforeAssigntDeptWise,
    getOnProgressListDeptWise,
    getforVerifyListDeptWise, getCompleteListDeptWiseToday

} = require('../cm_complaint_mobapp/cmmobapp.service');
module.exports = {
    getTotalNotAssigncomplaints: (req, res) => {
        const id = req.params.id
        getTotalNotAssigncomplaints(id, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
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

    getComDetlcountEmp: (req, res) => {
        const id = req.params.id

        getComDetlcountEmp(id, (err, results) => {
            if (err) {

                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    success: 0,
                    data: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        })

    },

    getAssignListEmp: (req, res) => {
        const id = req.params.id

        getAssignListEmp(id, (err, results) => {
            if (err) {

                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    success: 0,
                    data: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        })

    },

    getAssistListEmp: (req, res) => {
        const id = req.params.id

        getAssistListEmp(id, (err, results) => {
            if (err) {

                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    success: 0,
                    data: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        })

    },
    getOnHoldListEmp: (req, res) => {
        const id = req.params.id

        getOnHoldListEmp(id, (err, results) => {
            if (err) {

                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    success: 0,
                    data: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        })

    },
    getOnProgressListEmp: (req, res) => {
        const id = req.params.id

        getOnProgressListEmp(id, (err, results) => {
            if (err) {

                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    success: 0,
                    data: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        })

    },
    getforVerifyListEmp: (req, res) => {
        const id = req.params.id

        getforVerifyListEmp(id, (err, results) => {
            if (err) {

                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    success: 0,
                    data: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        })

    },
    getCompleteListEmp: (req, res) => {
        const id = req.params.id

        getCompleteListEmp(id, (err, results) => {
            if (err) {

                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    success: 0,
                    data: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        })

    },

    getAssignListDeptWise: (req, res) => {
        const id = req.params.id

        getAssignListDeptWise(id, (err, results) => {
            if (err) {

                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    success: 0,
                    data: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        })

    },
    getAssistListDeptWise: (req, res) => {
        const id = req.params.id

        getAssistListDeptWise(id, (err, results) => {
            if (err) {

                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    success: 0,
                    data: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        })

    },

    getOnHoldListDeptWise: (req, res) => {
        const id = req.params.id

        getOnHoldListDeptWise(id, (err, results) => {
            if (err) {

                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    success: 0,
                    data: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        })

    },

    getOnHoldBeforeAssigntDeptWise: (req, res) => {
        const id = req.params.id

        getOnHoldBeforeAssigntDeptWise(id, (err, results) => {
            if (err) {

                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    success: 0,
                    data: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        })

    },

    getOnProgressListDeptWise: (req, res) => {
        const id = req.params.id

        getOnProgressListDeptWise(id, (err, results) => {
            if (err) {

                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    success: 0,
                    data: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        })

    },

    getforVerifyListDeptWise: (req, res) => {
        const id = req.params.id

        getforVerifyListDeptWise(id, (err, results) => {
            if (err) {

                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    success: 0,
                    data: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        })

    },

    getCompleteListDeptWiseToday: (req, res) => {
        const id = req.params.id

        getCompleteListDeptWiseToday(id, (err, results) => {
            if (err) {

                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    success: 0,
                    data: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        })

    },
}