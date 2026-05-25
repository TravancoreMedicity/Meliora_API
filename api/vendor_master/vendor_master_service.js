const { pool } = require('../../config/database');
module.exports = {
    // InsertVendors: (data, callback) => {
    //     pool.query(
    //         `INSERT INTO vendor_master
    //         (
    //           vendor_name, vendor_regno,vendor_gst, vendor_address, vendor_mob_first, vendor_mob_second, vendor_email, vendor_status, create_user
    //            )
    //             VALUES(?,?,?,?,?,?,?,?,?)`,
    //         [
    //             data.vendor_name,
    //             data.vendor_regno,
    //             data.vendor_gst,
    //             data.vendor_address,
    //             data.vendor_mob1,
    //             data.vendor_mob2,
    //             data.vendor_email,
    //             data.vendor_status,
    //             data.create_user,
    //         ],
    //         (error, results, fields) => {
    //             if (error) {
    //                 return callback(error);
    //             }
    //             return callback(null, results);
    //         }
    //     );
    // },
    // checkInsertVal: (data, callBack) => {
    //     pool.query(
    //         `SELECT vendor_regno
    //         FROM vendor_master
    //         WHERE vendor_regno=? `,
    //         [
    //             data.vendor_regno
    //         ],
    //         (error, results, feilds) => {
    //             if (error) {
    //                 return callBack(error)
    //             }
    //             return callBack(null, results)
    //         }
    //     )
    // },


    InsertVendors: (data, callback) => {
        pool.query(
            `INSERT INTO vendor_master
            (
                vendor_name,
                vendor_regno,
                vendor_gst,
                vendor_address,
                vendor_mob_first,
                vendor_mob_second,
                vendor_email,
                vendor_status,
                create_user
            )
            VALUES (?,?,?,?,?,?,?,?,?)`,
            [
                data.vendor_name,
                data.vendor_regno,
                data.vendor_gst,
                data.vendor_address,
                data.vendor_mob1,
                data.vendor_mob2,
                data.vendor_email,
                data.vendor_status,
                data.create_user
            ],
            (error, results) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    checkInsertVal: (data, callback) => {
        pool.query(
            `SELECT vendor_regno
             FROM vendor_master
             WHERE vendor_regno = ?`,
            [data.vendor_regno],
            (error, results) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getVendor: (callBack) => {
        pool.query(`
           select 
            vendor_slno, vendor_name, vendor_regno, vendor_address,vendor_gst,vendor_mob_first, vendor_mob_second, vendor_email, vendor_status,if(vendor_status = 1 ,'Yes','No') status from vendor_master
            `,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    updateVendors: (data, callBack) => {
        pool.query(
            `UPDATE vendor_master 
                SET vendor_name=?,
                 vendor_regno=?,
                 vendor_gst=?,
                 vendor_address=?,
                 vendor_mob_first=?,
                 vendor_mob_second=?,
                 vendor_email=?,
                 vendor_status=?,
                 edit_user=?
                WHERE vendor_slno = ?`,
            [
                data.vendor_name,
                data.vendor_regno,
                data.vendor_gst,
                data.vendor_address,
                data.vendor_mob1,
                data.vendor_mob2,
                data.vendor_email,
                data.vendor_status,
                data.edit_user,
                data.vendor_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    inactiveRoomtype: (data, callBack) => {
        pool.query(
            `UPDATE  room_type  SET rmc_status=0 WHERE rmc_type = ?`,
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
    getRoomoracle: (callBack) => {
        pool.query(
            `SELECT rt_code,
            rtc_desc
            FROM ora_roomtype `,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
}