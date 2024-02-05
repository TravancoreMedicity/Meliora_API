const { pool } = require('../../config/database')
module.exports = {
    requestRegistInsert: (data, callback) => {
        pool.query(
            `INSERT INTO crm_request_master (
                request_dept_slno,
                request_deptsec_slno,
                actual_requirement,
                needed,
                category,
                location,
                expected_date,
                emergency_flag,
                emer_slno,
                emergeny_remarks,
                total_approx_cost,
                create_user               
               )
                VALUES(?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.request_dept_slno,
                data.request_deptsec_slno,
                data.actual_requirement,
                data.needed,
                data.category,
                data.location,
                data.expected_date,
                data.emergency_flag,
                data.emer_slno,
                data.emergeny_remarks,
                data.total_approx_cost,
                data.create_user
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
            `INSERT INTO crm_request_mast_detail (
                req_slno,
                item_slno,
                item_desc,
                item_brand,
                item_unit,
                item_qnty,
                item_specification,
                item_unit_price,
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
    requestApprovalInsert: (data, callback) => {
        pool.query(
            `INSERT INTO crm_request_approval (
                req_slno,
                incharge_req,
                hod_req,
                dms_req,
                ms_approve_req,
                manag_operation_req,
                senior_manage_req,
                gm_approve_req,
                ed_approve_req,
                md_approve_req
                )
                VALUES(?,?,?,?,?,?,?,?,?,?)`,
            [
                data.req_slno,
                data.incharge_req,
                data.hod_req,
                data.dms_req,
                data.ms_approve_req,
                data.manag_operation_req,
                data.senior_manage_req,
                data.gm_approve_req,
                data.ed_approve_req,
                data.md_approve_req
            ],
            (error, results, fields) => {

                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    InHodExist: (id, callBack) => {
        pool.query(
            `select level_one,level_two,co_department_mast.dept_type from co_deptsec_mast
            left join co_department_mast on co_department_mast.dept_id=co_deptsec_mast.dept_id
            where sec_id=? `,
            [id],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },


    getAllReqBasedDept: (id, callBack) => {
        pool.query(
            `select crf_request_master.req_slno,req_date,crf_request_master.actual_requirement,
            crf_request_master.needed,crf_request_master.request_dept_slno,
                        crf_request_master.request_deptsec_slno,crf_request_master.location,remarks,expected_date,rm_ndrf,category,image_status,
                        total_approx_cost,user_deptsec,incharge_req,incharge_approve,req_status,
                        hod_req,hod_approve,hod_remarks,req_approv_slno,manag_operation_approv,emergency,             
                       incharge_req, incharge_approve, incharge_remarks, inch_detial_analysis, incharge_apprv_date,
                        incharge_user,
                       hod_req, hod_approve, hod_remarks, hod_detial_analysis, hod_approve_date, hod_user,
                       dms_req, dms_approve, dms_remarks, dms_detail_analysis, dms_approve_date, dms_user,
                       ms_approve_req, ms_approve, ms_approve_remark, ms_detail_analysis, ms_approve_date, ms_approve_user,
                       manag_operation_req, manag_operation_approv, manag_operation_remarks, om_detial_analysis,
                       om_approv_date,
                       senior_manage_remarks, manag_operation_user, senior_manage_req, senior_manage_approv,
                       smo_detial_analysis, som_aprrov_date, senior_manage_user,
                       cao_approve_req, cao_approve, cao_approve_remarks, ceo_detial_analysis, cao_approv_date, cao_user,
                       ed_approve_req, ed_approve, ed_approve_remarks, ed_detial_analysis, ed_approve_date, ed_user,
                       md_approve_req,md_approve,md_approve_remarks,md_detial_analysis,md_approve_date,
                       crf_close,crf_close_remark,crf_close_user,crf_closed_one,close_date,
                       ndrf_cao_approve,ndrf_cao_approve_remarks,ndrf_ed_approve,ndrf_ed_approve_remarks,
                       ndrf_md_approve,ndrf_md_approve_remarks

                         from crf_request_master
                         left join crf_request_approval on crf_request_approval.req_slno=crf_request_master.req_slno
                          left join crf_ndrf_mast on crf_ndrf_mast.req_slno=crf_request_master.req_slno
                          left join crf_ndrf_approval on crf_ndrf_approval.ndrf_mast_slno=crf_ndrf_mast.ndrf_mast_slno
            where user_deptsec=?  ORDER BY crf_request_master.req_slno DESC`,
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