const { pool } = require('../../config/database')
module.exports = {

    checkDetailInsertOrNot: (id, callBack) => {
        pool.query(
            `SELECT *           
            FROM am_item_map_details
            WHERE am_item_map_slno=?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
    checkDetailInsertOrNotSpare: (id, callBack) => {
        pool.query(
            `SELECT *           
            FROM am_item_map_details
            WHERE am_spare_item_map_slno=?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    callBack(error)
                }
                return callBack(null, results)
            }
        );
    },

    GRNDetailsInsert: (data, callback) => {

        pool.query(
            `INSERT INTO am_item_map_details
          ( 
            am_item_map_slno,
            am_grn_no,
            am_grn_date,
            create_user
          )
          VALUES(?,?,?,?)`,
            [
                data.am_item_map_slno,
                data.am_grn_no,
                data.am_grn_date,
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

    GRNDetailsUpdate: (data, callback) => {
        pool.query(
            `UPDATE am_item_map_details SET 
            am_grn_no=?,
            am_grn_date=?,
            edit_user=?
            WHERE 
            am_item_map_slno=?`,
            [
                data.am_grn_no,
                data.am_grn_date,
                data.edit_user,
                data.am_item_map_slno,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    GRNDetailsInsertSpare: (data, callback) => {

        pool.query(
            `INSERT INTO am_item_map_details
          ( 
            am_spare_item_map_slno,
            am_grn_no,
            am_grn_date,
            create_user
          )
          VALUES(?,?,?,?)`,
            [
                data.am_spare_item_map_slno,
                data.am_grn_no,
                data.am_grn_date,
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

    GRNDetailsUpdateSpare: (data, callback) => {
        pool.query(
            `UPDATE am_item_map_details SET 
            am_grn_no=?,
            am_grn_date=?,
            edit_user=?
            WHERE 
            am_spare_item_map_slno=?`,
            [
                data.am_grn_no,
                data.am_grn_date,
                data.edit_user,
                data.am_spare_item_map_slno,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },


    BillDetailsInsert: (data, callback) => {

        pool.query(
            `INSERT INTO am_item_map_details
          ( 
            am_item_map_slno,
            am_bill_no,
            am_bill_date,
            am_bill_amount,
            am_bill_vendor_detail,
            am_bill_image,
            create_user
          )
          VALUES(?,?,?,?,?,?,?)`,
            [
                data.am_item_map_slno,
                data.am_grn_no,
                data.am_grn_date,
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

    BillDetailsInsert: (data, callback) => {
        pool.query(
            `INSERT INTO am_item_map_details
          (
            am_item_map_slno,
            am_bill_no,
            am_bill_date,
            am_bill_amount,
            am_bill_vendor_detail,
            am_bill_image,
            create_user
          )
          VALUES(?,?,?,?,?,?,?)`,
            [
                data.am_item_map_slno,
                data.am_bill_no,
                data.am_bill_date,
                data.am_bill_amount,
                data.am_bill_vendor_detail,
                data.am_bill_image,
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

    BillDetailsUpdate: (data, callback) => {
        pool.query(
            `UPDATE am_item_map_details SET 
            am_bill_no=?,
            am_bill_date=?,
            am_bill_amount=?,
            am_bill_vendor_detail=?,
            am_bill_image=?,
            edit_user=?
            WHERE 
            am_item_map_slno=?`,
            [
                data.am_bill_no,
                data.am_bill_date,
                data.am_bill_amount,
                data.am_bill_vendor_detail,
                data.am_bill_image,
                data.edit_user,
                data.am_item_map_slno,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    BillDetailsInsertSpare: (data, callback) => {
        pool.query(
            `INSERT INTO am_item_map_details
          (
            am_spare_item_map_slno,
            am_bill_no,
            am_bill_date,
            am_bill_amount,
            am_bill_vendor_detail,
            am_bill_image,
            create_user
          )
          VALUES(?,?,?,?,?,?,?)`,
            [
                data.am_spare_item_map_slno,
                data.am_bill_no,
                data.am_bill_date,
                data.am_bill_amount,
                data.am_bill_vendor_detail,
                data.am_bill_image,
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

    BillDetailsUpdateSpare: (data, callback) => {
        pool.query(
            `UPDATE am_item_map_details SET 
            am_bill_no=?,
            am_bill_date=?,
            am_bill_amount=?,
            am_bill_vendor_detail=?,
            am_bill_image=?,
            edit_user=?
            WHERE 
            am_spare_item_map_slno=?`,
            [
                data.am_bill_no,
                data.am_bill_date,
                data.am_bill_amount,
                data.am_bill_vendor_detail,
                data.am_bill_image,
                data.edit_user,
                data.am_spare_item_map_slno,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },


    CustodianDetailsInsert: (data, callback) => {

        pool.query(
            `INSERT INTO am_item_map_details
          ( 
            am_item_map_slno,
            am_primary_custodian,
            am_secondary_custodian,
            create_user
          )
          VALUES(?,?,?,?)`,
            [
                data.am_item_map_slno,
                data.am_primary_custodian,
                data.am_secondary_custodian,
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
    CustodianDetailsUpdate: (data, callback) => {
        pool.query(
            `UPDATE am_item_map_details SET 
            am_primary_custodian=?,
            am_secondary_custodian=?,
            edit_user=?
            WHERE 
            am_item_map_slno=?`,
            [
                data.am_primary_custodian,
                data.am_secondary_custodian,
                data.edit_user,
                data.am_item_map_slno,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    DeviceDetailsInsert: (data, callback) => {

        pool.query(
            `INSERT INTO am_item_map_details
          ( 
            am_item_map_slno,
            am_manufacture_no,
            am_asset_no,
            am_asset_old_no,
            create_user
          )
          VALUES(?,?,?,?,?)`,
            [
                data.am_item_map_slno,
                data.am_manufacture_no,
                data.am_asset_no,
                data.am_asset_old_no,
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
    DeviceDetailsUpdate: (data, callback) => {
        pool.query(
            `UPDATE am_item_map_details SET 
            am_manufacture_no=?,
            am_asset_no=?,
            am_asset_old_no=?,
            edit_user=?
            WHERE 
            am_item_map_slno=?`,
            [
                data.am_manufacture_no,
                data.am_asset_no,
                data.am_asset_old_no,
                data.edit_user,
                data.am_item_map_slno,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    DeviceDetailsInsertSpare: (data, callback) => {

        pool.query(
            `INSERT INTO am_item_map_details
          ( 
            am_spare_item_map_slno,
            am_manufacture_no,
            am_asset_no,
            am_asset_old_no,
            create_user
          )
          VALUES(?,?,?,?,?)`,
            [
                data.am_spare_item_map_slno,
                data.am_manufacture_no,
                data.am_asset_no,
                data.am_asset_old_no,
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
    DeviceDetailsUpdateSpare: (data, callback) => {
        pool.query(
            `UPDATE am_item_map_details SET 
            am_manufacture_no=?,
            am_asset_no=?,
            am_asset_old_no=?,
            edit_user=?
            WHERE 
            am_spare_item_map_slno=?`,
            [
                data.am_manufacture_no,
                data.am_asset_no,
                data.am_asset_old_no,
                data.edit_user,
                data.am_spare_item_map_slno,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    LeaseDetailsInsert: (data, callback) => {

        pool.query(
            `INSERT INTO am_item_map_details
          ( 
            am_item_map_slno,
            am_lease_status,
            am_lease_from,
            am_lease_to,
            am_lease_amount,
            am_lease_image,
            create_user
          )
          VALUES(?,?,?,?,?,?,?)`,
            [
                data.am_item_map_slno,
                data.am_lease_status,
                data.am_lease_from,
                data.am_lease_to,
                data.am_lease_amount,
                data.am_lease_image,
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
    LeaseDetailsUpdate: (data, callback) => {
        pool.query(
            `UPDATE am_item_map_details SET
            am_lease_status=?,
            am_lease_from=?,
            am_lease_to=?,
            am_lease_amount=?,
            am_lease_image=?,
            edit_user=?
            WHERE 
            am_item_map_slno=?`,
            [
                data.am_lease_status,
                data.am_lease_from,
                data.am_lease_to,
                data.am_lease_amount,
                data.am_lease_image,
                data.edit_user,
                data.am_item_map_slno,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    LeaseDetailsInsertSpare: (data, callback) => {

        pool.query(
            `INSERT INTO am_item_map_details
          ( 
            am_spare_item_map_slno,
            am_lease_status,
            am_lease_from,
            am_lease_to,
            am_lease_amount,
            am_lease_image,
            create_user
          )
          VALUES(?,?,?,?,?,?,?)`,
            [
                data.am_spare_item_map_slno,
                data.am_lease_status,
                data.am_lease_from,
                data.am_lease_to,
                data.am_lease_amount,
                data.am_lease_image,
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
    LeaseDetailsUpdateSpare: (data, callback) => {
        pool.query(
            `UPDATE am_item_map_details SET
            am_lease_status=?,
            am_lease_from=?,
            am_lease_to=?,
            am_lease_amount=?,
            am_lease_image=?,
            edit_user=?
            WHERE 
            am_spare_item_map_slno=?`,
            [
                data.am_lease_status,
                data.am_lease_from,
                data.am_lease_to,
                data.am_lease_amount,
                data.am_lease_image,
                data.edit_user,
                data.am_spare_item_map_slno,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    WarentGarantInsertOrNot: (id, callBack) => {
        pool.query(
            `SELECT *           
            FROM am_item_map_wargrarnt_detail
            WHERE am_item_map_slno=?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    callBack(error)
                }
                return callBack(null, results)
            }
        );
    },

    WarentGarantInsertOrNotSpare: (id, callBack) => {
        pool.query(
            `SELECT *           
            FROM am_item_map_wargrarnt_detail
            WHERE am_spare_item_map_slno=?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    callBack(error)
                }
                return callBack(null, results)
            }
        );
    },

    WarentGraruntyInsert: (data, callback) => {

        pool.query(
            `INSERT INTO am_item_map_wargrarnt_detail
          ( 
            am_item_map_slno,
            warrenty_status,
            guarenty_status,
            from_date,
            to_date,
            troll_free,
            ph_one,
            ph_two,
            address,
            file_upload_status,
            create_user
          )
          VALUES(?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.am_item_map_slno,
                data.warrenty_status,
                data.guarenty_status,
                data.from_date,
                data.to_date,
                data.troll_free,
                data.ph_one,
                data.ph_two,
                data.address,
                data.file_upload_status,
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
    WarentGraruntyUpdate: (data, callback) => {

        pool.query(
            `UPDATE am_item_map_wargrarnt_detail SET 
            warrenty_status=?,
            guarenty_status=?,
            from_date=?,
            to_date=?,
            troll_free=?,
            ph_one=?,
            ph_two=?,
            address=?,
            file_upload_status=?,
            edit_user=?
            WHERE 
            am_item_map_slno=?`,
            [
                data.warrenty_status,
                data.guarenty_status,
                data.from_date,
                data.to_date,
                data.troll_free,
                data.ph_one,
                data.ph_two,
                data.address,
                data.file_upload_status,
                data.edit_user,
                data.am_item_map_slno,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    WarentGraruntyInsertSpare: (data, callback) => {

        pool.query(
            `INSERT INTO am_item_map_wargrarnt_detail
          ( 
            am_spare_item_map_slno,
            warrenty_status,
            guarenty_status,
            from_date,
            to_date,
            troll_free,
            ph_one,
            ph_two,
            address,
            file_upload_status,
            create_user
          )
          VALUES(?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.am_spare_item_map_slno,
                data.warrenty_status,
                data.guarenty_status,
                data.from_date,
                data.to_date,
                data.troll_free,
                data.ph_one,
                data.ph_two,
                data.address,
                data.file_upload_status,
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
    WarentGraruntyUpdateSpare: (data, callback) => {

        pool.query(
            `UPDATE am_item_map_wargrarnt_detail SET 
            warrenty_status=?,
            guarenty_status=?,
            from_date=?,
            to_date=?,
            troll_free=?,
            ph_one=?,
            ph_two=?,
            address=?,
            file_upload_status=?,
            edit_user=?
            WHERE 
            am_spare_item_map_slno=?`,
            [
                data.warrenty_status,
                data.guarenty_status,
                data.from_date,
                data.to_date,
                data.troll_free,
                data.ph_one,
                data.ph_two,
                data.address,
                data.file_upload_status,
                data.edit_user,
                data.am_spare_item_map_slno,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },


    AmcPmInsertOrNot: (id, callBack) => {
        pool.query(
            `SELECT *           
            FROM am_item_map_amcpm_detail
            WHERE am_item_map_slno=?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    callBack(error)
                }
                return callBack(null, results)
            }
        );
    },


    AmcPmInsertOrNotSpare: (id, callBack) => {
        pool.query(
            `SELECT *           
            FROM am_item_map_amcpm_detail
            WHERE am_spare_item_map_slno=?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
    AmcPmInsert: (data, callback) => {

        pool.query(
            `INSERT INTO am_item_map_amcpm_detail
          ( 
            am_item_map_slno,
            amc_status,
            cmc_status,
            amc_from,
            amc_to,
            contact_address,
            amc_file_status,
            instalation_date,
            due_date,
            pm_status,
            create_user
          )
          VALUES(?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.am_item_map_slno,
                data.amc_status,
                data.cmc_status,
                data.amc_from,
                data.amc_to,
                data.contact_address,
                data.amc_file_status,
                data.instalation_date,
                data.due_date,
                data.pm_status,
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
    AmcPmUpdate: (data, callback) => {
        pool.query(
            `UPDATE am_item_map_amcpm_detail SET 
            amc_status=?,
            cmc_status=?,
            amc_from=?,
            amc_to=?,
            contact_address=?,
            amc_file_status=?,
            instalation_date=?,
            due_date=?,
            pm_status=?,
            edit_user=?
            WHERE 
            am_item_map_slno=?`,
            [
                data.amc_status,
                data.cmc_status,
                data.amc_from,
                data.amc_to,
                data.contact_address,
                data.amc_file_status,
                data.instalation_date,
                data.due_date,
                data.pm_status,
                data.edit_user,
                data.am_item_map_slno,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    AmcPmInsertSpare: (data, callback) => {

        pool.query(
            `INSERT INTO am_item_map_amcpm_detail
          ( 
            am_spare_item_map_slno,
            amc_status,
            cmc_status,
            amc_from,
            amc_to,
            contact_address,
            amc_file_status,
            instalation_date,
            due_date,
            pm_status,
            create_user
          )
          VALUES(?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.am_spare_item_map_slno,
                data.amc_status,
                data.cmc_status,
                data.amc_from,
                data.amc_to,
                data.contact_address,
                data.amc_file_status,
                data.instalation_date,
                data.due_date,
                data.pm_status,
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
    AmcPmUpdateSpare: (data, callback) => {
        pool.query(
            `UPDATE am_item_map_amcpm_detail SET 
            amc_status=?,
            cmc_status=?,
            amc_from=?,
            amc_to=?,
            contact_address=?,
            amc_file_status=?,
            instalation_date=?,
            due_date=?,
            pm_status=?,
            edit_user=?
            WHERE 
            am_spare_item_map_slno=?`,
            [
                data.amc_status,
                data.cmc_status,
                data.amc_from,
                data.amc_to,
                data.contact_address,
                data.amc_file_status,
                data.instalation_date,
                data.due_date,
                data.pm_status,
                data.edit_user,
                data.am_spare_item_map_slno,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    getdeptsecBsedonCustdept: (id, callBack) => {
        pool.query(
            `select
            P.sec_name as prim_cus,
            S.sec_name as second_cus            
            from am_item_map_details
            left join co_deptsec_mast P on P.sec_id=am_item_map_details.am_primary_custodian
            left join  co_deptsec_mast S on S.sec_id=am_item_map_details.am_secondary_custodian
            where am_item_map_slno=?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    callBack(error)
                }
                return callBack(null, results)
            }
        );
    },

    getdeptsecBsedonCustdeptSpare: (id, callBack) => {
        pool.query(
            `select
            P.sec_name as prim_cus,
            S.sec_name as second_cus            
            from am_item_map_details
            left join co_deptsec_mast P on P.sec_id=am_item_map_details.am_primary_custodian
            left join  co_deptsec_mast S on S.sec_id=am_item_map_details.am_secondary_custodian
            where am_spare_item_map_slno=?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    callBack(error)
                }
                return callBack(null, results)
            }
        );
    },

    SpecificationInsertOrNot: (id, callBack) => {
        pool.query(
            `SELECT *           
            FROM am_item_specification_detail
            WHERE am_item_map_slno=? and status=1`,
            [id],
            (error, results, fields) => {
                if (error) {
                    callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
    SpecificationInsert: (data, callBack) => {
        pool.query(
            `INSERT INTO am_item_specification_detail
            (
                am_item_map_slno,
                specifications,
                status,
                create_user
               
            ) 
            VALUES ?`,
            [
                data
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    SepcifiDelete: (data, callback) => {
        pool.query(
            `UPDATE am_item_specification_detail 
                SET status = 0,
                delete_user=?  
                WHERE am_sec_detal_slno =?`,
            [
                data.delete_user,
                data.am_sec_detal_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
}