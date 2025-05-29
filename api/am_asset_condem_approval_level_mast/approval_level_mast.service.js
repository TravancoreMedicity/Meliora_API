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

                // Step 1: Insert into am_condem_approval_level_master
                connection.query(
                    `INSERT INTO am_condem_approval_level_master 
                     (level_no, level_name, level_status, create_user) 
                     VALUES (?, ?, ?, ?)`,
                    [
                        data.level_no,
                        data.level_name,
                        data.level_status,
                        data.create_user
                    ],
                    (error, results) => {
                        if (error) {
                            return connection.rollback(() => {
                                connection.release();
                                return callback(error);
                            });
                        }

                        // Capture the auto-incremented primary key (level_slno)
                        const levelSlno = results.insertId;
                        // Step 2: Get the latest level_no (or use data.level_no if it's already known)
                        connection.query(
                            `SELECT level_no 
                             FROM am_condem_approval_level_master 
                             ORDER BY level_no DESC LIMIT 1`,
                            [],
                            (err, rows) => {
                                if (err) {
                                    return connection.rollback(() => {
                                        connection.release();
                                        return callback(err);
                                    });
                                }

                                const levelNo = rows[0].level_no;
                                // Step 3: Alter the table dynamically
                                const alterQuery = `
                                    ALTER TABLE am_condemnation_master
                                    ADD COLUMN level_${levelNo}_status INT,
                                    ADD COLUMN level_${levelNo}_name VARCHAR(100),
                                    ADD COLUMN level_${levelNo}_empl VARCHAR(50),
                                    ADD COLUMN level_${levelNo}_remarks VARCHAR(100),
                                    ADD COLUMN level_${levelNo}_appr_reject_date DATETIME;
                                `;

                                connection.query(alterQuery, (alterErr) => {
                                    if (alterErr) {
                                        return connection.rollback(() => {
                                            connection.release();
                                            return callback(alterErr);
                                        });
                                    }

                                    // Step 4: Insert into menu_master
                                    const menuQuery = `
                                        INSERT INTO menu_master 
                                        (menu_name, menu_module_slno, sub_module_slno, menu_status, create_user) 
                                        VALUES (?, ?, ?, ?, ?)
                                    `;
                                    const menuName = `Condemnation Approval Level ${levelNo}`;
                                    connection.query(
                                        menuQuery,
                                        [menuName, 23, 23, 1, 1],
                                        (menuErr, menuResult) => {
                                            if (menuErr) {
                                                return connection.rollback(() => {
                                                    connection.release();
                                                    return callback(menuErr);
                                                });
                                            }

                                            // Step 5: Update am_condem_approval_level_master with menu_slno from menu_master
                                            const updateQuery = `
                                                UPDATE am_condem_approval_level_master 
                                                SET menu_slno = ? 
                                                WHERE level_slno = ?
                                            `;
                                            connection.query(
                                                updateQuery,
                                                [menuResult.insertId, levelSlno],
                                                (updateErr, updateResult) => {
                                                    if (updateErr) {
                                                        return connection.rollback(() => {
                                                            connection.release();
                                                            return callback(updateErr);
                                                        });
                                                    }

                                                    // Commit transaction if all steps succeed
                                                    connection.commit(commitErr => {
                                                        if (commitErr) {
                                                            return connection.rollback(() => {
                                                                connection.release();
                                                                return callback(commitErr);
                                                            });
                                                        }
                                                        connection.release();
                                                        return callback(null, {
                                                            levelInsertResult: results,
                                                            menuInsertResult: menuResult,
                                                            updateResult: updateResult
                                                        });
                                                    });
                                                }
                                            );
                                        }
                                    );
                                });
                            }
                        );
                    }
                );
            });
        });
    },

    viewCondemnationLevel: (callback) => {
        pool.query(
            `SELECT 
            level_slno,
            level_no,
            level_name, 
            level_status,
            if(level_status=1,'Yes','No')status
            FROM
            am_condem_approval_level_master`, [],
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
            edit_user=?       
            WHERE 
            level_slno=?`,

            [

                data.level_no,
                data.level_name,
                data.level_status,
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
    getCondemnationApprovalRights: (data, callBack) => {
        pool.query(
            `select 
            mod_grp_user_slno,user_grp_name,
            level_no,
            level_name,
            user_group_rights.menu_slno,
            em_name,
            mod_grp_name,
            emp_slno,
            module_group_user_rights.mod_grp_slno,
            user_group_rights.user_group_slno,
            co_department_mast.dept_name    
            from  module_group_user_rights
            left join co_department_mast on co_department_mast.dept_id=module_group_user_rights.dept_slno
            left join co_deptsec_mast on co_deptsec_mast.sec_name=module_group_user_rights.deptsec_slno
            left join co_employee_master on co_employee_master.em_id=module_group_user_rights.emp_slno
            left join module_group_mast on module_group_mast.mod_grp_slno=module_group_user_rights.mod_grp_slno
            left join user_group_mast on user_group_mast.user_grp_slno=module_group_user_rights.user_group_slno
            left join user_group_rights on user_group_rights.user_group_slno=user_group_mast.user_grp_slno
            left join am_condem_approval_level_master on am_condem_approval_level_master.menu_slno=user_group_rights.menu_slno
            where emp_slno=?
            and
            user_group_rights.module_slno=23
            and 
            user_group_rights.sub_module_slno=23
            and
            menu_view=1
            `,
            [
                data.empid

            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getCondemnationAllDetails: (data, callBack) => {
        pool.query(
            `SELECT * FROM am_condemnation_master where condem_mast_slno=?`,
            [
                data.condemMastslno

            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },


}