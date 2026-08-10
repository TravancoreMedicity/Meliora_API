const { pool } = require('../../config/database')
module.exports = {

    ItemMastUpdate: (data, callback) => {
        pool.query(
            `UPDATE am_item_name_creation SET 
            image_status=1
            WHERE 
            item_creation_slno=?`,
            [
                data.item_creation_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    InsertFileDetails: (data, callback) => {
        pool.query(
            `UPDATE am_category SET 
            mime_type=?,
            file_name=?
            WHERE 
            category_slno=?`,
            [
                data.mime_type,
                data.file_name,
                data.category_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    getMedicineRepAndToken: (id, callback) => {
        pool.query(
            `SELECT tokenid, medicalrepid FROM indent_medicine WHERE medicine_id = ?`,
            [id],
            (error, results) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    insertCertificatesAndOtherDetails: (data, callback) => {
        pool.getConnection((connErr, connection) => {
            if (connErr) {
                return callback(connErr);
            }
            connection.beginTransaction(txErr => {
                if (txErr) {
                    connection.release();
                    return callback(txErr);
                }
                
                const commitTx = () => {
                    connection.commit(commitErr => {
                        if (commitErr) {
                            return connection.rollback(() => {
                                connection.release();
                                return callback(commitErr);
                            });
                        }
                        connection.release();
                        return callback(null, { success: true });
                    });
                };
                
                const insertOthers = () => {
                    if (data.otherFiles && data.otherFiles.length > 0) {
                        connection.query(
                            `INSERT INTO indent_otherdetails 
                             (indent_medicine_slno, path, filename, create_date, update_date, edit_status) 
                             VALUES ?`,
                            [data.otherFiles],
                            (err, res) => {
                                if (err) {
                                    return connection.rollback(() => {
                                        connection.release();
                                        return callback(err);
                                    });
                                }
                                commitTx();
                            }
                        );
                    } else {
                        commitTx();
                    }
                };
                
                if (data.certFiles && data.certFiles.length > 0) {
                    const processCertFiles = (index) => {
                        if (index >= data.certFiles.length) {
                            return insertOthers();
                        }
                        
                        const cf = data.certFiles[index];
                        const medicine_id = cf[0];
                        const upload_file_id = cf[5];
                        
                        connection.query(
                            `SELECT certificates_details_slno FROM indent_certificates_details WHERE indent_medicine_slno = ? AND upload_file_id = ?`,
                            [medicine_id, upload_file_id],
                            (selErr, rows) => {
                                if (selErr) {
                                    return connection.rollback(() => {
                                        connection.release();
                                        return callback(selErr);
                                    });
                                }
                                
                                if (rows && rows.length > 0) {
                                    // Update existing row
                                    const slno = rows[0].certificates_details_slno;
                                    connection.query(
                                        `UPDATE indent_certificates_details 
                                         SET certificates_edit_status = ?, filestatus = ?, tokenid = ?, medicalrepid = ?, path = ?, filename = ?, update_date = ? 
                                         WHERE certificates_details_slno = ?`,
                                        [cf[1], cf[2], cf[3], cf[4], cf[6], cf[7], cf[9], slno],
                                        (updErr) => {
                                            if (updErr) {
                                                return connection.rollback(() => {
                                                    connection.release();
                                                    return callback(updErr);
                                                });
                                            }
                                            processCertFiles(index + 1);
                                        }
                                    );
                                } else {
                                    // Insert new row
                                    connection.query(
                                        `INSERT INTO indent_certificates_details 
                                         (indent_medicine_slno, certificates_edit_status, filestatus, tokenid, medicalrepid, upload_file_id, path, filename, create_date, update_date) 
                                         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                                        cf,
                                        (insErr) => {
                                            if (insErr) {
                                                return connection.rollback(() => {
                                                    connection.release();
                                                    return callback(insErr);
                                                });
                                            }
                                            processCertFiles(index + 1);
                                        }
                                    );
                                }
                            }
                        );
                    };
                    
                    processCertFiles(0);
                } else {
                    insertOthers();
                }
            });
        });
    },
}