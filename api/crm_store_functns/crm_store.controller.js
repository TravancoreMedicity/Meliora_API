const { InsertPoDetailsLog, updatePOTable, getPORecivedList, InsertPoDetailsLogFully, updatePOTableFully,
    updatePOTableStoreReceive, SubstoreReciverdataUpdate, subStoreupdatePODeltTable, substoreupdatePOTable,
    getCRSStorePending, getCrsReceiceAllList, getPOCompleteCheck, getPOListSubStorewisePend, getPOListSubStorewiseAllList
} = require('../crm_store_functns/crm_store.service');

const logger = require('../../logger/logger');

module.exports = {

    getCRSStorePending: (req, res) => {
        getCRSStorePending((err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }
            if (results.length === 0) {
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

    getCrsReceiceAllList: (req, res) => {
        getCrsReceiceAllList((err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }
            if (results.length === 0) {
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
    getPORecivedList: (req, res) => {
        const id = req.params.id
        getPORecivedList(id, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 2,
                    message: err
                });
            }
            if (results.length === 0) {
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

    InsertPoDetailsLog: (req, res) => {
        const body = req.body;

        InsertPoDetailsLog(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            updatePOTable(body, (err, results) => {
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
                        success: 2,
                        message: "Record Not Found"
                    });
                }
                return res.status(200).json({
                    success: 1,
                    message: "Item recived deatils saved",
                });
            });

        });
    },
    InsertPoDetailsLogFully: (req, res) => {
        const body = req.body;

        InsertPoDetailsLogFully(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            updatePOTableFully(body, (err, results) => {
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
                        success: 2,
                        message: "Record Not Found"
                    });
                }
                id = req.body.req_slno
                getPOCompleteCheck(id, (err, results) => {
                    if (err) {
                        logger.logwindow(err)
                        return res.status(400).json({
                            success: 2,
                            message: err
                        });
                    }
                    if (results.length === 0) {
                        updatePOTableStoreReceive(body, (err, results) => {
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
                                    success: 2,
                                    message: "Record Not Found"
                                });
                            }

                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Item recived deatils saved",
                    });
                });
            });

        });
    },
    getPOListSubStorewisePend: (req, res) => {
        const id = req.params.id
        getPOListSubStorewisePend(id, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 2,
                    message: err
                });
            }
            if (results.length === 0) {
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
    getPOListSubStorewiseAllList: (req, res) => {
        const id = req.params.id
        getPOListSubStorewiseAllList(id, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 2,
                    message: err
                });
            }
            if (results.length === 0) {
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

    SubstoreReciverdataUpdate: (req, res) => {
        const body = req.body;

        SubstoreReciverdataUpdate(body, (err, results) => {
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
                    success: 2,
                    message: "Record Not Found"
                });
            }

            if (req.body.fully === 1) {
                subStoreupdatePODeltTable(body, (err, results) => {
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
                            success: 2,
                            message: "Record Not Found"
                        });
                    }
                    substoreupdatePOTable(body, (err, results) => {

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
                                success: 2,
                                message: "Record Not Found"
                            });
                        }
                        return res.status(200).json({
                            success: 1,
                            message: "Item recived deatils saved",
                        });
                    });
                });
            } else {
                return res.status(200).json({
                    success: 1,
                    message: "Item recived deatils saved",
                });
            }


        });
    },
}

