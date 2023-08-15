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
            `select crf_request_master.req_slno,req_date,actual_requirement,needed,request_dept_slno,
            request_deptsec_slno,location,remarks,expected_date,rm_ndrf,category,
            total_approx_cost,user_deptsec,incharge_req,incharge_approve,req_status,
            hod_req,hod_approve,hod_remarks,req_approv_slno,manag_operation_approv,
            (case when emergency=1 then "Emergency" else "Normal" end )as Emergency,
             (case when incharge_req=1 and incharge_approve is null then  "not updated" when incharge_req=0 then "Not Required" when incharge_approve='1' then "Approved" else "Reject" end ) as approve_incharge ,
              (case when incharge_req=1 and  incharge_remarks is null then  "not updated" when incharge_req=0 then "Not Required" else incharge_remarks end) as incharge_remarks ,
             (case when hod_approve is null then  "not updated"  when hod_approve='1' then "Approved" else "Reject" end ) as approve_hod,
             (case when hod_remarks is null then  "not updated"  else hod_remarks end) as hod_remarks,manag_operation_approv, senior_manage_approv,cao_approve,ed_approve,
              (case when manag_operation_approv is null then  "not updated" when manag_operation_approv='1' then "Approved" else "Reject" end ) as manag_operation_approvs ,
              (case when  manag_operation_remarks is null then  "not updated" else manag_operation_remarks end) as manag_operation_remarks ,
               (case when senior_manage_approv is null then  "not updated" when senior_manage_approv='1' then "Approved" else "Reject" end ) as senior_manage_approvs ,
              (case when  senior_manage_remarks is null then  "not updated" else senior_manage_remarks end) as senior_manage_remarks ,
              (case when cao_approve is null then  "not updated" when cao_approve='1' then "Approved" else "Reject" end ) as cao_approves ,
              (case when  cao_approve_remarks is null then  "not updated" else cao_approve_remarks end) as cao_approve_remarks ,
               (case when ed_approve is null then  "not updated" when ed_approve='1' then "Approved" else "Reject" end ) as ed_approves ,
              (case when  ed_approve_remarks is null then  "not updated" else ed_approve_remarks end) as ed_approve_remarks 
             from crf_request_master
             left join crf_request_approval on crf_request_approval.req_slno=crf_request_master.req_slno
            where user_deptsec=?`,
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
                remarks = ?,
                total_approx_cost = ?, 
                expected_date=?,
                user_deptsec=?,
                edit_user=? ,
                emergency=?       
                WHERE req_slno = ?`,
            [
                data.actual_requirement,
                data.needed,
                data.request_dept_slno,
                data.request_deptsec_slno,
                data.location,
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

    getDeptApprovList: (id, callBack) => {
        pool.query(
            `select crf_request_master.req_slno,req_date,actual_requirement,needed,request_dept_slno,
            request_deptsec_slno,location,remarks,expected_date,rm_ndrf,category,sec_name,
            inch_detial_analysis,hod_detial_analysis,om_detial_analysis,smo_detial_analysis,
            ceo_detial_analysis,ed_detial_analysis,
            total_approx_cost,user_deptsec,incharge_req,incharge_approve,incharge_apprv_date,
            (case when emergency=1 then "Emergency" else "Normal" end )as Emergency,
            hod_req,hod_approve,hod_remarks,req_approv_slno,manag_operation_approv,I.em_name as inch_user,
            (case when incharge_approve is null then  "not updated" when incharge_approve='1' then "Approved" when incharge_approve='2' then "Reject" else "OnHold" end ) as approve_incharge ,
            (case when incharge_remarks is null then  "not updated" else incharge_remarks end) as incharge_remarks ,
           (case when hod_approve is null then  "not updated"  when hod_approve='1' then "Approved" when hod_approve='2' then "Reject" else "OnHold"end ) as approve_hod,
           (case when hod_remarks is null then  "not updated"  else hod_remarks end) as hod_remarks,
           dms_req,dms_approve,dms_remarks,dms_approve_date,dms_user,
            (case when dms_approve is null then  "not updated"  when dms_approve='1' then "Approved" when dms_approve='2' then "Reject" else "OnHold"end ) as approve_dms,
           (case when dms_remarks is null then  "not updated"  else dms_remarks end) as remarks_dms,           
           ms_approve_req,ms_approve,ms_approve_remark,ms_approve_date,ms_approve_user,
            (case when ms_approve is null then  "not updated"  when ms_approve='1' then "Approved" when ms_approve='2' then "Reject" else "OnHold"end ) as approve_ms,
           (case when ms_approve_remark is null then  "not updated"  else ms_approve_remark end) as remark_ms,
           manag_operation_approv, senior_manage_approv,cao_approve,ed_approve,        
           (case when manag_operation_approv is null then  "not updated" when manag_operation_approv='1' then "Approved" when manag_operation_approv='2' then "Reject" else "OnHold" end ) as manag_operation_approvs ,
            (case when  manag_operation_remarks is null then  "not updated" else manag_operation_remarks end) as manag_operation_remarks ,
             (case when senior_manage_approv is null then  "not updated" when senior_manage_approv='1' then "Approved" when senior_manage_approv='2' then "Reject" else "OnHold"end ) as senior_manage_approvs ,
            (case when  senior_manage_remarks is null then  "not updated" else senior_manage_remarks end) as senior_manage_remarks ,
            (case when cao_approve is null then  "not updated" when cao_approve='1' then "Approved" when cao_approve='2' then "Reject" else "OnHold" end ) as cao_approves ,
            (case when  cao_approve_remarks is null then  "not updated" else cao_approve_remarks end) as cao_approve_remarks ,
             (case when ed_approve is null then  "not updated" when ed_approve='1' then "Approved" when ed_approve='2' then "Reject" else "OnHold" end ) as ed_approves ,
            (case when  ed_approve_remarks is null then  "not updated" else ed_approve_remarks end) as ed_approve_remarks 
            from crf_request_master
            left join crf_request_approval on crf_request_approval.req_slno=crf_request_master.req_slno
            left join co_employee_master I on I.em_id=crf_request_approval.incharge_user
            left join co_deptsec_mast on co_deptsec_mast.sec_id=crf_request_master.request_deptsec_slno
            where user_deptsec=? ORDER BY crf_request_master.req_slno DESC`,
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
    getApprovListOthers: (callback) => {
        pool.query(
            `select crf_request_master.req_slno,req_date,actual_requirement,needed,request_dept_slno,
            request_deptsec_slno,location,remarks,expected_date,rm_ndrf,ed_approve_req,sec_name,
            total_approx_cost,user_deptsec,incharge_req,incharge_approve,category,
            incharge_apprv_date,hod_approve_date,om_approv_date,som_aprrov_date,
            inch_detial_analysis,hod_detial_analysis,om_detial_analysis,smo_detial_analysis,
            ceo_detial_analysis,ed_detial_analysis,
            (case when emergency=1 then "Emergency" else "Normal" end )as Emergency,
            cao_approv_date,ed_approve_date,I.em_name as inch_user,H.em_name as hod_user,
            O.em_name as om_user,S.em_name as smo_user,C.em_name as cao_user,E.em_name as ed_user,
            hod_req,hod_approve,hod_remarks,req_approv_slno,manag_operation_approv,
             (case when incharge_approve is null then  "not updated" when incharge_approve='1' then "Approved" when incharge_approve='2' then "Reject" else "On-Hold" end ) as approve_incharge ,
              (case when incharge_remarks is null then  "not updated" else incharge_remarks end) as incharge_remarks ,
             (case when hod_approve is null then  "not updated"  when hod_approve='1' then "Approved" when hod_approve='2' then "Reject" else "On-Hold" end ) as approve_hod,
             (case when hod_remarks is null then  "not updated"  else hod_remarks end) as hod_remarks,manag_operation_approv, senior_manage_approv,cao_approve,ed_approve,
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
            where hod_approve=1`,
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
            WHERE req_approv_slno =?`,
            [
                data.incharge_approve,
                data.incharge_remarks,
                data.inch_detial_analysis,
                data.incharge_apprv_date,
                data.incharge_user,
                data.req_approv_slno

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
            WHERE req_approv_slno =?`,
            [
                data.hod_approve,
                data.hod_remarks,
                data.hod_detial_analysis,
                data.hod_approve_date,
                data.hod_user,
                data.req_approv_slno

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
            WHERE req_approv_slno =?`,
            [
                data.manag_operation_approv,
                data.manag_operation_remarks,
                data.om_detial_analysis,
                data.om_approv_date,
                data.manag_operation_user,
                data.req_approv_slno

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
            WHERE req_approv_slno =?`,
            [
                data.senior_manage_approv,
                data.senior_manage_remarks,
                data.smo_detial_analysis,
                data.som_aprrov_date,
                data.senior_manage_user,
                data.req_approv_slno

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
            cao_user=?                            
            WHERE req_approv_slno =?`,
            [
                data.cao_approve,
                data.cao_approve_remarks,
                data.ceo_detial_analysis,
                data.cao_approv_date,
                data.ed_approve_req,
                data.cao_user,
                data.req_approv_slno

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
            WHERE req_approv_slno =?`,
            [
                data.ed_approve,
                data.ed_approve_remarks,
                data.ed_detial_analysis,
                data.ed_approve_date,
                data.ed_user,
                data.req_approv_slno

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

    getApprovListDMS: (callback) => {
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
            where dms_req=1 and hod_approve=1`,
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
            `UPDATE crf_data_collect_detail 
                SET item_status = 0 ,
                delete_user=?  
                WHERE req_detl_slno = ?`,
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
            left join co_department_mast on co_department_mast.dept_id=crf_dept_map.dept_slno`,
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
            `select crf_request_master.req_slno,req_date,actual_requirement,needed,request_dept_slno,
            request_deptsec_slno,remarks,expected_date,rm_ndrf,category,sec_name,
            inch_detial_analysis,hod_detial_analysis,om_detial_analysis,smo_detial_analysis,
            ceo_detial_analysis,ed_detial_analysis,hod_approve_date,
            crf_data_collection.crf_data_collect_slno,
            total_approx_cost,user_deptsec,incharge_req,incharge_approve,incharge_apprv_date,
            (case when location is null then "Not Given" else location end )as location,
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
            (case when  ed_approve_remarks is null then  "not updated" else ed_approve_remarks end) as ed_approve_remarks 
            from crf_request_master
            left join crf_request_approval on crf_request_approval.req_slno=crf_request_master.req_slno
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
            where dms_req=1 and dms_approve=1`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },


}