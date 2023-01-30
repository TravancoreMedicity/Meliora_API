const { dietProcessinsert, getdietprocess, updatedietprocess, getdietmenubyId, updateDietplan,
    getNewlyInserted, insertprocessdetl, getmenubyallprocess, processDetailInsert, getproceedcount,
    getNewOrderCount, checkInsertVal } = require('../diet_process_mast/dietprocess.service');
const logger = require('../../logger/logger')

module.exports = {
    dietProcessinsert: (req, res) => {
        const body = req.body

        checkInsertVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {

                dietProcessinsert(body, (err, results) => {
                    const id = results.insertId
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
                    // return res.status(200).json({
                    //     success: 1,
                    //     data: results
                    // });
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
                            message: "Plan Process Successfully",
                            insetid: id
                        })
                    });
                });

            }
            else {
                logger.infologwindow("Diet Already Proccesed")
                return res.status(200).json({
                    success: 7,
                    message: "Diet Already Proccesed"
                })
            }
        })

    },
    getdietprocess: (req, res) => {
        getdietprocess((err, results) => {
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
    updatedietprocess: (req, res) => {
        const body = req.body
        updatedietprocess(body, (err, results) => {
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
                data: "updated succesfully"
            });
        });
    },
    getdietmenubyId: (req, res) => {
        const body = req.body;
        getdietmenubyId(body, (err, results) => {
            if (err) {
                // logger.logwindow(err)
                return res.status(400).json({
                    success: 10,
                    messagee: err
                });
            }
            if (results.length == 0) {
                // logger.infologwindow("No Results Found")
                return res.status(200).json({
                    success: 2,
                    messagee: "No menus in selected day under planed diet"
                });
            }
            return res.status(200).json({
                succes: 1,
                dataa: results
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
    getNewlyInserted: (req, res) => {
        const body = req.body
        getNewlyInserted(body, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length == 0) {
                logger.infologwindow("No Results Found")
                return res.status(200).json({
                    success: 0,
                    message: "No Record Found"
                });
            }
            var a1 = results.map((value, index) => {
                return [value.proc_slno, value.type_slno, value.rate_hos, value.rate_cant
                ]
            })
            insertprocessdetl(a1, (err, results) => {
                if (err) {
                    return res.status(200).json({
                        suces: 0,
                        message: err
                    });
                }
                if (!results) {
                    return res.status(200).json({
                        suces: 2,
                        message: "no result found"
                    });
                }
                return res.status(200).json({
                    suces: 1,
                    message: "Diet Process Done"
                });
            });

        })
    },
    getmenubyallprocess: (req, res) => {
        const body = req.body;
        getmenubyallprocess(body, (err, results) => {
            if (err) {
                // logger.logwindow(err)
                return res.status(400).json({
                    success: 10,
                    message: err
                });
            }
            if (results.length == 0) {
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

    processDetailInsert: (req, res) => {
        const body = req.body
        var a1 = body.map((value, index) => {
            return [value.proc_slno, value.type_slno, value.rate_hos, value.rate_cant
            ]
        })
        processDetailInsert(a1, (err, results) => {
            if (err) {
                return res.status(400).json({
                    suces: 0,
                    messag: err
                });
            }
            return res.status(200).json({
                suces: 1,
                messag: "Data Inserted Successfully"
            })
        })
    },
    getproceedcount: (req, res) => {
        const body = req.body;
        getproceedcount(body, (err, results) => {
            if (err) {
                // logger.logwindow(err)
                return res.status(400).json({
                    success: 10,
                    messagee: err
                });
            }
            if (results.length == 0) {
                // logger.infologwindow("No Results Found")
                return res.status(200).json({
                    success: 2,
                    messagee: "No menus in selected day under planed diet"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getNewOrderCount: (req, res) => {
        const body = req.body;
        getNewOrderCount(body, (err, results) => {
            if (err) {
                // logger.logwindow(err)
                return res.status(400).json({
                    success: 10,
                    messagee: err
                });
            }
            if (results.length == 0) {
                // logger.infologwindow("No Results Found")
                return res.status(200).json({
                    success: 2,
                    messagee: "No menus in selected day under planed diet"
                });
            }
            return res.status(200).json({
                succes: 1,
                dataa: results
            });
        });
    },
}