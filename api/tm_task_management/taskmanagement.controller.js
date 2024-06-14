const { CreateTaskInsert, CreateTaskDetailInsert, CreateTaskView, CreateSubTaskInsert, CreateTaskSubTaskDetailInsert, SubTaskviewByid, MasterTaskviewBySecid,
    MasterEmpByid, UpdateMasterTask, UpdateSubTask, SubtaskviewByidForEdit, employeeInactive, updateSubTaskDetail, MasterTaskviewByidForEdit, DeptSearch,
    ProjectInsert, ProjectView, ProjectUpdate, GoalDeptInsert, GoalDeptUpdate, ProgressInsert, ProgressView, ProgressUpdate,
    ProjectDeptView, GoalDeptSearch, ProjectDeptSearch, SubProgressView, taskStatusUpdate, SearchProjectAndEmployee, GetTaskSlno,
    UpdateStatus, InsertDueDate, getCurrentDueDate, getAllDueDates, AllTaskListProjectz, getDeptGoals, getDeptProjects, subtaskUnderdepSec,
    getAllGoals } = require('../tm_task_management/taskmanagement.service')

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
            const postdata = {
                tm_task_slno: result.insertId,
                tm_duedate: body.tm_task_due_date,
                create_user: body.create_user
            }
            InsertDueDate(postdata, (err, results) => {
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
            const postdata = {
                tm_task_slno: result.insertId,
                tm_duedate: body.tm_task_due_date,
                create_user: body.create_user
            }
            InsertDueDate(postdata, (err, results) => {
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



    UpdateSubTask: (req, res) => {
        const body = req.body;
        UpdateSubTask(body, (err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (body.tm_task_status === 1 || body.tm_task_status === 2) {
                const id = body.main_task_slno
                GetTaskSlno(id, (err, results) => {
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
                    const status = JSON.parse(JSON.stringify(results[0])).tm_task_status
                    if (status === 0) {
                        const updateDta = {
                            tm_task_slno: body.main_task_slno
                        }
                        UpdateStatus(updateDta, (err, results) => {
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

                            const { tm_task_due_date, tm_task_slno, edit_user } = body
                            const id = tm_task_slno
                            getCurrentDueDate(id, (err, results) => {
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
                                const duedate = results[0].tm_task_due_date
                                if (tm_task_due_date === duedate) {
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
                                }
                                else {
                                    const updateDta = {
                                        tm_task_slno: tm_task_slno,
                                        tm_duedate: tm_task_due_date,
                                        create_user: edit_user
                                    }
                                    InsertDueDate(updateDta, (err, result) => {
                                        if (err) {
                                            return res.status(200).json({
                                                success: 0,
                                                message: err
                                            });
                                        }
                                        if (results === 0) {
                                            return res.status(200).json({
                                                success: 1,
                                                message: "No record found"
                                            })
                                        }
                                    })
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


                                }
                            })

                        })
                    }
                    else {
                        const { tm_task_due_date, tm_task_slno, edit_user } = body
                        const id = tm_task_slno
                        getCurrentDueDate(id, (err, results) => {
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
                            const duedate = results[0].tm_task_due_date
                            if (tm_task_due_date === duedate) {
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
                            }
                            else {
                                const updateDta = {
                                    tm_task_slno: tm_task_slno,
                                    tm_duedate: tm_task_due_date,
                                    create_user: edit_user
                                }
                                InsertDueDate(updateDta, (err, result) => {
                                    if (err) {
                                        return res.status(200).json({
                                            success: 0,
                                            message: err
                                        });
                                    }
                                    if (results === 0) {
                                        return res.status(200).json({
                                            success: 1,
                                            message: "No record found"
                                        })
                                    }
                                })
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
                            }
                        })
                    }
                })
            }
            else {
                const { tm_task_due_date, tm_task_slno, edit_user } = body
                const id = tm_task_slno
                getCurrentDueDate(id, (err, results) => {
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
                    const duedate = results[0].tm_task_due_date
                    if (tm_task_due_date === duedate) {
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
                    }
                    else {
                        const updateDta = {
                            tm_task_slno: tm_task_slno,
                            tm_duedate: tm_task_due_date,
                            create_user: edit_user
                        }
                        InsertDueDate(updateDta, (err, result) => {
                            if (err) {
                                return res.status(200).json({
                                    success: 0,
                                    message: err
                                });
                            }
                            if (results === 0) {
                                return res.status(200).json({
                                    success: 1,
                                    message: "No record found"
                                })
                            }
                        })
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


                    }
                })
            }
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

    ProgressInsert: (req, res) => {
        const body = req.body;
        ProgressInsert(body, (err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (body.main_task_slno === null) {
                taskStatusUpdate(body, (err, results) => {
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
                        success: 1,
                    })
                })
            }
            else {
                const id = body.main_task_slno
                GetTaskSlno(id, (err, results) => {
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
                    const status = JSON.parse(JSON.stringify(results[0])).tm_task_status
                    if (status === 0) {
                        const updateDta = {
                            tm_task_slno: body.main_task_slno
                        }
                        UpdateStatus(updateDta, (err, results) => {
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
                            taskStatusUpdate(body, (err, results) => {
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
                                    success: 1,
                                    message: "Task Progress Added",
                                })
                            })

                        })
                    }
                    else {
                        taskStatusUpdate(body, (err, results) => {
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
                                success: 1,
                                message: "Task Progress Added",
                            })
                        })
                    }
                })
            }

        })
    },

    ProgressView: (req, res) => {
        const body = req.body;
        ProgressView(body, (err, results) => {
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
    SubProgressView: (req, res) => {
        const body = req.body;
        SubProgressView(body, (err, results) => {
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
    ProgressUpdate: (req, res) => {
        const body = req.body;
        ProgressUpdate(body, (err, results) => {
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
                message: "Task Progress Updated "
            })
        })
    },

    SearchProjectAndEmployee: (req, res) => {
        const body = req.body;
        SearchProjectAndEmployee(body, (err, results) => {
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

    UpdateMasterTask: (req, res) => {
        const body = req.body;
        const { tm_task_due_date, tm_task_slno, edit_user } = body
        const id = tm_task_slno
        getCurrentDueDate(id, (err, results) => {
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
            const duedate = results[0].tm_task_due_date
            if (tm_task_due_date === duedate) {
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
            }
            else {
                const updateDta = {
                    tm_task_slno: tm_task_slno,
                    tm_duedate: tm_task_due_date,
                    create_user: edit_user
                }
                InsertDueDate(updateDta, (err, result) => {
                    if (err) {
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    if (results === 0) {
                        return res.status(200).json({
                            success: 1,
                            message: "No record found"
                        })
                    }
                })
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


            }
        })

    },

    getAllDueDates: (req, res) => {
        const id = req.params.id;
        getAllDueDates(id, (err, results) => {
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

    AllTaskListProjectz: (req, res) => {
        const body = req.body;
        AllTaskListProjectz(body, (err, results) => {
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


    getAllGoals: (req, res) => {
        getAllGoals((err, results) => {
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

    getDeptGoals: (req, res) => {
        const id = req.params.id;
        getDeptGoals(id, (err, results) => {
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

    getDeptProjects: (req, res) => {
        const id = req.params.id;
        getDeptProjects(id, (err, results) => {
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


    subtaskUnderdepSec: (req, res) => {
        const body = req.body;
        subtaskUnderdepSec(body, (err, results) => {
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

}

