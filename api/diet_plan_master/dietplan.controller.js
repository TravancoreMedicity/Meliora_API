const { dietPlanInsert, getdietplan, updateDietplan, getdietplanNeworder, getdietplanProcess, dietApproval, getDietPlanList,
    getneworderbydateNs, getNewOrderBydate, pendingApproval, ApprovedList, AllList, checkInsertVal,
    getNewOrderByDiet, pendingAppConsult
} = require('../diet_plan_master/dietplan.service');
const logger = require('../../logger/logger')
module.exports = {
    dietPlanInsert: (req, res) => {
        const body = req.body
        checkInsertVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results));
            if (Object.keys(value).length === 0) {
                dietPlanInsert(body, (err, results) => {
                    if (err) {
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    if (!results) {
                        return res.status(200).json({
                            success: 2,
                            message: "No Results Found"
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Diet Planned  Successfully"
                    });
                });
            } else {
                logger.infologwindow("Already Diet Planned")
                return res.status(200).json({
                    success: 7,
                    message: "Already Diet Planned"
                })
            }
        })
    },
    getdietplan: (req, res) => {
        getdietplan((err, results) => {
            if (err) {
                // logger.logwindow(err)
                return res.status(200).json({
                    success: 10,
                    message: err
                });
            }
            if (!results) {
                // logger.infologwindow("No Results Found")
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
    updateDietplan: (req, res) => {
        const body = req.body
        updateDietplan(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: "No Results Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: "diet plan updated succesfully"
            });
        });
    },
    getdietplanNeworder: (req, res) => {
        getdietplanNeworder((err, results) => {
            if (err) {
                // logger.logwindow(err)
                return res.status(400).json({
                    success: 10,
                    message: err
                });
            }
            if (!results) {
                // logger.infologwindow("No Results Found")
                return res.status(200).json({
                    success: 2,
                    message: "No Results Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getdietplanProcess: (req, res) => {
        getdietplanProcess((err, results) => {
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
    dietApproval: (req, res) => {
        const body = req.body
        dietApproval(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: "No Results Found"
                });
            }

            return res.status(200).json({
                success: 1,
                message: "Diet Plan Updated Successfully"
            });
        });
    },

    getDietPlanList: (req, res) => {
        getDietPlanList((err, results) => {
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
    getneworderbydateNs: (req, res) => {
        const body = req.body
        getneworderbydateNs(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (results.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Patient under selected nursing Station"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getNewOrderBydate: (req, res) => {
        const body = req.body
        getNewOrderBydate(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: "No Patient under selected nursing Station"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getNewOrderByDiet: (req, res) => {
        const body = req.body
        getNewOrderByDiet(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: "No Patient under selected nursing Station"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    pendingApproval: (req, res) => {
        const id = req.params.id;
        pendingApproval(id, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (results.length == 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Plan Pending for Approval"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    ApprovedList: (req, res) => {
        const id = req.params.id;
        ApprovedList(id, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (results.length == 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No plan is Approved"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    AllList: (req, res) => {
        const id = req.params.id;
        AllList(id, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (results.length == 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Diet Plan under Selected Nursing Station"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    pendingAppConsult: (req, res) => {
        pendingAppConsult((err, results) => {
            if (err) {
                // logger.logwindow(err)
                return res.status(200).json({
                    success: 10,
                    message: err
                });
            }
            if (results.length === 0) {
                // logger.infologwindow("No Results Found")
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
}

