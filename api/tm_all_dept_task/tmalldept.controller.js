const { taskMast, CreateTaskDetailInsert, InsertDueDate, getAssignedTask, AcceptTask, getRejectedTask, getprojectundergoal, getPendingAssignedTask, subtaskviewByidPending,
    getTaskunderProject, AskQuery
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
        AskQuery(body, (err, results) => {
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
                message: "Raised a Query Successfully"
            })
        })
    },

}