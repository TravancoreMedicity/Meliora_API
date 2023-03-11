const { pool } = require('../../config/database');

module.exports = {
    totaladmissioncount: (callBack) => {
        pool.query(
            `select count(ip_no) as total_admission from wework_patient
            where ipd_status is null`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }

        )
    },
    getDamacount: (callBack) => {
        pool.query(
            `select count(ip_no ) as dama_count from we_patient_surv_log 
            where if_dama = 1`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }

        )
    },

    getcountbhrc: (callBack) => {
        pool.query(
            `select count(ip_no)  as count_bhrc from we_patient_surv_log 
            where bhrc_patient = 1`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }

        )
    },
    getdocVisitCount: (callBack) => {
        pool.query(
            `select count(ip_no) as shift_count from we_daily_activity
            where time(dr_visit_time) > "02-00-00"`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }

        )
    },
    getDischargecountAfterNoon: (callBack) => {
        pool.query(
            `select count(ip_no) as Discharge_count from we_patient_surv_log 
            where time(actual_discharge) > '02:00:00'`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }

        )
    }
}