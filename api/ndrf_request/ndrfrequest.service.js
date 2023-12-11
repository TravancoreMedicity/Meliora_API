const { pool } = require('../../config/database');

module.exports = {

    updateNdrfConvert: (data, callback) => {
        pool.query(
            `UPDATE crf_request_master 
            SET rm_ndrf=1            
            WHERE req_slno=?`,
            [
                data.req_slno
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    checkInsertVal: (data, callBack) => {
        pool.query(
            `SELECT req_slno
              FROM crf_ndrf_mast
            WHERE req_slno = ?`,
            [
                data.req_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },

    InsertNdrf: (data, callBack) => {
        pool.query(
            `INSERT INTO crf_ndrf_mast (
                req_slno,
                actual_requirement,
                needed,
                request_dept_slno,
                request_deptsec_slno,
                location,                
                create_user
            )
            VALUES (?,?,?,?,?,?,?)`,
            [
                data.req_slno,
                data.actual_requirement,
                data.needed,
                data.request_dept_slno,
                data.request_deptsec_slno,
                data.location,
                data.create_user
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getNdrfList: (callback) => {
        pool.query(
            `select crf_ndrf_mast.ndrf_mast_slno, crf_request_master.req_slno, ndrf_date,
            crf_ndrf_mast.actual_requirement,crf_ndrf_mast.needed, crf_ndrf_mast.request_dept_slno,
             crf_ndrf_mast.request_deptsec_slno, crf_ndrf_mast.location,
            co_department_mast.dept_name as req_dept,ndrf_purchase,ndrf_purchase_acknolwdge,
           R.sec_name as req_deptsec,crf_ndrf_status,
             ndrf_om_approv, ndrf_om_remarks, ndrfom_approv_date,NO.em_name as ndrf_om_user, 
            ndrf_smo_approv, ndrf_smo_remarks, ndrf_som_aprrov_date, NS.em_name as ndrf_smo_user, 
            ndrf_cao_approve, ndrf_cao_approve_remarks, ndrf_cao_approv_date,NC.em_name as ndrf_cao_user,
            ndrf_ed_approve, ndrf_ed_approve_remarks, ndrf_ed_approve_date, NE.em_name as ndrf_ed_user,
            ndrf_md_approve, ndrf_md_approve_remarks, ndrf_md_approve_date, NM.em_name as ndrf_md_user,
            incharge_req, incharge_approve, incharge_remarks, inch_detial_analysis, incharge_apprv_date, I.em_name as incharge_user,
            hod_req, hod_approve, hod_remarks, hod_detial_analysis, hod_approve_date, H.em_name as hod_user,
            dms_req, dms_approve, dms_remarks, dms_detail_analysis, dms_approve_date, D.em_name as dms_user,
            ms_approve_req, ms_approve, ms_approve_remark, ms_detail_analysis, ms_approve_date, M.em_name as ms_user,
            manag_operation_req, manag_operation_approv, manag_operation_remarks, om_detial_analysis, om_approv_date, OM.em_name as manag_operation_user, 
            senior_manage_req, senior_manage_approv, senior_manage_remarks, smo_detial_analysis, som_aprrov_date, SM.em_name as senior_manage_user,
            cao_approve_req, cao_approve, cao_approve_remarks, ceo_detial_analysis, cao_approv_date, CO.em_name as cao_user,
            ed_approve_req, ed_approve, ed_approve_remarks, ed_detial_analysis, ed_approve_date, ED.em_name as ed_user, 
            md_approve_req, md_approve, md_approve_remarks, md_detial_analysis, md_approve_date, MD.em_name as md_user, 
            crf_close, crf_close_remark,  S.em_name as close_user, crf_closed_one, close_date,
           crf_ndrf_mast.create_date as ndrfcreate,crf_request_master.create_date as reqcreate,
           R.sec_name as req_userdeptsec,U.sec_name as userdeptsec,C.em_name as req_user,
           image_status,expected_date,remarks,category,rm_ndrf,emergency
                      from crf_ndrf_mast                                              
            
               left join crf_request_master on crf_request_master.req_slno=crf_ndrf_mast.req_slno
               left join crf_request_approval on crf_request_approval.req_slno=crf_request_master.req_slno
                 left join crf_ndrf_approval on crf_ndrf_approval.ndrf_mast_slno=crf_ndrf_mast.ndrf_mast_slno
                    left join co_department_mast on co_department_mast.dept_id=crf_request_master.request_dept_slno
            left join co_deptsec_mast R on R.dept_id=crf_request_master.request_deptsec_slno
            left join co_deptsec_mast U on U.dept_id=crf_request_master.user_deptsec   
               left join co_employee_master C on C.em_id=crf_request_master.create_user
               left join co_employee_master I on I.em_id=crf_request_approval.incharge_user
               left join co_employee_master H on H.em_id=crf_request_approval.hod_user
               left join co_employee_master D on D.em_id=crf_request_approval.dms_user
               left join co_employee_master M on M.em_id=crf_request_approval.ms_approve_user
               left join co_employee_master S on S.em_id=crf_request_approval.crf_close_user
               left join co_employee_master OM on OM.em_id=crf_request_approval.manag_operation_user
               left join co_employee_master SM on SM.em_id=crf_request_approval.senior_manage_user
               left join co_employee_master CO on CO.em_id=crf_request_approval.cao_user
               left join co_employee_master ED on ED.em_id=crf_request_approval.ed_user
               left join co_employee_master MD on MD.em_id=crf_request_approval.md_user

                    left join co_employee_master N on N.em_id=crf_ndrf_mast.create_user
                    left join co_employee_master NO on NO.em_id=crf_ndrf_approval.ndrf_om_user  
                    left join co_employee_master NS on NS.em_id=crf_ndrf_approval.ndrf_smo_user 
                    left join co_employee_master NC on NC.em_id=crf_ndrf_approval.ndrf_cao_user 
                    left join co_employee_master NE on NE.em_id=crf_ndrf_approval.ndrf_ed_user
                     left join co_employee_master NM on NM.em_id=crf_ndrf_approval.ndrf_md_user
                    GROUP BY req_slno ORDER BY crf_request_master.req_slno DESC
               `,
            [],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },


    ndrfApprovalInsert: (data, callback) => {
        pool.query(
            `INSERT INTO crf_ndrf_approval (
                ndrf_mast_slno )
                VALUES(?)`,
            [
                data.ndrf_mast_slno
            ],
            (error, results, fields) => {

                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    ndrfDetailInsert: (data, callback) => {
        pool.query(
            `INSERT INTO crf_ndrf_detail (
                ndrf_mast_slno,
                item_slno,
                item_desc,
                item_brand,
                item_unit,
                item_qnty,
                item_specification,
                aprox_cost,
                item_status,
                create_user
               )
               values ?`,
            [
                data
            ],
            (error, results, fields) => {

                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    getItemListDataCollectByReqno: (id, callBack) => {
        pool.query(
            `  select item_slno,item_desc,item_brand,item_unit,
            item_qnty,item_specification,aprox_cost,item_status
                         from crf_ndrf_detail
                        where ndrf_mast_slno=? and item_status=1`,
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

    updateOMApproval: (data, callback) => {
        pool.query(
            `UPDATE crf_ndrf_approval 
            SET ndrf_om_approv = ?,
            ndrf_om_remarks = ?,
            ndrfom_approv_date = ?,
            ndrf_om_user=?                                     
            WHERE ndrf_mast_slno =?`,
            [
                data.ndrf_om_approv,
                data.ndrf_om_remarks,
                data.ndrfom_approv_date,
                data.ndrf_om_user,
                data.ndrf_mast_slno
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
            `UPDATE crf_ndrf_approval 
            SET ndrf_smo_approv = ?,
            ndrf_smo_remarks = ?,
            ndrf_som_aprrov_date = ?,
            ndrf_smo_user=?                                     
            WHERE ndrf_mast_slno =?`,
            [
                data.ndrf_smo_approv,
                data.ndrf_smo_remarks,
                data.ndrf_som_aprrov_date,
                data.ndrf_smo_user,
                data.ndrf_mast_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    updateCAOApproval: (data, callback) => {
        pool.query(
            `UPDATE crf_ndrf_approval 
            SET ndrf_cao_approve = ?,
            ndrf_cao_approve_remarks = ?,
            ndrf_cao_approv_date = ?,
            ndrf_cao_user=?                                     
            WHERE ndrf_mast_slno =?`,
            [
                data.ndrf_cao_approve,
                data.ndrf_cao_approve_remarks,
                data.ndrf_cao_approv_date,
                data.ndrf_cao_user,
                data.ndrf_mast_slno
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
            `UPDATE crf_ndrf_approval 
            SET ndrf_ed_approve = ?,
            ndrf_ed_approve_remarks = ?,
            ndrf_ed_approve_date = ?,
            ndrf_ed_user=?                                     
            WHERE ndrf_mast_slno =?`,
            [
                data.ndrf_ed_approve,
                data.ndrf_ed_approve_remarks,
                data.ndrf_ed_approve_date,
                data.ndrf_ed_user,
                data.ndrf_mast_slno
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
            `UPDATE crf_ndrf_approval 
            SET ndrf_md_approve = ?,
            ndrf_md_approve_remarks = ?,
            ndrf_md_approve_date = ?,
            ndrf_md_user=?                                     
            WHERE ndrf_mast_slno =?`,
            [
                data.ndrf_md_approve,
                data.ndrf_md_approve_remarks,
                data.ndrf_md_approve_date,
                data.ndrf_md_user,
                data.ndrf_mast_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getNdrfPdf: (callback) => {
        pool.query(
            `select crf_ndrf_mast.ndrf_mast_slno,V.req_slno,ndrf_date,
            V.actual_requirement,V.needed,V.location,
            category,crf_ndrf_mast.request_dept_slno,crf_ndrf_mast.request_deptsec_slno,
             co_department_mast.dept_name as req_dept,co_deptsec_mast.sec_name as req_deptsec,
             incharge_approve,incharge_remarks,incharge_apprv_date,incharge_user,hod_approve,hod_remarks,
             hod_approve_date,hod_user,expected_date,V.remarks,V.create_date as reqdate,
            ndrf_approv_slno, ndrf_om_approv, ndrf_om_remarks, ndrfom_approv_date,
             ndrf_om_user, ndrf_smo_approv, ndrf_smo_remarks, ndrf_som_aprrov_date, ndrf_smo_user,
             ndrf_cao_approve, ndrf_cao_approve_remarks, ndrf_cao_approv_date, ndrf_cao_user, ndrf_ed_approve,
             ndrf_ed_approve_remarks, ndrf_ed_approve_date, ndrf_ed_user,I.em_name as inchuser,H.em_name as hoduser,
              O.em_name as omuser,S.em_name as smouser,C.em_name as caouser,R.em_name as requser,
             E.em_name as eduser,N.em_name as ndrfuser,ndrf_md_approve
            from crf_ndrf_mast
                  left join co_department_mast on co_department_mast.dept_id= crf_ndrf_mast.request_dept_slno 
                  left join co_deptsec_mast on co_deptsec_mast.sec_id= crf_ndrf_mast.request_deptsec_slno  
                  left join crf_request_master V on V.req_slno=crf_ndrf_mast.req_slno
                  left join crf_request_approval on crf_request_approval.req_slno=V.req_slno
                  left join crf_ndrf_approval on crf_ndrf_approval.ndrf_mast_slno=crf_ndrf_mast.ndrf_mast_slno
                  left join co_employee_master I on I.em_id=crf_request_approval.incharge_user
                  left join co_employee_master H on H.em_id=crf_request_approval.hod_user
                  left join co_employee_master O on O.em_id=crf_ndrf_approval.ndrf_om_user  
                  left join co_employee_master S on S.em_id=crf_ndrf_approval.ndrf_smo_user
                  left join co_employee_master C on C.em_id=crf_ndrf_approval.ndrf_cao_user
                  left join co_employee_master R on R.em_id=V.create_user
                  left join co_employee_master E on E.em_id=crf_ndrf_approval.ndrf_ed_user
                  left join co_employee_master N on N.em_id=crf_ndrf_mast.create_user
            
               `,
            [],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    purchaseAcknlodge: (data, callback) => {
        pool.query(
            `UPDATE crf_ndrf_mast 
            SET ndrf_purchase = ?,
            ndrf_purchase_acknolwdge = ?,
            expected_purchase_date=?,
            purchase_date = ?,
            purchase_user=?                                     
            WHERE ndrf_mast_slno =?`,
            [
                data.ndrf_purchase,
                data.ndrf_purchase_acknolwdge,
                data.expected_purchase_date,
                data.purchase_date,
                data.purchase_user,
                data.ndrf_mast_slno
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