const { replyQuery } = require("../complaint_assign/complaintAssign.service");
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
    // CheckBedAlreadyPresent,
    // insertbddetail,
    // updatebeddetail,
    // CheckRoomTypeAlreadyPreseint,
    // insertrtdetail,
    // updatertdetail,
    // CheckpatientAlreadyPresent,
    // insertPatientDetail,
    // updatePatientDetail,
    // CheckRoomsinMasterPresent,
    // insertRoomMasterdetail,
    // updateRoomMasterDetail,
    // updateadmnReasons,
    // insertadminReasons,
    // CheckadmnReasonsExits,
    // CheckRoomCategoryExists,
    // insertRoomCategoryDetail,
    // UpdateRoomCategoryDetail,
    getNursingBed,
    getCurrentPatient,
    getallblockedbed,
    insertbedremarks,
    getllbedremarks,
    getempdetail,
    CheckIfRemarkAlreadyExist,
    FetchInsertIdBedRemark,
    InsertBedRemarkDetail,
    getbedremarkDetail,
    updatebedremarks,
    getberremarkstatus,
    getallHousekeepingBeds,
    getallroomdetail,
    getallbedmaster,
    FindRoomAlreadyPresent,
    insertroommaster,
    updateroommaster,
    getallnewroomdetail,
    getAllComplaintDetail,
    complaintregistraion,
    UpdateSeiralNos,
    fetchcurrentserialnos,
    getcomplaintdetail,
    rectifycomplaint,
    UpdateComplaintDetailTable,
    insertassetitem,
    getallassetItems,
    updateassetitem,
    getdepassetonly,
    insertroomassetdetail,
    getroomassetdetail,
    updateroomassetdetail,
    FindAlreadyAssetExist,
    getallroomassetdata,
    updatebedremarksfromComplaint,
    insertroomchecklist,
    updateroomchecklist,
    getroomchecklist,
    getdischargeentrybed,
    CheckProCheckBedPresent,
    insertprocheckbed,
    InsertProCheckListDetail,
    UpdateProCheckListDetail,
    getprochecklistdetail,
    updateprocheckbed,
    getprocheckbed,
    getprocheckcompletebed,
    insertAssetDetail,
    insertprocheckdetl,
    UpdateBedRemarkDetail,
    insertdischargeroomitem,
    updatedischargeroomitem,
    getallhkitem,
    getallhkactiveitem,
    inserthkempdtl,
    updatehkempdtl,
    getallhkempdtl,
    CheckEmployeeAlreadyExist,
    getfeedbackcount,
    inserthkbedassign,
    getallassignedbed,
    getalldischargeform,
    UpdateAssignedBed,
    insertipfollowup,
    getallipfollowup,
    getallscheduledate,
    updateipfollowup,
    insertDefaultPtImpression,
    getdischargepatient,
    getCurrentCompany,
    getptimpression,
    insertimpression,
    insertimppatientRemark,
    fetchimpremark,
    getrelative,
    getbirthdetail,
    patientnotresponding,
    getpatientnotresponding,
    getstarcount,
    getcategorycount,
    getnursingstaiton,
    getTransferHistory,
    getDischargepatient,
    FindhkalreadyExist,
    updatehkcheckbed,
    CheckBedAlreadyAssigned,
    UpdateHkAssignedBed,
    insertHkdetails,
    gethkcheckdtl,
    gethkcomplaintdetails,
    gethkbedDetails,
    getchecklistbed,
    getallComplaintType,
    getCommonFeedbackReport,
    getIpFeedbackReport,
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
        const { fb_answers, fb_ip_num, fb_patient_num, fb_patient_name, fb_patient_mob, fdmast_slno, fb_default_quest,
            fb_default_reamark, create_user } = body;

        UpdateSerialAnswerMaster((error, results) => {

            if (error) {
                return res.status(200).json({
                    success: 1,
                    message: "Error in updation serial numbers"
                })
            }
            fetchSerialAnswerMaster((error, results) => {
                if (error) {
                    return res.status(200).json({
                        success: 0,
                        message: "Error in fetching Data!"
                    })
                }

                // getting transaction slno for the each patients
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
                // object contain defult question answer
                const impanswers = {
                    answer: fb_default_quest,
                    fb_transact_slno: fb_transact_slno_value,
                    create_user: create_user
                }

                const impremark = {
                    fb_transact_slno: fb_transact_slno_value,
                    remark: fb_default_reamark,
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
                            return res.status(200).json({
                                success: 1,
                                message: error
                            })
                        }
                    })


                    // insert default question answer and details
                    if (fdmast_slno === 8 && fdmast_slno != undefined) {
                        insertDefaultPtImpression(impanswers, (error, results) => {

                            if (error) {
                                return res.status(200).json({
                                    success: 1,
                                    message: error
                                })
                            }
                        })
                    }

                    // insertdefault reamarks
                    if (fdmast_slno === 8 && fdmast_slno != undefined) {
                        insertimppatientRemark(impremark, (err, results) => {
                            if (err) {
                                return res.status(400).json({
                                    success: 0,
                                    message: err
                                });
                            }

                        });
                    }
                    return res.status(200).json({
                        success: 2,
                        message: "Inserted Successfully",
                    })
                })

            })
        })
    },
    getalluserfeedback: (req, res) => {
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
                    success: 2,
                    message: 'No Data founded',
                    data: []
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
    insertHkdetails: (req, res) => {
        const body = req.body;
        const { data, fb_bed_slno, fb_hk_bd_status, fb_hk_remark, fb_hk_emp_assign } = body;

        const assignEmployeee = JSON.stringify(fb_hk_emp_assign);

        FindhkalreadyExist(fb_bed_slno, (error, results) => {
            if (error) {
                return res.status(200).json({
                    success: 1,
                    message: "Error in fetchin data"
                })
            }

            const Bed_slno = results?.[0]?.fb_hk_slno;

            const updateData = {
                fb_hk_slno: Bed_slno,
                fb_hk_bed_status: fb_hk_bd_status,
                fb_hk_bed_remark: fb_hk_remark,
                assignEmployeee: assignEmployeee,
                fb_hk_check_status: fb_hk_bd_status //=== 1 ? 1 : 2
            };

            const HkCheklistData = data?.map((val, index) => {
                const insertData = {
                    fb_hk_slno: Bed_slno,
                    fb_hk_rm_cklist_slno: val?.fb_hk_rm_cklist_slno,
                    fb_hk_rm_item_condition: val?.ispresent
                }
                return insertData
            });

            updatehkcheckbed(updateData, (error, results) => {
                if (error) {
                    return res.status(200).json({
                        success: 1,
                        message: error
                    })
                }
            });

            insertHkdetails(HkCheklistData, (error, results) => {
                if (error) {
                    return res.status(200).json({
                        success: 1,
                        message: error
                    })
                }
            });

            return res.status(200).json({
                success: 2,
                message: 'Inserted Successfully'
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
    getfeedbackcount: (req, res) => {
        getfeedbackcount((error, results) => {
            if (error) {
                return res.status(200).json({
                    success: 1,
                    message: "Error in fetching data!"
                })
            }
            if (results.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: 'No data Found',
                    data: 0
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



    // insertbddetail: async (req, res) => {
    //     const { bedinfo } = req.body;

    //     try {
    //         // Step 1: Check if beds already exist
    //         const bedResults = await new Promise((resolve, reject) => {
    //             CheckBedAlreadyPresent(bedinfo, (error, results) => {
    //                 if (error) reject(error);
    //                 resolve(results);
    //             });
    //         });

    //         const existingBdcNos = bedResults.flat().map(item => ({
    //             BDC_NO: item.fb_bdc_no,
    //             fb_bed_slno: item.fb_bed_slno
    //         }));

    //         // Step 2: Filter beds to insert and beds to update
    //         const bedsToInsert = bedinfo.filter(item =>
    //             !existingBdcNos.some(existing => existing.BDC_NO === item.BDC_NO)
    //         );

    //         const bedsToUpdate = bedinfo.reduce((acc, item) => {
    //             const matchingBed = existingBdcNos.find(existing => existing.BDC_NO === item.BDC_NO);
    //             if (matchingBed) {
    //                 return [...acc, { ...item, fb_bed_slno: matchingBed.fb_bed_slno }];
    //             }
    //             return acc;
    //         }, []);

    //         // Step 3: Insert beds if necessary
    //         if (bedsToInsert.length > 0) {
    //             await new Promise((resolve, reject) => {
    //                 insertbddetail(bedsToInsert, (error, results) => {
    //                     if (error) reject(error);
    //                     resolve(results);
    //                 });
    //             });
    //         }
    //         // Step 4: Update beds if necessary
    //         if (bedsToUpdate.length > 0) {
    //             await new Promise((resolve, reject) => {
    //                 updatebeddetail(bedsToUpdate, (error, results) => {
    //                     if (error) reject(error);
    //                     resolve(results);
    //                 });
    //             });
    //         }

    //         // Step 5: Check if room types already exist
    //         const roomResults = await new Promise((resolve, reject) => {
    //             CheckRoomTypeAlreadyPreseint(bedinfo, (error, results) => {
    //                 if (error) reject(error);
    //                 resolve(results);
    //             });
    //         });

    //         const existingrtNos = roomResults.flat().map(item => ({
    //             RT_CODE: item.fb_rt_code,
    //             fb_rmtp_slno: item.fb_rmtp_slno
    //         }));

    //         // Step 6: Filter room types to insert and room types to update
    //         const roomTypesToInsert = bedinfo.filter(item =>
    //             !existingrtNos.some(existing => existing.RT_CODE === item.RT_CODE)).reduce((acc, item) => {
    //                 // Add the item only if its RT_CODE is not already present in the accumulator
    //                 if (!acc.some(existing => existing.RT_CODE === item.RT_CODE)) {
    //                     return [...acc, item]; // Use spread operator to add the item
    //                 }
    //                 return acc;
    //             }, []);


    //         const roomTypesToUpdate = bedinfo.reduce((acc, item) => {
    //             const matchingRoomType = existingrtNos.find(existing => existing.RT_CODE === item.RT_CODE);
    //             if (matchingRoomType) {
    //                 return [...acc, { ...item, fb_rmtp_slno: matchingRoomType.fb_rmtp_slno }];
    //             }
    //             return acc;
    //         }, []);

    //         // Step 7: Insert room types if necessary
    //         if (roomTypesToInsert.length > 0) {
    //             await new Promise((resolve, reject) => {
    //                 insertrtdetail(roomTypesToInsert, (error, results) => {
    //                     if (error) reject(error);
    //                     resolve(results);
    //                 });
    //             });
    //         }

    //         // Step 8: Update room types if necessary
    //         if (roomTypesToUpdate.length > 0) {
    //             await new Promise((resolve, reject) => {
    //                 updatertdetail(roomTypesToUpdate, (error, results) => {
    //                     if (error) reject(error);
    //                     resolve(results);
    //                 });
    //             });
    //         }
    //         // Return success response if all operations are successful
    //         return res.status(200).json({
    //             success: 2,
    //             message: 'Successfully inserted and updated Data!'
    //         });
    //     } catch (error) {
    //         // Return error response if any operation fails
    //         return res.status(200).json({
    //             success: 0,
    //             message: error.message || error
    //         });
    //     }
    // },




    // not using saved for later
    // inserting patient detail RoomMaster detail Room Catergory Detail AdmsReasons and other  1767
    // insertptdetailmlora: async (req, res) => {
    //     const { ptdetail } = req.body;
    //     CheckpatientAlreadyPresent(ptdetail, (error, results) => {
    //         if (error) {
    //             return res.status(200).json({
    //                 success: 1,
    //                 message: error
    //             })
    //         }

    //         const existingPatient = results.flat().map(pat => ({
    //             IP_NO: pat.fb_ip_no,
    //             PT_NO: pat.fb_pt_no,
    //             fb_ipad_slno: pat.fb_ipad_slno
    //         }));

    //         const patientToInsert = ptdetail.filter(item =>
    //             !existingPatient.some(exit => exit.IP_NO === item.IP_NO && exit.PT_NO === item.PT_NO)
    //         );

    //         const patientToUpdate =
    //             ptdetail.reduce((acc, item) => {
    //                 const matchingPatient =
    //                     existingPatient.find(existing => existing.IP_NO === item.IP_NO && existing.PT_NO === item.PT_NO);
    //                 if (matchingPatient) {
    //                     return [...acc, { ...item, fb_ipad_slno: matchingPatient.fb_ipad_slno }];
    //                 }
    //                 return acc;
    //             }, []);

    //         if (patientToInsert.length > 0) {
    //             insertPatientDetail(patientToInsert, (error, results) => {
    //                 if (error) {
    //                     return res.status(200).json({
    //                         success: 1,
    //                         message: error
    //                     })
    //                 }
    //             })
    //         }

    //         if (patientToUpdate.length > 0) {
    //             updatePatientDetail(patientToUpdate, (error, results) => {
    //                 if (error) {
    //                     return res.status(200).json({
    //                         success: 1,
    //                         message: error
    //                     })
    //                 }
    //             })
    //         };

    //         //room master details
    //         CheckRoomsinMasterPresent(ptdetail, (error, results) => {
    //             if (error) {
    //                 return res.status(200).json({
    //                     success: 1,
    //                     message: error
    //                 })
    //             }
    //             const existingRooms = results.flat().map(item => ({
    //                 RM_CODE: item.fb_rm_code,
    //                 fb_rm_slno: item.fb_rm_slno
    //             }));

    //             const roommasterToInsert = ptdetail.filter(item =>
    //                 !existingRooms.some(existing => existing.RM_CODE === item.RM_CODE)).reduce((acc, item) => {
    //                     // Add the item only if its RT_CODE is not already present in the accumulator
    //                     if (!acc.some(existing => existing.RM_CODE === item.RM_CODE)) {
    //                         return [...acc, item]; // Use spread operator to add the item
    //                     }
    //                     return acc;
    //                 }, []);

    //             const roommasterToUpdate = ptdetail.reduce((acc, item) => {
    //                 const matchingRoomType = existingRooms.find(existing => existing.RM_CODE === item.RM_CODE);
    //                 if (matchingRoomType) {
    //                     return [...acc, { ...item, fb_rm_slno: matchingRoomType.fb_rm_slno }];
    //                 }
    //                 return acc;
    //             }, []);

    //             if (roommasterToInsert.length > 0) {
    //                 insertRoomMasterdetail(roommasterToInsert, (error, results) => {
    //                     if (error) {
    //                         return res.status(200).json({
    //                             success: 1,
    //                             message: error
    //                         })
    //                     }
    //                 })
    //             }
    //             if (roommasterToUpdate.length > 0) {
    //                 updateRoomMasterDetail(roommasterToUpdate, (error, results) => {
    //                     if (error) {
    //                         return res.status(200).json({
    //                             success: 1,
    //                             message: error
    //                         })
    //                     }
    //                 })
    //             };
    //         });

    //         //admn reason master insertion and upadation
    //         CheckadmnReasonsExits(ptdetail, (error, results) => {
    //             if (error) {
    //                 return res.status(200).json({
    //                     success: 1,
    //                     message: error
    //                 })
    //             }
    //             const existingAdmnReason = results.flat().map(item => ({
    //                 RS_CODE: item.fb_rs_code,
    //                 fb_adrn_slno: item.fb_adrn_slno
    //             }));

    //             const admnReasonToInsert = ptdetail.filter(item =>
    //                 !existingAdmnReason.some(existing => existing.RS_CODE === item.RS_CODE)).reduce((acc, item) => {
    //                     // Add the item only if its RT_CODE is not already present in the accumulator
    //                     if (!acc.some(existing => existing.RS_CODE === item.RS_CODE)) {
    //                         return [...acc, item]; // Use spread operator to add the item
    //                     }
    //                     return acc;
    //                 }, []);

    //             const admnReasonToUpdate = ptdetail.reduce((acc, item) => {
    //                 const matchingadmnreason = existingAdmnReason.find(existing => existing.RS_CODE === item.RS_CODE);
    //                 if (matchingadmnreason) {
    //                     return [...acc, { ...item, fb_adrn_slno: matchingadmnreason.fb_adrn_slno }];
    //                 }
    //                 return acc;
    //             }, []);


    //             if (admnReasonToInsert.length > 0) {
    //                 insertadminReasons(admnReasonToInsert, (error, results) => {
    //                     if (error) {
    //                         return res.status(200).json({
    //                             success: 1,
    //                             message: error
    //                         })
    //                     }
    //                 })
    //             }

    //             if (admnReasonToUpdate.length > 0) {
    //                 updateadmnReasons(admnReasonToUpdate, (error, results) => {
    //                     if (error) {
    //                         return res.status(200).json({
    //                             success: 1,
    //                             message: error
    //                         })
    //                     }
    //                 })
    //             };
    //         })

    //         //Room Category Master insertion and updation
    //         CheckRoomCategoryExists(ptdetail, (error, results) => {
    //             if (error) {
    //                 return res.status(200).json({
    //                     success: 1,
    //                     message: error
    //                 })
    //             }
    //             const ExistingroomCategory = results.flat().map(item => ({
    //                 RC_CODE: item.fb_rc_code,
    //                 fb_rc_slno: item.fb_rc_slno
    //             }));

    //             const RoomCategoryInsert = ptdetail.filter(item =>
    //                 !ExistingroomCategory.some(existing => existing.RC_CODE === item.RC_CODE)).reduce((acc, item) => {
    //                     // Add the item only if its RT_CODE is not already present in the accumulator
    //                     if (!acc.some(existing => existing.RC_CODE === item.RC_CODE)) {
    //                         return [...acc, item]; // Use spread operator to add the item
    //                     }
    //                     return acc;
    //                 }, []);

    //             const RoomCategoryUpdate = ptdetail.reduce((acc, item) => {
    //                 const matchingroomcategory = ExistingroomCategory.find(existing => existing.RC_CODE === item.RC_CODE);
    //                 if (matchingroomcategory) {
    //                     return [...acc, { ...item, fb_rc_slno: matchingroomcategory.fb_rc_slno }];
    //                 }
    //                 return acc;
    //             }, []);


    //             if (RoomCategoryInsert.length > 0) {
    //                 insertRoomCategoryDetail(RoomCategoryInsert, (error, results) => {
    //                     if (error) {
    //                         return res.status(200).json({
    //                             success: 1,
    //                             message: error
    //                         })
    //                     }
    //                 })
    //             }

    //             if (RoomCategoryUpdate.length > 0) {
    //                 UpdateRoomCategoryDetail(RoomCategoryUpdate, (error, results) => {
    //                     if (error) {
    //                         return res.status(200).json({
    //                             success: 1,
    //                             message: error
    //                         })
    //                     }
    //                 })
    //             };
    //         })

    //         return res.status(200).json({
    //             success: 2,
    //             message: "Success fully inserted and Created Data...?"
    //         });
    //     })
    // },


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
    getchecklistbed: (req, res) => {
        getchecklistbed((error, results) => {
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
        const Body = req.body;
        const { fb_bed_slno,
            fb_bd_code,
            fb_bdc_no,
            fb_ns_code,
            fb_bed_status,
            fb_bed_remark,
            fb_bed_service_status,
            fb_overall_remarks,
            fb_overall_condition,
            fb_initail_checked,
            fb_initial_emp_assign,
            fb_emp_assign,
            create_user,
            fb_complaint_postdata,
            fb_final_checked,
            data } = Body;

        const assignEmployeee = JSON.stringify(fb_emp_assign);
        const assingintialEmployye = JSON.stringify(fb_initial_emp_assign)

        const insertdata = {
            fb_bed_slno: fb_bed_slno,
            fb_bd_code: fb_bd_code,
            fb_bdc_no: fb_bdc_no,
            fb_ns_code: fb_ns_code,
            fb_bed_status: fb_bed_status,
            fb_bed_service_status: fb_bed_service_status,
            fb_bed_remark: fb_bed_remark,
            fb_overall_remarks: fb_overall_remarks,
            fb_overall_condition: fb_overall_condition,
            fb_initail_checked: fb_initail_checked,
            fb_initial_emp_assign: assingintialEmployye,
            fb_emp_assign: assignEmployeee,
            fb_final_checked: fb_final_checked,
            create_user: create_user
        }
        const searchData = {
            fb_bed_slno: fb_bed_slno,
            fb_bd_code: fb_bd_code
        }
        CheckIfRemarkAlreadyExist(searchData, (error, results) => {
            if (error) {
                return res.status(200).json({
                    success: 0,
                    message: error
                })
            }
            const searchDetailId = results[0]?.fb_bed_rmk_slno
            if (results.length === 0 || !results) {
                insertbedremarks(insertdata, (error, results) => {
                    if (error) {
                        return res.status(200).json({
                            success: 0,
                            message: error
                        })
                    }
                    FetchInsertIdBedRemark(searchData, (error, results) => {
                        if (error) {
                            return res.status(200).json({
                                success: 0,
                                message: error
                            })
                        }
                        const DetailId = results[0]?.fb_bed_rmk_slno
                        const detailData = {
                            detail: data,
                            fb_bed_rmk_slno: DetailId,
                            create_user: create_user
                        }
                        if (results.length > 0 && DetailId) {
                            InsertBedRemarkDetail(detailData, (error, results) => {
                                if (error) {
                                    return res.status(200).json({
                                        success: 0,
                                        message: error
                                    })
                                }
                            })
                        } else {
                            return res.status(200).json({
                                success: 0,
                                message: 'Error in inserting Bed Detail'
                            });
                        }
                    })

                })
            }

            if (results.length > 0) {
                const isComplaint = fb_complaint_postdata === 1;
                const update_data = isComplaint ? {
                    fb_bed_slno,
                    fb_bed_rmk_slno: searchDetailId
                } : {
                    fb_bed_slno,
                    fb_bd_code,
                    fb_bdc_no,
                    fb_ns_code,
                    fb_bed_status,
                    fb_bed_service_status,
                    fb_bed_remark,
                    fb_overall_remarks,
                    fb_overall_condition,
                    fb_final_checked,
                    fb_emp_assign: assignEmployeee,
                    edit_user: create_user,
                    fb_bed_rmk_slno: searchDetailId
                };

                const updateFn = isComplaint ? updatebedremarksfromComplaint : updatebedremarks;

                updateFn(update_data, (err) => {
                    if (err) return res.status(200).json({ success: 0, message: err });
                    const detailData = {
                        detail: data,
                        fb_bed_rmk_slno: searchDetailId,
                        create_user
                    };

                    InsertBedRemarkDetail(detailData, (err) => {
                        if (err) return res.status(200).json({ success: 0, message: err });
                    });
                });
            }

            return res.status(200).json({
                success: 2,
                message: 'Successfully Inseted Data'

            });
        })
    },
    //this is not uisng
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

    getalldischargeform: (req, res) => {
        const data = req.body;
        getalldischargeform(data, (error, results) => {
            if (error) {
                return res.status(200).json({
                    success: 0,
                    message: error
                })
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 2,
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
    insertipfollowup: (req, res) => {
        const { ipdata, Schedule_date, create_user, fb_pro_remark } = req.body;
        const combined = {
            ...ipdata,
            Schedule_date,
            fb_pro_remark,
            create_user
        };
        insertipfollowup(combined, (error, results) => {
            if (error) {
                return res.status(200).json({
                    success: 0,
                    message: error
                })
            }
            return res.status(200).json({
                success: 2,
                message: "inserted Sucessfully",

            });
        })
    },
    updateipfollowup: (req, res) => {
        const data = req.body;
        updateipfollowup(data, (error, results) => {
            if (error) {
                return res.status(200).json({
                    success: 0,
                    message: error
                })
            }
            return res.status(200).json({
                success: 2,
                message: "Updated Sucessfully",
            });
        })
    },

    getprochecklistdetail: (req, res) => {
        const id = req.params.id;
        getprochecklistdetail(id, (error, results) => {
            if (error) {
                return res.status(200).json({
                    success: 0,
                    message: error
                })
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 2,
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
    getallipfollowup: (req, res) => {
        const data = req.body;
        getallipfollowup(data, (err, results) => {
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

    getbedremarkDetail: (req, res) => {
        const id = req.params.id;
        getbedremarkDetail(id, (err, results) => {
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
    // complaint feedback
    complaintregistraion: (req, res) => {
        const data = req.body;
        const {
            cm_assets,
            complaint_request_slno,
            compalint_date,
            cm_location,
            create_user,
            fb_ticket,
            cm_complaint_location,
            complaint_dept_secslno
        } = data;

        const assetLength = cm_assets?.length;
        fetchcurrentserialnos((error, results) => {
            if (error) {
                return res.status(200).json({
                    success: 0,
                    message: "Error in fetching Data!"
                })
            }
            let serialCurrentValue = results[0]?.serial_current;
            let complaint_slno = serialCurrentValue;

            if (!serialCurrentValue) {
                return res.status(200).json({
                    success: 1,
                    message: "No data found"
                })
            };



            const datas = cm_assets?.map((val, index) => {
                const insertData = {
                    complaint_slno: complaint_slno + index,
                    complaint_deptslno: val?.complaint_dept_slno,
                    complaint_desc: val?.fb_asset_name,
                    complaint_request_slno: complaint_request_slno,
                    compalint_date: compalint_date,
                    compalint_status: val.complaint_status,
                    cm_location: cm_location, // only this part left
                    create_user: create_user,
                    fb_ticket: fb_ticket,
                    assigned_user: val.assigned_employee,
                    complaint_typeslno: val.fb_asset_type,
                    cm_complaint_location: cm_complaint_location,
                    complaint_dept_secslno: complaint_dept_secslno
                }
                return insertData
            });

            complaintregistraion(datas, (err, results) => {
                if (err) {
                    return res.status(400).json({
                        success: 0,
                        message: err
                    });
                }
                UpdateSeiralNos(assetLength, (error, results) => {
                    if (error) {
                        return res.status(200).json({
                            success: 0,
                            message: "Error in updating Value"
                        })
                    }
                    UpdateComplaintDetailTable(datas, (err, results) => {
                        if (err) {
                            return res.status(400).json({
                                success: 0,
                                message: err
                            });
                        }

                        return res.status(200).json({
                            success: 2,
                            message: "Successfully Inserted"
                        });

                    })

                })
            });
        })
    },

    getdepassetonly: (req, res) => {
        const id = req.params.id;
        getdepassetonly(id, (err, results) => {
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

    rectifycomplaint: (req, res) => {
        const data = req.body;
        const insertData = Array.isArray(data) ? data : [data];
        rectifycomplaint(data, (err, results) => {
            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            UpdateComplaintDetailTable(insertData, (err, results) => {
                if (err) {
                    return res.status(400).json({
                        success: 0,
                        message: err
                    });
                }
                return res.status(200).json({
                    success: 2,
                    message: "Successfully Inserted"
                });

            })
        });
    },
    insertassetitem: (req, res) => {
        const data = req.body;
        insertassetitem(data, (err, results) => {
            if (err) {

                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 2,
                message: "Successfully Inserted"
            });
        });
    },
    insertroomchecklist: (req, res) => {
        const data = req.body;
        insertroomchecklist(data, (err, results) => {
            if (err) {

                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 2,
                message: "Successfully Inserted"
            });
        });
    },
    insertdischargeroomitem: (req, res) => {
        const data = req.body;
        insertdischargeroomitem(data, (err, results) => {
            if (err) {

                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 2,
                message: "Successfully Inserted"
            });
        });
    },
    inserthkempdtl: (req, res) => {
        const data = req.body;
        CheckEmployeeAlreadyExist(data, (error, results) => {
            if (error) {

                return res.status(400).json({
                    success: 0,
                    message: error
                });
            }
            if (results?.length > 0) {
                return res.status(200).json({
                    success: 3,
                    message: "Already Exist"
                });
            }
            inserthkempdtl(data, (err, results) => {
                if (err) {
                    return res.status(400).json({
                        success: 0,
                        message: err
                    });
                }
                return res.status(200).json({
                    success: 2,
                    message: "Successfully Inserted"
                });
            });
        })
    },
    patientnotresponding: (req, res) => {
        const data = req.body;
        patientnotresponding(data, (err, results) => {
            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 2,
                message: "Successfully Inserted"
            });
        });
    },
    updateassetitem: (req, res) => {
        const data = req.body;
        updateassetitem(data, (err, results) => {
            if (err) {

                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 2,
                message: "Successfully Inserted"
            });
        });
    },
    getroomassetdetail: (req, res) => {
        getroomassetdetail((err, results) => {
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
    getberremarkstatus: (req, res) => {
        getberremarkstatus((err, results) => {
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
    getallHousekeepingBeds: (req, res) => {
        getallHousekeepingBeds((err, results) => {
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
    getallroomdetail: (req, res) => {
        getallroomdetail((err, results) => {
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
    getAllComplaintDetail: (req, res) => {
        const data = req.body;
        getAllComplaintDetail((err, results) => {
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
    getallComplaintType: (req, res) => {
        const id = req.params.id;
        getallComplaintType(id, (err, results) => {
            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Record Found",
                    data: []
                });
            }

            return res.status(200).json({
                success: 2,
                data: results
            });
        });
    },


    getallbedmaster: (req, res) => {
        getallbedmaster((err, results) => {
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
    getallassetItems: (req, res) => {
        getallassetItems((err, results) => {
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
    getallassignedbed: (req, res) => {
        const id = req.params.id;
        getallassignedbed(id, (err, results) => {
            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Record Found",
                    data: []
                });
            }

            return res.status(200).json({
                success: 2,
                data: results
            });
        });
    },
    getroomchecklist: (req, res) => {
        getroomchecklist((err, results) => {
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
    getallhkitem: (req, res) => {
        getallhkitem((err, results) => {
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
    }, getnursingstaiton: (req, res) => {
        getnursingstaiton((err, results) => {
            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length === 1) {
                return res.status(200).json({
                    success: 2,
                    message: "No Record Found",
                    data: []
                });
            }

            return res.status(200).json({
                success: 2,
                data: results
            });
        });
    },
    getallhkempdtl: (req, res) => {
        getallhkempdtl((err, results) => {
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
    getCurrentCompany: (req, res) => {
        getCurrentCompany((err, results) => {
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
    getCommonFeedbackReport: (req, res) => {
        const data = req.body;
        getCommonFeedbackReport(data, (err, results) => {
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
    getIpFeedbackReport: (req, res) => {
        const data = req.body;
        getIpFeedbackReport(data, (err, results) => {
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
    getallhkactiveitem: (req, res) => {
        getallhkactiveitem((err, results) => {
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
    getstarcount: (req, res) => {
        getstarcount((err, results) => {
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
    getcategorycount: (req, res) => {
        getcategorycount((err, results) => {
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
    getprocheckbed: (req, res) => {
        getprocheckbed((err, results) => {
            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Record Found",
                    data: []
                });
            }

            return res.status(200).json({
                success: 2,
                data: results
            });
        });
    },
    getprocheckcompletebed: (req, res) => {
        getprocheckcompletebed((err, results) => {
            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Record Found",
                    data: []
                });
            }

            return res.status(200).json({
                success: 2,
                data: results
            });
        });
    },

    insertroommaster: (req, res) => {
        const body = req.body;
        FindRoomAlreadyPresent(body, (error, results) => {
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
            insertroommaster(body, (error, results) => {
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
    updateroommaster: (req, res) => {
        const body = req.body;
        updateroommaster(body, (error, results) => {
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
    getallnewroomdetail: (req, res) => {
        getallnewroomdetail((err, results) => {
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
    getcomplaintdetail: (req, res) => {
        const id = req.params.id;
        getcomplaintdetail(id, (err, results) => {
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
    getallroomassetdata: (req, res) => {
        const id = req.params.id;
        getallroomassetdata(id, (err, results) => {
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
    insertroomassetdetail: (req, res) => {
        const data = req.body;
        FindAlreadyAssetExist(data, (err, results) => {
            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (results && results?.length > 0) {
                return res.status(200).json({
                    success: 1,
                    message: "Already Exist"
                });
            }

            insertroomassetdetail(data, (err, results) => {
                if (err) {
                    return res.status(400).json({
                        success: 0,
                        message: err
                    });
                }
                return res.status(200).json({
                    success: 2,
                    data: results
                });
            });
        });
    },
    updateroomassetdetail: (req, res) => {
        const data = req.body;
        updateroomassetdetail(data, (err, results) => {
            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 2,
                data: results
            });
        });
    },

    inserthkbedassign: (req, res) => {
        const data = req.body;
        const { fb_hk_sv_assign, fb_hk_bed_slno, fb_hk_status, create_user } = data;

        const searchData = {
            fb_hk_bed_slno: fb_hk_bed_slno,
            fb_hk_sv_assign: fb_hk_sv_assign
        };

        CheckBedAlreadyAssigned(searchData, (err, results) => {
            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }

            // if the Slno already exist change the status to 1 from 0
            const HkBedSlno = results?.[0]?.fb_hk_slno;

            const updateData = {
                fb_hk_slno: HkBedSlno,
                edit_user: create_user
            }

            if (HkBedSlno) {
                UpdateHkAssignedBed(updateData, (err, results) => {
                    if (err) {
                        return res.status(400).json({
                            success: 0,
                            message: err
                        });
                    }
                })
            } else {
                inserthkbedassign(data, (err, results) => {
                    if (err) {
                        return res.status(400).json({
                            success: 0,
                            message: err
                        });
                    }
                });
            }

            return res.status(200).json({
                success: 2,
                data: results
            });
        });
    },
    removeassign: (req, res) => {
        const data = req.body;
        UpdateAssignedBed(data, (err, results) => {
            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 2,
                data: results
            });
        });
    },


    updateroomchecklist: (req, res) => {
        const data = req.body;
        updateroomchecklist(data, (err, results) => {
            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 2,
                data: results
            });
        });
    },
    updatedischargeroomitem: (req, res) => {
        const data = req.body;
        updatedischargeroomitem(data, (err, results) => {
            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 2,
                data: results
            });
        });
    },
    updatehkempdtl: (req, res) => {
        const data = req.body;
        updatehkempdtl(data, (err, results) => {
            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 2,
                data: results
            });
        });
    },
    getptimpression: (req, res) => {
        const data = req.body;
        getptimpression(data, (err, results) => {
            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: 'No Data Found',
                    data: [],
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            });
        });
    },
    insertimpression: (req, res) => {
        const data = req.body;
        insertDefaultPtImpression(data, (err, results) => {
            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: 'No Data Found',
                    data: [],
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            });
        });
    },
    insertimpremark: (req, res) => {
        const data = req.body;
        insertimppatientRemark(data, (err, results) => {
            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 2,
                message: "Successfully inserted data"
            });
        });
    },
    fetchimpremark: (req, res) => {
        const data = req.body;
        fetchimpremark(data, (err, results) => {
            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: 'No Data Found',
                    data: [],
                })
            }
            return res.status(200).json({
                success: 2,
                data: results,
                message: 'Successfully fetched Data'
            });
        });
    },
    getrelative: (req, res) => {
        const data = req.body;
        const ipNumbers = data?.IP_NO || [];

        if (ipNumbers.length === 0) {
            return res.status(200).json({
                success: 1,
                message: 'No IpNumber Provided'
            })
        };

        getrelative(ipNumbers, (err, results) => {
            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            };

            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: 'No Data Found',
                    data: [],
                })
            };

            return res.status(200).json({
                success: 2,
                data: results,
                message: 'Successfully fetched Data'
            });
        });
    },
    getbirthdetail: (req, res) => {
        const data = req.body;
        getbirthdetail(data, (err, results) => {
            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            };

            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: 'No Data Found',
                    data: [],
                })
            };

            return res.status(200).json({
                success: 2,
                data: results,
                message: 'Successfully fetched Data'
            });
        });
    },

    //discharge
    getdischargepatient: (req, res) => {
        const data = req.body;
        const { NS_CODE, FROM_DATE, TO_DATE } = data;
        let sql = `
            SELECT 
                fb_ip_no,
                fb_ipd_date,
                fb_pt_no,
                fb_ptc_name,
                fb_ptc_sex,
                fb_ptd_dob,
                fb_ptn_yearage,
                fb_ptc_loadd1,
                fb_ptc_loadd2,
                fb_ptc_loadd3,
                fb_ptc_loadd4,
                fb_ipd_disc,
                fb_ipc_status,
                fb_dmd_date,
                fb_ptc_mobile,
                fb_doc_name,
                fb_dep_desc,
                fb_bed.fb_ns_code
            FROM
                fb_ipadmiss
                LEFT JOIN fb_bed on  fb_ipadmiss.fb_bd_code = fb_bed.fb_bd_code
            WHERE
                fb_ipd_disc IS NOT NULL AND fb_ipc_status = 'R'
        `;

        let queryParams = [];

        if (FROM_DATE) {
            sql += " AND fb_ipd_disc >= ?";
            queryParams = [...queryParams, FROM_DATE];
        }
        if (TO_DATE) {
            sql += " AND fb_ipd_disc <= ?";
            queryParams = [...queryParams, TO_DATE];
        }
        if (NS_CODE) {
            sql += " AND fb_bed.fb_ns_code = ?";
            queryParams = [...queryParams, NS_CODE];
        } sql += `
            GROUP BY
                fb_ip_no,
                fb_ipd_date,
                fb_pt_no,
                fb_ptc_name,
                fb_ptc_sex,
                fb_ptd_dob,
                fb_ptn_yearage,
                fb_ptc_loadd1,
                fb_ptc_loadd2,
                fb_ptc_loadd3,
                fb_ptc_loadd4,
                fb_ipd_disc,
                fb_ipc_status,
                fb_dmd_date,
                fb_ptc_mobile,
                fb_doc_name,
                fb_dep_desc,
                fb_bed.fb_ns_code
                `;
        getDischargepatient(sql, queryParams, (error, results) => {
            if (error) {
                return res.status(500).json({
                    success: 0,
                    message: error.message
                });
            }
            if (!results || results.length === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No data found"
                });
            }
            return res.status(200).json({
                success: 2,
                data: results
            });
        });

        // getdischargepatient(data, (err, results) => {
        //     if (err) {
        //         return res.status(400).json({
        //             success: 0,
        //             message: err
        //         });
        //     }
        //     return res.status(200).json({
        //         success: 2,
        //         data: results
        //     });
        // });
    },


    getpatientnotresponding: (req, res) => {
        const data = req.body;
        getpatientnotresponding(data, (err, results) => {
            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 2,
                data: results
            });
        });
    },

    getdischargeentrybed: (req, res) => {
        getdischargeentrybed((error, results) => {
            if (error) {
                return res.status(200).json({
                    success: 0,
                    message: error
                })
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 2,
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
    insertprocheckdetl: (req, res) => {
        const IncomingData = req.body;
        const { data, fb_bed_slno, fb_bd_code, fb_bdc_no, fb_ns_code, fb_initial_check, create_user, fb_final_check, fb_check_bed_slno, fb_initial_ovc, fb_initial_remark, fb_final_ovc, fb_final_remark } = IncomingData;
        const InsertData = { fb_bed_slno, fb_bd_code, fb_bdc_no, fb_ns_code, fb_initial_check, create_user, fb_initial_ovc, fb_initial_remark };
        const ProBedUpdateData = { fb_final_check, create_user, fb_check_bed_slno, fb_final_ovc, fb_final_remark }

        const SearchData = {
            fb_bed_slno,
            fb_bd_code
        }


        CheckProCheckBedPresent(SearchData, (error, results) => {
            if (error) {
                return res.status(200).status({
                    success: 0,
                    message: error
                })
            }
            const updateDate = results[0]?.fb_check_bed_slno;
            if (results.length === 0 && !updateDate) {
                insertprocheckbed(InsertData, (err, results) => {
                    if (err) {
                        return res.status(400).json({
                            success: 0,
                            message: err
                        });
                    }
                    const InsertId = results?.insertId
                    const DetialData = {
                        detail: data,
                        fb_check_bed_slno: InsertId,
                        create_user
                    }
                    if (InsertId) {
                        InsertProCheckListDetail(DetialData, (error, results) => {
                            if (error) {
                                return res.status(400).json({
                                    success: 0,
                                    message: err
                                });
                            }
                        })
                    }
                });
            }

            const updateData = {
                detail: data,
                fb_check_bed_slno: updateDate,
                create_user
            }
            if (updateDate && results.length > 0) {
                updateprocheckbed(ProBedUpdateData, (err, results) => {
                    if (err) {
                        return res.status(400).json({
                            success: 0,
                            message: err
                        });
                    }
                    UpdateProCheckListDetail(updateData, (error, results) => {
                        if (error) {
                            return res.status(400).json({
                                success: 0,
                                message: err
                            });
                        }
                    })
                });

            }
            return res.status(200).json({
                success: 2,
                message: "Initail Checklist Completed Successfully",
            })
        })
    },
    gethkcheckdtl: (req, res) => {
        const slno = req.body
        gethkcheckdtl(slno, (error, results) => {
            if (error) {
                return res.status(200).json({
                    success: 0,
                    message: error
                })
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 2,
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
    gethkbedDetails: (req, res) => {
        const slno = req.body
        gethkbedDetails(slno, (error, results) => {
            if (error) {
                return res.status(200).json({
                    success: 0,
                    message: error
                })
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 2,
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

    houekeepingComplaintregistration: (req, res) => {
        const data = req.body;
        const {
            cm_assets,
            complaint_request_slno,
            compalint_date,
            cm_location,
            create_user,
            complaint_deptslno,
            complaint_status,
            assigned_employee,
            cm_complaint_location,
            fb_ticket,
            complaint_dept_secslno
        } = data;
        const assetLength = cm_assets?.length;
        fetchcurrentserialnos((error, results) => {
            if (error) {
                return res.status(200).json({
                    success: 0,
                    message: "Error in fetching Data!"
                })
            };

            let serialCurrentValue = results[0]?.serial_current;
            let complaint_slno = serialCurrentValue;

            if (!serialCurrentValue) {
                return res.status(200).json({
                    success: 1,
                    message: "No data found"
                })
            };


            const datas = cm_assets?.map((val, index) => {
                const insertData = {
                    complaint_slno: complaint_slno + index,
                    complaint_deptslno: complaint_deptslno,
                    complaint_desc: val?.fb_hk_rm_cklist_name,
                    complaint_request_slno: complaint_request_slno,
                    compalint_date: compalint_date,
                    compalint_status: complaint_status,
                    cm_location: cm_location,
                    create_user: create_user,
                    assigned_user: assigned_employee,
                    complaint_typeslno: val?.fb_asset_type,
                    cm_complaint_location: cm_complaint_location,
                    fb_ticket: fb_ticket,
                    complaint_dept_secslno: complaint_dept_secslno
                }
                return insertData
            });

            complaintregistraion(datas, (err, results) => {
                if (err) {
                    return res.status(400).json({
                        success: 0,
                        message: err
                    });
                }
                UpdateSeiralNos(assetLength, (error, results) => {
                    if (error) {
                        return res.status(200).json({
                            success: 0,
                            message: "Error in updating Value"
                        })
                    }
                    UpdateComplaintDetailTable(datas, (err, results) => {
                        if (err) {
                            return res.status(400).json({
                                success: 0,
                                message: err
                            });
                        }

                        return res.status(200).json({
                            success: 2,
                            message: "Successfully Inserted"
                        });

                    })

                })

            });


        })
    },
    gethkcomplaintdetails: (req, res) => {
        const data = req.body
        gethkcomplaintdetails(data, (error, results) => {
            if (error) {
                return res.status(200).json({
                    success: 0,
                    message: error
                })
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: 'No Data Found',
                    data: [],
                })
            }
            return res.status(200).json({
                success: 2,
                data: results,

            });
        })
    }



}


