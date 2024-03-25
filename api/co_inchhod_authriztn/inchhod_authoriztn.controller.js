const { checkInsertVal, AuthoriztnInsertData, AuthorizationGets, AuthUpdateData,
    getDeptSeconId, getDeptSeconIncharge, getDeptSeconHod } = require("../co_inchhod_authriztn/inchod_authoriztn.service")
const logger = require('../../logger/logger')

module.exports = {
    AuthoriztnInsertData: (req, res) => {
        const body = req.body;
        checkInsertVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results));
            if (Object.keys(value).length === 0) {
                AuthoriztnInsertData(body, (err, result) => {
                    if (err) {
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Authorization Assign successfully"
                    })
                })
            }
            else {
                logger.infologwindow("Diet Name Already Exist")
                return res.status(200).json({
                    success: 7,
                    message: "Authorization Assigned selected deptsection"
                })
            }
        })
    },

    AuthorizationGets: (req, res) => {
        AuthorizationGets((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }
            if (!results) {
                return res.status(200).json({
                    success: 0,
                    message: "No results found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    AuthUpdateData: (req, res) => {
        const body = req.body;
        AuthUpdateData(body, (err, results) => {
            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (!results) {
                logger.infologwindow("Record Not Found")
                return res.status(400).json({
                    success: 1,
                    message: "Record Not Found"
                })
            }
            return res.status(200).json({
                success: 2,
                message: "Authorization Assigned Deleted "
            })
        })
    },

    getDeptSeconId: (req, res) => {
        const id = req.params.id;
        getDeptSeconId(id, (err, results) => {
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
                    message: "No Diet Plan under Selected Nursing Station"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    getDeptSeconIncharge: (req, res) => {
        const id = req.params.id;
        getDeptSeconIncharge(id, (err, results) => {
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
                    message: "No Department section"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    getDeptSeconHod: (req, res) => {
        const id = req.params.id;
        getDeptSeconHod(id, (err, results) => {
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
                    message: "No Diet Plan under Selected Nursing Station"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
}