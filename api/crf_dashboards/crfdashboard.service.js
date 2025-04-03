const { pool } = require('../../config/database')
module.exports = {

    getDashClinicalCRF: (callback) => {
        pool.query(
            `select 
            crf_request_master.req_slno, req_date, actual_requirement, needed, request_dept_slno,
            co_department_mast.dept_name,R.sec_name as req_userdeptsec,U.sec_name as userdeptsec,
             request_deptsec_slno, category, location, remarks, expected_date, 
             CU.em_name as req_user,  crf_request_master.create_date,  rm_ndrf, total_approx_cost,
             user_deptsec, req_status, emergency, image_status,
             incharge_req, incharge_approve, incharge_remarks, inch_detial_analysis, incharge_apprv_date, I.em_name as incharge_user,
             hod_req, hod_approve, hod_remarks, hod_detial_analysis, hod_approve_date,H.em_name as hod_user, 
             dms_req, dms_approve, dms_remarks, dms_detail_analysis, dms_approve_date,D.em_name as dms_user, 
             ms_approve_req, ms_approve, ms_approve_remark, ms_detail_analysis, ms_approve_date,M.em_name as ms_user,
             manag_operation_req, manag_operation_approv, manag_operation_remarks, om_detial_analysis, om_approv_date,OM.em_name as manag_operation_user, 
             senior_manage_req, senior_manage_approv, senior_manage_remarks, smo_detial_analysis, som_aprrov_date,SM.em_name as senior_manage_user,
             cao_approve_req, cao_approve, cao_approve_remarks, ceo_detial_analysis, cao_approv_date,CO.em_name as cao_user,
             ed_approve_req, ed_approve, ed_approve_remarks, ed_detial_analysis, ed_approve_date,ED.em_name as ed_user,
             md_approve_req, md_approve, md_approve_remarks, md_detial_analysis, md_approve_date,MD.em_name as md_user,
              crf_close, crf_close_remark, crf_close_user, crf_closed_one, close_date
            FROM crf_request_master
             left join crf_request_approval on crf_request_approval.req_slno=crf_request_master.req_slno
             left join co_department_mast on co_department_mast.dept_id=crf_request_master.request_dept_slno
             left join co_deptsec_mast R on R.sec_id=crf_request_master.request_deptsec_slno
             left join co_deptsec_mast U on U.sec_id=crf_request_master.user_deptsec
                           left join co_employee_master CU on CU.em_id=crf_request_master.create_user
                           left join co_employee_master I on I.em_id=crf_request_approval.incharge_user
                           left join co_employee_master H on H.em_id=crf_request_approval.hod_user
                           left join co_employee_master D on D.em_id=crf_request_approval.dms_user
                           left join co_employee_master M on M.em_id=crf_request_approval.ms_approve_user
                           left join co_employee_master OM on OM.em_id=crf_request_approval.manag_operation_user
                           left join co_employee_master SM on SM.em_id=crf_request_approval.senior_manage_user
                           left join co_employee_master CO on CO.em_id=crf_request_approval.cao_user
                           left join co_employee_master ED on ED.em_id=crf_request_approval.ed_user
                           left join co_employee_master MD on MD.em_id=crf_request_approval.md_user
              where dms_req=1 AND (req_status!='C' OR req_status is NULL) AND (incharge_approve is NULL OR incharge_approve is NULL OR hod_approve is NULL  OR dms_approve is NULL OR ms_approve is NULL
              OR manag_operation_approv is NULL  OR senior_manage_approv is NULL  OR cao_approve is NULL
              OR (md_approve_req=1  AND  md_approve is NULL) OR (ed_approve_req=1  AND  ed_approve is NULL))
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


    getDashNonClinicalCRF: (callback) => {
        pool.query(
            `select 
            crf_request_master.req_slno, req_date, actual_requirement, needed, request_dept_slno,
            co_department_mast.dept_name,R.sec_name as req_userdeptsec,U.sec_name as userdeptsec,
             request_deptsec_slno, category, location, remarks, expected_date, 
             CU.em_name as req_user,  crf_request_master.create_date,  rm_ndrf, total_approx_cost,
             user_deptsec, req_status, emergency, image_status,
             incharge_req, incharge_approve, incharge_remarks, inch_detial_analysis, incharge_apprv_date, I.em_name as incharge_user,
             hod_req, hod_approve, hod_remarks, hod_detial_analysis, hod_approve_date,H.em_name as hod_user, 
             dms_req, dms_approve, dms_remarks, dms_detail_analysis, dms_approve_date,D.em_name as dms_user, 
             ms_approve_req, ms_approve, ms_approve_remark, ms_detail_analysis, ms_approve_date,M.em_name as ms_user,
             manag_operation_req, manag_operation_approv, manag_operation_remarks, om_detial_analysis, om_approv_date,OM.em_name as manag_operation_user, 
             senior_manage_req, senior_manage_approv, senior_manage_remarks, smo_detial_analysis, som_aprrov_date,SM.em_name as senior_manage_user,
             cao_approve_req, cao_approve, cao_approve_remarks, ceo_detial_analysis, cao_approv_date,CO.em_name as cao_user,
             ed_approve_req, ed_approve, ed_approve_remarks, ed_detial_analysis, ed_approve_date,ED.em_name as ed_user,
             md_approve_req, md_approve, md_approve_remarks, md_detial_analysis, md_approve_date,MD.em_name as md_user,
              crf_close, crf_close_remark, crf_close_user, crf_closed_one, close_date
            FROM crf_request_master
            left join crf_request_approval on crf_request_approval.req_slno=crf_request_master.req_slno
            left join co_department_mast on co_department_mast.dept_id=crf_request_master.request_dept_slno
            left join co_deptsec_mast R on R.sec_id=crf_request_master.request_deptsec_slno
            left join co_deptsec_mast U on U.sec_id=crf_request_master.user_deptsec           
                           left join co_employee_master CU on CU.em_id=crf_request_master.create_user
                           left join co_employee_master I on I.em_id=crf_request_approval.incharge_user
                           left join co_employee_master H on H.em_id=crf_request_approval.hod_user
                           left join co_employee_master D on D.em_id=crf_request_approval.dms_user
                           left join co_employee_master M on M.em_id=crf_request_approval.ms_approve_user
                           left join co_employee_master OM on OM.em_id=crf_request_approval.manag_operation_user
                           left join co_employee_master SM on SM.em_id=crf_request_approval.senior_manage_user
                           left join co_employee_master CO on CO.em_id=crf_request_approval.cao_user
                           left join co_employee_master ED on ED.em_id=crf_request_approval.ed_user
                           left join co_employee_master MD on MD.em_id=crf_request_approval.md_user
              where dms_req=0 AND (req_status!='C' OR req_status is NULL) AND (incharge_approve is NULL OR hod_approve is NULL 
              OR manag_operation_approv is NULL  OR senior_manage_approv is NULL  OR cao_approve is NULL
              OR (md_approve_req=1  AND  md_approve is NULL) OR (ed_approve_req=1  AND  ed_approve is NULL))
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

    getDashClinicalNDRF: (callback) => {
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
           image_status,expected_date,remarks,category,rm_ndrf,emergency,
           purchase_date,expected_purchase_date,PA.em_name as purchase_user,ndrf_po_close,ndrf_po_close_remarks,
           PC.em_name as ndrf_po_close_user, ndrf_po_close_date,ndrf_po_add
                      from crf_ndrf_mast                                              
            
               left join crf_request_master on crf_request_master.req_slno=crf_ndrf_mast.req_slno
               left join crf_request_approval on crf_request_approval.req_slno=crf_request_master.req_slno
                 left join crf_ndrf_approval on crf_ndrf_approval.ndrf_mast_slno=crf_ndrf_mast.ndrf_mast_slno
                    left join co_department_mast on co_department_mast.dept_id=crf_request_master.request_dept_slno
                    left join co_deptsec_mast R on R.sec_id=crf_request_master.request_deptsec_slno
                    left join co_deptsec_mast U on U.sec_id=crf_request_master.user_deptsec 
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
                     left join co_employee_master PA on PA.em_id=crf_ndrf_mast.purchase_user
                     left join co_employee_master PC on PC.em_id=crf_ndrf_mast.ndrf_po_close_user
                     where dms_req=1 AND (req_status!='C' OR req_status is NULL) AND (ndrf_cao_approve is NULL
                     OR ndrf_ed_approve is NULL OR ndrf_md_approve is NULL OR ndrf_purchase is NULL
                     OR ndrf_po_add is NULL OR ndrf_purchase =1)         
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

    getDashNonClinicalNDRF: (callback) => {
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
           image_status,expected_date,remarks,category,rm_ndrf,emergency,
           purchase_date,expected_purchase_date,PA.em_name as purchase_user,ndrf_po_close,ndrf_po_close_remarks,
           PC.em_name as ndrf_po_close_user, ndrf_po_close_date,ndrf_po_add
                      from crf_ndrf_mast                                              
            
               left join crf_request_master on crf_request_master.req_slno=crf_ndrf_mast.req_slno
               left join crf_request_approval on crf_request_approval.req_slno=crf_request_master.req_slno
                 left join crf_ndrf_approval on crf_ndrf_approval.ndrf_mast_slno=crf_ndrf_mast.ndrf_mast_slno
                    left join co_department_mast on co_department_mast.dept_id=crf_request_master.request_dept_slno
                    left join co_deptsec_mast R on R.sec_id=crf_request_master.request_deptsec_slno
                    left join co_deptsec_mast U on U.sec_id=crf_request_master.user_deptsec 
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
                     left join co_employee_master PA on PA.em_id=crf_ndrf_mast.purchase_user
                     left join co_employee_master PC on PC.em_id=crf_ndrf_mast.ndrf_po_close_user
                     where dms_req=0 AND (req_status!='C' OR req_status is NULL) AND (ndrf_cao_approve is NULL
                     OR ndrf_ed_approve is NULL OR ndrf_md_approve is NULL OR ndrf_purchase is NULL
                     OR ndrf_po_add is NULL OR ndrf_purchase =1)
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
    updateDMSApproval: (data, callback) => {
        pool.query(
            `UPDATE crf_request_approval 
            SET hod_approve=?,
            hod_remarks=?,
            hod_approve_date=?,
            hod_user=?,
            dms_approve = ?,
            dms_remarks = ?,
            dms_detail_analysis=?,
            dms_approve_date = ?,  
            dms_user=?                            
            WHERE req_slno =?`,
            [
                data.hod_approve,
                data.hod_remarks,
                data.hod_approve_date,
                data.hod_user,
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
            `UPDATE crf_request_approval 
            SET  hod_approve=?,
            hod_remarks=?,
            hod_approve_date=?,
            hod_user=?,
            ms_approve = ?,
            ms_approve_remark = ?,
            ms_detail_analysis=?,
            ms_approve_date = ?,  
            ms_approve_user=?                            
            WHERE req_slno =?`,
            [
                data.hod_approve,
                data.hod_remarks,
                data.hod_approve_date,
                data.hod_user,
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

    updateOMApproval: (data, callback) => {
        pool.query(
            `UPDATE crf_request_approval 
            SET hod_approve=?,
            hod_remarks=?,
            hod_approve_date=?,
            hod_user=?,
            manag_operation_approv = ?,
            manag_operation_remarks = ?,
            om_detial_analysis=?,
            om_approv_date = ?,  
            manag_operation_user=?                            
            WHERE req_slno =?`,
            [
                data.hod_approve,
                data.hod_remarks,
                data.hod_approve_date,
                data.hod_user,
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

    updateSOMpproval: (data, callback) => {
        pool.query(
            `UPDATE crf_request_approval 
            SET hod_approve=?,
            hod_remarks=?,
            hod_approve_date=?,
            hod_user=?,
            senior_manage_approv = ?,
            senior_manage_remarks = ?,
            smo_detial_analysis=?,
            som_aprrov_date = ?,
            senior_manage_user=?                                         
            WHERE req_slno =?`,
            [
                data.hod_approve,
                data.hod_remarks,
                data.hod_approve_date,
                data.hod_user,
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

    updateCEOApproval: (data, callback) => {
        pool.query(
            `UPDATE crf_request_approval 
            SET hod_approve=?,
            hod_remarks=?,
            hod_approve_date=?,
            hod_user=?,
            cao_approve = ?,
            cao_approve_remarks = ?,
            ceo_detial_analysis=?,
            cao_approv_date = ?,
            ed_approve_req=?,
            md_approve_req=?,
            cao_user=?                            
            WHERE req_slno =?`,
            [
                data.hod_approve,
                data.hod_remarks,
                data.hod_approve_date,
                data.hod_user,
                data.cao_approve,
                data.cao_approve_remarks,
                data.ceo_detial_analysis,
                data.cao_approv_date,
                data.ed_approve_req,
                data.md_approve_req,
                data.cao_user,
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

    updateReqMst: (data, callback) => {
        pool.query(
            `UPDATE crf_request_master 
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
    updateReqMstReject: (data, callback) => {
        pool.query(
            `UPDATE crf_request_master 
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

    updateReqMstApproved: (data, callback) => {
        pool.query(
            `UPDATE crf_request_master 
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

}
