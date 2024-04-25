const logger = require('../../logger/logger');
const { validateQiDepartment } = require('../../validation/validation_schema');
validateQiDepartment

const { qiDeptListInsert, DepartmentListView, DepartmentUpdate, getDepartmentActive } = require('./qi_dept.service')
module.exports = {
    qiDeptListInsert: (req, res) => {
        const body = req.body;
        const body_result = validateQiDepartment.validate(body);
        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        body.qi_dept_desc = body_result.value.qi_dept_desc;
        qiDeptListInsert(body, (err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                insertid: result.insertId,
                message: "Department Created"
            })
        })
    },
    DepartmentListView: (req, res) => {
        DepartmentListView((err, results) => {
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
    DepartmentUpdate: (req, res) => {
        const body = req.body;
        const body_result = validateQiDepartment.validate(body);
        if (body_result.error) {
            logger.warnlogwindow(body_result.error.details[0].message)
            return res.status(200).json({
                success: 7,
                message: body_result.error.details[0].message
            });
        }
        body.qi_dept_desc = body_result.value.qi_dept_desc;
        DepartmentUpdate(body, (err, results) => {
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

    getDepartmentActive: (req, res) => {
        getDepartmentActive((err, results) => {
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
