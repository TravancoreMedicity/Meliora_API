const { pool } = require('../../config/database')
module.exports = {
    getItemListApproval: (id, callBack) => {
        pool.query(
            `SELECT
                   req_detl_slno, req_slno, item_slno, approve_item_desc, approve_item_brand, approve_item_unit,
                   item_qnty_approved,approve_item_unit_price, approve_aprox_cost, item_status_approved, approve_item_status,
                   I.uom_name as apprv_uom,approve_item_specification,hold_remarks,reject_remarks,po_item_status,
                   internal_remarks
             FROM
                  crm_request_mast_detail
                LEFT JOIN am_uom I ON I.uom_slno=crm_request_mast_detail.approve_item_unit
             WHERE
                 req_slno=? and approve_item_status=1`,
            [
                id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getItemStatus: (id, callBack) => {
        pool.query(
            `SELECT
                   item_apprv_slno,req_detl_slno,item_incharge_approve, item_hod_approve,item_dms_approve,item_ms_approve,
                   item_mo_approve,item_smo_approve,item_gm_approve,item_ed_approve,item_md_approve
		     FROM
                   crm_reqitems_approval_details
		     WHERE       
                   req_slno=? AND active_status=1`,
            [
                id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },


    InactiveItemDetail: (data, callback) => {
        pool.query(
            `UPDATE crm_request_mast_detail 
                SET approve_item_status = 0 ,
                approve_item_delete_who=?  ,
                approve_item_delete_user=?
                WHERE req_detl_slno =?`,
            [
                data.approve_item_delete_who,
                data.approve_item_delete_user,
                data.req_detl_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },


    updateInchargeApproval: (data, callback) => {
        pool.query(
            `UPDATE crm_request_approval 
            SET incharge_approve = ?,
            incharge_remarks = ?,
            inch_detial_analysis=?,
            incharge_apprv_date = ?,
            incharge_user=?
            WHERE req_slno =?`,
            [
                data.incharge_approve,
                data.incharge_remarks,
                data.inch_detial_analysis,
                data.incharge_apprv_date,
                data.incharge_user,
                data.req_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    updateReqMstInternally: (data, callback) => {

        pool.query(
            `UPDATE
                   crm_request_master
             SET
                   req_status = 'I',reject_status = 0,onhold_status = 0,internally_arranged_status=1
             WHERE
                   req_slno =?`,
            [
                data.req_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    updateAllItemStatusForInternallArran: (body) => {
        return Promise.all(body.map((val) => {
            return new Promise((resolve, reject) => {
                pool.query(
                    `UPDATE
                           crm_request_mast_detail
                     SET
                           item_status_approved = 4 
                     WHERE
                           req_detl_slno = ? and req_slno = ?`,
                    [
                        val.req_detl_slno,
                        val.req_slno
                    ],
                    (error, results, fields) => {
                        if (error) {
                            return reject(error)
                        }
                        return resolve(results)
                    }
                )
            })
        })
        )
    },
    updateReqMstHold: (data, callback) => {
        pool.query(
            `UPDATE
                   crm_request_master
             SET
                   req_status = 'P',reject_status = ?,onhold_status = ?,internally_arranged_status=?
             WHERE
                   req_slno =?`,
            [
                data.reject_status,
                data.onhold_status,
                data.internally_arranged_status,
                data.req_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    updateReqMstApproved: (data, callback) => {

        pool.query(
            `UPDATE
                   crm_request_master
             SET
                   req_status = 'A',reject_status = ?,onhold_status = ?,internally_arranged_status=?
             WHERE
                   req_slno =?`,
            [
                data.reject_status,
                data.onhold_status,
                data.internally_arranged_status,
                data.req_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    updateApprovedInchargeItemStatus: (body) => {
        return Promise.all(body.map((val) => {
            return new Promise((resolve, reject) => {
                pool.query(
                    `UPDATE
                           crm_reqitems_approval_details
                     SET
                           item_incharge_approve = ? ,
                           item_incharge_remarks = ?  ,
                           item_incharge_apprv_date = ?,
                           item_incharge_user = ?
                     WHERE
                           req_detl_slno = ? and req_slno = ?`,
                    [
                        val.itemStatus,
                        val.remarks,
                        val.statusDate,
                        val.user,
                        val.req_detl_slno,
                        val.req_slno
                    ],
                    (error, results, fields) => {
                        if (error) {
                            return reject(error)
                        }
                        return resolve(results)
                    }
                )
            })
        })
        )
    },

    updateApprovedHODItemStatus: (body) => {
        return Promise.all(body.map((val) => {
            return new Promise((resolve, reject) => {
                pool.query(
                    `UPDATE
                           crm_reqitems_approval_details
                     SET
                           item_hod_approve = ? ,
                           item_hod_remarks = ?  ,
                           item_hod_apprv_date = ?,
                           item_hod_user = ?
                     WHERE
                           req_detl_slno = ? and req_slno = ?`,
                    [
                        val.itemStatus,
                        val.remarks,
                        val.statusDate,
                        val.user,
                        val.req_detl_slno,
                        val.req_slno
                    ],
                    (error, results, fields) => {
                        if (error) {
                            return reject(error)
                        }
                        return resolve(results)
                    }
                )
            })
        })
        )
    },

    updateApprovedDMSItemStatus: (body) => {
        return Promise.all(body.map((val) => {
            return new Promise((resolve, reject) => {
                pool.query(
                    `UPDATE
                           crm_reqitems_approval_details
                     SET
                           item_dms_approve = ? ,
                           item_dms_remarks = ?  ,
                           item_dms_apprv_date = ?,
                           item_dms_user = ?
                     WHERE
                           req_detl_slno = ? and req_slno = ?`,
                    [
                        val.itemStatus,
                        val.remarks,
                        val.statusDate,
                        val.user,
                        val.req_detl_slno,
                        val.req_slno
                    ],
                    (error, results, fields) => {
                        if (error) {
                            return reject(error)
                        }
                        return resolve(results)
                    }
                )
            })
        })
        )
    },

    updateApprovedMSItemStatus: (body) => {
        return Promise.all(body.map((val) => {
            return new Promise((resolve, reject) => {
                pool.query(
                    `UPDATE
                           crm_reqitems_approval_details
                     SET
                           item_ms_approve = ? ,
                           item_ms_remarks = ?  ,
                           item_ms_apprv_date = ?,
                           item_ms_user = ?
                     WHERE
                           req_detl_slno = ? and req_slno = ?`,
                    [
                        val.itemStatus,
                        val.remarks,
                        val.statusDate,
                        val.user,
                        val.req_detl_slno,
                        val.req_slno
                    ],
                    (error, results, fields) => {
                        if (error) {
                            return reject(error)
                        }
                        return resolve(results)
                    }
                )
            })
        })
        )
    },
    updateApprovedMOItemStatus: (body) => {
        return Promise.all(body.map((val) => {
            return new Promise((resolve, reject) => {
                pool.query(
                    `UPDATE
                           crm_reqitems_approval_details
                     SET
                           item_mo_approve = ? ,
                           item_mo_remarks = ?  ,
                           item_mo_apprv_date = ?,
                           item_mo_user = ?
                     WHERE
                           req_detl_slno = ? and req_slno = ?`,
                    [
                        val.itemStatus,
                        val.remarks,
                        val.statusDate,
                        val.user,
                        val.req_detl_slno,
                        val.req_slno
                    ],
                    (error, results, fields) => {
                        if (error) {
                            return reject(error)
                        }
                        return resolve(results)
                    }
                )
            })
        })
        )
    },

    updateApprovedSMOItemStatus: (body) => {
        return Promise.all(body.map((val) => {
            return new Promise((resolve, reject) => {
                pool.query(
                    `UPDATE
                           crm_reqitems_approval_details
                     SET
                           item_smo_approve = ? ,
                           item_smo_remarks = ?  ,
                           item_smo_apprv_date = ?,
                           item_smo_user = ?
                     WHERE
                           req_detl_slno = ? and req_slno = ?`,
                    [
                        val.itemStatus,
                        val.remarks,
                        val.statusDate,
                        val.user,
                        val.req_detl_slno,
                        val.req_slno
                    ],
                    (error, results, fields) => {
                        if (error) {
                            return reject(error)
                        }
                        return resolve(results)
                    }
                )
            })
        })
        )
    },

    updateApprovedGMItemStatus: (body) => {
        return Promise.all(body.map((val) => {
            return new Promise((resolve, reject) => {
                pool.query(
                    `UPDATE
                           crm_reqitems_approval_details
                     SET
                           item_gm_approve = ? ,
                           item_gm_remarks = ?  ,
                           item_gm_apprv_date = ?,
                           item_gm_user = ?
                     WHERE
                           req_detl_slno = ? and req_slno = ?`,
                    [
                        val.itemStatus,
                        val.remarks,
                        val.statusDate,
                        val.user,
                        val.req_detl_slno,
                        val.req_slno
                    ],
                    (error, results, fields) => {
                        if (error) {
                            return reject(error)
                        }
                        return resolve(results)
                    }
                )
            })
        })
        )
    },


    updateApprovedMDItemStatus: (body) => {
        return Promise.all(body.map((val) => {
            return new Promise((resolve, reject) => {
                pool.query(
                    `UPDATE
                           crm_reqitems_approval_details
                     SET
                           item_md_approve = ? ,
                           item_md_remarks = ?  ,
                           item_md_apprv_date = ?,
                           item_md_user = ?
                     WHERE
                           req_detl_slno = ? and req_slno = ?`,
                    [
                        val.itemStatus,
                        val.remarks,
                        val.statusDate,
                        val.user,
                        val.req_detl_slno,
                        val.req_slno
                    ],
                    (error, results, fields) => {
                        if (error) {
                            return reject(error)
                        }
                        return resolve(results)
                    }
                )
            })
        })
        )
    },

    updateApprovedEDItemStatus: (body) => {
        return Promise.all(body.map((val) => {
            return new Promise((resolve, reject) => {
                pool.query(
                    `UPDATE
                           crm_reqitems_approval_details
                     SET
                           item_ed_approve = ? ,
                           item_ed_remarks = ?  ,
                           item_ed_apprv_date = ?,
                           item_ed_user = ?
                     WHERE
                           req_detl_slno = ? and req_slno = ?`,
                    [
                        val.itemStatus,
                        val.remarks,
                        val.statusDate,
                        val.user,
                        val.req_detl_slno,
                        val.req_slno
                    ],
                    (error, results, fields) => {
                        if (error) {
                            return reject(error)
                        }
                        return resolve(results)
                    }
                )
            })
        })
        )
    },

    updateApprovedManageItemStatus: (body) => {
        return Promise.all(body.map((val) => {
            return new Promise((resolve, reject) => {
                pool.query(
                    `UPDATE
                           crm_reqitems_approval_details
                     SET
                           item_manage_approve = ? ,
                           item_manage_remarks = ?  ,
                           item_manage_apprv_date = ?,
                           item_manage_user = ?
                     WHERE
                           req_detl_slno = ? and req_slno = ?`,
                    [
                        val.itemStatus,
                        val.remarks,
                        val.statusDate,
                        val.user,
                        val.req_detl_slno,
                        val.req_slno
                    ],
                    (error, results, fields) => {
                        if (error) {
                            return reject(error)
                        }
                        return resolve(results)
                    }
                )
            })
        })
        )
    },

    updateReqMstReject: (data, callback) => {
        pool.query(
            `UPDATE
                   crm_request_master
             SET
                   req_status = 'R',reject_status = ?,onhold_status = ?,internally_arranged_status=?
             WHERE
                   req_slno =?`,
            [
                data.reject_status,
                data.onhold_status,
                data.internally_arranged_status,
                data.req_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },


    InchargeApproveDetail: (data, callback) => {
        pool.query(
            `UPDATE
                   crm_request_mast_detail
             SET
                   approve_item_desc = ? ,
                approve_item_brand=?  ,
                approve_item_unit=?,
                item_qnty_approved=?  ,
                approve_item_specification=?,
                approve_item_unit_price=?  ,
                approve_aprox_cost=?,
                approve_item_status=?,
                item_status_approved=?,
                edit_user=?,
                po_item_status=NULL
             WHERE
                   req_detl_slno =?`,
            [
                data.approve_item_desc,
                data.approve_item_brand,
                data.approve_item_unit,
                data.item_qnty_approved,
                data.approve_item_specification,
                data.approve_item_unit_price,
                data.approve_aprox_cost,
                data.approve_item_status,
                data.item_status_approved,
                data.edit_user,
                data.req_detl_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    DetailApprvInsert: (data, callback) => {
        pool.query(
            `INSERT INTO crm_request_mast_detail (
                req_slno,
                item_slno,
                item_desc,
                item_brand,
                item_unit,
                item_qnty,
                item_specification,
                item_unit_price,
                aprox_cost,
                item_status,
                approve_item_desc,
                approve_item_brand,
                approve_item_unit,
                item_qnty_approved,
                approve_item_specification,
                approve_item_unit_price,
                approve_aprox_cost,
                item_status_approved,
                approve_item_status,
                old_item_slno,
                create_user               
               )
                VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.req_slno,
                data.item_slno,
                data.item_desc,
                data.item_brand,
                data.item_unit,
                data.item_qnty,
                data.item_specification,
                data.item_unit_price,
                data.aprox_cost,
                data.item_status,
                data.approve_item_desc,
                data.approve_item_brand,
                data.approve_item_unit,
                data.item_qnty_approved,
                data.approve_item_specification,
                data.approve_item_unit_price,
                data.approve_aprox_cost,
                data.item_status_approved,
                data.approve_item_status,
                data.old_item_slno,
                data.create_user
            ],
            (error, results, fields) => {

                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    DetailOldItemInactive: (req_detl_slno, callback) => {
        pool.query(
            `UPDATE
                   crm_request_mast_detail
             SET
                    approve_item_status = 0
             WHERE
                    req_detl_slno =?`,
            [
                req_detl_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    updateCrfClose: (data, callback) => {
        pool.query(
            `UPDATE
                   crm_request_approval
             SET
                   crf_close = ?,crf_close_remark = ?,crf_close_user=?,crf_closed_one = ?,close_date=?                            
             WHERE
                   req_slno =?`,
            [
                data.crf_close,
                data.crf_close_remark,
                data.crf_close_user,
                data.crf_closed_one,
                data.close_date,
                data.req_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    updateMasterCrfClose: (data, callback) => {
        pool.query(
            `UPDATE
                   crm_request_master
             SET
                   req_status = 'C'
            WHERE
                   req_slno =?`,
            [
                data.req_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    updateHODApproval: (data, callback) => {
        pool.query(
            `UPDATE
                   crm_request_approval
            SET
                  incharge_approve=1,
                  hod_approve = ?,
                  hod_remarks = ?,
                  hod_detial_analysis=?,
                  hod_approve_date = ?,
                  hod_user=?
            WHERE
                  req_slno =?`,
            [
                data.hod_approve,
                data.hod_remarks,
                data.hod_detial_analysis,
                data.hod_approve_date,
                data.hod_user,
                data.req_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },


    updateDMSApproval: (data, callback) => {
        pool.query(
            `UPDATE
                   crm_request_approval
            SET
                   dms_approve = ?,
                   dms_remarks = ?,
                   dms_detail_analysis=?,
                   dms_approve_date = ?,
                   dms_user=?
            WHERE
                   req_slno =?`,
            [
                data.dms_approve,
                data.dms_remarks,
                data.dms_detail_analysis,
                data.dms_approve_date,
                data.dms_user,
                data.req_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    updateMSApproval: (data, callback) => {
        pool.query(
            `UPDATE
                    crm_request_approval
            SET
                   ms_approve = ?,
                   ms_approve_remark = ?,
                   ms_detail_analysis=?,
                   ms_approve_date = ?,
                   ms_approve_user=?
            WHERE
                  req_slno =?`,
            [
                data.ms_approve,
                data.ms_approve_remark,
                data.ms_detail_analysis,
                data.ms_approve_date,
                data.ms_approve_user,
                data.req_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    updateMOApproval: (data, callback) => {

        pool.query(
            `UPDATE
                    crm_request_approval
            SET
                   manag_operation_approv = ?,
                   manag_operation_remarks = ?,
                   om_detial_analysis=?,
                   om_approv_date = ?,
                   manag_operation_user=?
            WHERE
                   req_slno =?`,
            [
                data.manag_operation_approv,
                data.manag_operation_remarks,
                data.om_detial_analysis,
                data.om_approv_date,
                data.manag_operation_user,
                data.req_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    updateSMOApproval: (data, callback) => {
        pool.query(
            `UPDATE
                  crm_request_approval
            SET
                  senior_manage_approv = ?,
                  senior_manage_remarks = ?,
                  smo_detial_analysis=?,
                  som_aprrov_date = ?,
                  senior_manage_user=?
            WHERE
                  req_slno =?`,
            [
                data.senior_manage_approv,
                data.senior_manage_remarks,
                data.smo_detial_analysis,
                data.som_aprrov_date,
                data.senior_manage_user,
                data.req_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    updateGMApproval: (data, callback) => {
        pool.query(
            `UPDATE
                   crm_request_approval
             SET
                  gm_approve = ?,
                  gm_approve_remarks = ?,
                  gm_detial_analysis=?,
                  gm_approv_date = ?,
                  gm_user=?
            WHERE
                  req_slno =?`,
            [
                data.gm_approve,
                data.gm_approve_remarks,
                data.gm_detial_analysis,
                data.gm_approv_date,
                data.gm_user,
                data.req_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    updateMDApproval: (data, callback) => {
        pool.query(
            `UPDATE
                   crm_request_approval
            SET
                  md_approve_remarks = ?,
                  md_approve = ?,
                  md_detial_analysis=?,
                  md_approve_date = ?,
                  md_user=?
            WHERE
                  req_slno =?`,
            [
                data.md_approve_remarks,
                data.md_approve,
                data.md_detial_analysis,
                data.md_approve_date,
                data.md_user,
                data.req_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    updateEDApproval: (data, callback) => {
        pool.query(
            `UPDATE
                  crm_request_approval
              SET
                  ed_approve = ?,
                  ed_approve_remarks = ?,
                  ed_detial_analysis=?,
                  ed_approve_date = ?,
                  ed_user=?
            WHERE
                  req_slno =?`,
            [
                data.ed_approve,
                data.ed_approve_remarks,
                data.ed_detial_analysis,
                data.ed_approve_date,
                data.ed_user,
                data.req_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    updateManagingApproval: (data, callback) => {
        pool.query(
            `UPDATE
                   crm_request_approval
             SET
                  managing_director_approve = ?,
                  managing_director_remarks = ?,
                  managing_director_analysis=?,
                  managing_director_approve_date = ?,
                  managing_director_user=?
             WHERE
                req_slno =?`,
            [
                data.managing_director_approve,
                data.managing_director_remarks,
                data.managing_director_analysis,
                data.managing_director_approve_date,
                data.managing_director_user,
                data.req_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    CheckCRfExist: (id, callBack) => {
        pool.query(
            `SELECT
                  crm_purchase_slno,po_complete
             FROM
                  crm_purchase_mast    
              WHERE
                    req_slno=?`,
            [
                id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    CrfDeptDataCollectInsert: (data, callBack) => {
        pool.query(
            `INSERT INTO crm_data_collection
            (
                crf_requst_slno,
                crf_req_collect_dept,
                crf_req_remark,
                reqest_one,
                req_user   
            ) 
            VALUES ?`,
            [
                data
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    DataCollectComplete: (id, callBack) => {
        pool.query(
            `SELECT
                   crf_data_collect_slno, crf_requst_slno, crf_req_collect_dept, crf_dept_status,
                   crf_dept_remarks, save_user, crf_req_remark, reqest_one,
                   co_deptsec_mast.sec_name as data_entered,data_coll_image_status,
                   crm_data_collection.crf_dept_status,crm_data_collection.create_date,crm_data_collection.update_date,
                   RU.em_name as req_user,EU.em_name as datagive_user
             FROM
                   crm_data_collection
                LEFT JOIN co_deptsec_mast on co_deptsec_mast.sec_id=crm_data_collection.crf_req_collect_dept
                LEFT JOIN co_employee_master RU on RU.em_id=crm_data_collection.req_user
                LEFT JOIN co_employee_master EU on EU.em_id=crm_data_collection.save_user 
              WHERE
                    crf_requst_slno=?`,
            [
                id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getDataCollectList: (id, callBack) => {
        pool.query(
            `SELECT
                   crm_request_master.req_slno,crm_request_master.actual_requirement,crm_request_master.needed,
                   R.sec_name as req_deptsec,U.sec_name as user_deptsection,CR.em_name as create_user,          
                   crm_emergencytype_mast.emer_type_name,crm_emergencytype_mast.emer_type_escalation,
                   crm_request_master.request_deptsec_slno,crm_request_master.location,emergeny_remarks,expected_date,
                   rm_ndrf,GROUP_CONCAT(item_type_name) as category,image_status,emergency_flag,emer_slno,crm_request_master.create_date as req_date,
                   total_approx_cost,user_deptsec,req_status,crf_data_collect_slno, crf_requst_slno,crf_req_collect_dept,
                   crf_dept_status, crf_dept_remarks, reqest_one,RU.em_name as requser,SU.em_name  as saveuser, crf_req_remark,
                   crm_data_collection.create_date as dc_req_date,crm_data_collection.update_date,data_coll_image_status,
                   RE.sec_name as data_entered,company_name,crm_request_master.company_slno  ,tmc_data_collection_status                     
  			 FROM
                   crm_request_master
                    LEFT JOIN am_item_type ON JSON_CONTAINS(crm_request_master.category, cast(am_item_type.item_type_slno as json), '$')
                    LEFT JOIN crm_emergencytype_mast ON crm_emergencytype_mast.emergency_slno=crm_request_master.emer_slno
                    LEFT JOIN co_deptsec_mast R ON R.sec_id=crm_request_master.request_deptsec_slno
                    LEFT JOIN co_deptsec_mast U ON U.sec_id=crm_request_master.user_deptsec
                    LEFT JOIN crm_data_collection On crm_data_collection.crf_requst_slno=crm_request_master.req_slno
                    LEFT JOIN co_employee_master CR ON CR.em_id=crm_request_master.create_user
                    LEFT JOIN co_employee_master RU ON RU.em_id=crm_data_collection.req_user           
                    LEFT JOIN co_employee_master SU ON SU.em_id=crm_data_collection.save_user
                    LEFT JOIN co_deptsec_mast RE ON RE.sec_id=crm_data_collection.crf_req_collect_dept
                    LEFT JOIN crm_company_master ON crm_request_master.company_slno=crm_company_master.company_slno
            WHERE
                crf_req_collect_dept=?
              GROUP BY crm_request_master.req_slno, crf_data_collect_slno
              ORDER BY crm_request_master.req_slno DESC`,
            [
                id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    CrfDataCollactnSave: (data, callback) => {
        pool.query(
            `UPDATE
                   crm_data_collection
             SET         
                   crf_dept_remarks = ?,
                   crf_dept_status = 1,
                   save_user=?         
            WHERE
                  crf_data_collect_slno =?`,
            [
                data.crf_dept_remarks,
                data.save_user,
                data.crf_data_collect_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    getAllForPdfView: (callBack) => {
        pool.query(
            `select crm_request_master.req_slno,crm_request_master.actual_requirement,
            crm_request_master.needed,
            R.sec_name as req_deptsec,U.sec_name as user_deptsection,CR.em_name as create_user,
            crf_close,crf_close_remark,crf_closed_one,close_date,C.em_name as closed_user,
            crm_emergencytype_mast.emer_type_name,crm_emergencytype_mast.emer_type_escalation,
                        crm_request_master.request_deptsec_slno,crm_request_master.location,emergeny_remarks,expected_date,
                        rm_ndrf,  GROUP_CONCAT(item_type_name) as category,image_status,emergency_flag,emer_slno,crm_request_master.create_date,
                        total_approx_cost,user_deptsec,req_status,
                        req_approv_slno,           
                       incharge_req, incharge_approve, incharge_remarks, inch_detial_analysis, incharge_apprv_date,
                        I.em_name as incharge_user,
                       hod_req, hod_approve, hod_remarks, hod_detial_analysis, hod_approve_date, H.em_name as hod_user,
                       dms_req, dms_approve, dms_remarks, dms_detail_analysis, dms_approve_date, D.em_name as dms_user,
                       ms_approve_req, ms_approve, ms_approve_remark, ms_detail_analysis, ms_approve_date, M.em_name as ms_approve_user,
                       manag_operation_req, manag_operation_approv, manag_operation_remarks, om_detial_analysis,
                       om_approv_date, OM.em_name as manag_operation_user,
                       senior_manage_remarks,  senior_manage_req, senior_manage_approv,
                       smo_detial_analysis, som_aprrov_date, SM.em_name as  senior_manage_user,
                       gm_approve_req, gm_approve, gm_approve_remarks, gm_detial_analysis, gm_approv_date, GM.em_name as  gm_user,
                       ed_approve_req, ed_approve, ed_approve_remarks, ed_detial_analysis, ed_approve_date, ED.em_name as  ed_user,
                       md_approve_req,md_approve,md_approve_remarks,md_detial_analysis,md_approve_date,MD.em_name as md_user,
                     managing_director_req, managing_director_approve, managing_director_remarks, managing_director_analysis,
                    managing_director_approve_date,MAD.em_name as managing_director_username, managing_director_image,
                       crf_close,crf_close_remark,crf_close_user,crf_closed_one,close_date,
                       ndrf_cao_approve,ndrf_cao_approve_remarks,ndrf_ed_approve,ndrf_ed_approve_remarks,
                       ndrf_md_approve,ndrf_md_approve_remarks,
                       ed_user as edid,md_user as mdid

                         from crm_request_master
                         LEFT JOIN crm_request_approval on crm_request_approval.req_slno=crm_request_master.req_slno
                          LEFT JOIN am_item_type ON JSON_CONTAINS(crm_request_master.category, cast(am_item_type.item_type_slno as json), '$')
                          LEFT JOIN crf_ndrf_mast on crf_ndrf_mast.req_slno=crm_request_master.req_slno
                          LEFT JOIN crf_ndrf_approval on crf_ndrf_approval.ndrf_mast_slno=crf_ndrf_mast.ndrf_mast_slno
                          LEFT JOIN crm_emergencytype_mast on crm_emergencytype_mast.emergency_slno=crm_request_master.emer_slno
                         LEFT JOIN co_deptsec_mast R on R.sec_id=crm_request_master.request_deptsec_slno
                          LEFT JOIN co_deptsec_mast U on U.sec_id=crm_request_master.user_deptsec
                          
            LEFT JOIN co_employee_master CR on CR.em_id=crm_request_master.create_user
            LEFT JOIN co_employee_master I on I.em_id=crm_request_approval.incharge_user
            LEFT JOIN co_employee_master H on H.em_id=crm_request_approval.hod_user
            LEFT JOIN co_employee_master D on D.em_id=crm_request_approval.dms_user
            LEFT JOIN co_employee_master M on M.em_id=crm_request_approval.ms_approve_user
            LEFT JOIN co_employee_master C on C.em_id=crm_request_approval.crf_close_user
            LEFT JOIN co_employee_master OM on OM.em_id=crm_request_approval.manag_operation_user
            LEFT JOIN co_employee_master SM on SM.em_id=crm_request_approval.senior_manage_user
            LEFT JOIN co_employee_master GM on GM.em_id=crm_request_approval.gm_user
            LEFT JOIN co_employee_master ED on ED.em_id=crm_request_approval.ed_user
            LEFT JOIN co_employee_master MD on MD.em_id=crm_request_approval.md_user
             LEFT JOIN co_employee_master MAD on MAD.em_id=crm_request_approval.managing_director_user
            where md_approve=1 and ed_approve=1 ORDER BY crm_request_master.req_slno DESC `,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getFinalItemListApproval: (id, callBack) => {
        pool.query(
            `SELECT
                   req_detl_slno, req_slno, item_slno, approve_item_desc, approve_item_brand, approve_item_unit,
                   item_qnty_approved,approve_item_unit_price, approve_aprox_cost, item_status_approved, approve_item_status,
                   I.uom_name as apprv_uom,approve_item_specification,po_item_status
             FROM
                  crm_request_mast_detail
                LEFT JOIN am_uom I ON I.uom_slno=crm_request_mast_detail.approve_item_unit
             WHERE
                 req_slno=? and approve_item_status=1 and item_status_approved=1 and po_item_status is NULL`,
            [
                id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getMaxItemSlno: (id, callBack) => {
        pool.query(
            `SELECT
                    max(item_slno) as maxSlno
             FROM
                    crm_request_mast_detail
            WHERE
                    req_slno=?`,
            [
                id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    AddMoreItemsDetails: (data, callback) => {
        pool.query(
            `INSERT INTO crm_request_mast_detail (
                req_slno,
                item_slno,
                item_desc,
                item_brand,
                item_unit,
                item_qnty,
                item_specification,
                item_unit_price,
                aprox_cost,
                item_status,
                approve_item_desc,
                approve_item_brand,
                approve_item_unit,
                item_qnty_approved,
                approve_item_specification,
                approve_item_unit_price,
                item_status_approved,
                approve_item_status,
                item_add_higher,
                create_user,
                approve_aprox_cost
               )
                VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.req_slno,
                data.item_slno,
                data.item_desc,
                data.item_brand,
                data.item_unit,
                data.item_qnty,
                data.item_specification,
                data.item_unit_price,
                data.aprox_cost,
                data.item_status,
                data.approve_item_desc,
                data.approve_item_brand,
                data.approve_item_unit,
                data.item_qnty_approved,
                data.approve_item_specification,
                data.approve_item_unit_price,
                data.item_status_approved,
                data.approve_item_status,
                data.item_add_higher,
                data.create_user,
                data.approve_aprox_cost
            ],
            (error, results, fields) => {

                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    updateUserAck: (data, callback) => {

        pool.query(
            `UPDATE
                   crm_request_master
             SET
                  user_acknldge = ? ,
                  user_acknldge_remarks=?,
                  user_ack_user=?,
                  user_ack_date =?
             WHERE
                   req_slno =?`,
            [
                data.user_acknldge,
                data.user_acknldge_remarks,
                data.user_ack_user,
                data.user_ack_date,
                data.req_slno

            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    updateUserReply: (id, callback) => {
        pool.query(
            `UPDATE
                   crm_req_item_collect_details
             SET         
                  received_status=1            
             WHERE
                   req_slno = ?`,
            [
                id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    UpdateItemReceiveStatus: (body) => {
        return Promise.all(body.map((val) => {
            return new Promise((resolve, reject) => {
                pool.query(
                    `UPDATE
                         crm_purchase_item_details
                     SET
                          user_received_status=1
                     WHERE
                          po_itm_slno in(?) `,
                    [
                        val.po_itm_slno,
                    ],
                    (error, results, fields) => {
                        if (error) {
                            return reject(error)
                        }
                        return resolve(results)
                    }
                )
            })
        })
        )
    },

    DetailItemReject: (data, callback) => {
        pool.query(
            `UPDATE
                  crm_request_mast_detail
             SET
                 approve_item_desc = ? ,
                approve_item_brand=?  ,
                approve_item_unit=?,
                item_qnty_approved=?  ,
                approve_item_specification=?,
                approve_item_unit_price=?  ,
                approve_aprox_cost=?,
                approve_item_status=?,
                item_status_approved=?,
                reject_remarks=?,
                reject_user=?,
                reject_date=?,
                po_item_status=0
            WHERE
                 req_detl_slno =?`,
            [
                data.approve_item_desc,
                data.approve_item_brand,
                data.approve_item_unit,
                data.item_qnty_approved,
                data.approve_item_specification,
                data.approve_item_unit_price,
                data.approve_aprox_cost,
                data.approve_item_status,
                data.item_status_approved,
                data.reject_remarks,
                data.reject_user,
                data.reject_date,
                data.req_detl_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    DetailItemOnHold: (data, callback) => {
        pool.query(
            `UPDATE
                  crm_request_mast_detail
             SET
                 approve_item_desc = ? ,
                 approve_item_brand=?  ,
                 approve_item_unit=?,
                 item_qnty_approved=?  ,
                approve_item_specification=?,
                approve_item_unit_price=?  ,
                approve_aprox_cost=?,
                approve_item_status=?,
                item_status_approved=?,
                hold_remarks=?,
                hold_user=?,
                hold_date=?,
                po_item_status=0
            WHERE
                req_detl_slno =?`,
            [
                data.approve_item_desc,
                data.approve_item_brand,
                data.approve_item_unit,
                data.item_qnty_approved,
                data.approve_item_specification,
                data.approve_item_unit_price,
                data.approve_aprox_cost,
                data.approve_item_status,
                data.item_status_approved,
                data.hold_remarks,
                data.hold_user,
                data.hold_date,
                data.req_detl_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    inchargeItemOnholdRejectUpdate: (data, callback) => {
        pool.query(
            `UPDATE
                  crm_reqitems_approval_details
             SET
                 item_incharge_approve = ? ,
                 item_incharge_remarks = ?  ,
                 item_incharge_apprv_date = ?,
                 item_incharge_user = ?
             WHERE
                 req_detl_slno = ? and req_slno = ?`,
            [
                data.itemStatus,
                data.remarks,
                data.statusDate,
                data.user,
                data.req_detl_slno,
                data.req_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    hodItemOnholdRejectUpdate: (data, callback) => {
        pool.query(
            `UPDATE
                  crm_reqitems_approval_details
             SET
                 item_hod_approve = ? ,
                 item_hod_remarks = ?  ,
                 item_hod_apprv_date = ?,
                 item_hod_user = ?
             WHERE
                 req_detl_slno = ? and req_slno = ?`,
            [
                data.itemStatus,
                data.remarks,
                data.statusDate,
                data.user,
                data.req_detl_slno,
                data.req_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    dmsItemOnholdRejectUpdate: (data, callback) => {
        pool.query(
            `UPDATE
                  crm_reqitems_approval_details
             SET
                 item_dms_approve = ? ,
                 item_dms_remarks = ?  ,
                 item_dms_apprv_date = ?,
                 item_dms_user = ?
             WHERE
                 req_detl_slno = ? and req_slno = ?`,
            [
                data.itemStatus,
                data.remarks,
                data.statusDate,
                data.user,
                data.req_detl_slno,
                data.req_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    msItemOnholdRejectUpdate: (data, callback) => {
        pool.query(
            `UPDATE
                  crm_reqitems_approval_details
             SET
                 item_ms_approve = ? ,
                 item_ms_remarks = ?  ,
                 item_ms_apprv_date = ?,
                 item_ms_user = ?
             WHERE
                 req_detl_slno = ? and req_slno = ?`,
            [
                data.itemStatus,
                data.remarks,
                data.statusDate,
                data.user,
                data.req_detl_slno,
                data.req_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    moItemOnholdRejectUpdate: (data, callback) => {

        pool.query(
            `UPDATE
                  crm_reqitems_approval_details
             SET
                 item_mo_approve = ? ,
                 item_mo_remarks = ?  ,
                 item_mo_apprv_date = ?,
                 item_mo_user = ?
             WHERE
                 req_detl_slno = ? and req_slno = ?`,
            [
                data.itemStatus,
                data.remarks,
                data.statusDate,
                data.user,
                data.req_detl_slno,
                data.req_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    smoItemOnholdRejectUpdate: (data, callback) => {
        pool.query(
            `UPDATE
                  crm_reqitems_approval_details
             SET
                 item_smo_approve = ? ,
                 item_smo_remarks = ?  ,
                 item_smo_apprv_date = ?,
                 item_smo_user = ?
             WHERE
                 req_detl_slno = ? and req_slno = ?`,
            [
                data.itemStatus,
                data.remarks,
                data.statusDate,
                data.user,
                data.req_detl_slno,
                data.req_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    gmItemOnholdRejectUpdate: (data, callback) => {
        pool.query(
            `UPDATE
                  crm_reqitems_approval_details
             SET
                 item_gm_approve = ? ,
                 item_gm_remarks = ?  ,
                 item_gm_apprv_date = ?,
                 item_gm_user = ?
             WHERE
                 req_detl_slno = ? and req_slno = ?`,
            [
                data.itemStatus,
                data.remarks,
                data.statusDate,
                data.user,
                data.req_detl_slno,
                data.req_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    mdItemOnholdRejectUpdate: (data, callback) => {
        pool.query(
            `UPDATE
                  crm_reqitems_approval_details
             SET
                 item_md_approve = ? ,
                 item_md_remarks = ?  ,
                 item_md_apprv_date = ?,
                 item_md_user = ?
             WHERE
                 req_detl_slno = ? and req_slno = ?`,
            [
                data.itemStatus,
                data.remarks,
                data.statusDate,
                data.user,
                data.req_detl_slno,
                data.req_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    edItemOnholdRejectUpdate: (data, callback) => {
        pool.query(
            `UPDATE
                  crm_reqitems_approval_details
             SET
                 item_ed_approve = ? ,
                 item_ed_remarks = ?  ,
                 item_ed_apprv_date = ?,
                 item_ed_user = ?
             WHERE
                 req_detl_slno = ? and req_slno = ?`,
            [
                data.itemStatus,
                data.remarks,
                data.statusDate,
                data.user,
                data.req_detl_slno,
                data.req_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    manageItemOnholdRejectUpdate: (data, callback) => {
        pool.query(
            `UPDATE
                  crm_reqitems_approval_details
             SET
                  item_manage_approve = ? ,
                  item_manage_remarks = ?  ,
                  item_manage_apprv_date = ?,
                  item_manage_user = ?
             WHERE
                 req_detl_slno = ? and req_slno = ?`,
            [
                data.itemStatus,
                data.remarks,
                data.statusDate,
                data.user,
                data.req_detl_slno,
                data.req_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    updateInternallyArranged: (data, callback) => {
        pool.query(
            `UPDATE
                  crm_request_mast_detail
             SET
                 approve_item_desc = ? ,
                 approve_item_brand=?  ,
                 approve_item_unit=?,
                 item_qnty_approved=?  ,
                 approve_item_specification=?,
                 approve_item_unit_price=?  ,
                 approve_aprox_cost=?,
                 approve_item_status=?,
                 item_status_approved=?,
                 internal_remarks=?,
                 internal_user=?,
                 internal_date=?,
                 po_item_status=0,
                 internal_arrange_dept=?
            WHERE
                req_detl_slno =?`,
            [
                data.approve_item_desc,
                data.approve_item_brand,
                data.approve_item_unit,
                data.item_qnty_approved,
                data.approve_item_specification,
                data.approve_item_unit_price,
                data.approve_aprox_cost,
                data.approve_item_status,
                data.item_status_approved,
                data.internal_remarks,
                data.internal_user,
                data.internal_date,
                data.crfdept,
                data.req_detl_slno,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getStoreReceiveStatus: (id, callBack) => {

        pool.query(
            `SELECT
                    store_receive,crm_request_master.sub_store_recieve
             FROM
                    crm_purchase_mast
                LEFT JOIN crm_request_master ON crm_request_master.req_slno=crm_purchase_mast.req_slno     
             WHERE
                   crm_purchase_mast.req_slno=?`,
            [
                id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    InsertCrfViewInsert: (data, callback) => {
        pool.query(
            `UPDATE crm_request_approval 
            SET crf_view_remark = ?,
            crf_view_status = ?,
            crf_view_dep=?,
            crf_view_Emid=?
            WHERE req_slno =?`,
            [
                data?.ViewCrfRemark,
                data?.status,
                data?.empdept,
                data?.empid,
                data?.req_slno,

            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    getEmnokmc: (id, callBack) => {
        pool.query(
            `SELECT *
             FROM
                    co_employee_master
            WHERE
                    em_no=?`,
            [
                id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    CrfDeptDataCollectInserttmc: (data, callBack) => {
        pool.query(
            `INSERT INTO crm_data_collection
            (
                crf_requst_slno,
                crf_req_collect_dept,
                crf_req_remark,
                reqest_one,
                req_user ,
                tmc_data_collection_status  
            ) 
            VALUES ?`,
            [
                data
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getDatakmcDep: (id, callBack) => {

        pool.query(
            `SELECT
             tmc_dept,
             kmc_dept,
             tmc_hod,
             tmc_incharge,
             kmc_hod,
             kmc_incharge
             FROM 
             crm_department_mapping
             WHERE
             tmc_dept =?`,

            [
                id
            ],
            (error, results, feilds) => {

                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getDataHod: (id, callBack) => {
        pool.query(
            `SELECT
            dept_section,
            auth_post,
            dept_section_post,
            emp_id
            FROM 
            co_authorization
            WHERE
            dept_section =?
            and auth_status =1 and auth_post =2 `,

            [
                id
            ],
            (error, results, feilds) => {

                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
}