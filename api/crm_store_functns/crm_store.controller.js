const { InsertPoDetailsLog, updatePOTable, getPORecivedList, InsertPoDetailsLogFully, updatePOTableFully,
    updatePOTableStoreReceive, SubstoreReciverdataUpdate, subStoreupdatePODeltTable, substoreupdatePOTable
} = require('../crm_store_functns/crm_store.service');

const logger = require('../../logger/logger');

module.exports = {


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
                    return res.status(200).json({
                        success: 1,
                        message: "Item recived deatils saved",
                    });
                });
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
                    return res.status(200).json({
                        success: 1,
                        message: "Item recived deatils saved",
                    });
                });

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

        });
    },
}

