const { pool } = require('../../config/database')
module.exports = {

    checkDetailInsertOrNot: (id, callBack) => {
        pool.query(
            `select am_item_map_detl_slno, am_item_map_details.am_item_map_slno, am_spare_item_map_slno,
            am_grn_no, am_grn_date, am_bill_mast_slno, am_primary_custodian, am_secondary_custodian,
            am_manufacture_no, am_asset_no, am_asset_old_no, am_lease_status, am_lease_from, am_lease_to,
            am_lease_amount, am_lease_image, am_bill_mastslno, am_bill_master.am_bill_no,
            am_bill_master.am_bill_date, am_item_map_details.am_bill_amount,am_bill_master.am_bill_image,
            am_bill_supplier,B.it_supplier_name as bill_supplier_name,am_lease_mast_slno,
            L.it_supplier_name as lease_suppliername,am_asset_item_map_master.item_rack_slno as rack,
            am_lease_mastslno, lease_suppler_slno, lease_fromdate, lease_todate, lease_amount, lease_status, lease_image
            FROM am_item_map_details
            left join am_bill_master on am_bill_master.am_bill_mastslno =am_item_map_details.am_bill_mast_slno
            left join am_lease_detail_mast on am_lease_detail_mast.am_lease_mastslno=am_item_map_details.am_lease_mast_slno
             left join it_bill_supplier_details_mast B  on B.it_supplier_slno=am_bill_master.am_bill_supplier
             left join it_bill_supplier_details_mast L on L.it_supplier_slno=am_lease_detail_mast.lease_suppler_slno
             left join am_asset_item_map_master on am_asset_item_map_master.am_item_map_slno =am_item_map_details.am_item_map_slno
            WHERE am_item_map_details.am_item_map_slno=?`,
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
            `select am_item_map_detl_slno, am_item_map_slno, am_item_map_details.am_spare_item_map_slno,
            am_grn_no, am_grn_date, am_bill_mast_slno, am_primary_custodian, am_secondary_custodian,
            am_manufacture_no, am_asset_no, am_asset_old_no, am_lease_status, am_lease_from, am_lease_to,
            am_lease_amount, am_lease_image, am_bill_mastslno, am_bill_master.am_bill_no,
            am_bill_master.am_bill_date, am_item_map_details.am_bill_amount,am_bill_master.am_bill_image,
            am_bill_supplier,B.it_supplier_name as bill_supplier_name,am_lease_mast_slno,
            L.it_supplier_name as lease_suppliername,S.spare_rack_slno as rack,
            am_lease_mastslno, lease_suppler_slno, lease_fromdate, lease_todate, lease_amount, lease_status, lease_image
            FROM am_item_map_details
            left join am_bill_master on am_bill_master.am_bill_mastslno =am_item_map_details.am_bill_mast_slno
            left join am_lease_detail_mast on am_lease_detail_mast.am_lease_mastslno=am_item_map_details.am_lease_mast_slno
             left join it_bill_supplier_details_mast B  on B.it_supplier_slno=am_bill_master.am_bill_supplier
             left join it_bill_supplier_details_mast L on L.it_supplier_slno=am_lease_detail_mast.lease_suppler_slno
             left join am_spare_item_map_master S on S.am_spare_item_map_slno=am_item_map_details.am_spare_item_map_slno
            WHERE am_item_map_details.am_spare_item_map_slno=?`,
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
            am_bill_mast_slno=?,
            am_bill_amount=?,        
            edit_user=?
            WHERE 
            am_item_map_slno=?`,
            [
                data.am_bill_mast_slno,
                data.am_bill_amount,
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
            am_bill_mast_slno=?,
            am_bill_amount=?,
            edit_user=?
            WHERE 
            am_spare_item_map_slno=?`,
            [
                data.am_bill_mast_slno,
                data.am_bill_amount,
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
        console.log("data to check custody:", data);


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
    DeviceRackUpdateAsset: (data, callback) => {
        pool.query(
            `UPDATE am_asset_item_map_master SET 
            item_rack_slno=?,
            edit_user=?
             WHERE 
            am_item_map_slno=?`,
            [
                data.item_rack_slno,
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
    DeviceRackUpdateSpare: (data, callback) => {
        pool.query(
            `UPDATE am_spare_item_map_master SET 
            spare_rack_slno=?,
             edit_user=?
             WHERE 
            am_spare_item_map_slno=?`,
            [
                data.spare_rack_slno,
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
            `SELECT am_item_amcpm_slno, am_item_map_slno, am_item_map_amcpm_detail.amc_status, am_item_map_amcpm_detail.cmc_status, 
            pm_status, 
          instalation_date, due_date,  amc_slno ,
           am_amc_cmc_master.amc_status as amc,
            am_amc_cmc_master.cmc_status as cmc, from_date, to_date,image_upload,
            it_supplier_name
            FROM am_item_map_amcpm_detail
            left join am_amc_cmc_master on am_amc_cmc_master.amccmc_slno=am_item_map_amcpm_detail.amc_slno
            left join it_bill_supplier_details_mast on it_bill_supplier_details_mast.it_supplier_slno=am_amc_cmc_master.suplier_slno
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


    AmcPmInsert: (data, callback) => {

        pool.query(
            `INSERT INTO am_item_map_amcpm_detail
          ( 
            am_item_map_slno,
            amc_status,
            cmc_status,
           instalation_date,
            due_date,
            pm_status,
            amc_slno,
            create_user
          )
          VALUES(?,?,?,?,?,?,?,?)`,
            [
                data.am_item_map_slno,
                data.amc_status,
                data.cmc_status,
                data.instalation_date,
                data.due_date,
                data.pm_status,
                data.amc_slno,
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
            instalation_date=?,
            due_date=?,
            pm_status=?,
            amc_slno=?,
            edit_user=?
            WHERE 
            am_item_map_slno=?`,
            [
                data.amc_status,
                data.cmc_status,
                data.instalation_date,
                data.due_date,
                data.pm_status,
                data.amc_slno,
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


    GetFreespareList: (data, callBack) => {
        pool.query(
            `select am_spare_item_map_slno, am_item_name_creation.item_name,
            spare_asset_no,spare_asset_no_only
            from am_spare_item_map_master
            left join am_item_name_creation on am_item_name_creation.item_creation_slno=am_spare_item_map_master.spare_creation_slno
            where spare_custodian_dept=?  and
               am_spare_item_map_slno not in
               (select am_spare_item_map_slno from am_asset_spare_details where spare_status=1 )
               and spare_condamtn=0 and spare_service=0`,
            [
                data.spare_custodian_dept
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    SpareDetailsInsert: (data, callBack) => {
        pool.query(
            `INSERT INTO am_asset_spare_details
            (
                am_item_map_slno,
                am_spare_item_map_slno,
                spare_status,
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

    SpareDetailsInsertOrNot: (id, callBack) => {
        pool.query(
            `SELECT asset_spare_slno,am_item_map_slno,am_asset_spare_details.am_spare_item_map_slno,am_item_name_creation.item_name,
            spare_asset_no,spare_asset_no_only
                        FROM am_asset_spare_details
                        left join am_spare_item_map_master on am_spare_item_map_master.am_spare_item_map_slno=am_asset_spare_details.am_spare_item_map_slno
                        left join am_item_name_creation on am_item_name_creation.item_creation_slno=am_spare_item_map_master.spare_creation_slno
            WHERE am_item_map_slno=? and spare_status=1`,
            [id],
            (error, results, fields) => {
                if (error) {
                    callBack(error)
                }
                return callBack(null, results)
            }
        );
    },


    SpareDelete: (data, callback) => {
        pool.query(
            `UPDATE am_asset_spare_details 
                SET spare_status = 2,
                delete_user=?  
                WHERE asset_spare_slno =?`,
            [
                data.delete_user,
                data.asset_spare_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    AmcCMCInsert: (data, callback) => {

        pool.query(
            `INSERT INTO am_amc_cmc_master
          ( 
            suplier_slno,
            amc_status,
            cmc_status,
            from_date,
            to_date,
            amccmc_status,
            create_user
          )
          VALUES(?,?,?,?,?,?,?)`,
            [
                data.suplier_slno,
                data.amc_status,
                data.cmc_status,
                data.from_date,
                data.to_date,
                data.amccmc_status,
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
    AmcCmcview: (callback) => {
        pool.query(
            `SELECT
            amccmc_slno,suplier_slno,amc_status,
            cmc_status,from_date,to_date,
            if(amc_status=1,'AMC','CMC')status,image_upload,
            amccmc_status,it_supplier_name
            FROM            
            am_amc_cmc_master
            left join it_bill_supplier_details_mast on it_bill_supplier_details_mast.it_supplier_slno=am_amc_cmc_master.suplier_slno`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },
    AmcCmcUpdate: (data, callback) => {
        pool.query(

            `UPDATE am_amc_cmc_master SET 
            suplier_slno=?,
            amc_status=?,
            cmc_status=?,
            from_date= ?,
            to_date=?,
            edit_user=?,
            amccmc_status=?
            WHERE 
            amccmc_slno=?`,

            [

                data.suplier_slno,
                data.amc_status,
                data.cmc_status,
                data.from_date,
                data.to_date,
                data.edit_user,
                data.amccmc_status,
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
    AmcCmcviewSelect: (callback) => {
        pool.query(
            `SELECT
            amccmc_slno,contact_address
            FROM
            am_amc_cmc_master`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },

    BillMasterInsert: (data, callback) => {

        pool.query(
            `INSERT INTO am_bill_master
          ( 
            am_bill_no,
            am_bill_date,
            am_bill_supplier,           
            create_user
          )
          VALUES(?,?,?,?)`,
            [
                data.am_bill_no,
                data.am_bill_date,
                data.am_bill_supplier,
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
    BillMasterview: (callback) => {
        pool.query(
            `SELECT
            am_bill_mastslno,am_bill_no,am_bill_date,
            am_bill_image,it_supplier_name,
            am_bill_supplier
            FROM
            am_bill_master
            left join it_bill_supplier_details_mast on it_bill_supplier_details_mast.it_supplier_slno=am_bill_master.am_bill_supplier`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    BillMasterUpdate: (data, callback) => {
        pool.query(

            `UPDATE am_bill_master SET 
            am_bill_no=?,
            am_bill_date=?,
             am_bill_supplier= ?,
            edit_user=?
            WHERE 
            am_bill_mastslno=?`,
            [
                data.am_bill_no,
                data.am_bill_date,
                data.am_bill_supplier,
                data.edit_user,
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
    BillMasterviewSelect: (callback) => {
        pool.query(
            `SELECT
            am_bill_mastslno,am_bill_no
            FROM
            am_bill_master`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },

    GetBillMasterById: (id, callBack) => {
        pool.query(
            `SELECT *           
            FROM am_bill_master
            WHERE am_bill_mastslno=?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
    GetAmcCmcMasterById: (id, callBack) => {
        pool.query(
            `SELECT *           
            FROM am_amc_cmc_master
            WHERE amccmc_slno=?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
    GetSupplierSelect: (callback) => {
        pool.query(
            `SELECT
            it_supplier_slno,it_supplier_name
            FROM
            it_bill_supplier_details_mast where supplier_status=1
            order by it_supplier_name ASC
            `, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    GetBillBySupplNDate: (data, callBack) => {
        pool.query(
            `select am_bill_mastslno, am_bill_no, am_bill_date, 
            am_bill_image, am_bill_supplier,it_supplier_name         
            from am_bill_master
            left join it_bill_supplier_details_mast on it_bill_supplier_details_mast.it_supplier_slno=am_bill_master.am_bill_supplier
            where am_bill_supplier=? and am_bill_date>=?`,
            [
                data.am_bill_supplier,
                data.am_bill_date
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    SupplierAdding: (data, callback) => {

        pool.query(
            `INSERT INTO it_bill_supplier_details_mast
          ( 
            it_supplier_name,
            it_supplier_land_one,
            it_supplier_mob_one,
            it_supplier_email_one,
            it_supplier_escl_mob_one,
            it_supplier_escl_land_one,
            supplier_status,
            create_user
          )
          VALUES(?,?,?,?,?,?,?,?)`,
            [
                data.it_supplier_name,
                data.it_supplier_land_one,
                data.it_supplier_mob_one,
                data.it_supplier_email_one,
                data.it_supplier_escl_mob_one,
                data.it_supplier_escl_land_one,
                data.supplier_status,
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

    GetAMCBySupplNDate: (data, callBack) => {
        pool.query(
            `select amccmc_slno, suplier_slno, amc_status, cmc_status, from_date,
            to_date, amccmc_status, image_upload,it_supplier_name
            from am_amc_cmc_master
             left join it_bill_supplier_details_mast on it_bill_supplier_details_mast.it_supplier_slno=am_amc_cmc_master.suplier_slno
             where amc_status=1 and suplier_slno=? and from_date>=?`,
            [
                data.suplier_slno,
                data.from_date
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    GetCMCBySupplNDate: (data, callBack) => {
        pool.query(
            `select amccmc_slno, suplier_slno, amc_status, cmc_status, from_date,
            to_date, amccmc_status, image_upload,it_supplier_name
            from am_amc_cmc_master
             left join it_bill_supplier_details_mast on it_bill_supplier_details_mast.it_supplier_slno=am_amc_cmc_master.suplier_slno
             where cmc_status=1 and suplier_slno=? and from_date>=?`,
            [
                data.suplier_slno,
                data.from_date
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    LeaseMasterInsert: (data, callback) => {

        pool.query(
            `INSERT INTO am_lease_detail_mast
          ( 
            lease_suppler_slno,
            lease_fromdate,
            lease_todate,
            lease_amount,
            lease_status,           
            create_user
          )
          VALUES(?,?,?,?,?,?)`,
            [
                data.lease_suppler_slno,
                data.lease_fromdate,
                data.lease_todate,
                data.lease_amount,
                data.lease_status,
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
    LeaseMasterview: (callback) => {
        pool.query(
            `SELECT
            am_lease_mastslno, lease_suppler_slno, lease_fromdate,
            lease_todate, lease_amount, lease_image,lease_status,
            if(lease_status=1,'Yes','No')status,lease_image,      
            it_supplier_name
            FROM
            am_lease_detail_mast
            left join it_bill_supplier_details_mast on it_bill_supplier_details_mast.it_supplier_slno=am_lease_detail_mast.lease_suppler_slno`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    leaseMasterUpdate: (data, callback) => {
        pool.query(

            `UPDATE am_lease_detail_mast SET 
            lease_suppler_slno=?,
            lease_fromdate=?,
            lease_todate=?,
            lease_amount= ?,
            lease_status=?,
            edit_user=?
            WHERE 
            am_lease_mastslno=?`,
            [
                data.lease_suppler_slno,
                data.lease_fromdate,
                data.lease_todate,
                data.lease_amount,
                data.lease_status,
                data.edit_user,
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

    GetLeaseBySupplNDate: (data, callBack) => {
        pool.query(
            `select am_lease_mastslno, lease_suppler_slno, lease_fromdate, lease_todate,
            lease_amount, lease_image,it_supplier_name
              from am_lease_detail_mast
            left join it_bill_supplier_details_mast on it_bill_supplier_details_mast.it_supplier_slno=am_lease_detail_mast.lease_suppler_slno
            where lease_suppler_slno=? and lease_fromdate>=?`,
            [
                data.lease_suppler_slno,
                data.lease_fromdate
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    AMLeaseDetailsUpdate: (data, callback) => {
        pool.query(
            `UPDATE am_item_map_details SET
            am_lease_mast_slno=?,
             edit_user=?
            WHERE 
            am_item_map_detl_slno=?`,
            [
                data.am_lease_mast_slno,
                data.edit_user,
                data.am_item_map_detl_slno,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    spareContamination: (data, callback) => {
        pool.query(
            `UPDATE am_spare_item_map_master SET
            spare_condamtn=1,
            spare_service=2
                       WHERE 
                       am_spare_item_map_slno=?`,
            [
                data.am_spare_item_map_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    spareService: (data, callback) => {
        pool.query(
            `UPDATE am_spare_item_map_master SET
            spare_service=1
            WHERE 
            am_spare_item_map_slno=?`,
            [
                data.am_spare_item_map_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    AssetService: (data, callback) => {

        pool.query(
            `UPDATE am_asset_item_map_master SET
            asset_item_service=1,
            asset_item_service_user=?,
            item_dept_slno=?,
            item_deptsec_slno=?
            WHERE 
            am_item_map_slno=?`,
            [
                data.asset_item_service_user,
                data.item_dept_slno,
                data.item_deptsec_slno,
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

}