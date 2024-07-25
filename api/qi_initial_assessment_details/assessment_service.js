const { pool } = require('../../config/database')
module.exports = {
    OpAssessmentInsert: (data, callback) => {
        pool.query(
            `INSERT INTO qi_op_initial_assessment_details
          (
             patient_arrived_date, ptno, ptname, ptmobile, doctor_name,qi_dept_no,assessment_start,
             assessment_end,sumof_service_time, create_user,consult_start_date,complaint_entry_date,
             investigation_req_date, prescription_req_date, reference_req_date
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

    UpdateServiceTimeOfOPPatients: (body) => {
        return Promise.all(body.map((val) => {
            return new Promise((resolve, reject) => {
                pool.query(
                    `update
                            qi_op_initial_assessment_details set assessment_start = ?, assessment_end = ?,
                            sumof_service_time = ?,consult_start_date=?,complaint_entry_date=?,investigation_req_date=?,
                            prescription_req_date=?,reference_req_date=?
                     where
                            patient_arrived_date = ? and ptno = ? and qi_dept_no = ?`,
                    [
                        val.assessment_start,
                        val.assessment_end,
                        val.sumof_service_time,
                        val.consult_start_date,
                        val.complaint_entry_date,
                        val.investigation_req_date,
                        val.prescription_req_date,
                        val.reference_req_date,
                        val.patient_arrived_date,
                        val.ptno,
                        val.qi_dept_no
                    ],
                    (error, results, fields) => {
                        if (error) {
                            return reject(error)
                        }
                        return resolve(results)
                    }
                )
            })
        }))
    },

    getAseesementReport: (data, callBack) => {
        const fromDate = data.from;
        const toDate = data.to;
        const dpt = data.dpt
        pool.query(
            `SELECT
                    op_slno, patient_arrived_date, ptno, ptname, ptmobile,doctor_name, qi_dept_no,
                    assessment_start, assessment_end, sumof_service_time,consult_start_date,complaint_entry_date,
                    investigation_req_date, prescription_req_date, reference_req_date
             FROM  
                   qi_op_initial_assessment_details 
			 
             WHERE
                  patient_arrived_date between ('${fromDate}') and ('${toDate}') and qi_dept_no=('${dpt}')
                  order by patient_arrived_date`,
            {},
            (err, results, fields) => {
                if (err) {
                    return callBack(err)
                }
                return callBack(null, results)
            }
        )
    },

}
