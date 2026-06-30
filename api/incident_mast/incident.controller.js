const { date } = require('joi');
const {
    IncidetDetailInsert, IncidentDetailsUpdate, UpdateMarkedIncidentDetails, deleteIncident, ErrorIncidentUpdate,
    RedosIncidentUpdate, IdentifErrorIncidentUpdate, FallsIncidentUpdate, SentinelIncidentUpdate, NearMissessIncidentUpdate,
    SearchIncidentDetails, IncidentApprovalChecks, IPErrorIncidentUpdate, IPRedosIncidentUpdate, IPIdentifErrorIncidentUpdate,
    IPFallsIncidentUpdate, IPSentinelIncidentUpdate, IPNearMissessIncidentUpdate,
    IncidentCategoryMaster,
    getAllIncidentCategory,
    IncidentCategoryUpdate,
    IncidentSubCategoryInsert,
    getAllIncidentSubCategory,
    IncidentSubCategoryUpdate,
    FindIncidentSubCategoryIfAlreadyExist,
    getPatientDetail,
    getProfessionalStaff,
    getHsPgStaffDetail,
    getAllassetDtl,
    IncidentRegistration,
    InsertIncPatientDetail,
    InsertIncStaffDetail,
    IncidentVisitorDetail,
    IncidentAssetDtl,
    getAllIncidentDetail,
    IncidentUpdation,
    getAllIncidentHodIncharge,
    InchargeApproval,
    hodApproval,
    fetchAllLevelApprovals,
    insertIncidentLevelApproval,
    updateIncidentLevelApproval,
    checkIfLevelExist,
    getAllQADIncident,
    QadApproval,
    hodRcaApproval,
    qadRcaApproval,
    hodCorrectiveApproval,
    qadPreventiveApproval,
    hodCorrectiveUpdate,
    hodPreventiveUpdate,
    qadEvalutaionUpdate,
    rcaUpdation,
    getAllCurrentLevelApproval,
    highLevelApprovals,
    requestDataCollection,
    checkDataCollectionAlreadyExist,
    UpdateDataCollectionReqStatus,
    getAllInvolvedDepartment,
    getCurrentEmployeeType,
    getDepartmentDataCollection,
    departmentRcaPreventiveSubmission,
    insertDataCollectionMap,
    updateDataCollectionMap,
    FetchAllCollectionMap,
    FetchAllDepartmentType,
    getEmployeeDepartmentType,
    getAllSettings,
    getAllCommonSetting,
    insertCommonSetting,
    updateCommonSetting,
    getAllCommonSettingMapMaster,
    insertCommonSettingMapMaster,
    updateCommonSettingMapMaster,
    getAllDataCollectionCommonSetting,
    insertFishBoneQuestion,
    getFishboneDetails,
    getAllFishBoneAnalysisDetail,
    getAllActiveDeparments,
    InsertLevelReviewDetail,
    getAllHighLevelReview,
    InsertDepartmentAction,
    getAllDepartmentActions,
    getAllActionDetails,
    getDepActions,
    getDeparmentAcknowledge,
    UpdateIncidentReviews,
    UpdateFileStatus,
    IncidentActionMaster,
    IndidentActionMasterUpdate,
    getallMasterActionDetail,
    getAllLevelItemMapDetail,
    InsertLevelItemMapDetail,
    checkAlreadyItemMaped,
    UpdateLevelItemMapDetail,
    getAllLevelItems,
    InsertLevelActionReview,
    FetchAllIncidentActionDetail,
    UpdateDepartMentDataCollectionFileStatus,
    getAllCommonLevelDetail,
    ChangeIncidentStatus,
    UpdateLevelDetiails,
    getAllDashboardIncident,
    getCompanyDetail,
    getAllEmployeeApprovalDepartments,
    getAllCurrentInidentsForApproval,
    getAllCommonLevelDetailMaster,
    fetchAllInvolvedEmployeeDep,
    SingleDepartmentDataCollectionDetail,
    SingleDepartmentActionDetail,
    getAllDataCollectionEmployeeDetail,
    insertDataCollectionEmployeeDetail,
    checkAlreadyMapedEmployee,
    updateDataCollectionEmployeeDetail,
    getAllActiveDataCollectionEmployeeDetail,
    getAllIncidentNature,
    insertIncidentNature,
    updateIncidentNature,
    getIncidentFromDashboard,
    getIncidentInitiator,
    InsertIncCommonDetail,
    getAllPgHsStaffDetail,
    createConversation,
    addConversationUsers,
    getConversation,
    addMessageAttachments,
    createConversationMessage,
    fetchConversationMessages,
    getExternalEmployeeConversations,
    fetchMergedConversationMessages,
    DeletemessageDetail,
    EditMessageDetail,
    deleteMessageAttachment,
    getConversationEmployees,
    removeConversationMember,
    AddNewMemberToGroup,
    getLastMessageId,
    ReactivateConversationMembers,
    FindConversationMembers,
    getConversationParticipants,
    createNotificationsForMessage,
    markAsRead,
    getUnreadCountsByConversation,
    markConversationAsRead,
    getUnreadCount,
    getWhatsappRequestDetails,
    insertWhatsapp,
    updateWhatsapp,
    getAllWhatsapp,
    getApprovalRequestDetail,
    getCurrentEmployeeLevelOne,
    insertEvent,
    updateEvent,
    getAllEvent,
    getAllNotificationConfig,
    updateNotificationConfig,
    insertNotificationConfig,
    getRegistrationEmployee,


} = require('./incident.service');
const { sendIncidentRequestWhatsapp } = require('./whatsappService');



module.exports = {
    IncidetDetailInsert: (req, res) => {
        const body = req.body;
        IncidetDetailInsert(body, (err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            const { incRegFlag } = body
            if (incRegFlag === 1) {
                insert_id = result.insertId
                const updateData = {
                    incident_error_slno: insert_id,
                    incident_error_date: body.incident_date,
                    error_details: body.incident_details,
                    error_reason: body.incident_reason,
                    error_incident_type: body.initial_incident_type,
                    qi_slno: body.qi_slno
                }
                ErrorIncidentUpdate(updateData, (errr, results) => {
                    if (errr) {
                        deleteIncident(insert_id, (err, results) => {
                            if (err) {
                                logger.logwindow(err)
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
                                success: 1,
                                message: 'Deleted'
                            });
                        });
                    } else {
                        return res.status(200).json({
                            success: 1,
                            message: "Incident Registered",
                        })
                    }
                });
            }
            else if (incRegFlag === 2) {
                insert_id = result.insertId
                const updateData = {
                    incident_redos_slno: insert_id,
                    incident_redos_date: body.incident_date,
                    redos_details: body.incident_details,
                    redos_reason: body.incident_reason,
                    redos_incident_type: body.initial_incident_type,
                    qi_slno: body.qi_slno
                }
                RedosIncidentUpdate(updateData, (errr, results) => {
                    if (errr) {
                        deleteIncident(insert_id, (err, results) => {
                            if (err) {
                                logger.logwindow(err)
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
                                success: 1,
                                message: 'Deleted'
                            });
                        });
                    } else {
                        return res.status(200).json({
                            success: 1,
                            message: "Incident Registered",
                        })
                    }
                });
            }
            else if (incRegFlag === 3) {
                insert_id = result.insertId
                const updateData = {
                    incidence_ident_slno: insert_id,
                    incidence_ident_date: body.incident_date,
                    incidence_ident_description: body.incident_details,
                    incidence_ident_reason: body.incident_reason,
                    ident_error_incident_type: body.initial_incident_type,
                    qi_slno: body.qi_slno
                }
                IdentifErrorIncidentUpdate(updateData, (errr, results) => {
                    if (errr) {
                        deleteIncident(insert_id, (err, results) => {
                            if (err) {
                                logger.logwindow(err)
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
                                success: 1,
                                message: 'Deleted'
                            });
                        });
                    } else {
                        return res.status(200).json({
                            success: 1,
                            message: "Incident Registered",
                        })
                    }
                });
            }
            else if (incRegFlag === 4) {
                insert_id = result.insertId
                const updateData = {
                    incident_falls_slno: insert_id,
                    incident_falls_date: body.incident_date,
                    falls_details: body.incident_details,
                    falls_reason: body.incident_reason,
                    falls_incident_type: body.initial_incident_type,
                    qi_slno: body.qi_slno
                }
                FallsIncidentUpdate(updateData, (errr, results) => {
                    if (errr) {
                        deleteIncident(insert_id, (err, results) => {
                            if (err) {
                                logger.logwindow(err)
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
                                success: 1,
                                message: 'Deleted'
                            });
                        });
                    } else {
                        return res.status(200).json({
                            success: 1,
                            message: "Incident Registered",
                        })
                    }
                });
            }
            else if (incRegFlag === 5) {
                insert_id = result.insertId
                const updateData = {
                    incident_sentinel_slno: insert_id,
                    incident_sentinel_date: body.incident_date,
                    sentinel_details: body.incident_details,
                    sentinel_reason: body.incident_reason,
                    sentinel_incident_type: body.initial_incident_type,
                    qi_slno: body.qi_slno
                }
                SentinelIncidentUpdate(updateData, (errr, results) => {
                    if (errr) {
                        deleteIncident(insert_id, (err, results) => {
                            if (err) {
                                logger.logwindow(err)
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
                                success: 1,
                                message: 'Deleted'
                            });
                        });
                    } else {
                        return res.status(200).json({
                            success: 1,
                            message: "Incident Registered",
                        })
                    }
                });
            }
            else if (incRegFlag === 6) {
                insert_id = result.insertId
                const updateData = {
                    incident_nearmisses_slno: insert_id,
                    incident_nearmisses_date: body.incident_date,
                    nearmisses_details: body.incident_details,
                    nearmisses_reason: body.incident_reason,
                    nearmiss_incident_type: body.initial_incident_type,
                    qi_slno: body.qi_slno
                }
                NearMissessIncidentUpdate(updateData, (errr, results) => {
                    if (errr) {
                        deleteIncident(insert_id, (err, results) => {
                            if (err) {
                                logger.logwindow(err)
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
                                success: 1,
                                message: 'Deleted'
                            });
                        });
                    } else {
                        return res.status(200).json({
                            success: 1,
                            message: "Incident Registered",
                        })
                    }
                });
            }
        })
    },

    // update incident master table
    IncidentDetailsUpdate: (req, res) => {
        const body = req.body;
        IncidentDetailsUpdate(body, (err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            const { incRegFlag } = body
            if (incRegFlag === 1) {
                const updateData = {
                    incident_error_slno: body.incident_slno,
                    incident_error_date: body.incident_date,
                    error_details: body.incident_details,
                    error_reason: body.incident_reason,
                    error_incident_type: body.initial_incident_type,
                    qi_slno: body.qi_slno
                }
                ErrorIncidentUpdate(updateData, (errr, results) => {
                    if (err) {
                        return res.status(200).json({
                            success: 0,
                            message: err
                        })
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Data Updated",
                    })
                });
            }
            else if (incRegFlag === 2) {
                const updateData = {
                    incident_redos_slno: body.incident_slno,
                    incident_redos_date: body.incident_date,
                    redos_details: body.incident_details,
                    redos_reason: body.incident_reason,
                    redos_incident_type: body.initial_incident_type,
                    qi_slno: body.qi_slno
                }
                RedosIncidentUpdate(updateData, (errr, results) => {
                    if (err) {
                        return res.status(200).json({
                            success: 0,
                            message: err
                        })
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Data Updated",
                    })
                });
            }
            else if (incRegFlag === 3) {
                const updateData = {
                    incidence_ident_slno: body.incident_slno,
                    incidence_ident_date: body.incident_date,
                    incidence_ident_description: body.incident_details,
                    incidence_ident_reason: body.incident_reason,
                    ident_error_incident_type: body.initial_incident_type,
                    qi_slno: body.qi_slno
                }
                IdentifErrorIncidentUpdate(updateData, (errr, results) => {
                    if (err) {
                        return res.status(200).json({
                            success: 0,
                            message: err
                        })
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Data Updated",
                    })
                });
            }
            else if (incRegFlag === 4) {
                const updateData = {
                    incident_falls_slno: body.incident_slno,
                    incident_falls_date: body.incident_date,
                    falls_details: body.incident_details,
                    falls_reason: body.incident_reason,
                    falls_incident_type: body.initial_incident_type,
                    qi_slno: body.qi_slno
                }
                FallsIncidentUpdate(updateData, (errr, results) => {
                    if (err) {
                        return res.status(200).json({
                            success: 0,
                            message: err
                        })
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Data Updated",
                    })
                });
            }
            else if (incRegFlag === 5) {
                const updateData = {
                    incident_sentinel_slno: body.incident_slno,
                    incident_sentinel_date: body.incident_date,
                    sentinel_details: body.incident_details,
                    sentinel_reason: body.incident_reason,
                    sentinel_incident_type: body.initial_incident_type,
                    qi_slno: body.qi_slno
                }
                SentinelIncidentUpdate(updateData, (errr, results) => {
                    if (err) {
                        return res.status(200).json({
                            success: 0,
                            message: err
                        })
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Data Updated",
                    })
                });
            }
            else if (incRegFlag === 6) {
                const updateData = {
                    incident_nearmisses_slno: body.incident_slno,
                    incident_nearmisses_date: body.incident_date,
                    nearmisses_details: body.incident_details,
                    nearmisses_reason: body.incident_reason,
                    nearmiss_incident_type: body.initial_incident_type,
                    qi_slno: body.qi_slno
                }
                NearMissessIncidentUpdate(updateData, (errr, results) => {
                    if (err) {
                        return res.status(200).json({
                            success: 0,
                            message: err
                        })
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Data Updated",
                    })
                });
            }
        });
    },

    UpdateMarkedIncidentDetails: (req, res) => {
        const body = req.body;
        UpdateMarkedIncidentDetails(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: 'Data Updated'
            });
        });
    },

    SearchIncidentDetails: (req, res) => {
        const body = req.body;
        SearchIncidentDetails(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Report Found",
                    data: []
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },

    IncidentApprovalChecks: (req, res) => {
        const body = req.body;
        IncidentApprovalChecks(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Report Found",
                    data: []
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },

    InpatientIncidetDetailInsert: (req, res) => {
        const body = req.body;
        IncidetDetailInsert(body, (err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            const { incRegFlag } = body
            if (incRegFlag === 1) {
                insert_id = result.insertId
                const updateData = {
                    incident_error_slno: insert_id,
                    incident_error_date: body.incident_date,
                    error_details: body.incident_details,
                    error_reason: body.incident_reason,
                    error_incident_type: body.initial_incident_type,
                    qi_endo_ip_slno: body.qi_endo_ip_slno
                }
                IPErrorIncidentUpdate(updateData, (errr, results) => {
                    if (errr) {
                        deleteIncident(insert_id, (err, results) => {
                            if (err) {
                                logger.logwindow(err)
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
                                success: 0,
                                message: errr
                            });
                        });
                    } else {
                        return res.status(200).json({
                            success: 1,
                            message: "Incident Registered",
                        })
                    }
                });
            }
            else if (incRegFlag === 2) {
                insert_id = result.insertId
                const updateData = {
                    incident_redos_slno: insert_id,
                    incident_redos_date: body.incident_date,
                    redos_details: body.incident_details,
                    redos_reason: body.incident_reason,
                    redos_incident_type: body.initial_incident_type,
                    qi_endo_ip_slno: body.qi_endo_ip_slno
                }
                IPRedosIncidentUpdate(updateData, (errr, results) => {
                    if (errr) {
                        deleteIncident(insert_id, (err, results) => {
                            if (err) {
                                logger.logwindow(err)
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
                                success: 0,
                                message: errr
                            });
                        });
                    } else {
                        return res.status(200).json({
                            success: 1,
                            message: "Incident Registered",
                        })
                    }
                });
            }
            else if (incRegFlag === 3) {
                insert_id = result.insertId
                const updateData = {
                    incidence_ident_slno: insert_id,
                    incidence_ident_date: body.incident_date,
                    incidence_ident_description: body.incident_details,
                    incidence_ident_reason: body.incident_reason,
                    ident_error_incident_type: body.initial_incident_type,
                    qi_endo_ip_slno: body.qi_endo_ip_slno
                }
                IPIdentifErrorIncidentUpdate(updateData, (errr, results) => {
                    if (errr) {
                        deleteIncident(insert_id, (err, results) => {
                            if (err) {
                                logger.logwindow(err)
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
                                success: 0,
                                message: errr
                            });
                        });
                    } else {
                        return res.status(200).json({
                            success: 1,
                            message: "Incident Registered",
                        })
                    }
                });
            }
            else if (incRegFlag === 4) {
                insert_id = result.insertId
                const updateData = {
                    incident_falls_slno: insert_id,
                    incident_falls_date: body.incident_date,
                    falls_details: body.incident_details,
                    falls_reason: body.incident_reason,
                    falls_incident_type: body.initial_incident_type,
                    qi_endo_ip_slno: body.qi_endo_ip_slno
                }
                IPFallsIncidentUpdate(updateData, (errr, results) => {
                    if (errr) {
                        deleteIncident(insert_id, (err, results) => {
                            if (err) {
                                logger.logwindow(err)
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
                                success: 0,
                                message: errr
                            });
                        });
                    } else {
                        return res.status(200).json({
                            success: 1,
                            message: "Incident Registered",
                        })
                    }
                });
            }
            else if (incRegFlag === 5) {
                insert_id = result.insertId
                const updateData = {
                    incident_sentinel_slno: insert_id,
                    incident_sentinel_date: body.incident_date,
                    sentinel_details: body.incident_details,
                    sentinel_reason: body.incident_reason,
                    sentinel_incident_type: body.initial_incident_type,
                    qi_endo_ip_slno: body.qi_endo_ip_slno
                }
                IPSentinelIncidentUpdate(updateData, (errr, results) => {
                    if (errr) {
                        deleteIncident(insert_id, (err, results) => {
                            if (err) {
                                logger.logwindow(err)
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
                                success: 0,
                                message: errr
                            });
                        });
                    } else {
                        return res.status(200).json({
                            success: 1,
                            message: "Incident Registered",
                        })
                    }
                });
            }
            else if (incRegFlag === 6) {
                insert_id = result.insertId
                const updateData = {
                    incident_nearmisses_slno: insert_id,
                    incident_nearmisses_date: body.incident_date,
                    nearmisses_details: body.incident_details,
                    nearmisses_reason: body.incident_reason,
                    nearmiss_incident_type: body.initial_incident_type,
                    qi_endo_ip_slno: body.qi_endo_ip_slno
                }
                IPNearMissessIncidentUpdate(updateData, (errr, results) => {
                    if (errr) {
                        deleteIncident(insert_id, (err, results) => {
                            if (err) {
                                logger.logwindow(err)
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
                                success: 0,
                                message: errr
                            });
                        });
                    } else {
                        return res.status(200).json({
                            success: 1,
                            message: "Incident Registered",
                        })
                    }
                });
            }
        })
    },

    InpatientIncidetDetailsUpdate: (req, res) => {
        const body = req.body;
        IncidentDetailsUpdate(body, (err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            const { incRegFlag } = body
            if (incRegFlag === 1) {
                const updateData = {
                    incident_error_slno: body.incident_slno,
                    incident_error_date: body.incident_date,
                    error_details: body.incident_details,
                    error_reason: body.incident_reason,
                    error_incident_type: body.initial_incident_type,
                    qi_endo_ip_slno: body.qi_endo_ip_slno
                }
                IPErrorIncidentUpdate(updateData, (errr, results) => {
                    if (err) {
                        return res.status(200).json({
                            success: 0,
                            message: err
                        })
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Data Updated",
                    })
                });
            }
            else if (incRegFlag === 2) {
                const updateData = {
                    incident_redos_slno: body.incident_slno,
                    incident_redos_date: body.incident_date,
                    redos_details: body.incident_details,
                    redos_reason: body.incident_reason,
                    redos_incident_type: body.initial_incident_type,
                    qi_endo_ip_slno: body.qi_endo_ip_slno
                }
                IPRedosIncidentUpdate(updateData, (errr, results) => {
                    if (err) {
                        return res.status(200).json({
                            success: 0,
                            message: err
                        })
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Data Updated",
                    })
                });
            }
            else if (incRegFlag === 3) {
                const updateData = {
                    incidence_ident_slno: body.incident_slno,
                    incidence_ident_date: body.incident_date,
                    incidence_ident_description: body.incident_details,
                    incidence_ident_reason: body.incident_reason,
                    ident_error_incident_type: body.initial_incident_type,
                    qi_endo_ip_slno: body.qi_endo_ip_slno
                }
                IPIdentifErrorIncidentUpdate(updateData, (errr, results) => {
                    if (err) {
                        return res.status(200).json({
                            success: 0,
                            message: err
                        })
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Data Updated",
                    })
                });
            }
            else if (incRegFlag === 4) {
                const updateData = {
                    incident_falls_slno: body.incident_slno,
                    incident_falls_date: body.incident_date,
                    falls_details: body.incident_details,
                    falls_reason: body.incident_reason,
                    falls_incident_type: body.initial_incident_type,
                    qi_endo_ip_slno: body.qi_endo_ip_slno
                }
                IPFallsIncidentUpdate(updateData, (errr, results) => {
                    if (err) {
                        return res.status(200).json({
                            success: 0,
                            message: err
                        })
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Data Updated",
                    })
                });
            }
            else if (incRegFlag === 5) {
                const updateData = {
                    incident_sentinel_slno: body.incident_slno,
                    incident_sentinel_date: body.incident_date,
                    sentinel_details: body.incident_details,
                    sentinel_reason: body.incident_reason,
                    sentinel_incident_type: body.initial_incident_type,
                    qi_endo_ip_slno: body.qi_endo_ip_slno
                }
                IPSentinelIncidentUpdate(updateData, (errr, results) => {
                    if (err) {
                        return res.status(200).json({
                            success: 0,
                            message: err
                        })
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Data Updated",
                    })
                });
            }
            else if (incRegFlag === 6) {
                const updateData = {
                    incident_nearmisses_slno: body.incident_slno,
                    incident_nearmisses_date: body.incident_date,
                    nearmisses_details: body.incident_details,
                    nearmisses_reason: body.incident_reason,
                    nearmiss_incident_type: body.initial_incident_type,
                    qi_endo_ip_slno: body.qi_endo_ip_slno
                }
                IPNearMissessIncidentUpdate(updateData, (errr, results) => {
                    if (err) {
                        return res.status(200).json({
                            success: 0,
                            message: err
                        })
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Data Updated",
                    })
                });
            }
        });
    },
    IncidentCategoryMaster: (req, res) => {
        const body = req.body;
        IncidentCategoryMaster(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },
    insertIncidentLevelApproval: (req, res) => {
        const body = req.body;
        checkIfLevelExist(body, (err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }

            if (result && result?.length > 0) {
                return res.status(200).json({
                    success: 1,
                    message: "Level Already Exist"
                })
            }

            insertIncidentLevelApproval(body, (err, results) => {
                if (err) {
                    return res.status(200).json({
                        success: 0,
                        message: err
                    })
                }
                return res.status(200).json({
                    success: 2,
                    message: "Level Inserted Successfully"
                })
            })
        })

    },

    getAllIncidentCategory: (req, res) => {
        getAllIncidentCategory((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Report Found",
                    data: []
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },
    getAllIncidentSubCategory: (req, res) => {
        getAllIncidentSubCategory((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No Report Found",
                    data: []
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },
    fetchAllLevelApprovals: (req, res) => {
        fetchAllLevelApprovals((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Report Found",
                    data: []
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })
        })
    },

    FetchAllCollectionMap: (req, res) => {
        FetchAllCollectionMap((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Report Found",
                    data: []
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })
        })
    },
    getallMasterActionDetail: (req, res) => {
        getallMasterActionDetail((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Report Found",
                    data: []
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })
        })
    },
    getAllLevelItemMapDetail: (req, res) => {
        getAllLevelItemMapDetail((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Report Found",
                    data: []
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })
        })
    },
    getAllDashboardIncident: (req, res) => {
        getAllDashboardIncident((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Report Found",
                    data: []
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })
        })
    },
    getAllDataCollectionEmployeeDetail: (req, res) => {
        getAllDataCollectionEmployeeDetail((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Report Found",
                    data: []
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })
        })
    },


    getAllActiveDataCollectionEmployeeDetail: (req, res) => {
        const data = req.body;
        getAllActiveDataCollectionEmployeeDetail(data, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Report Found",
                    data: []
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })
        })
    },
    getCompanyDetail: (req, res) => {
        getCompanyDetail((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Report Found",
                    data: []
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })
        })
    },
    getAllIncidentNature: (req, res) => {
        getAllIncidentNature((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Report Found",
                    data: []
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })
        })
    },



    getAllLevelItems: (req, res) => {
        const data = req.body;
        getAllLevelItems(data, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Report Found",
                    data: []
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })
        })
    },

    FetchAllDepartmentType: (req, res) => {
        FetchAllDepartmentType((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Report Found",
                    data: []
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })
        })
    },
    getAllSettings: (req, res) => {
        getAllSettings((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Report Found",
                    data: []
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })
        })
    },
    getAllCommonSetting: (req, res) => {
        getAllCommonSetting((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Report Found",
                    data: []
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })
        })
    },
    getFishboneDetails: (req, res) => {
        const data = req.body;
        getFishboneDetails(data, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Report Found",
                    data: []
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })
        })
    },
    getAllFishBoneAnalysisDetail: (req, res) => {
        const data = req.body;
        getAllFishBoneAnalysisDetail(data, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Report Found",
                    data: []
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })
        })
    },
    getAllActiveDeparments: (req, res) => {
        const data = req.body;
        getAllActiveDeparments(data, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Report Found",
                    data: []
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })
        })
    },
    getAllHighLevelReview: (req, res) => {
        const data = req.body;
        getAllHighLevelReview(data, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Report Found",
                    data: []
                })
            }
            return res.status(200).json({
                success: 2,
                data: results,
                message: 'Fetch Succefully'
            })
        })
    },
    InsertDepartmentAction: (req, res) => {
        const data = req.body;
        const values = data?.flatMap(item =>
            item.inc_action_collect_dep?.map(dep_id => [
                item.inc_register_slno,
                item.inc_action_req_dep,
                dep_id,
                item.inc_action_req_user,
                item.inc_dep_action_remark,
                item.inc_dep_action_detail_status,
                item.inc_cs_slno,
                item.level_no
            ])
        );

        const RequestSentEmployee = data?.flatMap(item =>
            item.inc_collect_emp_id?.map((empId, index) => ({
                inc_register_slno: item.inc_register_slno,
                inc_action_req_user: item.inc_action_req_user,
                inc_dep_sec: item.inc_colled_dep_sec[index],
                inc_emp_id: empId
            }))
        );


        if (RequestSentEmployee.length > 0 && Array.isArray(RequestSentEmployee)) {
            RequestSentEmployee?.forEach(item => {
                getApprovalRequestDetail(
                    item.inc_emp_id,
                    item.inc_action_req_user,
                    item.inc_register_slno
                    , (err, WhatsUpNumbers) => {
                        if (err) {
                            console.error(err);
                            return;
                        }

                        const person = WhatsUpNumbers[0];
                        const currentYear = new Date().getFullYear();
                        const IncidentNo = item.inc_register_slno || ""


                        sendIncidentRequestWhatsapp({
                            mobile: person.whatsapp_number || person.requested_employee_mobile,
                            employeeName: person.requested_employee_name,
                            incidentNo: `IRN/TMCH/${currentYear}/${IncidentNo}`,
                            creatorName: person.creator_name,
                            creatorDepartment: person.creator_department,
                            type: 'Data Action'
                        }).catch((error) => {
                            console.error("WhatsApp send failed",
                                error?.response?.data || error.message
                            );
                        });
                    }
                );
            })
        }




        if (!Array.isArray(values) || values.length === 0) {
            return res.status(400).json({
                success: 0,
                message: "No department action data to insert"
            });
        };


        InsertDepartmentAction(values, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }

            // 3 Emit socket PER ITEM + PER DEPARTMENT
            data.forEach(item => {
                item.inc_action_collect_dep.forEach(dep_id => {

                    const fetchActionDetail = {
                        inc_register_slno: item.inc_register_slno,
                        dep_id: dep_id
                    };

                    SingleDepartmentActionDetail(fetchActionDetail, (err, actionResult) => {
                        if (err) {
                            console.error("Fetch error:", err);
                            return;
                        }

                        if (actionResult?.length > 0) {
                            req.io.emit("new_action_requested", {
                                actionDetail: actionResult,
                                inc_register_slno: item.inc_register_slno,
                                level_no: item.level_no,
                                createdAt: new Date()
                            });
                        }
                    });
                });
            });


            return res.status(200).json({
                success: 2,
                data: results,
                message: 'Action Request Sent Successfully!'
            })

        })
    },

    getAllCommonSettingMapMaster: (req, res) => {
        getAllCommonSettingMapMaster((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Report Found",
                    data: []
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })
        })
    },
    getAllDepartmentActions: (req, res) => {
        const body = req.body;
        getAllDepartmentActions(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Report Found",
                    data: []
                })
            }
            return res.status(200).json({
                success: 2,
                message: 'Data Updated Successfully',
                data: results
            });
        });
    },
    getAllDataCollectionCommonSetting: (req, res) => {
        getAllDataCollectionCommonSetting((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Report Found",
                    data: []
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })
        })
    },

    getAllQADIncident: (req, res) => {
        getAllQADIncident((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Report Found",
                    data: []
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })
        })

    },


    IncidentCategoryUpdate: (req, res) => {
        const body = req.body;
        IncidentCategoryUpdate(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 2,
                message: 'Data Updated Successfully'
            });
        });
    },
    updateIncidentLevelApproval: (req, res) => {
        const body = req.body;
        updateIncidentLevelApproval(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 2,
                message: 'Data Updated Successfully'
            });
        });
    },
    hodRcaApproval: (req, res) => {
        const body = req.body;
        hodRcaApproval(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 2,
                message: 'Hod Approved Successfully'
            });
        });
    },
    hodCorrectiveApproval: (req, res) => {
        const body = req.body;
        hodCorrectiveApproval(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 2,
                message: 'Hod Approved Successfully'
            });
        });
    },
    hodCorrectiveUpdate: (req, res) => {
        const body = req.body;
        hodCorrectiveUpdate(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 2,
                message: 'Hod Approved Successfully'
            });
        });
    },
    hodPreventiveUpdate: (req, res) => {
        const body = req.body;
        hodPreventiveUpdate(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 2,
                message: 'Hod Approved Successfully'
            });
        });
    },
    qadEvalutaionUpdate: (req, res) => {
        const body = req.body;
        qadEvalutaionUpdate(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 2,
                message: 'Hod Approved Successfully'
            });
        });
    },
    rcaUpdation: (req, res) => {
        const body = req.body;
        rcaUpdation(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 2,
                message: 'Hod Approved Successfully'
            });
        });
    },
    updateDataCollectionMap: (req, res) => {
        const body = req.body;
        updateDataCollectionMap(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 2,
                message: 'Hod Approved Successfully'
            });
        });
    },
    updateCommonSetting: (req, res) => {
        const body = req.body;
        updateCommonSetting(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 2,
                message: 'Hod Approved Successfully'
            });
        });
    },
    updateCommonSettingMapMaster: (req, res) => {
        const body = req.body;
        updateCommonSettingMapMaster(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 2,
                message: 'Hod Approved Successfully'
            });
        });
    },
    IndidentActionMasterUpdate: (req, res) => {
        const body = req.body;
        IndidentActionMasterUpdate(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 2,
                message: 'Data Updated  Successfully'
            });
        });
    },
    UpdateLevelItemMapDetail: (req, res) => {
        const body = req.body;
        // checkAlreadyItemMaped(body, (err, result) => {
        //     if (err) {
        //         return res.status(200).json({
        //             success: 0,
        //             message: err
        //         });
        //     }

        //     if (Array.isArray(result) && result?.length > 0) {
        //         return res.json({
        //             success: 1,
        //             message: 'Item Already present'
        //         })
        //     }

        // });
        UpdateLevelItemMapDetail(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 2,
                message: 'Data Updated Successfully'
            });
        });
    },

    qadPreventiveApproval: (req, res) => {
        const body = req.body;
        qadPreventiveApproval(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 2,
                message: 'Hod Approved Successfully'
            });
        });
    },
    qadRcaApproval: (req, res) => {
        const body = req.body;
        qadRcaApproval(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 2,
                message: 'Quality Approved Successfully'
            });
        });
    },

    IncidentSubCategoryInsert: (req, res) => {
        const data = req.body;
        FindIncidentSubCategoryIfAlreadyExist(data, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (Object.keys(results).length > 0) {
                return res.status(200).json({
                    success: 1,
                    message: "SubCategory Already Exist",
                })
            }
            IncidentSubCategoryInsert(data, (err, results) => {
                if (err) {
                    return res.status(200).json({
                        success: 0,
                        message: err
                    })
                }
                return res.status(200).json({
                    success: 2,
                    message: 'Data Inserted Successfully'
                });
            })
        })
    },
    IncidentSubCategoryUpdate: (req, res) => {
        const data = req.body;
        IncidentSubCategoryUpdate(data, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 2,
                message: 'Data Updated Successfully'
            });
        });
    },
    getPatientDetail: (req, res) => {
        const data = req.body;
        getPatientDetail(data, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (results?.length === 0) {
                return res.status(200).json({
                    success: 1,
                    message: 'No Record Found',
                    data: []
                });
            }

            return res.status(200).json({
                success: 2,
                message: 'Data Fetched Successfully',
                data: results
            });
        });
    },
    getProfessionalStaff: (req, res) => {
        const data = req.body;
        getProfessionalStaff(data, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (results?.length === 0) {
                return res.status(200).json({
                    success: 1,
                    message: 'No Record Found',
                    data: []
                });
            }

            return res.status(200).json({
                success: 2,
                message: 'Data Fetched Successfully',
                data: results
            });
        });
    },
    getAllPgHsStaffDetail: (req, res) => {
        getAllPgHsStaffDetail((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (results?.length === 0) {
                return res.status(200).json({
                    success: 1,
                    message: 'No Record Found',
                    data: []
                });
            }
            return res.status(200).json({
                success: 2,
                message: 'Data Fetched Successfully',
                data: results
            });
        });
    },


    getHsPgStaffDetail: (req, res) => {
        const data = req.body;
        getProfessionalStaff(data, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (results?.length === 0) {
                return res.status(200).json({
                    success: 1,
                    message: 'No Record Found',
                    data: []
                });
            }

            return res.status(200).json({
                success: 2,
                message: 'Data Fetched Successfully',
                data: results
            });
        });
    },
    getAllassetDtl: (req, res) => {
        const data = req.body;
        getAllassetDtl(data, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (results?.length === 0) {
                return res.status(200).json({
                    success: 1,
                    message: 'No Record Found',
                    data: []
                });
            }

            return res.status(200).json({
                success: 2,
                message: 'Data Fetched Successfully',
                data: results
            });
        });
    },
    getAllIncidentDetail: (req, res) => {
        const data = req.body;
        getAllIncidentDetail(data, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (results?.length === 0) {
                return res.status(200).json({
                    success: 1,
                    message: 'No Record Found',
                    data: []
                });
            }

            return res.status(200).json({
                success: 2,
                message: 'Data Fetched Successfully',
                data: results
            });
        });
    },

    getAllCurrentLevelApproval: async (req, res) => {
        const data = req.body;
        try {
            const { ApprovalDepartments } = data;


            if (!Array.isArray(ApprovalDepartments) || ApprovalDepartments.length === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No Record Found",
                    data: []
                });
            }

            let finalResults = [];

            // Helper to convert callback service into Promise
            const runQuery = (query, params) => {
                return new Promise((resolve, reject) => {
                    getAllCurrentInidentsForApproval({ query, params }, (err, results) => {
                        if (err) return reject(err);
                        resolve(results || []);
                    });
                });
            };

            for (const item of ApprovalDepartments) {

                const dep_slno = item.dep_id;
                const sec_slno = item.sec_id;
                const current_level = Number(item.level_no) || 0;
                const minus_level = current_level - 1;
                const level_priority = Number(item.level_priority) || 0;

                let whereCondition = "";
                let params = [];


                if (level_priority === 0) {
                    // Priority 0: filter by department + section only
                    whereCondition = `
                    irm.inc_status = 1 
                    AND irm.dep_slno = ? 
                    AND irm.sec_slno = ?
                `;
                    params = [dep_slno, sec_slno];
                } else {
                    // Normal current-level filtering
                    whereCondition = `
                    irm.inc_status = 1
                    AND irm.sec_slno = ?
                    AND (
                        irm.inc_current_level >= ?
                        OR (
                            irm.inc_current_level >= ?
                            AND (
                                irm.inc_current_level_review_state = 'A'
                                OR irm.inc_current_level_review_state IS NULL
                            )
                        )
                    )
                `;
                    params = [sec_slno, current_level, minus_level];
                }

                const query = `
                        SELECT 
                            irm.inc_register_slno,
                            irm.inc_initiator_slno,
                            irm.nature_of_inc,
                            irm.inc_describtion,
                            irm.file_status,
                            irm.inc_status,
                            irm.create_user,
                            irm.edit_user,
                            irm.create_date,
                            irm.inc_current_level,
                            irm.inc_current_level_review_state,
                            irm.inc_sacmatrix_detail,
                            irm.inc_reg_corrective,
                            irm.inc_all_approved,
                            ipd.mrd_no,
                            ipd.inc_pt_name,
                            ipd.inc_pt_gender,
                            ipd.inc_pt_mobile,
                            ipd.inc_pt_age,
                            ipd.inc_pt_address,
                            isd.inc_staff_type_slno,
                            isd.emp_id,
                            isd.emp_user_name,
                            isd.emp_name,
                            isd.emp_age,
                            isd.emp_gender,
                            isd.emp_desig,
                            isd.emp_dept,
                            isd.emp_dept_sec,
                            isd.emp_mob,
                            isd.emp_email,
                            isd.emp_address,
                            isd.emp_joining_date,
                            ivd.inc_visitor_name,
                            ivd.inc_visitor_age,
                            ivd.inc_visitor_gender,
                            ivd.inc_visitor_mobile,
                            ivd.inc_visitor_address,
                            ivd.inc_visit_purpose,
                            iad.inc_is_asset,
                            iad.asset_item_slno,
                            iad.custodian_dept_slno,
                            iad.item_name,
                            iad.item_location,
                            iad.manufacture_slno,
                            cm.em_name,
                            dp.dept_name,
                            ds.sec_name,
                            iniat.inc_initiator_name,
                            ist.inc_staff_type_name,
                            irm.dep_slno,
                            irm.sec_slno,
                            cd.desg_name,
                            icd.inc_common_description,
                            icd.inc_common_dtl_slno,
                            isc.inc_sub_category_name,
                            ircm.inc_category_name,
                            irm.inc_data_collection_req,
                            JSON_ARRAYAGG(
                                JSON_OBJECT(
                                    'section', cds.dept_name,
                                    'inc_dep_status', idc.inc_dep_status,
                                    'fba_status',idc.inc_dep_fba_status,
                                    'level_no',idc.level_no
                                )
                            ) AS data_collection_details,
                            JSON_ARRAYAGG( 
                                JSON_OBJECT(
                                    'inc_dep_action_status', idad.inc_dep_action_status,
                                    'level_no',idad.level_no
                                )
                            ) AS inc_action_detail
                        FROM inc_register_master irm
                        LEFT JOIN inc_patient_dtl ipd ON irm.inc_register_slno = ipd.inc_register_slno AND irm.inc_initiator_slno = 1
                        LEFT JOIN inc_staff_dtl isd ON irm.inc_register_slno = isd.inc_register_slno AND irm.inc_initiator_slno = 2
                        LEFT JOIN inc_visitor_dtl ivd ON irm.inc_register_slno = ivd.inc_register_slno AND irm.inc_initiator_slno = 3
                        LEFT JOIN inc_asset_dtl iad ON irm.inc_register_slno = iad.inc_register_slno AND irm.inc_initiator_slno = 4
                        LEFT JOIN inc_common_dtl icd ON irm.inc_register_slno = icd.inc_register_slno AND irm.inc_initiator_slno = 5
                        LEFT JOIN co_employee_master cm ON irm.create_user = cm.em_id
                        LEFT JOIN co_department_mast dp ON cm.em_department = dp.dept_id
                        LEFT JOIN co_deptsec_mast ds ON cm.em_dept_section = ds.sec_id
                        LEFT JOIN inc_initiator iniat ON iniat.inc_initiator_slno = irm.inc_initiator_slno
                        LEFT JOIN inc_staff_type ist ON ist.inc_staff_type_slno = isd.inc_staff_type_slno
                        LEFT JOIN co_designation cd on cd.desg_slno = cm.em_designation
                        LEFT JOIN inc_data_collection idc ON idc.inc_register_slno = irm.inc_register_slno
                        LEFT JOIN inc_dep_action_detail idad ON idad.inc_register_slno = irm.inc_register_slno AND idad.inc_dep_action_detail_status = 1
                        LEFT JOIN co_department_mast cds ON cds.dept_id = idc.inc_req_collect_dep
                        LEFT JOIN incident_sub_category_master isc ON irm.inc_subcategory = isc.inc_sub_cat_slno
                        LEFT JOIN incident_category_master ircm ON irm.inc_category = ircm.inc_category_slno
                        LEFT JOIN co_employee_master cem ON cem.em_id = idc.inc_req_user
                        LEFT JOIN co_employee_master mc ON mc.em_id = idc.inc_req_ack_user
                        WHERE ${whereCondition}
                        GROUP BY irm.inc_register_slno
                    `;

                const results = await runQuery(query, params);
                finalResults.push(...results);
            }

            if (!finalResults || finalResults.length === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No Record Found",
                    data: []
                });
            }

            return res.status(200).json({
                success: 2,
                message: "Data Fetched Successfully",
                data: finalResults
            });

        } catch (error) {

            return res.status(500).json({
                success: 0,
                message: "Internal Server Error"
            });
        }
    }
    ,

    insertDataCollectionMap: (req, res) => {
        const data = req.body;
        insertDataCollectionMap(data, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            return res.status(200).json({
                success: 2,
                message: 'Data Fetched Successfully',
                data: results
            });
        });
    },
    insertCommonSetting: (req, res) => {
        const data = req.body;
        insertCommonSetting(data, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            return res.status(200).json({
                success: 2,
                message: 'Data Fetched Successfully',
                data: results
            });
        });
    },
    insertCommonSettingMapMaster: (req, res) => {
        const data = req.body;
        insertCommonSettingMapMaster(data, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            return res.status(200).json({
                success: 2,
                message: 'Data Fetched Successfully',
                data: results
            });
        });
    },
    IncidentActionMaster: (req, res) => {
        const data = req.body;
        IncidentActionMaster(data, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            return res.status(200).json({
                success: 2,
                message: 'Data Inserted Successfully',
            });
        });
    },

    // not using simpley writter early used
    getAllCommonLevelDetailMaster: (req, res) => {
        const data = req.body;
        getAllCommonLevelDetailMaster(data, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            return res.status(200).json({
                success: 2,
                message: 'Data Inserted Successfully',
                data: results
            });
        });
    },

    getAllCommonLevelDetail: async (req, res) => {
        const data = req.body;
        try {
            const { approval_list } = data;

            if (!Array.isArray(approval_list) || approval_list.length === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No Record Found",
                    data: []
                });
            }

            let finalResults = [];

            // Helper to convert callback service into Promise
            const runQuery = (query, params) => {
                return new Promise((resolve, reject) => {
                    getAllCommonLevelDetail({ query, params }, (err, results) => {
                        if (err) return reject(err);
                        resolve(results || []);
                    });
                });
            };

            for (const dep of approval_list) {
                const { dep_id, sec_id } = dep;
                const query = `
                    SELECT lm.level_master_id, lm.dep_id, lm.sec_id, lm.module_slno,
                        lm.section_lvl_count, lm.create_date, lm.update_date,
                        (SELECT JSON_ARRAYAGG(JSON_OBJECT(
                                'section_id', lms.section_id,
                                'level_slno', lms.level_master_slno,
                                'lvl_count_section', lms.lvl_count_section,
                                'mandatory', lms.mandatory,
                                'secion_lvl', lms.secion_lvl
                            )) 
                            FROM co_level_master_section lms
                            WHERE lms.level_master_slno = lm.level_master_id
                        ) AS sections,
                        (SELECT JSON_ARRAYAGG(JSON_OBJECT(
                                'detail_slno', ld.detail_slno,
                                'section_slno', ld.section_slno,
                                'level_slno', ld.level_master_slno,
                                'level', ld.level,
                                'level_name', ld.level_name,
                                'level_emp_id', ld.level_emp_id,
                                'level_priority', ld.priority_status,
                                'level_status', ld.status,
                                'level_no', ld.level_count,
                                'em_name', cm.em_name
                        ))
                        FROM co_level_details ld
                        LEFT JOIN co_employee_master cm ON cm.em_id = ld.level_emp_id
                        WHERE ld.level_master_slno = lm.level_master_id
                        ) AS levels
                    FROM co_level_master lm
                    WHERE lm.dep_id = ? AND lm.sec_id = ? AND lm.module_slno = 20
                `;

                const results = await runQuery(query, [dep_id, sec_id]);
                finalResults.push(...results);
            }

            if (!finalResults || finalResults.length === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No Record Found",
                    data: []
                });
            }

            return res.status(200).json({
                success: 2,
                message: "Data Fetched Successfully",
                data: finalResults
            });
        } catch (error) {
            return res.status(500).json({
                success: 0,
                message: "Internal Server Error"
            });
        }
    },
    getAllEmployeeApprovalDepartments: (req, res) => {
        const data = req.body;
        getAllEmployeeApprovalDepartments(data, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            return res.status(200).json({
                success: 2,
                message: 'Departments Fetched Successfully',
                data: results
            });
        });
    },

    getCurrentEmployeeLevelOne: (req, res) => {
        const data = req.body;
        getCurrentEmployeeLevelOne(data, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            return res.status(200).json({
                success: 2,
                message: 'Departments Fetched Successfully',
                data: results
            });
        });
    },



    insertIncidentNature: (req, res) => {
        const data = req.body;
        insertIncidentNature(data, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            return res.status(200).json({
                success: 2,
                message: 'Departments Fetched Successfully',
                data: results
            });
        });
    },


    insertDataCollectionEmployeeDetail: (req, res) => {
        const data = req.body;
        checkAlreadyMapedEmployee(data, (err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (Array.isArray(result) && result?.length > 0) {
                return res.json({
                    success: 1,
                    message: 'Employee Already present'
                })
            }
            insertDataCollectionEmployeeDetail(data, (err, results) => {
                if (err) {
                    return res.status(200).json({
                        success: 0,
                        message: err
                    });
                }

                return res.status(200).json({
                    success: 2,
                    message: 'Inserted Successfully',
                    data: results
                });
            });
        });

    },






    // getAllDepartmentDataCollection: (req, res) => {
    //     const data = req.body;
    //     getAllDepartmentDataCollection(data, (err, results) => {
    //         if (err) {
    //             return res.status(200).json({
    //                 success: 0,
    //                 message: err
    //             });
    //         }

    //         return res.status(200).json({
    //             success: 2,
    //             message: 'Departments Fetched Successfully',
    //             data: results
    //         });
    //     });
    // },


    InsertLevelItemMapDetail: (req, res) => {
        const data = req.body;
        checkAlreadyItemMaped(data, (err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (Array.isArray(result) && result?.length > 0) {
                return res.json({
                    success: 1,
                    message: 'Item Already present'
                })
            }

            if (Array.isArray(result) && result.length === 0) {
                InsertLevelItemMapDetail(data, (err, results) => {
                    if (err) {
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }

                    return res.status(200).json({
                        success: 2,
                        message: 'Data Inserted Successfully',
                    });
                });
            }
        })

    },

    insertFishBoneQuestion: (req, res) => {
        const data = req.body;
        insertFishBoneQuestion(data, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            return res.status(200).json({
                success: 2,
                message: 'Data Fetched Successfully',
                data: results
            });
        });
    },

    UpdateLevelDetiails: (req, res) => {
        const data = req.body;
        UpdateLevelDetiails(data, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            return res.status(200).json({
                success: 2,
                message: 'Review Updated Successfully'
            });
        });
    },



    getEmployeeDepartmentType: (req, res) => {
        const data = req.body;
        getEmployeeDepartmentType(data, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            return res.status(200).json({
                success: 2,
                message: 'Data Fetched Successfully',
                data: results
            });
        });
    },

    highLevelApprovals: (req, res) => {

        const data = req.body;

        const {
            inc_current_level,
            inc_current_level_review_state,
            inc_register_slno,
            level_slno,
            level_review_state,
            level_review,
            level_employee,
            level_review_status,
            actionReviews,
            inc_category,
            inc_subcategory,
            inc_sacmatrix_detail,
            inc_all_approved,
            file_status,
            nextLevelEmployees
        } = data;


        const highleveldata = {
            inc_current_level,
            inc_current_level_review_state,
            inc_register_slno,
            ...(inc_category && inc_sacmatrix_detail && {
                inc_category,
                inc_sacmatrix_detail,
            }),
            ...(inc_subcategory && {
                inc_subcategory
            }),
            ...(inc_all_approved && {
                inc_all_approved
            }),
            ...(file_status && {
                file_status
            }),
        };


        const reviewdetail = {
            inc_register_slno,
            level_slno,
            level_review_state,
            level_review,
            level_employee,
            level_review_status
        };

        highLevelApprovals(highleveldata, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            InsertLevelReviewDetail(reviewdetail, (err, results) => {
                if (err) {
                    return res.status(200).json({
                        success: 0,
                        message: err
                    });
                }
                if (Array.isArray(nextLevelEmployees) && nextLevelEmployees.length > 0) {
                    const currentYear = new Date().getFullYear();

                    nextLevelEmployees.forEach((item) => {
                        getApprovalRequestDetail(
                            item?.level_emp_id,
                            level_employee,
                            inc_register_slno,
                            (err, result) => {
                                if (err) {
                                    console.error(err);
                                    return;
                                }

                                if (!result?.length) return;

                                const whatsappData = result[0];

                                sendIncidentRequestWhatsapp({
                                    mobile: whatsappData.requested_employee_mobile,
                                    employeeName: whatsappData.requested_employee_name,
                                    incidentNo: `IRN/TMCH/${currentYear}/${inc_register_slno}`,
                                    creatorName: whatsappData.creator_name,
                                    creatorDepartment: whatsappData.creator_department,
                                    type: 'Approval Pending'
                                })
                                    .then(() => {
                                        console.log("Sent");
                                    })
                                    .catch((error) => {
                                        console.error(
                                            "WhatsApp send failed",
                                            error?.response?.data || error.message
                                        );
                                    });
                            }
                        );
                    });
                }

                const level_review_slno = results.insertId;
                const hasActions = actionReviews && Object.keys(actionReviews).length > 0;

                // If NO action reviews → return success immediately
                if (!hasActions) {
                    return res.status(200).json({
                        success: 2,
                        message: "Process completed",
                        data: results
                    });
                }


                if (level_review_slno && Object.keys(actionReviews ?? {}).length > 0) {
                    const actionValues = Object.entries(actionReviews ?? {}).map(
                        ([inc_action_slno, inc_action_review]) => [
                            inc_register_slno,
                            level_review_slno,
                            Number(inc_action_slno),
                            inc_action_review,
                            1,
                        ]
                    );
                    InsertLevelActionReview(actionValues, (err) => {
                        if (err) {
                            return res.status(200).json({
                                success: 0,
                                message: err
                            });
                        }
                        // FINAL RESPONSE (only one)
                        return res.status(200).json({
                            success: 2,
                            message: "Process completed",
                            data: results
                        });
                    });
                }

            });

        });
    },

    requestDataCollection: (req, res) => {
        const {
            slno,
            departments,
            status,
            remark,
            createUser,
            requested_department,
            requested_employee,
            level_no,
            is_rca_needed,
            is_fishbone_needed,
            is_preventive_needed
        } = req.body;

        const value = {
            slno,
            departments,
            createUser,
            status,
            remark,
            requested_department,
            requested_employee,
            level_no,
            is_rca_needed,
            is_fishbone_needed,
            is_preventive_needed
        };

        // Step 1: Check if data collection already exists for this slno
        checkDataCollectionAlreadyExist(slno, (err, checkresult) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            requestDataCollection(value, (err, results) => {
                if (err) {
                    return res.status(200).json({
                        success: 0,
                        message: err
                    });

                }
                // Dat CollectionFetch Detail Single Detail
                const insertId = results.insertId;
                const fetchdetail = {
                    inc_register_slno: slno,
                    em_id: requested_employee,
                    id: insertId
                }
                if (insertId) {
                    SingleDepartmentDataCollectionDetail(fetchdetail, (err, DatacollectonResult) => {
                        if (err) {
                            return res.status(200).json({
                                success: 0,
                                message: err
                            });
                        }
                        getWhatsappRequestDetails(
                            requested_employee,
                            createUser,
                            slno, (err, result) => {
                                if (err) {
                                    return res.status(200).json({
                                        success: 0,
                                        message: err
                                    });
                                }
                                if (!result?.length) {
                                    return;
                                }
                                const whatsappData = result[0];

                                const currentYear = new Date().getFullYear();

                                sendIncidentRequestWhatsapp({
                                    mobile: whatsappData.requested_employee_mobile,
                                    employeeName: whatsappData.requested_employee_name,
                                    incidentNo: `IRN/TMCH/${currentYear}/${slno}`,
                                    creatorName: whatsappData.creator_name,
                                    creatorDepartment: whatsappData.creator_department
                                })
                                    .then((response) => {
                                        // console.log('WhatsApp sent successfully');
                                        // console.log(response.data);
                                    })
                                    .catch((error) => {
                                        console.error(
                                            'WhatsApp send failed',
                                            error?.response?.data || error.message
                                        );
                                    });
                            })
                        // Step 5: Emit WebSocket event to all connected systems
                        req.io.emit("new_data_collection_request", {
                            RequestedEmplyee: requested_employee,
                            requestdetail: DatacollectonResult,
                            Incident_slno: slno,
                            createdAt: new Date(),
                        });


                        // Optional older broadcast (you can remove if not used)
                        req.io.emit("message", "new_data_collection_request! Please Check");

                    });
                }

                // Step 3: Only update the status ONCE if inc_data_collection_req === 0
                if (checkresult[0]?.inc_data_collection_req === 0) {
                    UpdateDataCollectionReqStatus(slno, (err, updateResult) => {
                        if (err) {
                            return res.status(200).json({
                                success: 0,
                                message: err
                            });
                        }
                        // Step 4: Send final success response after update
                        return res.status(200).json({
                            success: 2,
                            message: 'Process completed and incident updated.',
                            data: results
                        });
                    });
                } else {
                    // If update not needed, send success response
                    return res.status(200).json({
                        success: 2,
                        message: 'Process completed. No update needed.',
                        data: results
                    });
                }
            });
        });
    },

    getAllIncidentHodIncharge: (req, res) => {
        const data = req.body;
        getAllIncidentHodIncharge(data, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (results?.length === 0) {
                return res.status(200).json({
                    success: 1,
                    message: 'No Record Found',
                    data: []
                });
            }

            return res.status(200).json({
                success: 2,
                message: 'Data Fetched Successfully',
                data: results
            });
        });
    },

    getAllInvolvedDepartment: (req, res) => {
        const data = req.body;
        getAllInvolvedDepartment(data, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (results?.length === 0) {
                return res.status(200).json({
                    success: 1,
                    message: 'No Record Found',
                    data: []
                });
            }

            return res.status(200).json({
                success: 2,
                message: 'Data Fetched Successfully',
                data: results
            });
        });
    },

    fetchAllInvolvedEmployeeDep: (req, res) => {
        const data = req.body;
        fetchAllInvolvedEmployeeDep(data, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (results?.length === 0) {
                return res.status(200).json({
                    success: 1,
                    message: 'No Record Found',
                    data: []
                });
            }

            return res.status(200).json({
                success: 2,
                message: 'Data Fetched Successfully',
                data: results
            });
        });
    },



    getCurrentEmployeeType: (req, res) => {
        const data = req.body;
        getCurrentEmployeeType(data, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (results?.length === 0) {
                return res.status(200).json({
                    success: 1,
                    message: 'No Record Found',
                    data: []
                });
            }

            return res.status(200).json({
                success: 2,
                message: 'Data Fetched Successfully',
                data: results
            });
        });
    },
    getDepartmentDataCollection: (req, res) => {
        const data = req.body;
        getDepartmentDataCollection(data, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (results?.length === 0) {
                return res.status(200).json({
                    success: 1,
                    message: 'No Record Found',
                    data: []
                });
            }

            return res.status(200).json({
                success: 2,
                message: 'Data Fetched Successfully',
                data: results
            });
        });
    },
    getAllActionDetails: (req, res) => {
        const data = req.body;
        getAllActionDetails(data, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (results?.length === 0) {
                return res.status(200).json({
                    success: 1,
                    message: 'No Record Found',
                    data: []
                });
            }

            return res.status(200).json({
                success: 2,
                message: 'Data Fetched Successfully',
                data: results
            });
        });
    },
    getDepActions: (req, res) => {
        const data = req.body;
        getDepActions(data, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (results?.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: 'No Record Found',
                    data: []
                });
            }

            return res.status(200).json({
                success: 2,
                message: 'Data Fetched Successfully',
                data: results
            });
        });
    },
    UpdateFileStatus: (req, res) => {
        const data = req.body;
        UpdateFileStatus(data, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            return res.status(200).json({
                success: 2,
                message: 'File Status RollBacked',

            });
        });
    },
    UpdateDepartMentDataCollectionFileStatus: (req, res) => {
        const data = req.body;
        UpdateDepartMentDataCollectionFileStatus(data, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            return res.status(200).json({
                success: 2,
                message: 'File Status RollBacked',

            });
        });
    },


    FetchAllIncidentActionDetail: (req, res) => {
        const data = req.body;
        FetchAllIncidentActionDetail(data, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            return res.status(200).json({
                success: 2,
                message: 'Successfully Fetched',
                data: results

            });
        });
    },


    getDeparmentAcknowledge: (req, res) => {
        const data = req.body;
        getDeparmentAcknowledge(data, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (results?.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: 'No Record Found',
                    data: []
                });
            }

            return res.status(200).json({
                success: 2,
                message: 'Action Approved Successfully',
                data: results
            });
        });
    },


    UpdateIncidentReviews: (req, res) => {
        const { inc_register_slno, inc_incharge_review, inc_hod_review, inc_qad_review } = req.body;

        if (!inc_register_slno)
            return res.status(400).json({ success: 0, message: "Incident ID is required" });
        // Base query and parameters


        const fields = [];
        const values = [];

        if (inc_incharge_review !== undefined) {
            fields.push("inc_incharge_review = ?");
            values.push(inc_incharge_review);
        }
        if (inc_hod_review !== undefined) {
            fields.push("inc_hod_review = ?");
            values.push(inc_hod_review);
        }
        if (inc_qad_review !== undefined) {
            fields.push("inc_qad_review = ?");
            values.push(inc_qad_review);
        }

        if (fields.length === 0) {
            return res.status(400).json({ success: 0, message: "No review field provided" });
        }

        const sql = `UPDATE inc_register_master SET ${fields.join(", ")} WHERE inc_register_slno = ?`;
        values.push(inc_register_slno);

        UpdateIncidentReviews({ sql, values }, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: err.message || err
                });
            }

            return res.status(200).json({
                success: 2,
                message: 'Successfully Completed Operations'
            });
        });
    },


    departmentRcaPreventiveSubmission: (req, res) => {
        const data = req.body;
        if (!data?.inc_data_collection_slno) {
            return res.status(200).json({
                success: 0,
                message: "Data Collection Id is Missing!"
            });
        }
        departmentRcaPreventiveSubmission(data, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            return res.status(200).json({
                success: 2,
                message: 'Data Updated Successfully',
                data: results
            });
        });
    },

    InchargeApproval: (req, res) => {
        const data = req.body;
        InchargeApproval(data, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            return res.status(200).json({
                success: 2,
                message: 'Incident Approved '
            });
        });
    },
    hodApproval: (req, res) => {
        const data = req.body;

        //  CASE 1: If HOD rejected (val === "R"), only update minimal fields
        if (data.inc_hod_reivew_state === 'R') {
            const sql = `
            UPDATE inc_register_master 
            SET    
                inc_hod_ack = ?,
                inc_hod_emp = ?,
                inc_hod_reivew_state = ?,
                inc_hod_review = ?,
                inc_hod_review_date = NOW()
            WHERE inc_register_slno = ?
        `;

            const params = [
                data.inc_hod_ack,
                data.inc_hod_emp,
                data.inc_hod_reivew_state,
                data.inc_hod_review,
                data.inc_register_slno
            ];

            return hodApproval({ sql, params }, (err, results) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: err.message || err
                    });
                }
                return res.status(200).json({
                    success: 2,
                    message: 'HOD Rejection Updated Successfully'
                });
            });
        }

        //  CASE 2: If not rejected (Normal Approval)
        let sql = `
        UPDATE inc_register_master 
        SET    
            inc_hod_ack = ?,
            inc_hod_emp = ?,
            inc_hod_reivew_state = ?,
            inc_hod_review = ?,
            inc_preventive_action = ?,
            inc_hod_review_date = NOW()
    `;

        const params = [
            data.inc_hod_ack,
            data.inc_hod_emp,
            data.inc_hod_reivew_state,
            data.inc_hod_review,
            data.inc_preventive_action
        ];

        // Add corrective + RCA if present
        if (
            data.inc_corrective_action !== undefined &&
            data.inc_rca !== undefined &&
            data.inc_rca_hod_approve !== undefined &&
            data.inc_corrective_hod_approval !== undefined
        ) {
            sql += `,
            inc_corrective_action = ?,
            inc_rca = ?,
            inc_rca_hod_approve = ?,
            inc_corrective_hod_approval = ?,
            inc_corrective_hod_aprvl_date = NOW(),
            inc_rca_hod_approve_date = NOW()
        `;
            params.push(
                data.inc_corrective_action,
                data.inc_rca,
                data.inc_rca_hod_approve,
                data.inc_corrective_hod_approval
            );
        }

        // If HOD is acknowledging directly (no incharge review)
        if (data.inc_incharge_ack !== undefined && data.inc_incharge_emp !== undefined) {
            sql += `,
            inc_incharge_ack = ?,
            inc_incharge_emp = ?,
            inc_incharge_reivew_state = ?,
            inc_incharge_review = ?,
            inc_incharge_review_date = NOW()
        `;
            params.push(
                data.inc_incharge_ack,
                data.inc_incharge_emp,
                data.inc_incharge_reivew_state,
                data.inc_incharge_review
            );
        }

        sql += ` WHERE inc_register_slno = ?`;
        params.push(data.inc_register_slno);

        hodApproval({ sql, params }, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: err.message || err
                });
            }

            return res.status(200).json({
                success: 2,
                message: 'Successfully Completed Operations'
            });
        });
    },


    QadApproval: (req, res) => {
        const data = req.body;
        QadApproval(data, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            return res.status(200).json({
                success: 2,
                message: 'Incident Approved '
            });
        });
    },
    IncidentRegistration: (req, res) => {
        const {
            inc_initiator_slno,
            inc_staff_type_slno,
            nature_of_inc,
            inc_describtion,
            file_status,
            inc_status,
            create_user,
            inc_initiator_dtl,
            dep_slno,
            sec_slno,
            inc_incharge_approval,
            inc_hod_approval,
            inc_data_collection_req,
            inc_reg_corrective,
            EmployeeFirstLevelDetail
        } = req.body;

        const postDate = {
            inc_initiator_slno,
            inc_staff_type_slno,
            nature_of_inc,
            inc_describtion,
            file_status,
            inc_status,
            create_user,
            dep_slno,
            sec_slno,
            inc_incharge_approval,
            inc_hod_approval,
            inc_data_collection_req,
            inc_reg_corrective
        };



        // common code for sending error mesg and suceess mesg  for reducing code repeatetion
        const sendError = (err) => res.status(200).json({ success: 0, message: err });
        const sendSuccess = (id) => res.status(200).json({
            success: 2,
            message: "Incident Registered Successfully",
            insertId: id
        });


        IncidentRegistration(postDate, (err, results) => {
            if (err) return sendError(err);
            const insertId = results.insertId;
            const currentYear = new Date().getFullYear();

            const recipeintsMap = new Map();

            const addRecipient = (item) => {
                if (!item.whatsapp_number) return;
                const key = String(item.whatsapp_number || item.requested_employee_mobile)?.trim();

                if (!recipeintsMap.has(key)) {
                    recipeintsMap.set(key, {
                        mobile: key,
                        employeeName: item.requested_employee_name || item.employee_name || '',
                        incidentNo: `IRN/TMCH/${currentYear}/${insertId}`,
                        creatorName: item.creator_name || "",
                        creatorDepartment: item.creator_department || "",
                        type: 'New Incident'
                    })
                }
            }

            getRegistrationEmployee(
                create_user,
                sec_slno,
                'IRN_REG',
                (err, WhatsUpNumbers) => {
                    if (err) {
                        console.error(err);
                        return;
                    }

                    WhatsUpNumbers.forEach(addRecipient);

                    const approvalPromises = EmployeeFirstLevelDetail?.map((item) => {
                        return new Promise((resolve) => {
                            getApprovalRequestDetail(
                                item?.level_emp_id,
                                create_user,
                                insertId,
                                (err, result) => {
                                    if (err || !result?.length) return resolve();
                                    const row = result[0];
                                    addRecipient({
                                        whatsapp_number: row.whatsapp_number || row.requested_employee_mobile,
                                        employee_name: row.requested_employee_name,
                                        incidentNo: `IRN/TMCH/${currentYear}/${insertId}`,
                                        creator_name: row.creator_name,
                                        creator_department: row.creator_department,
                                        creator_section: row.creator_section
                                    });

                                    resolve();
                                }
                            );
                        })
                    })

                    Promise.all(approvalPromises).then(() => {
                        const uniqueRecipients = [...recipeintsMap.values()];
                        uniqueRecipients.forEach((person) => {
                            sendIncidentRequestWhatsapp({
                                mobile: person.mobile,
                                employeeName: person.employeeName,
                                incidentNo: person.incidentNo,
                                creatorName: person.creatorName,
                                creatorDepartment: person.creatorDepartment,
                                type: 'New Incident'
                            }).catch((error) => {
                                console.error("WhatsApp send failed",
                                    error?.response?.data || error.message
                                );
                            });
                        });
                    });
                }
            );


            if (inc_initiator_slno === 1) {
                const insertPromises = inc_initiator_dtl?.map(patient => {
                    const patientData = {
                        inc_register_slno: insertId,
                        inc_pt_name: patient.PTC_PTNAME,
                        inc_pt_no: patient.PT_NO,
                        inc_pt_gender: patient.PTC_SEX,
                        inc_pt_mobile: patient.PTC_MOBILE,
                        inc_pt_age: patient.PTN_YEARAGE,
                        inc_pt_address: `${patient.PTC_LOADD1}, ${patient.PTC_LOADD2}`,
                        create_user
                    };

                    return new Promise((resolve, reject) => {
                        InsertIncPatientDetail(patientData, (err) => {
                            if (err) return reject(err);
                            resolve();
                        });
                    });
                });

                Promise.all(insertPromises)
                    .then(() => sendSuccess(insertId))
                    .catch(err => {
                        ChangeIncidentStatus({ incident_slno: insertId }, () => {
                            return sendError(err);
                        });
                    });
            }

            if (inc_initiator_slno === 2) {
                const insertPromises = inc_initiator_dtl?.map(staff => {
                    const staffData = {
                        inc_register_slno: insertId,
                        inc_staff_type_slno: inc_staff_type_slno,
                        emp_id: staff.em_id,
                        emp_user_name: staff.em_no, // assuming emp_user_name is employee number
                        emp_name: staff.em_name?.trim(),
                        emp_age: staff.em_age_year,
                        emp_gender: staff.em_gender,
                        emp_desig: staff.em_designation,
                        emp_dept: staff.em_department,
                        emp_dept_sec: staff.em_dept_section,
                        emp_mob: staff.em_mobile,
                        emp_email: staff.em_email,
                        emp_address: `${staff.addressPermnt1 || ""}, ${staff.addressPermnt2 || ""}`.trim(),
                        emp_joining_date: staff.em_doj,
                        create_user
                    };

                    return new Promise((resolve, reject) => {
                        InsertIncStaffDetail(staffData, (err) => {
                            if (err) return reject(err);
                            resolve();
                        });
                    });
                });

                Promise.all(insertPromises)
                    .then(() => sendSuccess(insertId))
                    .catch(err => {
                        ChangeIncidentStatus({ incident_slno: insertId }, () => {
                            return sendError(err);
                        });
                    });
            }

            if (inc_initiator_slno === 3) {
                const insertPromises = inc_initiator_dtl.map(visitor => {
                    const visitorData = {
                        inc_register_slno: insertId,
                        inc_visitor_name: visitor.visitor_name,
                        inc_visitor_age: visitor.visitor_age,
                        inc_visitor_gender: visitor.visitor_gender,
                        inc_visitor_mobile: visitor.visitor_mobile,
                        inc_visitor_address: visitor.visitor_address,
                        inc_visit_purpose: visitor.purpose,
                        create_user
                    };

                    return new Promise((resolve, reject) => {
                        IncidentVisitorDetail(visitorData, (err) => {
                            if (err) return reject(err);
                            resolve();
                        });
                    });
                });

                Promise.all(insertPromises)
                    .then(() => sendSuccess(insertId))
                    .catch(err => {
                        ChangeIncidentStatus({ incident_slno: insertId }, () => {
                            return sendError(err);
                        });
                    });
            }

            if (inc_initiator_slno === 4) {

                const insertPromises = inc_initiator_dtl.map(asset => {
                    const assetData = {
                        inc_register_slno: insertId,
                        inc_is_asset: asset.item_isAsset ? 1 : 0,
                        asset_item_slno: asset.item_isAsset ? asset.item_slno : null,
                        custodian_dept_slno: asset.item_custodian_dept_slno || asset.am_custodian_slno || null,
                        item_name: asset.item_name,
                        item_location: asset.location,
                        manufacture_slno: asset.am_manufacture_no,
                        create_user
                    };

                    return new Promise((resolve, reject) => {
                        IncidentAssetDtl(assetData, (err) => {
                            if (err) return reject(err);
                            resolve();
                        });
                    });
                });

                Promise.all(insertPromises)
                    .then(() => sendSuccess(insertId))
                    .catch(err => {
                        ChangeIncidentStatus({ incident_slno: insertId }, () => {
                            return sendError(err);
                        });
                    });
            }

            if (inc_initiator_slno === 5) {
                const commonData = {
                    inc_register_slno: insertId,
                    inc_common_description: inc_initiator_dtl || "",
                    create_user
                };

                InsertIncCommonDetail(commonData, (err) => {
                    if (err) {
                        return ChangeIncidentStatus({ incident_slno: insertId }, () => {
                            return sendError(err);
                        });
                    }
                    return sendSuccess(insertId);
                });
            }
        });
    },


    IncidentUpdation: (req, res) => {
        const {
            nature_of_inc,
            inc_describtion,
            file_status,
            inc_status,
            edit_user,
            inc_register_slno,
            inc_reg_corrective
        } = req.body;

        const postDate = {
            nature_of_inc,
            inc_describtion,
            file_status,
            inc_status,
            edit_user,
            inc_reg_corrective,
            inc_register_slno
        };


        // common code for sending error mesg and suceess mesg  for reducing code repeatetion
        const sendError = (err) => res.status(200).json({ success: 0, message: err });
        const sendSuccess = (id) => res.status(200).json({
            success: 2,
            message: "Incident Updation Successfully",
        });

        IncidentUpdation(postDate, (err, results) => {
            if (err) return sendError(err);
            sendSuccess()

        });
    },


    updateDataCollectionEmployeeDetail: (req, res) => {
        const body = req.body;
        checkAlreadyMapedEmployee(body, (err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (Array.isArray(result) && result?.length > 0) {
                return res.json({
                    success: 1,
                    message: 'Item Already present'
                })
            }
            updateDataCollectionEmployeeDetail(body, (err, results) => {
                if (err) {
                    return res.status(200).json({
                        success: 0,
                        message: err
                    });
                }
                return res.status(200).json({
                    success: 2,
                    message: 'Data Updated Successfully'
                });
            });
        });
    },
    updateIncidentNature: (req, res) => {
        const body = req.body;
        updateIncidentNature(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 2,
                message: 'Data Updated Successfully'
            });
        });
    },
    getIncidentFromDashboard: (req, res) => {
        const body = req.body;
        getIncidentFromDashboard(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 2,
                message: 'Data Updated Successfully',
                data: results
            });
        });
    },



    getIncidentInitiator: (req, res) => {
        getIncidentInitiator((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (results?.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: 'No Data Found',
                    data: []
                });
            }
            return res.status(200).json({
                success: 2,
                message: 'Fetched  Successfully',
                data: results
            });
        });
    },


    getStartNewConverstion: (req, res) => {

        const { conversation, users } = req.body;
        // STEP 1 : CREATE CONVERSATION
        createConversation(conversation, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            const conversation_id = results.insertId;

            // STEP 2 : PREPARE USERS ARRAY

            const usersArray = users.map(user => [
                conversation_id,
                user.emp_id,
                user.department_id,
                user.section_id,
                user.is_admin
            ]);

            // STEP 3 : INSERT USERS

            addConversationUsers(usersArray, (userErr, userResults) => {
                if (userErr) {
                    return res.status(200).json({
                        success: 0,
                        message: userErr
                    });
                }
                return res.status(200).json({
                    success: 1,
                    message: 'Conversation Created',
                    conversation_id
                });
            });
        });
    },
    getConversation: (req, res) => {
        const data = req.body;
        getConversation(data, (err, results) => {

            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getExternalEmployeeConversations: (req, res) => {
        const data = req.body;

        const { emp_id } = data;

        if (!emp_id) {
            return res.status(200).json({
                success: 0,
                message: "Employee Id is Missing!"
            });
        }

        getExternalEmployeeConversations(emp_id, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    sendConversationMessage: (req, res) => {
        const data = req.body;
        const senderEmpId = data.sender_emp_id;

        createConversationMessage(data, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            const messageId = results.insertId;

            getConversationParticipants(data.conversation_id, senderEmpId, (partErr, participants) => {
                if (partErr) {
                    console.error('Error getting participants:', partErr);
                    return res.status(200).json({
                        success: 0,
                        message: partErr
                    });
                }

                const afterNotifications = (finalParticipants) => {
                    emitMessagesAndNotifications(messageId, data, finalParticipants || []);
                };

                if (participants && participants.length > 0) {
                    createNotificationsForMessage(
                        messageId,
                        data.conversation_id,
                        participants,
                        data.message,
                        (notifErr, notifResults) => {
                            if (notifErr) {
                                console.error('Error creating notifications:', notifErr);
                                return afterNotifications(participants);
                            }
                            afterNotifications(notifResults || participants);
                        }
                    );
                } else {
                    afterNotifications([]);
                }
            });
        });

        function emitMessagesAndNotifications(messageId, data, participants) {
            const emitToUsers = async () => {
                if (!participants || participants.length === 0) return;
                const conversationRoom = `conv_${data.conversation_id}`;

                const sockets = await req.io
                    .in(conversationRoom)
                    .fetchSockets();
                const activeUsers = new Set(
                    sockets.map(s => String(s.data.emp_id))
                );

                participants?.forEach(part => {
                    const roomName = `emp_${part.emp_id}`;

                    const isParticipantViewingConversation =
                        activeUsers.has(String(part.emp_id));

                    if (!isParticipantViewingConversation) {
                        req.io.to(roomName).emit("new-notification", {
                            notification_id: part.notification_id,
                            emp_id: part.emp_id,
                            conversation_id: data.conversation_id,
                            message_id: messageId,
                            title: `${data.sender_name}`,
                            message_preview: data.message.length > 50
                                ? data.message.substring(0, 50) + '...'
                                : data.message,
                            created_at: new Date()
                        });
                    } else {
                        markAsRead(part.notification_id, part.emp_id);
                    }

                    req.io.to(roomName).emit("new-message", {
                        message_id: messageId,
                        conversation_id: data.conversation_id,
                        sender_emp_id: data.sender_emp_id,
                        sender_name: data.sender_name,
                        message_type: data.message_type || 'TEXT',
                        message: data.message,
                        created_at: new Date()
                    });
                });
            };

            if (Array.isArray(data.attachments) && data.attachments.length > 0) {
                const attachmentArray = data.attachments.map(file => ([
                    messageId,
                    file.file_name,
                    file.original_name,
                    file.file_url,
                    file.file_size,
                    file.mime_type,
                    data.sender_emp_id
                ]));

                addMessageAttachments(attachmentArray, (attachErr) => {
                    if (attachErr) {
                        return res.status(200).json({
                            success: 0,
                            message: attachErr
                        });
                    }

                    emitToUsers();
                    return res.status(200).json({
                        success: 1,
                        message: 'Message Sent Successfully',
                        message_id: messageId
                    });
                });
            } else {
                emitToUsers();
                return res.status(200).json({
                    success: 1,
                    message: 'Message Sent Successfully',
                    message_id: messageId
                });
            }
        }
    },

    getConversationMessages: (req, res) => {

        const { conversation_id, empid, cursor = null } = req.body;


        if (!conversation_id) {
            return res.status(200).json({
                success: 0,
                message: "conversation_id is required"
            });
        }
        fetchConversationMessages(conversation_id, empid, cursor, (err, results) => {

            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (!results || results.length === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No Data found",
                    data: []
                });
            }

            const formattedResults = results.map(row => {
                let attachments = [];
                try {
                    attachments = row.attachments
                        ? JSON.parse(`[${row.attachments}]`)
                        : [];

                    // remove null records
                    attachments = attachments.filter(
                        a => a.file_url !== null
                    );

                    //  IMPORTANT FIX: convert file path → HTTP URL
                    attachments = attachments.map(file => {
                        if (!file.file_url) return file;
                        const cleanPath = file.file_url.replace(/\\/g, '/');
                        // extract path after base folder
                        const relativePath = cleanPath.split(
                            'ChatConversationFiles'
                        )[1];
                        return {
                            ...file,
                            file_url: `${relativePath}`
                        };
                    });
                } catch (e) {
                    attachments = [];
                }

                return {
                    ...row,
                    attachments
                };
            });


            return res.status(200).json({
                success: 1,
                data: formattedResults
            });
        }
        );
    },
    // fetchMergedConversationMessages: (req, res) => {
    //     const { conversation_ids, empid } = req.body;
    //     // VALIDATION
    //     if (
    //         !Array.isArray(conversation_ids) ||
    //         conversation_ids.length === 0
    //     ) {
    //         return res.status(200).json({
    //             success: 0,
    //             message:
    //                 "conversation_ids array is required"
    //         });
    //     }

    //     fetchMergedConversationMessages(
    //         conversation_ids,
    //         empid,
    //         (err, results) => {
    //             if (err) {
    //                 return res.status(200).json({
    //                     success: 0,
    //                     message: err
    //                 });
    //             }
    //             if (!results || results.length === 0) {
    //                 return res.status(200).json({
    //                     success: 1,
    //                     message: "No Data found",
    //                     date: []
    //                 });
    //             }

    //             const formattedResults =
    //                 results?.map(row => {
    //                     let attachments = [];
    //                     try {
    //                         attachments =
    //                             row.attachments
    //                                 ? JSON.parse(
    //                                     `[${row.attachments}]`
    //                                 )
    //                                 : [];
    //                         // REMOVE NULL FILES
    //                         attachments =
    //                             attachments.filter(
    //                                 a => a.file_url !== null
    //                             );
    //                         // FORMAT FILE URL
    //                         attachments =
    //                             attachments.map(file => {
    //                                 if (!file?.file_url) {
    //                                     return file;
    //                                 }
    //                                 const cleanPath = file.file_url.replace(/\\/g, '/');
    //                                 const relativePath = cleanPath.split('ChatConversationFiles')[1];
    //                                 return {
    //                                     ...file,
    //                                     file_url: relativePath
    //                                 };
    //                             });
    //                     } catch (e) {
    //                         attachments = [];
    //                     }
    //                     return {
    //                         ...row,
    //                         attachments
    //                     };
    //                 });

    //             return res.status(200).json({
    //                 success: 1,
    //                 data: formattedResults
    //             });
    //         }
    //     );
    // },


    fetchMergedConversationMessages: (req, res) => {

        const { conversation_ids, empid, cursor = null } = req.body;

        // VALIDATION
        if (
            !Array.isArray(conversation_ids) ||
            conversation_ids.length === 0
        ) {
            return res.status(200).json({
                success: 0,
                message: "conversation_ids array is required"
            });
        }

        fetchMergedConversationMessages(
            conversation_ids,
            empid,
            cursor,
            (err, results) => {

                if (err) {
                    return res.status(200).json({
                        success: 0,
                        message: err
                    });
                }

                if (!results || results.length === 0) {
                    return res.status(200).json({
                        success: 1,
                        message: "No Data found",
                        data: []
                    });
                }

                const formattedResults = results.map(row => {

                    let attachments = [];

                    try {
                        attachments = row.attachments
                            ? JSON.parse(`[${row.attachments}]`)
                            : [];

                        // remove null files
                        attachments = attachments.filter(
                            a => a.file_url !== null
                        );

                        // format file URL
                        attachments = attachments.map(file => {
                            if (!file?.file_url) return file;

                            const cleanPath = file.file_url.replace(/\\/g, '/');
                            const relativePath =
                                cleanPath.split('ChatConversationFiles')[1];

                            return {
                                ...file,
                                file_url: relativePath
                            };
                        });

                    } catch (e) {
                        attachments = [];
                    }

                    return {
                        ...row,
                        attachments
                    };
                });

                return res.status(200).json({
                    success: 1,
                    data: formattedResults
                });
            }
        );
    },
    DeletemessageDetail: (req, res) => {
        const { id } = req.params;
        // VALIDATION
        if (!id) {
            return res.status(200).json({
                success: 0,
                message: "Message Id is Missing !"
            });
        }

        DeletemessageDetail(id, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            return res.status(200).json({
                success: 1,
                message: "Delected"
            });
        }
        );
    },
    EditMessageDetail: (req, res) => {
        const { message, message_id } = req.body;
        // VALIDATION
        if (!message_id) {
            return res.status(200).json({
                success: 0,
                message: "Invalid Payload!"
            });
        }

        EditMessageDetail(message, message_id, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            return res.status(200).json({
                success: 1,
                message: "Edited"
            });
        }
        );
    },


    deleteConversationAttachment: (req, res) => {

        const { attachment_id } = req.params;

        deleteMessageAttachment(
            attachment_id,
            (err, results) => {

                if (err) {
                    return res.status(200).json({
                        success: 0,
                        message: err
                    });
                }

                return res.status(200).json({
                    success: 1,
                    message: 'Attachment deleted successfully'
                });
            }
        );
    },

    getConversationEmployees: (req, res) => {

        const { conversation_id } = req.params;

        getConversationEmployees(
            conversation_id,
            (err, results) => {

                if (err) {
                    return res.status(200).json({
                        success: 0,
                        message: err
                    });
                }

                return res.status(200).json({
                    success: 1,
                    data: results
                });
            }
        );
    },


    RemoveConversationMember: (req, res) => {
        const {
            conversation_id,
            emp_id
        } = req.params;
        removeConversationMember(conversation_id, emp_id, (err, results) => {

            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: 'Database Error'
                });
            }

            req.io.emit("ParticipantRemoved", {
                ConvesationId: conversation_id,
                EmployeeId: emp_id,
                createdAt: new Date()
            });

            return res.status(200).json({
                success: 1,
                message: 'Member removed successfully'
            });
        }
        );

    },

    AddNewMembertoGroup: (req, res) => {

        const {
            coverstation_id,
            Employee,
            JoinMessageId
        } = req.body;

        if (!coverstation_id) {
            return res.status(200).json({
                success: 0,
                message: "Conversation Id is Missing!"
            });
        }

        if (!Employee || Employee.length === 0) {
            return res.status(200).json({
                success: 0,
                message: "Employee is Missing"
            });
        }

        const empIds = Employee.map(item => item.em_id);

        FindConversationMembers(
            coverstation_id,
            empIds,
            (err, existingMembers) => {

                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: "Database Error"
                    });
                }

                const existingMap = new Map(
                    existingMembers.map(item => [
                        item.emp_id,
                        item.user_status
                    ])
                );

                const newMembers = [];
                const reactivateMembers = [];

                Employee.forEach(emp => {
                    const status = existingMap.get(emp.em_id);
                    if (status === undefined) {
                        // Never added before
                        newMembers.push(emp);
                    } else if (status === 0) {
                        // Removed member
                        reactivateMembers.push(emp);
                    }
                    // status === 1
                    // Already active member -> Ignore
                });

                const insertValues = newMembers.map(item => [
                    coverstation_id,
                    item.em_id,
                    item.em_department,
                    item.em_dept_section,
                    JoinMessageId
                ]);

                const reactivateIds = reactivateMembers.map(
                    item => item.em_id
                );

                const handleSuccess = () => {
                    return res.status(200).json({
                        success: 1,
                        message: 'Member(s) Added Successfully'
                    });
                };

                const EmitSocketMessage = (employeeIds = []) => {

                    req.io.emit("new-member", {
                        ConvesationId: coverstation_id,
                        EmployeeIds: employeeIds,
                        createdAt: new Date()
                    });

                };
                // Only Reactivate
                if (insertValues.length === 0 && reactivateIds.length > 0) {
                    return ReactivateConversationMembers(
                        coverstation_id,
                        reactivateIds,
                        JoinMessageId,
                        (err) => {

                            if (err) {
                                return res.status(500).json({
                                    success: 0,
                                    message: "Database Error"
                                });
                            }
                            EmitSocketMessage(reactivateIds);
                            return handleSuccess();
                        }
                    );
                }

                // Only Insert
                if (insertValues.length > 0 && reactivateIds.length === 0) {
                    return AddNewMemberToGroup(
                        insertValues,
                        (err) => {
                            if (err) {
                                return res.status(500).json({
                                    success: 0,
                                    message: "Database Error"
                                });
                            }
                            EmitSocketMessage(newMembers.map(item => item.em_id));
                            return handleSuccess();
                        }
                    );
                }

                // Both Insert + Reactivate
                if (insertValues.length > 0 && reactivateIds.length > 0) {
                    ReactivateConversationMembers(
                        coverstation_id,
                        reactivateIds,
                        JoinMessageId,
                        (err) => {

                            if (err) {
                                return res.status(500).json({
                                    success: 0,
                                    message: "Database Error"
                                });
                            }

                            AddNewMemberToGroup(
                                insertValues,
                                (err) => {

                                    if (err) {
                                        return res.status(500).json({
                                            success: 0,
                                            message: "Database Error"
                                        });
                                    }

                                    const allAddedMembers = [
                                        ...reactivateIds,
                                        ...newMembers?.map(item => item.em_id)
                                    ];

                                    EmitSocketMessage(allAddedMembers);
                                    return handleSuccess();
                                }
                            );
                        }
                    );

                    return;
                }

                // All selected users already active
                return res.status(200).json({
                    success: 1,
                    message: 'All selected users are already members'
                });

            }
        );
    },

    GetLastMessageId: (req, res) => {
        const { conversation_id } = req.params;

        getLastMessageId(
            conversation_id,
            (err, result) => {

                if (err) {
                    return res.status(200).json({
                        success: 0,
                        message: 'Failed to fetch last message id',
                        error: err.message
                    });
                }

                return res.status(200).json({
                    success: 1,
                    data: result
                });
            }
        );
    },

    GetConverstaionUnreadCount: (req, res) => {
        const { empId } = req.params;

        getUnreadCountsByConversation(
            empId,
            (err, result) => {

                if (err) {
                    return res.status(200).json({
                        success: 0,
                        message: 'Failed to get the Unread Message',
                        error: err.message
                    });
                }

                return res.status(200).json({
                    success: 1,
                    data: result
                });
            }
        );
    },
    MarkConverSationAsRead: (req, res) => {
        const { conversationId, empId } = req.body;

        markConversationAsRead(
            conversationId, empId,
            (err, result) => {

                if (err) {
                    return res.status(200).json({
                        success: 0,
                        message: 'Failed to get the Unread Message',
                        error: err.message
                    });
                }

                return res.status(200).json({
                    success: 1,
                    data: result
                });
            }
        );
    },

    getAllUnreadCount: (req, res) => {
        const { empId } = req.params;

        getUnreadCount(empId,
            (err, result) => {

                if (err) {
                    return res.status(200).json({
                        success: 0,
                        message: 'Failed to get the All Unread Message',
                        error: err.message
                    });
                }

                return res.status(200).json({
                    success: 1,
                    data: result
                });
            }
        );
    },
    insertWhatsappController: (req, res) => {
        const data = req.body;
        insertWhatsapp(data, (err, result) => {
            if (err) {
                return res.json({
                    success: 0,
                    message: 'Insert error',
                    error: err
                });
            }

            return res.json({
                success: 2,
                message: 'Inserted successfully',
                result
            });
        });
    },
    updateWhatsappController: (req, res) => {

        const data = req.body;

        updateWhatsapp(data, (err, result) => {
            if (err) {
                return res.json({
                    success: 0,
                    message: 'Update error',
                    error: err
                });
            }

            return res.json({
                success: 2,
                message: 'Updated successfully',
                result
            });
        });
    },
    getWhatsappController: (req, res) => {
        getAllWhatsapp((err, result) => {
            if (err) {
                return res.json({
                    success: 0,
                    message: 'Fetch error',
                    error: err
                });
            }

            return res.json({
                success: 1,
                data: result
            });
        });
    },



    insertEventController: (req, res) => {
        const data = req.body;
        insertEvent(data, (err, result) => {
            if (err) {
                return res.json({
                    success: 0,
                    message: 'Insert error',
                    error: err
                });
            }

            return res.json({
                success: 2,
                message: 'Inserted successfully',
                result
            });
        });
    },

    updateEventController: (req, res) => {
        const data = req.body;
        updateEvent(data, (err, result) => {
            if (err) {
                return res.json({
                    success: 0,
                    message: 'Update error',
                    error: err
                });
            }

            return res.json({
                success: 2,
                message: 'Updated successfully',
                result
            });
        });
    },

    getEventController: (req, res) => {
        getAllEvent((err, result) => {
            if (err) {
                return res.json({
                    success: 0,
                    message: 'Fetch error',
                    error: err
                });
            }

            return res.json({
                success: 1,
                data: result
            });
        });
    },
    insertNotificationConfigController: (req, res) => {
        const data = req.body;
        insertNotificationConfig(data, (err, result) => {
            if (err) {
                return res.json({
                    success: 0,
                    message: 'Insert error',
                    error: err
                });
            }

            return res.json({
                success: 2,
                message: 'Inserted successfully',
                result
            });
        });
    },

    updateNotificationConfigController: (req, res) => {
        const data = req.body;
        updateNotificationConfig(data, (err, result) => {
            if (err) {
                return res.json({
                    success: 0,
                    message: 'Update error',
                    error: err
                });
            }

            return res.json({
                success: 2,
                message: 'Updated successfully',
                result
            });
        });
    },

    getNotificationConfigController: (req, res) => {
        getAllNotificationConfig((err, result) => {
            if (err) {
                return res.json({
                    success: 0,
                    message: 'Fetch error',
                    error: err
                });
            }

            return res.json({
                success: 1,
                data: result
            });
        });
    },
}