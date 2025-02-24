const { pool } = require('../../config/database')
module.exports = {

    BillInsert: (data, callback) => {
        pool.query(
            `INSERT INTO it_bill_add
            (            
                bill_category,
                bill_tariff,
                bill_name,
                bill_cug_status,
                bill_cug_simtype,
                create_user           
            )
            VALUES (?,?,?,?,?,?)`,
            [
                data.bill_category,
                data.bill_tariff,
                data.bill_name,
                data.bill_cug_status,
                data.bill_cug_simtype,
                data.create_user,
            ],

            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);


            }
        );
    },
    AllBillView: (callback) => {
        pool.query(
            ` SELECT 
            bill_add_slno,
            bill_category,
            bill_tariff,
            bill_name,
            bill_cug_status,
            it_sim_type_name,
            it_bill_category_name,
            it_bill_type_name,          
            bill_cug_simtype             
            FROM meliora.it_bill_add
            left join it_bill_category_mast on it_bill_category_mast.it_bill_category_slno=it_bill_add.bill_category
            left join it_bill_type_mast on it_bill_type_mast.it_bill_type_slno=it_bill_category_mast.it_bill_type_slno
            left join it_sim_type_master on it_sim_type_master.it_sim_type_slno=it_bill_add.bill_cug_simtype
            where bill_active_status=1   `
            , [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    UpdateBill: (data, callback) => {
        pool.query(
            `UPDATE it_bill_add SET                 
            bill_category=?,
            bill_tariff=?,
            bill_name=?,
            bill_cug_status=?,
            bill_cug_simtype=?,
            bill_active_status=?
 			WHERE 
             bill_add_slno=?`,
            [
                data.bill_category,
                data.bill_tariff,
                data.bill_name,
                data.bill_cug_status,
                data.bill_cug_simtype,
                data.bill_active_status,
                data.bill_add_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    MonthlyTarrifInsert: (data, callBack) => {
        pool.query(
            `
            INSERT INTO it_bill_monthly_tariff
            (
                bill_add_slno,               
                monthly_bill_generate,
                create_user
            ) 
            VALUES ?`,
            [data],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    MonthlyTarrifView: (callback) => {
        pool.query(
            `SELECT
            bill_add_slno,
            bill_name,
            bill_category,
            bill_tariff 
            FROM
            it_bill_add
            left join it_bill_category_mast on it_bill_category_mast.it_bill_category_slno=it_bill_add.bill_category
            where bill_tariff=1 and bill_active_status=1 `, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );

    },
    OtherBillinsert: (data, callback) => {
        pool.query(
            `INSERT INTO it_other_bills
            (            
                bill_category,
                bill_name,
                bill_amount,
                bill_number,
                bill_date,
                bill_due_date,
                bill_paid_date,
                payed_status,
                bill_description,
                am_item_map_slno,
                supplier_details,
                create_user           
            )
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.bill_category,
                data.bill_name,
                data.bill_amount,
                data.bill_number,
                data.bill_date,
                data.bill_due_date,
                data.bill_paid_date,
                data.payed_status,
                data.bill_description,
                data.am_item_map_slno,
                data.supplier_details,
                data.create_user,
            ],

            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results)
            }
        );
    },

    OtherBillView: (callback) => {
        pool.query(
            `SELECT 
            other_bill_slno,
            bill_category,
            it_bill_category_name,
            am_item_map_slno,      
            bill_name,
            bill_amount,
            bill_number,
            file_upload_status,
            bill_date,
            bill_due_date,
            bill_paid_date,
            supplier_details,
            it_supplier_name,
            payed_status,            
            bill_description
            FROM meliora.it_other_bills
            left join it_bill_category_mast on it_bill_category_mast.it_bill_category_slno=it_other_bills.bill_category
            left join it_bill_supplier_details_mast on it_bill_supplier_details_mast.it_supplier_slno=it_other_bills.supplier_details`
            , [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    UpdateOtherBill: (data, callback) => {
        pool.query(
            `UPDATE it_other_bills SET                 
            bill_category=?,
            bill_name=?,
            bill_amount=?,
            bill_number=?,
            bill_date=?,
            bill_due_date=?,
            bill_paid_date=?,
            payed_status=?,
            bill_description=?,
            am_item_map_slno=?,
            supplier_details=?,
            edit_user=?
 			WHERE 
             other_bill_slno=?`,
            [
                data.bill_category,
                data.bill_name,
                data.bill_amount,
                data.bill_number,
                data.bill_date,
                data.bill_due_date,
                data.bill_paid_date,
                data.payed_status,
                data.bill_description,
                data.am_item_map_slno,
                data.supplier_details,
                data.edit_user,
                data.other_bill_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    QuaterlyTarrifView: (callback) => {
        pool.query(
            `SELECT
            bill_add_slno,
            bill_name,bill_category     
            FROM
            it_bill_add
            left join it_bill_category_mast on it_bill_category_mast.it_bill_category_slno=it_bill_add.bill_category
             where bill_tariff=2 and bill_active_status=1`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    QuaterlyTarrifInsert: (data, callBack) => {
        pool.query(
            `
            INSERT INTO it_quaterly_tarrif_details
            (
                bill_add_slno,               
                quaterly_bill_generate,
                create_user
            ) 
            VALUES ?`,
            [data],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    YearlyTarrifView: (callback) => {
        pool.query(
            `SELECT
            bill_add_slno,
            bill_name,
            bill_category
            FROM
            it_bill_add
            left join it_bill_category_mast on it_bill_category_mast.it_bill_category_slno = it_bill_add.bill_category
             where bill_tariff = 3 and bill_active_status=1`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    YearlyTarrifInsert: (data, callBack) => {
        pool.query(
            `INSERT INTO it_yearly_tarrif_details
            (
                bill_add_slno,               
                yearly_bill_generate,
                create_user
            ) 
            VALUES ?`,
            [data],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    BillMonthlyUpdate: (data, callback) => {
        pool.query(
            `UPDATE it_bill_monthly_tariff SET                       
            bill_amount=?,
            bill_date=?,
            bill_paid_date=?,            
            payed_status=?,
            bill_number=?,            
            bill_due_date=?,
            edit_user=?            
            WHERE 
            monthly_slno=?`,
            [
                data.bill_amount,
                data.bill_date,
                data.bill_paid_date,
                data.payed_status,
                data.bill_number,
                data.bill_due_date,
                data.edit_user,
                data.monthly_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )

    },

    BillQuaterlyUpdate: (data, callback) => {
        pool.query(
            `UPDATE it_quaterly_tarrif_details SET                       
            bill_amount=?,
            bill_date=?,
            bill_paid_date=?,            
            payed_status=?,
            bill_number=?,            
            bill_due_date=?,
            edit_user=?           
            WHERE 
            quaterly_slno=?`,
            [
                data.bill_amount,
                data.bill_date,
                data.bill_paid_date,
                data.payed_status,
                data.bill_number,
                data.bill_due_date,
                data.edit_user,
                data.quaterly_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )

    },
    BillYearlyUpdate: (data, callback) => {
        pool.query(
            `UPDATE it_yearly_tarrif_details SET                       
            bill_amount=?,
            bill_date=?,
            bill_paid_date=?,           
            payed_status=?,
            bill_number=?,            
            bill_due_date=?,
            edit_user=?           
            WHERE 
            yearly_slno=?`,
            [
                data.bill_amount,
                data.bill_date,
                data.bill_paid_date,
                data.payed_status,
                data.bill_number,
                data.bill_due_date,
                data.edit_user,
                data.yearly_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )

    },
    OtherBillViewDash: (callback) => {
        pool.query(
            `SELECT 
            other_bill_slno,
            bill_category,
            it_bill_category_name,          
            bill_name,
            bill_amount,
            bill_number,
            bill_date,
            bill_due_date,
            bill_paid_date,
            file_upload_status,         
            bill_description,
            it_bill_type_mast.it_bill_type_slno,
            it_bill_type_mast.it_bill_type_name
            FROM meliora.it_other_bills
            left join it_bill_category_mast on it_bill_category_mast.it_bill_category_slno=it_other_bills.bill_category
             left join it_bill_type_mast on it_bill_type_mast.it_bill_type_slno=it_bill_category_mast.it_bill_type_slno
            where payed_status is null || payed_status=0`
            , [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    otherTeleBillViewinDash: (callback) => {
        pool.query(
            `SELECT 
            other_bill_slno,
            bill_category,
            it_bill_category_name,          
            bill_name,          
            bill_amount,
            bill_number,
            bill_date,
            bill_due_date,
            bill_paid_date,       
            bill_description,
            file_upload_status,
            it_bill_type_mast.it_bill_type_slno,
            it_bill_type_mast.it_bill_type_name
            FROM meliora.it_other_bills
            left join it_bill_category_mast on it_bill_category_mast.it_bill_category_slno=it_other_bills.bill_category
            left join it_bill_type_mast on it_bill_type_mast.it_bill_type_slno=it_bill_category_mast.it_bill_type_slno
            where (payed_status is null || payed_status=0)and (it_bill_type_mast.it_bill_type_slno=1)`
            , [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    otherSoftwareBillViewinDash: (callback) => {
        pool.query(
            `SELECT 
            other_bill_slno,
            bill_category,
            it_bill_category_name,          
            bill_name,
            bill_amount,
            bill_number,
            bill_date,
            bill_due_date,
            bill_paid_date,
            file_upload_status,         
            bill_description,
            it_bill_type_mast.it_bill_type_slno,
            it_bill_type_mast.it_bill_type_name
            FROM meliora.it_other_bills
            left join it_bill_category_mast on it_bill_category_mast.it_bill_category_slno=it_other_bills.bill_category
            left join it_bill_type_mast on it_bill_type_mast.it_bill_type_slno=it_bill_category_mast.it_bill_type_slno
            where (payed_status is null || payed_status=0)and (it_bill_type_mast.it_bill_type_slno=2) `
            , [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    otherServiceBillViewinDash: (callback) => {
        pool.query(
            `SELECT 
            other_bill_slno,
            bill_category,
            it_bill_category_name,          
            bill_name,
            bill_amount,
            bill_number,
            bill_date,
            bill_due_date,
            bill_paid_date,
            file_upload_status,        
            bill_description,
            am_item_map_slno,
            it_bill_type_mast.it_bill_type_slno,
            it_bill_type_mast.it_bill_type_name
            FROM meliora.it_other_bills
            left join it_bill_category_mast on it_bill_category_mast.it_bill_category_slno=it_other_bills.bill_category
            left join it_bill_type_mast on it_bill_type_mast.it_bill_type_slno=it_bill_category_mast.it_bill_type_slno
            where (payed_status is null || payed_status=0)and (it_bill_type_mast.it_bill_type_slno=3)`
            , [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getbilltype: (id, callback) => {

        pool.query(
            `select 
            it_bill_category_mast.it_bill_type_slno,
            it_bill_category_mast.it_bill_category_slno
            from it_bill_category_mast
            left join it_bill_type_mast on it_bill_type_mast.it_bill_type_slno=it_bill_category_mast.it_bill_type_slno
            where it_bill_category_slno=?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }

        );
    },
    checkMonthlyInsert: (id, callback) => {
        pool.query(
            `select monthly_slno,bill_add_slno,monthly_bill_generate from it_bill_monthly_tariff
            where monthly_bill_generate=?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }

        );
    },

    getUnpaidMonthlyTeleBills: (callback) => {
        pool.query(
            `SELECT
            monthly_slno,
            it_bill_add.bill_tariff,            
            it_sim_type_master.it_sim_type_name,
            it_bill_add.bill_name,
            bill_category,
            monthly_bill_generate,
            bill_amount,
            bill_date,
            bill_paid_date,
            bill_number,
            file_upload_status,
            bill_due_date,            
            it_bill_type_mast.it_bill_type_name,
            it_bill_category_mast.it_bill_category_name
            FROM  it_bill_monthly_tariff                        
            left join it_bill_add on it_bill_add.bill_add_slno=it_bill_monthly_tariff.bill_add_slno             
            left join it_bill_category_mast on it_bill_category_mast.it_bill_category_slno=it_bill_add.bill_category
            left join it_bill_type_mast on it_bill_type_mast.it_bill_type_slno=it_bill_category_mast.it_bill_type_slno
            left join it_sim_type_master on it_sim_type_master.it_sim_type_slno=it_bill_add.bill_cug_simtype
            where (payed_status is null || payed_status=0) and (it_bill_type_mast.it_bill_type_slno=1) and bill_stat=1`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getUnpaidQuarterlyTeleBills: (callback) => {
        pool.query(
            `SELECT
            quaterly_slno,
            it_bill_add.bill_add_slno,
            it_bill_add.bill_tariff, 
            it_bill_add.bill_name,
            bill_category,
            quaterly_bill_generate,
            bill_amount,
            bill_date,
            bill_paid_date,
            bill_number,
            bill_due_date,
            file_upload_status,
            it_sim_type_master.it_sim_type_name,
            it_bill_type_mast.it_bill_type_name,
            it_bill_category_mast.it_bill_category_name
            FROM  it_quaterly_tarrif_details              
            left join it_bill_add on it_bill_add.bill_add_slno=it_quaterly_tarrif_details.bill_add_slno             
            left join it_bill_category_mast on it_bill_category_mast.it_bill_category_slno=it_bill_add.bill_category
            left join it_bill_type_mast on it_bill_type_mast.it_bill_type_slno=it_bill_category_mast.it_bill_type_slno
            left join it_sim_type_master on it_sim_type_master.it_sim_type_slno=it_bill_add.bill_cug_simtype
            where (payed_status is null || payed_status=0) and (it_bill_type_mast.it_bill_type_slno=1) and bill_stat=1`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getUnpaidYearlyTeleBills: (callback) => {
        pool.query(
            `SELECT
            yearly_slno,
            yearly_bill_generate,
            it_bill_add.bill_add_slno,
            it_bill_add.bill_name,            
            bill_category,
            bill_amount,
            bill_date,
            bill_paid_date,
            bill_number,
            bill_due_date,
            file_upload_status,
            it_bill_add.bill_tariff, 
            it_bill_type_mast.it_bill_type_name,
            it_sim_type_master.it_sim_type_name,
            it_bill_category_mast.it_bill_category_name
            FROM  it_yearly_tarrif_details              
            left join it_bill_add on it_bill_add.bill_add_slno = it_yearly_tarrif_details.bill_add_slno             
            left join it_bill_category_mast on it_bill_category_mast.it_bill_category_slno = it_bill_add.bill_category
            left join it_bill_type_mast on it_bill_type_mast.it_bill_type_slno = it_bill_category_mast.it_bill_type_slno
            left join it_sim_type_master on it_sim_type_master.it_sim_type_slno=it_bill_add.bill_cug_simtype
            where (payed_status is null || payed_status=0) and (it_bill_type_mast.it_bill_type_slno=1) and bill_stat=1`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    checkQuarterlyInsert: (id, callback) => {
        pool.query(
            `select quaterly_slno,bill_add_slno,quaterly_bill_generate from it_quaterly_tarrif_details
            where quaterly_bill_generate=?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }

        );
    },
    checkYearlyInsert: (id, callback) => {
        pool.query(
            `select yearly_slno,bill_add_slno,yearly_bill_generate from it_yearly_tarrif_details
            where yearly_bill_generate=?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }

        );
    },
    getUnpaidMonthlySoftBills: (callback) => {
        pool.query(
            `SELECT
            monthly_slno,
            it_bill_add.bill_tariff,            
            it_sim_type_master.it_sim_type_name,
            it_bill_add.bill_name,
            bill_category,
            monthly_bill_generate,
            bill_amount,
            bill_date,
            bill_paid_date,
            bill_number,
            file_upload_status,
            bill_due_date,            
            it_bill_type_mast.it_bill_type_name,
            it_bill_category_mast.it_bill_category_name
            FROM  it_bill_monthly_tariff                        
            left join it_bill_add on it_bill_add.bill_add_slno=it_bill_monthly_tariff.bill_add_slno             
            left join it_bill_category_mast on it_bill_category_mast.it_bill_category_slno=it_bill_add.bill_category
            left join it_bill_type_mast on it_bill_type_mast.it_bill_type_slno=it_bill_category_mast.it_bill_type_slno
            left join it_sim_type_master on it_sim_type_master.it_sim_type_slno=it_bill_add.bill_cug_simtype
            where (payed_status is null || payed_status=0) and (it_bill_type_mast.it_bill_type_slno=2) and bill_stat=1`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getUnpaidQuarterlySoftBills: (callback) => {
        pool.query(
            `SELECT
            quaterly_slno,
            it_bill_add.bill_add_slno,
            it_bill_add.bill_tariff, 
            it_bill_add.bill_name,
            bill_category,
            quaterly_bill_generate,
            bill_amount,
            bill_date,
            bill_paid_date,
            bill_number,
            bill_due_date,
             file_upload_status,
            it_sim_type_master.it_sim_type_name,
            it_bill_type_mast.it_bill_type_name,
            it_bill_category_mast.it_bill_category_name
            FROM  it_quaterly_tarrif_details              
            left join it_bill_add on it_bill_add.bill_add_slno=it_quaterly_tarrif_details.bill_add_slno             
            left join it_bill_category_mast on it_bill_category_mast.it_bill_category_slno=it_bill_add.bill_category
            left join it_bill_type_mast on it_bill_type_mast.it_bill_type_slno=it_bill_category_mast.it_bill_type_slno
            left join it_sim_type_master on it_sim_type_master.it_sim_type_slno=it_bill_add.bill_cug_simtype
            where (payed_status is null || payed_status=0) and (it_bill_type_mast.it_bill_type_slno=2) and bill_stat=1`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getUnpaidYearlySoftBills: (callback) => {
        pool.query(
            `SELECT
            yearly_slno,
            yearly_bill_generate,
            it_bill_add.bill_add_slno,
            it_bill_add.bill_name,            
            bill_category,
            bill_amount,
            bill_date,
            bill_paid_date,
            bill_number,
            bill_due_date,
            file_upload_status,
            it_bill_add.bill_tariff, 
            it_bill_type_mast.it_bill_type_name,
            it_sim_type_master.it_sim_type_name,
            it_bill_category_mast.it_bill_category_name
            FROM  it_yearly_tarrif_details              
            left join it_bill_add on it_bill_add.bill_add_slno = it_yearly_tarrif_details.bill_add_slno             
            left join it_bill_category_mast on it_bill_category_mast.it_bill_category_slno = it_bill_add.bill_category
            left join it_bill_type_mast on it_bill_type_mast.it_bill_type_slno = it_bill_category_mast.it_bill_type_slno
            left join it_sim_type_master on it_sim_type_master.it_sim_type_slno=it_bill_add.bill_cug_simtype
            where (payed_status is null || payed_status=0) and (it_bill_type_mast.it_bill_type_slno=2) and bill_stat=1`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    getAssetDetails: (id, callback) => {
        pool.query(
            `select
            item_name,
            am_item_name_creation.item_creation_slno,
            item_deptsec_slno,
            am_item_name_creation.item_category_slno,
            am_item_name_creation.item_group_slno,
            am_category.category_name,
            am_group.group_name,
            am_item_name_creation.item_name,
            co_deptsec_mast.sec_name,
            am_item_map_slno,
             item_asset_no,
            item_asset_no_only
            from am_asset_item_map_master
            left join co_deptsec_mast on co_deptsec_mast.sec_id =am_asset_item_map_master.item_deptsec_slno
            left join am_item_name_creation on am_item_name_creation.item_creation_slno=am_asset_item_map_master.item_creation_slno
            left join am_category on am_category.category_slno=am_item_name_creation.item_category_slno
            left join am_group on am_group.group_slno=am_item_name_creation.item_group_slno
            where am_item_map_slno=?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }

        );
    },

    getmonthlychargedAmount: (data, callback) => {
        const fromDate = data.from;
        const toDate = data.to;
        pool.query(
            `Select
                    monthly_slno,                          
                    bill_category,
                    bill_amount,                    
                    bill_paid_date,                                                         
                    it_bill_category_mast.it_bill_category_name

            From  it_bill_monthly_tariff

                   left join it_bill_add on it_bill_add.bill_add_slno=it_bill_monthly_tariff.bill_add_slno
                   left join it_bill_category_mast on it_bill_category_mast.it_bill_category_slno=it_bill_add.bill_category     
            where
                  monthly_bill_generate between ('${fromDate}') and ('${toDate}')`,
            {},
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }

        );
    },
    getQuarterlychargedAmount: (data, callback) => {
        const fromDate = data.from;
        const toDate = data.to;
        pool.query(
            `Select
                    quaterly_slno,                          
                    bill_category,
                    bill_amount,                    
                    bill_paid_date,                                                         
                    it_bill_category_mast.it_bill_category_name

            From  it_quaterly_tarrif_details

                   left join it_bill_add on it_bill_add.bill_add_slno=it_quaterly_tarrif_details.bill_add_slno
                   left join it_bill_category_mast on it_bill_category_mast.it_bill_category_slno=it_bill_add.bill_category     
            where
                  quaterly_bill_generate between ('${fromDate}') and ('${toDate}')`,
            {},
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }

        );
    },
    getOtherchargedAmount: (data, callback) => {
        const fromDate = data.from;
        const toDate = data.to;
        pool.query(
            `  Select
                other_bill_slno,                          
                bill_category,
                bill_amount                                                    
                  
            From  it_other_bills  
            where
                  bill_date between ('${fromDate}') and ('${toDate}')`,
            {},
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }

        );
    },
    getYearlychargedAmount: (data, callback) => {
        const fromDate = data.from;
        const toDate = data.to;
        pool.query(
            `		Select    
					yearly_slno,                         
                     bill_amount                  
             From  it_yearly_tarrif_details                   
            where
                  yearly_bill_generate between ('${fromDate}') and ('${toDate}')`,
            {},
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }

        );
    },

}