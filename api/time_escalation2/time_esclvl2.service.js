const { pool } = require('../../config/database')
module.exports = {
    getEscalationLevel2: (data, callBack) => {
        pool.query(
            `select cm_complaint_mast.complaint_slno,complaint_desc,complaint_deptslno,complaint_dept_secslno,compalint_date,sec_name,time(compalint_date) FROM cm_complaint_mast
            left join co_deptsec_mast S on S.sec_id=cm_complaint_mast.complaint_dept_secslno
             left join cm_complaint_detail on cm_complaint_detail.complaint_slno=cm_complaint_mast.complaint_slno                                                   
            WHERE time(now()) > ADDTIME((compalint_date) , (select addtime(time(esc_lvl2) ,time(esc_time_limit) ) as escalation from co_time_escalation
            where esc_slno =?)) AND assigned_emp is null AND complaint_deptslno=?`,
            [
                data.esc_slno,
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
    getescalationcountIt: (data, callBack) => {
        pool.query(
            `select count(cm_complaint_mast.complaint_slno) as total FROM cm_complaint_mast
            left join co_deptsec_mast S on S.sec_id=cm_complaint_mast.complaint_dept_secslno
            left join cm_complaint_detail on cm_complaint_detail.complaint_slno=cm_complaint_mast.complaint_slno                                                   
             WHERE time(now()) > ADDTIME((compalint_date) , (select addtime(time(esc_lvl2) ,time(esc_time_limit) ) as escalation from co_time_escalation
             where esc_slno =?)) AND assigned_emp is null AND complaint_deptslno=?`,
            [
                data.esc_slno,
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
    getescalationcountMain: (data, callBack) => {
        pool.query(
            `select count(cm_complaint_mast.complaint_slno) as total FROM cm_complaint_mast
            left join co_deptsec_mast S on S.sec_id=cm_complaint_mast.complaint_dept_secslno
            left join cm_complaint_detail on cm_complaint_detail.complaint_slno=cm_complaint_mast.complaint_slno                                                   
            WHERE time(now()) > ADDTIME((compalint_date) , (select addtime(time(esc_lvl2) ,time(esc_time_limit) ) as escalation from co_time_escalation
             where esc_slno =?)) AND assigned_emp is null AND complaint_deptslno=?`,
            [
                data.esc_slno,
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
}