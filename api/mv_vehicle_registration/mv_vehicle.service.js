
const { pool } = require("../../config/database");


module.exports = {
    vehicleImageUpload: (data, callBack) => {
        pool.query(
            `UPDATE  mv_vehicle_registration
            SET 
            payment_attach_status = 1
            WHERE registration_slno = ?
            `,
            [
                data.registration_slno
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getallvehicledetail: (callBack) => {
        pool.query(
            `
           SELECT 
            ROW_NUMBER() OVER () as slno,
	 co_employee_master.em_name,registration_slno,file_path,vallet_type, mv_vehicle_registration.zone_slno, owner_name, mobile_number, vehicle_number, token_number, driver_emid, payment_type, upi_payment_transactionid, payment_attach_status,mv_vehicle_registration.create_date, zone_name
FROM
	mv_vehicle_registration
LEFT JOIN mv_zone_master ON mv_vehicle_registration.zone_slno = mv_zone_master.zone_slno 
LEFT JOIN  co_employee_master ON mv_vehicle_registration.driver_emid = co_employee_master.em_id
WHERE vehicle_status = 1 
            `,
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        )
    },
    //practise
    createPractiseRegistration: (data, callBack) => {
        pool.query(
            `
            INSERT INTO mv_vehicle_registration
            (
                vallet_type,
                zone_slno,
                owner_name,
                mobile_number,
                vehicle_number,
                token_number,
                driver_emid,
                payment_type,
                file_path,
                upi_payment_transactionid,
                create_user
            )
            VALUES(?,?,?,?,?,?,?,?,?,?,?)
            `,
            [
                data.vallet_type,
                data.zone_slno,
                data.owner_name,
                data.mobile_number,
                data.vehicle_number,
                data.token_number,
                data.driver_emid,
                data.payment_type,
                data.filePath,
                data.upi_payment_transactionid,
                data.create_user
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    searchVehicle: (data, callBack) => {
        pool.query(
            `
                select * from mv_vehicle_registration where vehicle_number like ?               
            `,
            [
                '%' + data.vehicle_number + '%',

            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getTodayVehicles: (data, callBack) => {
        pool.query(
            `
       SELECT 
        ROW_NUMBER() OVER () as slno,
	 co_employee_master.em_name,registration_slno,file_path,vallet_type, mv_vehicle_registration.zone_slno, owner_name, mobile_number, vehicle_number, token_number, driver_emid, payment_type, upi_payment_transactionid, payment_attach_status,mv_vehicle_registration.create_date, zone_name
FROM
	mv_vehicle_registration
LEFT JOIN mv_zone_master ON mv_vehicle_registration.zone_slno = mv_zone_master.zone_slno 
LEFT JOIN  co_employee_master ON mv_vehicle_registration.driver_emid = co_employee_master.em_id
WHERE DATE(mv_vehicle_registration.create_date) = ?
`,
            [
                data.currentDate
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getvehicleBetweenData: (data, callBack) => {
        pool.query(
            `
        SELECT 
         ROW_NUMBER() OVER () as slno,
	 co_employee_master.em_name,registration_slno,file_path,vallet_type, mv_vehicle_registration.zone_slno, owner_name, mobile_number, vehicle_number, token_number, driver_emid, payment_type, upi_payment_transactionid, payment_attach_status,mv_vehicle_registration.create_date, zone_name
FROM
	mv_vehicle_registration
LEFT JOIN mv_zone_master ON mv_vehicle_registration.zone_slno = mv_zone_master.zone_slno 
LEFT JOIN  co_employee_master ON mv_vehicle_registration.driver_emid = co_employee_master.em_id
WHERE
 DATE(mv_vehicle_registration.create_date) BETWEEN ? AND ?
`,
            [
                data.startDate,
                data.EndDate
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    updatevehicleDetail: (data, callBack) => {

        pool.query(
            `
            UPDATE mv_vehicle_registration
            SET vehicle_status = 0 , returning_time = ? ,returning_driverempid = ? WHERE registration_slno = ?
            `,
            [
                new Date(),
                data.driverempid,
                data.registration_slno,
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getAllVehicleReport: (callBack) => {
        pool.query(
            `
           SELECT 
            ROW_NUMBER() OVER () as slno,
	 co_employee_master.em_name,registration_slno,file_path,vallet_type, mv_vehicle_registration.zone_slno, owner_name, mobile_number, vehicle_number, token_number, driver_emid, payment_type, upi_payment_transactionid, payment_attach_status,mv_vehicle_registration.create_date, zone_name
FROM
	mv_vehicle_registration
LEFT JOIN mv_zone_master ON mv_vehicle_registration.zone_slno = mv_zone_master.zone_slno 
LEFT JOIN  co_employee_master ON mv_vehicle_registration.driver_emid = co_employee_master.em_id
            `,
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        )
    }

}