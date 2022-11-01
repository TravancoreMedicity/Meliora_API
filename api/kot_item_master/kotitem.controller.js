const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { kotItemInsert, getKotitem, updatekotitem, checkInsertVal, checkUpdateVal } = require('../kot_item_master/kotitem.service')
const { validatekotitem } = require('../../validation/validation_schema')

module.exports = {
    kotItemInsert: (req, res) => {
        const body = req.body;
        //validate requesttype insertion function
        const body_result = validatekotitem.validate(body);
        if (body_result.error) {
            // logger.logwindow(body_result.error.details[0].message)
            // logger.warnlogwindow(body_result.error.details[0].message)
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        } body.item_name = body_result.value.item_name;
        checkInsertVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                kotItemInsert(body, (err, results) => {
                    if (err) {
                        // logger.logwindow(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        })
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "item group Inserted Successfully"
                    });
                });
            } else {
                // logger.infologwindow("item group allready exist")
                return res.status(200).json({
                    success: 2,
                    message: "item group allready exist"
                })
            }
        })
    },
    getKotitem: (req, res) => {
        getKotitem((err, results) => {
            if (err) {
                // logger.logwindow(err)
                return res.status(400).json({
                    success: 10,
                    message: err
                });
            }
            if (!results) {
                // logger.infologwindow("No Results Found")
                return res.status(400).json({
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
    updatekotitem: (req, res) => {
        const body = req.body;
        const body_result = validatekotitem.validate(body);
        if (body_result.error) {
            // logger.warnlogwindow(body_result.error.details[0].message)
            return res.status(200).json({
                success: 3,
                message: body_result.error.details[0].message
            });
        } body.item_name = body_result.value.item_name;
        checkUpdateVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                updatekotitem(body, (err, results) => {
                    if (err) {
                        // logger.logwindow(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    if (!results) {
                        // logger.infologwindow("Record Not Found")
                        return res.status(200).json({
                            success: 1,
                            message: "item group Updated Successfully"
                        });
                    }
                    return res.status(200).json({
                        success: 2,
                        message: "Record not found"
                    });
                });
            } else {
                // logger.infologwindow("Request Type  Already Exist")
                return res.status(200).json({
                    success: 7,
                    message: "item group  Already Exist"
                })
            }
        })
    },
}