const {
    createHighlightTypeService,
    getHighlightTypesService,
    getTodaySpecialItemsService,
    UpdateHighLightType
} = require('./highlight.service');

module.exports = {

    // CONTROLLER

    createHighlightType: (req, res) => {

        const body = req.body;

        createHighlightTypeService(body, (err, results) => {

            // MYSQL / SERVER ERROR
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: 'Internal Server Error',
                    error: err
                });
            }
            // DUPLICATE OR CUSTOM MESSAGE
            if (results.success === 0) {
                return res.status(200).json(results);
            }
            // SUCCESS
            return res.status(200).json(results);
        });
    },

    UpdateHighLightType: (req, res) => {
        const body = req.body;
        UpdateHighLightType(body, (err, results) => {

            // MYSQL / SERVER ERROR
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: 'Internal Server Error',
                    error: err
                });
            }
            // DUPLICATE OR CUSTOM MESSAGE
            if (results.success === 0) {
                return res.status(200).json(results);
            }
            // SUCCESS
            return res.status(200).json(results);
        });
    },

    getHighlightTypes: (req, res) => {

        getHighlightTypesService((err, results) => {

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