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

    // Need to change here
    getMenuName: (req, res) => {
        const body = req.body;
        const body_result = body;
        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }

        // Checking if Data already Present in the User Right Table
        validateGroupRights(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            };

            if (results && results?.length === 0) {
                return res.status(200).json({
                    success: 0,
                    message: "No Rights Under this Module"
                });
            };

            const SearchMenu = {
                module_slno: body.module_slno,
                sub_module_slno: body.sub_module_slno
            }

            if (results?.length > 0) {
                getMenuSlno(SearchMenu, (err, TotalMenus) => {
                    if (err) {
                        logger.logwindow(res.err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    if (TotalMenus && TotalMenus?.length === 0) {
                        return res.status(200).json({
                            success: 0,
                            message: "No Menus Under this Module"
                        });
                    }
                    if (TotalMenus && TotalMenus?.length > 0) {
                        const FinalResponseData = Array.isArray(TotalMenus)
                            ? TotalMenus.map((item) => {
                                const rights = results.find(
                                    (r) => Number(r.menu_slno) === Number(item.menu_slno)
                                );

                                return {
                                    menu_slno: item.menu_slno,
                                    menu_name: item.menu_name,
                                    menu_view: rights ? Number(rights?.menu_view) : 0, // default 0
                                    group_right_slno: rights ? rights?.group_right_slno : null,
                                    module_slno: body.module_slno,
                                    sub_module_slno: body.sub_module_slno,
                                    user_group_slno: body.user_group_slno
                                };
                            })
                            : [];

                        return res.status(200).json({
                            success: 1,
                            message: "Successfully Fetched Data",
                            data: FinalResponseData
                        });

                    }


                })
            }


            // OLD VERSION OF DATA

            // const value = JSON.parse(JSON.stringify(results))
            // if (Object.keys(value).length === 0) {
            //     // Insert the values
            //     getMenuSlno(body, (err, results) => {
            //         const postData = {
            //             user_group_slno: body.user_group_slno,
            //             module_slno: body.module_slno,
            //             sub_module_slno: body.sub_module_slno
            //         }

            //         if (err) {
            //             logger.logwindow(res.err)
            //             return res.status(200).json({
            //                 success: 0,
            //                 message: err
            //             });
            //         }
            //         const menuSLno = JSON.parse(JSON.stringify(results))
            //         const menuDetl = menuSLno.map((val) => {
            //             const newArray = [body.user_group_slno, body.module_slno, body.sub_module_slno, val.menu_slno]
            //             return newArray;
            //         })

            //         insertGroupRight(menuDetl, (err, results) => {

            //             if (err) {
            //                 logger.logwindow(res.err)
            //                 return res.status(200).json({
            //                     success: 0,
            //                     message: err
            //                 });
            //             }

            //             if (results) {

            //                 getGroupMenuRigths(postData, (err, results) => {
            //                     if (err) {
            //                         logger.logwindow(res.err)
            //                         return res.status(200).json({
            //                             success: 0,
            //                             message: err
            //                         });
            //                     }

            //                     return res.status(200).json({
            //                         success: 1,
            //                         data: results
            //                     });
            //                 })
            //             }
            //         });

            //     })

            // } else {
            //     //Get The Selected Values
            //     getGroupMenuRigths(body, (err, results) => {
            //         if (err) {
            //             logger.logwindow(res.err)
            //             return res.status(200).json({
            //                 success: 0,
            //                 message: err
            //             });
            //         }

            //         if (!results) {
            //             return res.status(200).json({
            //                 success: 0,
            //                 message: "No Data Found"
            //             });
            //         }

            //         return res.status(200).json({
            //             success: 1,
            //             data: results
            //         });
            //     })
            // }


        })
    },



    updateGroupMenuRits: (req, res) => {
        const body = req.body
        const { group_right_slno, menu_view, user_group_slno, sub_module_slno, module_slno, menu_slno } = body;
        const insertData = { user_group_slno, module_slno, sub_module_slno, menu_slno }
        const updatedata = { group_right_slno, menu_view }

        if (group_right_slno != null) {
            updateGroupMenuRights(updatedata, (err, results) => {
                if (err) {
                    logger.logwindow(res.err)
                    return res.status(200).json({
                        success: 0,
                        message: err
                    });
                }
                return res.status(200).json({
                    success: 1,
                    message: "Data Updated Successfully",
                    // data: results
                });
            })
        } else {
            insertGroupRight(insertData, (err, results) => {
                if (err) {
                    logger.logwindow(res.err)
                    return res.status(200).json({
                        success: 0,
                        message: err
                    });
                }
                return res.status(200).json({
                    success: 1,
                    message: "Data Inserted Successfully",
                    // data: results
                });
            })
        }


        // updateGroupMenuRights(body, (err, results) => {
        //     if (err) {
        //         logger.logwindow(res.err)
        //         return res.status(200).json({
        //             success: 0,
        //             message: err
        //         });
        //     }

        //     if (!results) {
        //         return res.status(200).json({
        //             success: 0,
        //             message: "No Data Found"
        //         });
        //     }
        //     if (results) {
        //         getGroupMenuRigths(body, (err, results) => {

        //             if (err) {
        //                 logger.logwindow(res.err)
        //                 return res.status(200).json({
        //                     success: 0,
        //                     message: err
        //                 });
        //             }

        //             if (!results) {
        //                 return res.status(200).json({
        //                     success: 0,
        //                     message: "No Data Found"
        //                 });
        //             }

        //             return res.status(200).json({
        //                 success: 1,
        //                 message: "Data Updated Successfully",
        //                 data: results
        //             });
        //         })
        //     }
        // })

    },














}