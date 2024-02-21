const { pool } = require('../../config/database')
module.exports = {


    getItemListApproval: (id, callBack) => {
        pool.query(
            `  select req_detl_slno, req_slno, item_slno, item_desc, item_brand, item_unit,
             item_qnty, item_specification, item_unit_price, aprox_cost, item_status,
              approve_item_desc, approve_item_brand, approve_item_unit, item_qnty_approved,
               approve_item_unit_price, approve_aprox_cost, item_status_approved, approve_item_status,
               approve_item_delete_who, approve_item_delete_user, old_item_slno,
                old_item_slno,item_unit,am_uom.uom_name,approve_item_specification
                        from crm_request_mast_detail
                         left join am_uom on am_uom.uom_slno=crm_request_mast_detail.item_unit
                        where req_slno=? and approve_item_status=1`,
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

    MaxItemSlno: (id, callBack) => {
        pool.query(
            `SELECT max(item_slno) as maxslno FROM meliora.crm_request_mast_detail  where req_slno=? `,
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

    updateReqMstHold: (data, callback) => {
        pool.query(
            `UPDATE crm_request_master 
            SET req_status = 'P'
            WHERE req_slno =?`,
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

    updateReqMstApproved: (data, callback) => {
        pool.query(
            `UPDATE crm_request_master 
            SET req_status = 'A'
            WHERE req_slno =?`,
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
    updateReqMstReject: (data, callback) => {
        pool.query(
            `UPDATE crm_request_master 
            SET req_status = 'R'
            WHERE req_slno =?`,
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


    InchargeApproveDetail: (data, callback) => {
        pool.query(
            `UPDATE crm_request_mast_detail 
                SET approve_item_desc = ? ,
                approve_item_brand=?  ,
                approve_item_unit=?,
                item_qnty_approved=?  ,
                approve_item_specification=?,
                approve_item_unit_price=?  ,
                approve_aprox_cost=?,
                approve_item_status=?,
                item_status_approved=?
                WHERE req_detl_slno =?`,
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

    DetailOldItemInactive: (data, callback) => {
        pool.query(
            `UPDATE crm_request_mast_detail 
                SET approve_item_status = 0 
             WHERE req_detl_slno =?`,
            [

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


    updateCrfClose: (data, callback) => {

        pool.query(
            `UPDATE crm_request_approval 
            SET crf_close = ?,
            crf_close_remark = ?,
            crf_close_user=?,
            crf_closed_one = ?,  
            close_date=?                            
            WHERE req_slno =?`,
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
            `UPDATE crm_request_master 
            SET req_status = 'C'
            WHERE req_slno =?`,
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
            `UPDATE crm_request_approval 
            SET hod_approve = ?,
            hod_remarks = ?,
            hod_detial_analysis=?,
            hod_approve_date = ?,
            hod_user=?
            WHERE req_slno =?`,
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
            `UPDATE crm_request_approval 
            SET dms_approve = ?,
            dms_remarks = ?,
            dms_detail_analysis=?,
            dms_approve_date = ?,
            dms_user=?
            WHERE req_slno =?`,
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
            `UPDATE crm_request_approval 
            SET ms_approve = ?,
            ms_approve_remark = ?,
            ms_detail_analysis=?,
            ms_approve_date = ?,
            ms_approve_user=?
            WHERE req_slno =?`,
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
            `UPDATE crm_request_approval 
            SET manag_operation_approv = ?,
            manag_operation_remarks = ?,
            om_detial_analysis=?,
            om_approv_date = ?,
            manag_operation_user=?
            WHERE req_slno =?`,
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
            `UPDATE crm_request_approval 
            SET senior_manage_approv = ?,
            senior_manage_remarks = ?,
            smo_detial_analysis=?,
            som_aprrov_date = ?,
            senior_manage_user=?
            WHERE req_slno =?`,
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
            `UPDATE crm_request_approval 
            SET gm_approve = ?,
            gm_approve_remarks = ?,
            gm_detial_analysis=?,
            gm_approv_date = ?,
            gm_user=?
            WHERE req_slno =?`,
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
            `UPDATE crm_request_approval 
            SET md_approve = ?,
            md_approve_remarks = ?,
            md_detial_analysis=?,
            md_approve_date = ?,
            md_user=?
            WHERE req_slno =?`,
            [
                data.md_approve,
                data.md_approve_remarks,
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
            `UPDATE crm_request_approval 
            SET ed_approve = ?,
            ed_approve_remarks = ?,
            ed_detial_analysis=?,
            ed_approve_date = ?,
            ed_user=?
            WHERE req_slno =?`,
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


}