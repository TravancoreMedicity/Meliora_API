const { pool } = require('../../config/database')
module.exports = {
    getTotalcomplaints: (id, callBack) => {
        pool.query(
            `select count(complaint_slno) as count_totalcmp from cm_complaint_mast WHERE complaint_deptslno=(select complaint_dept_slno from cm_complaint_dept
                where department_slno=?)`,
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
    getPendingcomplaints: (id, callBack) => {
        pool.query(
            `  select count(compalint_status) as pending_cmp from cm_complaint_mast WHERE complaint_deptslno=(select complaint_dept_slno from cm_complaint_dept
                where department_slno=? AND compalint_status=0)`,
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
    getAssignedcomplaints: (id, callBack) => {
        pool.query(
            `     select count(compalint_status) as assigned_cmp from cm_complaint_mast WHERE complaint_deptslno=(select complaint_dept_slno from cm_complaint_dept
                where department_slno=? AND compalint_status=1)`,
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
    getOnholdcomplaints: (id, callBack) => {
        pool.query(
            `     select count(complaint_desc) as onhold_cmp from cm_complaint_mast WHERE complaint_deptslno=(select complaint_dept_slno from cm_complaint_dept
                where department_slno=? AND cm_rectify_status='O')`,
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
    getRectifycomplaints: (id, callBack) => {
        pool.query(
            ` select count(cm_rectify_time) as rectify_cmp from cm_complaint_mast WHERE complaint_deptslno=(select complaint_dept_slno from cm_complaint_dept
                    where department_slno=? AND cm_rectify_time is not null)`,
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
    getVerifycomplaints: (id, callBack) => {
        pool.query(
            // `   select count(compalint_status) as verify_cmp from cm_complaint_mast WHERE complaint_deptslno=(select complaint_dept_slno from cm_complaint_dept
            //     where department_slno=? AND compalint_status=3)`,
            `select count(cm_verfy_time) as verify_cmp from cm_complaint_mast WHERE complaint_deptslno=(select complaint_dept_slno from cm_complaint_dept
                where department_slno=? AND cm_verfy_time is not null)`,
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
    getEmployeeProgressDash: (data, callBack) => {
        pool.query(
            // `select * from cm_complaint_mast 
            // left join cm_complaint_detail on cm_complaint_detail.complaint_slno=cm_complaint_mast.complaint_slno where complaint_deptslno=(select complaint_dept_slno from cm_complaint_dept
            //           where department_slno=? and date(assigned_date)=?)`
            `   select cm_complaint_mast.complaint_slno,complaint_deptslno,complaint_dept_secslno,cm_rectify_status,assigned_emp,date(assigned_date) as assigned_date ,complaint_desc,compalint_status,cm_rectify_time from cm_complaint_mast 
            left join cm_complaint_detail on cm_complaint_detail.complaint_slno=cm_complaint_mast.complaint_slno where date(compalint_date)=?`,
            [
                data.compalint_date,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getEmployeeProgressPending: (callBack) => {
        pool.query(
            // `select * from cm_complaint_mast
            // left join cm_complaint_detail on cm_complaint_detail.complaint_slno=cm_complaint_mast.complaint_slno where complaint_deptslno=(select complaint_dept_slno from cm_complaint_dept
            //   where department_slno=? and compalint_status=1)`,
            `   select cm_complaint_mast.complaint_slno,complaint_deptslno,complaint_dept_secslno,cm_rectify_status,assigned_emp,date(assigned_date) as assigned_date,complaint_desc,compalint_status,cm_rectify_time from cm_complaint_mast 
            left join cm_complaint_detail on cm_complaint_detail.complaint_slno=cm_complaint_mast.complaint_slno where compalint_status=1`,
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









}