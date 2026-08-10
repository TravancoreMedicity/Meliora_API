const { pool } = require('../../config/database')
const axios = require('axios');
module.exports = {

    getRepData: (callBack) => {
        const query = `
     SELECT 
    im.medicalrep_id,
    im.name,
    im.contactno,
    im.companyId,
    im.departmentId,
    im.userId,
    im.contactno,
    dm.division,
    c.companyname,
    u.disablestatus as status,
    if(u.disablestatus = 1 ,'Blocked','Active')disablestatus
FROM indent_medicalrep im
LEFT JOIN indent_companies c 
    ON c.companies_id = im.companyId
LEFT JOIN indent_division_master dm 
    ON dm.division_slno = im.departmentId
LEFT JOIN indent_users u 
    ON u.users_id = im.userId;`;
        pool.query(query, (error, results) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, results);
        });
    },
    statusUpdate: (data, callBack) => {
        pool.query(
            `UPDATE indent_users 
             SET disablestatus = ? 
             WHERE users_id = ?`,
            [
                data.status,
                data.userId
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    insertMedicalDocs: (data, callback) => {
        pool.getConnection((connErr, connection) => {
            if (connErr) {
                return callback(connErr);
            }
            connection.beginTransaction(txErr => {
                if (txErr) {
                    connection.release();
                    return callback(txErr);
                }

                // Step 1: Insert into indent_tokenregistration
                connection.query(
                    `INSERT INTO indent_tokenregistration 
                     ( appointmentdate, medicalrepid, companyId, departmentId, prefix, created_date, updated_date) 
                     VALUES (?, ?, ?, ?, ?, ?, ?)`,
                    [
                        data.selectedDate || null,
                        data.medicalrep_id || null,
                        data.companyId || null,
                        data.division_id || null,
                        data.prefix || null,
                        new Date(),
                        new Date()
                    ],
                    (tokenErr, tokenRes) => {
                        if (tokenErr) {
                            return connection.rollback(() => {
                                connection.release();
                                return callback(tokenErr);
                            });
                        }

                        const tokenId = tokenRes.insertId;

                        // Step 1.5: Update tokenno field with the newly generated insertId (tokenId)
                        connection.query(
                            `UPDATE indent_tokenregistration SET tokenno = ? WHERE token_id = ?`,
                            [tokenId, tokenId],
                            (updateTokenErr, updateTokenRes) => {
                                if (updateTokenErr) {
                                    return connection.rollback(() => {
                                        connection.release();
                                        return callback(updateTokenErr);
                                    });
                                }

                                // Step 2: Insert into indent_medicine
                                connection.query(
                                    `INSERT INTO indent_medicine 
                                     (medicinename, description, medicalrepid,teamid, status, VerificationStatus, finalstatus, rejectionstatus, tokenid, createdAt, updatedAt, date) 
                                     VALUES ( ?, ?, ?, 1, 1, 0, 0, 0, ?, ?, ?, ?)`,
                                    [
                                        data.medicine_name,
                                        data.description || null,
                                        data.medicalrep_id || null,
                                        tokenId,
                                        new Date(),
                                        new Date(),
                                        new Date()
                                    ],
                                    (error, results) => {
                                        if (error) {
                                            return connection.rollback(() => {
                                                connection.release();
                                                return callback(error);
                                            });
                                        }

                                        const medicineId = results.insertId;

                                        // Step 3: Bulk insert into indent_contents_details if content_rows are provided
                                        if (data?.content_rows && data?.content_rows.length > 0) {
                                            const contentValues = data?.content_rows?.map(row => [
                                                row.name,
                                                row.qty,
                                                medicineId,
                                                new Date(),
                                                new Date(),
                                                0 // edit_status
                                            ]);

                                            connection.query(
                                                `INSERT INTO indent_contents_details 
                                                 (content_name, content_quantity, indent_medicine_slno, create_date, update_date, edit_status) 
                                                 VALUES ?`,
                                                [contentValues],
                                                (err, res) => {
                                                    if (err) {
                                                        return connection.rollback(() => {
                                                            connection.release();
                                                            return callback(err);
                                                        });
                                                    }

                                                    // Step 4: Update indent_date_schedule token_count & total_token_count
                                                    connection.query(
                                                        `UPDATE indent_date_schedule SET token_count = token_count + 1, total_token_count = ? WHERE DATE(schedule_date) = DATE(?)`,
                                                        [tokenId, data.selectedDate],
                                                        (updateErr, updateRes) => {
                                                            if (updateErr) {
                                                                return connection.rollback(() => {
                                                                    connection.release();
                                                                    return callback(updateErr);
                                                                });
                                                            }

                                                            connection.commit(commitErr => {
                                                                if (commitErr) {
                                                                    return connection.rollback(() => {
                                                                        connection.release();
                                                                        return callback(commitErr);
                                                                    });
                                                                }
                                                                connection.release();
                                                                return callback(null, { insertid: medicineId, tokenid: tokenId });
                                                            });
                                                        }
                                                    );
                                                }
                                            );
                                        } else {
                                            // Step 4: Update indent_date_schedule token_count & total_token_count
                                            connection.query(
                                                `UPDATE indent_date_schedule SET token_count = token_count + 1, total_token_count = ? WHERE DATE(schedule_date) = DATE(?)`,
                                                [tokenId, data.selectedDate],
                                                (updateErr, updateRes) => {
                                                    if (updateErr) {
                                                        return connection.rollback(() => {
                                                            connection.release();
                                                            return callback(updateErr);
                                                        });
                                                    }

                                                    connection.commit(commitErr => {
                                                        if (commitErr) {
                                                            return connection.rollback(() => {
                                                                connection.release();
                                                                return callback(commitErr);
                                                            });
                                                        }
                                                        connection.release();
                                                        return callback(null, { insertid: medicineId, tokenid: tokenId });
                                                    });
                                                }
                                            );
                                        }
                                    }
                                );
                            }
                        );
                    }
                );
            });
        });
    },
    getloginRepData: (data, callBack) => {
        pool.query(
            ` SELECT 
    im.medicalrep_id,
    im.name,
    im.contactno,
    im.companyId,
    im.departmentId,
    im.userId,
    dm.division,
    c.companyname,
    u.disablestatus as status,
    if(u.disablestatus = 1 ,'Blocked','Active')disablestatus
FROM indent_medicalrep im
LEFT JOIN indent_companies c 
    ON c.companies_id = im.companyId
LEFT JOIN indent_division_master dm 
    ON dm.division_slno = im.departmentId
LEFT JOIN indent_users u 
    ON u.users_id = im.userId WHERE u.users_id = ?;`,
            [
                data.userId
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getTotalTokenCount: (callBack) => {
        pool.query(
            `SELECT token_slno, token_number, token_status, prefix FROM indent_token`,

            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getBookedTokenCount: (data, callBack) => {
        pool.query(
            `SELECT COUNT(token_id) AS total_booked FROM indent_tokenregistration WHERE DATE(appointmentdate) = DATE(?)`,
            [data.appointmentdate],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getDeptTokenCount: (data, callBack) => {
        pool.query(
            `SELECT COUNT(token_id) AS dept_booked FROM indent_tokenregistration WHERE DATE(appointmentdate) = DATE(?) AND departmentId = ?`,
            [data.appointmentdate, data.departmentId],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getAppointmentsByRepId: (medicalrepid, callBack) => {
        const query = `
            SELECT 
                tr.token_id,
                tr.appointmentdate,
                tr.medicalrepid,
                tr.companyId,
                tr.departmentId,
                tr.tokenno,
                tr.prefix,
                tr.created_date,
                tr.updated_date,
                mr.name AS medicalrep_name,
                c.companyname,
                dm.division AS department_name,
                d.medicinename,
                d.VerificationStatus,
                d.finalstatus
            FROM indent_tokenregistration tr
            LEFT JOIN indent_medicalrep mr ON mr.medicalrep_id = tr.medicalrepid
            LEFT JOIN indent_companies c ON c.companies_id = tr.companyId
            LEFT JOIN indent_division_master dm ON dm.division_slno = tr.departmentId
            LEFT JOIN indent_medicine d on tr.token_id = d.tokenid
            WHERE tr.medicalrepid = ?;
        `;
        pool.query(query, [medicalrepid], (error, results) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, results);
        });
    },


    getAppointmentsByDate: (date, callBack) => {
        const query = `
            SELECT 
                tr.token_id,
                tr.appointmentdate,
                tr.medicalrepid,
                tr.companyId,
                tr.departmentId,
                tr.tokenno,
                tr.prefix,
                tr.created_date,
                tr.updated_date,
                mr.name AS medicalrep_name,
                c.companyname,
                dm.division AS department_name,
                d.medicinename,
                d.VerificationStatus,
                d.finalstatus,
                d.rejectionstatus
            FROM indent_tokenregistration tr
            LEFT JOIN indent_medicalrep mr ON mr.medicalrep_id = tr.medicalrepid
            LEFT JOIN indent_companies c ON c.companies_id = tr.companyId
            LEFT JOIN indent_division_master dm ON dm.division_slno = tr.departmentId
            LEFT JOIN indent_medicine d on tr.token_id = d.tokenid
            WHERE DATE(tr.appointmentdate) = DATE(?);
        `;
        pool.query(query, [date], (error, results) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, results);
        });
    },

    getMedicineByToken: (tokenId, callback) => {
        const sql = `
            SELECT *
            FROM indent_medicine
            WHERE tokenid = ?
        `;
        pool.query(sql, [tokenId], callback);
    },

    getCertificatesByMedicine: (medicineId, callback) => {
        const sql = `
            SELECT *
            FROM indent_certificates_details
            WHERE indent_medicine_slno = ?
        `;
        pool.query(sql, [medicineId], callback);
    },

    getOtherDetailsByMedicine: (medicineId, callback) => {
        const sql = `
            SELECT *
            FROM indent_otherdetails
            WHERE indent_medicine_slno = ?
        `;
        pool.query(sql, [medicineId], callback);
    },

    getContentsByMedicine: (medicineId, callback) => {
        const sql = `
            SELECT *
            FROM indent_contents_details
            WHERE indent_medicine_slno = ?
        `;
        pool.query(sql, [medicineId], callback);
    },

    updateMedicalDocs: (data, callback) => {
        pool.getConnection((err, connection) => {
            if (err) {
                return callback(err);
            }
            connection.beginTransaction(transactionErr => {
                if (transactionErr) {
                    connection.release();
                    return callback(transactionErr);
                }

                // 1. Update medicine details
                connection.query(
                    `UPDATE indent_medicine SET medicinename = ?, description = ?, updatedAt = ? WHERE medicine_id = ?`,
                    [data.medicine_name, data.description, new Date(), data.medicine_id],
                    (updateErr) => {
                        if (updateErr) {
                            return connection.rollback(() => {
                                connection.release();
                                return callback(updateErr);
                            });
                        }

                        // 2. Delete existing contents
                        connection.query(
                            `DELETE FROM indent_contents_details WHERE indent_medicine_slno = ?`,
                            [data.medicine_id],
                            (deleteContentsErr) => {
                                if (deleteContentsErr) {
                                    return connection.rollback(() => {
                                        connection.release();
                                        return callback(deleteContentsErr);
                                    });
                                }

                                // 3. Insert new contents if any
                                const processOtherFilesRemoval = () => {
                                    if (data.removed_other_files && data.removed_other_files.length > 0) {
                                        connection.query(
                                            `DELETE FROM indent_otherdetails WHERE otherdetails_slno IN (?) AND indent_medicine_slno = ?`,
                                            [data.removed_other_files, data.medicine_id],
                                            (deleteOtherErr) => {
                                                if (deleteOtherErr) {
                                                    return connection.rollback(() => {
                                                        connection.release();
                                                        return callback(deleteOtherErr);
                                                    });
                                                }
                                                commitTransaction();
                                            }
                                        );
                                    } else {
                                        commitTransaction();
                                    }
                                };

                                const commitTransaction = () => {
                                    connection.commit(commitErr => {
                                        if (commitErr) {
                                            return connection.rollback(() => {
                                                connection.release();
                                                return callback(commitErr);
                                            });
                                        }
                                        connection.release();
                                        return callback(null, { updateid: data.medicine_id });
                                    });
                                };

                                if (data?.content_rows && data?.content_rows.length > 0) {
                                    const contentValues = data.content_rows.map(row => [
                                        row.name,
                                        row.qty,
                                        data.medicine_id,
                                        new Date(),
                                        new Date(),
                                        0
                                    ]);

                                    connection.query(
                                        `INSERT INTO indent_contents_details (content_name, content_quantity, indent_medicine_slno, create_date, update_date, edit_status) VALUES ?`,
                                        [contentValues],
                                        (insertContentsErr) => {
                                            if (insertContentsErr) {
                                                return connection.rollback(() => {
                                                    connection.release();
                                                    return callback(insertContentsErr);
                                                });
                                            }
                                            processOtherFilesRemoval();
                                        }
                                    );
                                } else {
                                    processOtherFilesRemoval();
                                }
                            }
                        );
                    }
                );
            });
        })
    },

    updateCertificateStatus: (data, callback) => {
        pool.getConnection((err, connection) => {
            if (err) {
                return callback(err);
            }
            connection.beginTransaction(transactionErr => {
                if (transactionErr) {
                    connection.release();
                    return callback(transactionErr);
                }

                connection.query(
                    `UPDATE indent_certificates_details SET filestatus = ? WHERE certificates_details_slno = ?`,
                    [data.filestatus, data.certificates_details_slno],
                    (updateErr, results) => {
                        if (updateErr) {
                            return connection.rollback(() => {
                                connection.release();
                                return callback(updateErr);
                            });
                        }

                        if (data.medicine_id) {
                            connection.query(
                                `SELECT filestatus FROM indent_certificates_details WHERE indent_medicine_slno = ?`,
                                [data.medicine_id],
                                (selectErr, certs) => {
                                    if (selectErr) {
                                        return connection.rollback(() => {
                                            connection.release();
                                            return callback(selectErr);
                                        });
                                    }

                                    let verificationStatus = 0;
                                    const anyRejected = certs.some(c => c.filestatus === 2);
                                    const allApproved = certs.length > 0 && certs.every(c => c.filestatus === 1);

                                    if (anyRejected) {
                                        verificationStatus = 2;
                                    } else if (allApproved) {
                                        verificationStatus = 1;
                                    }

                                    connection.query(
                                        `UPDATE indent_medicine SET VerificationStatus = ? WHERE medicine_id = ?`,
                                        [verificationStatus, data.medicine_id],
                                        (updateMedErr) => {
                                            if (updateMedErr) {
                                                return connection.rollback(() => {
                                                    connection.release();
                                                    return callback(updateMedErr);
                                                });
                                            }

                                            connection.commit(commitErr => {
                                                if (commitErr) {
                                                    return connection.rollback(() => {
                                                        connection.release();
                                                        return callback(commitErr);
                                                    });
                                                }
                                                connection.release();
                                                return callback(null, results);
                                            });
                                        }
                                    );
                                }
                            );
                        } else {
                            connection.commit(commitErr => {
                                if (commitErr) {
                                    return connection.rollback(() => {
                                        connection.release();
                                        return callback(commitErr);
                                    });
                                }
                                connection.release();
                                return callback(null, results);
                            });
                        }
                    }
                );
            });
        });
    },

    updateMedicineRejectionStatus: (data, callback) => {
        pool.query(
            `UPDATE indent_medicine SET rejectionstatus = ?, rejectionReason = ? WHERE medicine_id = ?`,
            [data.rejectionstatus, data.rejectionReason, data.medicine_id],
            (error, results) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    updateMedicineApprovalStatus: (data, callback) => {
        pool.query(
            `UPDATE indent_medicine SET finalstatus = ? WHERE medicine_id = ?`,
            [data.finalstatus, data.medicine_id],
            (error, results) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    updateCommercialDetails: (data, callback) => {
        pool.query(
            `UPDATE indent_medicine SET purchaserate = ?, quotationno = ?, mrp = ?, taxpercentage = ?, offerdetails = ?, indentform = ? WHERE medicine_id = ?`,
            [data.purchaserate, data.quotationno, data.mrp, data.taxpercentage, data.offerdetails, data.indentform, data.medicine_id],
            (error, results) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    getIndentMedicines: (callBack) => {
        const query = `
            SELECT 
                tr.token_id,
                tr.tokenno,
                tr.prefix,
                mr.name AS medicalrepName,
                im.medicinename AS medicineName,
                c.companyname AS company,
                tr.appointmentdate AS appointmentDate,
                im.VerificationStatus AS verificationStatus,
                im.finalstatus,
                im.rejectionstatus,
                  t.tax,
                im.taxpercentage,
                im.offerdetails
            FROM indent_medicine im
            LEFT JOIN indent_tokenregistration tr ON tr.token_id = im.tokenid
            LEFT JOIN indent_medicalrep mr ON mr.medicalrep_id = im.medicalrepid
            LEFT JOIN indent_companies c ON c.companies_id = tr.companyId
            LEFT JOIN indent_tax_master t ON t.tax_id = im.taxpercentage
            ORDER BY im.medicine_id DESC
        `;
        pool.query(query, [], (error, results) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, results);
        });
    },
    getCompanies: (callBack) => {
        const query = `SELECT companies_id, companyname FROM indent_companies ORDER BY companyname ASC`;
        pool.query(query, [], (error, results) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, results);
        });
    },
    getDivisions: (callBack) => {
        const query = `SELECT division_slno, division FROM indent_division_master ORDER BY division ASC`;
        pool.query(query, [], (error, results) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, results);
        });
    },
    insertCompany: (data, callBack) => {
        pool.query(
            `INSERT INTO indent_companies 
            (companyname, companyaddress, licenseno, companyemail, contactno, createdDate, updatedDate) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                data.companyname,
                data.companyaddress,
                data.licenseno,
                data.companyemail,
                data.contactno,
                new Date(),
                new Date()
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    registerMedicalRep: (data, callback) => {
        pool.getConnection((err, connection) => {
            if (err) {
                return callback(err);
            }
            connection.beginTransaction(transactionErr => {
                if (transactionErr) {
                    connection.release();
                    return callback(transactionErr);
                }

                connection.query(
                    `INSERT INTO indent_users 
                     (password, email, usertype, disablestatus, createddate, updateddate, resetPasswordToken, resetPasswordExpires) 
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                    [
                        data.password,
                        data.email,
                        data.usertype || 1,
                        0,
                        new Date(),
                        new Date(),
                        null,
                        null
                    ],
                    (userErr, userRes) => {
                        if (userErr) {
                            return connection.rollback(() => {
                                connection.release();
                                return callback(userErr);
                            });
                        }

                        const userId = userRes.insertId;

                        connection.query(
                            `INSERT INTO indent_medicalrep 
                             (name, contactno, companyId, departmentId, userId, createdDate, updatedDate) 
                             VALUES (?, ?, ?, ?, ?, ?, ?)`,
                            [
                                data.name,
                                data.contactno,
                                data.companyId,
                                data.departmentId,
                                userId,
                                new Date(),
                                new Date()
                            ],
                            (repErr, repRes) => {
                                if (repErr) {
                                    return connection.rollback(() => {
                                        connection.release();
                                        return callback(repErr);
                                    });
                                }

                                connection.commit(commitErr => {
                                    if (commitErr) {
                                        return connection.rollback(() => {
                                            connection.release();
                                            return callback(commitErr);
                                        });
                                    }
                                    connection.release();
                                    return callback(null, { insertid: repRes.insertId, userId: userId });
                                });
                            }
                        );
                    }
                );
            });
        });
    },

    checkMobileExist: (mobileNumber, callback) => {
        pool.query(
            `SELECT medicalrep_id, userId FROM indent_medicalrep WHERE contactno = ?`,
            [mobileNumber],
            (error, results) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    checkEmailExist: (email, callback) => {
        pool.query(
            `SELECT m.medicalrep_id, m.userId FROM indent_medicalrep m
             JOIN indent_users u ON m.userId = u.users_id
             WHERE u.email = ?`,
            [email],
            (error, results) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    checkMobileAndEmailExist: (data, callback) => {
        pool.query(
            `SELECT m.medicalrep_id, m.userId FROM indent_medicalrep m
             JOIN indent_users u ON m.userId = u.users_id
             WHERE m.contactno = ? AND u.email = ?`,
            [data.mobileNumber, data.email],
            (error, results) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    updateOTP: (data, callback) => {
        pool.query(
            `UPDATE indent_medicalrep SET generate_otp = ?, otp_updatedate = ? WHERE medicalrep_id = ?`,
            [data.otp, new Date(), data.medicalrep_id],
            (error, results) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    verifyOTP: (data, callback) => {
        pool.query(
            `SELECT medicalrep_id, userId FROM indent_medicalrep WHERE medicalrep_id = ? AND generate_otp = ?`,
            [data.medicalrep_id, data.otp],
            (error, results) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    updatePasswordNew: (data, callback) => {
        pool.query(
            `UPDATE indent_users SET password = ? WHERE users_id = ?`,
            [data.password, data.userId],
            (error, results) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    insertIndentForm: (data, callback) => {
        pool.getConnection((connErr, connection) => {
            if (connErr) {
                return callback(connErr);
            }
            connection.beginTransaction(txErr => {
                if (txErr) {
                    connection.release();
                    return callback(txErr);
                }

                const insertIndentQuery = `
                    INSERT INTO indentforms 
                    (tradeName, manufacturer, therapeuticClass, representativeName, contactNo, tokenid, createdAt, updatedAt) 
                    VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`;

                connection.query(
                    insertIndentQuery,
                    [
                        data.tradeName,
                        data.manufacturer,
                        data.therapeuticClass,
                        data.representativeName,
                        data.contactNo,
                        data.tokenid
                    ],
                    (err1, results) => {
                        if (err1) {
                            return connection.rollback(() => {
                                connection.release();
                                callback(err1);
                            });
                        }

                        const indentform_id = results.insertId;

                        // Insert chemicals
                        if (data.chemicals && data.chemicals.length > 0) {
                            const chemicalValues = data.chemicals.map(c => [
                                indentform_id,
                                c.chemicalName,
                                c.chemicalQty,
                                new Date(),
                                new Date()
                            ]);

                            const insertChemicalsQuery = `
                                INSERT INTO indentform_chemical_contents 
                                (indentform_id, chemical_name, quantity, created_date, updated_date) 
                                VALUES ?`;

                            connection.query(insertChemicalsQuery, [chemicalValues], (err2) => {
                                if (err2) {
                                    return connection.rollback(() => {
                                        connection.release();
                                        callback(err2);
                                    });
                                }
                                insertSuppliers(indentform_id, data, connection, callback);
                            });
                        } else {
                            insertSuppliers(indentform_id, data, connection, callback);
                        }
                    }
                );
            });
        });

        function insertSuppliers(indentform_id, data, connection, callback) {
            if (data.suppliers && data.suppliers.length > 0) {
                // Filter out empty suppliers
                const validSuppliers = data.suppliers.filter(s => s.name && s.name.trim() !== '');
                if (validSuppliers.length === 0) {
                    return commitTransaction(indentform_id, connection, callback);
                }
                const supplierValues = validSuppliers.map(s => [
                    indentform_id,
                    s.name,
                    new Date(),
                    new Date()
                ]);

                const insertSuppliersQuery = `
                    INSERT INTO indentform_suppliers 
                    (indentform_id, supplier_name, create_date, update_date) 
                    VALUES ?`;

                connection.query(insertSuppliersQuery, [supplierValues], (err3) => {
                    if (err3) {
                        return connection.rollback(() => {
                            connection.release();
                            callback(err3);
                        });
                    }
                    commitTransaction(indentform_id, connection, callback);
                });
            } else {
                commitTransaction(indentform_id, connection, callback);
            }
        }

        function commitTransaction(indentform_id, connection, callback) {
            connection.commit(commitErr => {
                if (commitErr) {
                    return connection.rollback(() => {
                        connection.release();
                        callback(commitErr);
                    });
                }
                connection.release();
                return callback(null, { insertid: indentform_id });
            });
        }
    },

    getIndentFormByToken: (tokenId, callback) => {
        const query = `SELECT * FROM indentforms WHERE tokenid = ? ORDER BY id DESC LIMIT 1`;
        pool.query(query, [tokenId], (error, results) => {
            if (error) {
                return callback(error);
            }
            if (results.length === 0) {
                return callback(null, null);
            }

            const indentForm = results[0];
            const indentform_id = indentForm.id;

            const chemQuery = `SELECT * FROM indentform_chemical_contents WHERE indentform_id = ?`;
            pool.query(chemQuery, [indentform_id], (chemErr, chemResults) => {
                if (chemErr) {
                    return callback(chemErr);
                }
                indentForm.chemicals = chemResults;

                const supQuery = `SELECT * FROM indentform_suppliers WHERE indentform_id = ?`;
                pool.query(supQuery, [indentform_id], (supErr, supResults) => {
                    if (supErr) {
                        return callback(supErr);
                    }
                    indentForm.suppliers = supResults;
                    return callback(null, indentForm);
                });
            });
        });
    },

    getApproveAppointmentsByRepId: (medicalrepid, callBack) => {
        const query = `
            SELECT 
                tr.token_id,
                tr.appointmentdate,
                tr.medicalrepid,
                tr.companyId,
                tr.departmentId,
                tr.tokenno,
                tr.prefix,
                tr.created_date,
                tr.updated_date,
                mr.name AS medicalrep_name,
                c.companyname,
                dm.division AS department_name,
                d.medicinename,
                d.VerificationStatus,
                d.finalstatus
            FROM indent_tokenregistration tr
            LEFT JOIN indent_medicalrep mr ON mr.medicalrep_id = tr.medicalrepid
            LEFT JOIN indent_companies c ON c.companies_id = tr.companyId
            LEFT JOIN indent_division_master dm ON dm.division_slno = tr.departmentId
            LEFT JOIN indent_medicine d on tr.token_id = d.tokenid
            WHERE tr.medicalrepid = ? and VerificationStatus =1;
        `;
        pool.query(query, [medicalrepid], (error, results) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, results);
        });
    },

    getApprovedMedicines: (callBack) => {
        const query = `
            SELECT 
                m.medicine_id,
                m.medicinename,
                m.description,
                m.purchaserate,
                m.mrp,
                m.taxpercentage,
                m.offerdetails,
                m.tokenid,
                t.tokenno,
                t.prefix,
                CONCAT(t.prefix, '/', t.tokenno) as full_token_no,
                t.appointmentdate,
                r.name as rep_name,
                c.companyname
            FROM indent_medicine m
            LEFT JOIN indent_tokenregistration t ON m.tokenid = t.token_id
            LEFT JOIN indent_medicalrep r ON m.medicalrepid = r.medicalrep_id
            LEFT JOIN indent_companies c ON r.companyId = c.companies_id
            WHERE m.finalstatus = 1
        `;
        pool.query(query, (error, results) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, results);
        });
    },

    sendIncidentRequestWhatsapp: async ({
        mobile,
        generatedBy,
        appointmentdate,
        tokenno,
        company,
        divisionName,
        bookingDate

    }) => {

        const payload = {
            phone: `+91${mobile}`,
            template_name: 'indent_module_notification',
            language_code: 'en',
            components: [
                {
                    type: 'body',
                    parameters: [
                        { type: 'text', text: String(generatedBy || 'N/A') }, // {{1}} Greeting / Generated By
                        { type: 'text', text: String(appointmentdate || 'N/A') }, // {{2}} Appointment Date
                        { type: 'text', text: String(tokenno || 'N/A') }, // {{3}} Token
                        { type: 'text', text: String(generatedBy || 'N/A') }, // {{4}} Generated By (if renumbered)
                        { type: 'text', text: String(company || 'N/A') }, // {{5}} Company
                        { type: 'text', text: String(divisionName || 'N/A') }, // {{6}} Division
                        { type: 'text', text: String(bookingDate || 'N/A') } // {{7}} Booking Date
                    ]
                }
            ]
        };

        return await axios.post(
            'https://travancoremedicity.w7.bitvoice.in/api/send-template',
            payload,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-Key': process.env.BITVOICE_API_KEY
                }
            }
        );
    },

    sendIndentUpdateWhatsapp: async ({
        mobile,
        generatedBy
    }) => {
        const cleanMobile = String(mobile || '').replace(/^\+91/, '').trim();
        const payload = {
            phone: `+91${cleanMobile}`,
            template_name: 'indent_module_new',
            language_code: 'en',
            components: [
                {
                    type: 'body',
                    parameters: [
                        { type: 'text', text: String(generatedBy || 'N/A') }, // {{1}} Medical Rep Name
                        { type: 'text', text: 'purchase team' }               // {{2}} Static data "purchase team"
                    ]
                }
            ]
        };

        return await axios.post(
            'https://travancoremedicity.w7.bitvoice.in/api/send-template',
            payload,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-Key': process.env.BITVOICE_API_KEY
                }
            }
        );
    },

    getRepDetailsByMedicineId: (medicine_id, callback) => {
        const query = `
            SELECT 
                COALESCE(mr.name, mr_token.name) AS generatedBy,
                COALESCE(mr.contactno, mr_token.contactno) AS mobile
            FROM indent_medicine im
            LEFT JOIN indent_medicalrep mr ON mr.medicalrep_id = im.medicalrepid
            LEFT JOIN indent_tokenregistration tr ON tr.token_id = im.tokenid
            LEFT JOIN indent_medicalrep mr_token ON mr_token.medicalrep_id = tr.medicalrepid
            WHERE im.medicine_id = ?
        `;
        pool.query(query, [medicine_id], (error, results) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results && results.length > 0 ? results[0] : null);
        });
    },

    getCertificateMessageSentStatus: (certificates_details_slno, callback) => {
        pool.query(
            `SELECT message_sent_status FROM indent_certificates_details WHERE certificates_details_slno = ?`,
            [certificates_details_slno],
            (error, results) => {
                if (error) return callback(error);
                return callback(null, results && results.length > 0 ? results[0].message_sent_status : 0);
            }
        );
    },

    getMedicineCertificatesMessageSentStatus: (medicine_id, callback) => {
        pool.query(
            `SELECT message_sent_status FROM indent_certificates_details WHERE indent_medicine_slno = ?`,
            [medicine_id],
            (error, results) => {
                if (error) return callback(error);
                const alreadySent = results && results.some(r => r.message_sent_status === 1);
                return callback(null, alreadySent ? 1 : 0);
            }
        );
    },

    updateCertificateMessageSentStatus: (certificates_details_slno, callback) => {
        pool.query(
            `UPDATE indent_certificates_details SET message_sent_status = 1 WHERE certificates_details_slno = ?`,
            [certificates_details_slno],
            (error, results) => {
                if (error) return callback(error);
                return callback(null, results);
            }
        );
    },

    updateMedicineCertificatesMessageSentStatus: (medicine_id, callback) => {
        pool.query(
            `UPDATE indent_certificates_details SET message_sent_status = 1 WHERE indent_medicine_slno = ?`,
            [medicine_id],
            (error, results) => {
                if (error) return callback(error);
                return callback(null, results);
            }
        );
    }
}
