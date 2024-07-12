const { taskMast, CreateTaskDetailInsert, InsertDueDate, getAssignedTask, AcceptTask, getRejectedTask, getprojectundergoal, getPendingAssignedTask, subtaskviewByidPending,
    getTaskunderProject, AskQuery, postDuedateCount, getDuedateCount, postCutoffPercentage, getCutoffPercentages, getQuery,
    TruncatePercentage, replyQuery, changEmpStatus, changeQueryStatus

} = require('./tmalldept.service')
module.exports = {


    TaskInsertAllDept: (req, res) => {
        const body = req.body;
        taskMast(body, (err, results,) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (results) {
                const postdata = {
                    tm_task_slno: results.insertId,
                    tm_duedate: body.tm_task_due_date,
                    create_user: body.create_user
                }
                InsertDueDate(postdata, (err, resl) => {
                    if (err) {
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    if (resl) {
                        const detailArray = body.employee.map((value) => {
                            return [results.insertId, value, 0, body.create_user]
                        })
                        CreateTaskDetailInsert(detailArray, (err, result) => {
                            if (err) {

                                return res.status(200).json({
                                    success: 0,
                                    message: err
                                });
                            }
                            else {

                                return res.status(200).json({
                                    success: 1,
                                    message: "Task created Under Section/s successfully",
                                    insertId: results.insertId,
                                });
                            }
                        })
                    }
                })

            }
        });
    },

    getAssignedTask: (req, res) => {
        const body = req.body;
        getAssignedTask(body, (err, results) => {
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


    getQuery: (req, res) => {
        const body = req.body;
        getQuery(body, (err, results) => {
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




    AcceptTask: (req, res) => {
        const body = req.body;
        AcceptTask(body, (err, results) => {
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
                message: "Task Accepted "
            })
        })
    },

    getRejectedTask: (req, res) => {
        getRejectedTask((err, results) => {

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


    getprojectundergoal: (req, res) => {
        const id = req.params.id;
        getprojectundergoal(id, (err, results) => {
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
    getDuedateCount: (req, res) => {
        const id = req.params.id;
        getDuedateCount(id, (err, results) => {
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
    getCutoffPercentages: (req, res) => {
        const id = req.params.id;
        getCutoffPercentages(id, (err, results) => {
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

    getTaskunderProject: (req, res) => {
        const id = req.params.id;
        getTaskunderProject(id, (err, results) => {
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
    getPendingAssignedTask: (req, res) => {
        getPendingAssignedTask((err, results) => {

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
    subtaskviewByidPending: (req, res) => {
        const id = req.params.id;
        subtaskviewByidPending(id, (err, results) => {
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
    AskQuery: (req, res) => {
        const body = req.body;
        AskQuery(body, (err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (result) {
                const postdata = {
                    tm_task_slno: body.tm_task_slno,
                    tm_assigne_emp: body.tm_query_remark_user,
                    tm_detail_status: 2,
                    tm_query_status: 1
                }
                changEmpStatus(postdata, (err, resl) => {
                    if (err) {
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Raised a Query Successfully",

                    })
                })
            }
        })
    },

    replyQuery: (req, res) => {
        const body = req.body;
        replyQuery(body, (err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (result) {
                const postdata = {
                    tm_task_slno: body.tm_task_slno,
                    tm_assigne_emp: body.tm_aasiigned_emplo,
                    tm_query_status: 2
                }
                changeQueryStatus(postdata, (err, resl) => {
                    if (err) {
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Replied Added",

                    })
                })
            }
        })
    },

    postDuedateCount: (req, res) => {
        const body = req.body;
        postDuedateCount(body, (err, result) => {
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
    postCutoffPercentage: (req, res) => {
        const body = req.body;
        postCutoffPercentage(body, (err, result) => {
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
    TruncatePercentage: async (req, res) => {
        const body = req.body;
        TruncatePercentage(body).then(results => {
            return res.status(200).json({
                succes: 1,
            });
        }).catch(err => {
            return res.status(200).json({
                succes: 0,
                messagee: "Error Occured "
            });
        })
    },

}