const { pool } = require('../../config/database');

module.exports = {

    updateNdrfConvert: (data, callback) => {
        pool.query(
            `UPDATE rm_request_master 
            SET rm_ndrf=1            
            WHERE req_slno=?`,
            [
                data.rm_ndrf,
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
              FROM rm_ndrf_mast
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
            `INSERT INTO rm_ndrf_mast (
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
            `select rm_request_master.req_slno,ndrf_date,rm_request_master.actual_requirement,
            rm_request_master.needed,rm_request_master.location,ed_approve_req,
            rm_request_master.request_dept_slno,rm_request_master.request_deptsec_slno ,
            co_department_mast.dept_name as req_dept,total_approx_cost,
            co_deptsec_mast.sec_name as req_deptsec,rm_request_master.remarks,category,
            rm_request_master.create_date as reqdate,rm_request_master.expected_date as expdate,
            incharge_apprv_date,hod_approve_date,om_approv_date,som_aprrov_date,ed_approve_date,
            cao_approv_date,ed_approve_date,I.em_name as inch_user,H.em_name as hoduser,
            O.em_name as om_user,S.em_name as smo_user,C.em_name as caouser,R.em_name as req_user,
            E.em_name as eduser,incharge_user,hod_user,manag_operation_user,senior_manage_user,cao_user,ed_user,
            hod_req,hod_approve,hod_remarks,req_approv_slno,manag_operation_approv, N.em_name as ndrfuser,
            rm_ndrf_mast.ndrf_mast_slno,ndrf_om_approv,ndrf_om_remarks,ndrfom_approv_date,ndrf_smo_approv,ndrf_smo_remarks,ndrf_som_aprrov_date,
            ndrf_cao_approve,ndrf_cao_approve_remarks,ndrf_cao_approv_date,ndrf_ed_approve,ndrf_ed_approve_remarks,ndrf_ed_approve_date,
             (case when incharge_approve is null then  "not updated" when incharge_approve='1' then "Approved" else "Reject" end ) as approve_incharge ,
              (case when incharge_remarks is null then  "not updated" else incharge_remarks end) as incharge_remarks ,
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
               from rm_ndrf_mast                       
               left join co_department_mast on co_department_mast.dept_id= rm_ndrf_mast.request_dept_slno 
               left join co_deptsec_mast on co_deptsec_mast.sec_id= rm_ndrf_mast.request_deptsec_slno       
               left join rm_request_master on rm_request_master.req_slno=rm_ndrf_mast.req_slno
               left join rm_request_approval on rm_request_approval.req_slno=rm_request_master.req_slno
               left join rm_ndrf_approval on rm_ndrf_approval.ndrf_mast_slno=rm_ndrf_mast.ndrf_mast_slno
              left join co_employee_master I on I.em_id=rm_request_approval.incharge_user
                left join co_employee_master H on H.em_id=rm_request_approval.hod_user
                  left join co_employee_master O on O.em_id=rm_request_approval.manag_operation_user  
                  left join co_employee_master S on S.em_id=rm_request_approval.senior_manage_user
                    left join co_employee_master C on C.em_id=rm_request_approval.senior_manage_user
                    left join co_employee_master R on R.em_id=rm_request_master.create_user
                    left join co_employee_master E on E.em_id=rm_request_approval.ed_user
                    left join co_employee_master N on N.em_id=rm_ndrf_mast.create_user
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
            `INSERT INTO rm_ndrf_approval (
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
    updateOMApproval: (data, callback) => {
        pool.query(
            `UPDATE rm_ndrf_approval 
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
            `UPDATE rm_ndrf_approval 
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
            `UPDATE rm_ndrf_approval 
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
            `UPDATE rm_ndrf_approval 
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

    getNdrfPdf: (callback) => {
        pool.query(
            `select rm_ndrf_mast.ndrf_mast_slno,rm_request_master.req_slno,ndrf_date,rm_request_master.actual_requirement,
            rm_request_master.needed,rm_request_master.location,category,
            rm_ndrf_mast.request_dept_slno,rm_ndrf_mast.request_deptsec_slno, co_department_mast.dept_name as req_dept,
            co_deptsec_mast.sec_name as req_deptsec,incharge_approve,incharge_remarks,incharge_apprv_date,incharge_user,
            hod_approve,hod_remarks,hod_approve_date,hod_user,expected_date,rm_request_master.remarks,
            rm_request_master.create_date as reqdate,
            ndrf_approv_slno, ndrf_om_approv, ndrf_om_remarks, ndrfom_approv_date,
             ndrf_om_user, ndrf_smo_approv, ndrf_smo_remarks, ndrf_som_aprrov_date, ndrf_smo_user,
             ndrf_cao_approve, ndrf_cao_approve_remarks, ndrf_cao_approv_date, ndrf_cao_user, ndrf_ed_approve,
             ndrf_ed_approve_remarks, ndrf_ed_approve_date, ndrf_ed_user,I.em_name as inchuser,H.em_name as hoduser,
              O.em_name as omuser,S.em_name as smouser,C.em_name as caouser,R.em_name as requser,
             E.em_name as eduser,N.em_name as ndrfuser
            from rm_ndrf_mast
                  left join co_department_mast on co_department_mast.dept_id= rm_ndrf_mast.request_dept_slno 
                  left join co_deptsec_mast on co_deptsec_mast.sec_id= rm_ndrf_mast.request_deptsec_slno  
                  left join rm_request_master on rm_request_master.req_slno=rm_ndrf_mast.req_slno
                  left join rm_request_approval on rm_request_approval.req_slno=rm_request_master.req_slno
                  left join rm_ndrf_approval on rm_ndrf_approval.ndrf_mast_slno=rm_ndrf_mast.ndrf_mast_slno
                  left join co_employee_master I on I.em_id=rm_request_approval.incharge_user
                  left join co_employee_master H on H.em_id=rm_request_approval.hod_user
                  left join co_employee_master O on O.em_id=rm_ndrf_approval.ndrf_om_user  
                  left join co_employee_master S on S.em_id=rm_ndrf_approval.ndrf_smo_user
                  left join co_employee_master C on C.em_id=rm_ndrf_approval.ndrf_cao_user
                  left join co_employee_master R on R.em_id=rm_request_master.create_user
                  left join co_employee_master E on E.em_id=rm_ndrf_approval.ndrf_ed_user
                  left join co_employee_master N on N.em_id=rm_ndrf_mast.create_user
            
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
}