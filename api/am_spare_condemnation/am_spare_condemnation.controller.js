
const { CondemnationList, ServiceList, pmDueOverList, AssetServiceList, getAssetCondemnationList, UpdateAssetCondemReport,
     UpdateSpareCondemReport } = require('../am_spare_condemnation/am_spare_condemnation.service')


module.exports = {
    
    CondemnationList: (req, res) => {
        const id = req.params.id;
        CondemnationList(id, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    getAssetCondemnationList: (req, res) => {
        const id = req.params.id;
        getAssetCondemnationList(id, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    ServiceList: (req, res) => {
        const id = req.params.id;
        ServiceList(id, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    pmDueOverList: (req, res) => {
        const id = req.params.id;
        pmDueOverList(id, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    AssetServiceList: (req, res) => {
        const id = req.params.id;
        AssetServiceList(id, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    submitCondemReport: async (req, res) => {
            const body = req.body;
            try {
                const assetData = body
                    .filter(item => item.am_item_map_slno)
                    .map(item => ({ am_item_map_slno: item.am_item_map_slno }));

                const spareData = body
                    .filter(item => item.am_spare_item_map_slno)
                    .map(item => ({ am_spare_item_map_slno: item.am_spare_item_map_slno }));

                if (assetData?.length > 0) {
                    for (let item of assetData) {
                        await UpdateAssetCondemReport(item);
                    }
                }

                if (spareData?.length > 0) {
                    for (let item of spareData) {
                        await UpdateSpareCondemReport(item);
                    }
                }

                return res.status(200).json({
                    success: 1,
                    message: "Data updated successfully"
                });

            } catch (err) {
                return res.status(500).json({
                    success: 0,
                    message: err.message
                });
            }
        },
}
