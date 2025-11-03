const { pool } = require('../../config/database')
module.exports = {
   

insertLevel: (data, callback) => {
    pool.getConnection((connErr, connection) => {
        if (connErr) {
            return callback(connErr);
        }

        connection.beginTransaction(txErr => {
            if (txErr) {
                connection.release();
                return callback(txErr);
            }

            // Step 1: Insert into level master
            connection.query(
                `INSERT INTO am_condem_approval_level_master 
                 (level_no, level_name, level_status, emp_id, create_user) 
                 VALUES (?, ?, ?, ?, ?)`,
                [
                    data.level_no,
                    data.level_name,
                    data.level_status,
                    data.emp_id,
                    data.create_user
                ],
                (error, results) => {
                    if (error) {
                        return connection.rollback(() => {
                            connection.release();
                            return callback(error);
                        });
                    }

                    // Step 2: Use level_no directly for detail insert
                    connection.query(
                        `INSERT INTO am_condemnation_level_detail 
                         (level_no, levels_approved_for_view, levels_approved_for_approve) 
                         VALUES (?, ?, ?)`,
                        [
                            data.level_no,
                            JSON.stringify(data.levels_approved_for_view || []),
                            JSON.stringify(data.levels_approved_for_approve || [])
                        ],
                        (detailErr, detailRes) => {
                            if (detailErr) {
                                return connection.rollback(() => {
                                    connection.release();
                                    return callback(detailErr);
                                });
                            }

                            // Commit transaction
                            connection.commit(commitErr => {
                                if (commitErr) {
                                    return connection.rollback(() => {
                                        connection.release();
                                        return callback(commitErr);
                                    });
                                }

                                connection.release();
                                return callback(null, { level_no: data.level_no });
                            });
                        }
                    );
                }
            );
        });
    });
},


    

    // insertLevel: (data, callback) => {
       
    //     pool.getConnection((connErr, connection) => {
    //         if (connErr) {
    //             return callback(connErr);
    //         }    
    //         connection.beginTransaction(txErr => {
    //             if (txErr) {
    //                 connection.release();
    //                 return callback(txErr);
    //             }
    //             connection.query(
    //                 `INSERT INTO am_condem_approval_level_master 
    //                  (level_no, level_name, level_status,emp_id, create_user ) 
    //                  VALUES (?, ?, ?, ?)`,
    //                 [
    //                     data.level_no,
    //                     data.level_name,
    //                     data.level_status,
    //                     data.emp_id,
    //                     data.create_user,
                     
    //                 ],
    //                 (error, results) => {
    //                     if (error) {
    //                         return connection.rollback(() => {
    //                             connection.release();
    //                             return callback(error);
    //                         });
    //                     }    
    //                     const levelSlno = results.insertId;    
    //                     // Step 2: Insert into am_condemnation_level_detail
    //                     connection.query(
    //                         `INSERT INTO am_condemnation_level_detail 
    //                          (level_slno, levels_approved_for_view, levels_approved_for_approve) 
    //                          VALUES (?, ?, ?)`,
    //                         [
    //                             levelSlno,
    //                             JSON.stringify(data.levels_approved_for_view || []),
    //                             JSON.stringify(data.levels_approved_for_approve || [])
    //                         ],
    //                         (detailErr, detailRes) => {
    //                             if (detailErr) {
    //                                 return connection.rollback(() => {
    //                                     connection.release();
    //                                     return callback(detailErr);
    //                                 });
    //                             }
    
    //                             // Step 3: Get latest level_no
    //                             connection.query(
    //                                 `SELECT level_no 
    //                                  FROM am_condem_approval_level_master 
    //                                  ORDER BY level_no DESC LIMIT 1`,
    //                                 [],
    //                                 (err, rows) => {
    //                                     if (err) {
    //                                         return connection.rollback(() => {
    //                                             connection.release();
    //                                             return callback(err);
    //                                         });
    //                                     }
    
    //                                     const levelNo = rows[0].level_no;    
    //                                     // Step 4: Alter table dynamically
    //                                     const alterQuery = `
    //                                         ALTER TABLE am_condemnation_master
    //                                         ADD COLUMN level_${levelNo}_status INT,
    //                                         ADD COLUMN level_${levelNo}_name VARCHAR(100),
    //                                         ADD COLUMN level_${levelNo}_empl VARCHAR(50),
    //                                         ADD COLUMN level_${levelNo}_remarks VARCHAR(100),
    //                                         ADD COLUMN level_${levelNo}_appr_reject_date DATETIME;
    //                                     `;
    
    //                                     connection.query(alterQuery, (alterErr) => {
    //                                         if (alterErr) {
    //                                             return connection.rollback(() => {
    //                                                 connection.release();
    //                                                 return callback(alterErr);
    //                                             });
    //                                         }
    
    //                                         // Step 5: Insert into menu_master
    //                                         const menuQuery = `
    //                                             INSERT INTO menu_master 
    //                                             (menu_name, menu_module_slno, sub_module_slno, menu_status, create_user) 
    //                                             VALUES (?, ?, ?, ?, ?)
    //                                         `;
    //                                         const menuName = `Condemnation Approval Level ${levelNo}`;
    //                                         connection.query(
    //                                             menuQuery,
    //                                             [menuName, 23, 23, 1, 1],
    //                                             (menuErr, menuResult) => {
    //                                                 if (menuErr) {
    //                                                     return connection.rollback(() => {
    //                                                         connection.release();
    //                                                         return callback(menuErr);
    //                                                     });
    //                                                 }
    
    //                                                 // Step 6: Update master with menu_slno
    //                                                 const updateQuery = `
    //                                                     UPDATE am_condem_approval_level_master 
    //                                                     SET menu_slno = ? 
    //                                                     WHERE level_slno = ?
    //                                                 `;
    //                                                 connection.query(
    //                                                     updateQuery,
    //                                                     [menuResult.insertId, levelSlno],
    //                                                     (updateErr, updateResult) => {
    //                                                         if (updateErr) {
    //                                                             return connection.rollback(() => {
    //                                                                 connection.release();
    //                                                                 return callback(updateErr);
    //                                                             });
    //                                                         }
    
    //                                                         // Final Step: Commit transaction
    //                                                         connection.commit(commitErr => {
    //                                                             if (commitErr) {
    //                                                                 return connection.rollback(() => {
    //                                                                     connection.release();
    //                                                                     return callback(commitErr);
    //                                                                 });
    //                                                             }
    //                                                             connection.release();
    //                                                             return callback(null, {
    //                                                                 levelInsertResult: results,
    //                                                                 levelDetailResult: detailRes,
    //                                                                 menuInsertResult: menuResult,
    //                                                                 updateResult: updateResult
    //                                                             });
    //                                                         });
    //                                                     }
    //                                                 );
    //                                             }
    //                                         );
    //                                     });
    //                                 }
    //                             );
    //                         }
    //                     );
    //                 }
    //             );
    //         });
    //     });
    // },
    
    viewCondemnationLevel: (callback) => {
        pool.query(    
     
            `SELECT 
                m.level_slno,
                co_employee_master.em_name,
                sec_id,
                co_employee_master.em_id,
                m.level_no,
                m.level_name, 
                m.level_status,
                d.condemn_level_slno,
                IF(m.level_status = 1, 'Yes', 'No') AS status,
                d.levels_approved_for_view,
                d.levels_approved_for_approve,
                GROUP_CONCAT(DISTINCT view_level.level_name) AS approved_for_view_names,
                GROUP_CONCAT(DISTINCT approve_level.level_name) AS approved_for_approve_names
                FROM am_condem_approval_level_master m
                LEFT JOIN am_condemnation_level_detail d 
                    ON d.condemn_level_slno = m.level_slno

                LEFT JOIN JSON_TABLE(d.levels_approved_for_view, '$[*]' 
                    COLUMNS(level_no INT PATH '$')) AS view_json 
                    ON TRUE
                LEFT JOIN am_condem_approval_level_master view_level 
                    ON view_level.level_no = view_json.level_no

                LEFT JOIN co_employee_master  
                    ON co_employee_master.em_id = m.emp_id
                    
                LEFT JOIN co_deptsec_mast  
                    ON co_deptsec_mast.sec_id = co_employee_master.em_dept_section

                LEFT JOIN JSON_TABLE(d.levels_approved_for_approve, '$[*]' 
                    COLUMNS(level_no INT PATH '$')) AS approve_json 
                    ON TRUE
                LEFT JOIN am_condem_approval_level_master approve_level 
                    ON approve_level.level_no = approve_json.level_no

                GROUP BY 
                    m.level_slno, m.level_no, m.level_name, m.level_status, 
                    d.levels_approved_for_view, d.levels_approved_for_approve`
            , [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getActiveCondemnationLevel: (callback) => {
        pool.query(
            `SELECT 
            level_slno,
            level_no as level_num,
            level_name, 
            level_status           
            FROM
            am_condem_approval_level_master
            where level_status=1            
            order by  level_no desc
            limit 1
            `, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },

    updateLevel: (data, callback) => {       

        pool.query(
            `UPDATE am_condem_approval_level_master SET
            level_no=?,
            level_name=?,
            level_status=?,
            emp_id=?,
            edit_user=?
            WHERE 
            level_slno=?`,
            [

                data.level_no,
                data.level_name,
                data.level_status,
                data.emp_id,
                data.edit_user,              
                data.level_slno,

            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    updateLevelDetail: (data, callback) => {
        const levelsView = Array.isArray(data.levels_approved_for_view)
            ? JSON.stringify(data.levels_approved_for_view)
            : data.levels_approved_for_view;
    
        const levelsApprove = Array.isArray(data.levels_approved_for_approve)
            ? JSON.stringify(data.levels_approved_for_approve)
            : data.levels_approved_for_approve;
    
        pool.query(
            `UPDATE am_condemnation_level_detail SET
            levels_approved_for_view = ?,
            levels_approved_for_approve = ?
            WHERE
            condemn_level_slno = ?`,
            [levelsView, levelsApprove, data.condemn_level_slno],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    
    // getCondemnationApprovalRights: (data, callBack) => {
    //     pool.query(
    //         `select
    //         level_slno,
    //         am_condem_approval_level_master.level_no,
    //         level_name,
    //         emp_id,
    //         level_status,
    //         levels_approved_for_view,
    //         levels_approved_for_approve
    //         from am_condem_approval_level_master
    //         left join am_condemnation_level_detail on am_condemnation_level_detail.level_no=am_condem_approval_level_master.level_no
    //         where
    //         level_status = 1
    //         and
    //         emp_id = ?`,
    //         [
    //             data.empid

    //         ],
    //         (error, results, feilds) => {
    //             if (error) {
    //                 return callBack(error);
    //             }
    //             return callBack(null, results);
    //         }
    //     );
    // },

    // getCondemnationAllDetails: (data, callBack) => {
    //     pool.query(
    //         `SELECT * FROM am_condemnation_master where condem_mast_slno=?`,
    //         [
    //             data.condemMastslno

    //         ],
    //         (error, results, feilds) => {
    //             if (error) {
    //                 return callBack(error);
    //             }
    //             return callBack(null, results);
    //         }
    //     );
    // },
    getCondemnActiveApprovalLevel: (callback) => {
        pool.query(
            `SELECT 
             *
            FROM
            am_condem_approval_level_master 
            where level_status = 1
            `, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
}