const { escmappingInsert, escMappingSelect, checkInservalue, updateEscalation } = require('../co_escalationmapping/escalationmapping.service');
const logger = require('../../logger/logger')

module.exports = {
    escmappingInsert: (req, res) => {
        const body = req.body;
        checkInservalue(body, (err, results) => {
            if (results.length === 0) {
                escmappingInsert(body, (err, results) => {
                    if (err) {
                        logger.logwindow(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        })
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Inserted Successfully"
                    });
                });
            } else {
                updateEscalation(body, (err, results) => {
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
                        message: "Updated Successfully"
                    });
                });
            }
        })
    },
    checkInservalue: (req, res) => {
        checkInservalue((err, results) => {
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
    escMappingSelect: (req, res) => {
        escMappingSelect((err, results) => {
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


}