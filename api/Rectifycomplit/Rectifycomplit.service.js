const { pool } = require('../../config/database')

module.exports = {
    getRectifycomplt: (id, callBack) => {
        pool.query(
            `select cm_complaint_mast.complaint_slno,complaint_desc,assigned_date,complaint_dept_name,req_type_name,complaint_type_name,
            assigned_emp,em_name,compalint_status,cm_rectify_status,rectify_pending_hold_remarks,verify_remarks,
            S.sec_name as sec_name,  IFNULL( L.sec_name,"Nill" ) location,complaint_remark,
                        (case when verify_remarks is null then " User Verified" else verify_remarks end ) as verify_remarks1,
                        (case when rectify_pending_hold_remarks is null then "not updated" else rectify_pending_hold_remarks end ) as rectify_pending_hold_remarks1,
                        (case when compalint_status = '0' then "not assigned" when compalint_status = '1' then "assigned" else "Rectified" end ) as compalint_status1,
                         (case when cm_rectify_status = 'R' then "Rectified" when cm_rectify_status = 'P' then "On Progress" when cm_rectify_status = 'O' then "On Hold" else "Not" end ) as cm_rectify_status1,
                                 (case when compalint_priority='1' then "Critical" when compalint_priority='2' then "High"  else "Medium" end ) as priority ,
                                      date(assigned_date) as date,TIME_FORMAT(assigned_date,"%r") AS Time, 
                                if(cm_complaint_mast.complaint_hicslno is null,'no',hic_policy_name) as hic_policy_name 
                       from meliora.cm_complaint_detail
                      left join cm_complaint_mast on cm_complaint_mast.complaint_slno=cm_complaint_detail.complaint_slno
                       left join co_request_type on co_request_type.req_type_slno=cm_complaint_mast.complaint_request_slno
                        left join co_deptsec_mast S on S.sec_id=cm_complaint_mast.complaint_dept_secslno
            left join co_deptsec_mast L on L.sec_id=cm_complaint_mast.cm_location
                                     left join cm_hic_policy on cm_hic_policy.hic_policy_slno=cm_complaint_mast.complaint_hicslno
                             left join cm_complaint_type on cm_complaint_type.complaint_type_slno=cm_complaint_mast.complaint_typeslno
                       left join cm_complaint_dept on cm_complaint_dept.complaint_dept_slno=cm_complaint_mast.complaint_deptslno
                      left join co_employee_master on co_employee_master.em_id=cm_complaint_detail.assigned_emp
          where assigned_emp=? and assign_status=1 ORDER BY compalint_date DESC `,
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
    Updatecomplit: (data, callBack) => {
        pool.query(
            `update cm_complaint_mast 
            set
            compalint_status = ?,
            cm_rectify_time=?,
            cm_rectify_status=?,
            rectify_pending_hold_remarks=?,
            pending_onhold_time=?,
            pending_onhold_user=?,
            verify_spervsr=?
            where complaint_slno = ?`,
            [
                data.compalint_status,
                data.cm_rectify_time,
                data.cm_rectify_status,
                data.rectify_pending_hold_remarks,
                data.pending_onhold_time,
                data.pending_onhold_user,
                data.verify_spervsr,
                data.complaint_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    UpdateVerify: (data, callBack) => {
        pool.query(
            `update cm_complaint_mast 
            set
            compalint_status=?,
            cm_verfy_time=?,
            cm_rectify_status=?,
            verify_remarks=?,
            cm_not_verify_time=?
            where complaint_slno = ?`,
            [
                data.compalint_status,
                data.cm_verfy_time,
                data.cm_rectify_status,
                data.verify_remarks,
                data.cm_not_verify_time,
                data.complaint_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getAssignEmps: (id, callBack) => {
        pool.query(
            `select 
                assigned_emp,
                em_name 
            from cm_complaint_detail
            left join co_employee_master on co_employee_master.em_id=cm_complaint_detail.assigned_emp
            where complaint_slno=? and assign_status=1`,
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
    updateassignDetail: (data, callBack) => {
        return new Promise((resolve, reject) => {
            data.map((val) => {
                pool.query(
                    `update cm_complaint_detail
                   set assign_rect_status=1
                   where assigned_emp=? and complaint_slno=?`,
                    [val.assigned_emp, val.complaint_slno],
                    (error, results, fields) => {
                        if (error) {
                            return reject(error)
                        }
                        return resolve(results);
                    }
                )
            })
        })
    },
}