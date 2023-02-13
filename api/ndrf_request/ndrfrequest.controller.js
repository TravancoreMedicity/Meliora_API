const { updateNdrfConvert, InsertNdrf, getNdrfList, checkInsertVal } = require('../ndrf_request/ndrfrequest.service')

module.exports = {
    InsertNdrf: (req, res) => {
        const body = req.body;
        console.log(body);

        checkInsertVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {

                InsertNdrf(body, (err, results) => {
                    if (err) {
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    updateNdrfConvert(body, (err, results) => {
                        if (err) {
                            // logger.logwindow(err)
                            return res.status(200).json({
                                success: 0,
                                message: err
                            });
                        }
                        if (!results) {
                            return res.status(400).json({
                                success: 2,
                                message: "Record Not Found"
                            })
                        }
                        return res.status(200).json({
                            success: 1,
                            message: "NDRF Created Successfully"
                        });
                    });
                });


            } else {
                return res.status(200).json({
                    success: 7,
                    message: "NDRF Allready Created "
                })
            }
        })

    },
    getNdrfList: (req, res) => {
        getNdrfList((err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }
            if (results.length === 0) {
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