const { pool } = require('../../config/database')
module.exports = {

    RequstToAssignList: (data, callBack) => {
        pool.query(
            `select cm_complaint_mast.complaint_slno,compalint_date,cm_location,complaint_desc,
            cm_complaint_type.complaint_type_name,cm_priority_desc,
            assigned_date,co_deptsec_mast.sec_name as location,
            timestampdiff(minute,compalint_date,assigned_date) as tat
            from cm_complaint_mast
            left join cm_complaint_detail on cm_complaint_detail.complaint_slno=cm_complaint_mast.complaint_slno
            left join co_deptsec_mast on co_deptsec_mast.sec_id=cm_complaint_mast.cm_location
            left join cm_complaint_type on cm_complaint_type.complaint_type_slno=cm_complaint_mast.complaint_typeslno
            left join cm_priority_mast on cm_priority_mast.cm_priority_slno=cm_complaint_mast.compalint_priority
            where compalint_date between ? and ?`,
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
        );
    },

    RequstToRectifyList: (data, callBack) => {
        pool.query(
            `select cm_complaint_mast.complaint_slno,compalint_date,cm_location,complaint_desc,
            cm_complaint_type.complaint_type_name,cm_priority_desc,
            co_deptsec_mast.sec_name as location,
            cm_rectify_time,
            timestampdiff(minute,compalint_date,cm_rectify_time) as tat
            from cm_complaint_mast
            left join co_deptsec_mast on co_deptsec_mast.sec_id=cm_complaint_mast.cm_location
            left join cm_complaint_type on cm_complaint_type.complaint_type_slno=cm_complaint_mast.complaint_typeslno
            left join cm_priority_mast on cm_priority_mast.cm_priority_slno=cm_complaint_mast.compalint_priority
            where compalint_date between ? and ?`,
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
        );
    },

    RequstToVerifyList: (data, callBack) => {
        pool.query(
            `select cm_complaint_mast.complaint_slno,compalint_date,cm_location,complaint_desc,
            cm_complaint_type.complaint_type_name,cm_priority_desc,
            co_deptsec_mast.sec_name as location,
            cm_verfy_time,
            timestampdiff(minute,compalint_date,cm_verfy_time) as tat
            from cm_complaint_mast
            left join co_deptsec_mast on co_deptsec_mast.sec_id=cm_complaint_mast.cm_location
            left join cm_complaint_type on cm_complaint_type.complaint_type_slno=cm_complaint_mast.complaint_typeslno
            left join cm_priority_mast on cm_priority_mast.cm_priority_slno=cm_complaint_mast.compalint_priority
            where compalint_date between ? and ?`,
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
        );
    },

    AssignToRectify: (data, callBack) => {
        pool.query(
            `select cm_complaint_mast.complaint_slno,compalint_date,cm_location,complaint_desc,
            cm_complaint_type.complaint_type_name,cm_priority_desc,
            assigned_date,co_deptsec_mast.sec_name as location,cm_rectify_time,
            timestampdiff(minute,assigned_date,cm_rectify_time) as tat
            from cm_complaint_mast
            left join cm_complaint_detail on cm_complaint_detail.complaint_slno=cm_complaint_mast.complaint_slno
            left join co_deptsec_mast on co_deptsec_mast.sec_id=cm_complaint_mast.cm_location
            left join cm_complaint_type on cm_complaint_type.complaint_type_slno=cm_complaint_mast.complaint_typeslno
            left join cm_priority_mast on cm_priority_mast.cm_priority_slno=cm_complaint_mast.compalint_priority
            where compalint_date between ? and ? and compalint_status=1 group by complaint_slno`,
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
        );
    },

    AssignToVerify: (data, callBack) => {
        pool.query(
            `select cm_complaint_mast.complaint_slno,compalint_date,cm_location,complaint_desc,
            cm_complaint_type.complaint_type_name,cm_priority_desc,
            assigned_date,co_deptsec_mast.sec_name as location,cm_verfy_time,
            timestampdiff(minute,assigned_date,cm_verfy_time) as tat
            from cm_complaint_mast
            left join cm_complaint_detail on cm_complaint_detail.complaint_slno=cm_complaint_mast.complaint_slno
            left join co_deptsec_mast on co_deptsec_mast.sec_id=cm_complaint_mast.cm_location
            left join cm_complaint_type on cm_complaint_type.complaint_type_slno=cm_complaint_mast.complaint_typeslno
            left join cm_priority_mast on cm_priority_mast.cm_priority_slno=cm_complaint_mast.compalint_priority
            where compalint_date between ? and ? and compalint_status=1 group by complaint_slno`,
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
        );
    },
    RectifyToVerify: (data, callBack) => {
        pool.query(
            `select cm_complaint_mast.complaint_slno,compalint_date,cm_location,complaint_desc,
            cm_complaint_type.complaint_type_name,cm_priority_desc,
            assigned_date,co_deptsec_mast.sec_name as location,cm_rectify_time,cm_verfy_time,
            timestampdiff(minute,cm_rectify_time,cm_verfy_time) as tat
            from cm_complaint_mast
            left join cm_complaint_detail on cm_complaint_detail.complaint_slno=cm_complaint_mast.complaint_slno
            left join co_deptsec_mast on co_deptsec_mast.sec_id=cm_complaint_mast.cm_location
            left join cm_complaint_type on cm_complaint_type.complaint_type_slno=cm_complaint_mast.complaint_typeslno
            left join cm_priority_mast on cm_priority_mast.cm_priority_slno=cm_complaint_mast.compalint_priority
            where compalint_date between ? and ? and compalint_status=2 group by complaint_slno`,
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
        );
    },

    ReqComCategorty: (data, callBack) => {
        pool.query(
            `select cm_complaint_mast.complaint_slno,compalint_date,cm_location,complaint_desc,
            cm_complaint_type.complaint_type_name,cm_priority_desc,
            assigned_date,co_deptsec_mast.sec_name as location,cm_rectify_time,cm_verfy_time,
            cm_rectify_time,cm_verfy_time,
            TIMEDIFF(assigned_date, compalint_date) as tat
            from cm_complaint_mast
            left join cm_complaint_detail on cm_complaint_detail.complaint_slno=cm_complaint_mast.complaint_slno
            left join co_deptsec_mast on co_deptsec_mast.sec_id=cm_complaint_mast.cm_location
            left join cm_complaint_type on cm_complaint_type.complaint_type_slno=cm_complaint_mast.complaint_typeslno
            left join cm_priority_mast on cm_priority_mast.cm_priority_slno=cm_complaint_mast.compalint_priority
            where compalint_date between ? and ?  and complaint_typeslno=? group by complaint_slno`,
            [
                data.start_date,
                data.end_date,
                data.complaint_typeslno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    ReqAreaWise: (data, callBack) => {
        pool.query(
            `select cm_complaint_mast.complaint_slno,compalint_date,cm_location,complaint_desc,
            cm_complaint_type.complaint_type_name,cm_priority_desc,
            assigned_date,co_deptsec_mast.sec_name as location,cm_rectify_time,cm_verfy_time,
            cm_rectify_time,cm_verfy_time,
            TIMEDIFF(assigned_date, compalint_date) as tat
            from cm_complaint_mast
            left join cm_complaint_detail on cm_complaint_detail.complaint_slno=cm_complaint_mast.complaint_slno
            left join co_deptsec_mast on co_deptsec_mast.sec_id=cm_complaint_mast.cm_location
            left join cm_complaint_type on cm_complaint_type.complaint_type_slno=cm_complaint_mast.complaint_typeslno
            left join cm_priority_mast on cm_priority_mast.cm_priority_slno=cm_complaint_mast.compalint_priority
            where compalint_date between ? and ?  and cm_location=? group by complaint_slno`,
            [
                data.start_date,
                data.end_date,
                data.cm_location
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    ReqComPerAssigne: (data, callBack) => {
        pool.query(
            `select cm_complaint_mast.complaint_slno,compalint_date,cm_location,complaint_desc,
            cm_complaint_type.complaint_type_name,cm_priority_desc,
            assigned_date,co_deptsec_mast.sec_name as location,cm_rectify_time,cm_verfy_time,
            TIMEDIFF(assigned_date, compalint_date) as tat,
            co_employee_master.em_name as assign
            from cm_complaint_mast
            left join cm_complaint_detail on cm_complaint_detail.complaint_slno=cm_complaint_mast.complaint_slno
            left join co_deptsec_mast on co_deptsec_mast.sec_id=cm_complaint_mast.cm_location
            left join cm_complaint_type on cm_complaint_type.complaint_type_slno=cm_complaint_mast.complaint_typeslno
            left join cm_priority_mast on cm_priority_mast.cm_priority_slno=cm_complaint_mast.compalint_priority
            left join co_employee_master on co_employee_master.em_id=cm_complaint_detail.assigned_emp
            where compalint_date between ? and ? and
            complaint_deptslno=?`,
            [
                data.start_date,
                data.end_date,
                data.complaint_deptslno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    ReqTatPerComAssignee: (data, callBack) => {
        pool.query(
            `select cm_complaint_mast.complaint_slno,compalint_date,cm_location,complaint_desc,
            cm_complaint_type.complaint_type_name,cm_priority_desc,
            assigned_date,co_deptsec_mast.sec_name as location,cm_rectify_time,cm_verfy_time,
            TIMEDIFF(assigned_date, compalint_date) as tat_assign,
            TIMEDIFF(cm_rectify_time, assigned_date) as tat_rect,
            TIMEDIFF(cm_verfy_time, cm_rectify_time) as tat_very,
            co_employee_master.em_name as assign
            from cm_complaint_mast
            left join cm_complaint_detail on cm_complaint_detail.complaint_slno=cm_complaint_mast.complaint_slno
            left join co_deptsec_mast on co_deptsec_mast.sec_id=cm_complaint_mast.cm_location
            left join cm_complaint_type on cm_complaint_type.complaint_type_slno=cm_complaint_mast.complaint_typeslno
            left join cm_priority_mast on cm_priority_mast.cm_priority_slno=cm_complaint_mast.compalint_priority
            left join co_employee_master on co_employee_master.em_id=cm_complaint_detail.assigned_emp
            where compalint_date between ? and ? and
            complaint_deptslno=?`,
            [
                data.start_date,
                data.end_date,
                data.complaint_deptslno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },



    getCompCategory: (callBack) => {
        pool.query(
            `SELECT complaint_type_slno,complaint_type_name FROM cm_complaint_type where complaint_type_status=1`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )

    },


    getAllCopmDeptWise: (data, callBack) => {
        pool.query(
            `select cm_complaint_mast.complaint_slno,complaint_desc,assigned_date,complaint_dept_name,
            compalint_date,req_type_name,complaint_type_name,S.sec_name as sec_name, 
             IFNULL( L.sec_name,"Nil" ) location,
             priority_check,priority_reason,compalint_priority
             assigned_emp,compalint_priority,compalint_status,cm_rectify_status,
            if(em_name is null ,'Not Assigned',em_name) as em_name,
            if(cm_rectify_time is null ,'Not Update',cm_rectify_time) as cm_rectify_time,
            if(cm_verfy_time is null ,'Not Update',cm_verfy_time) as cm_verfy_time,            
            (case when compalint_priority='1' then "Level 1" when compalint_priority='2' then "Level 2"
                           when compalint_priority='3' then "Level 3" when compalint_priority='4' then "Level 4"
                            else  "Not Updated" end ) as priority,   verify_spervsr,
             if(assigned_date is null,'Not Assigned',assigned_date) as assigned_date,
           (case when compalint_status = '0' then "not assigned" when compalint_status = '1' then "assigned" when compalint_status = '2' then "Rectified"
      when compalint_status = '3' then "Verified" end ) as compalint_status1,
          (case when cm_rectify_status = 'R' then "Rectified" when cm_rectify_status = 'P' then "Pending" when cm_rectify_status = 'O' then "On Hold"  when cm_rectify_status='Z' then" Not Verified" when cm_rectify_status='V' then"Verified" else "Not Updated" end ) as cm_rectify_status1,
               date(assigned_date) as date,TIME_FORMAT(assigned_date,"%r") AS Time,cm_rectify_status,
            if(cm_complaint_mast.complaint_hicslno is null,'Not Suggested',hic_policy_name) as hic_policy_name,
            compdept_message,compdept_message_flag,message_reply_emp
           from cm_complaint_mast   
           left join cm_complaint_detail on cm_complaint_detail.complaint_slno=cm_complaint_mast.complaint_slno
           left join co_request_type on co_request_type.req_type_slno=cm_complaint_mast.complaint_request_slno
           left join co_deptsec_mast S on S.sec_id=cm_complaint_mast.complaint_dept_secslno
           left join co_deptsec_mast L on L.sec_id=cm_complaint_mast.cm_location
           left join cm_hic_policy on cm_hic_policy.hic_policy_slno=cm_complaint_mast.complaint_hicslno
           left join cm_complaint_type on cm_complaint_type.complaint_type_slno=cm_complaint_mast.complaint_typeslno
           left join cm_complaint_dept on cm_complaint_dept.complaint_dept_slno=cm_complaint_mast.complaint_deptslno
            left join co_employee_master on co_employee_master.em_id=cm_complaint_detail.assigned_emp
            left join cm_priority_mast on cm_priority_mast.cm_priority_slno=cm_complaint_mast.compalint_priority
            where complaint_deptslno=(select complaint_dept_slno from cm_complaint_dept
                      where department_slno=?) and compalint_date between ? and ?
                      ORDER BY complaint_slno DESC`,
            [
                data.department_slno,
                data.start_date,
                data.end_date

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