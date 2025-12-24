const { InsertStoremasterRights, getStoreReportViewRights, updateReportRightsView, StoreReportRights } = require('./store_master.service');
module.exports = {
    InsertStoremasterRights: (req, res) => {
        const body = req.body;
        InsertStoremasterRights(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Report Found",
                    dataCat: []
                })
            }
            return res.status(200).json({
                success: 1,
                dataCat: results
            })
        })
    },
    getStoreReportViewRights: (req, res) => {
        const body = req.body;
        getStoreReportViewRights(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Report Found",
                    dataCat: []
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },

    updateReportRightsView: (req, res) => {
        const body = req.body;
        updateReportRightsView(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Report Found",
                    dataCat: []
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },


    StoreReportRights: (req, res) => {
        const body = req.body;
        StoreReportRights(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            // if (Object.keys(results).length === 0) {
            //     return res.status(200).json({
            //         success: 2,
            //         message: "No Report Found",
            //         dataCat: []
            //     })
            // }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },


}

