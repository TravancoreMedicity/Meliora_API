const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { itemgroupInsert, getItemgroup, updateItemgrp, checkInsertVal, checkUpdateVal, getItemgrpname } = require('../item_group/itemgroup.service');
const { validateitemgroup } = require('../../validation/validation_schema')
const logger = require('../../logger/logger')
module.exports = {
    itemgroupInsert: (req, res) => {
        const body = req.body;
        //validate requesttype insertion function
        const body_result = validateitemgroup.validate(body);
        if (body_result.error) {
            // logger.logwindow(body_result.error.details[0].message)
            // logger.warnlogwindow(body_result.error.details[0].message)
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        body.group_name = body_result.value.group_name;
        checkInsertVal(body, (err, results) => {
            //     const value = JSON.parse(JSON.stringify(results))
            //     if (Object.keys(value).length === 0) {
            itemgroupInsert(body, (err, results) => {
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
            // } else {
            //     // logger.infologwindow("item group allready exist")
            //     return res.status(200).json({
            //         success: 7,
            //         message: "item group allready exist"
            //     })
            // }
        })
    },
    getItemgroup: (req, res) => {
        getItemgroup((err, results) => {
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
    updateItemgrp: (req, res) => {
        const body = req.body;

        const body_result = validateitemgroup.validate(body);
        if (body_result.error) {
            // logger.warnlogwindow(body_result.error.details[0].message)
            return res.status(200).json({
                success: 3,
                message: body_result.error.details[0].message
            });
        }
        body.group_name = body_result.value.group_name;
        // checkUpdateVal(body, (err, results) => {
        //     // const value = JSON.parse(JSON.stringify(results))
        //     if (Object.keys(value).length === 0) {
        updateItemgrp(body, (err, results) => {
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
                message: "Item Group Updated Successfully"
            });
        });
        //     } else {
        //         // logger.infologwindow("Request Type  Already Exist")
        //         return res.status(200).json({
        //             success: 7,
        //             message: "item group  Already Exist"
        //         })
        //     }
        // })
    },
    getItemgrpname: (req, res) => {
        getItemgrpname((err, results) => {
            if (err) {
                // logger.errorLogger(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }

            if (!results) {
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

