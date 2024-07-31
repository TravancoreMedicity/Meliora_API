
const { pool } = require('../../config/database')
module.exports = {
    EmergencyQiInsert: (data, callback) => {
        pool.query(
            `INSERT INTO qi_details_emergency
          (
             patient_arrived_date, ptno, ptname, ptsex, ptage, ptaddrs1,
             ptaddrs2, ptaddrs3, ptaddrs4, ptmobile, doctor_name, visit_token,
             qi_dept_no, create_user
          )
         VALUES ?`,
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
        getPatientList: (data, callBack) => {
             pool.query(
            `SELECT 
                   qi_slno, patient_arrived_date, ptno, ptname, ptsex, ptage, ptaddrs1, ptaddrs2, ptaddrs3, ptaddrs4,
                   ptmobile, doctor_name, visit_token, qi_dept_no, qi_status,triage_time,assess_time,return_status,
                   sumof_service_time,qi_save_status,assessment_benchmark_flag,initial_assessment_reason
             FROM  
                   qi_details_emergency
             WHERE 
                   patient_arrived_date between ? and ? order by patient_arrived_date`,
                   [data.from, data.to],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    EmergencyQiUpdate: (data, callback) => {
        pool.query(
            `UPDATE 
                 qi_details_emergency 
             SET 
                 triage_time=?,
                 assess_time=?,
                 return_status=?,
                 edit_user=?,
                 sumof_service_time=?,
                 qi_save_status=?,
                 initial_assessment_reason=?,
                 assessment_benchmark_flag=?
            WHERE 
                 qi_slno=?`,
            [
               
                data.triage_time,
                data.assess_time,
                data.return_status,
                data.edit_user,
                data.sumof_service_time,
                data.qi_save_status,
                data.initial_assessment_reason,
                data.assessment_benchmark_flag,
                data.qi_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    searchPatients: (data, callBack) => {
        const fromDate = data.from;
        const toDate = data.to;
        pool.query(
            `SELECT 
                   qi_slno, patient_arrived_date, ptno, ptname, ptsex, ptage, ptaddrs1, ptaddrs2, ptaddrs3, ptaddrs4,
                   ptmobile, doctor_name, visit_token, qi_dept_no, qi_status,triage_time,assess_time,return_status,
                   sumof_service_time,qi_save_status,assessment_benchmark_flag,initial_assessment_reason
             FROM  
                   qi_details_emergency
             WHERE 
                   patient_arrived_date between ? and ? and ptname like ? order by patient_arrived_date`,
            [
                data.from,
                data.to,
                '%' + data.ptname + '%'
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    AseessmentExceededList: (data, callBack) => {
        pool.query(
            `SELECT 
                   qi_slno,patient_arrived_date,ptno,ptname,ptsex,ptage,doctor_name,qi_status,sumof_service_time,
                   triage_time,assess_time,initial_assessment_reason,assessment_benchmark_flag
             FROM  
                   qi_details_emergency
             WHERE 
                   patient_arrived_date between ? and ? and assessment_benchmark_flag=1 order by patient_arrived_date`,
            [
                data.from,
                data.to
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



















//     EmergencyQiInsert: async (data, callBack) => {
//       //         // const fromDate =format(new Date(data.VSD_DATE), 'yyyy-MM-dd 00:00:00')
//         // const toDate = format(new Date(data.VSD_DATE), 'yyyy-MM-dd 23:59:59')
//         let EmergencycAlreadyExist = (callBack) => {
//             pool.query(`select patient_arrived_date, ptno from qi_details_emergency`,
//                 [],
//                 (error, result) => {
//                     if (error) throw error;
//                     return callBack(JSON.parse(JSON.stringify(result)));
//                 })
//         }
//         try {
//             EmergencycAlreadyExist((sqlData) => {
//                 let newArray = data?.map((value) => {
//                     const checkExist = sqlData.find((val) => format(new Date(val.patient_arrived_date), 'yyyy-MM-dd') === format(new Date(value.VSD_DATE), 'yyyy-MM-dd')
//                         && val.ptno === value.PT_NO);
//                     return checkExist === undefined ? value : null;
//                 }).filter((val) => val !== null)

//                 newArray?.map((value, index) => {
//                     pool.query(`insert into qi_details_emergency 
//                                (
//                                 patient_arrived_date, ptno,ptname,ptsex,ptage,
//                                 ptaddrs1, ptaddrs2,ptaddrs3, ptaddrs4, ptmobile,
//                                 doctor_name,visit_token,qi_dept_no
//                               ) values (?,?,?,?,?,?,?,?,?,?,?,?,?)`,
//                         [
//                             format(new Date(value.VSD_DATE), 'yyyy-MM-dd HH:mm:ss'),
//                             value.PT_NO,
//                             value.PTC_PTNAME,
//                             value.PTC_SEX,
//                             value.PTN_YEARAGE + 'Y ' + value.PTN_MONTHAGE + 'M ' + value.PTN_DAYAGE + 'D',
//                             value.PTC_LOADD1,
//                             value.PTC_LOADD2,
//                             value.PTC_LOADD3,
//                             value.PTC_LOADD4,
//                             value.PTC_MOBILE,
//                             value.DOC_NAME,
//                             value.VSN_TOKEN,
//                             value.DP_CODE,
                           
//                            ],
//                         (error, result) => {
//                             if (error)
//                                 throw error;
//                         });
//                 })
//             })
//             return callBack(null, result)
//         }
//         catch (error) {
//             return callBack(error)
//         }
//     },

