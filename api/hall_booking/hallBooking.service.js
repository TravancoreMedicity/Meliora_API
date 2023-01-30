const { pool } = require('../../config/database')
module.exports = {
    hallbookingInsert: (data, callback) => {
        pool.query(
            `INSERT INTO hall_booking
            (
                h_book_event,
                h_book_attendees,
                h_book_startdatetime,
                h_book_enddatetime,
                h_book_contno,
                h_book_email,
                h_book_dept,
                h_book_hall,
                h_book_hall_items,
                h_book_catering,
                create_user
               )
                VALUES(?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.h_book_event,
                data.h_book_attendees,
                data.h_book_startdatetime,
                data.h_book_enddatetime,
                data.h_book_contno,
                data.h_book_email,
                data.h_book_dept,
                data.h_book_hall,
                JSON.stringify(data.h_book_hall_items),
                JSON.stringify(data.h_book_catering),
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
    getHallBooking: (callBack) => {
        pool.query(
            `SELECT h_book_slno,h_book_event,h_book_attendees,h_book_startdatetime,h_book_enddatetime,
            h_book_contno,h_book_email,h_book_dept,dept_name,hall_booking.create_user,em_name,h_book_hall,h_book_hall_items,h_book_catering FROM hall_booking 
            LEFT JOIN co_department_mast on hall_booking.h_book_dept=co_department_mast.dept_id
            LEFT JOIN co_employee_master on hall_booking.create_user=co_employee_master.em_id`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    hallbookingUpdate: (data, callback) => {
        pool.query(
            `Update hall_booking SET 
                h_book_event=?,
                h_book_attendees=?,
                h_book_startdatetime=?,
                h_book_enddatetime=?,
                h_book_contno=?,
                h_book_email=?,
                h_book_dept=?,
                h_book_hall=?,
                h_book_hall_items=?,
                h_book_catering=?,
                edit_user=?
                WHERE h_book_slno=?`,
            [
                data.h_book_event,
                data.h_book_attendees,
                data.h_book_startdatetime,
                data.h_book_enddatetime,
                data.h_book_contno,
                data.h_book_email,
                data.h_book_dept,
                data.h_book_hall,
                JSON.stringify(data.h_book_hall_items),
                JSON.stringify(data.h_book_catering),
                data.edit_user,
                data.h_book_slno
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
}