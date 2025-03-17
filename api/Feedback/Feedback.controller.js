const { error } = require("winston");
const {
    insertfeedbackcategory,
    getallcategories,
    updatecategory,
    insertsubcategory,
    getallsubCategories,
    updatesubcategory,
    updatecollectiontype,
    allfeedbackcollection,
    insertcollectiontype,
    getDeptStatus,
    getfeedbacksubcategory,
    insertFeedbackName,
    getFeedbackName,
    UpdateFeedbackName,
    updateSerialMaster,
    fetchCurentSerial,
    UpdateFeedbackDetailSerial,
    insertfeedbackDetail,
    fetchCurentFeedbackDetailSerial,
    getallfeedbackDetail,
    updatefeedbackDetail,
    fetchFeedbackdtl,
    FeedbackAlreadyPresent,
    insertQuestionAnswers,
    fetchFeedBackDetailFddNo,
    UpdateQuestionAnswers,
    FindifRatingAlreadyExist,
    FindCategroryAlreadyExist,
    FindSubCategoryAlreadyExist,
    fetchfbdisplay,
    CheckIfNoChangeOccured,
    ChangeFeedbackMastQkeyStatus,
    UpdateSerialAnswerMaster,
    fetchSerialAnswerMaster,
    insertAllFeedBackTransactionMast,
    insertFeedbackQuestAnswer,
    getalluserfeedback,
    ModuleAlreadyPresent,
    insertmodulemaster,
    updatemodulemaster,
    getallmodulemaster,
    findMenuAlreadyExists,
    insertmenumaster,
    getallmenumaster,
    updatemenumaster,
    GroupAlreadyPresent,
    insertgroupmaster,
    getallgroupmaster,
    updategroupmaster,
    getallmodulemenu,
    insertuserright,
    updateuserright,
    FindUserRightAlreadyExist,
    getDepartmentSec,
    getDepartmentEmpid,
    FindEmployeeAlreadyExist,
    employeerightinsert,
    getallemployeeright,
    employeerightupdate,
    FindEmpyGroup,
    getallmenuitems,
    FindUserModuleAlreadyPresent,
    insertusermoduleright,
    updateusermoduleright,
    getallusermodulemaster,
    getallmoduleitems,
    nursestationinsert,
    FindNursingStationExist,
    getallnursestation,
    updatenursestation,
    getpatientfeedback,
    insertbddetail,
    CheckBedAlreadyPresent,
    updatebeddetail,
    CheckRoomTypeAlreadyPreseint,
    insertrtdetail,
    updatertdetail,
    CheckpatientAlreadyPresent,
    insertPatientDetail,
    updatePatientDetail,
    CheckRoomsinMasterPresent,
    insertRoomMasterdetail,
    updateRoomMasterDetail,
    updateadmnReasons,
    insertadminReasons,
    CheckadmnReasonsExits,
    CheckRoomCategoryExists,
    insertRoomCategoryDetail,
    UpdateRoomCategoryDetail,
    getNursingBed,
    getCurrentPatient,
    getallblockedbed,
    insertbedremarks,
    getllbedremarks,
    getempdetail
} = require("./Feedback.service");

module.exports = {
    insertfeedbackcategory: (req, res) => {
        const body = req.body;
        const { fb_category_name } = body;
        const name = fb_category_name.toLowerCase().replace(/\s+/g, '');
        FindCategroryAlreadyExist(name, (error, results) => {
            if (error) {
                return res.status(200).json({
                    success: 1,
                    message: "Error in fetchin data"
                })
            }
            if (results.length > 0) {
                return res.status(200).json({
                    success: 3,
                    message: 'The FeedBack Already Present'
                })
            }
            if (!results || results.length === 0) {
                insertfeedbackcategory(body, (error, results) => {
                    if (error) {
                        return res.status(200).json({
                            success: 1,
                            message: error
                        })
                    }
                    return res.status(200).json({
                        success: 2,
                        message: "Inserted Successfully",
                    })

                })
            }
        })

    },
    getallcategories: (req, res) => {
        getallcategories((error, results) => {
            if (error) {
                return res.status(200).json({
                    success: 1,
                    message: "Error in fetching data!"
                })
            }
            if (results.length === 0) {
                return res.status(200).json({
                    success: 0,
                    message: 'No data Found'
                })
            }
            if (results.length > 0) {
                return res.status(200).json({
                    success: 2,
                    message: "Successfully Fetched Data",
                    data: results
                })
            }
        })
    },
    updatecategory: (req, res) => {
        const body = req.body;
        updatecategory(body, (error, results) => {
            if (error) {
                return res.status(200).json({
                    success: 1,
                    message: error
                })
            }
            return res.status(200).json({
                success: 2,
                message: "Updated Successfully",
            })

        })
    },

    insertsubcategory: (req, res) => {
        const body = req.body;
        const { fb_subcategory_name, fb_category_slno } = body;
        const name = fb_subcategory_name.toLowerCase().replace(/\s+/g, '');
        const checkData = {
            fb_subcategory_name: name,
            fb_category_slno: fb_category_slno
        }
        FindSubCategoryAlreadyExist(checkData, (error, results) => {
            if (error) {
                return res.status(200).json({
                    success: 1,
                    message: "Error in fetchin data"
                })
            }
            if (results.length > 0) {
                return res.status(200).json({
                    success: 3,
                    message: 'The FeedBack Already Present'
                })
            }
            if (!results || results.length === 0) {
                insertsubcategory(body, (error, results) => {
                    if (error) {
                        return res.status(200).json({
                            success: 1,
                            message: error
                        })
                    }
                    return res.status(200).json({
                        success: 2,
                        message: "Inserted Successfully",
                    })

                })
            }
        })

    },
    getallsubCategories: (req, res) => {
        getallsubCategories((error, results) => {
            if (error) {
                return res.status(200).json({
                    success: 1,
                    message: "Error in fetching data!"
                })
            }
            if (results.length === 0) {
                return res.status(200).json({
                    success: 0,
                    message: 'No data Found'
                })
            }
            if (results.length > 0) {
                return res.status(200).json({
                    success: 2,
                    message: "Successfully Fetched Data",
                    data: results
                })
            }
        })
    },
    updatesubcategory: (req, res) => {
        const body = req.body;
        updatesubcategory(body, (error, results) => {
            if (error) {
                return res.status(200).json({
                    success: 1,
                    message: error
                })
            }
            return res.status(200).json({
                success: 2,
                message: "Updated Successfully",
            })

        })
    },
    insertcollectiontype: (req, res) => {
        const body = req.body;
        const { fb_collection_name } = body;
        const name = fb_collection_name.toLowerCase().replace(/\s+/g, '');
        FindifRatingAlreadyExist(name, (error, results) => {
            if (error) {
                return res.status(200).json({
                    success: 1,
                    message: "Error in fetchin data"
                })
            }
            if (results.length > 0) {
                return res.status(200).json({
                    success: 3,
                    message: 'The FeedBack Already Present'
                })
            }
            if (!results || results.length === 0) {
                insertcollectiontype(body, (error, results) => {
                    if (error) {
                        return res.status(200).json({
                            success: 1,
                            message: error
                        })
                    }
                    return res.status(200).json({
                        success: 2,
                        message: "Inserted Successfully",
                    })

                })
            }
        })
    },
    allfeedbackcollection: (req, res) => {
        allfeedbackcollection((error, results) => {
            if (error) {
                return res.status(200).json({
                    success: 1,
                    message: "Error in fetching data!"
                })
            }
            if (results.length === 0) {
                return res.status(200).json({
                    success: 0,
                    message: 'No data Found'
                })
            }
            if (results.length > 0) {
                return res.status(200).json({
                    success: 2,
                    message: "Successfully Fetched Data",
                    data: results
                })
            }
        })
    },
    updatecollectiontype: (req, res) => {
        const body = req.body;
        updatecollectiontype(body, (error, results) => {
            if (error) {
                return res.status(200).json({
                    success: 1,
                    message: error
                })
            }
            return res.status(200).json({
                success: 2,
                message: "Updated Successfully",
            })

        })
    },
    getDeptStatus: (req, res) => {
        getDeptStatus((err, results) => {
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
    getfeedbacksubcategory: (req, res) => {
        const data = req.body;
        getfeedbacksubcategory(data, (err, results) => {
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

    //feedback master
    insertFeedbackName: (req, res) => {
        const body = req.body;
        const { feedback_name } = body;
        const name = feedback_name.toLowerCase().replace(/\s+/g, '');
        FeedbackAlreadyPresent(name, (error, results) => {
            if (error) {
                return res.status(200).json({
                    success: 1,
                    message: "Error in fetchin data"
                })
            }
            if (results.length > 0) {
                return res.status(200).json({
                    success: 3,
                    message: 'The FeedBack Already Present'
                })
            }

            if (!results || results.length === 0) {
                updateSerialMaster((error, results) => {
                    if (error) {
                        return res.status(200).json({
                            success: 0,
                            message: "Error in updating Value"
                        })
                    }
                    fetchCurentSerial((error, results) => {
                        if (error) {
                            return res.status(200).json({
                                success: 0,
                                message: "Error in fetching Data!"
                            })
                        }

                        let serialCurrentValue = results[0]?.serial_current;

                        if (!serialCurrentValue) {
                            return res.status(200).json({
                                success: 1,
                                message: "No data found"
                            })
                        }

                        let fdmast_slno_value = serialCurrentValue;
                        const insertData = {
                            ...body,
                            fdmast_slno_value
                        }
                        insertFeedbackName(insertData, (error, results) => {
                            if (error) {
                                return res.status(200).json({
                                    success: 1,
                                    message: error
                                })
                            }
                            return res.status(200).json({
                                success: 2,
                                message: "Inserted Successfully",
                            })

                        })
                    })
                })
            }

        })


    },
    getFeedbackName: (req, res) => {
        getFeedbackName((error, results) => {
            if (error) {
                return res.status(200).json({
                    success: 1,
                    message: "Error in fetching data!"
                })
            }
            if (results.length === 0) {
                return res.status(200).json({
                    success: 0,
                    message: 'No data Found'
                })
            }
            if (results.length > 0) {
                return res.status(200).json({
                    success: 2,
                    message: "Successfully Fetched Data",
                    data: results
                })
            }
        })
    },
    UpdateFeedbackName: (req, res) => {
        const body = req.body;
        UpdateFeedbackName(body, (error, results) => {
            if (error) {
                return res.status(200).json({
                    success: 1,
                    message: error
                })
            }
            return res.status(200).json({
                success: 2,
                message: "Updated Successfully",
            })

        })
    },
    insertfeedbackDetail: (req, res) => {
        const body = req.body;
        const { rating_name, fdmast_slno, fb_rateing_slno, feedback_status, create_user } = body
        UpdateFeedbackDetailSerial((error, results) => {
            if (error) {
                return res.status(200).json({
                    success: 0,
                    message: "Error in updating Value"
                })
            }
            fetchCurentFeedbackDetailSerial((error, results) => {
                if (error) {
                    return res.status(200).json({
                        success: 0,
                        message: "Error in fetching Data!"
                    })
                }

                let serialCurrentValue = results[0]?.serial_current;

                if (!serialCurrentValue) {
                    return res.status(200).json({
                        success: 1,
                        message: "No data found"
                    })
                }

                let fddet_slno_value = serialCurrentValue;
                const insertData = {
                    ...body,
                    fddet_slno_value
                }

                const QuestionAnwer = {
                    fddet_slno: fddet_slno_value,
                    rating_name: rating_name,
                    fdmast_slno: fdmast_slno,
                    fb_rateing_slno: fb_rateing_slno,
                    fb_aq_status: feedback_status,
                    create_user: create_user
                }
                insertfeedbackDetail(insertData, (error, results) => {
                    if (error) {
                        return res.status(200).json({
                            success: 1,
                            message: error
                        })
                    }
                    insertQuestionAnswers(QuestionAnwer, (error, results) => {
                        if (error) {
                            return res.status(200).json({
                                success: 1,
                                message: error
                            })
                        }
                    })

                    return res.status(200).json({
                        success: 2,
                        message: "Inserted Successfully",
                    })
                })
            })

        })
    },
    getallfeedbackDetail: (req, res) => {
        getallfeedbackDetail((error, results) => {
            if (error) {
                return res.status(200).json({
                    success: 1,
                    message: "Error in fetching data"
                })
            }

            if (results.length === 0) {
                return res.status(200).json({
                    success: 0,
                    message: 'No Data founded'
                })
            }
            if (results.length > 0) {
                return res.status(200).json({
                    success: 2,
                    data: results
                })
            }
        })
    },
    updatefeedbackDetail: (req, res) => {
        const { rating_name, fb_category_slno, fdmast_slno, fb_rateing_slno, fdt_slno, feedback_status, edit_user, fb_subcategory_slno, fd_qa_malay, fd_qa_eng, fb_question_type, fb_answer_component } = req.body


        const detailUpdata = {
            fdmast_slno: fdmast_slno,
            fb_category_slno: fb_category_slno,
            fb_subcategory_slno: fb_subcategory_slno,
            fd_qa_malay: fd_qa_malay,
            fd_qa_eng: fd_qa_eng,
            fb_rateing_slno: fb_rateing_slno,
            fb_question_type: fb_question_type,
            fb_answer_component: fb_answer_component,
            feedback_status: feedback_status,
            edit_user: edit_user,
            fdt_slno: fdt_slno
        }
        updatefeedbackDetail(detailUpdata, (error, results) => {
            if (error) {
                return res.status(200).json({
                    success: 1,
                    message: error
                })
            }
            fetchFeedBackDetailFddNo(fdt_slno, (error, results) => {
                if (error) {
                    return res.status(200).json({
                        success: 1,
                        message: error
                    })
                }
                let FddSlnoVlaue = results[0]?.fddet_slno;
                let ratingslno = results[0]?.fb_rateing_slno;

                const updateData = {
                    fddet_slno: FddSlnoVlaue,
                    fdt_slno: fdt_slno,
                    rating_name: rating_name,
                    fdmast_slno: fdmast_slno,
                    fb_rateing_slno: fb_rateing_slno,
                    fb_aq_status: feedback_status,
                    edit_user: edit_user
                }


                const QuestionAnwer = {
                    fddet_slno: FddSlnoVlaue,
                    rating_name: rating_name,
                    fdmast_slno: fdmast_slno,
                    fb_rateing_slno: fb_rateing_slno,
                    fb_aq_status: feedback_status,
                    create_user: edit_user
                }
                const StautsCheck = {
                    fddet_slno: FddSlnoVlaue,
                    fb_rateing_slno: ratingslno,
                }
                const ChangeStauts = {
                    fddet_slno: FddSlnoVlaue,
                    edit_user: edit_user
                }

                CheckIfNoChangeOccured(StautsCheck, (error, resutls) => {
                    if (error) {
                        return res.status(200).json({
                            success: 1,
                            message: error
                        })
                    }
                    const ratingNames = resutls.map(item => item.rating_name);
                    const ratingKeys = Object.keys(rating_name);
                    const hasMatchingKeys = ratingKeys.some(key => ratingNames.includes(key));

                    if (resutls.length === 0) {
                        ChangeFeedbackMastQkeyStatus(ChangeStauts, (error, results) => {
                            if (error) {
                                return res.status(200).json({
                                    success: 1,
                                    message: error
                                })
                            }

                            insertQuestionAnswers(QuestionAnwer, (error, results) => {
                                if (error) {
                                    return res.status(200).json({
                                        success: 1,
                                        message: error
                                    })
                                }
                            })

                        })
                    }


                    if (results.length > 0 && !hasMatchingKeys) {
                        insertQuestionAnswers(QuestionAnwer, (error, results) => {
                            if (error) {
                                return res.status(200).json({
                                    success: 1,
                                    message: error
                                })
                            }
                        })
                    }

                    if (results.length > 0 && hasMatchingKeys) {
                        UpdateQuestionAnswers(updateData, (error, results) => {
                            if (error) {
                                return res.status(200).json({
                                    success: 1,
                                    message: error
                                })
                            }
                        })
                    }


                })

            })
            return res.status(200).json({
                success: 2,
                message: "Updated Successfully",
            })
        })
    },
    fetchFeedbackdtl: (req, res) => {
        const body = req.body;
        fetchFeedbackdtl(body, (error, results) => {
            if (error) {
                return res.status(200).json({
                    success: 1,
                    message: "Error in fetching data"
                })
            }
            if (results.length === 0) {
                return res.status(200).json({
                    success: 0,
                    message: 'No Data founded'
                })
            }
            if (results.length > 0) {
                return res.status(200).json({
                    success: 2,
                    data: results
                })
            }
        })
    }
    ,
    fetchfbdisplay: (req, res) => {
        const body = req.body;
        fetchfbdisplay(body, (error, results) => {
            if (error) {
                return res.status(200).json({
                    success: 1,
                    message: "Error in fetching data"
                })
            }
            if (results.length === 0) {
                return res.status(200).json({
                    success: 0,
                    message: 'No Data founded'
                })
            }
            if (results.length > 0) {
                return res.status(200).json({
                    success: 2,
                    data: results
                })
            }
        })
    },
    insertFeedbackanswers: (req, res) => {
        const body = req.body;
        const { fb_answers, fb_ip_num, fb_patient_num, fb_patient_name, fb_patient_mob, fdmast_slno, create_user } = body;

        UpdateSerialAnswerMaster((error, results) => {
            if (error) {
                return res.status(200).json({
                    success: 1,
                    message: "Error in updation serial number"
                })
            }
            fetchSerialAnswerMaster((error, results) => {
                if (error) {
                    return res.status(200).json({
                        success: 0,
                        message: "Error in fetching Data!"
                    })
                }

                let serialCurrentValue = results[0]?.serial_current;

                if (!serialCurrentValue) {
                    return res.status(200).json({
                        success: 1,
                        message: "No data found"
                    })
                }

                let fb_transact_slno_value = serialCurrentValue;
                const insertData = {
                    fb_transact_slno: fb_transact_slno_value,
                    fdmast_slno: fdmast_slno,
                    fb_ip_num: fb_ip_num,
                    fb_patient_num: fb_patient_num,
                    fb_patient_name: fb_patient_name,
                    fb_patient_mob: fb_patient_mob,
                    create_user: create_user
                }

                const userAnswer = {
                    answer: fb_answers,
                    fb_transact_slno: fb_transact_slno_value,
                    create_user: create_user
                }
                insertAllFeedBackTransactionMast(insertData, (error, results) => {
                    if (error) {
                        return res.status(200).json({
                            success: 1,
                            message: error
                        })
                    }

                    insertFeedbackQuestAnswer(userAnswer, (error, results) => {
                        if (error) {
                            console.log(error);

                            return res.status(200).json({
                                success: 1,
                                message: error
                            })
                        }
                    })
                    return res.status(200).json({
                        success: 2,
                        message: "Inserted Successfully",
                    })
                })

            })
        })
    },
    getalluserfeedback: (req, res) => {
        // console.log(req.body, "date");
        const body = req.body;

        getalluserfeedback(body, (error, results) => {
            if (error) {
                return res.status(200).json({
                    success: 1,
                    message: "Error in fetching data"
                })
            }
            if (results.length === 0) {
                return res.status(200).json({
                    success: 0,
                    message: 'No Data founded'
                })
            }
            if (results.length > 0) {
                return res.status(200).json({
                    success: 2,
                    data: results
                })
            }
        })
    },
    insertmodulemaster: (req, res) => {
        const body = req.body;
        const { fb_module_name } = body;
        const name = fb_module_name.toLowerCase().replace(/\s+/g, '');
        ModuleAlreadyPresent(name, (error, results) => {
            if (error) {
                return res.status(200).json({
                    success: 1,
                    message: "Error in fetchin data"
                })
            }
            if (results.length > 0) {
                return res.status(200).json({
                    success: 3,
                    message: 'The FeedBack Already Present'
                })
            }

            insertmodulemaster(body, (error, results) => {
                if (error) {
                    return res.status(200).json({
                        success: 1,
                        message: error
                    })
                }
                return res.status(200).json({
                    success: 2,
                    message: "Inserted Successfully",
                })

            })

        })
    },
    updatemodulemaster: (req, res) => {
        const body = req.body;
        updatemodulemaster(body, (error, results) => {
            if (error) {
                return res.status(200).json({
                    success: 1,
                    message: error
                })
            }
            return res.status(200).json({
                success: 2,
                message: "Updated Successfully",
            })

        })
    },
    getallmodulemaster: (req, res) => {
        getallmodulemaster((error, results) => {
            if (error) {
                return res.status(200).json({
                    success: 1,
                    message: "Error in fetching data!"
                })
            }
            if (results.length === 0) {
                return res.status(200).json({
                    success: 0,
                    message: 'No data Found'
                })
            }
            if (results.length > 0) {
                return res.status(200).json({
                    success: 2,
                    message: "Successfully Fetched Data",
                    data: results
                })
            }
        })
    },
    insertmenumaster: (req, res) => {
        const body = req.body;
        const { menuname, moduleid } = body;
        const name = menuname.toLowerCase().replace(/\s+/g, '');
        const checkData = {
            menuname: name,
            moduleid: moduleid
        }
        findMenuAlreadyExists(checkData, (error, results) => {
            if (error) {
                console.log(error)

                return res.status(200).json({
                    success: 1,
                    message: "Error in fetchin data"
                })
            }
            if (results.length > 0) {
                return res.status(200).json({
                    success: 3,
                    message: 'The FeedBack Already Present'
                })
            }
            if (!results || results.length === 0) {
                insertmenumaster(body, (error, results) => {
                    if (error) {
                        return res.status(200).json({
                            success: 1,
                            message: error
                        })
                    }
                    return res.status(200).json({
                        success: 2,
                        message: "Inserted Successfully",
                    })

                })
            }
        })

    },
    getallmenumaster: (req, res) => {
        getallmenumaster((error, results) => {
            if (error) {
                return res.status(200).json({
                    success: 1,
                    message: "Error in fetching data!"
                })
            }
            if (results.length === 0) {
                return res.status(200).json({
                    success: 0,
                    message: 'No data Found'
                })
            }
            if (results.length > 0) {
                return res.status(200).json({
                    success: 2,
                    message: "Successfully Fetched Data",
                    data: results
                })
            }
        })
    },
    updatemenumaster: (req, res) => {
        const body = req.body;
        updatemenumaster(body, (error, results) => {
            if (error) {
                return res.status(200).json({
                    success: 1,
                    message: error
                })
            }
            return res.status(200).json({
                success: 2,
                message: "Updated Successfully",
            })

        })
    },

    insertgroupmaster: (req, res) => {
        const body = req.body;
        const { fb_usrgrp_name } = body;
        const name = fb_usrgrp_name.toLowerCase().replace(/\s+/g, '');
        GroupAlreadyPresent(name, (error, results) => {
            if (error) {
                return res.status(200).json({
                    success: 1,
                    message: "Error in fetchin data"
                })
            }
            if (results.length > 0) {
                return res.status(200).json({
                    success: 3,
                    message: 'The FeedBack Already Present'
                })
            }

            insertgroupmaster(body, (error, results) => {
                if (error) {
                    return res.status(200).json({
                        success: 1,
                        message: error
                    })
                }
                return res.status(200).json({
                    success: 2,
                    message: "Inserted Successfully",
                })

            })

        })
    },
    getallgroupmaster: (req, res) => {
        getallgroupmaster((error, results) => {
            if (error) {
                return res.status(200).json({
                    success: 1,
                    message: "Error in fetching data!"
                })
            }
            if (results.length === 0) {
                return res.status(200).json({
                    success: 0,
                    message: 'No data Found'
                })
            }
            if (results.length > 0) {
                return res.status(200).json({
                    success: 2,
                    message: "Successfully Fetched Data",
                    data: results
                })
            }
        })
    },
    updategroupmaster: (req, res) => {
        const body = req.body;
        updategroupmaster(body, (error, results) => {
            if (error) {
                return res.status(200).json({
                    success: 1,
                    message: error
                })
            }
            return res.status(200).json({
                success: 2,
                message: "Updated Successfully",
            })

        })
    },
    getallmodulemenu: (req, res) => {
        const data = req.body
        getallmodulemenu(data, (error, results) => {
            if (error) {
                return res.status(200).json({
                    success: 1,
                    message: error
                })
            }
            if (results.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: 'No data Found'
                })
            }
            if (results.length > 0) {
                return res.status(200).json({
                    success: 2,
                    message: "Successfully Fetched Data",
                    data: results
                })
            }
        })
    },
    insertuserright: (req, res) => {
        const body = req.body;
        const { fb_usr_right_slno, create_user, fb_usrgrp_slno, fb_module_slno, fb_menu_slno, fb_menu_view } = body;
        const id = fb_usr_right_slno;
        FindUserRightAlreadyExist(id, (error, results) => {
            if (error) {
                return res.status(200).json({
                    success: 1,
                    message: "Error in fetchin data"
                })
            }
            const data = {
                fb_usr_right_slno: id,
                fb_menu_view: 1,
                edit_user: create_user
            }
            if (results.length > 0) {
                updateuserright(data, (error, results) => {
                    if (error) {
                        return res.status(200).json({
                            success: 1,
                            message: error
                        })
                    }
                    return res.status(200).json({
                        success: 2,
                        message: "Updated Successfully",
                    })
                })
            } else {
                insertuserright(body, (error, results) => {
                    if (error) {
                        return res.status(200).json({
                            success: 1,
                            message: error
                        })
                    }
                    return res.status(200).json({
                        success: 2,
                        message: "Inserted Successfully",
                    })

                })
            }

        })

    },
    updateuserright: (req, res) => {
        const body = req.body
        updateuserright(body, (error, results) => {
            if (error) {
                return res.status(200).json({
                    success: 1,
                    message: error
                })
            }
            return res.status(200).json({
                success: 2,
                message: "Updated Successfully",
            })
        })
    },
    getDepartmentSec: (req, res) => {
        const id = req.params.id;
        getDepartmentSec(id, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }
            if (results.length == 0) {
                return res.status(200).json({
                    success: 0,
                    message: "No Department Section under this Department"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },
    getDepartmentEmpid: (req, res) => {
        const id = req.params.id
        getDepartmentEmpid(id, (err, results) => {
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
    employeerightinsert: (req, res) => {
        const body = req.body;
        const { fb_grp_slno, fb_depid, fb_secid, fb_empid, fb_usrright_status, create_user } = body;
        const checkData = {
            fb_grp_slno: fb_grp_slno,
            fb_depid: fb_depid,
            fb_secid: fb_secid,
            fb_empid: fb_empid,
        }
        FindEmployeeAlreadyExist(checkData, (error, results) => {
            if (error) {
                return res.status(200).json({
                    success: 1,
                    message: "Error in fetchin data"
                })
            }
            if (results.length > 0) {
                return res.status(200).json({
                    success: 3,
                    message: 'Already Assigned'
                })
            }
            if (!results || results.length === 0) {
                employeerightinsert(body, (error, results) => {
                    if (error) {
                        return res.status(200).json({
                            success: 1,
                            message: error
                        })
                    }
                    return res.status(200).json({
                        success: 2,
                        message: "Inserted Successfully",
                    })

                })
            }
        })

    },
    getallemployeeright: (req, res) => {
        getallemployeeright((error, results) => {
            if (error) {
                return res.status(200).json({
                    success: 1,
                    message: error
                })
            }
            if (results.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: 'No data Found'
                })
            }
            if (results.length > 0) {
                return res.status(200).json({
                    success: 2,
                    message: "Successfully Fetched Data",
                    data: results
                })
            }
        })
    },
    employeerightupdate: (req, res) => {
        const body = req.body
        employeerightupdate(body, (error, results) => {
            if (error) {
                return res.status(200).json({
                    success: 1,
                    message: error
                })
            }
            return res.status(200).json({
                success: 2,
                message: "Updated Successfully",
            })
        })
    },

    getallmenuitems: (req, res) => {
        const body = req.body;
        FindEmpyGroup(body, (error, results) => {
            if (error) {
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }
            if (!results || results.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: 'User Does not Exists'
                })
            }
            const GroupId = results[0]?.fb_grp_slno
            getallmenuitems(GroupId, (err, results) => {
                if (err) {
                    return res.status(200).json({
                        success: 2,
                        message: err
                    });
                }
                if (results.length == 0) {
                    return res.status(200).json({
                        success: 0,
                        message: "No Menu Found under this Module"
                    });
                }
                return res.status(200).json({
                    success: 1,
                    data: results
                });
            })
        })
    },
    insertusermodulemaster: (req, res) => {
        const body = req.body;
        FindUserModuleAlreadyPresent(body, (error, results) => {
            if (error) {
                return res.status(200).json({
                    success: 1,
                    message: "Error in fetchin data"
                })
            }
            if (results.length > 0) {
                return res.status(200).json({
                    success: 3,
                    message: 'The FeedBack Already Present'
                })
            }

            insertusermoduleright(body, (error, results) => {
                if (error) {
                    return res.status(200).json({
                        success: 1,
                        message: error
                    })
                }
                return res.status(200).json({
                    success: 2,
                    message: "Inserted Successfully",
                })

            })

        })
    },
    updateusermodulemaster: (req, res) => {
        const body = req.body;
        updateusermoduleright(body, (error, results) => {
            if (error) {
                return res.status(200).json({
                    success: 1,
                    message: error
                })
            }
            return res.status(200).json({
                success: 2,
                message: "Updated Successfully",
            })

        })
    },
    getallusermodulemaster: (req, res) => {
        getallusermodulemaster((error, results) => {
            if (error) {
                return res.status(200).json({
                    success: 1,
                    message: "Error in fetching data!"
                })
            }
            if (results.length === 0) {
                return res.status(200).json({
                    success: 0,
                    message: 'No data Found'
                })
            }
            if (results.length > 0) {
                return res.status(200).json({
                    success: 2,
                    message: "Successfully Fetched Data",
                    data: results
                })
            }
        })
    },
    getallmoduleitems: (req, res) => {
        const body = req.body;
        FindEmpyGroup(body, (error, results) => {
            if (error) {
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }
            if (!results || results.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: 'User Does not Exists'
                })
            }
            const GroupId = results[0]?.fb_grp_slno
            getallmoduleitems(GroupId, (err, results) => {
                if (err) {
                    return res.status(200).json({
                        success: 2,
                        message: err
                    });
                }
                if (results.length == 0) {
                    return res.status(200).json({
                        success: 0,
                        message: "No Menu Found under this Module"
                    });
                }
                return res.status(200).json({
                    success: 1,
                    data: results
                });
            })
        })
    },
    nursestationinsert: (req, res) => {
        const body = req.body;
        FindNursingStationExist(body, (error, results) => {
            if (error) {
                return res.status(200).json({
                    success: 1,
                    message: "Error in fetchin data"
                })
            }
            if (results.length > 0) {
                return res.status(200).json({
                    success: 3,
                    message: 'The FeedBack Already Present'
                })
            }

            nursestationinsert(body, (error, results) => {
                if (error) {
                    return res.status(200).json({
                        success: 1,
                        message: error
                    })
                }
                return res.status(200).json({
                    success: 2,
                    message: "Inserted Successfully",
                })

            })

        })
    },
    getallnursestation: (req, res) => {
        getallnursestation((error, results) => {
            if (error) {
                return res.status(200).json({
                    success: 1,
                    message: "Error in fetching data!"
                })
            }
            if (results.length === 0) {
                return res.status(200).json({
                    success: 0,
                    message: 'No data Found'
                })
            }
            if (results.length > 0) {
                return res.status(200).json({
                    success: 2,
                    message: "Successfully Fetched Data",
                    data: results
                })
            }
        })
    },
    updatenursestation: (req, res) => {
        const body = req.body;
        updatenursestation(body, (error, results) => {
            if (error) {
                return res.status(200).json({
                    success: 1,
                    message: error
                })
            }
            return res.status(200).json({
                success: 2,
                message: "Updated Successfully",
            })

        })
    },
    getpatientfeedback: (req, res) => {
        const data = req.body
        getpatientfeedback(data, (error, results) => {
            if (error) {
                return res.status(200).json({
                    success: 1,
                    message: error
                })
            }
            if (results.length === 0) {
                return res.status(200).json({
                    success: 0,
                    message: 'No data Found',
                    data: []
                })
            }
            return res.status(200).json({
                success: 2,
                message: "Fetched Successfully",
                data: results
            })
        })
    },
    insertbddetail: async (req, res) => {
        const { bedinfo } = req.body;

        try {
            // Step 1: Check if beds already exist
            const bedResults = await new Promise((resolve, reject) => {
                CheckBedAlreadyPresent(bedinfo, (error, results) => {
                    if (error) reject(error);
                    resolve(results);
                });
            });

            const existingBdcNos = bedResults.flat().map(item => ({
                BDC_NO: item.fb_bdc_no,
                fb_bed_slno: item.fb_bed_slno
            }));

            // Step 2: Filter beds to insert and beds to update
            const bedsToInsert = bedinfo.filter(item =>
                !existingBdcNos.some(existing => existing.BDC_NO === item.BDC_NO)
            );

            const bedsToUpdate = bedinfo.reduce((acc, item) => {
                const matchingBed = existingBdcNos.find(existing => existing.BDC_NO === item.BDC_NO);
                if (matchingBed) {
                    return [...acc, { ...item, fb_bed_slno: matchingBed.fb_bed_slno }];
                }
                return acc;
            }, []);

            // Step 3: Insert beds if necessary
            if (bedsToInsert.length > 0) {
                await new Promise((resolve, reject) => {
                    insertbddetail(bedsToInsert, (error, results) => {
                        if (error) reject(error);
                        resolve(results);
                    });
                });
            }
            // Step 4: Update beds if necessary
            if (bedsToUpdate.length > 0) {
                await new Promise((resolve, reject) => {
                    updatebeddetail(bedsToUpdate, (error, results) => {
                        if (error) reject(error);
                        resolve(results);
                    });
                });
            }

            // Step 5: Check if room types already exist
            const roomResults = await new Promise((resolve, reject) => {
                CheckRoomTypeAlreadyPreseint(bedinfo, (error, results) => {
                    if (error) reject(error);
                    resolve(results);
                });
            });

            const existingrtNos = roomResults.flat().map(item => ({
                RT_CODE: item.fb_rt_code,
                fb_rmtp_slno: item.fb_rmtp_slno
            }));

            // Step 6: Filter room types to insert and room types to update
            const roomTypesToInsert = bedinfo.filter(item =>
                !existingrtNos.some(existing => existing.RT_CODE === item.RT_CODE)).reduce((acc, item) => {
                    // Add the item only if its RT_CODE is not already present in the accumulator
                    if (!acc.some(existing => existing.RT_CODE === item.RT_CODE)) {
                        return [...acc, item]; // Use spread operator to add the item
                    }
                    return acc;
                }, []);


            const roomTypesToUpdate = bedinfo.reduce((acc, item) => {
                const matchingRoomType = existingrtNos.find(existing => existing.RT_CODE === item.RT_CODE);
                if (matchingRoomType) {
                    return [...acc, { ...item, fb_rmtp_slno: matchingRoomType.fb_rmtp_slno }];
                }
                return acc;
            }, []);

            // Step 7: Insert room types if necessary
            if (roomTypesToInsert.length > 0) {
                await new Promise((resolve, reject) => {
                    insertrtdetail(roomTypesToInsert, (error, results) => {
                        if (error) reject(error);
                        resolve(results);
                    });
                });
            }

            // Step 8: Update room types if necessary
            if (roomTypesToUpdate.length > 0) {
                await new Promise((resolve, reject) => {
                    updatertdetail(roomTypesToUpdate, (error, results) => {
                        if (error) reject(error);
                        resolve(results);
                    });
                });
            }
            // Return success response if all operations are successful
            return res.status(200).json({
                success: 2,
                message: 'Successfully inserted and updated Data!'
            });
        } catch (error) {
            // Return error response if any operation fails
            return res.status(200).json({
                success: 0,
                message: error.message || error
            });
        }
    },

    // inserting patient detail RoomMaster detail Room Catergory Detail AdmsReasons and other 
    insertptdetailmlora: async (req, res) => {
        const { ptdetail } = req.body;
        CheckpatientAlreadyPresent(ptdetail, (error, results) => {
            if (error) {
                return res.status(200).json({
                    success: 1,
                    message: error
                })
            }

            const existingPatient = results.flat().map(pat => ({
                IP_NO: pat.fb_ip_no,
                PT_NO: pat.fb_pt_no,
                fb_ipad_slno: pat.fb_ipad_slno
            }));

            const patientToInsert = ptdetail.filter(item =>
                !existingPatient.some(exit => exit.IP_NO === item.IP_NO && exit.PT_NO === item.PT_NO)
            );

            const patientToUpdate =
                ptdetail.reduce((acc, item) => {
                    const matchingPatient =
                        existingPatient.find(existing => existing.IP_NO === item.IP_NO && existing.PT_NO === item.PT_NO);
                    if (matchingPatient) {
                        return [...acc, { ...item, fb_ipad_slno: matchingPatient.fb_ipad_slno }];
                    }
                    return acc;
                }, []);

            if (patientToInsert.length > 0) {
                insertPatientDetail(patientToInsert, (error, results) => {
                    if (error) {
                        return res.status(200).json({
                            success: 1,
                            message: error
                        })
                    }
                })
            }

            if (patientToUpdate.length > 0) {
                updatePatientDetail(patientToUpdate, (error, results) => {
                    if (error) {
                        return res.status(200).json({
                            success: 1,
                            message: error
                        })
                    }
                })
            };

            //room master details
            CheckRoomsinMasterPresent(ptdetail, (error, results) => {
                if (error) {
                    return res.status(200).json({
                        success: 1,
                        message: error
                    })
                }
                const existingRooms = results.flat().map(item => ({
                    RM_CODE: item.fb_rm_code,
                    fb_rm_slno: item.fb_rm_slno
                }));

                const roommasterToInsert = ptdetail.filter(item =>
                    !existingRooms.some(existing => existing.RM_CODE === item.RM_CODE)).reduce((acc, item) => {
                        // Add the item only if its RT_CODE is not already present in the accumulator
                        if (!acc.some(existing => existing.RM_CODE === item.RM_CODE)) {
                            return [...acc, item]; // Use spread operator to add the item
                        }
                        return acc;
                    }, []);

                const roommasterToUpdate = ptdetail.reduce((acc, item) => {
                    const matchingRoomType = existingRooms.find(existing => existing.RM_CODE === item.RM_CODE);
                    if (matchingRoomType) {
                        return [...acc, { ...item, fb_rm_slno: matchingRoomType.fb_rm_slno }];
                    }
                    return acc;
                }, []);

                if (roommasterToInsert.length > 0) {
                    insertRoomMasterdetail(roommasterToInsert, (error, results) => {
                        if (error) {
                            return res.status(200).json({
                                success: 1,
                                message: error
                            })
                        }
                    })
                }
                if (roommasterToUpdate.length > 0) {
                    updateRoomMasterDetail(roommasterToUpdate, (error, results) => {
                        if (error) {
                            return res.status(200).json({
                                success: 1,
                                message: error
                            })
                        }
                    })
                };
            });

            //admn reason master insertion and upadation
            CheckadmnReasonsExits(ptdetail, (error, results) => {
                if (error) {
                    return res.status(200).json({
                        success: 1,
                        message: error
                    })
                }
                const existingAdmnReason = results.flat().map(item => ({
                    RS_CODE: item.fb_rs_code,
                    fb_adrn_slno: item.fb_adrn_slno
                }));

                const admnReasonToInsert = ptdetail.filter(item =>
                    !existingAdmnReason.some(existing => existing.RS_CODE === item.RS_CODE)).reduce((acc, item) => {
                        // Add the item only if its RT_CODE is not already present in the accumulator
                        if (!acc.some(existing => existing.RS_CODE === item.RS_CODE)) {
                            return [...acc, item]; // Use spread operator to add the item
                        }
                        return acc;
                    }, []);

                const admnReasonToUpdate = ptdetail.reduce((acc, item) => {
                    const matchingadmnreason = existingAdmnReason.find(existing => existing.RS_CODE === item.RS_CODE);
                    if (matchingadmnreason) {
                        return [...acc, { ...item, fb_adrn_slno: matchingadmnreason.fb_adrn_slno }];
                    }
                    return acc;
                }, []);


                if (admnReasonToInsert.length > 0) {
                    insertadminReasons(admnReasonToInsert, (error, results) => {
                        if (error) {
                            return res.status(200).json({
                                success: 1,
                                message: error
                            })
                        }
                    })
                }

                if (admnReasonToUpdate.length > 0) {
                    updateadmnReasons(admnReasonToUpdate, (error, results) => {
                        if (error) {
                            return res.status(200).json({
                                success: 1,
                                message: error
                            })
                        }
                    })
                };
            })

            //Room Category Master insertion and updation
            CheckRoomCategoryExists(ptdetail, (error, results) => {
                if (error) {
                    return res.status(200).json({
                        success: 1,
                        message: error
                    })
                }
                const ExistingroomCategory = results.flat().map(item => ({
                    RC_CODE: item.fb_rc_code,
                    fb_rc_slno: item.fb_rc_slno
                }));

                const RoomCategoryInsert = ptdetail.filter(item =>
                    !ExistingroomCategory.some(existing => existing.RC_CODE === item.RC_CODE)).reduce((acc, item) => {
                        // Add the item only if its RT_CODE is not already present in the accumulator
                        if (!acc.some(existing => existing.RC_CODE === item.RC_CODE)) {
                            return [...acc, item]; // Use spread operator to add the item
                        }
                        return acc;
                    }, []);

                const RoomCategoryUpdate = ptdetail.reduce((acc, item) => {
                    const matchingroomcategory = ExistingroomCategory.find(existing => existing.RC_CODE === item.RC_CODE);
                    if (matchingroomcategory) {
                        return [...acc, { ...item, fb_rc_slno: matchingroomcategory.fb_rc_slno }];
                    }
                    return acc;
                }, []);


                if (RoomCategoryInsert.length > 0) {
                    insertRoomCategoryDetail(RoomCategoryInsert, (error, results) => {
                        if (error) {
                            return res.status(200).json({
                                success: 1,
                                message: error
                            })
                        }
                    })
                }

                if (RoomCategoryUpdate.length > 0) {
                    UpdateRoomCategoryDetail(RoomCategoryUpdate, (error, results) => {
                        if (error) {
                            return res.status(200).json({
                                success: 1,
                                message: error
                            })
                        }
                    })
                };
            })

            return res.status(200).json({
                success: 2,
                message: "Success fully inserted and Created Data...?"
            });
        })
    },
    getNursingBed: (req, res) => {
        const data = req.body;
        getNursingBed(data, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 1,
                    message: 'No Data Found'
                })
            }
            return res.status(200).json({
                success: 2,
                data: results,
            });
        })
    },
    getCurrentPatient: (req, res) => {
        const body = req.body;
        getCurrentPatient(body, (err, results) => {
            if (err) {
                console.log(err);

                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 1,
                    message: 'No Data Found',
                    data: [],
                })
            }
            return res.status(200).json({
                success: 2,
                data: results,

            });
        });
    },
    getallblockedbed: (req, res) => {
        getallblockedbed((error, results) => {
            if (error) {
                return res.status(200).json({
                    success: 0,
                    message: error
                })
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 1,
                    message: 'No Data Found',
                    data: [],
                })
            }
            return res.status(200).json({
                success: 2,
                data: results,

            });
        })
    },
    insertbedremarks: (req, res) => {
        const data = req.body;
        insertbedremarks(data, (error, results) => {
            if (error) {
                return res.status(200).json({
                    success: 0,
                    message: error
                })
            }
            return res.status(200).json({
                success: 2,
                message: 'Successfully Inserted Remarks'

            });
        })
    },
    getllbedremarks: (req, res) => {
        getllbedremarks((error, results) => {
            if (error) {
                return res.status(200).json({
                    success: 0,
                    message: error
                })
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 1,
                    message: 'No Data Found',
                    data: [],
                })
            }
            return res.status(200).json({
                success: 2,
                data: results,

            });
        })
    },
    getempdetail: (req, res) => {
        const id = req.params.id;
        getempdetail(id, (err, results) => {
            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 2,
                data: results
            });
        });
    },


}

