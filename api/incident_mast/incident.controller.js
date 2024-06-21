const {
    IncidetDetailInsert, IncidentDetailsUpdate, UpdateMarkedIncidentDetails, deleteIncident, ErrorIncidentUpdate,
    RedosIncidentUpdate, IdentifErrorIncidentUpdate, FallsIncidentUpdate, SentinelIncidentUpdate, NearMissessIncidentUpdate,
    SearchIncidentDetails, IncidentApprovalChecks, IPErrorIncidentUpdate, IPRedosIncidentUpdate, IPIdentifErrorIncidentUpdate,
    IPFallsIncidentUpdate, IPSentinelIncidentUpdate, IPNearMissessIncidentUpdate
} = require('./incident.service')
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






}