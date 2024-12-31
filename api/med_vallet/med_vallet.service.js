const { da } = require('date-fns/locale');
const { pool } = require('../../config/database');
const { error } = require('winston');
const { date } = require('joi');
module.exports = {
    createZonemaster: (data, callBack) => {
        pool.query(
            `INSERT INTO  mv_zone_master
            ( zone_name,
            zone_status,
            create_user)
            VALUES(?,?,?)`,
            [
                data.zone_name,
                data.zone_status,
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
    getAllZoneMaster: (callBack) => {
        pool.query(
            `SELECT * FROM mv_zone_master`,
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    updatezonemaster: (data, callBack) => {
        pool.query(
            `
            UPDATE mv_zone_master
            SET  zone_name=?,
            zone_status=?,
            edit_user=?   
            where zone_slno= ?  
            `,
            [
                data.zone_name,
                data.zone_status,
                data.edit_user,
                data.zone_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    deleteZoneMaster: (data, callBack) => {
        pool.query(
            `
            UPDATE  mv_zone_master
            SET zone_status = 0  
            WHERE zone_slno = ?
            `,
            [
                data.zone_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    createUserMaster: (data, callBack) => {
        pool.query(
            `
            INSERT INTO mv_user_master
            (user_name,
            user_status,
            create_user)
            VALUES(?,?,?)
            `,
            [
                data.user_name,
                data.user_status,
                data.create_user
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    getAlluserMaster: (callBack) => {
        pool.query(
            `SELECT 
                user_slno,user_name,user_status
            FROM
                mv_user_master`,
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    updataUserMaster: (data, callBack) => {
        pool.query(
            `UPDATE mv_user_master
            SET user_name=?,
            user_status=?,
            edit_user=?   
            where user_slno= ?  
        `,
            [
                data.user_name,
                data.user_status,
                data.edit_user,
                data.user_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    createslotmaster: (data, callBack) => {
        pool.query(
            `INSERT INTO mv_slot_master
            (slot_count,
            zone_slno,
            slot_status,
            create_user)
            VALUES(?,?,?,?)
            `,
            [
                data.slot_count,
                data.zone_slno,
                data.slot_status,
                data.create_user
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    getAllSlotMaster: (callBack) => {
        pool.query(
            `SELECT 
    sm.slot_slno,
    sm.slot_count,
    zm.zone_name AS zone_name,
    sm.slot_status,
     sm.zone_slno
FROM 
  mv_slot_master sm
INNER JOIN 
    mv_zone_master zm
ON 
    sm.zone_slno = zm.zone_slno
`,
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    updateslotmaster: (data, callBack) => {
        pool.query(
            `UPDATE mv_slot_master
            SET  slot_count = ?,
            zone_slno = ?,
            slot_status = ? 
            WHERE  slot_slno =?
            `,
            [
                data.slot_count,
                data.zone_slno,
                data.slot_status,
                data.slot_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }

        )
    },
    createuserRight: (data, callBack) => {
        pool.query(
            `
            INSERT INTO mv_employee_user_rights
            ( dept_id, sect_id, emp_id, user_group_id,status,create_user)
            VALUES(?,?,?,?,?,?)
            `,
            [
                data.dept_id,
                data.sect_id,
                data.emp_id,
                data.user_group_id,
                data.status,
                data.create_user
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    getAllUserRight: (callBack) => {
        pool.query(
            `
SELECT
    mv_employee_user_rights.create_user,
	mv_employee_user_rights.status,
    dept_name,
    sec_name,
    em_name,
    user_name,
    mv_employee_user_rights.dept_id,
    mv_employee_user_rights.sect_id,
    mv_employee_user_rights.emp_id,
    mv_employee_user_rights.user_group_id,
    mv_employee_user_rights.right_slno
FROM 
	mv_employee_user_rights
LEFT JOIN 	mv_user_master ON 	mv_employee_user_rights	.user_group_id = mv_user_master.user_slno
LEFT JOIN  co_department_mast ON mv_employee_user_rights.dept_id = co_department_mast.dept_id
LEFT JOIN  co_deptsec_mast ON mv_employee_user_rights.sect_id = co_deptsec_mast.sec_id
LEFT JOIN  co_employee_master ON mv_employee_user_rights.emp_id = co_employee_master.em_id
            `,
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    updateuserRight: (data, callBack) => {
        pool.query(
            `
            UPDATE mv_employee_user_rights
            SET dept_id = ?,
                sect_id = ?,
                emp_id = ?,
                user_group_id = ?,
                status = ?,
                edit_user = ?
            WHERE right_slno = ?
            ` ,
            [
                data.dept_id,
                data.sect_id,
                data.emp_id,
                data.user_group_id,
                data.status,
                data.edit_user,
                data.right_slno,
            ],
            (error, results, feilds) => {

                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }

        )
    },
    getallPresentDriver: (data, callBack) => {
        pool.query(
            `
           SELECT * FROM mv_driver_attendnace_marking
            WHERE attendance_day = ?
            `,
            [
                data.currentDate
            ],
            (error, results, feilds) => {

                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },

    getdriverdropDown: (data, callBack) => {
        pool.query(
            `
           SELECT 
	em_name,
     emp_id
 FROM 
 mv_driver_attendnace_marking
LEFT JOIN  
	co_employee_master ON mv_driver_attendnace_marking.emp_id = co_employee_master.em_id
WHERE attendance_day = ? AND instatus =  1  AND outstatus =  0
            `,
            [
                data.currentDate
            ],
            (error, results, feilds) => {

                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    checkuserExist: (body, callBack) => {
        pool.query(
            `
           SELECT emp_id 
FROM
mv_employee_user_rights
 WHERE emp_id = ?
            `,
            [
                body.emp_id
            ],
            (error, results, feilds) => {

                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    getAllDriverUserRight: (callBack) => {
        pool.query(
            `
SELECT
    mv_employee_user_rights.create_user,
	mv_employee_user_rights.status,
    dept_name,
    sec_name,
    em_name,
    user_name,
    mv_employee_user_rights.dept_id,
    mv_employee_user_rights.sect_id,
    mv_employee_user_rights.emp_id,
    mv_employee_user_rights.user_group_id,
    mv_employee_user_rights.right_slno
FROM 
	mv_employee_user_rights
LEFT JOIN 	mv_user_master ON 	mv_employee_user_rights	.user_group_id = mv_user_master.user_slno
LEFT JOIN  co_department_mast ON mv_employee_user_rights.dept_id = co_department_mast.dept_id
LEFT JOIN  co_deptsec_mast ON mv_employee_user_rights.sect_id = co_deptsec_mast.sec_id
LEFT JOIN  co_employee_master ON mv_employee_user_rights.emp_id = co_employee_master.em_id
WHERE user_group_id = 2
            `,
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    FindUserExists: (data, callBack) => {
        pool.query(
            `
        SELECT slno FROM mv_driver_attendnace_marking WHERE emp_id  = ? AND attendance_day = ?
        `,
            [data.empid, data.currentDate],
            (error, results, feilds) => {

                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            });
    },
    UpdateExistingUser: (data, callBack) => {
        pool.query(
            `
            UPDATE mv_driver_attendnace_marking
            SET
                emp_id = ?,
                attendance_day = ?,
                outstatus = ?,
                outtime = ?,
                update_date = ?
            WHERE slno = ?
            `,
            [
                data.empid,
                data.currentDate,
                data.out,
                data.outTime,
                new Date(),
                data.slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    CreateNewDriverAttendance: (data, callBack) => {
        pool.query(
            `
            INSERT INTO mv_driver_attendnace_marking
            ( emp_id, attendance_day, instatus, intime, outstatus, outtime, create_date,update_date)
            VALUES(?,?,?,?,?,?,?,?)
            `,
            [
                data.empid,
                data.currentDate,
                data.in,
                data.inTime,
                data.out,
                data.outTime,
                new Date(),
                null
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    CreateEmployeeLogs: (data, callBack) => {
        pool.query(
            `INSERT INTO mv_attendance_marking_details 
            (driver_id, atendnace_time, attendnace_status)
            VALUES(?,?,?)
            `,
            [
                data.empid,
                data.atendnaceTime,
                data.status
            ],
            (error, results, feilds) => {
                if (error) {
                    callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    getAllAttendaceReport: (callBack) => {
        //   SELECT 
        // 	driver_id ,atendnace_time ,attendnace_status,em_name    
        // FROM
        // 	mv_attendance_marking_details
        // LEFT JOIN  co_employee_master ON mv_attendance_marking_details.driver_id = co_employee_master.em_id

   

        pool.query(
            `
             SELECT 
        	driver_id ,atendnace_time ,attendnace_status,em_name    
        FROM
        	mv_attendance_marking_details
        LEFT JOIN  co_employee_master ON mv_attendance_marking_details.driver_id = co_employee_master.em_id

            `,
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getTodayAttendaceReport: (data, callBack) => {
        //     SELECT 
        //     em_name,
        //     driver_id ,atendnace_time ,attendnace_status,em_name
        //  FROM 
        //  mv_attendance_marking_details
        // LEFT JOIN  
        //      co_employee_master ON mv_attendance_marking_details.driver_id = co_employee_master.em_id
        // WHERE 
        //   DATE(mv_attendance_marking_details.create_date) = ?
        pool.query(
            `
                 SELECT 
            em_name,
            driver_id ,atendnace_time ,attendnace_status,em_name
         FROM 
         mv_attendance_marking_details
        LEFT JOIN  
             co_employee_master ON mv_attendance_marking_details.driver_id = co_employee_master.em_id
        WHERE 
          DATE(mv_attendance_marking_details.create_date) = ?
  
            `,
            [
                data.currentDate
            ],
            (error, results, feilds) => {

                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    getAttendaceBetweenDate: (data, callBack) => {
        //         SELECT 
        //         ROW_NUMBER() OVER () as slno,
        //     em_name,
        //    driver_id ,atendnace_time ,attendnace_status,em_name
        // FROM
        //     mv_attendance_marking_details
        // LEFT JOIN  
        //     co_employee_master ON mv_attendance_marking_details.driver_id = co_employee_master.em_id
        // WHERE
        // DATE(mv_attendance_marking_details.atendnace_time) BETWEEN ? AND ?

        pool.query(
            `

             SELECT 
                ROW_NUMBER() OVER () as slno,
            em_name,
           driver_id ,atendnace_time ,attendnace_status,em_name
        FROM
            mv_attendance_marking_details
        LEFT JOIN  
            co_employee_master ON mv_attendance_marking_details.driver_id = co_employee_master.em_id
        WHERE
        DATE(mv_attendance_marking_details.atendnace_time) BETWEEN ? AND ?
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
    getselectedEmployee: (data, callBack) => {
        //         SELECT 
        //         ROW_NUMBER() OVER () as slno,
        //     em_name,
        //    driver_id ,atendnace_time ,attendnace_status,em_name
        // FROM
        //     mv_attendance_marking_details
        // LEFT JOIN  
        //     co_employee_master ON mv_attendance_marking_details.driver_id = co_employee_master.em_id
        // WHERE driver_id = ?

        pool.query(
            `
    
                     SELECT 
                ROW_NUMBER() OVER () as slno,
            em_name,
           driver_id ,atendnace_time ,attendnace_status,em_name
        FROM
            mv_attendance_marking_details
        LEFT JOIN  
            co_employee_master ON mv_attendance_marking_details.driver_id = co_employee_master.em_id
        WHERE driver_id = ?
`,
            [
                data.driver_id
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getdriverDropdownReport: (callBack) => {
        pool.query(
            `
           SELECT DISTINCT
    em_name,
    emp_id
FROM
    mv_driver_attendnace_marking
LEFT JOIN
    co_employee_master ON mv_driver_attendnace_marking.emp_id = co_employee_master.em_id;

            `,
            [],
            (error, results, feilds) => {

                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
}





