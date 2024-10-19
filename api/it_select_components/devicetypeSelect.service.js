const { pool } = require('../../config/database')
module.exports = {

    getDeviceType: (callback) => {
        pool.query(
            `SELECT 
            device_type_slno,
            device_type_name
            FROM
            meliora.it_communication_device_type
            WHERE device_type_status=1`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },
    getDeviceTypePassword: (callback) => {
        pool.query(
            `SELECT 
            device_type_slno,
            device_type_name
            FROM
            meliora.it_password_device_type
            WHERE device_type_status=1`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },
    getPasswordCredential: (callback) => {
        pool.query(
            `SELECT 
            credential_slno,
            credential_name
            FROM
            meliora.it_passwrd_credential_type
            WHERE credential_status=1`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },

    getSimType: (callback) => {
        pool.query(
            `SELECT 
            it_sim_type_slno,
            it_sim_type_name
            FROM
            meliora.it_sim_type_master
            WHERE it_sim_type_status=1`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },
    getBillType: (callback) => {
        pool.query(
            `SELECT 
            it_bill_type_slno,
            it_bill_type_name
            FROM
            meliora.it_bill_type_mast
            WHERE it_bill_type_status=1`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },
    getBillCategory: (callback) => {
        pool.query(
            `SELECT 
            it_bill_category_slno,
            it_bill_category_name
            FROM
            meliora.it_bill_category_mast
            WHERE it_bill_category_status=1`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },
    getSupplierList: (callback) => {
        pool.query(
            `SELECT 
            it_supplier_slno,
            it_supplier_name
            FROM
            meliora.it_bill_supplier_details_mast`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },
    getSupplierData: (id, callBack) => {
        pool.query(
            `SELECT 
            *
            FROM
            meliora.it_bill_supplier_details_mast
            Where it_supplier_slno=?`,
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