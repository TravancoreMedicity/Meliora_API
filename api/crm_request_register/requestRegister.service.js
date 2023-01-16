const { pool } = require('../../config/database')
module.exports = {
    requestRegistInsert: (data, callback) => {
        console.log(data);
        pool.query(
            `INSERT INTO rm_request_master (
                actual_requirement,
                needed,
                request_dept_slno,
                request_deptsec_slno,
                location,
                create_user,
                remarks,
                total_approx_cost,
                expected_date,
                user_deptsec
               )
                VALUES(?,?,?,?,?,?,?,?,?,?)`,
            [
                data.actual_requirement,
                data.needed,
                data.request_dept_slno,
                data.request_deptsec_slno,
                data.location,
                data.create_user,
                data.remarks,
                data.total_approx_cost,
                data.expected_date,
                data.user_deptsec
            ],
            (error, results, fields) => {

                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    requestRegistInsertDetl: (data, callback) => {
        pool.query(
            `INSERT INTO rm_request_mast_detail (
                req_slno,
                item_slno,
                item_desc,
                item_brand,
                item_unit,
                item_qnty,
                item_specification,
                aprox_cost,
                item_status,
                create_user
               )
               values ?`,
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

    getReqByDeptBase: (id, callBack) => {
        pool.query(
            `  select req_slno,req_date,actual_requirement,location,request_dept_slno,
            needed,request_deptsec_slno,remarks,date(expected_date) as expected_date,total_approx_cost
             from rm_request_master
            where user_deptsec=?`,
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

    getItemListByReqno: (id, callBack) => {
        pool.query(
            `  select req_detl_slno,req_slno,item_slno,item_desc,item_brand,item_unit,
            item_qnty,item_specification,aprox_cost,item_status
                         from rm_request_mast_detail
                        where req_slno=?`,
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
    requestRegistUpdate: (data, callback) => {
        pool.query(
            `UPDATE rm_request_master 
                SET actual_requirement = ?,
                needed = ?,
                request_dept_slno = ?,
                request_deptsec_slno = ?,
                location = ?,
                remarks = ?,
                total_approx_cost = ?, 
                expected_date=?,
                user_deptsec=?,
                edit_user=?         
                WHERE req_slno = ?`,
            [
                data.actual_requirement,
                data.needed,
                data.request_dept_slno,
                data.request_deptsec_slno,
                data.location,
                data.remarks,
                data.total_approx_cost,
                data.expected_date,
                data.user_deptsec,
                data.edit_user,
                data.req_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    requestRegistDetlUpdate: (data, callback) => {
        pool.query(
            `UPDATE rm_request_mast_detail 
            SET req_slno = ?,
            item_slno = ?,
            item_desc = ?,
            item_brand = ?,
            item_unit = ?,
            item_qnty = ?,
            item_specification = ?, 
            aprox_cost=?,
            item_status=?,
            edit_user=?         
            WHERE req_detl_slno =?`,
            [
                data.req_slno,
                data.item_slno,
                data.item_desc,
                data.item_brand,
                data.item_unit,
                data.item_qnty,
                data.item_specification,
                data.aprox_cost,
                data.item_status,
                data.edit_user,
                data.req_detl_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getAuthorization: (id, callBack) => {
        pool.query(
            `select auth_slno,dept_section,auth_post,dept_section_post,emp_id 
            from co_emp_authorization_assign
            where dept_section=?`,
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