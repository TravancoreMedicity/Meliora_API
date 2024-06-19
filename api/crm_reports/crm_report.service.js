const { pool } = require('../../config/database')
module.exports = {

    getCRFNoBased: (id, callBack) => {
        pool.query(
            `select req_slno, co_department_mast.dept_name,RDS.sec_name,  actual_requirement,
            needed, category, location, expected_date, emergency_flag, emer_slno,
            crm_emergencytype_mast.emer_type_name, emergeny_remarks, total_approx_cost,
            UDS.sec_name as user_deptsec,  req_status, image_status, co_employee_master.em_name as req_user,
            crm_request_master.create_date as req_date,  user_acknldge, user_acknldge_remarks,
            user_ack_user, user_ack_date
              
              
            from crm_request_master
 
            left join co_deptsec_mast RDS on RDS.sec_id=crm_request_master.request_deptsec_slno
            left join co_department_mast on co_department_mast.dept_id=RDS.dept_id
            left join crm_emergencytype_mast on crm_emergencytype_mast.emergency_slno=crm_request_master.emer_slno
            left join co_deptsec_mast UDS on RDS.sec_id=crm_request_master.user_deptsec
            left join co_employee_master on co_employee_master.em_id=crm_request_master.create_user
  
 
            where req_slno=?
            group by req_slno`,
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
    getdataUserAcknldged: (data, callBack) => {
        pool.query(
            `select ROW_NUMBER() over (order by req_slno) as slno,req_slno, co_department_mast.dept_name,
            RDS.sec_name,  actual_requirement,
            needed, category, location, expected_date, emergency_flag, emer_slno,
            crm_emergencytype_mast.emer_type_name, emergeny_remarks, total_approx_cost,
            UDS.sec_name as user_deptsec,  req_status, image_status, co_employee_master.em_name as req_user,
            crm_request_master.create_date as req_date,  user_acknldge, user_acknldge_remarks,
            user_ack_user, user_ack_date            
              
            from crm_request_master 
            left join co_deptsec_mast RDS on RDS.sec_id=crm_request_master.request_deptsec_slno
            left join co_department_mast on co_department_mast.dept_id=RDS.dept_id
            left join crm_emergencytype_mast on crm_emergencytype_mast.emergency_slno=crm_request_master.emer_slno
            left join co_deptsec_mast UDS on RDS.sec_id=crm_request_master.user_deptsec
            left join co_employee_master on co_employee_master.em_id=crm_request_master.create_user
            where date(crm_request_master.create_date) between ? and ?
            and user_acknldge=1
               group by req_slno
             `,

            [
                data.start_date,
                data.end_date
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getdataUserNotAcknldged: (data, callBack) => {
        pool.query(
            `select ROW_NUMBER() over (order by req_slno) as slno,req_slno, co_department_mast.dept_name,
            RDS.sec_name,  actual_requirement,
            needed, category, location, expected_date, emergency_flag, emer_slno,
            crm_emergencytype_mast.emer_type_name, emergeny_remarks, total_approx_cost,
            UDS.sec_name as user_deptsec,  req_status, image_status, co_employee_master.em_name as req_user,
            crm_request_master.create_date as req_date,  user_acknldge, user_acknldge_remarks,
            user_ack_user, user_ack_date            
              
            from crm_request_master 
            left join co_deptsec_mast RDS on RDS.sec_id=crm_request_master.request_deptsec_slno
            left join co_department_mast on co_department_mast.dept_id=RDS.dept_id
            left join crm_emergencytype_mast on crm_emergencytype_mast.emergency_slno=crm_request_master.emer_slno
            left join co_deptsec_mast UDS on RDS.sec_id=crm_request_master.user_deptsec
            left join co_employee_master on co_employee_master.em_id=crm_request_master.create_user
            where date(crm_request_master.create_date) between ? and ?
            and user_acknldge is NULL
               group by req_slno
             `,

            [
                data.start_date,
                data.end_date
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
}
