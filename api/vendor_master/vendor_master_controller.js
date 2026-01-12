const logger = require('../../logger/logger')
const { InsertVendors, checkInsertVal, getVendor, updateVendors, inactiveRoomtype, getRoomoracle } = require('./vendor_master_service')
module.exports = {
    // InsertVendors: (req, res) => {
    //     const body = req.body;
    //     console.log("body:", body);

    //     //validate room type insertion function
    //     checkInsertVal(body, (err, results) => {
    //         const value = JSON.parse(JSON.stringify(results))
    //         if (Object.keys(value).length === 0) {
    //             InsertVendors(body, (err, results) => {
    //                 if (err) {
    //                     return res.status(200).json({
    //                         success: 0,
    //                         message: err
    //                     })
    //                 }
    //                 return res.status(200).json({
    //                     success: 1,
    //                     message: "Room Type Inserted Successfully"
    //                 });
    //             });
    //         } else {
    //             return res.status(200).json({
    //                 success: 7,
    //                 message: "Room Type Already Exist"
    //             })
    //         }
    //     })
    // },
    InsertVendors: (req, res) => {
        const body = req.body;
        // validate vendor insertion
        checkInsertVal(body, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: err
                });
            }

            // if no existing record found
            if (!results || results.length === 0) {
                InsertVendors(body, (err, results) => {
                    if (err) {
                        return res.status(500).json({
                            success: 0,
                            message: err
                        });
                    }

                    return res.status(201).json({
                        success: 1,
                        message: "Vendor inserted successfully"
                    });
                });
            }
            // already exists
            else {
                return res.status(409).json({
                    success: 0,
                    message: "Vendor already exists"
                });
            }
        });
    },

    getVendor: (req, res) => {
        getVendor((err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }
            if (!results) {
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
    updateVendors: (req, res) => {
        const body = req.body;
        updateVendors(body, (err, results) => {
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
                    success: 1,
                    message: "Record Not Found"
                });
            }
            return res.status(200).json({
                success: 2,
                message: "Room Type Updated Successfully"
            });
        });


    },
    inactiveRoomtype: (req, res) => {
        const id = req.params.id
        inactiveRoomtype(id, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }
            if (!results) {
                logger.infologwindow("No Results Found")
                return res.status(200).json({
                    success: 0,
                    message: "No Results Found"
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Room type Deleted Successfully"
            });
        });
    },
    getRoomoracle: (req, res) => {
        getRoomoracle((err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }
            if (!results) {
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
    }
}