const { pool } = require('../../config/database')
module.exports = {
    getAssetBasedOnLocation: (data, callback) => {
        pool.query(
            `select
            item_name,am_item_map_slno,
            am_item_name_creation.item_creation_slno,
            item_deptsec_slno,     co_department_mast.dept_name,  
         am_custodian_department.am_custodian_name,
            am_item_name_creation.item_name,
            co_deptsec_mast.sec_name,
             item_asset_no,
            item_asset_no_only
            from am_asset_item_map_master
            left join co_department_mast on co_department_mast.dept_id=am_asset_item_map_master.item_dept_slno
            left join co_deptsec_mast on co_deptsec_mast.sec_id =am_asset_item_map_master.item_deptsec_slno
            left join am_item_name_creation on am_item_name_creation.item_creation_slno=am_asset_item_map_master.item_creation_slno
          left join am_custodian_department on am_custodian_department.am_custodian_slno=am_asset_item_map_master.item_custodian_dept
            where am_asset_item_map_master.item_asset_no=? and am_asset_item_map_master.item_asset_no_only=?`,
            [
                data.item_asset_no,
                data.item_asset_no_only
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getAssetLocationDetails: (data, callback) => {
        pool.query(
            `select 
            am_item_map_slno,
            item_creation_slno, 
            item_dept_slno, 
            item_deptsec_slno,
            item_room_slno,
            item_subroom_slno, 
            item_rack_slno
            from
            am_asset_item_map_master
            where
            item_create_status=1
            and
            am_item_map_slno=?`,
            [
                data.am_item_map_slno
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    getArrayOfAssetLocationDetails: (data, callback) => {
        pool.query(
            `SELECT 
                am_item_map_slno,
                item_creation_slno, 
                item_dept_slno, 
                item_deptsec_slno,
                item_room_slno,
                item_subroom_slno, 
                item_rack_slno
            FROM
                am_asset_item_map_master
            WHERE
                item_create_status = 1
                AND am_item_map_slno IN (?)`,
            [data],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },


    transferDepartment: (data, callback) => {

        pool.query(
            `UPDATE am_asset_item_map_master
            SET item_dept_slno=?,
            item_deptsec_slno=?,
            item_room_slno=?,
            item_subroom_slno=?
            WHERE  am_item_map_slno=?`,
            [
                data.item_dept_slno,
                data.item_deptsec_slno,
                data.item_room_slno,
                data.item_subroom_slno,
                data.am_item_map_slno
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },


    updateTransLog: (data, callback) => {
        pool.query(
            `UPDATE am_asset_transfer_log
            SET
            am_trans_from_dept=?,
            am_trans_from_dept_sec=?,
            am_trans_from_room=?,
            am_trans_from_subroom=?,
            am_custodian_trans_status=?,
            transfer_user=?
            WHERE  am_asset_log_slno=?`,
            [
                data.am_trans_from_dept,
                data.am_trans_from_dept_sec,
                data.am_trans_from_room,
                data.am_trans_from_subroom,
                data.am_custodian_trans_status,
                data.transfer_user,
                data.am_asset_log_slno
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    getTransferHistory: (sql, params, callback) => {
        pool.query(sql, params, (error, results) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        });
    },

    CustodianAssetTransfer: (data, callback) => {
        const query = `
            UPDATE am_asset_item_map_master
            SET item_dept_slno = ?, 
                item_deptsec_slno = ?, 
                item_room_slno = ?, 
                item_subroom_slno = ?
            WHERE am_item_map_slno = ?
        `;

        pool.getConnection((err, connection) => {
            if (err) {
                return callback(err);
            }

            connection.beginTransaction((transErr) => {
                if (transErr) {
                    connection.release();
                    return callback(transErr);
                }

                const promises = data.map((params) => {
                    return new Promise((resolve, reject) => {
                        connection.query(query, params, (error, results) => {
                            if (error) {
                                return reject(error);
                            }
                            resolve(results);
                        });
                    });
                });

                Promise.all(promises)
                    .then((results) => {
                        connection.commit((commitErr) => {
                            connection.release();
                            if (commitErr) {
                                return callback(commitErr);
                            }
                            callback(null, results);
                        });
                    })
                    .catch((error) => {
                        connection.rollback(() => {
                            connection.release();
                            callback(error);
                        });
                    });
            });
        });
    },

    AssetTransfer: (data, callback) => {
        pool.query(
            `UPDATE am_asset_item_map_master
            SET item_dept_slno = ?, 
                item_deptsec_slno = ?, 
                item_room_slno = ?, 
                item_subroom_slno = ?
            WHERE am_item_map_slno = ?`,
            [
                data.item_dept_slno,
                data.item_deptsec_slno,
                data.item_room_slno,
                data.item_subroom_slno,
                data.am_item_map_slno
            ],
            (error, results) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    // InsertTransferDataInMaster: (data, callback) => {
    //     pool.query(
    //         `INSERT INTO am_asset_transfer_master
    //       ( 
    //         transfrd_dept,
    //         transfrd_dept_sec,
    //         transfrd_room,
    //         transfrd_sub_room,
    //         transfrd_employee,           
    //         transfrd_type,
    //         transfrd_from_dept,
    //         transfrd_from_dept_sec,
    //         transfrd_from_room,
    //         transfrd_from_sub_room
    //       )
    //       VALUES(?,?,?,?,?,?,?,?,?,?)`,
    //         [
    //             data.item_dept_slno,
    //             data.item_deptsec_slno,
    //             data.item_room_slno,
    //             data.item_subroom_slno,
    //             data.transfer_user,
    //             data.am_custodian_trans_status,
    //             data.am_trans_from_dept,
    //             data.am_trans_from_dept_sec,
    //             data.am_trans_from_room,
    //             data.am_trans_from_subroom
    //         ],

    //         (error, results, fields) => {
    //             if (error) {
    //                 return callback(error);
    //             }
    //             return callback(null, results);
    //         }
    //     );
    // },

    // InsertTransferDataInMaster: (data, callback) => {
    //     const query = `
    //         INSERT INTO am_asset_transfer_master
    //         (
    //             transfrd_dept,
    //             transfrd_dept_sec,
    //             transfrd_room,
    //             transfrd_sub_room,
    //             transfrd_employee,         
    //             transfrd_type,
    //             transfrd_from_dept,
    //             transfrd_from_dept_sec,
    //             transfrd_from_room,
    //             transfrd_from_sub_room
    //         )
    //         VALUES ?
    //     `;
    //     pool.query(query, [data], (error, results, fields) => {
    //         if (error) {
    //             return callback(error);
    //         }
    //         return callback(null, results);
    //     });
    // },


    InsertTransferMaster: (data) => {
        return new Promise((resolve, reject) => {



            const query = `
                INSERT INTO am_asset_transfer_master
                (
                    transfrd_dept,
                    transfrd_dept_sec,
                    transfrd_room,
                    transfrd_sub_room,
                    transfrd_employee,
                    transfrd_date,
                    transfrd_type,
                    transfrd_from_dept,
                    transfrd_from_dept_sec,
                    transfrd_from_room,
                    transfrd_from_sub_room
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;
            const values = [
                data.transfrd_dept,
                data.transfrd_dept_sec,
                data.transfrd_room,
                data.transfrd_sub_room,
                data.transfrd_employee,
                data.transfrd_date,
                data.transfrd_type,
                data.transfrd_from_dept,
                data.transfrd_from_dept_sec,
                data.transfrd_from_room,
                data.transfrd_from_sub_room
            ];

            pool.query(query, values, (error, results) => {



                if (error) {
                    return reject(error);
                }
                return resolve(results.insertId);
            });
        });
    },

    InsertTransferDetails: (data) => {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO am_asset_transfer_detail
                (                
                    transfr_mast_slno, 
                    asset_item_map_slno
                    
                )
                VALUES ?
            `;
            const values = data.map(detail => [
                detail.transfr_mast_slno,
                detail.asset_item_map_slno
            ]);

            pool.query(query, [values], (error, results) => {
                if (error) {
                    return reject(error);
                }
                return resolve(results);
            });
        });
    },

    UpdateAssetData: (data) => {
        return new Promise((resolve, reject) => {
            const query = `
                UPDATE am_asset_item_map_master
                SET 
                    item_dept_slno = ?, 
                    item_deptsec_slno = ?, 
                    item_room_slno = ?, 
                    item_subroom_slno = ?,
                    asset_in_stock=?
                WHERE am_item_map_slno = ?
            `;

            const values = [
                data.item_dept_slno,
                data.item_deptsec_slno,
                data.item_room_slno,
                data.item_subroom_slno,
                data.asset_in_stock,
                data.am_item_map_slno
            ];

            pool.query(query, values, (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    },

    getcustodianTransferhistory: (sql, params, callback) => {
        pool.query(sql, params, (error, results) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        });
    },
    getTransferDetail: (data, callBack) => {
        pool.query(
            `select
            transfer_detail_slno,
            transfr_mast_slno,
            asset_item_map_slno,
            item_name,
            item_asset_no,
            item_asset_no_only
            from
            am_asset_transfer_detail
            left join am_asset_item_map_master on am_asset_item_map_master.am_item_map_slno=am_asset_transfer_detail.asset_item_map_slno
            left join am_item_name_creation on am_item_name_creation.item_creation_slno = am_asset_item_map_master.item_creation_slno
            where
            transfr_mast_slno=?`,

            [
                data.transfr_mast_slno

            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getAssetOnSection: (data, callback) => {
        pool.query(
            `select
            am_item_map_slno,
            category_name,
            item_name,
            item_asset_no,
            item_asset_no_only,
            item_custodian_dept,
            item_deptsec_slno         
            from
            am_asset_item_map_master
            LEFT JOIN am_item_name_creation  ON am_item_name_creation.item_creation_slno = am_asset_item_map_master.item_creation_slno
            LEFT JOIN am_category  ON am_category.category_slno = am_item_name_creation.item_category_slno
            where
            item_custodian_dept=?
            and
            item_deptsec_slno=?
            and
            item_create_status=1`,
            [
                data.item_custodian_dept,
                data.item_deptsec_slno
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
