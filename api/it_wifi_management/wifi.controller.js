
const { WifiInsert, WifiUpdate, wifiViewById, checkCodeNdGet, updateQrCode,
    getfreeCodes, getAllowttedWiFi
} = require('../it_wifi_management/wifi.services')
module.exports = {
    WifiInsert: (req, res) => {
        const body = req.body;
        WifiInsert(body, (err, result) => {

            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: " inserted successfully"
            })
        })
    },
    WifiUpdate: (req, res) => {
        const body = req.body;

        WifiUpdate(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No record found"

                })
            }
            return res.status(200).json({
                success: 2,
                message: "Updated successfully"
            })
        })
    },
    wifiViewById: (req, res) => {
        const id = req.params.id;
        wifiViewById(id, (err, results) => {

            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No Data"
                });
            }
            return res.status(200).json({
                success: 2,
                data: results
            });
        })
    },

    checkCodeNdGet: (req, res) => {
        const body = req.body;
        checkCodeNdGet(body, (err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (result.length === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No Data"
                });
            }
            return res.status(200).json({
                success: 2,
                data: result
            });
        })
    },

    updateQrCode: (req, res) => {
        const body = req.body;

        getfreeCodes((err, results) => {
            if (err) {
                // logger.logwindow(err)
                return res.status(400).json({
                    success: 10,
                    message: err
                });
            }
            if (results.length === 0) {
                // logger.infologwindow("No Results Found")
                return res.status(400).json({
                    success: 0,
                    message: "No Results Found"
                });
            }

            const freeCode = JSON.parse(JSON.stringify(results[0]))

            const updatedata = {
                it_wifi_ipno: body.it_wifi_ipno,
                it_wifi_flg: body.it_wifi_flg,
                it_wifi_qrslno: freeCode.it_wifi_qrslno
            }
            updateQrCode(updatedata, (err, results) => {
                if (err) {
                    return res.status(200).json({
                        success: 0,
                        message: err
                    })
                }
                if (results === 0) {
                    return res.status(200).json({
                        success: 1,
                        message: "No record found"

                    })
                }
                return res.status(200).json({
                    succes: 2,
                    message: "Updated successfully"
                })
            })

        });
    },

    getAllowttedWiFi: (req, res) => {
        getAllowttedWiFi((err, results) => {
            if (err) {
                // logger.logwindow(err)
                return res.status(400).json({
                    success: 10,
                    message: err
                });
            }
            if (results.length === 0) {
                // logger.infologwindow("No Results Found")
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
    }
}