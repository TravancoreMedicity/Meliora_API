const { pool } = require('../../config/database')
module.exports = {

    CrfImageStatusUpdate: (data, callback) => {
        pool.query(
            `UPDATE crm_request_master SET 
            image_status=1
            WHERE 
            req_slno=?`,
            [
                data.req_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    CrfDataColectionImageStatusUpdate: (data, callback) => {
        pool.query(
            `UPDATE crm_data_collection SET 
            data_coll_image_status=1
            WHERE 
            crf_data_collect_slno=?`,
            [
                data.crf_data_collect_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    ImageInsertHODStatusUpdate: (data, callback) => {
        pool.query(
            `UPDATE crm_request_approval SET 
            hod_image=1
            WHERE 
            req_slno=?`,
            [
                data.req_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    ImageInsertDMSStatusUpdate: (data, callback) => {
        pool.query(
            `UPDATE crm_request_approval SET 
            dms_image=1
            WHERE 
            req_slno=?`,
            [
                data.req_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    ImageInsertMSStatusUpdate: (data, callback) => {
        pool.query(
            `UPDATE crm_request_approval SET 
            ms_image=1
            WHERE 
            req_slno=?`,
            [
                data.req_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    ImageInsertMOStatusUpdate: (data, callback) => {
        pool.query(
            `UPDATE crm_request_approval SET 
            mo_image=1
            WHERE 
            req_slno=?`,
            [
                data.req_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    ImageInsertSMOStatusUpdate: (data, callback) => {
        pool.query(
            `UPDATE crm_request_approval SET 
            smo_image=1
            WHERE 
            req_slno=?`,
            [
                data.req_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    ImageInsertGMStatusUpdate: (data, callback) => {
        pool.query(
            `UPDATE crm_request_approval SET 
            gm_image=1
            WHERE 
            req_slno=?`,
            [
                data.req_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    ImageInsertMDStatusUpdate: (data, callback) => {
        pool.query(
            `UPDATE crm_request_approval SET 
            md_image=1
            WHERE 
            req_slno=?`,
            [
                data.req_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    ImageInsertEDStatusUpdate: (data, callback) => {
        pool.query(
            `UPDATE crm_request_approval SET 
            ed_image=1
            WHERE 
            req_slno=?`,
            [
                data.req_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    ImageInsertMAangeStatusUpdate: (data, callback) => {
        pool.query(
            `UPDATE
                   crm_request_approval
             SET
                    managing_director_image=1
             WHERE 
                    req_slno=?`,
            [
                data.req_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
}