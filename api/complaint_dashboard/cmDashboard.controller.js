const logger = require('../../logger/logger');
const { getTotalcomplaints, getPendingcomplaints, getAssignedcomplaints,
    getOnholdcomplaints, getRectifycomplaints, getVerifycomplaints } = require('../complaint_dashboard/cmDashboard.service');
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
    getPendingcomplaints: (req, res) => {
        const id = req.params.id
        getPendingcomplaints(id, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success1: 2,
                    message: err
                });
            }
            if (!results) {
                logger.infologwindow("No Results Found")
                return res.status(200).json({
                    success1: 0,
                    message: "No Results Found"
                });
            }
            return res.status(200).json({
                success1: 1,
                data1: results
            });
        });
    },
    getAssignedcomplaints: (req, res) => {
        const id = req.params.id
        getAssignedcomplaints(id, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success2: 2,
                    message: err
                });
            }
            if (!results) {
                logger.infologwindow("No Results Found")
                return res.status(200).json({
                    success2: 0,
                    message: "No Results Found"
                });
            }
            return res.status(200).json({
                success2: 1,
                data2: results
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
                data3: results
            });
        });
    },
    getRectifycomplaints: (req, res) => {
        const id = req.params.id
        getRectifycomplaints(id, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success4: 2,
                    message: err
                });
            }
            if (!results) {
                logger.infologwindow("No Results Found")
                return res.status(200).json({
                    success4: 0,
                    message: "No Results Found"
                });
            }
            return res.status(200).json({
                success4: 1,
                data4: results
            });
        });
    },
    getVerifycomplaints: (req, res) => {
        const id = req.params.id
        console.log(id);
        getVerifycomplaints(id, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success5: 2,
                    message: err
                });
            }
            if (!results) {
                logger.infologwindow("No Results Found")
                return res.status(200).json({
                    success5: 0,
                    message: "No Results Found"
                });
            }
            return res.status(200).json({
                success5: 1,
                data5: results
            });
        });
    },

}