const { pool } = require('../../config/database')
module.exports = {


    getItemListApproval: (id, callBack) => {
        pool.query(
            ` SELECT
                    req_detl_slno, req_slno, item_slno, item_desc, item_brand, item_unit,item_qnty, item_specification,
                    item_unit_price, aprox_cost, item_status,approve_item_desc, approve_item_brand, approve_item_unit,
                    item_qnty_approved,approve_item_unit_price, approve_aprox_cost, item_status_approved, approve_item_status,
                    approve_item_delete_who, approve_item_delete_user, old_item_slno,old_item_slno,item_unit,
                    I.uom_name as uom_name,IA.uom_name as apprv_uom ,approve_item_specification,item_add_higher
             FROM
                 crm_request_mast_detail
                LEFT JOIN am_uom I ON I.uom_slno=crm_request_mast_detail.item_unit
                LEFT JOIN am_uom IA ON IA.uom_slno=crm_request_mast_detail.approve_item_unit
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
                item_status_approved=?,
                edit_user=?
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
            SET
            incharge_approve=1,
            hod_approve = ?,
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
            `select crf_data_collect_slno, crf_requst_slno, crf_req_collect_dept, crf_dept_status,
            crf_dept_remarks, req_user, save_user, crf_req_remark, reqest_one,
                       co_deptsec_mast.sec_name as data_entered,data_coll_image_status,
                       crm_data_collection.crf_dept_status,crm_data_collection.create_date,crm_data_collection.update_date,
                       RU.em_name as req_user,
                        EU.em_name as datagive_user
                        from crm_data_collection          
                       left join co_deptsec_mast on co_deptsec_mast.sec_id=crm_data_collection.crf_req_collect_dept
                       left join co_employee_master RU on RU.em_id=crm_data_collection.req_user
                       left join co_employee_master EU on EU.em_id=crm_data_collection.save_user
                          
                       where crf_requst_slno=?`,
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
            `select crm_request_master.req_slno,crm_request_master.actual_requirement,
            crm_request_master.needed,
            R.sec_name as req_deptsec,U.sec_name as user_deptsection,CR.em_name as create_user,          
            crm_emergencytype_mast.emer_type_name,crm_emergencytype_mast.emer_type_escalation,
                        crm_request_master.request_deptsec_slno,crm_request_master.location,emergeny_remarks,expected_date,
                        rm_ndrf,category,image_status,emergency_flag,emer_slno,crm_request_master.create_date,
                        total_approx_cost,user_deptsec,req_status,crf_data_collect_slno, crf_requst_slno, 
                        crf_req_collect_dept, crf_dept_status, crf_dept_remarks, reqest_one,
                        RU.em_name as requser,SU.em_name  as saveuser, crf_req_remark,
                         crm_data_collection.create_date,crm_data_collection.update_date,
                          data_coll_image_status,RE.sec_name as data_entered
                          
  				from crm_request_master
                          left join crm_emergencytype_mast on crm_emergencytype_mast.emergency_slno=crm_request_master.emer_slno
                          left join co_deptsec_mast R on R.sec_id=crm_request_master.request_deptsec_slno
                          left join co_deptsec_mast U on U.sec_id=crm_request_master.user_deptsec
                          left join crm_data_collection on crm_data_collection.crf_requst_slno=crm_request_master.req_slno
                          left join co_employee_master CR on CR.em_id=crm_request_master.create_user
                            left join co_employee_master RU on RU.em_id=crm_data_collection.req_user           
                         left join co_employee_master SU on SU.em_id=crm_data_collection.save_user
                         left join co_deptsec_mast RE on RE.sec_id=crm_data_collection.crf_req_collect_dept
                        where crf_req_collect_dept=? ORDER BY crm_request_master.req_slno DESC`,
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
            `UPDATE crm_data_collection 
            SET         
            crf_dept_remarks = ?,
            crf_dept_status = 1,
            save_user=?         
            WHERE crf_data_collect_slno =?`,
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
                        rm_ndrf,category,image_status,emergency_flag,emer_slno,crm_request_master.create_date,
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
                       crf_close,crf_close_remark,crf_close_user,crf_closed_one,close_date,
                       ndrf_cao_approve,ndrf_cao_approve_remarks,ndrf_ed_approve,ndrf_ed_approve_remarks,
                       ndrf_md_approve,ndrf_md_approve_remarks,
                       ed_user as edid,md_user as mdid

                         from crm_request_master
                         left join crm_request_approval on crm_request_approval.req_slno=crm_request_master.req_slno
                          left join crf_ndrf_mast on crf_ndrf_mast.req_slno=crm_request_master.req_slno
                          left join crf_ndrf_approval on crf_ndrf_approval.ndrf_mast_slno=crf_ndrf_mast.ndrf_mast_slno
                          left join crm_emergencytype_mast on crm_emergencytype_mast.emergency_slno=crm_request_master.emer_slno
                         left join co_deptsec_mast R on R.sec_id=crm_request_master.request_deptsec_slno
                          left join co_deptsec_mast U on U.sec_id=crm_request_master.user_deptsec
                          
            left join co_employee_master CR on CR.em_id=crm_request_master.create_user
            left join co_employee_master I on I.em_id=crm_request_approval.incharge_user
            left join co_employee_master H on H.em_id=crm_request_approval.hod_user
            left join co_employee_master D on D.em_id=crm_request_approval.dms_user
            left join co_employee_master M on M.em_id=crm_request_approval.ms_approve_user
            left join co_employee_master C on C.em_id=crm_request_approval.crf_close_user
            left join co_employee_master OM on OM.em_id=crm_request_approval.manag_operation_user
            left join co_employee_master SM on SM.em_id=crm_request_approval.senior_manage_user
            left join co_employee_master GM on GM.em_id=crm_request_approval.gm_user
            left join co_employee_master ED on ED.em_id=crm_request_approval.ed_user
            left join co_employee_master MD on MD.em_id=crm_request_approval.md_user
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
            `  select approve_item_desc,approve_item_brand,am_uom.uom_name as approved_itemunit,
            item_qnty_approved,approve_item_specification,approve_item_unit_price,item_slno,
            approve_aprox_cost,old_item_slno
                        from crm_request_mast_detail
                         left join am_uom on am_uom.uom_slno=crm_request_mast_detail.approve_item_unit
                        where req_slno=? and approve_item_status=1 and item_status_approved=1`,
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
            `  select max(item_slno) as max_slno from crm_request_mast_detail
            where req_slno=?`,
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

    DetailItemReject: (data, callback) => {
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
                item_status_approved=?,
                reject_remarks=?,
                reject_user=?,
                reject_date=?
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
            `UPDATE crm_request_mast_detail 
                SET approve_item_desc = ? ,
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
                hold_date=?
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

    getStoreReceiveStatus: (id, callBack) => {
        pool.query(
            `SELECT
                   store_receive
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

}