const { pool } = require('../../config/database')
module.exports = {
    getEscalationComplaint: (callBack) => {
        pool.query(
            `SELECT * FROM cm_complaint_mast`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getEscalationLevels: (callBack) => {
        pool.query(
            `SELECT esc_slno,esc_activity,time(esc_time_limit)as esc_time_limit,time(esc_lvl1) as esc_lvl1  FROM co_time_escalation order by esc_activity asc`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getEscalationLevel1It: (data, callBack) => {
        pool.query(
            `select cm_complaint_mast.complaint_slno,complaint_desc,complaint_deptslno,complaint_dept_secslno,compalint_date,sec_name,time(compalint_date) FROM cm_complaint_mast
            left join co_deptsec_mast S on S.sec_id=cm_complaint_mast.complaint_dept_secslno
            left join cm_complaint_detail on cm_complaint_detail.complaint_slno=cm_complaint_mast.complaint_slno                                                   
             WHERE time(now()) > ADDTIME((compalint_date) , (select addtime(time(esc_lvl1) ,time(esc_time_limit) ) as escalation from co_time_escalation
              where esc_slno =? )) AND assigned_emp is null AND complaint_deptslno=?`,
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
    getEscalationLevel1Maintenance: (callBack) => {
        pool.query(
            `SELECT  complaint_desc,compalint_date,cm_complaint_mast.complaint_slno,compalint_status
            FROM cm_complaint_mast
              left join cm_complaint_detail on cm_complaint_detail.complaint_slno=cm_complaint_mast.complaint_slno
            WHERE compalint_date < NOW() + INTERVAL -45 MINUTE AND assigned_emp is null AND complaint_deptslno=3`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getEscalationSelectbox: (callBack) => {
        pool.query(
            `select esc_slno,esc_activity from co_time_escalation where esc_status=1 order by esc_activity asc`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    escmappingByid: (id, callBack) => {
        pool.query(
            ` select escalaion_slno,complaint_dept FROM co_time_esc_mapping where escalaion_slno=?`,
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
    getescmappingByidcount: (callBack) => {
        pool.query(
            `select * from co_time_esc_mapping  `,
            [

            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getescalationcountMaintenance: (data, callBack) => {
        pool.query(
            `select count(cm_complaint_mast.complaint_slno) as total FROM cm_complaint_mast
            left join co_deptsec_mast S on S.sec_id=cm_complaint_mast.complaint_dept_secslno
             left join cm_complaint_detail on cm_complaint_detail.complaint_slno=cm_complaint_mast.complaint_slno                                                   
                 WHERE time(now()) > ADDTIME((compalint_date) , (select addtime(time(esc_lvl1) ,time(esc_time_limit) ) as escalation from co_time_escalation
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
                 WHERE time(now()) > ADDTIME((compalint_date) , (select addtime(time(esc_lvl1) ,time(esc_time_limit) ) as escalation from co_time_escalation
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