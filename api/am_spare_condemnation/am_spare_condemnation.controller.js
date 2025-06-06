
const { CondemnationList, ServiceList, pmDueOverList, AssetServiceList, getAssetCondemnationList } = require('../am_spare_condemnation/am_spare_condemnation.service')
module.exports = {


    CondemnationList: (req, res) => {
        const id = req.params.id;
        CondemnationList(id, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: "No Data"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },


    getAssetCondemnationList: (req, res) => {
        const id = req.params.id;
        getAssetCondemnationList(id, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: "No Data"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },
    ServiceList: (req, res) => {
        const id = req.params.id;
        ServiceList(id, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: "No Data"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },
    pmDueOverList: (req, res) => {
        const id = req.params.id;
        pmDueOverList(id, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: "No Data"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },
    AssetServiceList: (req, res) => {
        const id = req.params.id;
        AssetServiceList(id, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: "No Data"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },
}
