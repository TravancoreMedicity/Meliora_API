
const logger = require('../../logger/logger')
const { getEmployeeID, getMenuBasedRights, getSubModuleRights, getModuleMasterByID, getSelectMenu, getEmpName,
    getModuleGroup, getUserModuleRights, getempId, inpatientList, getBranch, getDesignation, getSalutation,
    getSerialno, getproceedcount, getNewOrderCount, getDietpatient, getNurstation, getDietMenu, getLoginProfile,
    getDashboardRights, getEmployeedeptSec, getfloor, getnurstationbyfloor } = require('../commoncode/common.service');
module.exports = {
    getEmployeeID: (req, res) => {
        const id = req.params.id;
        getEmployeeID(id, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }

            if (!results) {
                return res.status(400).json({
                    success: 0,
                    message: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getMenuBasedRights: (req, res) => {
        const id = req.params.id;
        getMenuBasedRights(id, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    status: 0,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    status: 0,
                    message: "No Data Found"
                });
            }

            return res.status(200).json({
                status: 1,
                resdata: results
            });
        })
    },
    getSelectMenu: (req, res) => {
        getSelectMenu((err, results) => {
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
    getEmpName: (req, res) => {
        getEmpName((err, results) => {
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
    getModuleGroup: (req, res) => {
        getModuleGroup((err, results) => {
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

    getModuleRights: (req, res) => {
        const body = req.body
        getUserModuleRights(body, (err, results) => {
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

            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },


    getSubModuleRights: (req, res) => {
        const body = req.body
        getSubModuleRights(body, (err, results) => {
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
                    succes: 0,
                    message: "No Record Found"
                });
            }

            return res.status(200).json({
                succes: 1,
                dataa: results
            });
        })
    },

    getModuleGroupByID: (req, res) => {
        const id = req.params.id;
        getModuleMasterByID(id, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length == 0) {
                logger.infologwindow("No Record Found")
                return res.status(200).json({
                    success: 0,
                    message: "No Record Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },
    getempId: (req, res) => {

        getempId((err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: "No Result Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    inpatientList: (req, res) => {
        const id = req.params.id;
        inpatientList(id, (err, results) => {
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
                    message: "No Result Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getBranch: (req, res) => {
        getBranch((err, results) => {
            if (err) {

                return res.status(200).json({
                    success: 10,
                    message: err
                });
            }

            if (!results) {

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
    getDesignation: (req, res) => {
        getDesignation((err, results) => {
            if (err) {

                return res.status(200).json({
                    success: 10,
                    message: err
                });
            }

            if (!results) {

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
    getSalutation: (req, res) => {
        getSalutation((err, results) => {
            if (err) {

                return res.status(200).json({
                    success: 10,
                    message: err
                });
            }

            if (!results) {

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
    getSerialnumber: (req, res) => {

        getSerialno((err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (!results) {
                logger.infoLogger("No Records Found")
                return res.status(200).json({
                    success: 2,
                    message: "No Result Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getproceedcount: (req, res) => {
        getproceedcount((err, results) => {
            if (err) {
                // logger.logwindow(err)
                return res.status(400).json({
                    succes: 10,
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
                succes: 1,
                dataa: results
            });
        });
    },
    getNewOrderCount: (req, res) => {
        getNewOrderCount((err, results) => {
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
    getDietpatient: (req, res) => {
        const id = req.params.id
        getDietpatient(id, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: "No Result Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getNurstation: (req, res) => {
        getNurstation((err, results) => {
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
    getDietMenu: (req, res) => {
        const id = req.params.id;
        getDietMenu(id, (err, results) => {
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
                    message: "No Diet menu against planed Diet"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getLoginProfile: (req, res) => {
        const id = req.params.id;
        getLoginProfile(id, (err, results) => {
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
                    message: "No data"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    //DashBoard Rights
    getDashboardRights: (req, res) => {
        const id = req.params.id;
        getDashboardRights(id, (err, results) => {
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
    getEmployeedeptSec: (req, res) => {
        const id = req.params.id
        getEmployeedeptSec(id, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
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
    getfloor: (req, res) => {
        getfloor((err, results) => {
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
    getnurstationbyfloor: (req, res) => {
        const id = req.params.id
        getnurstationbyfloor(id, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
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
    }


}