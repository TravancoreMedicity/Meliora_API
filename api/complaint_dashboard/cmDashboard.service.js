const { pool } = require('../../config/database')
module.exports = {
    getTotalcomplaints: (id, callBack) => {
        pool.query(
            // `select count(complaint_desc) as count_totalcmp from cm_complaint_mast WHERE complaint_deptslno=(select complaint_dept_slno from cm_complaint_dept
            //     where department_slno=?)`,
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
            // `  select count(complaint_desc) as rectify_cmp from cm_complaint_mast WHERE complaint_deptslno=(select complaint_dept_slno from cm_complaint_dept
            //     where department_slno=? AND cm_rectify_status='R')`
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





}