const { CreateTaskInsert, CreateTaskDetailInsert, CreateTaskView, CreateSubTaskInsert, CreateTaskSubTaskDetailInsert, SubTaskviewByid, MasterTaskviewBySecid,
    MasterEmpByid, UpdateMasterTask, UpdateSubTask, SubtaskviewByidForEdit, employeeInactive, updateSubTaskDetail, MasterTaskviewByidForEdit, DeptSearch,
    GoalView, ProjectInsert, ProjectView, ProjectUpdate, GoalDeptInsert, GoalDeptView, GoalDeptUpdate,
    ProjectDeptView, GoalDeptSearch, ProjectDeptSearch } = require('../tm_task_management/taskmanagement.service')

const logger = require('../../logger/logger');
module.exports = {

    CreateTaskInsert: (req, res) => {
        const body = req.body;
        CreateTaskInsert(body, (err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Task Created successfully",
                insertId: result.insertId,
            })
        })
    },

    CreateTaskDetailInsert: (req, res) => {
        const body = req.body;
        const data = body && body.map((val) => {
            return [val.tm_task_slno,
            val.tm_assigne_emp,
            val.tm_detail_status,
            val.tm_detl_create

            ]
        })

        CreateTaskDetailInsert(data, (err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,

            })
        })
    },

    CreateTaskView: (req, res) => {
        CreateTaskView((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No Records"
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })
        })
    },

    DeptSearch: (req, res) => {
        const body = req.body;
        DeptSearch(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results.length === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No Records"
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })
        })
    },

    GoalDeptSearch: (req, res) => {
        const body = req.body;
        GoalDeptSearch(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results.length === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No Records"
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })
        })
    },


    ProjectDeptSearch: (req, res) => {
        const body = req.body;
        ProjectDeptSearch(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results.length === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No Records"
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })
        })
    },


    CreateSubTaskInsert: (req, res) => {
        const body = req.body;


        CreateSubTaskInsert(body, (err, result) => {

            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            return res.status(200).json({
                success: 1,
                message: "Subtask Created successfully",
                insertId: result.insertId,

            })
        })
    },

    CreateTaskSubTaskDetailInsert: (req, res) => {

        const body = req.body;

        const data = body && body.map((val) => {
            return [val.tm_task_slno,
            val.tm_assigne_emp,
            val.tm_detail_status,
            val.tm_detl_create
            ]
        })

        CreateTaskSubTaskDetailInsert(data, (err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Employee assign Updated successfully"

            })
        })
    },
    MasterTaskviewBySecid: (req, res) => {

        const id = req.params.id;
        MasterTaskviewBySecid(id, (err, results) => {

            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (!results) {
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

    SubTaskviewByid: (req, res) => {

        const id = req.params.id;
        SubTaskviewByid(id, (err, results) => {

            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (!results) {
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


    MasterEmpByid: (req, res) => {

        const id = req.params.id;
        MasterEmpByid(id, (err, results) => {

            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (!results) {
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

    UpdateMasterTask: (req, res) => {
        const body = req.body;
        UpdateMasterTask(body, (err, results) => {
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
                message: "Task Updated successfully"
            })
        })
    },
    UpdateSubTask: (req, res) => {
        const body = req.body;
        UpdateSubTask(body, (err, results) => {
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
                message: "Subtask Updated successfully"
            })
        })
    },
    SubtaskviewByidForEdit: (req, res) => {

        const id = req.params.id;
        SubtaskviewByidForEdit(id, (err, results) => {

            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (!results) {
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

    MasterTaskviewByidForEdit: (req, res) => {

        const id = req.params.id;

        MasterTaskviewByidForEdit(id, (err, results) => {

            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (!results) {
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

    updateSubTaskDetail: (req, res) => {
        const body = req.body;
        updateSubTaskDetail(body, (err, results) => {
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
                message: "Task Updated successfully"
            })
        })
    },
    employeeInactive: async (req, res) => {
        const body = req.body;
        employeeInactive(body).then(results => {
            return res.status(200).json({
                succes: 1,
                messagee: 'Update Successfully'
            });
        }).catch(err => {
            return res.status(200).json({
                succes: 0,
                messagee: "Error Occured , Please Contact HRD / IT"
            });
        })
    },

    GoalView: (req, res) => {
        GoalView((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No Records"
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })
        })
    },

    ProjectInsert: (req, res) => {
        const body = req.body;
        ProjectInsert(body, (err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Project Created successfully",
                insertId: result.insertId,
            })
        })
    },
    ProjectView: (req, res) => {
        ProjectView((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No Records"
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })
        })
    },

    ProjectUpdate: (req, res) => {
        const body = req.body;
        ProjectUpdate(body, (err, results) => {
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
                message: "Project Updated successfully"
            })
        })
    },

    GoalDeptInsert: (req, res) => {
        const body = req.body;
        GoalDeptInsert(body, (err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Goal Created successfully",
                insertId: result.insertId,
            })
        })
    },

    GoalDeptView: (req, res) => {

        const id = req.params.id;
        GoalDeptView(id, (err, results) => {

            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (!results) {
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

    GoalDeptUpdate: (req, res) => {
        const body = req.body;
        GoalDeptUpdate(body, (err, results) => {
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
                message: "Goals Updated successfully"
            })
        })
    },



    ProjectDeptView: (req, res) => {

        const id = req.params.id;
        ProjectDeptView(id, (err, results) => {

            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (!results) {
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

}

