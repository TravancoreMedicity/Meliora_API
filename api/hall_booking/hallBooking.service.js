const { pool } = require('../../config/database')
module.exports = {
    hallbookingInsert: (data, callback) => {
        pool.query(
            `INSERT INTO hall_booking
            (
                h_book_event,
                h_book_attendees,
                h_booking_reason,
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
                VALUES(?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.h_book_event,
                data.h_book_attendees,
                data.h_booking_reason,
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
            `SELECT h_book_slno,h_book_event,h_book_attendees,h_booking_reason,h_book_startdatetime,h_book_enddatetime,
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
                h_booking_reason=?,
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
                data.h_booking_reason,
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
    gethallnameSlno: (callBack) => {
        pool.query(`select hall_slno,hall_name from hall_master`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    HalldeptApproval: (data, callback) => {
        pool.query(`insert into h_booking_approval
        (            h_booking_slno,
            is_incharge_req,
            is_hod_req,
            is_ceo_req,
            is_ceo_approved        
        )
        values(?,?,?,?,?)`,
            [
                data.h_booking_slno,
                data.is_incharge_req,
                data.is_hod_req,
                data.is_ceo_req,
                data.is_ceo_approved
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    getHallBookingApproval: (callBack) => {
        pool.query(
            `select h_approval_slno,h_book_slno,h_book_attendees,h_booking_reason,h_book_event,is_hod_req,is_incharge_req,h_book_startdatetime,h_book_enddatetime,
            case when is_icharge_approve = 1 then 'yes'  when is_icharge_approve = 0 then 'no' else 'not updated' end as is_icharge_approves, 
            hall_name,
            case when h_incharge_remark = '' then 'not updated' else h_incharge_remark end as h_incharge_remark,
            incharge_approved_date,h_booking_slno,
            is_icharge_approve,
            case when is_hod_approve = 1 then 'yes' when is_hod_approve = 0 then 'no' else 'not updated' end as is_hod_approves,is_hod_approve,
            hod_remark,hod_approved_date,ceo_remark,ceo_approved_date,
            is_ceo_approved,
            case when is_ceo_approved = 1 then 'yes' when is_ceo_approved = 0 then 'no' else 'not updated' end as  is_ceo_approveds
            from hall_booking
            left join h_booking_approval on hall_booking.h_book_slno = h_booking_approval.h_booking_slno
            left join hall_master on hall_booking.h_book_hall = hall_master.hall_slno`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    updateCeoApproval: (data, callback) => {
        pool.query(
            `update h_booking_approval
            set 
            is_ceo_approved=?,
            ceo_remark =?,
            ceo_approved_date =?,
            ceo_user =?
            where h_approval_slno=?`,
            [
                data.is_ceo_approved,
                data.ceo_remark,
                data.ceo_approved_date,
                data.ceo_user,
                data.h_approval_slno
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    updateInchargeaproval: (data, callback) => {
        pool.query(
            `update h_booking_approval 
            set h_incharge_remark =?,
            is_icharge_approve =?,
            incharge_approved_date=?,
            incharge_user =?
            where h_booking_slno=?`,
            [

                data.h_incharge_remark,
                data.is_icharge_approve,
                data.incharge_approved_date,
                data.incharge_user,
                data.h_booking_slno
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    updatehodApproval: (data, callback) => {
        pool.query(
            `update h_booking_approval 
            set is_hod_approve =?,
            hod_remark =?,
            hod_approved_date =?,
            hod_user =?
            where h_booking_slno=?`,
            [
                data.is_hod_approve,
                data.hod_remark,
                data.hod_approved_date,
                data.hod_user,
                data.h_booking_slno
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },


    gethallbookslno: (id, callBack) => {
        pool.query(
            `select h_booking_slno from h_booking_approval
            where h_approval_slno = ?`,
            [
                id
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },



}