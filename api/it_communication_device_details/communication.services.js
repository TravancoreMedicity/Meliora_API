const { pool } = require('../../config/database')
module.exports = {
    CommunicationDeviceInsert: (data, callback) => {
        pool.query(
            `INSERT INTO it_communication_device_mast
          ( 
            device_type_slno,
            department,
            location,
            reciver_name,
            contact_no,
            ima,
            sim_number,
            provider,      
            issue_date,
            asset_no,
            sim_status,
            issue_status,
            tarrif,
            amount,
            device_num,
            sim_mobile_num,
            receiver_emp_id,           
            device_name, 
            device_ima,
            create_user      
                                   
          )
          VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.device_type_slno,
                data.department,
                data.location,
                data.reciver_name,
                data.contact_no,
                data.ima,
                data.sim_number,
                data.provider,
                // data.isssued_deligate,
                data.issue_date,
                data.asset_no,
                data.sim_status,
                data.issue_status,
                data.tarrif,
                data.amount,
                data.device_num,
                data.sim_mobile_num,
                data.receiver_emp_id,
                // data.issuerr_emp_id,
                data.device_name,
                data.device_ima,
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
    CommunicationDeviceView: (callback) => {
        pool.query(
            `SELECT
            device_slno,
            it_communication_device_mast.device_type_slno,
            it_communication_device_type.device_type_name,
            department,
            co_department_mast.dept_name,
            location,
            co_deptsec_mast.sec_name,
            reciver_name,
            contact_no,
            ima,
            sim_number,
            provider,
        
            issue_date,
            asset_no,          
            tarrif,
            amount,
            device_num,
            sim_mobile_num,
            receiver_emp_id,
          
            device_name,
            device_ima,
            sim_status,        
            issue_status,
            if(sim_status=1,'Yes','No')sim,
            if(issue_status=1,'Yes','No')issue
            FROM
            it_communication_device_mast
            left join it_communication_device_type on it_communication_device_type.device_type_slno=it_communication_device_mast.device_type_slno
            left join co_department_mast on co_department_mast.dept_id=it_communication_device_mast.department
            left join co_deptsec_mast on co_deptsec_mast.sec_id=it_communication_device_mast.location`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },
    CommunicationDeviceUpdate: (data, callback) => {

        pool.query(

            `UPDATE it_communication_device_mast SET
                       
                     
           

            receiver_emp_id=?,
            reciver_name=?,
            contact_no=?,                 
             issue_date=?,          
            issue_status=?,
            edit_user =?
          
                                             
            WHERE 
            device_slno=?`,
            [

                // data.department,
                // data.location,
                // data.device_name,
                // data.device_type_slno,
                // data.device_ima,
                // data.device_num,
                // data.ima,
                // data.sim_number,
                // data.provider,
                // data.sim_mobile_num,
                data.receiver_emp_id,
                data.reciver_name,
                data.contact_no,
                // data.issuerr_emp_id,
                // data.isssued_deligate,
                data.issue_date,
                // data.tarrif,
                // data.amount,
                // data.asset_no,
                // data.sim_status,
                data.issue_status,
                data.edit_user,
                data.device_slno,

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