const { pool } = require('../../config/database')
module.exports = {

    AmcCmcImageUpdate: (data, callback) => {
        pool.query(
            `UPDATE am_amc_cmc_master SET 
            image_upload=1
            WHERE 
            amccmc_slno=?`,
            [
                data.amccmc_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    BillMstImageUpdate: (data, callback) => {
        pool.query(
            `UPDATE am_bill_master SET 
            am_bill_image=1
            WHERE 
            am_bill_mastslno=?`,
            [
                data.am_bill_mastslno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    GaurenteeWarrentefileUpdate: (data, callback) => {
        pool.query(
            `UPDATE am_item_map_wargrarnt_detail SET 
            file_upload_status=1
            WHERE 
            am_item_wargar_slno=?`,
            [
                data.am_item_wargar_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    LeaseMstImageUpdate: (data, callback) => {
        pool.query(
            `UPDATE am_lease_detail_mast SET 
            lease_image=1
            WHERE 
            am_lease_mastslno=?`,
            [
                data.am_lease_mastslno
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