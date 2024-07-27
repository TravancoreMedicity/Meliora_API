
const { getEmployeeName, qiDeptAccessInsert, dptAccessView, DepartmentUpdate } = require('./dept_access.service')

module.exports = {
    getEmployeeName: (req, res) => {
        const id = req.params.id;
        getEmployeeName(id, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "Employee Not Found",
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },
    qiDeptAccessInsert: (req, res) => {
        const body = req.body;
        qiDeptAccessInsert(body, (err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                insertid: result.insertId,
                message: "Department Access Created"
            })
        })
    },

    dptAccessView: (req, res) => {
        dptAccessView((err, results) => {
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
}