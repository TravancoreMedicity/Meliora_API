const logger = require('../../logger/logger');
const { getTotalcomplaints, getComplaintcount, getAssistRectyEmpWise, getPendingOnholdEmpWise,
    getOnholdcomplaints, getTotalcomplaintsAllDpt, getOnholdcomplaintsAllDpt, getAllCompDeptwiseCount } = require('../complaint_dashboard/cmDashboard.service');
module.exports = {
    getTotalcomplaints: (req, res) => {
        const id = req.params.id
        getTotalcomplaints(id, (err, results) => {
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

    getOnholdcomplaints: (req, res) => {
        const id = req.params.id
        getOnholdcomplaints(id, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success3: 2,
                    message: err
                });
            }
            if (!results) {
                logger.infologwindow("No Results Found")
                return res.status(200).json({
                    success3: 0,
                    message: "No Results Found"
                });
            }
            return res.status(200).json({
                success3: 1,
                data: results
            });
        });
    },


    getComplaintcount: (req, res) => {
        const id = req.params.id

        getComplaintcount(id, (err, results) => {
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
    getAssistRectyEmpWise: (req, res) => {
        const id = req.params.id

        getAssistRectyEmpWise(id, (err, results) => {
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

    getPendingOnholdEmpWise: (req, res) => {
        const id = req.params.id
        getPendingOnholdEmpWise(id, (err, results) => {
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


    getTotalcomplaintsAllDpt: (req, res) => {
        getTotalcomplaintsAllDpt((err, results) => {
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

    getOnholdcomplaintsAllDpt: (req, res) => {
        getOnholdcomplaintsAllDpt((err, results) => {
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

    getAllCompDeptwiseCount: (req, res) => {
        const id = req.params.id

        getAllCompDeptwiseCount(id, (err, results) => {
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

}