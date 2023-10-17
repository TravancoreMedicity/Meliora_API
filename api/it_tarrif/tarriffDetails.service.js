const { pool } = require('../../config/database')
module.exports = {
    MonthlyTarrifView: (callback) => {
        pool.query(
            `SELECT
            device_slno,device_name,
            it_communication_device_mast.device_type_slno,
            it_communication_device_type.device_type_name,
            department,
            co_department_mast.dept_name,
            reciver_name,         
            sim_number,
            provider,                  
    		amount,
            receiver_emp_id,
            sim_status,     
            if(sim_status=1,'Yes','No')sim
         
            FROM
            it_communication_device_mast
            left join it_communication_device_type on it_communication_device_type.device_type_slno=it_communication_device_mast.device_type_slno
            left join co_department_mast on co_department_mast.dept_id=it_communication_device_mast.department
            where tarrif=1`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    MonthlyTarrifUpdate: (data, callback) => {
        pool.query(
            `UPDATE it_tarrif_monthly_details SET 
            tarrif=?,
            amount=?,
            bill_amount=?,
            bill_date=?,
            bill_entered_date=?,
            file_upload_status=?,
            payed_status=?                 
            WHERE 
            sl_no_monthly=?`,
            [
                data.tarrif,
                data.amount,
                data.bill_date,
                data.bill_entered_date,
                data.file_upload_status,
                data.payed_status,
                data.sl_no_monthly,
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
            device_slno,device_name,
            it_communication_device_mast.device_type_slno,
            it_communication_device_type.device_type_name,
            department,
            co_department_mast.dept_name,
            reciver_name,         
            sim_number,
            provider,                  
			amount,
            sim_status,     
            if(sim_status=1,'Yes','No')sim
            FROM
            it_communication_device_mast
            left join it_communication_device_type on it_communication_device_type.device_type_slno=it_communication_device_mast.device_type_slno
            left join co_department_mast on co_department_mast.dept_id=it_communication_device_mast.department
            where tarrif=2`, [],
            (error, results, feilds) => {
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
            device_slno,device_name,
            it_communication_device_mast.device_type_slno,
            it_communication_device_type.device_type_name,
            department,
            co_department_mast.dept_name,
            reciver_name,         
            sim_number,
            provider,                  
			amount,
            sim_status,     
            if(sim_status=1,'Yes','No')sim
            FROM
            it_communication_device_mast
            left join it_communication_device_type on it_communication_device_type.device_type_slno=it_communication_device_mast.device_type_slno
            left join co_department_mast on co_department_mast.dept_id=it_communication_device_mast.department
            where tarrif=3`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },


    BillMonthlyUpdate: (data, callback) => {

        pool.query(

            `UPDATE it_monthly_tarrif_details SET
                       
            bill_amount=?,
            bill_date=?,
            bill_entered_date=?,
            file_upload_status=?,
            payed_status=?,
            bill_number=?,            
            bill_due_date=?            
            WHERE 
            monthly_slno=?`,
            [
                data.bill_amount,
                data.bill_date,
                data.bill_entered_date,
                data.file_upload_status,
                data.payed_status,
                data.bill_number,
                data.bill_due_date,
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
    MonthlyTarrifInsert: (data, callBack) => {
        pool.query(
            `INSERT INTO it_monthly_tarrif_details
            (
                device_slno,
                tarrif_amount,
                monthly_bill_generate
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
    BillMonthlyViewUpdate: (data, callback) => {

        pool.query(

            `UPDATE it_tarrif_monthly_details SET           
            bill_amount=?,
            bill_date=?,
            bill_due_date=?,
            bill_number=?,         
            bill_entered_date=?,
            file_upload_status=?,
            payed_status=?                 
            WHERE 
            sl_no_monthly=?`,

            [
                data.bill_amount,
                data.bill_date,
                data.bill_due_date,
                data.bill_number,
                data.bill_entered_date,
                data.file_upload_status,
                data.payed_status,
                data.sl_no_monthly,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    YearlyTarrifInsert: (data, callback) => {
        pool.query(
            `INSERT INTO it_yearly_tarrif_details
            (
                device_slno,
                tarrif_amount,
                yearly_bill_generate
            ) 
            VALUES ?`,
            [
                data
            ],

            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    CheckInsetMonthlyOrNot: (data, callback) => {

        pool.query(
            `SELECT
            monthly_slno,
            it_monthly_tarrif_details.device_slno,
           it_communication_device_mast.device_name,
           it_communication_device_mast.device_type_slno,
           it_communication_device_mast.sim_mobile_num,
           device_type_name,
           department,
           issue_date,
           provider,
           bill_update_status,
           co_department_mast.dept_name,
           it_communication_device_mast.receiver_emp_id,
           it_communication_device_mast.reciver_name,
           it_communication_device_mast.amount,
           it_communication_device_mast.provider,bill_amount, bill_date,
            bill_entered_date, file_upload_status, payed_status, bill_number, bill_due_date, bill_update_status,
            if(payed_status=1,'Yes','No')payed
            FROM  it_monthly_tarrif_details
           left join it_communication_device_mast on it_communication_device_mast.device_slno=it_monthly_tarrif_details.device_slno
           left join it_communication_device_type on it_communication_device_type.device_type_slno=it_communication_device_mast.device_type_slno
           left join co_department_mast on co_department_mast.dept_id=it_communication_device_mast.department
          WHERE monthly_bill_generate=?`,
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
    CheckInsetYearlyOrNot: (data, callback) => {

        pool.query(
            `SELECT
            yearly_slno,
            it_yearly_tarrif_details.device_slno,
           it_communication_device_mast.device_name,
           it_communication_device_mast.device_type_slno,
           it_communication_device_mast.sim_mobile_num,
           device_type_name,
           department,
           issue_date,
           provider,              
           co_department_mast.dept_name,
           it_communication_device_mast.receiver_emp_id,
           it_communication_device_mast.reciver_name,
           it_communication_device_mast.amount,
           it_communication_device_mast.provider,bill_amount, bill_date,
            bill_entered_date, file_upload_status, payed_status, bill_number, bill_due_date,
            if(payed_status=1,'Yes','No')payed
            FROM  it_yearly_tarrif_details
           left join it_communication_device_mast on it_communication_device_mast.device_slno=it_yearly_tarrif_details.device_slno
           left join it_communication_device_type on it_communication_device_type.device_type_slno=it_communication_device_mast.device_type_slno
           left join co_department_mast on co_department_mast.dept_id=it_communication_device_mast.department
          WHERE yearly_bill_generate=?`,
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
    BillYearlyUpdate: (data, callback) => {

        pool.query(

            `UPDATE it_yearly_tarrif_details SET                       
            bill_amount=?,
            bill_date=?,
            bill_entered_date=?,
            file_upload_status=?,
            payed_status=?,
            bill_number=?,            
            bill_due_date=?            
            WHERE 
            yearly_slno=?`,
            [
                data.bill_amount,
                data.bill_date,
                data.bill_entered_date,
                data.file_upload_status,
                data.payed_status,
                data.bill_number,
                data.bill_due_date,
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
    QuaterlyTarrifInsert: (data, callBack) => {
        pool.query(
            `INSERT INTO it_quaterly_tarrif_details
            (
                device_slno,
                tarrif_amount,
                quaterly_bill_generate
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
    CheckInsetQuaterlyOrNot: (data, callback) => {

        pool.query(
            `SELECT
            quaterly_slno,
            it_quaterly_tarrif_details.device_slno,
           it_communication_device_mast.device_name,
           it_communication_device_mast.device_type_slno,
           it_communication_device_mast.sim_mobile_num,
           device_type_name,
           department,
           issue_date,
           provider,          
           co_department_mast.dept_name,
           it_communication_device_mast.receiver_emp_id,
           it_communication_device_mast.reciver_name,
           it_communication_device_mast.amount,
           it_communication_device_mast.provider,bill_amount, bill_date,
            bill_entered_date, file_upload_status, payed_status, bill_number, bill_due_date,
            if(payed_status=1,'Yes','No')payed
            FROM  it_quaterly_tarrif_details
           left join it_communication_device_mast on it_communication_device_mast.device_slno=it_quaterly_tarrif_details.device_slno
           left join it_communication_device_type on it_communication_device_type.device_type_slno=it_communication_device_mast.device_type_slno
           left join co_department_mast on co_department_mast.dept_id=it_communication_device_mast.department
          WHERE quaterly_bill_generate=?`,
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

    BillQuaterlyUpdate: (data, callback) => {

        pool.query(

            `UPDATE it_quaterly_tarrif_details SET
                       
            bill_amount=?,
            bill_date=?,
            bill_entered_date=?,
            file_upload_status=?,
            payed_status=?,
            bill_number=?,            
            bill_due_date=?            
            WHERE 
            quaterly_slno=?`,
            [
                data.bill_amount,
                data.bill_date,
                data.bill_entered_date,
                data.file_upload_status,
                data.payed_status,
                data.bill_number,
                data.bill_due_date,
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
}