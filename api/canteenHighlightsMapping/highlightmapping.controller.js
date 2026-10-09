const {

    createItemHighlightService,
    getItemHighlightsService,
    updateItemHighlightService,
    deleteItemHighlightService,
    getTodaySpecialItemsService

} = require('./highlightmapping.service');

module.exports = {

    createItemHighlight: (req, res) => {

        const body = req.body;

        createItemHighlightService(body, (err, results) => {

            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: err
                });
            }

            return res.status(200).json({
                success: 1,
                message: "Highlight Added Successfully",
                data: results
            });
        });
    },

    getItemHighlights: (req, res) => {

        getItemHighlightsService((err, results) => {

            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: err
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    updateItemHighlight: (req, res) => {

        const body = req.body;

        updateItemHighlightService(body, (err, results) => {

            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: err
                });
            }

            return res.status(200).json({
                success: 1,
                message: "Highlight Updated Successfully",
                data: results
            });
        });
    },

    deleteItemHighlight: (req, res) => {

        const id = req.params.mapping_id;

        deleteItemHighlightService(id, (err, results) => {

            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: err
                });
            }

            return res.status(200).json({
                success: 1,
                message: "Highlight Deleted Successfully",
                data: results
            });
        });
    },

    getTodaySpecialItems: (req, res) => {

        getTodaySpecialItemsService((err, results) => {

            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: err
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    }

};