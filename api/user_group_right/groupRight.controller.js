const { usergroupRightupdate, getUsergroupRight, getUsergroupRightByid,
    getdataById, deleteUsergroupRight, checkInsertVal, checkUpdateVal,
    insertGroupRight,
    validateGroupRights,
    getGroupMenuRigths,
    getMenuSlno,
    updateGroupMenuRights,

    getMenuRightSlno


} = require('../user_group_right/groupRight.service')
const logger = require('../../logger/logger');
const { validateUserGroupRights } = require('../../validation/validation_schema');
module.exports = {

    usergroupRightupdate: (req, res) => {
        const body = req.body;
        const body_result = validateUserGroupRights.validate(body);
        if (body_result.error) {
            logger.warnlogwindow(body_result.error.details[0].message)
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        //let  body.user_grp_name=body_result
        body.user_grp_name = body_result.value.user_grp_name;
        // checkUpdateVal(body, (err, results) => {
        //     const value = JSON.parse(JSON.stringify(results))
        //     if (Object.keys(value).length === 0) {
        usergroupRightupdate(body, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (!results) {
                logger.infologwindow("Record Not Found")
                return res.status(200).json({
                    success: 1,
                    message: "Record Not Found"
                });
            }
            return res.status(200).json({
                success: 2,
                message: "Data Updated Successfully"
            });
        });
        //     } else {
        //         logger.infologwindow("Usergroup Name Already Exist")
        //         return res.status(200).json({
        //             success: 7,
        //             message: "Usergroup Name Already Exist"
        //         })
        //     }
        // })
    },
    getUsergroupRight: (req, res) => {
        getUsergroupRight((err, results) => {
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
    getUsergroupRightByid: (req, res) => {
        const id = req.params.id;
        getUsergroupRightByid(id, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length == 0) {
                logger.infologwindow("No Records Found")
                return res.status(400).json({
                    success: 0,
                    message: "No Records Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        });
    },
    deleteUsergroupRight: (req, res) => {
        const body = req.body;
        deleteUsergroupRight(body, (err, results) => {
            if (err) {
                logger.logwindow(res.err)
                return res.status(400).json({
                    success: 0,
                    message: res.err
                });
            }
            if (!results) {
                logger.infologwindow("Record Not Found")
                return res.status(400).json({
                    success: 1,
                    message: "Record Not Found"
                });
            }
            return res.status(200).json({
                success: 2,
                message: "Record Deleted Successfully"
            });
        });
    },
    getdataById: (req, res) => {
        const body = req.body;
        getdataById(body, (err, results) => {
            if (err) {
                logger.logwindow(res.err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length == 0) {
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


    getMenuName: (req, res) => {

        const body = req.body;
        const body_result = body;

        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }

        validateGroupRights(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                // Insert the values
                getMenuSlno(body, (err, results) => {

                    const postData = {
                        user_group_slno: body.user_group_slno,
                        module_slno: body.module_slno,
                        sub_module_slno: body.sub_module_slno
                    }

                    if (err) {
                        logger.logwindow(res.err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    const menuSLno = JSON.parse(JSON.stringify(results))
                    const menuDetl = menuSLno.map((val) => {
                        const newArray = [body.user_group_slno, body.module_slno, body.sub_module_slno, val.menu_slno]
                        return newArray;
                    })

                    insertGroupRight(menuDetl, (err, results) => {

                        if (err) {
                            logger.logwindow(res.err)
                            return res.status(200).json({
                                success: 0,
                                message: err
                            });
                        }

                        if (results) {

                            getGroupMenuRigths(postData, (err, results) => {
                                if (err) {
                                    logger.logwindow(res.err)
                                    return res.status(200).json({
                                        success: 0,
                                        message: err
                                    });
                                }

                                return res.status(200).json({
                                    success: 1,
                                    data: results
                                });
                            })
                        }
                    });

                })

            } else {
                //Get The Selected Values
                getGroupMenuRigths(body, (err, results) => {
                    if (err) {
                        logger.logwindow(res.err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }

                    if (!results) {
                        return res.status(200).json({
                            success: 0,
                            message: "No Data Found"
                        });
                    }

                    return res.status(200).json({
                        success: 1,
                        data: results
                    });
                })
            }
        })
    },



    updateGroupMenuRits: (req, res) => {
        const body = req.body
        updateGroupMenuRights(body, (err, results) => {
            if (err) {
                logger.logwindow(res.err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    success: 0,
                    message: "No Data Found"
                });
            }
            if (results) {
                getGroupMenuRigths(body, (err, results) => {

                    if (err) {
                        logger.logwindow(res.err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }

                    if (!results) {
                        return res.status(200).json({
                            success: 0,
                            message: "No Data Found"
                        });
                    }

                    return res.status(200).json({
                        success: 1,
                        message: "Data Updated Successfully",
                        data: results
                    });
                })
            }
        })
    },














}