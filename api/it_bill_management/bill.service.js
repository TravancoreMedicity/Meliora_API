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
            `SELECT 
            bill_add_slno,
            bill_category,
            bill_tariff,
            bill_name,
            bill_cug_status,
            it_sim_type_name,
            it_bill_category_name,
            bill_cug_simtype             
            FROM meliora.it_bill_add
            left join it_bill_category_mast on it_bill_category_mast.it_bill_category_slno=it_bill_add.bill_category
            left join it_sim_type_master on it_sim_type_master.it_sim_type_slno=it_bill_add.bill_cug_simtype  `
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
            bill_cug_simtype=?
 			WHERE 
             bill_add_slno=?`,
            [
                data.bill_category,
                data.bill_tariff,
                data.bill_name,
                data.bill_cug_status,
                data.bill_cug_simtype,
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

    CheckInsetMonthlyOrNot: (data, callback) => {

        pool.query(
            ` SELECT
            monthly_slno,
            it_bill_monthly_tariff.bill_add_slno        
            FROM  it_bill_monthly_tariff   
            WHERE monthly_bill_generate=? AND it_bill_monthly_tariff.bill_add_slno=?`,
            [
                data.monthly_bill_generate,
                data.bill_add_slno

            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }

        );
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
            VALUES (?,?,?)`,
            [
                data.bill_add_slno,
                data.monthly_bill_generate,
                data.create_user
            ],
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
            bill_name,bill_category     
            FROM
            it_bill_add
            left join it_bill_category_mast on it_bill_category_mast.it_bill_category_slno=it_bill_add.bill_category
             where bill_tariff=1`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );

    },
    getMonthData: (data, callback) => {
        pool.query(
            `SELECT
            monthly_slno,
            it_bill_add.bill_tariff,            
            it_sim_type_master.it_sim_type_name,
            it_bill_add.bill_name,
            bill_category,
            bill_amount,
            bill_date,
            bill_paid_date,
            bill_number,
            bill_due_date,            
            it_bill_type_mast.it_bill_type_name,
            it_bill_category_mast.it_bill_category_name
            FROM  it_bill_monthly_tariff                        
            left join it_bill_add on it_bill_add.bill_add_slno=it_bill_monthly_tariff.bill_add_slno             
            left join it_bill_category_mast on it_bill_category_mast.it_bill_category_slno=it_bill_add.bill_category
             left join it_bill_type_mast on it_bill_type_mast.it_bill_type_slno=it_bill_category_mast.it_bill_type_slno
             left join it_sim_type_master on it_sim_type_master.it_sim_type_slno=it_bill_add.bill_cug_simtype
             where payed_status is null || payed_status=0`,
            [

                data.monthly_bill_generate

            ],
            (error, results, fields) => {
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
             where bill_tariff=2`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    CheckInsetQuaterlyOrNot: (data, callback) => {

        pool.query(
            `SELECT
            quaterly_slno,
            it_quaterly_tarrif_details.bill_add_slno        
            FROM  it_quaterly_tarrif_details   
            WHERE quaterly_bill_generate=? AND it_quaterly_tarrif_details.bill_add_slno=?`,
            [

                data.quaterly_bill_generate,
                data.bill_add_slno

            ],
            (error, results, fields) => {
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
            VALUES (?,?,?)`,
            [
                data.bill_add_slno,
                data.quaterly_bill_generate,
                data.create_user
            ],
            (error, results, feilds) => {

                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getQuaterlyData: (data, callback) => {

        pool.query(
            `SELECT
            quaterly_slno,
            it_bill_add.bill_add_slno,
            it_bill_add.bill_tariff, 
            it_bill_add.bill_name,
            bill_category,
            bill_amount,
            bill_date,
            bill_paid_date,
            bill_number,
            bill_due_date,
            it_sim_type_master.it_sim_type_name,
            it_bill_type_mast.it_bill_type_name,
            it_bill_category_mast.it_bill_category_name
            FROM  it_quaterly_tarrif_details              
            left join it_bill_add on it_bill_add.bill_add_slno=it_quaterly_tarrif_details.bill_add_slno             
            left join it_bill_category_mast on it_bill_category_mast.it_bill_category_slno=it_bill_add.bill_category
             left join it_bill_type_mast on it_bill_type_mast.it_bill_type_slno=it_bill_category_mast.it_bill_type_slno
             left join it_sim_type_master on it_sim_type_master.it_sim_type_slno=it_bill_add.bill_cug_simtype
             where payed_status is null || payed_status=0`,
            [

                data.quaterly_bill_generate

            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
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
             where bill_tariff = 3`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    CheckInsetYearlyOrNot: (data, callback) => {
        pool.query(
            `SELECT
            yearly_slno,
            it_yearly_tarrif_details.bill_add_slno        
            FROM  it_yearly_tarrif_details   
            WHERE yearly_bill_generate =? AND it_yearly_tarrif_details.bill_add_slno=?`,
            [

                data.yearly_bill_generate,
                data.bill_add_slno

            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    YearlyTarrifInsert: (data, callBack) => {
        pool.query(
            `
            INSERT INTO it_yearly_tarrif_details
            (
                bill_add_slno,
                yearly_bill_generate,
                create_user
            ) 
            VALUES(?,?,?)`,
            [
                data.bill_add_slno,
                data.yearly_bill_generate,
                data.create_user
            ],
            (error, results, feilds) => {

                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getYearData: (data, callback) => {

        pool.query(
            `SELECT
            yearly_slno,
            it_bill_add.bill_add_slno,
            it_bill_add.bill_name,
            bill_category,
            bill_amount,
            bill_date,
            bill_paid_date,
            bill_number,
            bill_due_date,
            it_bill_add.bill_tariff, 
            it_bill_type_mast.it_bill_type_name,
            it_sim_type_master.it_sim_type_name,
            it_bill_category_mast.it_bill_category_name
            FROM  it_yearly_tarrif_details              
            left join it_bill_add on it_bill_add.bill_add_slno = it_yearly_tarrif_details.bill_add_slno             
            left join it_bill_category_mast on it_bill_category_mast.it_bill_category_slno = it_bill_add.bill_category
             left join it_bill_type_mast on it_bill_type_mast.it_bill_type_slno = it_bill_category_mast.it_bill_type_slno
             left join it_sim_type_master on it_sim_type_master.it_sim_type_slno=it_bill_add.bill_cug_simtype
             where payed_status is null || payed_status=0`,
            [

                data.yearly_bill_generate

            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
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
    getTeleMonthData: (data, callback) => {
        pool.query(
            `SELECT
            monthly_slno,
            monthly_bill_generate,
            it_bill_add.bill_tariff,            
            it_sim_type_master.it_sim_type_name,
            it_bill_add.bill_name,
            bill_category,
            bill_amount,
            bill_date,
            bill_paid_date,
            bill_number,
            bill_due_date,
            file_upload_status,            
            it_bill_type_mast.it_bill_type_name,
            it_bill_category_mast.it_bill_category_name
            FROM  it_bill_monthly_tariff                        
            left join it_bill_add on it_bill_add.bill_add_slno=it_bill_monthly_tariff.bill_add_slno             
            left join it_bill_category_mast on it_bill_category_mast.it_bill_category_slno=it_bill_add.bill_category
            left join it_bill_type_mast on it_bill_type_mast.it_bill_type_slno=it_bill_category_mast.it_bill_type_slno
            left join it_sim_type_master on it_sim_type_master.it_sim_type_slno=it_bill_add.bill_cug_simtype            
             where (payed_status is null || payed_status=0)and (it_bill_type_mast.it_bill_type_slno=1)`,
            [

                data.monthly_bill_generate

            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }

        );
    },
    getTeleQuarterlyData: (data, callback) => {

        pool.query(
            `SELECT
            quaterly_slno,
            quaterly_bill_generate,
            it_bill_add.bill_add_slno,
            it_bill_add.bill_tariff, 
            it_bill_add.bill_name,
            bill_category,
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
             where (payed_status is null || payed_status=0)and (it_bill_type_mast.it_bill_type_slno=1)`,
            [

                data.quaterly_bill_generate

            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getTeleYearlyData: (data, callback) => {

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
            where (payed_status is null || payed_status=0)and (it_bill_type_mast.it_bill_type_slno=1)`,
            [

                data.yearly_bill_generate

            ],
            (error, results, fields) => {
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
    getSoftwareMonthData: (data, callback) => {
        pool.query(
            `SELECT
            monthly_slno,
            monthly_bill_generate,
            it_bill_add.bill_tariff,            
            it_sim_type_master.it_sim_type_name,
            it_bill_add.bill_name,
            bill_category,
            bill_amount,
            bill_date,
            bill_paid_date,
            file_upload_status,  
            bill_number,
            bill_due_date,            
            it_bill_type_mast.it_bill_type_name,
            it_bill_category_mast.it_bill_category_name
            FROM  it_bill_monthly_tariff                        
            left join it_bill_add on it_bill_add.bill_add_slno=it_bill_monthly_tariff.bill_add_slno             
            left join it_bill_category_mast on it_bill_category_mast.it_bill_category_slno=it_bill_add.bill_category
             left join it_bill_type_mast on it_bill_type_mast.it_bill_type_slno=it_bill_category_mast.it_bill_type_slno
             left join it_sim_type_master on it_sim_type_master.it_sim_type_slno=it_bill_add.bill_cug_simtype
             where (payed_status is null || payed_status=0)and (it_bill_type_mast.it_bill_type_slno=2)`,
            [

                data.monthly_bill_generate

            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }

        );
    },
    getSoftwareQuaterlyData: (data, callback) => {

        pool.query(
            `SELECT
            quaterly_slno,
            quaterly_bill_generate,
            it_bill_add.bill_add_slno,
            it_bill_add.bill_tariff, 
            it_bill_add.bill_name,
            bill_category,
            bill_amount,
            bill_date,
            bill_paid_date,
            file_upload_status,  
            bill_number,
            bill_due_date,
            it_sim_type_master.it_sim_type_name,
            it_bill_type_mast.it_bill_type_name,
            it_bill_category_mast.it_bill_category_name
            FROM  it_quaterly_tarrif_details              
            left join it_bill_add on it_bill_add.bill_add_slno=it_quaterly_tarrif_details.bill_add_slno             
            left join it_bill_category_mast on it_bill_category_mast.it_bill_category_slno=it_bill_add.bill_category
             left join it_bill_type_mast on it_bill_type_mast.it_bill_type_slno=it_bill_category_mast.it_bill_type_slno
             left join it_sim_type_master on it_sim_type_master.it_sim_type_slno=it_bill_add.bill_cug_simtype
             where (payed_status is null || payed_status=0)and (it_bill_type_mast.it_bill_type_slno=2)`,
            [

                data.quaterly_bill_generate

            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getSoftwareYearlyData: (data, callback) => {

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
            it_bill_category_mast.it_bill_category_name
            FROM  it_yearly_tarrif_details              
            left join it_bill_add on it_bill_add.bill_add_slno = it_yearly_tarrif_details.bill_add_slno             
            left join it_bill_category_mast on it_bill_category_mast.it_bill_category_slno = it_bill_add.bill_category
             left join it_bill_type_mast on it_bill_type_mast.it_bill_type_slno = it_bill_category_mast.it_bill_type_slno
             where (payed_status is null || payed_status=0)and (it_bill_type_mast.it_bill_type_slno=2)`,
            [

                data.yearly_bill_generate

            ],
            (error, results, fields) => {
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
            where (payed_status is null || payed_status=0)and (it_bill_type_mast.it_bill_type_slno=2)`
            , [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getServiceMonthData: (data, callback) => {
        pool.query(
            `SELECT
            monthly_slno,
            monthly_bill_generate,
            it_bill_add.bill_tariff,            
            it_sim_type_master.it_sim_type_name,
            it_bill_add.bill_name,
            bill_category,
            bill_amount,
            bill_date,
            bill_paid_date,
            bill_number,
            bill_due_date,
            file_upload_status,             
            it_bill_type_mast.it_bill_type_name,
            it_bill_category_mast.it_bill_category_name
            FROM  it_bill_monthly_tariff                        
            left join it_bill_add on it_bill_add.bill_add_slno=it_bill_monthly_tariff.bill_add_slno             
            left join it_bill_category_mast on it_bill_category_mast.it_bill_category_slno=it_bill_add.bill_category
            left join it_bill_type_mast on it_bill_type_mast.it_bill_type_slno=it_bill_category_mast.it_bill_type_slno
            left join it_sim_type_master on it_sim_type_master.it_sim_type_slno=it_bill_add.bill_cug_simtype            
             where (payed_status is null || payed_status=0)and (it_bill_type_mast.it_bill_type_slno=3)`,
            [

                data.monthly_bill_generate

            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }

        );
    },
    getServiceQuarterlyData: (data, callback) => {

        pool.query(
            `SELECT
            quaterly_slno,
            quaterly_bill_generate,
            it_bill_add.bill_add_slno,
            it_bill_add.bill_tariff, 
            it_bill_add.bill_name,
            bill_category,
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
             where (payed_status is null || payed_status=0)and (it_bill_type_mast.it_bill_type_slno=3)`,
            [

                data.quaterly_bill_generate

            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getServiceYearlyData: (data, callback) => {

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
            it_bill_category_mast.it_bill_category_name
            FROM  it_yearly_tarrif_details              
            left join it_bill_add on it_bill_add.bill_add_slno = it_yearly_tarrif_details.bill_add_slno             
            left join it_bill_category_mast on it_bill_category_mast.it_bill_category_slno = it_bill_add.bill_category
            left join it_bill_type_mast on it_bill_type_mast.it_bill_type_slno = it_bill_category_mast.it_bill_type_slno
            where (payed_status is null || payed_status=0)and (it_bill_type_mast.it_bill_type_slno=3)`,
            [

                data.yearly_bill_generate

            ],
            (error, results, fields) => {
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
}