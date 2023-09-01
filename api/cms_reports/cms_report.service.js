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
}