const logger = require('../../logger/logger');
const { validateQiTypeList } = require('../../validation/validation_schema');
const { qiTypeListInsert, QITypeView, QITypeUpdate, getQITypeActive } = require('./list_type.service')
module.exports = {
    qiTypeListInsert: (req, res) => {
        const body = req.body;
        const body_result = validateQiTypeList.validate(body);
        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        body.qi_list_type_name = body_result.value.qi_list_type_name;
        qiTypeListInsert(body, (err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                insertid: result.insertId,
                message: "QI Type Created"
            })
        })
    },
    QITypeView: (req, res) => {
        QITypeView((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Data Found",
                    data: []
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },
    QITypeUpdate: (req, res) => {
        const body = req.body;
        const body_result = validateQiTypeList.validate(body);
        if (body_result.error) {
            logger.warnlogwindow(body_result.error.details[0].message)
            return res.status(200).json({
                success: 7,
                message: body_result.error.details[0].message
            });
        }
        body.qi_list_type_name = body_result.value.qi_list_type_name;
        QITypeUpdate(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Record Found"
                })
            }
            return res.status(200).json({
                success: 1,
                message: "Updated Successfully"
            })
        })
    },

    getQITypeActive: (req, res) => {
        getQITypeActive((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Data Found",
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },

}
