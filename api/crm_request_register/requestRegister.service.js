const { pool } = require('../../config/database')
module.exports = {
    requestRegistInsert: (data, callback) => {
        pool.query(
            `INSERT INTO crf_request_master (
                actual_requirement,
                needed,
                request_dept_slno,
                request_deptsec_slno,
                location,
                create_user,
                remarks,
                total_approx_cost,
                expected_date,
                user_deptsec,
                category,
                emergency
               )
                VALUES(?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.actual_requirement,
                data.needed,
                data.request_dept_slno,
                data.request_deptsec_slno,
                data.location,
                data.create_user,
                data.remarks,
                data.total_approx_cost,
                data.expected_date,
                data.user_deptsec,
                data.category,
                data.emergency
            ],
            (error, results, fields) => {

                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    requestRegistInsertDetl: (data, callback) => {
        pool.query(
            `INSERT INTO crf_request_mast_detail (
                req_slno,
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
    requestApprovalInsert: (data, callback) => {
        pool.query(
            `INSERT INTO crf_request_approval (
                req_slno,
                incharge_req,
                hod_req,
                dms_req,
                ms_approve_req,
                manag_operation_req,
                senior_manage_req,
                cao_approve_req,
                ed_approve_req,
                incharge_user,
                hod_user,
                incharge_approve,
                hod_approve,
                incharge_apprv_date,
                hod_approve_date         
               )
                VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.req_slno,
                data.incharge_req,
                data.hod_req,
                data.dms_req,
                data.ms_approve_req,
                data.manag_operation_req,
                data.senior_manage_req,
                data.cao_approve_req,
                data.ed_approve_req,
                data.incharge_user,
                data.hod_user,
                data.incharge_approve,
                data.hod_approve,
                data.incharge_apprv_date,
                data.hod_approve_date
            ],
            (error, results, fields) => {

                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    getReqByDeptBase: (id, callBack) => {
        pool.query(
            `select crf_request_master.req_slno,req_date,crf_request_master.actual_requirement,
            crf_request_master.needed,crf_request_master.request_dept_slno,
                        crf_request_master.request_deptsec_slno,crf_request_master.location,remarks,expected_date,rm_ndrf,category,image_status,
                        total_approx_cost,user_deptsec,incharge_req,incharge_approve,req_status,
                        hod_req,hod_approve,hod_remarks,req_approv_slno,manag_operation_approv,emergency,             
                       incharge_req, incharge_approve, incharge_remarks, inch_detial_analysis, incharge_apprv_date,
                        incharge_user,
                       hod_req, hod_approve, hod_remarks, hod_detial_analysis, hod_approve_date, hod_user,
                       dms_req, dms_approve, dms_remarks, dms_detail_analysis, dms_approve_date, dms_user,
                       ms_approve_req, ms_approve, ms_approve_remark, ms_detail_analysis, ms_approve_date, ms_approve_user,
                       manag_operation_req, manag_operation_approv, manag_operation_remarks, om_detial_analysis,
                       om_approv_date,
                       senior_manage_remarks, manag_operation_user, senior_manage_req, senior_manage_approv,
                       smo_detial_analysis, som_aprrov_date, senior_manage_user,
                       cao_approve_req, cao_approve, cao_approve_remarks, ceo_detial_analysis, cao_approv_date, cao_user,
                       ed_approve_req, ed_approve, ed_approve_remarks, ed_detial_analysis, ed_approve_date, ed_user,
                       md_approve_req,md_approve,md_approve_remarks,md_detial_analysis,md_approve_date,
                       crf_close,crf_close_remark,crf_close_user,crf_closed_one,close_date,
                       ndrf_cao_approve,ndrf_cao_approve_remarks,ndrf_ed_approve,ndrf_ed_approve_remarks,
                       ndrf_md_approve,ndrf_md_approve_remarks

                         from crf_request_master
                         left join crf_request_approval on crf_request_approval.req_slno=crf_request_master.req_slno
                          left join crf_ndrf_mast on crf_ndrf_mast.req_slno=crf_request_master.req_slno
                          left join crf_ndrf_approval on crf_ndrf_approval.ndrf_mast_slno=crf_ndrf_mast.ndrf_mast_slno
            where user_deptsec=?  ORDER BY crf_request_master.req_slno DESC`,
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

    getItemListByReqno: (id, callBack) => {
        pool.query(
            `  select req_detl_slno,req_slno,item_slno,item_desc,item_brand,item_unit,
            item_qnty,item_specification,aprox_cost,item_status
                         from crf_request_mast_detail
                        where req_slno=? and item_status=1`,
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
    requestRegistUpdate: (data, callback) => {
        pool.query(
            `UPDATE crf_request_master 
                SET actual_requirement = ?,
                needed = ?,
                request_dept_slno = ?,
                request_deptsec_slno = ?,
                location = ?,
                category=?,
                remarks = ?,
                total_approx_cost = ?, 
                expected_date=?,
                user_deptsec=?,
                edit_user=?,
                emergency=?       
                WHERE req_slno = ?`,
            [
                data.actual_requirement,
                data.needed,
                data.request_dept_slno,
                data.request_deptsec_slno,
                data.location,
                data.category,
                data.remarks,
                data.total_approx_cost,
                data.expected_date,
                data.user_deptsec,
                data.edit_user,
                data.emergency,
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
    requestRegistDetlUpdate: (data, callback) => {

        pool.query(
            `UPDATE crf_request_mast_detail 
            SET req_slno = ?,
            item_slno = ?,
            item_desc = ?,
            item_brand = ?,
            item_unit = ?,
            item_qnty = ?,
            item_specification = ?, 
            aprox_cost=?,
            item_status=?,
            edit_user=?         
            WHERE req_detl_slno =?`,
            [
                data.req_slno,
                data.item_slno,
                data.item_desc,
                data.item_brand,
                data.item_unit,
                data.item_qnty,
                data.item_specification,
                data.aprox_cost,
                data.item_status,
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
    getAuthorization: (id, callBack) => {
        pool.query(
            `select auth_slno,dept_section,auth_post,dept_section_post,emp_id 
            from co_emp_authorization_assign
            where dept_section=?`,
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

    getDeptApprovList: (data, callBack) => {
        pool.query(
            ` select crf_request_master.req_slno,req_date,actual_requirement,needed,request_dept_slno,
            co_department_mast.dept_name,R.sec_name as req_userdeptsec,U.sec_name as userdeptsec,
            request_deptsec_slno,location,remarks,expected_date,rm_ndrf,category,image_status,
            total_approx_cost,user_deptsec,req_approv_slno,emergency,req_status,C.em_name as req_user,         
            incharge_req, incharge_approve, incharge_remarks, inch_detial_analysis, incharge_apprv_date,
            I.em_name as incharge_user,
            hod_req, hod_approve, hod_remarks, hod_detial_analysis, hod_approve_date,H.em_name as hod_user,
            dms_req, dms_approve, dms_remarks, dms_detail_analysis, dms_approve_date, dms_user,
            ms_approve_req, ms_approve, ms_approve_remark, ms_detail_analysis, ms_approve_date, ms_approve_user,
            manag_operation_req, manag_operation_approv, manag_operation_remarks, om_detial_analysis,
            om_approv_date,
            senior_manage_remarks, manag_operation_user, senior_manage_req, senior_manage_approv,
            smo_detial_analysis, som_aprrov_date, senior_manage_user,
            cao_approve_req, cao_approve, cao_approve_remarks, ceo_detial_analysis, cao_approv_date, cao_user,
            ed_approve_req, ed_approve, ed_approve_remarks, ed_detial_analysis, ed_approve_date, ed_user,
            md_approve_req,md_approve,md_approve_remarks,md_detial_analysis,md_approve_date,
            crf_close,crf_close_remark,crf_closed_one,close_date,
            S.em_name as close_user
            from crf_request_master
            left join crf_request_approval on crf_request_approval.req_slno=crf_request_master.req_slno
            left join co_employee_master C on C.em_id=crf_request_master.create_user
            left join co_employee_master I on I.em_id=crf_request_approval.incharge_user
            left join co_employee_master H on H.em_id=crf_request_approval.hod_user
            left join co_employee_master S on S.em_id=crf_request_approval.crf_close_user   
            left join co_department_mast on co_department_mast.dept_id=crf_request_master.request_dept_slno
            left join co_deptsec_mast R on R.sec_id=crf_request_master.request_deptsec_slno
            left join co_deptsec_mast U on U.sec_id=crf_request_master.user_deptsec
            where user_deptsec IN (?) GROUP BY req_slno ORDER BY crf_request_master.req_slno DESC`,
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

    getApprovListOthers: (callback) => {
        pool.query(
            `select crf_request_master.req_slno,req_date,actual_requirement,needed,request_dept_slno,
            co_department_mast.dept_name,R.sec_name as req_userdeptsec,U.sec_name as userdeptsec,
            request_deptsec_slno,location,remarks,expected_date,rm_ndrf,category,image_status,
            total_approx_cost,user_deptsec,req_approv_slno,emergency,req_status,C.em_name as req_user,         
            incharge_req, incharge_approve, incharge_remarks, inch_detial_analysis, incharge_apprv_date,
            I.em_name as incharge_user,rm_ndrf,
            hod_req, hod_approve, hod_remarks, hod_detial_analysis, hod_approve_date,H.em_name as hod_user,
            dms_req, dms_approve, dms_remarks, dms_detail_analysis, dms_approve_date,D.em_name as dms_user ,
            ms_approve_req, ms_approve, ms_approve_remark, ms_detail_analysis, ms_approve_date,M.em_name as ms_user,
            manag_operation_req, manag_operation_approv, manag_operation_remarks, om_detial_analysis,
            om_approv_date,OM.em_name as manag_operation_user,
            senior_manage_req,senior_manage_approv,senior_manage_remarks, smo_detial_analysis,
            som_aprrov_date,SM.em_name as senior_manage_user,
            cao_approve_req, cao_approve, cao_approve_remarks, ceo_detial_analysis, cao_approv_date, CO.em_name as cao_user,
            ed_approve_req, ed_approve, ed_approve_remarks, ed_detial_analysis, ed_approve_date, ED.em_name as ed_user,
            md_approve_req,md_approve,md_approve_remarks,md_detial_analysis,md_approve_date,MD.em_name as md_user,
            crf_close,crf_close_remark,crf_closed_one,close_date,
            S.em_name as close_user
            from crf_request_master
            left join crf_request_approval on crf_request_approval.req_slno=crf_request_master.req_slno
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
            left join co_department_mast on co_department_mast.dept_id=crf_request_master.request_dept_slno
            left join co_deptsec_mast R on R.sec_id=crf_request_master.request_deptsec_slno
            left join co_deptsec_mast U on U.sec_id=crf_request_master.user_deptsec
            where hod_approve=1 and req_status!='C' GROUP BY req_slno  ORDER BY crf_request_master.req_slno DESC`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    updateInchargeApproval: (data, callback) => {
        pool.query(
            `UPDATE crf_request_approval 
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

    updateHodApproval: (data, callback) => {
        pool.query(
            `UPDATE crf_request_approval 
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

    updateOMApproval: (data, callback) => {
        pool.query(
            `UPDATE crf_request_approval 
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

    updateSOMpproval: (data, callback) => {
        pool.query(
            `UPDATE crf_request_approval 
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

    updateCEOApproval: (data, callback) => {
        pool.query(
            `UPDATE crf_request_approval 
            SET cao_approve = ?,
            cao_approve_remarks = ?,
            ceo_detial_analysis=?,
            cao_approv_date = ?,
            ed_approve_req=?,
            md_approve_req=?,
            cao_user=?                            
            WHERE req_slno =?`,
            [
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

    updateEDApproval: (data, callback) => {
        pool.query(
            `UPDATE crf_request_approval 
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

    updateMDApproval: (data, callback) => {
        pool.query(
            `UPDATE crf_request_approval 
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

    getApprovListDMS: (callback) => {
        pool.query(
            `select crf_request_master.req_slno,req_date,actual_requirement,needed,request_dept_slno,
            co_department_mast.dept_name,R.sec_name as req_userdeptsec,U.sec_name as userdeptsec,
            request_deptsec_slno,location,remarks,expected_date,rm_ndrf,category,image_status,
            total_approx_cost,user_deptsec,req_approv_slno,emergency,req_status,C.em_name as req_user,         
            incharge_req, incharge_approve, incharge_remarks, inch_detial_analysis, incharge_apprv_date,
            I.em_name as incharge_user,rm_ndrf,
            hod_req, hod_approve, hod_remarks, hod_detial_analysis, hod_approve_date,H.em_name as hod_user,
            dms_req, dms_approve, dms_remarks, dms_detail_analysis, dms_approve_date,D.em_name as dms_user ,
            ms_approve_req, ms_approve, ms_approve_remark, ms_detail_analysis, ms_approve_date,M.em_name as ms_user,
            manag_operation_req, manag_operation_approv, manag_operation_remarks, om_detial_analysis,
            om_approv_date,OM.em_name as manag_operation_user,
            senior_manage_req,senior_manage_approv,senior_manage_remarks, smo_detial_analysis,
            som_aprrov_date,SM.em_name as senior_manage_user,
            cao_approve_req, cao_approve, cao_approve_remarks, ceo_detial_analysis, cao_approv_date, CO.em_name as cao_user,
            ed_approve_req, ed_approve, ed_approve_remarks, ed_detial_analysis, ed_approve_date, ED.em_name as ed_user,
            md_approve_req,md_approve,md_approve_remarks,md_detial_analysis,md_approve_date,MD.em_name as md_user,
            crf_close,crf_close_remark,crf_closed_one,close_date,
            S.em_name as close_user
            from crf_request_master
            left join crf_request_approval on crf_request_approval.req_slno=crf_request_master.req_slno
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
            left join co_department_mast on co_department_mast.dept_id=crf_request_master.request_dept_slno
            left join co_deptsec_mast R on R.sec_id=crf_request_master.request_deptsec_slno
            left join co_deptsec_mast U on U.sec_id=crf_request_master.user_deptsec
            where dms_req=1 and (hod_approve=1 AND hod_req=1 ) GROUP BY req_slno ORDER BY crf_request_master.req_slno DESC`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    deleteItemListByReqno: (data, callback) => {
        pool.query(
            `UPDATE crf_request_mast_detail 
                SET item_status = 0 ,
                delete_user=?  
                WHERE req_detl_slno =?`,
            [
                data.delete_user,
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

    EditItemListByReqno: (data, callback) => {

        pool.query(
            `UPDATE crf_data_collect_detail 
            SET         
            item_desc = ?,
            item_brand = ?,
            item_unit = ?,
            item_qnty = ?,
            item_specification = ?, 
            aprox_cost=?,
            item_status=1,
            edit_user=?         
            WHERE data_detail_slno =?`,
            [
                data.item_desc,
                data.item_brand,
                data.item_unit,
                data.item_qnty,
                data.item_specification,
                data.aprox_cost,
                data.edit_user,
                data.data_detail_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },


    getCrfDeptDataCollect: (callback) => {
        pool.query(
            `select dept_slno,dept_name
            from crf_dept_map
            left join co_department_mast on co_department_mast.dept_id=crf_dept_map.dept_slno
            order by dept_name ASC`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    CrfDeptDataCollectInsert: (data, callBack) => {
        pool.query(
            `INSERT INTO crf_data_collection
            (
                crf_requst_slno,
                crf_req_collect_dept,
                crf_req_remark,
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

    getDataCollectList: (id, callBack) => {
        pool.query(
            `select crf_request_master.req_slno,req_date,crf_request_master.actual_requirement,crf_request_master.needed,crf_request_master.request_dept_slno,
            crf_request_master.request_deptsec_slno,remarks,expected_date,rm_ndrf,category,sec_name,
            inch_detial_analysis,hod_detial_analysis,om_detial_analysis,smo_detial_analysis,
            ceo_detial_analysis,ed_detial_analysis,hod_approve_date,
            crf_data_collection.crf_data_collect_slno,crf_dept_remarks,crf_req_remark,
            total_approx_cost,user_deptsec,incharge_req,incharge_approve,incharge_apprv_date,
            crf_request_master.location,
            (case when emergency=1 then "Emergency" else "Normal" end )as Emergency,
            hod_req,hod_approve,hod_remarks,req_approv_slno,manag_operation_approv,I.em_name as inch_user,H.em_name as hod_user,
            (case when incharge_approve is null then  "not updated" when incharge_approve='1' then "Approved" when incharge_approve='2' then "Reject" else "OnHold" end ) as approve_incharge ,
            (case when incharge_remarks is null then  "not updated" else incharge_remarks end) as incharge_remarks ,
           (case when hod_approve is null then  "not updated"  when hod_approve='1' then "Approved" when hod_approve='2' then "Reject" else "OnHold"end ) as approve_hod,
           (case when hod_remarks is null then  "not updated"  else hod_remarks end) as hod_remarks,manag_operation_approv, senior_manage_approv,cao_approve,ed_approve,
            (case when manag_operation_approv is null then  "not updated" when manag_operation_approv='1' then "Approved" when manag_operation_approv='2' then "Reject" else "OnHold" end ) as manag_operation_approvs ,
            (case when  manag_operation_remarks is null then  "not updated" else manag_operation_remarks end) as manag_operation_remarks ,
             (case when senior_manage_approv is null then  "not updated" when senior_manage_approv='1' then "Approved" when senior_manage_approv='2' then "Reject" else "OnHold"end ) as senior_manage_approvs ,
            (case when  senior_manage_remarks is null then  "not updated" else senior_manage_remarks end) as senior_manage_remarks ,
            (case when cao_approve is null then  "not updated" when cao_approve='1' then "Approved" when cao_approve='2' then "Reject" else "OnHold" end ) as cao_approves ,
            (case when  cao_approve_remarks is null then  "not updated" else cao_approve_remarks end) as cao_approve_remarks ,
             (case when ed_approve is null then  "not updated" when ed_approve='1' then "Approved" when ed_approve='2' then "Reject" else "OnHold" end ) as ed_approves ,
            (case when  ed_approve_remarks is null then  "not updated" else ed_approve_remarks end) as ed_approve_remarks ,
            (case when md_approve is null then  "not updated" when md_approve='1' then "Approved" when md_approve='2' then "Reject" else "OnHold" end ) as md_approves ,
            (case when  md_approve_remarks is null then  "not updated" else md_approve_remarks end) as md_approve_remarks ,
            (case when ndrf_cao_approve is null then  "not updated" when ndrf_cao_approve='1' then "Approved" when ndrf_cao_approve='2' then "Reject" else "OnHold" end ) as ndrf_cao_approves ,
            (case when  ndrf_cao_approve_remarks is null then  "not updated" else ndrf_cao_approve_remarks end) as ndrf_cao_approve_remarks ,
            (case when ndrf_ed_approve is null then  "not updated" when ndrf_ed_approve='1' then "Approved" when ndrf_ed_approve='2' then "Reject" else "OnHold" end ) as ndrf_ed_approves ,
            (case when  ndrf_ed_approve_remarks is null then  "not updated" else ndrf_ed_approve_remarks end) as ndrf_ed_approve_remarks ,
            (case when ndrf_md_approve is null then  "not updated" when ndrf_md_approve='1' then "Approved" when ndrf_md_approve='2' then "Reject" else "OnHold" end ) as ndrf_md_approves ,
            (case when  ed_approve_remarks is null then  "not updated" else ndrf_md_approve_remarks end) as ndrf_md_approve_remarks
            from crf_request_master
            left join crf_request_approval on crf_request_approval.req_slno=crf_request_master.req_slno
            left join crf_ndrf_mast on crf_ndrf_mast.req_slno=crf_request_master.req_slno
            left join crf_ndrf_approval on crf_ndrf_approval.ndrf_mast_slno=crf_ndrf_mast.ndrf_mast_slno
            left join co_employee_master I on I.em_id=crf_request_approval.incharge_user
            left join co_employee_master H on H.em_id=crf_request_approval.hod_user
            left join co_deptsec_mast on co_deptsec_mast.sec_id=crf_request_master.request_deptsec_slno
            left join crf_data_collection on crf_data_collection.crf_requst_slno=crf_request_master.req_slno
            where crf_data_collection.crf_req_collect_dept=?`,
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
            `UPDATE crf_data_collection 
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

    getItemListDataCollectByReqno: (id, callBack) => {
        pool.query(
            `  select data_detail_slno,req_slno,item_slno,item_desc,item_brand,item_unit,
            item_qnty,item_specification,aprox_cost,item_status
                         from crf_data_collect_detail
                        where req_slno=? and item_status=1`,
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


    dataCollectDetailInsert: (data, callback) => {
        pool.query(
            `INSERT INTO crf_data_collect_detail (
                req_slno,
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

    getApprovListMS: (callback) => {
        pool.query(
            `select crf_request_master.req_slno,req_date,actual_requirement,needed,request_dept_slno,
            request_deptsec_slno,remarks,expected_date,rm_ndrf,ed_approve_req,sec_name,
            total_approx_cost,user_deptsec,incharge_req,incharge_approve,category,
            incharge_apprv_date,hod_approve_date,om_approv_date,som_aprrov_date,
            inch_detial_analysis,hod_detial_analysis,om_detial_analysis,smo_detial_analysis,
            ceo_detial_analysis,ed_detial_analysis,
            (case when location is null then "Not Given" else location end )as location,
            (case when emergency=1 then "Emergency" else "Normal" end )as Emergency,
            cao_approv_date,ed_approve_date,I.em_name as inch_user,H.em_name as hod_user,
            O.em_name as om_user,S.em_name as smo_user,C.em_name as cao_user,E.em_name as ed_user,
            hod_req,hod_approve,hod_remarks,req_approv_slno,manag_operation_approv,
             (case when incharge_approve is null then  "not updated" when incharge_approve='1' then "Approved" when incharge_approve='2' then "Reject" else "On-Hold" end ) as approve_incharge ,
              (case when incharge_remarks is null then  "not updated" else incharge_remarks end) as incharge_remarks ,
             (case when hod_approve is null then  "not updated"  when hod_approve='1' then "Approved" when hod_approve='2' then "Reject" else "On-Hold" end ) as approve_hod,
             (case when hod_remarks is null then  "not updated"  else hod_remarks end) as hod_remarks,manag_operation_approv, senior_manage_approv,cao_approve,ed_approve,
             dms_req,dms_approve,dms_remarks,dms_approve_date,dms_user,
             (case when dms_approve is null then  "not updated"  when dms_approve='1' then "Approved" when dms_approve='2' then "Reject" else "OnHold"end ) as approve_dms,
            (case when dms_remarks is null then  "not updated"  else dms_remarks end) as remarks_dms,           
            ms_approve_req,ms_approve,ms_approve_remark,ms_approve_date,ms_approve_user,
             (case when ms_approve is null then  "not updated"  when ms_approve='1' then "Approved" when ms_approve='2' then "Reject" else "OnHold"end ) as approve_ms,
            (case when ms_approve_remark is null then  "not updated"  else ms_approve_remark end) as remark_ms,
              (case when manag_operation_approv is null then  "not updated" when manag_operation_approv='1' then "Approved" when manag_operation_approv='2' then "Reject" else "On-Hold" end ) as manag_operation_approvs ,
              (case when  manag_operation_remarks is null then  "not updated" else manag_operation_remarks end) as manag_operation_remarks ,
               (case when senior_manage_approv is null then  "not updated" when senior_manage_approv='1' then "Approved" when senior_manage_approv='2' then "Reject" else "On-Hold" end ) as senior_manage_approvs ,
              (case when  senior_manage_remarks is null then  "not updated" else senior_manage_remarks end) as senior_manage_remarks ,
              (case when cao_approve is null then  "not updated" when cao_approve='1' then "Approved" when cao_approve='2' then "Reject" else "On-Hold" end ) as cao_approves ,
              (case when  cao_approve_remarks is null then  "not updated" else cao_approve_remarks end) as cao_approve_remarks ,
               (case when ed_approve is null then  "not updated" when ed_approve='1' then "Approved" when ed_approve='2' then "Reject" else "On-Hold" end ) as ed_approves ,
              (case when  ed_approve_remarks is null then  "not updated" else ed_approve_remarks end) as ed_approve_remarks 
            from crf_request_master          
            left join crf_request_approval on crf_request_approval.req_slno=crf_request_master.req_slno
              left join co_employee_master I on I.em_id=crf_request_approval.incharge_user
                left join co_employee_master H on H.em_id=crf_request_approval.hod_user
                  left join co_employee_master O on O.em_id=crf_request_approval.manag_operation_user  
                  left join co_employee_master S on S.em_id=crf_request_approval.senior_manage_user
                    left join co_employee_master C on C.em_id=crf_request_approval.cao_user
                    left join co_employee_master E on E.em_id=crf_request_approval.ed_user
                    left join co_deptsec_mast on co_deptsec_mast.sec_id=crf_request_master.request_deptsec_slno
            where dms_req=1 and dms_approve=1 ORDER BY crf_request_master.req_slno DESC`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    DataCollectComplete: (id, callBack) => {
        pool.query(
            `select crf_data_collect_slno, crf_requst_slno, crf_req_collect_dept, crf_dept_status,
            crf_dept_remarks, req_user, save_user, crf_req_remark, 
                       co_deptsec_mast.sec_name as data_entered,
                       crf_data_collection.crf_dept_status,crf_data_collection.create_date,crf_data_collection.update_date,
                       RU.em_name as req_user,
                        EU.em_name as datagive_user
                        from crf_data_collection          
                       left join co_deptsec_mast on co_deptsec_mast.sec_id=crf_data_collection.crf_req_collect_dept
                       left join co_employee_master RU on RU.em_id=crf_data_collection.req_user
                       left join co_employee_master EU on EU.em_id=crf_data_collection.save_user
                          
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

    getDataCollectListExistOrNot: (id, callBack) => {
        pool.query(
            `select crf_req_collect_dept,
            co_department_mast.dept_name,
            crf_data_collection.crf_dept_status
             from crf_data_collection
            left join crf_dept_map on crf_dept_map.crf_dept_slno =crf_data_collection.crf_req_collect_dept
            left join co_department_mast on co_department_mast.dept_id=crf_dept_map.dept_slno
            where crf_requst_slno=? and crf_data_collection.crf_dept_status=0`,
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

    updateDMSApproval: (data, callback) => {
        pool.query(
            `UPDATE crf_request_approval 
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
            `UPDATE crf_request_approval 
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

    updateCrfClose: (data, callback) => {
        pool.query(
            `UPDATE crf_request_approval 
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
            `UPDATE crf_request_master 
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
}