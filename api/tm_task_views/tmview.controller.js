const { ViewOverDueToday, ViewOverDueNextWeek, ViewOverDueNextMonth, EmployeeOnProgress, EmployeeCompleted, EmployeeAllTask, EmployeeOnHold,
    EmployeeInCompleted, EmployeeOverDue, DepartmentOnProgress, DepartmentCompleted, DepartmentInCompleted, DepartmentOverDue, EmployeeName, EmployeeOnPending,
    ProjectOnProgress, ProjectCompleted, ProjectOverDue, GoalsOnProgress, GoalsCompleted, DepartmentOnHold, DepartmentPending, ViewAllEmployeeTask,
    GoalsOverDue, ProjectInCompleted, GoalsInCompleted } = require('../tm_task_views/tmview.service')
module.exports = {

    ViewOverDueToday: (req, res) => {
        const id = req.params.id;
        ViewOverDueToday(id, (err, results) => {

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

    ViewOverDueNextWeek: (req, res) => {
        const id = req.params.id;
        ViewOverDueNextWeek(id, (err, results) => {

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

    ViewOverDueNextMonth: (req, res) => {
        const id = req.params.id;
        ViewOverDueNextMonth(id, (err, results) => {

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

    EmployeeOnProgress: (req, res) => {
        const id = req.params.id;
        EmployeeOnProgress(id, (err, results) => {

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

    EmployeeOnPending: (req, res) => {
        const id = req.params.id;
        EmployeeOnPending(id, (err, results) => {

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

    EmployeeOnHold: (req, res) => {
        const id = req.params.id;
        EmployeeOnHold(id, (err, results) => {

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

    EmployeeAllTask: (req, res) => {
        const id = req.params.id;

        EmployeeAllTask(id, (err, results) => {

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

    EmployeeName: (req, res) => {
        const id = req.params.id;

        EmployeeName(id, (err, results) => {

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

    EmployeeCompleted: (req, res) => {
        const id = req.params.id;
        EmployeeCompleted(id, (err, results) => {

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

    EmployeeInCompleted: (req, res) => {
        const id = req.params.id;
        EmployeeInCompleted(id, (err, results) => {

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

    EmployeeOverDue: (req, res) => {
        const id = req.params.id;
        EmployeeOverDue(id, (err, results) => {

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

    DepartmentOnProgress: (req, res) => {
        const id = req.params.id;
        DepartmentOnProgress(id, (err, results) => {

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
    DepartmentPending: (req, res) => {
        const id = req.params.id;
        DepartmentPending(id, (err, results) => {

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
    DepartmentOnHold: (req, res) => {
        const id = req.params.id;
        DepartmentOnHold(id, (err, results) => {

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

    DepartmentCompleted: (req, res) => {
        const id = req.params.id;
        DepartmentCompleted(id, (err, results) => {

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

    DepartmentInCompleted: (req, res) => {
        const id = req.params.id;
        DepartmentInCompleted(id, (err, results) => {

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
    DepartmentOverDue: (req, res) => {

        const id = req.params.id;
        DepartmentOverDue(id, (err, results) => {

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

    ProjectOnProgress: (req, res) => {
        const id = req.params.id;
        ProjectOnProgress(id, (err, results) => {

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

    ProjectCompleted: (req, res) => {
        const id = req.params.id;
        ProjectCompleted(id, (err, results) => {

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
    ProjectInCompleted: (req, res) => {
        const id = req.params.id;
        ProjectInCompleted(id, (err, results) => {

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

    ProjectOverDue: (req, res) => {
        const id = req.params.id;
        ProjectOverDue(id, (err, results) => {

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

    GoalsOnProgress: (req, res) => {
        const id = req.params.id;
        GoalsOnProgress(id, (err, results) => {

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

    GoalsCompleted: (req, res) => {
        const id = req.params.id;
        GoalsCompleted(id, (err, results) => {

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

    GoalsInCompleted: (req, res) => {
        const id = req.params.id;
        GoalsInCompleted(id, (err, results) => {

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

    GoalsOverDue: (req, res) => {
        const id = req.params.id;
        GoalsOverDue(id, (err, results) => {

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


    ViewAllEmployeeTask: (req, res) => {
        const id = req.params.id;
        ViewAllEmployeeTask(id, (err, results) => {
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