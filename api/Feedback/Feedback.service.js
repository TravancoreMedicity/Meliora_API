const { pool } = require("../../config/database")

module.exports = {
    insertfeedbackcategory: (data, callBack) => {
        pool.query(
            `
            INSERT INTO  fb_category_master(
            fb_category_name,
            fb_catgory_status,
            create_user
            ) 
            VALUES(?,?,?)
            `,
            [
                data.fb_category_name,
                data.fb_catgory_status,
                data.create_user
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })

    },
    getallcategories: (callBack) => {
        pool.query(
            `
            SELECT 
            fb_category_slno,
            fb_category_name,
            fb_catgory_status 
            FROM 
            fb_category_master
            `,
            []
            , (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    updatecategory: (data, callBack) => {
        pool.query(
            `
            UPDATE  fb_category_master
            SET
            fb_category_name = ?,
            fb_catgory_status = ?,
            edit_user = ?
            WHERE fb_category_slno = ?
            `,
            [
                data.fb_category_name,
                data.fb_catgory_status,
                data.edit_user,
                data.fb_category_slno
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })

    },
    insertsubcategory: (data, callBack) => {
        pool.query(
            `
            INSERT INTO  fb_subcategory_master(
            fb_subcategory_name,
            fb_category_slno,
            fb_subcategory_status,
            create_user
            ) 
            VALUES(?,?,?,?)
            `,
            [
                data.fb_subcategory_name,
                data.fb_category_slno,
                data.fb_subcategory_status,
                data.create_user
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })

    },
    getallsubCategories: (callBack) => {
        pool.query(
            `
            SELECT 
	fb_subcategory_slno, fb_subcategory_name, fb_subcategory_master.fb_category_slno, fb_subcategory_status ,fb_category_name 
FROM 
	fb_subcategory_master
LEFT JOIN 
	fb_category_master
ON
	fb_category_master.fb_category_slno = fb_subcategory_master.fb_category_slno
            `,
            []
            , (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    updatesubcategory: (data, callBack) => {
        pool.query(
            `
            UPDATE  fb_subcategory_master
            SET
            fb_subcategory_name = ?,
            fb_category_slno=?,
            fb_subcategory_status = ?,
            edit_user = ?
            WHERE fb_subcategory_slno = ?
            `,
            [
                data.fb_subcategory_name,
                data.fb_category_slno,
                data.fb_subcategory_status,
                data.edit_user,
                data.fb_subcategory_slno
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })

    },
    insertcollectiontype: (data, callBack) => {
        pool.query(
            `
            INSERT INTO  fb_rating_type(
            fb_rateing_name,
            fb_rateing_status,
            create_user
            ) 
            VALUES(?,?,?)
            `,
            [
                data.fb_collection_name,
                data.fb_collection_status,
                data.create_user
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })

    },
    allfeedbackcollection: (callBack) => {
        pool.query(
            `
            SELECT 
            fb_rateing_slno,
            fb_rateing_name,
            fb_rateing_status 
            FROM 
            fb_rating_type
            `,
            []
            , (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    updatecollectiontype: (data, callBack) => {
        pool.query(
            `
            UPDATE  fb_rating_type
            SET
            fb_rateing_name = ?,
            fb_rateing_status = ?,
            edit_user = ?
            WHERE fb_rateing_slno = ?
            `,
            [
                data.fb_collection_name,
                data.fb_collection_status,
                data.edit_user,
                data.fb_collection_slno
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })

    },
    getDeptStatus: (callBack) => {
        pool.query(
            `SELECT dept_id,    
             dept_name 
             FROM co_department_mast WHERE dept_status=1 order by dept_name ASC`,
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getfeedbacksubcategory: (data, callBack) => {
        pool.query(
            `SELECT 
	fb_subcategory_slno, fb_subcategory_name, fb_subcategory_master.fb_category_slno, fb_subcategory_status ,fb_category_name 
FROM 
	fb_subcategory_master
LEFT JOIN 
	fb_category_master
ON
	fb_category_master.fb_category_slno = fb_subcategory_master.fb_category_slno
WHERE fb_subcategory_master.fb_category_slno= ?`,
            [
                data.fb_category_slno
            ],

            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    //feedback Master

    insertFeedbackName: (data, callBack) => {
        pool.query(
            `
            INSERT INTO  fb_mast(
            feedback_name,
            fdmast_slno,
            feedback_status,
            create_user
            ) 
            VALUES(?,?,?,?)
            `,
            [
                data.feedback_name,
                data.fdmast_slno_value,
                data.feedback_status,
                data.create_user
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })

    },
    getFeedbackName: (callBack) => {
        pool.query(
            `
            SELECT 
            fd_slno,
            feedback_name,
            fdmast_slno,
            feedback_status 
            FROM 
            fb_mast
            where
            feedback_status = 1
            `,
            []
            , (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    UpdateFeedbackName: (data, callBack) => {
        pool.query(
            `
            UPDATE  fb_mast
            SET
            feedback_name = ?,
            feedback_status = ?,
            update_user = ?
            WHERE fd_slno = ?
            `,
            [
                data.feedback_name,
                data.feedback_status,
                data.edit_user,
                data.feedback_slno
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })

    },
    updateSerialMaster: (callBack) => {
        pool.query(
            `
            UPDATE serial_master 
SET
serial_current = serial_current + 1
WHERE serial_slno = 1
            `,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    fetchCurentSerial: (callBack) => {
        pool.query(
            `
            SELECT serial_current FROM serial_master where serial_slno = 1
            `,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    UpdateFeedbackDetailSerial: (callBack) => {
        pool.query(
            `
            UPDATE serial_master 
SET
serial_current = serial_current + 1
WHERE serial_slno = 2
            `,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    fetchCurentFeedbackDetailSerial: (callBack) => {
        pool.query(
            `
            SELECT serial_current FROM serial_master where serial_slno = 2
            `,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    insertfeedbackDetail: (data, callBack) => {
        pool.query(
            `
            INSERT INTO  fb_detl(
            fdmast_slno,
            fddet_slno,
            fb_category_slno,
            fb_subcategory_slno,
            fd_qa_malay,
            fd_qa_eng,
            fb_rateing_slno,
            fb_question_type,
            fb_answer_component,
            feedback_status,
            create_user
            ) 
            VALUES(?,?,?,?,?,?,?,?,?,?,?)
            `,
            [
                data.fdmast_slno,
                data.fddet_slno_value,
                data.fb_category_slno,
                data.fb_subcategory_slno,
                data.fd_qa_malay,
                data.fd_qa_eng,
                data.fb_rateing_slno,
                data.fb_question_type,
                data.fb_answer_component,
                data.feedback_status,
                data.create_user
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })

    },
    getallfeedbackDetail: (callBack) => {
        pool.query(
            `
            
select
 fdt_slno, 
 fddet_slno,
fb_mast.feedback_name,
fb_detl.fdmast_slno,
fb_category_master.fb_category_name,
fb_subcategory_master.fb_subcategory_name,
 fd_qa_malay,
 fd_qa_eng,
fb_rating_type.fb_rateing_name,
 fb_detl.feedback_status,
 fb_detl.fb_category_slno,
 fb_detl.fb_subcategory_slno,
 fb_detl.fb_rateing_slno
 FROM fb_detl
left join fb_mast on fb_detl.fdmast_slno = fb_mast.fdmast_slno
left join fb_category_master on fb_detl.fb_category_slno = fb_category_master.fb_category_slno
left join fb_subcategory_master on fb_detl.fb_subcategory_slno = fb_subcategory_master.fb_category_slno
left join fb_rating_type on fb_detl.fb_rateing_slno = fb_rating_type.fb_rateing_slno
            `,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    updatefeedbackDetail: (data, callBack) => {
        pool.query(
            `
            UPDATE fb_detl 
            SET
            fdmast_slno = ?,
            fb_category_slno =?,
            fb_subcategory_slno = ?,
            fd_qa_malay = ? ,
            fd_qa_eng = ?,
            fb_rateing_slno = ?,
            fb_question_type = ?,
            fb_answer_component = ?,
            feedback_status = ?,
            edit_user=?
            WHERE fdt_slno = ?
            `,
            [

                data.fdmast_slno,
                data.fb_category_slno,
                data.fb_subcategory_slno,
                data.fd_qa_malay,
                data.fd_qa_eng,
                data.fb_rateing_slno,
                data.fb_question_type,
                data.fb_answer_component,
                data.feedback_status,
                data.edit_user,
                data.fdt_slno
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    fetchFeedbackdtl: (data, callBack) => {
        pool.query(
            `
         SELECT 
    ROW_NUMBER() OVER () AS slno,
    fdt_slno, 
    fb_detl.fddet_slno,
    fb_mast.feedback_name,
    fb_detl.fdmast_slno,
    fb_category_master.fb_category_name,
    fb_subcategory_master.fb_subcategory_name,
    fd_qa_malay,
    fd_qa_eng,
    fb_rating_type.fb_rateing_name,
    fb_detl.feedback_status,
    fb_detl.fb_category_slno,
    fb_detl.fb_subcategory_slno,
    fb_detl.fb_rateing_slno,
    fb_question_type,
    fb_answer_component,
    GROUP_CONCAT(DISTINCT
        CONCAT(
            fb_mast_qakey.rating_name, ': ', 
            fb_mast_qakey.rating_value
        ) SEPARATOR ', ') AS fb_mast_qakey_data
FROM 
    fb_detl
LEFT JOIN 
    fb_mast ON fb_detl.fdmast_slno = fb_mast.fdmast_slno
LEFT JOIN 
    fb_category_master ON fb_detl.fb_category_slno = fb_category_master.fb_category_slno
LEFT JOIN 
    fb_subcategory_master ON fb_detl.fb_subcategory_slno = fb_subcategory_master.fb_subcategory_slno
LEFT JOIN 
    fb_rating_type ON fb_detl.fb_rateing_slno = fb_rating_type.fb_rateing_slno
LEFT JOIN 
    fb_mast_qakey ON fb_detl.fddet_slno = fb_mast_qakey.fddet_slno
WHERE 
    fb_detl.fdmast_slno = ? AND fb_mast_qakey.fb_aq_status = 1
GROUP BY 
    fb_detl.fddet_slno, fb_detl.fdmast_slno
            `,
            [
                data.fdmast_slno
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    fetchfbdisplay: (data, callBack) => {
        pool.query(
            `
          SELECT 
ROW_NUMBER() OVER () AS slno,
    fdt_slno, 
    fb_detl.fddet_slno,
    fb_mast.feedback_name,
    fb_detl.fdmast_slno,
    fb_category_master.fb_category_name,
    fb_subcategory_master.fb_subcategory_name,
    fd_qa_malay,
    fd_qa_eng,
    fb_rating_type.fb_rateing_name,
    fb_detl.feedback_status,
    fb_detl.fb_category_slno,
    fb_detl.fb_subcategory_slno,
    fb_detl.fb_rateing_slno,
    fb_question_type,
    fb_answer_component,
    GROUP_CONCAT(DISTINCT
        CONCAT(
            fb_mast_qakey.rating_name, ': ', 
            fb_mast_qakey.rating_value
        ) SEPARATOR ', ') AS fb_mast_qakey_data,
    GROUP_CONCAT(DISTINCT
        CONCAT(
            fb_mast_qakey.rating_value, ': ', 
            fb_mast_qakey.fbqa_slno
        ) SEPARATOR ', ') AS fb_mast_qakey_slno,
         GROUP_CONCAT(DISTINCT
        CONCAT(
            fb_mast_qakey.fbqa_slno, ': ', 
            fb_mast_qakey.rating_mark
        ) SEPARATOR ', ') AS fb_mast_qakey_mark
FROM 
    fb_detl
LEFT JOIN 
    fb_mast ON fb_detl.fdmast_slno = fb_mast.fdmast_slno
LEFT JOIN 
    fb_category_master ON fb_detl.fb_category_slno = fb_category_master.fb_category_slno
LEFT JOIN 
    fb_subcategory_master ON fb_detl.fb_subcategory_slno = fb_subcategory_master.fb_subcategory_slno
LEFT JOIN 
    fb_rating_type ON fb_detl.fb_rateing_slno = fb_rating_type.fb_rateing_slno
LEFT JOIN 
    fb_mast_qakey ON fb_detl.fddet_slno = fb_mast_qakey.fddet_slno
WHERE 
    fb_detl.fdmast_slno = ? AND fb_mast_qakey.fb_aq_status = 1
GROUP BY 
    fb_detl.fddet_slno, fb_detl.fdmast_slno;
            `,
            [
                data.fdmast_slno
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    FeedbackAlreadyPresent: (data, callBack) => {
        pool.query(
            `
            SELECT 
            feedback_name,
            fdmast_slno,
            feedback_status 
            FROM 
            fb_mast
            where
            REPLACE(LOWER(feedback_name), ' ', '') = ?
            `,
            [
                data
            ]
            , (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    insertQuestionAnswers: (data, callBack) => {
        const { rating_name, fddet_slno, fdmast_slno, fb_rateing_slno, fb_aq_status, create_user } = data
        const ratingEntries = Object.entries(rating_name);
        return Promise.all(ratingEntries.map(([key, value]) => {
            const CleanValue = key === "Yes" ? 1 : key === "No" ? 2 : key === "Description" ? 0 : key.replace(/_(star|value)$/, '');
            return new Promise((resolve, reject) => {
                pool.query(
                    `
                    INSERT INTO fb_mast_qakey (
                        fdmast_slno, 
                        fddet_slno,
                         fb_rateing_slno, 
                         rating_name,
                         rating_value,
                         rating_mark,
                         fb_aq_status,
                         create_user
                    ) 
                    VALUES (?,?,?,?,?,?,?,?)
                    `,
                    [
                        fdmast_slno,
                        fddet_slno,
                        fb_rateing_slno,
                        key,
                        value,
                        CleanValue,
                        fb_aq_status,
                        create_user,
                    ],
                    (error, results, fields) => {
                        if (error) {
                            return callBack(error)
                        }
                        return callBack(null, results)
                    }
                );
            });
        }))
    },
    fetchFeedBackDetailFddNo: (data, callBack) => {
        pool.query(
            `
            SELECT 
                fddet_slno,
                fb_rateing_slno
            FROM 
                fb_detl
            where
            fdt_slno = ?
            `,
            [
                data
            ]
            , (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    UpdateQuestionAnswers: (data, callBack) => {
        const { rating_name, fddet_slno, fdmast_slno, fb_rateing_slno, fb_aq_status, edit_user } = data
        const ratingEntries = Object.entries(rating_name);
        return Promise.all(ratingEntries.map(([key, value]) => {
            const CleanValue = key === "Yes" ? 1 : key === "No" ? 2 : key === "Description" ? 0 : key.replace(/_(star|value)$/, '');
            return new Promise((resolve, reject) => {
                pool.query(
                    `
                    UPDATE fb_mast_qakey 
            SET
            fdmast_slno = ?,
            fb_rateing_slno = ?,
            rating_mark = ?,
            rating_value = ?,
            fb_aq_status= ?,
            edit_user=?
            WHERE fddet_slno = ? and rating_name = ?`
                    ,
                    [
                        fdmast_slno,
                        fb_rateing_slno,
                        CleanValue,
                        value,
                        fb_aq_status,
                        edit_user,
                        fddet_slno,
                        key
                    ],
                    (error, results, fields) => {
                        if (error) {
                            return callBack(error)
                        }
                        return callBack(null, results)
                    }
                );
            });
        }))
    },
    FindifRatingAlreadyExist: (data, callBack) => {
        pool.query(
            `
            SELECT 
            fb_rateing_name,
            fb_rateing_slno 
            FROM 
            fb_rating_type
            where
            REPLACE(LOWER(fb_rateing_name), ' ', '') = ?
            `,
            [
                data
            ]
            , (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    FindCategroryAlreadyExist: (data, callBack) => {
        pool.query(
            `
            SELECT 
            fb_category_name,
            fb_category_slno 
            FROM 
            fb_category_master
            where
            REPLACE(LOWER(fb_category_name), ' ', '') = ?
            `,
            [
                data
            ]
            , (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    FindSubCategoryAlreadyExist: (data, callBack) => {
        pool.query(
            `
            SELECT 
            fb_subcategory_name,
            fb_category_slno 
            FROM 
            fb_subcategory_master
            where
            REPLACE(LOWER(fb_subcategory_name), ' ', '') = ? and fb_category_slno= ?
            `,
            [
                data.fb_subcategory_name,
                data.fb_category_slno
            ]
            , (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    CheckIfNoChangeOccured: (data, callBack) => {
        pool.query(
            `
           SELECT *  FROM fb_mast_qakey where fddet_slno = ? and fb_rateing_slno = ? and fb_aq_status = 1
            `,
            [
                data.fddet_slno,
                data.fb_rateing_slno
            ]
            , (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    }, ChangeFeedbackMastQkeyStatus: (data, callBack) => {
        pool.query(
            `
          UPDATE fb_mast_qakey 
            SET
            fb_aq_status = 0,
            edit_user= ?
            WHERE fddet_slno = ?
            `,
            [
                data.edit_user,
                data.fddet_slno,
            ]
            , (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    UpdateSerialAnswerMaster: (callBack) => {
        pool.query(
            `
            UPDATE serial_master 
SET
serial_current = serial_current + 1
WHERE serial_slno = 3
            `,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    fetchSerialAnswerMaster: (callBack) => {
        pool.query(
            `
            SELECT serial_current FROM serial_master where serial_slno = 3
            `,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    insertAllFeedBackTransactionMast: (data, callBack) => {
        pool.query(
            `
            INSERT INTO fb_transaction_mast(
            fb_transact_slno, 
            fdmast_slno,
            fb_ip_num,
            fb_patient_num,
            fb_patient_name,
            fb_patient_mob,
            fb_call_staus,
            create_user
            ) 
            VALUES(?,?,?,?,?,?,?,?)
            `,
            [
                data.fb_transact_slno,
                data.fdmast_slno,
                data.fb_ip_num,
                data.fb_patient_num,
                data.fb_patient_name,
                data.fb_patient_mob,
                data.fb_call_staus,
                data.create_user,
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    insertFeedbackQuestAnswer: (data, callBack) => {
        const { answer, fb_transact_slno, create_user } = data;
        return Promise.all(answer?.map((items) => {
            return new Promise((resolve, reject) => {
                pool.query(
                    `
                    INSERT INTO fb_transaction_detl (
                        fb_transact_slno,
                        fb_category_slno,
                        fb_subcategory_slno,
                        fddet_slno,
                        fbqa_slno,
                        fd_mark,
                        fb_suggestion,
                        create_user
                    ) 
                    VALUES (?,?,?,?,?,?,?,?)
                    `,
                    [
                        fb_transact_slno,
                        items.fb_category_slno,
                        items.fb_subcategory_slno,
                        items.fddet_slno,
                        items.fbqa_slno,
                        items.answer,
                        items.Descrpt,
                        create_user,
                    ],
                    (error, results, fields) => {
                        if (error) {
                            return callBack(error)
                        }
                        return callBack(null, results)
                    }
                );
            });
        }))
    },
    insertDefaultPtImpression: (data, callBack) => {
        const { answer, fb_transact_slno, create_user } = data;
        // This code destruct nested answer object to corresponding  details
        const insertPromises = Object.entries(answer)
            .flatMap(([fb_category_slno, questions]) =>
                Object.entries(questions).map(([fb_subcategory_slno, qdata]) => {
                    const rating = qdata.rating || 0;
                    const details = JSON.stringify(qdata?.details || []);
                    return new Promise((resolve, reject) => {
                        pool.query(
                            `
                            INSERT INTO fb_imp_transact_mast (
                            fb_transact_slno,
                            fb_quest_id,
                            fb_quest_sub,
                            fb_imp_ans,
                            fb_ans_detail,
                            create_user
                            ) VALUES (?, ?, ?, ?, ? , ?)
                            `,
                            [
                                fb_transact_slno,
                                parseInt(fb_category_slno),
                                fb_subcategory_slno,
                                rating,
                                details,
                                create_user
                            ],
                            (err, results) => {
                                if (err) return reject(err);
                                resolve(results);
                            }
                        );
                    });
                })
            );
        Promise.all(insertPromises)
            .then((results) => callBack(null, results))
            .catch((err) => callBack(err));
    },

    getalluserfeedback: (data, callBack) => {
        pool.query(
            `
         SELECT 
    ROW_NUMBER() OVER () AS slno,
    fb_trdetl_slno,
    fb_transaction_detl.fddet_slno,
    fb_category_master.fb_category_name,
    fb_subcategory_master.fb_subcategory_name,
    fb_transaction_detl.fb_category_slno,
    fb_transaction_detl.fb_subcategory_slno,
    fd_mark,
    fb_detl.fdmast_slno,
	fb_mast.feedback_name
FROM
  fb_transaction_detl
LEFT JOIN 
    fb_detl ON fb_transaction_detl.fddet_slno = fb_detl.fddet_slno
LEFT JOIN 
    fb_category_master ON fb_transaction_detl.fb_category_slno = fb_category_master.fb_category_slno
LEFT JOIN 
    fb_subcategory_master ON fb_transaction_detl.fb_subcategory_slno = fb_subcategory_master.fb_subcategory_slno
LEFT JOIN 
    fb_mast ON fb_detl.fdmast_slno = fb_mast.fdmast_slno
WHERE
    date(fb_transaction_detl.create_date) >= ?
            `,
            [
                data.current_date
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    ModuleAlreadyPresent: (data, callBack) => {
        pool.query(
            `
            SELECT 
            fb_module_slno,
            fb_module_name,
            fb_module_status 
            FROM 
            fb_module_mast
            where
            REPLACE(LOWER(fb_module_name), ' ', '') = ?
            `,
            [
                data
            ]
            , (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    insertmodulemaster: (data, callBack) => {
        pool.query(
            `
            INSERT INTO  fb_module_mast(
            fb_module_name,
            fb_module_status,
            create_user
            ) 
            VALUES(?,?,?)
            `,
            [
                data.fb_module_name,
                data.fb_module_status,
                data.create_user
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },

    insertimppatientRemark: (data, callBack) => {
        pool.query(
            `
            INSERT INTO  fb_imp_pt_remarks(
            fb_transact_slno,
            fb_imp_remark,
            create_user
            ) 
            VALUES(?,?,?)
            `,
            [
                data.fb_transact_slno,
                data.remark,
                data.create_user
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    insertCallCenterDetail: (data, callBack) => {
        pool.query(
            `
            INSERT INTO  fb_call_center(
            fb_transact_slno,
            fb_pt_ip_no,
            fb_cc_submitted
            ) 
            VALUES(?,?,?)
            `,
            [
                data.fb_transact_slno,
                data.fb_ip_num,
                data.fb_cc_submitted
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    updatemodulemaster: (data, callBack) => {
        pool.query(
            `
            UPDATE  fb_module_mast
            SET
            fb_module_name = ?,
            fb_module_status = ?,
            edit_user = ?
            WHERE fb_module_slno = ?
            `,
            [
                data.fb_module_name,
                data.fb_module_status,
                data.edit_user,
                data.fb_module_slno
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })

    },
    getallmodulemaster: (callBack) => {
        pool.query(
            `
            SELECT 
            fb_module_slno,
            fb_module_name,
            fb_module_status
            FROM 
            fb_module_mast
            `,
            []
            , (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    findMenuAlreadyExists: (data, callBack) => {
        pool.query(
            `
            SELECT 
            fb_menu_name,
            fb_module_slno 
            FROM 
            fb_menu_mast
            where
            REPLACE(LOWER(fb_menu_name), ' ', '') = ? and fb_module_slno= ?
            `,
            [
                data.menuname,
                data.moduleid
            ]
            , (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    fetchimpremark: (data, callBack) => {
        pool.query(
            `
           SELECT 
                fb_imp_remark,
                fb_imp_pt_remarks.create_date,
                em_name
            FROM
                fb_imp_pt_remarks
                    LEFT JOIN
                co_employee_master ON fb_imp_pt_remarks.create_user = co_employee_master.em_id
            WHERE
                fb_transact_slno = ?
            `,
            [
                data.FB_TCT_SLNO
            ]
            , (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    getrelative: (ipNumbers, callBack) => {
        pool.query(
            `
           SELECT 
            fb_ip_no,                      
            fb_ipd_date,                   
            fb_pt_no,                        
            fb_ptc_name,                                  
            fb_ptc_sex,                     
            fb_ptd_dob,                                                           
            fb_ptc_loadd1,                   
            fb_ptc_loadd2,                   
            fb_ptc_loadd3,                   
            fb_ptc_loadd4,
            fb_ptc_mobile,
            fb_ptn_yearage,
            fb_ipc_curstatus,
            fb_doc_name   
        FROM
            fb_ipadmiss
        WHERE
            fb_ip_no IN (?)
            `,
            [
                ipNumbers
            ]
            , (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    getbirthdetail: (data, callBack) => {
        pool.query(
            `
           SELECT 
                fb_br_slno,
                fb_brd_date,
                fb_pt_no,
                fb_ptc_name,
                fb_ptc_loadd1,
                fb_ptc_loadd2,
                fb_brc_husband,
                fb_brn_age,
                fb_brn_total,
                fb_brn_live,
                fb_bd_code,
                fb_ip_no,
                fb_child_gender,
                fb_birth_date,
                fb_mother_ip_no,
                fb_child_pt_no,
                fb_child_ip_no,
                fb_child_weight
            FROM
                fb_birth_reg_mast
            WHERE
                fb_mother_ip_no = ?
            `,
            [
                data.IP_NO
            ]
            , (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    insertmenumaster: (data, callBack) => {
        pool.query(
            `
            INSERT INTO  fb_menu_mast(
            fb_menu_name,
            fb_module_slno,
            fb_menu_status,
            create_user
            ) 
            VALUES(?,?,?,?)
            `,
            [
                data.menuname,
                data.moduleid,
                data.status,
                data.create_user
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    getallmenumaster: (callBack) => {
        pool.query(
            `
            SELECT 
		fb_menu_slno,fb_menu_mast.fb_module_slno,fb_menu_name, fb_menu_status,fb_module_name 
FROM 
	fb_menu_mast
LEFT JOIN 
	fb_module_mast
ON
	fb_module_mast.fb_module_slno = fb_menu_mast.fb_module_slno 
            `,
            []
            , (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    updatemenumaster: (data, callBack) => {
        pool.query(
            `
            UPDATE  fb_menu_mast
            SET
            fb_menu_name = ?,
            fb_module_slno=?,
            fb_menu_status = ?,
            edit_user = ?
            WHERE fb_menu_slno = ?
            `,
            [
                data.menuname,
                data.moduleid,
                data.status,
                data.edit_user,
                data.menuslno
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })

    },

    GroupAlreadyPresent: (data, callBack) => {
        pool.query(
            `
            SELECT 
            fb_usrgrp_slno,
            fb_usrgrp_name,
            fb_usrgrp_status 
            FROM 
            fb_usrgrp_mast
            where
            REPLACE(LOWER(fb_usrgrp_name), ' ', '') = ?
            `,
            [
                data
            ]
            , (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    insertgroupmaster: (data, callBack) => {
        pool.query(
            `
            INSERT INTO  fb_usrgrp_mast(
            fb_usrgrp_name,
            fb_usrgrp_status,
            create_user
            ) 
            VALUES(?,?,?)
            `,
            [
                data.fb_usrgrp_name,
                data.fb_usrgrp_status,
                data.create_user
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    getallgroupmaster: (callBack) => {
        pool.query(
            `
            SELECT 
            fb_usrgrp_slno,
            fb_usrgrp_name,
            fb_usrgrp_status
            FROM 
            fb_usrgrp_mast
            `,
            []
            , (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    updategroupmaster: (data, callBack) => {
        pool.query(
            `
            UPDATE  fb_usrgrp_mast
            SET
            fb_usrgrp_name = ?,
            fb_usrgrp_status = ?,
            edit_user = ?
            WHERE fb_usrgrp_slno = ?
            `,
            [
                data.fb_usrgrp_name,
                data.fb_usrgrp_status,
                data.edit_user,
                data.fb_usrgrp_slno
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    getallmodulemenu: (data, callBack) => {
        pool.query(
            `
SELECT 
		fb_menu_mast.fb_menu_slno,fb_menu_name, fb_menu_status,fb_menu_mast.fb_module_slno ,fb_usr_right_slno,fb_menu_view
FROM 
	 fb_menu_mast
LEFT JOIN 
	fb_user_right_mast
ON
	fb_menu_mast.fb_menu_slno = fb_user_right_mast.fb_menu_slno 
    AND fb_user_right_mast.fb_usrgrp_slno = ?
WHERE  
    fb_menu_mast.fb_module_slno = ?
            `,
            [
                data.groupid,
                data.moduleid
            ]
            , (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    insertuserright: (data, callBack) => {
        pool.query(
            `
            INSERT INTO  fb_user_right_mast(
            fb_usrgrp_slno,
            fb_module_slno,
            fb_menu_slno,
            fb_menu_view,
            create_user
            ) 
            VALUES(?,?,?,?,?)
            `,
            [
                data.fb_usrgrp_slno,
                data.fb_module_slno,
                data.fb_menu_slno,
                data.fb_menu_view,
                data.create_user
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    updateuserright: (data, callBack) => {
        pool.query(
            `
            UPDATE  fb_user_right_mast
            SET
            fb_menu_view = ?,
            edit_user = ?
            WHERE fb_usr_right_slno = ?
            `,
            [
                data.fb_menu_view,
                data.edit_user,
                data.fb_usr_right_slno
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    FindUserRightAlreadyExist: (data, callBack) => {
        pool.query(
            `
            SELECT 
            fb_menu_slno,
            fb_usrgrp_slno,
            fb_menu_view
            FROM 
            fb_user_right_mast
            WHERE fb_usr_right_slno = ?
            `,
            [data]
            , (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    getDepartmentSec: (id, callback) => {
        pool.query(
            `SELECT 
            sec_id,
            sec_name
        FROM co_deptsec_mast 
        WHERE dept_id = ? and sec_status=1 order by sec_name ASC`,
            [id],
            (error, results, feilds) => {
                if (error) {
                    return callback(error)
                }
                return callback(null, results)
            }
        )
    },
    getDepartmentEmpid: (id, callBack) => {
        pool.query(
            `SELECT em_id, em_name FROM co_employee_master where em_dept_section=? 
            and em_status=1 and em_no!=1 order by em_name ASC`,
            [
                id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    FindEmployeeAlreadyExist: (data, callBack) => {
        pool.query(
            `
            SELECT 
            fb_employee_right_slno,
            fb_grp_slno, 
            fb_depid,
            fb_secid, 
            fb_empid
            FROM 
            fb_employee_user_rights
            where fb_grp_slno = ? and fb_depid = ? and fb_secid= ?  and fb_empid = ?
            `,
            [
                data.fb_grp_slno,
                data.fb_depid,
                data.fb_secid,
                data.fb_empid
            ]
            , (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    employeerightinsert: (data, callBack) => {
        pool.query(
            `
            INSERT INTO  fb_employee_user_rights(
            fb_grp_slno, 
            fb_depid,
            fb_secid, 
            fb_empid, 
            fb_usrright_status,
            create_user
            ) 
            VALUES(?,?,?,?,?,?)
            `,
            [
                data.fb_grp_slno,
                data.fb_depid,
                data.fb_secid,
                data.fb_empid,
                data.fb_usrright_status,
                data.create_user
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })

    },
    getallemployeeright: (callBack) => {
        pool.query(
            `
              SELECT 
        ROW_NUMBER() OVER () AS slno,
		fb_employee_right_slno,
		fb_grp_slno, 
		fb_depid,
		fb_secid, 
		fb_empid,
        em_name,
        sec_name,
        dept_name,
        fb_usrgrp_name,
        fb_usrright_status
FROM 
	fb_employee_user_rights
left join  fb_usrgrp_mast on fb_employee_user_rights.fb_grp_slno =  fb_usrgrp_mast.fb_usrgrp_slno
left join  co_department_mast on fb_employee_user_rights.fb_depid =  co_department_mast.dept_id
left join  co_deptsec_mast on fb_employee_user_rights.fb_secid =  co_deptsec_mast.sec_id
left join  co_employee_master on fb_employee_user_rights.fb_empid =  co_employee_master.em_id
            `,
            []
            , (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    employeerightupdate: (data, callBack) => {
        pool.query(
            `
            UPDATE  fb_employee_user_rights
            SET
           fb_grp_slno=?, 
            fb_depid=?,
            fb_secid=?, 
            fb_empid=?, 
            fb_usrright_status=?,
            edit_user = ?
            WHERE fb_employee_right_slno = ?
            `,
            [
                data.fb_grp_slno,
                data.fb_depid,
                data.fb_secid,
                data.fb_empid,
                data.fb_usrright_status,
                data.edit_user,
                data.fb_employee_right_slno
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    FindEmpyGroup: (data, callBack) => {
        pool.query(
            `
        select 
            fb_grp_slno,
            fb_empid
        from
            fb_employee_user_rights
        WHERE fb_empid = ? and fb_usrright_status= 1
            `,
            [
                data.fb_emp_id,
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    getallmenuitems: (data, callBack) => {
        pool.query(
            `
select 
	fb_user_right_mast.fb_module_slno,
	fb_menu_mast.fb_menu_slno,
    fb_menu_mast.fb_menu_name
from
	fb_user_right_mast
left join fb_menu_mast on  fb_user_right_mast.fb_menu_slno = fb_menu_mast.fb_menu_slno
WHERE fb_usrgrp_slno = ? and fb_menu_view= 1
            `,
            [
                data
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    FindUserModuleAlreadyPresent: (data, callBack) => {
        pool.query(
            `
            SELECT 
		fb_usrgrp_slno,
		fb_module_slno,
		fb_usr_module_status 
FROM 
		fb_user_module_master
where fb_usrgrp_slno=? and fb_module_slno=?
            `,
            [
                data.groupid,
                data.moduleid
            ]
            , (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    insertusermoduleright: (data, callBack) => {
        pool.query(
            `
            INSERT INTO  fb_user_module_master(
            fb_usrgrp_slno,
            fb_module_slno,
            fb_usr_module_status,
            create_user
            ) 
            VALUES(?,?,?,?)
            `,
            [
                data.groupid,
                data.moduleid,
                data.status,
                data.create_user
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    updateusermoduleright: (data, callBack) => {
        pool.query(
            `
            UPDATE  fb_user_module_master
            SET
            fb_usrgrp_slno = ?,
            fb_module_slno = ?,
            fb_usr_module_status=?,
            edit_user = ?
            WHERE fb_usr_mod_slno = ?
            `,
            [
                data.groupid,
                data.moduleid,
                data.status,
                data.edit_user,
                data.fb_usr_mod_slno
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    getallusermodulemaster: (callBack) => {
        pool.query(
            `
SELECT 
ROW_NUMBER() OVER () AS slno,
		fb_user_module_master.fb_usrgrp_slno,
		fb_user_module_master.fb_module_slno,
		fb_usr_module_status ,
        fb_module_name,
        fb_usrgrp_name,
        fb_usr_mod_slno
FROM 
		fb_user_module_master
left join fb_module_mast  on fb_user_module_master.fb_module_slno = fb_module_mast.fb_module_slno
left join fb_usrgrp_mast  on fb_user_module_master.fb_usrgrp_slno = fb_usrgrp_mast.fb_usrgrp_slno
            `,
            []
            , (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    getallmoduleitems: (data, callBack) => {
        pool.query(
            `
select 
	fb_user_module_master.fb_module_slno,
    fb_usr_module_status,
    fb_module_name
from
	fb_user_module_master
left join fb_module_mast on  fb_user_module_master.fb_module_slno = fb_module_mast.fb_module_slno
WHERE fb_usr_module_status = 1 and fb_usrgrp_slno= ?
            `,
            [
                data
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    nursestationinsert: (data, callBack) => {
        pool.query(
            `
            INSERT INTO  fb_nurse_station_master(
            fb_ns_code,
            fb_floor_code,
            fb_ns_name,
            fb_ns_status,
            create_user
            ) 
            VALUES(?,?,?,?,?)
            `,
            [
                data.fb_ns_code,
                data.fb_floor_code,
                data.fb_ns_name,
                data.fb_ns_status,
                data.create_user
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    FindNursingStationExist: (data, callBack) => {
        pool.query(
            `
            SELECT 
		fb_nurse_stn_slno,
		fb_ns_code,
		fb_ns_status 
FROM 
		fb_nurse_station_master
where fb_ns_code=? and fb_floor_code=?
            `,
            [
                data.fb_ns_code,
                data.fb_floor_code
            ]
            , (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    FindhkalreadyExist: (data, callBack) => {
        pool.query(
            `
            select fb_hk_slno from 	fb_hk_check_bed where fb_hk_bed_slno = ? and fb_hk_status = 1
            `,
            [
                data
            ]
            , (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },

    getallnursestation: (callBack) => {
        pool.query(
            `
SELECT 
ROW_NUMBER() OVER () AS slno,
fb_nurse_stn_slno,
		fb_ns_code,
		fb_ns_status,
        fb_ns_name,
        fb_floor_code,
        rm_floor_creation.rm_floor_name ,
        	rm_floor_alias
		
FROM 
		fb_nurse_station_master
left join rm_floor_creation  on fb_nurse_station_master.fb_floor_code = rm_floor_creation.rm_floor_slno

            `,
            []
            , (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    getfeedbackcount: (callBack) => {
        pool.query(
            `
SELECT COUNT(*) AS total_rows
FROM fb_transaction_mast;
            `,
            []
            , (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    updatenursestation: (data, callBack) => {
        pool.query(
            `
            UPDATE  fb_nurse_station_master
            SET
            fb_ns_code = ?,
            fb_ns_name = ?,
            fb_floor_code = ?,
            fb_ns_status=?,
            edit_user = ?
            WHERE fb_nurse_stn_slno = ?
            `,
            [
                data.fb_ns_code,
                data.fb_ns_name,
                data.fb_floor_code,
                data.fb_ns_status,
                data.edit_user,
                data.fb_nurse_stn_slno
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    updatehkcheckbed: (data, callBack) => {
        const isInitial = data.fb_hk_bed_status === 1;
        pool.query(
            `
            UPDATE  fb_hk_check_bed
            SET
            fb_hk_bed_status = ?,
            fb_hk_bed_remark = ?,
             ${isInitial ? 'fb_hk_initial_emp_assign' : 'fb_hk_finla_emp_assign'} = ?,
            fb_hk_check_status=?
            WHERE fb_hk_slno = ?
            `,
            [
                data.fb_hk_bed_status,
                data.fb_hk_bed_remark,
                data.assignEmployeee,
                data.fb_hk_check_status,
                data.fb_hk_slno
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    getpatientfeedback: (data, callBack) => {
        pool.query(
            `
           SELECT 
                fb_patient_name,
                fdmast_slno,
                fb_patient_mob 
            FROM 
                fb_transaction_mast 
            where 
                fb_ip_num =? and  fb_patient_num = ?
            `,
            [
                data.fb_ip_num,
                data.fb_patient_num,
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },

    //Not using  saved for later
    // insertbddetail: (data, callBack) => {
    //     const promises = data.map((item) => {
    //         return new Promise((resolve, reject) => {
    //             pool.query(
    //                 `
    //                 INSERT INTO fb_bed(
    //                     fb_bd_code,
    //                     fb_bdc_no,
    //                     fb_ns_code,
    //                     fb_rt_code,
    //                     fb_bdc_occup,
    //                     fb_bdn_cccno,
    //                     fb_bdc_status,
    //                     fb_hkd_cleaningreq,
    //                     fb_rm_code,
    //                     fb_bdc_mhcode,
    //                     fb_bdc_vipbed
    //                 )
    //                 VALUES(?,?,?,?,?,?,?,?,?,?,?)       
    //                 `,
    //                 [
    //                     item.BD_CODE,
    //                     item.BDC_NO,
    //                     item.NS_CODE,
    //                     item.RT_CODE,
    //                     item.BDC_OCCUP,
    //                     item.OCCU,
    //                     item.BDC_STATUS,
    //                     item.HKD_CLEANINGREQ,
    //                     item.RM_CODE,
    //                     item.BDC_MHCODE,
    //                     item.BDC_VIPBED
    //                 ],
    //                 (error, results, fields) => {
    //                     if (error) {
    //                         reject(error); // Reject the promise if there's an error
    //                     } else {
    //                         resolve(results); // Resolve the promise if successful
    //                     }
    //                 }
    //             );
    //         });
    //     });
    //     // Use Promise.all to wait for all insertions
    //     Promise.all(promises)
    //         .then((results) => {
    //             callBack(null, results);
    //         })
    //         .catch((error) => {
    //             callBack(error);
    //         });
    // },

    //Not using  saved for later
    // CheckBedAlreadyPresent: (data, callBack) => {
    //     const promises = data.map((item) => {
    //         return new Promise((resolve, reject) => {
    //             pool.query(
    //                 `
    //                  SELECT
    //                     fb_bed_slno, 
    //                     fb_bd_code,
    //                     fb_bdc_no,
    //                     fb_ns_code,
    //                     fb_rt_code,
    //                     fb_bdc_occup,
    //                     fb_bdn_cccno,
    //                     fb_bdc_status,
    //                     fb_hkd_cleaningreq,
    //                     fb_rm_code,
    //                     fb_bdc_mhcode,
    //                     fb_bdc_vipbed
    //                 FROM 
    //                     fb_bed 
    //                 where 
    //                 fb_bd_code = ?  and fb_bdc_no = ?  
    //                 `,
    //                 [
    //                     item.BD_CODE,
    //                     item.BDC_NO,
    //                 ],
    //                 (error, results, fields) => {
    //                     if (error) {
    //                         reject(error); // Reject the promise if there's an error
    //                     } else {
    //                         resolve(results); // Resolve the promise if successful
    //                     }
    //                 }
    //             );
    //         });
    //     });
    //     // Use Promise.all to wait for all insertions
    //     Promise.all(promises)
    //         .then((results) => {
    //             callBack(null, results);
    //         })
    //         .catch((error) => {
    //             callBack(error);
    //         });
    // },

    //Not using  saved for later
    // updatebeddetail: (data, callBack) => {
    //     const promises = data.map((item) => {
    //         return new Promise((resolve, reject) => {
    //             pool.query(
    //                 `
    //                  UPDATE fb_bed 
    //                  SET
    //                     fb_bd_code = ?,
    //                     fb_bdc_no = ?,
    //                     fb_ns_code = ?,
    //                     fb_rt_code = ?,
    //                     fb_bdc_occup = ?,
    //                     fb_bdn_cccno = ?,
    //                     fb_bdc_status = ?,
    //                     fb_hkd_cleaningreq = ?,
    //                     fb_rm_code = ?,
    //                     fb_bdc_mhcode = ?,
    //                     fb_bdc_vipbed = ?
    //                 where 
    //                     fb_bed_slno = ?  
    //                 `,
    //                 [
    //                     item.BD_CODE,
    //                     item.BDC_NO,
    //                     item.NS_CODE,
    //                     item.RT_CODE,
    //                     item.BDC_OCCUP,
    //                     item.OCCU,
    //                     item.BDC_STATUS,
    //                     item.HKD_CLEANINGREQ,
    //                     item.RM_CODE,
    //                     item.BDC_MHCODE,
    //                     item.BDC_VIPBED,
    //                     item.fb_bed_slno
    //                 ],
    //                 (error, results, fields) => {
    //                     if (error) {
    //                         reject(error); // Reject the promise if there's an error
    //                     } else {
    //                         resolve(results); // Resolve the promise if successful
    //                     }
    //                 }
    //             );
    //         });
    //     });
    //     // Use Promise.all to wait for all insertions
    //     Promise.all(promises)
    //         .then((results) => {
    //             callBack(null, results);
    //         })
    //         .catch((error) => {
    //             callBack(error);
    //         });
    // },

    //Not using  saved for later
    // CheckRoomTypeAlreadyPreseint: (data, callBack) => {
    //     const promises = data.map((item) => {
    //         return new Promise((resolve, reject) => {
    //             pool.query(
    //                 `
    //                  SELECT
    //                     fb_rmtp_slno, 
    //                     fb_rt_code,
    //                     fb_rtc_desc,
    //                     fb_rtc_alias,
    //                     fb_rc_code,
    //                     fb_rtc_status, 
    //                     fb_icu,
    //                     fb_rtc_mhcode     
    //                 FROM 
    //                     fb_room_type 
    //                 where 
    //                     fb_rt_code = ?  
    //                 `,
    //                 [
    //                     item.RT_CODE,
    //                 ],
    //                 (error, results, fields) => {
    //                     if (error) {
    //                         reject(error); // Reject the promise if there's an error
    //                     } else {
    //                         resolve(results); // Resolve the promise if successful
    //                     }
    //                 }
    //             );
    //         });
    //     });
    //     // Use Promise.all to wait for all insertions
    //     Promise.all(promises)
    //         .then((results) => {
    //             callBack(null, results);
    //         })
    //         .catch((error) => {
    //             callBack(error);
    //         });
    // },

    //Not using  saved for later
    // insertrtdetail: (data, callBack) => {
    //     const promises = data.map((item) => {
    //         return new Promise((resolve, reject) => {
    //             pool.query(
    //                 `
    //                 INSERT INTO fb_room_type(
    //                     fb_rt_code,
    //                     fb_rtc_desc,
    //                     fb_rtc_alias,
    //                     fb_rc_code,
    //                     fb_rtc_status, 
    //                     fb_icu,
    //                     fb_rtc_mhcode
    //                 )
    //                 VALUES(?,?,?,?,?,?,?)       
    //                 `,
    //                 [
    //                     item.RT_CODE,
    //                     item.RTC_DESC,
    //                     item.RCC_DESC,
    //                     item.RC_CODE,
    //                     item.RTC_STATUS,
    //                     item.ICU,
    //                     item.RTC_MHCODE
    //                 ],
    //                 (error, results, fields) => {
    //                     if (error) {
    //                         reject(error); // Reject the promise if there's an error
    //                     } else {
    //                         resolve(results); // Resolve the promise if successful
    //                     }
    //                 }
    //             );
    //         });
    //     });
    //     // Use Promise.all to wait for all insertions
    //     Promise.all(promises)
    //         .then((results) => {
    //             callBack(null, results);
    //         })
    //         .catch((error) => {
    //             callBack(error);
    //         });
    // },

    //Not using  saved for later
    // updatertdetail: (data, callBack) => {
    //     const promises = data.map((item) => {
    //         return new Promise((resolve, reject) => {
    //             pool.query(
    //                 `
    //                  UPDATE fb_room_type 
    //                  SET
    //                     fb_rt_code = ?,
    //                     fb_rtc_desc = ?,
    //                     fb_rtc_alias = ?,
    //                     fb_rc_code = ?,
    //                     fb_rtc_status = ?, 
    //                     fb_icu = ?,
    //                     fb_rtc_mhcode = ?
    //                 where 
    //                     fb_rmtp_slno = ?  
    //                 `,
    //                 [
    //                     item.RT_CODE,
    //                     item.RTC_DESC,
    //                     item.RCC_DESC,
    //                     item.RC_CODE,
    //                     item.RTC_STATUS,
    //                     item.ICU,
    //                     item.RTC_MHCODE,
    //                     item.fb_rmtp_slno
    //                 ],
    //                 (error, results, fields) => {
    //                     if (error) {
    //                         reject(error); // Reject the promise if there's an error
    //                     } else {
    //                         resolve(results); // Resolve the promise if successful
    //                     }
    //                 }
    //             );
    //         });
    //     });
    //     // Use Promise.all to wait for all insertions
    //     Promise.all(promises)
    //         .then((results) => {
    //             callBack(null, results);
    //         })
    //         .catch((error) => {
    //             callBack(error);
    //         });
    // },

    // Not using  saved for later
    // CheckpatientAlreadyPresent: (data, callBack) => {
    //     const promises = data.map((item) => {
    //         return new Promise((resolve, reject) => {
    //             pool.query(
    //                 `
    //                  SELECT
    //                    fb_ipad_slno, fb_ip_no, fb_ipd_date, fb_pt_no, fb_ptc_name, fb_ptc_sex, fb_ptd_dob, fb_ptn_dayage, fb_ptn_monthage, fb_ptn_yearage, fb_ptc_loadd1, fb_ptc_loadd2, fb_ptc_loadd3, fb_ptc_loadd4, fb_ptc_lopin, fb_rc_code, fb_bd_code, fb_do_code, fb_rs_code, fb_ipd_disc, fb_ipc_status, fb_dmc_slno, fb_dmd_date, fb_ptc_mobile, fb_ipc_mhcode, fb_doc_name
    //                 FROM 
    //                     fb_ipadmiss 
    //                 where 
    //                 fb_ip_no = ?  and fb_pt_no = ?  
    //                 `,
    //                 [
    //                     item.IP_NO,
    //                     item.PT_NO,
    //                 ],
    //                 (error, results, fields) => {
    //                     if (error) {
    //                         reject(error); // Reject the promise if there's an error
    //                     } else {
    //                         resolve(results); // Resolve the promise if successful
    //                     }
    //                 }
    //             );
    //         });
    //     });
    //     // Use Promise.all to wait for all insertions
    //     Promise.all(promises)
    //         .then((results) => {
    //             callBack(null, results);
    //         })
    //         .catch((error) => {
    //             callBack(error);
    //         });
    // },

    // Not using  saved for later2917
    // insertPatientDetail: (data, callBack) => {
    //     const promises = data.map((item) => {
    //         return new Promise((resolve, reject) => {
    //             pool.query(
    //                 `
    //                 INSERT INTO fb_ipadmiss (
    //                     fb_ip_no,
    //                     fb_ipd_date,
    //                     fb_pt_no,
    //                     fb_ptc_name,
    //                     fb_ptc_sex,
    //                     fb_ptd_dob,   
    //                     fb_ptn_dayage,
    //                     fb_ptn_monthage,
    //                     fb_ptn_yearage,
    //                     fb_ptc_loadd1,
    //                     fb_ptc_loadd2, 
    //                     fb_ptc_loadd3,
    //                     fb_ptc_loadd4,
    //                     fb_ptc_lopin,
    //                     fb_rc_code,
    //                     fb_bd_code,
    //                     fb_do_code, 
    //                     fb_rs_code, 
    //                     fb_ipd_disc,
    //                     fb_ipc_status,
    //                     fb_dmc_slno,
    //                     fb_dmd_date,
    //                     fb_ptc_mobile, 
    //                     fb_ipc_mhcode,
    //                     fb_doc_name,
    //                     fb_ipc_curstatus
    //                 ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    //                 `,
    //                 [
    //                     item.IP_NO,
    //                     item.IPD_DATE,
    //                     item.PT_NO,
    //                     item.PTC_PTNAME,
    //                     item.PTC_SEX,
    //                     item.PTD_DOB,
    //                     item.PTN_DAYAGE,
    //                     item.PTN_MONTHAGE,
    //                     item.PTN_YEARAGE,
    //                     item.PTC_LOADD1,
    //                     item.PTC_LOADD2,
    //                     item.PTC_LOADD3,
    //                     item.PTC_LOADD4,
    //                     item.PTC_LOPIN,
    //                     item.RC_CODE,
    //                     item.BD_CODE,
    //                     item.DO_CODE,
    //                     item.RS_CODE,
    //                     item.IPD_DISC,
    //                     item.IPC_STATUS,
    //                     item.DMC_SLNO,
    //                     item.DMD_DATE,
    //                     item.PTC_MOBILE,
    //                     item.IPC_MHCODE,
    //                     item.DOC_NAME,
    //                     item.IPC_CURSTATUS
    //                 ],
    //                 (error, results, fields) => {
    //                     if (error) {
    //                         reject(error);
    //                     } else {
    //                         resolve(results);
    //                     }
    //                 }
    //             );
    //         });
    //     });
    //     Promise.all(promises)
    //         .then((results) => {
    //             callBack(null, results);
    //         })
    //         .catch((error) => {
    //             callBack(error);
    //         });
    // },
    // Not using  saved for later
    // updatePatientDetail: (data, callBack) => {
    //     const promises = data.map((item) => {
    //         return new Promise((resolve, reject) => {
    //             pool.query(
    //                 `
    //                 UPDATE fb_ipadmiss
    //                 SET
    //                     fb_ip_no = ?, 
    //                     fb_ipd_date = ?, 
    //                     fb_pt_no = ?, 
    //                     fb_ptc_name = ?, 
    //                     fb_ptc_sex = ?, 
    //                     fb_ptd_dob = ?, 
    //                     fb_ptn_dayage = ?, 
    //                     fb_ptn_monthage = ?, 
    //                     fb_ptn_yearage = ?, 
    //                     fb_ptc_loadd1 = ?, 
    //                     fb_ptc_loadd2 = ?, 
    //                     fb_ptc_loadd3 = ?, 
    //                     fb_ptc_loadd4 = ?, 
    //                     fb_ptc_lopin = ?, 
    //                     fb_rc_code = ?, 
    //                     fb_bd_code = ?, 
    //                     fb_do_code = ?, 
    //                     fb_rs_code = ?, 
    //                     fb_ipd_disc = ?, 
    //                     fb_ipc_status = ?, 
    //                     fb_dmc_slno = ?, 
    //                     fb_dmd_date = ?, 
    //                     fb_ptc_mobile = ?, 
    //                     fb_ipc_mhcode = ?, 
    //                     fb_doc_name = ?,
    //                     fb_ipc_curstatus = ?
    //                 WHERE fb_ipad_slno = ?
    //                 `,
    //                 [
    //                     item.IP_NO,
    //                     item.IPD_DATE,
    //                     item.PT_NO,
    //                     item.PTC_PTNAME,
    //                     item.PTC_SEX,
    //                     item.PTD_DOB,
    //                     item.PTN_DAYAGE,
    //                     item.PTN_MONTHAGE,
    //                     item.PTN_YEARAGE,
    //                     item.PTC_LOADD1,
    //                     item.PTC_LOADD2,
    //                     item.PTC_LOADD3,
    //                     item.PTC_LOADD4,
    //                     item.PTC_LOPIN,
    //                     item.RC_CODE,
    //                     item.BD_CODE,
    //                     item.DO_CODE,
    //                     item.RS_CODE,
    //                     item.IPD_DISC,
    //                     item.IPC_STATUS,
    //                     item.DMC_SLNO,
    //                     item.DMD_DATE,
    //                     item.PTC_MOBILE,
    //                     item.IPC_MHCODE,
    //                     item.DOC_NAME,
    //                     item.IPC_CURSTATUS,
    //                     item.fb_ipad_slno
    //                 ],
    //                 (error, results, fields) => {
    //                     if (error) {
    //                         reject(error);
    //                     } else {
    //                         resolve(results);
    //                     }
    //                 }
    //             );
    //         });
    //     });
    //     Promise.all(promises)
    //         .then((results) => {
    //             callBack(null, results);
    //         })
    //         .catch((error) => {
    //             callBack(error);
    //         });

    // },

    //Not using  saved for later
    // CheckRoomsinMasterPresent: (data, callBack) => {
    //     const promises = data.map((item) => {
    //         return new Promise((resolve, reject) => {
    //             pool.query(
    //                 `
    //                  SELECT
    //                     fb_rm_slno,
    //                     fb_rm_code,
    //                     fb_rmc_desc,
    //                     fb_rmc_alias,
    //                     fb_rac_status,
    //                     fb_rmc_mhcode,
    //                     fb_ns_code      
    //                 FROM 
    //                     fb_room_master 
    //                 where 
    //                     fb_rm_code = ?  
    //                 `,
    //                 [
    //                     item.RM_CODE,
    //                 ],
    //                 (error, results, fields) => {
    //                     if (error) {
    //                         reject(error); // Reject the promise if there's an error
    //                     } else {
    //                         resolve(results); // Resolve the promise if successful
    //                     }
    //                 }
    //             );
    //         });
    //     });
    //     // Use Promise.all to wait for all insertions
    //     Promise.all(promises)
    //         .then((results) => {
    //             callBack(null, results);
    //         })
    //         .catch((error) => {
    //             callBack(error);
    //         });
    // },

    // Not using  saved for later
    // insertRoomMasterdetail: (data, callBack) => {
    //     const promises = data.map((item) => {
    //         return new Promise((resolve, reject) => {
    //             pool.query(
    //                 `
    //                 INSERT INTO fb_room_master(
    //                     fb_rm_code,
    //                     fb_rmc_desc,
    //                     fb_rmc_alias,
    //                     fb_rac_status,
    //                     fb_rmc_mhcode,
    //                     fb_ns_code
    //                 )
    //                 VALUES(?,?,?,?,?,?)       
    //                 `,
    //                 [
    //                     item.RM_CODE,
    //                     item.RMC_DESC,
    //                     item.RMC_ALIAS,
    //                     item.RMC_STATUS,
    //                     item.RMC_MHCODE,
    //                     item.NS_CODE
    //                 ],
    //                 (error, results, fields) => {
    //                     if (error) {
    //                         reject(error); // Reject the promise if there's an error
    //                     } else {
    //                         resolve(results); // Resolve the promise if successful
    //                     }
    //                 }
    //             );
    //         });
    //     });
    //     // Use Promise.all to wait for all insertions
    //     Promise.all(promises)
    //         .then((results) => {
    //             callBack(null, results);
    //         })
    //         .catch((error) => {
    //             callBack(error);
    //         });
    // },

    // Not using  saved for later
    // updateRoomMasterDetail: (data, callBack) => {
    //     const promises = data.map((item) => {
    //         return new Promise((resolve, reject) => {
    //             pool.query(
    //                 `
    //                  UPDATE fb_room_master 
    //                  SET
    //                     fb_rm_code = ?,
    //                     fb_rmc_desc = ?,
    //                     fb_rmc_alias = ?,
    //                     fb_rac_status = ?,
    //                     fb_rmc_mhcode = ?,
    //                     fb_ns_code= ?
    //                 where 
    //                     fb_rm_slno = ?  
    //                 `,
    //                 [
    //                     item.RM_CODE,
    //                     item.RMC_DESC,
    //                     item.RMC_ALIAS,
    //                     item.RMC_STATUS,
    //                     item.RMC_MHCODE,
    //                     item.NS_CODE,
    //                     item.fb_rm_slno
    //                 ],
    //                 (error, results, fields) => {
    //                     if (error) {
    //                         reject(error); // Reject the promise if there's an error
    //                     } else {
    //                         resolve(results); // Resolve the promise if successful
    //                     }
    //                 }
    //             );
    //         });
    //     });
    //     // Use Promise.all to wait for all insertions
    //     Promise.all(promises)
    //         .then((results) => {
    //             callBack(null, results);
    //         })
    //         .catch((error) => {
    //             callBack(error);
    //         });
    // },

    // Not using  saved for later
    // CheckadmnReasonsExits: (data, callBack) => {
    //     const promises = data.map((item) => {
    //         return new Promise((resolve, reject) => {
    //             pool.query(
    //                 `
    //                  SELECT
    //                     fb_adrn_slno,
    //                     fb_rs_code, 
    //                     fb_rsc_desc,
    //                     fb_rsc_alias,
    //                     fb_rsc_status      
    //                 FROM 
    //                     fb_admn_reason 
    //                 where 
    //                     fb_rs_code = ?  
    //                 `,
    //                 [
    //                     item.RS_CODE,
    //                 ],
    //                 (error, results, fields) => {
    //                     if (error) {
    //                         reject(error); // Reject the promise if there's an error
    //                     } else {
    //                         resolve(results); // Resolve the promise if successful
    //                     }
    //                 }
    //             );
    //         });
    //     });
    //     // Use Promise.all to wait for all insertions
    //     Promise.all(promises)
    //         .then((results) => {
    //             callBack(null, results);
    //         })
    //         .catch((error) => {
    //             callBack(error);
    //         });
    // },

    // Not using  saved for later
    // insertadminReasons: (data, callBack) => {
    //     const promises = data.map((item) => {
    //         return new Promise((resolve, reject) => {
    //             pool.query(
    //                 `
    //                 INSERT INTO fb_admn_reason(
    //                     fb_rs_code, 
    //                     fb_rsc_desc,
    //                     fb_rsc_alias,
    //                     fb_rsc_status  
    //                 )
    //                 VALUES(?,?,?,?)       
    //                 `,
    //                 [
    //                     item.RS_CODE,
    //                     item.RSC_DESC,
    //                     item.RSC_ALIAS,
    //                     item.RSC_STATUS
    //                 ],
    //                 (error, results, fields) => {
    //                     if (error) {
    //                         reject(error); // Reject the promise if there's an error
    //                     } else {
    //                         resolve(results); // Resolve the promise if successful
    //                     }
    //                 }
    //             );
    //         });
    //     });
    //     // Use Promise.all to wait for all insertions
    //     Promise.all(promises)
    //         .then((results) => {
    //             callBack(null, results);
    //         })
    //         .catch((error) => {
    //             callBack(error);
    //         });
    // },


    // Not using  saved for later
    // updateadmnReasons: (data, callBack) => {
    //     const promises = data.map((item) => {
    //         return new Promise((resolve, reject) => {
    //             pool.query(
    //                 `
    //                  UPDATE fb_admn_reason 
    //                  SET
    //                     fb_rs_code = ?,
    //                     fb_rsc_desc = ?,
    //                     fb_rsc_alias = ?,
    //                     fb_rsc_status = ?
    //                 where 
    //                     fb_adrn_slno = ?  
    //                 `,
    //                 [
    //                     item.RS_CODE,
    //                     item.RSC_DESC,
    //                     item.RSC_ALIAS,
    //                     item.RSC_STATUS,
    //                     item.fb_adrn_slno
    //                 ],
    //                 (error, results, fields) => {
    //                     if (error) {
    //                         reject(error); // Reject the promise if there's an error
    //                     } else {
    //                         resolve(results); // Resolve the promise if successful
    //                     }
    //                 }
    //             );
    //         });
    //     });
    //     // Use Promise.all to wait for all insertions
    //     Promise.all(promises)
    //         .then((results) => {
    //             callBack(null, results);
    //         })
    //         .catch((error) => {
    //             callBack(error);
    //         });
    // },


    // Not using  saved for later
    // CheckRoomCategoryExists: (data, callBack) => {
    //     const promises = data.map((item) => {
    //         return new Promise((resolve, reject) => {
    //             pool.query(
    //                 `
    //                  SELECT
    //                     fb_rc_slno,
    //                     fb_rc_code,
    //                     fb_rcc_desc,
    //                     fb_rcc_alias,
    //                     fb_rcc_status,
    //                     fb_rcc_mhocde      
    //                 FROM 
    //                     fb_room_category 
    //                 where 
    //                     fb_rc_code = ?  
    //                 `,
    //                 [
    //                     item.RC_CODE,
    //                 ],
    //                 (error, results, fields) => {
    //                     if (error) {
    //                         reject(error); // Reject the promise if there's an error
    //                     } else {
    //                         resolve(results); // Resolve the promise if successful
    //                     }
    //                 }
    //             );
    //         });
    //     });
    //     // Use Promise.all to wait for all insertions
    //     Promise.all(promises)
    //         .then((results) => {
    //             callBack(null, results);
    //         })
    //         .catch((error) => {
    //             callBack(error);
    //         });
    // },

    // Not using  saved for later
    // insertRoomCategoryDetail: (data, callBack) => {
    //     const promises = data.map((item) => {
    //         return new Promise((resolve, reject) => {
    //             pool.query(
    //                 `
    //                 INSERT INTO fb_room_category(
    //                     fb_rc_code,
    //                     fb_rcc_desc,
    //                     fb_rcc_alias,
    //                     fb_rcc_status,
    //                     fb_rcc_mhocde 
    //                 )
    //                 VALUES(?,?,?,?,?)       
    //                 `,
    //                 [
    //                     item.RC_CODE,
    //                     item.RCC_DESC,
    //                     item.RCC_ALIAS,
    //                     item.RCC_STATUS,
    //                     item.RCC_MHCODE
    //                 ],
    //                 (error, results, fields) => {
    //                     if (error) {
    //                         reject(error); // Reject the promise if there's an error
    //                     } else {
    //                         resolve(results); // Resolve the promise if successful
    //                     }
    //                 }
    //             );
    //         });
    //     });
    //     // Use Promise.all to wait for all insertions
    //     Promise.all(promises)
    //         .then((results) => {
    //             callBack(null, results);
    //         })
    //         .catch((error) => {
    //             callBack(error);
    //         });
    // },


    // Not using  saved for later
    // UpdateRoomCategoryDetail: (data, callBack) => {
    //     const promises = data.map((item) => {
    //         return new Promise((resolve, reject) => {
    //             pool.query(
    //                 `
    //                  UPDATE fb_room_category 
    //                  SET
    //                     fb_rc_code = ?,
    //                     fb_rcc_desc = ?,
    //                     fb_rcc_alias = ?,
    //                     fb_rcc_status = ?,
    //                     fb_rcc_mhocde = ?
    //                 where 
    //                     fb_rc_slno = ?  
    //                 `,
    //                 [
    //                     item.RC_CODE,
    //                     item.RCC_DESC,
    //                     item.RCC_ALIAS,
    //                     item.RCC_STATUS,
    //                     item.RCC_MHCODE,
    //                     item.fb_rc_slno
    //                 ],
    //                 (error, results, fields) => {
    //                     if (error) {
    //                         reject(error); // Reject the promise if there's an error
    //                     } else {
    //                         resolve(results); // Resolve the promise if successful
    //                     }
    //                 }
    //             );
    //         });
    //     });
    //     // Use Promise.all to wait for all insertions
    //     Promise.all(promises)
    //         .then((results) => {
    //             callBack(null, results);
    //         })
    //         .catch((error) => {
    //             callBack(error);
    //         });
    // },



    getNursingBed: (data, callBack) => {
        pool.query(
            `
            SELECT
    fb_bed.fb_bdc_no,
    fb_bed.fb_bd_code,
    fb_bed.fb_bdc_occup,
    fb_bed.fb_bdc_vipbed,
    fb_bed.fb_rt_code, 
    fb_bed.fb_bdc_status,
    fb_bed.fb_hkd_cleaningreq,
    fb_bed.fb_rm_code,
    fb_bed.fb_bdc_mhcode,
    fb_room_type.fb_rtc_desc,
    fb_room_category.fb_rcc_desc,
    fb_room_type.fb_rc_code,
    fb_room_type.fb_rtc_status,
    fb_room_type.fb_icu,
    fb_room_type.fb_rtc_mhcode,
    SUM(fb_bed.fb_bdn_cccno) AS OCCU
FROM 
    fb_bed
LEFT JOIN 
    fb_nurse_station_master ON fb_bed.fb_ns_code = fb_nurse_station_master.fb_ns_code
LEFT JOIN 
    fb_room_type ON fb_bed.fb_rt_code = fb_room_type.fb_rt_code
LEFT JOIN 
    fb_room_category ON fb_room_type.fb_rc_code = fb_room_category.fb_rc_code
WHERE 
    fb_nurse_station_master.fb_ns_status = 1
    AND fb_bed.fb_bdc_status = 'Y'
    AND fb_room_type.fb_rtc_status = 'Y'
    AND fb_bed.fb_ns_code = ? 
GROUP BY 
    fb_bed.fb_bdc_no,
    fb_bed.fb_bd_code,
    fb_bed.fb_bdc_occup,
    fb_bed.fb_bdc_vipbed,
    fb_bed.fb_rt_code,
    fb_bed.fb_bdc_status,
    fb_bed.fb_hkd_cleaningreq,
    fb_bed.fb_rm_code,
    fb_bed.fb_bdc_mhcode,
    fb_room_type.fb_rtc_desc,
    fb_room_category.fb_rcc_desc,
    fb_room_type.fb_rc_code,
    fb_room_type.fb_rtc_status,
    fb_room_type.fb_icu,
    fb_room_type.fb_rtc_mhcode
ORDER BY 
    fb_bed.fb_bdc_no;
            `,
            [
                data.NS_CODE
            ]
            , (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    getCurrentPatient: (data, callBack) => {
        pool.query(
            `
                SELECT 
                    fb_ip_no,                      
                    fb_ipd_date,                   
                    fb_pt_no,                        
                    fb_ptc_name,                                  
                    fb_ptc_sex,                     
                    fb_ptd_dob,                                                           
                    fb_ptc_loadd1,                   
                    fb_ptc_loadd2,                   
                    fb_ptc_loadd3,                   
                    fb_ptc_loadd4,
                    fb_ptc_mobile,
                    fb_ptn_yearage,
                    fb_ipc_curstatus,
                    fb_doc_name                       
                FROM 
                    fb_ipadmiss,fb_bed,fb_nurse_station_master
                WHERE 
                        fb_bed.fb_bd_code = fb_ipadmiss.fb_bd_code
                       AND fb_nurse_station_master.fb_ns_code=fb_bed.fb_ns_code
                       AND fb_nurse_station_master.fb_ns_code = ?
                       AND fb_ipadmiss.fb_bd_code = ?
                       AND fb_ipadmiss.fb_ipc_curstatus != "PCO";
            `,
            [
                data.fb_ns_code,
                data.fb_bd_code
            ]
            , (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    getallblockedbed: (callBack) => {
        pool.query(
            `
              SELECT 
                fb_bed.fb_bed_slno,
                rm_outlet_slno,
                fb_bed.fb_bd_code,
                fb_bed.fb_bdc_no,
                fb_bed.fb_ns_code,
                fb_bed.fb_rt_code,
                fb_bed.fb_bdc_occup,
                fb_bed.fb_bdn_cccno,
                fb_bed.fb_bdc_status,
                fb_bed.fb_hkd_cleaningreq,
                fb_bed.fb_rm_code,
                fb_bed.fb_bdc_mhcode,
                fb_bed.fb_bdc_vipbed,
                fb_ns_name,
                fb_rtc_desc,
                fb_rtc_alias,
                fb_bed.create_date,
                fb_bed_remarks.fb_bed_remark,
                fb_bed_remarks.fb_bed_status,
                fb_rm_room_slno,
                fb_hk_check_bed.fb_hk_bed_slno,
                fb_hk_check_bed.fb_hk_status
            FROM
                fb_bed
                LEFT JOIN fb_nurse_station_master 
                    ON fb_bed.fb_ns_code = fb_nurse_station_master.fb_ns_code
                LEFT JOIN fb_room_type 
                    ON fb_bed.fb_rt_code = fb_room_type.fb_rt_code
                LEFT JOIN fb_roomcreation_master 
                    ON fb_bed.fb_bd_code = fb_roomcreation_master.fb_rm_bd_code
                LEFT JOIN rm_newroom_creation 
                    ON rm_newroom_creation.rm_room_slno = fb_roomcreation_master.fb_rm_room_slno
                LEFT JOIN fb_hk_check_bed 
                    ON fb_hk_check_bed.fb_hk_bed_slno = fb_bed.fb_bed_slno
                LEFT JOIN fb_bed_remarks 
                    ON fb_bed.fb_bed_slno = fb_bed_remarks.fb_bed_slno
                    AND fb_bed_remarks.fb_bed_status = 1
            WHERE
                fb_bed.fb_bdc_occup = 'N'
                AND (fb_hk_check_bed.fb_hk_status IS NULL OR fb_hk_check_bed.fb_hk_status != 1)
            `,
            []
            , (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    // main checklist bed getting query
    getchecklistbed: (callBack) => {
        pool.query(
            // `  SELECT 
            //    fb_bed.fb_bed_slno, 
            //    fb_bed.fb_bd_code,
            //    fb_bed.fb_bdc_no,
            //    fb_bed.fb_ns_code,
            //    fb_bed.fb_rt_code,
            //    fb_bed.fb_bdc_occup,
            //    fb_bed.fb_bdn_cccno,
            //    fb_bed.fb_bdc_status,
            //    fb_bed.fb_hkd_cleaningreq,
            //    fb_bed.fb_rm_code,
            //    fb_bed.fb_bdc_mhcode,
            //    fb_bed.fb_bdc_vipbed,
            //    fb_ns_name,
            //    fb_rtc_desc,
            //    fb_rtc_alias,
            //    fb_bed.create_date,
            //    fb_bed_remarks.fb_bed_remark,
            //    fb_bed_remarks.fb_bed_status,
            //    fb_rm_room_slno
            //    FROM fb_bed
            //    LEFT JOIN fb_nurse_station_master 
            //    ON fb_bed.fb_ns_code = fb_nurse_station_master.fb_ns_code   
            //    LEFT JOIN fb_room_type 
            //    ON fb_bed.fb_rt_code = fb_room_type.fb_rt_code
            //    LEFT JOIN fb_roomcreation_master 
            //    ON fb_bed.fb_bd_code = fb_roomcreation_master.fb_rm_bd_code
            //    LEFT JOIN fb_bed_remarks 
            //    ON fb_bed.fb_bed_slno = fb_bed_remarks.fb_bed_slno 
            //    AND fb_bed_remarks.fb_bed_status = 1 
            //    WHERE fb_bed.fb_bdc_occup = "N"
            // `,

            `SELECT 
                fb_bed.fb_bed_slno,
                rm_outlet_slno,
                fb_bed.fb_bd_code,
                fb_bed.fb_bdc_no,
                fb_bed.fb_ns_code,
                fb_bed.fb_rt_code,
                fb_bed.fb_bdc_occup,
                fb_bed.fb_bdn_cccno,
                fb_bed.fb_bdc_status,
                fb_bed.fb_hkd_cleaningreq,
                fb_bed.fb_rm_code,
                fb_bed.fb_bdc_mhcode,
                fb_bed.fb_bdc_vipbed,
                fb_ns_name,
                fb_rtc_desc,
                fb_rtc_alias,
                fb_bed.create_date,
                fb_bed_remarks.fb_bed_remark,
                fb_bed_remarks.fb_bed_status,
                fb_rm_room_slno
            FROM
                fb_bed
                    LEFT JOIN
                fb_nurse_station_master ON fb_bed.fb_ns_code = fb_nurse_station_master.fb_ns_code
                    LEFT JOIN
                fb_room_type ON fb_bed.fb_rt_code = fb_room_type.fb_rt_code
                    LEFT JOIN
                fb_roomcreation_master ON fb_bed.fb_bd_code = fb_roomcreation_master.fb_rm_bd_code
                LEFT JOIN
                rm_newroom_creation ON rm_newroom_creation.rm_room_slno = fb_roomcreation_master.fb_rm_room_slno
                    LEFT JOIN
                fb_bed_remarks ON fb_bed.fb_bed_slno = fb_bed_remarks.fb_bed_slno
                AND fb_bed_remarks.fb_bed_status = 1
            WHERE
                fb_bed.fb_bdc_occup = 'N'`,
            []
            , (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    getallroomassetdata: (data, callBack) => {
        pool.query(
            `   select 
                    fb_assets_map_slno,
                    fb_rc_roomslno, 
                    fb_asset_map_master.fb_dep_id,
                    fb_ismultiple,
                    fb_asset_count,
                    fb_asset_map_status,
                    fb_asset_item_master.fb_asset_name,
                    rm_room_name,
                    complaint_dept_name,
                    fb_complaint_dep,
                    fb_asset_slno,
                    fb_asset_type
                from 
                    fb_asset_map_master
                left join rm_newroom_creation on rm_newroom_creation.rm_room_slno = fb_asset_map_master.fb_rc_roomslno
                left join fb_asset_item_master on fb_asset_item_master.fb_asset_slno = fb_asset_map_master.fb_asset_id	
                left join cm_complaint_dept on cm_complaint_dept.complaint_dept_slno = fb_asset_map_master.fb_complaint_dep		
                where fb_rc_roomslno = ?
            `,
            [
                data
            ]
            , (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },

    insertbedremarks: (data, callBack) => {
        pool.query(
            `
            INSERT INTO  fb_bed_remarks(
             fb_bed_slno,
            fb_bed_status,
            fb_bed_service_status,
            fb_bed_remark,
            fb_overall_remarks,
            fb_overall_condition,
            fb_initail_checked,
            fb_initial_emp_assign,
            fb_emp_assign,
            fb_final_checked,
            create_user
            ) 
            VALUES(?,?,?,?,?,?,?,?,?,?,?)
            `,
            [
                data.fb_bed_slno,
                data.fb_bed_status,
                data.fb_bed_service_status,
                data.fb_bed_remark,
                data.fb_overall_remarks,
                data.fb_overall_condition,
                data.fb_initail_checked,
                data.fb_initial_emp_assign,
                data.fb_emp_assign,
                data.fb_final_checked,
                data.create_user

            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    // this service is not using any more
    getllbedremarks: (callBack) => {
        pool.query(
            `select 	
	            fb_bed_rmk_slno,
	            fb_bed_slno,
                fb_bd_code,
                fb_bdc_no,
                fb_ns_code,
                fb_bed_reason,
                fb_bed_remarks,
                fb_bed_status,
                fb_initail_checked,
                create_date
            from 
                fb_bed_remarks
            where 
                fb_bed_status = 1
            `,
            []
            , (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    getalldischargeform: (data, callBack) => {
        pool.query(
            `SELECT 
                fdmast_slno,
                fb_ip_num,
                fb_patient_num,
                fb_patient_name,
                fb_transact_slno
            FROM 
                fb_transaction_mast
            WHERE 
                fdmast_slno = ?
                AND create_date BETWEEN ? AND ?`,
            [
                data.feedbackId,
                data.FROM_DATE,
                data.TO_DATE
            ],
            (error, results) => {
                if (error) return callBack(error);
                return callBack(null, results);
            }
        );
    },
    getempdetail: (data, callBack) => {
        pool.query(
            `
            select 
                em_department,em_dept_section,em_name,desg_name,complaint_dept_slno
            from 
                co_employee_master
            left join  co_designation on co_employee_master.em_designation = co_designation.desg_slno
            left join  cm_complaint_dept on cm_complaint_dept.department_slno = co_employee_master.em_department
             where 
                em_id = ?`,
            [
                data
            ]
            , (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    getallipfollowup: (data, callBack) => {
        pool.query(
            `select
                fb_ip_date_schedule.fb_date_schedule_slno, 
                fb_ip_date_schedule.fb_ip_no,
                fb_ip_date_schedule.fb_schedule_date,
                fb_ip_date_schedule.fb_pro_remark,
                fb_ip_date_schedule.fb_pt_no
                fb_ptc_name
            from 
                fb_ip_date_schedule
			left join fb_ipadmiss on fb_ipadmiss.fb_ip_no = fb_ip_date_schedule.fb_ip_no
           where fb_ipadmiss.fb_ipd_disc  BETWEEN ? AND ?;
                `,
            [
                data?.FROM_DATE,
                data?.TO_DATE
            ]
            , (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },

    getallassignedbed: (data, callBack) => {
        pool.query(
            `    SELECT 
                fb_hk_check_bed.fb_hk_slno,
                fb_hk_check_bed.fb_hk_bed_slno,
                fb_hk_check_bed.fb_hk_check_status,
                fb_hk_check_bed.fb_hk_bed_status,
                fb_hk_check_bed.fb_hk_bed_remark,
                fb_hk_check_bed.fb_hk_finla_emp_assign,
                fb_hk_check_bed.fb_hk_initial_emp_assign,
                fb_bed.fb_bed_slno,
                fb_bed.fb_bd_code,
                fb_bed.fb_bdc_no,
                fb_bed.fb_ns_code,
                fb_bed.fb_rt_code,
                fb_bed.fb_bdc_occup,
                fb_bed.fb_bdn_cccno,
                fb_bed.fb_bdc_status,
                fb_bed.fb_hkd_cleaningreq,
                fb_bed.fb_rm_code,
                fb_ns_name,
                fb_rtc_desc,
                fb_rtc_alias,
                fb_bed.create_date,
                 rm_outlet_slno
            FROM
                fb_hk_check_bed
                    LEFT JOIN
                fb_bed ON fb_hk_check_bed.fb_hk_bed_slno = fb_bed.fb_bed_slno
                    LEFT JOIN
                fb_nurse_station_master ON fb_bed.fb_ns_code = fb_nurse_station_master.fb_ns_code
                    LEFT JOIN
                fb_room_type ON fb_bed.fb_rt_code = fb_room_type.fb_rt_code
                    LEFT JOIN
                fb_roomcreation_master ON fb_bed.fb_bd_code = fb_roomcreation_master.fb_rm_bd_code
                 LEFT JOIN
				rm_newroom_creation ON rm_newroom_creation.rm_room_slno = fb_roomcreation_master.fb_rm_room_slno
            WHERE
                fb_hk_sv_assign = ?
                    AND fb_hk_status = 1;`,
            [
                data
            ]
            , (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    CheckIfRemarkAlreadyExist: (data, callBack) => {
        pool.query(
            `select fb_bed_rmk_slno,fb_bed_service_status from fb_bed_remarks where fb_bed_slno = ?`,
            [
                data.fb_bed_slno,
            ]
            , (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    FetchInsertIdBedRemark: (data, callBack) => {
        pool.query(
            `select fb_bed_rmk_slno,fb_bed_slno from fb_bed_remarks where fb_bed_slno = ?`,
            [
                data.fb_bed_slno,
            ]
            , (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    InsertBedRemarkDetail: (data, callBack) => {
        const { detail, fb_bed_rmk_slno, create_user } = data;
        // Create promises for each item in the data
        const promises = detail?.map((item) => {
            return new Promise((resolve, reject) => {
                pool.query(
                    `
                    INSERT INTO fb_bed_remark_detail(
                        fb_bed_rmk_slno,
                        fb_dep_id,
                        fb_asset_status,
                        fb_asset_id,
                        create_user 
                    )
                    VALUES(?,?,?,?,?)       
                    `,
                    [
                        fb_bed_rmk_slno,
                        item.fb_dep_id,
                        item.status,
                        item.fb_asset_slno,
                        create_user
                    ],
                    (error, results, fields) => {
                        if (error) {
                            reject(error); // Reject the promise if there's an error
                        } else {
                            resolve(results); // Resolve the promise if successful
                        }
                    }
                );
            });
        });
        // Use Promise.all to wait for all insertions
        Promise.all(promises)
            .then((results) => {
                callBack(null, results);
            })
            .catch((error) => {
                callBack(error);
            });

    },
    getbedremarkDetail: (data, callBack) => {
        pool.query(
            `select  fb_bed.fb_bed_slno,
                fb_bed.fb_bd_code,
                fb_bed.fb_bdc_no,
                fb_bed.fb_ns_code,
                fb_bed_remark,
                fb_overall_remarks,
                fb_overall_condition,
                fb_emp_assign,
                fb_bed_service_status,
                fb_bed_status ,
                fb_bed_remark_detail.fb_dep_id,
                fb_asset_item_master.fb_asset_name,
                fb_bed_remark_detail.fb_asset_status,
                fb_initail_checked
            from fb_bed_remarks 
                left join fb_bed_remark_detail on fb_bed_remarks.fb_bed_rmk_slno = fb_bed_remark_detail.fb_bed_rmk_slno
                left join fb_asset_item_master on fb_asset_item_master.fb_asset_slno = fb_bed_remark_detail.fb_asset_id
                left join fb_bed on fb_bed.fb_bed_slno = fb_bed_remarks.fb_bed_slno
                where fb_bed_remarks.fb_bed_slno = ?;`,
            [
                data
            ]
            , (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    updatebedremarks: (data, callBack) => {
        pool.query(
            `
            UPDATE fb_bed_remarks
            SET
                fb_bed_slno=?,
                fb_bed_status=?,
                fb_bed_service_status=?,
                fb_bed_remark=?,
                fb_overall_remarks=?,
                fb_overall_condition=?,
                fb_final_checked=?,
                fb_emp_assign=?,
                edit_user = ?
            WHERE fb_bed_rmk_slno = ?`,
            [
                data.fb_bed_slno,
                data.fb_bed_status,
                data.fb_bed_service_status,
                data.fb_bed_remark,
                data.fb_overall_remarks,
                data.fb_overall_condition,
                data.fb_final_checked,
                data.fb_emp_assign,
                data.edit_user,
                data.fb_bed_rmk_slno
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    updatebedremarksfromComplaint: (data, callBack) => {
        pool.query(
            `
            UPDATE fb_bed_remarks
            SET
                fb_bed_slno = ?
            WHERE fb_bed_rmk_slno = ?`,
            [
                data.fb_bed_slno,
                data.fb_bed_rmk_slno
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    // UpdateBedRemarkDetail: (data, callBack) => {
    //     const { detail, fb_bed_rmk_slno, create_user } = data;
    //     // Create promises for each item in the data
    //     const promises = detail?.map((item) => {
    //         return new Promise((resolve, reject) => {
    //             pool.query(
    //                 `
    //                 UPDATE fb_bed_remark_detail
    //                     SET
    //                         fb_dep_id = ?, 
    //                         fb_asset_name = ?, 
    //                         fb_asset_status = ?, 
    //                         edit_user = ?
    //                     WHERE fb_bed_rmk_slno = ? AND fb_asset_name = ?      
    //                 `,
    //                 [
    //                     item.fb_dep_id,
    //                     item.fb_asset_name,
    //                     item.status,
    //                     create_user,
    //                     fb_bed_rmk_slno,
    //                     item.fb_asset_name
    //                 ],
    //                 (error, results, fields) => {
    //                     if (error) {
    //                         reject(error); // Reject the promise if there's an error
    //                     } else {
    //                         resolve(results); // Resolve the promise if successful
    //                     }
    //                 }
    //             );
    //         });
    //     });
    //     // Use Promise.all to wait for all insertions
    //     Promise.all(promises)
    //         .then((results) => {
    //             callBack(null, results);
    //         })
    //         .catch((error) => {
    //             callBack(error);
    //         });

    // },
    getroomassetdetail: (callBack) => {
        pool.query(
            `select 
            fb_assets_map_slno,
	        fb_rc_roomslno, 
            fb_asset_map_master.fb_dep_id,
            fb_asset_map_master.fb_asset_id ,
            fb_ismultiple,
            fb_asset_count,
            fb_asset_map_status,
            fb_asset_item_master.fb_asset_name,
	        rm_room_name,
            complaint_dept_name,
            fb_complaint_dep
        from 
	        fb_asset_map_master
        left join rm_newroom_creation on rm_newroom_creation.rm_room_slno = fb_asset_map_master.fb_rc_roomslno
        left join fb_asset_item_master on fb_asset_item_master.fb_asset_slno = fb_asset_map_master.fb_asset_id	
        left join cm_complaint_dept on cm_complaint_dept.complaint_dept_slno = fb_asset_map_master.fb_complaint_dep		 
                `,
            [
            ]
            , (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    getberremarkstatus: (callBack) => {
        pool.query(
            `select  fb_bed.fb_bed_slno,
             fb_bed.fb_bd_code,
             fb_bed.fb_bdc_no,
             fb_bed.fb_ns_code,
             fb_bed_remark,
             fb_overall_remarks,
             fb_overall_condition,
             fb_emp_assign,
             fb_bed_service_status,
             fb_initail_checked,
             fb_bed_status   
            from fb_bed_remarks
			left join fb_bed on fb_bed.fb_bed_slno = fb_bed_remarks.fb_bed_slno
                `,
            [
            ]
            , (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    getallHousekeepingBeds: (callBack) => {
        pool.query(
            ` select 	
	            fb_bed_remarks.fb_bed_rmk_slno,
	            fb_bed.fb_bed_slno,
                fb_bed.fb_bd_code,
                fb_bed.fb_bdc_no,
                fb_bed.fb_ns_code,
                fb_bed_remark,
                fb_overall_remarks,
                fb_bed_status,
                fb_bed_remarks.create_date
            from 
                fb_bed_remarks
            where 
                fb_bed_remarks.fb_bed_status = 0
            `,
            []
            , (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    getallroomdetail: (callBack) => {
        pool.query(
            `select 	
	            rm_room_slno,
	            rm_room_name
            from 
                rm_newroom_creation
            where 
                rm_room_status = 1 and rm_build_slno = 1 and rm_building_block_slno = 1 and (rm_room_floor_slno = 1 or rm_room_floor_slno = 3)
            `,
            []
            , (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    getallbedmaster: (callBack) => {
        pool.query(
            `select 	
	            fb_bed_slno, fb_bd_code, fb_bdc_no
            from 
                fb_bed
            `,
            []
            , (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    getallassetItems: (callBack) => {
        pool.query(
            `select 	
	            fb_asset_slno,
                fb_asset_name,
                fb_dep_id,
                fb_asset_status,
                complaint_dept_name,
                complaint_type_name,
                fb_asset_item_master.fb_asset_type
            from 
                fb_asset_item_master
                left join cm_complaint_dept on fb_asset_item_master.fb_dep_id = cm_complaint_dept.complaint_dept_slno
                left join cm_complaint_type on cm_complaint_type.complaint_type_slno = fb_asset_item_master.fb_asset_type;  
            `,
            []
            , (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    getroomchecklist: (callBack) => {
        pool.query(
            `select 	
	            fb_item_slno,
                fb_item_name, 
                fb_item_status
            from 
                fb_patient_rm_checklist
            where fb_item_status =  1
            `,
            []
            , (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    getallhkitem: (callBack) => {
        pool.query(
            `
            SELECT 
                fb_hk_rm_cklist_slno,
                fb_hk_rm_cklist_name,
                fb_hk_rm_cklist_status,
                fb_dep_id,
                complaint_dept_name,
                complaint_type_name,
                fb_hk_item_master.fb_asset_type
            FROM
                fb_hk_item_master
                left join cm_complaint_dept on fb_hk_item_master.fb_dep_id = cm_complaint_dept.complaint_dept_slno
                left join cm_complaint_type on cm_complaint_type.complaint_type_slno = fb_hk_item_master.fb_asset_type;
            `,
            []
            , (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    getnursingstaiton: (callBack) => {
        pool.query(
            `SELECT 
                fb_ns_code, fb_ns_name
            FROM
                fb_nurse_station_master
            `,
            []
            , (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    getallhkempdtl: (callBack) => {
        pool.query(
            `select 	
	            fb_hkemp_slno,
                fb_hk_emp_name, 
                fb_hk_empid,
                fb_hk_issupevisor,
                fb_emp_status
            from 
                fb_hk_empdtl_master
            `,
            []
            , (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    getCurrentCompany: (callBack) => {
        pool.query(`
            SELECT 
                company_slno
            FROM
                crm_common
            `,
            []
            , (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    getCommonFeedbackReport: (data, callBack) => {
        pool.query(`
             SELECT 
                fb_transaction_mast.fb_transact_slno,
                fb_patient_name,
                fb_patient_mob,
                fd_mark,
                fb_suggestion,
                rating_name,
                rating_value,
                fd_qa_eng,
                fb_ip_num,
                fb_transaction_mast.create_date,
                fb_transaction_mast.create_user,
                em_name
                FROM fb_transaction_mast  
                LEFT JOIN fb_transaction_detl ON fb_transaction_detl.fb_transact_slno = fb_transaction_mast.fb_transact_slno
                LEFT JOIN fb_mast_qakey ON fb_mast_qakey.fbqa_slno = fb_transaction_detl.fbqa_slno
                LEFT JOIN fb_detl ON fb_detl.fddet_slno = fb_transaction_detl.fddet_slno
                LEFT JOIN co_employee_master ON co_employee_master.em_id = fb_transaction_mast.create_user
                WHERE fb_transaction_mast.fdmast_slno = 3
                AND fb_transaction_mast.create_date between ? and ?;
            `,
            [
                data.FROM_DATE,
                data.TO_DATE
            ]
            , (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    getIpFeedbackReport: (data, callBack) => {
        pool.query(`
              SELECT 
                fb_transaction_mast.fb_transact_slno,
                fb_patient_name,
                fb_patient_mob,
                fd_mark,
                fb_suggestion,
                rating_name,
                rating_value,
                fd_qa_eng,
                fb_ip_num,
                fb_transaction_mast.create_date,
                fb_transaction_mast.create_user,
                em_name
                FROM fb_transaction_mast  
                LEFT JOIN fb_transaction_detl ON fb_transaction_detl.fb_transact_slno = fb_transaction_mast.fb_transact_slno
                LEFT JOIN fb_mast_qakey ON fb_mast_qakey.fbqa_slno = fb_transaction_detl.fbqa_slno
                LEFT JOIN fb_detl ON fb_detl.fddet_slno = fb_transaction_detl.fddet_slno
                LEFT JOIN co_employee_master ON co_employee_master.em_id = fb_transaction_mast.create_user
                WHERE fb_transaction_mast.fdmast_slno = 7
                AND fb_transaction_mast.create_date between ? and ?;
            `,
            [
                data.FROM_DATE,
                data.TO_DATE
            ]
            , (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    CheckEmployeeAlreadyExist: (data, callBack) => {
        pool.query(
            `select 	
	            fb_hkemp_slno,
                fb_hk_emp_name, 
                fb_hk_empid
            from 
                fb_hk_empdtl_master
            where 
                fb_hk_empid = ?
            `,
            [
                data.fb_hk_empid
            ]
            , (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    getallhkactiveitem: (callBack) => {
        pool.query(
            `
            SELECT 
                fb_hk_rm_cklist_slno,
                fb_hk_rm_cklist_name,
                fb_hk_rm_cklist_status,
                fb_dep_id,
                complaint_dept_name,
                complaint_type_name,
                fb_hk_item_master.fb_asset_type
            FROM
                fb_hk_item_master
                    LEFT JOIN
                cm_complaint_dept ON fb_hk_item_master.fb_dep_id = cm_complaint_dept.complaint_dept_slno
                    LEFT JOIN
                cm_complaint_type ON cm_complaint_type.complaint_type_slno = fb_hk_item_master.fb_asset_type
            WHERE
                fb_hk_rm_cklist_status = 1
            `,
            []
            , (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    getstarcount: (callBack) => {
        pool.query(
            `SELECT 
                fd_mark,
                COUNT(*) AS rating_count
            FROM 
                fb_transaction_detl
            LEFT JOIN 
                fb_mast_qakey ON fb_transaction_detl.fbqa_slno = fb_mast_qakey.fbqa_slno
            WHERE 
                fb_mast_qakey.fb_rateing_slno IN (4, 5) 
                AND fb_aq_status != 0
            GROUP BY 
                fd_mark
            ORDER BY 
                fd_mark DESC
            `,
            []
            , (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    getcategorycount: (callBack) => {
        pool.query(
            ` 
            SELECT 
                fb_transaction_detl.fb_category_slno,
                COUNT(*) AS question_count,
                fb_category_name
            FROM 
                fb_transaction_detl
            LEFT JOIN 
                fb_category_master ON fb_transaction_detl.fb_category_slno = fb_category_master.fb_category_slno
            LEFT JOIN 
                fb_mast_qakey ON fb_transaction_detl.fbqa_slno = fb_mast_qakey.fbqa_slno
            WHERE  fb_aq_status != 0
            GROUP BY 
                fb_category_slno
            ORDER BY 
                fb_category_slno DESC
            `,
            []
            , (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    getprocheckbed: (callBack) => {
        pool.query(
            `select 	
	            fb_check_bed_slno,
                fb_bed.fb_bed_slno, 
                fb_bed.fb_bd_code, 
                fb_bed.fb_bdc_no, 
                fb_bed.fb_ns_code, 
                fb_initial_check, 
                fb_final_check
            from fb_pro_check_bed
			left join fb_bed on fb_bed.fb_bed_slno = fb_pro_check_bed.fb_bed_slno
            `,
            []
            , (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    getprocheckcompletebed: (callBack) => {
        pool.query(
            `SELECT 
               fb_bed.fb_bed_slno, 
               fb_bed.fb_bd_code,
               fb_bed.fb_bdc_no,
               fb_bed.fb_ns_code,
               fb_bed.fb_rt_code,
               fb_bed.fb_bdc_occup,
               fb_bed.fb_bdn_cccno,
               fb_bed.fb_bdc_status,
               fb_bed.fb_hkd_cleaningreq,
               fb_bed.fb_rm_code,
               fb_bed.fb_bdc_mhcode,
               fb_bed.fb_bdc_vipbed,
               fb_ns_name,
               fb_rtc_desc,
               fb_rtc_alias,
               fb_bed.create_date,
               fb_rm_room_slno,
               fb_pro_check_bed.fb_final_check
               FROM fb_pro_check_bed
               LEFT JOIN fb_bed 
               ON fb_bed.fb_bed_slno = fb_pro_check_bed.fb_bed_slno
               LEFT JOIN fb_nurse_station_master 
               ON fb_bed.fb_ns_code = fb_nurse_station_master.fb_ns_code   
               LEFT JOIN fb_room_type 
               ON fb_bed.fb_rt_code = fb_room_type.fb_rt_code
			   LEFT JOIN fb_roomcreation_master 
               ON fb_bed.fb_bd_code = fb_roomcreation_master.fb_rm_bd_code 
               WHERE fb_pro_check_bed.fb_final_check = 1
            `,
            []
            , (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    getdepassetonly: (data, callBack) => {
        pool.query(
            `select 	
	            fb_asset_slno,
                fb_asset_name,
                fb_dep_id,
                fb_asset_status,
                complaint_dept_name
            from 
                fb_asset_item_master
			left join cm_complaint_dept on fb_asset_item_master.fb_dep_id = cm_complaint_dept.complaint_dept_slno
                where fb_dep_id = ?`,
            [
                data
            ]
            , (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    FindRoomAlreadyPresent: (data, callBack) => {
        pool.query(
            `select 	
	            fb_nw_room_slno, fb_rm_bd_code, fb_rm_room_slno
            from 
                fb_roomcreation_master
            where fb_rm_bd_code = ?  or fb_rm_room_slno= ?
            `,
            [
                data.fb_rm_bd_code,
                data.fb_rm_room_slno
            ]
            , (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    insertroommaster: (data, callBack) => {
        pool.query(
            `
            INSERT INTO  fb_roomcreation_master(
                fb_rm_bd_code,
                fb_rm_room_slno,
                fb_nw_room_status,
                create_user
            ) 
            VALUES(?,?,?,?)
            `,
            [
                data.fb_rm_bd_code,
                data.fb_rm_room_slno,
                data.fb_nw_room_status,
                data.create_user
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    updateroommaster: (data, callBack) => {
        pool.query(
            `
            UPDATE  fb_roomcreation_master
            SET
            fb_rm_bd_code = ?,
            fb_rm_room_slno = ?,
            fb_nw_room_status=?,
            edit_user = ?
            WHERE fb_nw_room_slno = ?
            `,
            [
                data.fb_rm_bd_code,
                data.fb_rm_room_slno,
                data.fb_nw_room_status,
                data.edit_user,
                data.fb_nw_room_slno
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    getallnewroomdetail: (callBack) => {
        pool.query(
            `
select
            ROW_NUMBER() OVER () AS slno, 	
	           fb_nw_room_slno, 
               fb_rm_bd_code,
               fb_rm_room_slno,
               fb_nw_room_status,
               rm_room_name,
               fb_bdc_no
            from 
                fb_roomcreation_master
			left join rm_newroom_creation on rm_newroom_creation.rm_room_slno = fb_roomcreation_master.fb_rm_room_slno
            left join fb_bed on fb_bed.fb_bd_code = fb_roomcreation_master.fb_rm_bd_code
            `,
            []
            , (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    getAllComplaintDetail: (callBack) => {
        pool.query(
            `select 	
	            complaint_dept_slno,
                complaint_dept_name,
                department_slno,
                complaint_dept_status
            from 
                cm_complaint_dept
            where 
                complaint_dept_status = 1 
            `,
            []
            , (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    getallComplaintType: (data, callBack) => {
        pool.query(
            `SELECT 
                    complaint_type_slno, complaint_type_name
                FROM
                    cm_complaint_type
                WHERE
                    complaint_dept_slno = ?
                        AND complaint_type_status = 1;
            `,
            [data]
            , (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },

    complaintregistraion: (data, callBack) => {
        const promises = data?.map((item) => {
            return new Promise((resolve, reject) => {
                pool.query(
                    `INSERT INTO  cm_complaint_mast(
                    complaint_slno,
                    complaint_deptslno,
                    complaint_desc,
                    complaint_request_slno,
                    compalint_date,
                    compalint_status,
                    cm_location,
                    complaint_typeslno,
                    cm_complaint_location,
                    create_user,
                    fb_ticket,
                    complaint_dept_secslno
                ) 
                VALUES(?,?,?,?,?,?,?,?,?,?,?,?)
            `,
                    [
                        item.complaint_slno,
                        item.complaint_deptslno,
                        item.complaint_desc,
                        item.complaint_request_slno,
                        item.compalint_date,
                        item.compalint_status,
                        item.cm_location,
                        item.complaint_typeslno,
                        item.cm_complaint_location,
                        item.create_user,
                        item.fb_ticket,
                        item.complaint_dept_secslno
                    ],
                    (error, results, fields) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(results);
                        }
                    }
                );
            });
        });
        // Use Promise.all to wait for all insertions
        Promise.all(promises)
            .then((results) => {
                callBack(null, results);
            })
            .catch((error) => {
                callBack(error);
            });
    },
    UpdateSeiralNos: (data, callBack) => {
        pool.query(
            `
            UPDATE 
                serial_nos 
            SET
                serial_current = serial_current + ?
            WHERE serial_slno = 5
            `,
            [
                data
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    fetchcurrentserialnos: (callBack) => {
        pool.query(
            `
            SELECT serial_current FROM serial_nos where serial_slno = 5
            `,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    // insertAssetDetail: (data, callBack) => {
    //     const { complaint_slno, asset, create_user, asset_status } = data;
    //     // Create promises for each item in the data
    //     const promises = asset?.map((item) => {
    //         return new Promise((resolve, reject) => {
    //             pool.query(
    //                 `
    //                 INSERT INTO cm_comasset_mapping(
    //                     cm_complait_slno,
    //                     create_user,
    //                     asset_status,
    //                     am_item_map_slno,
    //                     cm_asset_dept,
    //                     cm_am_assetmap_slno 
    //                 )
    //                 VALUES(?,?,?,?,?,?)       
    //                 `,
    //                 [
    //                     complaint_slno,
    //                     create_user,
    //                     asset_status,
    //                     item.slno,
    //                     item.item_asset_no,
    //                     item.item_assent_no_only
    //                 ],
    //                 (error, results, fields) => {
    //                     if (error) {
    //                         reject(error);
    //                     } else {
    //                         resolve(results);
    //                     }
    //                 }
    //             );
    //         });
    //     });
    //     // Use Promise.all to wait for all insertions
    //     Promise.all(promises)
    //         .then((results) => {
    //             callBack(null, results);
    //         })
    //         .catch((error) => {
    //             callBack(error);
    //         });
    // },
    getcomplaintdetail: (data, callBack) => {
        pool.query(
            `SELECT
                cm_complaint_mast.complaint_slno,
                complaint_deptslno,
                complaint_desc,
                complaint_request_slno,
                compalint_date,
                compalint_status,
                cm_location,
                fb_bd_code,
                fb_bdc_no,
                complaint_dept_name,
                cm_asset_dept,
                cm_am_assetmap_slno,
                fb_bed.fb_bed_slno,
                fb_final_checked,

                
                GROUP_CONCAT(DISTINCT assigned_em.em_name SEPARATOR ', ') AS assigned_employees,

                
                GROUP_CONCAT(
                    DISTINCT CASE 
                        WHEN cm_complaint_detail.assign_rect_status = 1 
                        THEN assigned_em.em_name 
                    END 
                    SEPARATOR ', '
                ) AS rectified_employees,

                created_by.em_name AS Registered_user,
                cm_complaint_mast.create_user

            FROM cm_complaint_mast 
                LEFT JOIN fb_bed ON cm_complaint_mast.cm_complaint_location = fb_bed.fb_bdc_no
                LEFT JOIN cm_complaint_dept ON cm_complaint_mast.complaint_deptslno = cm_complaint_dept.complaint_dept_slno
                LEFT JOIN cm_comasset_mapping ON cm_complaint_mast.complaint_slno = cm_comasset_mapping.cm_complait_slno
                LEFT JOIN fb_bed_remarks ON fb_bed_remarks.fb_bed_slno = fb_bed.fb_bed_slno
                LEFT JOIN cm_complaint_detail ON cm_complaint_detail.complaint_slno = cm_complaint_mast.complaint_slno
                LEFT JOIN co_employee_master AS assigned_em ON assigned_em.em_id = cm_complaint_detail.assigned_emp
                LEFT JOIN co_employee_master AS created_by ON created_by.em_id = cm_complaint_mast.create_user

            WHERE 
                cm_complaint_location = ? 
                AND fb_ticket = 1 
                AND fb_final_checked IS NULL

            GROUP BY  
                cm_complaint_mast.complaint_slno,
                complaint_deptslno,
                complaint_desc,
                complaint_request_slno,
                compalint_date,
                compalint_status,
                cm_location,
                fb_bd_code,
                fb_bdc_no,
                complaint_dept_name,
                cm_asset_dept,
                cm_am_assetmap_slno,
                fb_bed.fb_bed_slno,
                fb_final_checked,
                created_by.em_name,
                cm_complaint_mast.create_user
    `,
            [
                data
            ]
            , (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    rectifycomplaint: (data, callBack) => {
        pool.query(
            `
            UPDATE cm_complaint_mast
            SET
                compalint_status = ?,
                cm_rectify_time = ?,
                cm_rectify_status = 'R'
            WHERE
                complaint_slno = ?
            `,
            [
                data.status,
                data.compalint_date,
                data.complaint_slno
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    insertassetitem: (data, callBack) => {
        pool.query(
            `
            INSERT INTO  fb_asset_item_master(
                    fb_asset_name,
                    fb_dep_id,
                    fb_asset_status,
                    fb_asset_type,
                    create_user
                ) 
                VALUES(?,?,?,?,?)
            `,
            [
                data.fb_asset_name,
                data.fb_dep_id,
                data.fb_asset_status,
                data.fb_asset_type,
                data.create_user
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    insertroomchecklist: (data, callBack) => {
        pool.query(
            `
            INSERT INTO  fb_patient_rm_checklist(
                    fb_item_name,
                    fb_item_status,
                    create_user
                ) 
                VALUES(?,?,?)
            `,
            [
                data.fb_item_name,
                data.fb_item_status,
                data.create_user
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    insertdischargeroomitem: (data, callBack) => {
        pool.query(
            `
            INSERT INTO  fb_hk_item_master(
                fb_hk_rm_cklist_name, 
                fb_dep_id,
                fb_asset_type,
                fb_hk_rm_cklist_status,
                create_user
                ) 
                VALUES(?,?,?,?,?)
            `,
            [
                data.fb_hk_item_name,
                data.fb_dep_id,
                data.dep_item_type_id,
                data.fb_hk_item_status,
                data.create_user
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    inserthkempdtl: (data, callBack) => {
        pool.query(
            `
            INSERT INTO  fb_hk_empdtl_master(
                fb_hk_emp_name, 
                fb_hk_empid, 
                fb_hk_issupevisor, 
                fb_emp_status,
                create_user
                ) 
                VALUES(?,?,?,?,?)
            `,
            [
                data.fb_hk_emp_name,
                data.fb_hk_empid,
                data.fb_hk_issupevisor,
                data.fb_emp_status,
                data.create_user
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    patientnotresponding: (data, callBack) => {
        pool.query(
            `
            INSERT INTO  fb_pt_not_responding(
                fb_pt_ipno, 
                fb_pt_nr_remark, 
                create_user
                ) 
                VALUES(?,?,?)
            `,
            [
                data.fb_ip_no,
                data.remarks,
                data.create_user
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    updateassetitem: (data, callBack) => {
        pool.query(
            `
            UPDATE  fb_asset_item_master
                SET
                    fb_asset_name = ?,
                    fb_dep_id = ?,
                    fb_asset_status = ?,
                    fb_asset_type = ?,
                    edit_user = ?
                where 
                    fb_asset_slno = ?
            `,
            [
                data.fb_asset_name,
                data.fb_dep_id,
                data.fb_asset_status,
                data.fb_asset_type,
                data.edit_user,
                data.fb_assets_slno
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },

    UpdateComplaintDetailTable: (data, callBack) => {
        const promises = data?.flatMap((item) =>
            item.assigned_user?.map((user) =>
                new Promise((resolve, reject) => {
                    pool.query(
                        ` INSERT INTO cm_complaint_detail(
                            complaint_slno,
                            assigned_emp,
                            assigned_date,
                            assigned_user,
                            assign_rect_status,
                            assign_status
                        ) 
                        VALUES(?,?,?,?,?,?)`,
                        [
                            item.complaint_slno,
                            user,
                            item.compalint_date,
                            item.create_user,
                            item.assign_rect_status,
                            item.assign_status
                        ],
                        (error, results, fields) => {
                            if (error) {
                                reject(error);
                            } else {
                                resolve(results);
                            }
                        }
                    );
                })
            )
        );

        Promise.all(promises)
            .then((results) => {
                callBack(null, results);
            })
            .catch((error) => {
                callBack(error);
            });
    },
    FindAlreadyAssetExist: (data, callBack) => {
        pool.query(
            `
            select 
            fb_assets_map_slno,
	        fb_rc_roomslno, 
            fb_asset_map_master.fb_dep_id,
            fb_asset_map_master.fb_asset_id ,
            fb_ismultiple,
            fb_asset_count,
            fb_asset_map_status
        from 
	        fb_asset_map_master
        where fb_rc_roomslno = ? and fb_dep_id= ? and fb_asset_id = ?
            `,
            [
                data.fb_rc_roomslno,
                data.fb_dep_id,
                data.fb_asset_id
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    insertroomassetdetail: (data, callBack) => {
        pool.query(
            `
            INSERT INTO  fb_asset_map_master(
                    fb_rc_roomslno,
                    fb_dep_id,
                    fb_complaint_dep,
                    fb_asset_id,
                    fb_ismultiple,
                    fb_asset_count ,
                    fb_asset_map_status,
                    create_user
                ) 
                VALUES(?,?,?,?,?,?,?,?)
            `,
            [
                data.fb_rc_roomslno,
                data.fb_dep_id,
                data.fb_complaint_dep,
                data.fb_asset_id,
                data.fb_ismultiple,
                data.fb_asset_count,
                data.fb_asset_map_status,
                data.create_user
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },

    updateroomassetdetail: (data, callBack) => {
        pool.query(
            `
            UPDATE  fb_asset_map_master
                SET
                    fb_rc_roomslno= ?,
                    fb_dep_id= ?,
                    fb_complaint_dep=?,
                    fb_asset_id= ?,
                    fb_ismultiple= ?,
                    fb_asset_count = ?,
                    fb_asset_map_status= ?,
                    edit_user = ?
                WHERE
                    fb_assets_map_slno = ?
            `,
            [
                data.fb_rc_roomslno,
                data.fb_dep_id,
                data.fb_complaint_dep,
                data.fb_asset_id,
                data.fb_ismultiple,
                data.fb_asset_count,
                data.fb_asset_map_status,
                data.edit_user,
                data.fb_assets_map_slno
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    inserthkbedassign: (data, callBack) => {
        pool.query(
            `
            INSERT INTO  fb_hk_check_bed(
                    fb_hk_bed_slno,
                    fb_hk_sv_assign,
                    fb_hk_status,
                    create_user
                ) 
                VALUES(?,?,?,?)
            `,
            [
                data.fb_hk_bed_slno,
                data.fb_hk_sv_assign,
                data.fb_hk_status,
                data.create_user
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    UpdateAssignedBed: (data, callBack) => {
        pool.query(
            `
            UPDATE  fb_hk_check_bed
                SET
                    fb_hk_status = ?,
                    edit_user = ?
                WHERE
                    fb_hk_bed_slno=?
            `,
            [
                data.fb_hk_status,
                data.edit_user,
                data.fb_hk_bed_slno
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    updateroomchecklist: (data, callBack) => {
        pool.query(
            `
            UPDATE  fb_patient_rm_checklist
                SET
                    fb_item_name = ?,
                    fb_item_status = ?,
                    edit_user =?
                WHERE
                    fb_item_slno = ?
            `,
            [
                data.fb_item_name,
                data.fb_item_status,
                data.edit_user,
                data.fb_item_slno
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    updatedischargeroomitem: (data, callBack) => {
        pool.query(
            `
            UPDATE  fb_hk_item_master
                SET
                fb_hk_rm_cklist_name=?, 
                fb_dep_id = ?,
                fb_asset_type = ?,
                fb_hk_rm_cklist_status = ?,
                edit_user =?
                WHERE
                    fb_hk_rm_cklist_slno = ?
            `,
            [
                data.fb_hk_item_name,
                data.fb_dep_id,
                data.dep_item_type_id,
                data.fb_hk_item_status,
                data.edit_user,
                data.fb_hk_item_slno
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    updatehkempdtl: (data, callBack) => {
        pool.query(
            `
            UPDATE  fb_hk_empdtl_master
                SET
                fb_hk_emp_name=?, 
                fb_hk_empid=?,
                fb_hk_issupevisor=?,
                fb_emp_status=?,
                edit_user =?
                WHERE
                    fb_hkemp_slno = ?
            `,
            [
                data.fb_hk_emp_name,
                data.fb_hk_empid,
                data.fb_hk_issupevisor,
                data.fb_emp_status,
                data.edit_user,
                data.fb_hkemp_slno
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    getptimpression: (data, callBack) => {
        pool.query(
            `
            SELECT 
                fb_pt_imp_quest.fb_quest_id,
                fb_quest_sub,
                fb_ans_detail,
                fb_quest,
                em_name,
                fb_imp_transact_mast.create_date,
                fb_imp_ans
            FROM
                fb_imp_transact_mast
                    LEFT JOIN fb_pt_imp_quest ON fb_imp_transact_mast.fb_quest_id = fb_pt_imp_quest.fb_quest_id
                    LEFT JOIN co_employee_master ON fb_imp_transact_mast.create_user = co_employee_master.em_id
            WHERE
                fb_transact_slno = ?
            `,
            [
                data.FB_TCT_SLNO
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    getdischargepatient: (data, callBack) => {
        pool.query(
            `
            SELECT 
                fb_ip_no,
                fb_ipd_date,
                fb_pt_no,
                fb_ptc_name,
                fb_ptc_sex,
                fb_ptd_dob,
                fb_ptn_yearage,
                fb_ptc_loadd1,
                fb_ptc_loadd2,
                fb_ptc_loadd3,
                fb_ptc_loadd4,
                fb_ipd_disc,
                fb_ipc_status,
                fb_dmd_date,
                fb_ptc_mobile,
                fb_doc_name,
                fb_dep_desc
            FROM
                fb_ipadmiss
            WHERE
                fb_ipd_disc IS NOT NULL AND fb_ipc_status = 'R'
                    AND fb_ipd_disc  BETWEEN ? AND ?
            `,
            [
                data.FROM_DATE,
                data.TO_DATE
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    getpatientnotresponding: (data, callBack) => {
        pool.query(
            `
            SELECT 
                fb_pt_nr_remark,
                fb_pt_not_responding.create_date,
                em_name
            FROM
                fb_pt_not_responding
                LEFT JOIN co_employee_master ON fb_pt_not_responding.create_user = co_employee_master.em_id
            WHERE
                fb_pt_ipno= ?
            `,
            [
                data.IP_NO
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    CheckBedAlreadyAssigned: (data, callBack) => {
        pool.query(
            `
            SELECT 
                fb_hk_slno
            FROM
                fb_hk_check_bed
            WHERE
                fb_hk_sv_assign = ?
                    AND fb_hk_bed_slno = ?
                    AND fb_hk_status = 0	
            `,
            [
                data.fb_hk_sv_assign,
                data.fb_hk_bed_slno
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    getdischargeentrybed: (callBack) => {
        pool.query(
            `
              SELECT 
               fb_bed.fb_bed_slno, 
               fb_bed.fb_bd_code,
               fb_bed.fb_bdc_no,
               fb_bed.fb_ns_code,
               fb_bed.fb_rt_code,
               fb_bed.fb_bdc_occup,
               fb_bed.fb_bdn_cccno,
               fb_bed.fb_bdc_status,
               fb_bed.fb_hkd_cleaningreq,
               fb_bed.fb_rm_code,
               fb_bed.fb_bdc_mhcode,
               fb_bed.fb_bdc_vipbed,
               fb_ns_name,
               fb_rtc_desc,
               fb_rtc_alias,
               fb_bed.create_date,
               fb_bed_remarks.fb_bed_remark,
               fb_bed_remarks.fb_bed_status,
               fb_rm_room_slno,
               fb_ipadmiss.fb_ipc_curstatus
               FROM fb_bed
               LEFT JOIN fb_nurse_station_master 
               ON fb_bed.fb_ns_code = fb_nurse_station_master.fb_ns_code   
               LEFT JOIN fb_room_type 
               ON fb_bed.fb_rt_code = fb_room_type.fb_rt_code
			   LEFT JOIN fb_roomcreation_master 
               ON fb_bed.fb_bd_code = fb_roomcreation_master.fb_rm_bd_code
               LEFT JOIN fb_ipadmiss 
               ON fb_bed.fb_bd_code = fb_ipadmiss.fb_bd_code
               LEFT JOIN fb_bed_remarks 
               ON fb_bed.fb_bed_slno = fb_bed_remarks.fb_bed_slno 
               AND fb_bed_remarks.fb_bed_status = 1 
               WHERE fb_bed.fb_bdc_occup = "T"
               AND (fb_ipc_curstatus IS NULL OR fb_ipc_curstatus <> 'PCO');
            `,
            []
            , (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    insertprocheckbed: (data, callBack) => {
        pool.query(
            `
            INSERT INTO  fb_pro_check_bed(
            fb_bed_slno,
            fb_initial_check,
            fb_initial_ovc,
            fb_initial_remark,
            create_user
            ) 
            VALUES(?,?,?,?,?)
            `,
            [
                data.fb_bed_slno,
                data.fb_initial_check,
                data.fb_initial_ovc,
                data.fb_initial_remark,
                data.create_user

            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, { insertId: results.insertId });
            })
    },


    insertipfollowup: (data, callBack) => {
        const scheduleDate = data.Schedule_date;
        try {
            pool.query(
                `INSERT INTO fb_ip_date_schedule (
                fb_ip_no,
                fb_pt_no,
                fb_schedule_date,
                fb_pro_remark,
                create_user
            ) VALUES (?, ?, ?, ?, ?)
            `,
                [
                    data.fb_ip_no,
                    data.fb_pt_no,
                    scheduleDate,
                    data.fb_pro_remark,
                    data.create_user
                ],
                (error, results, fields) => {
                    if (error) {
                        return callBack(error);
                    }
                    return callBack(null, { insertId: results.insertId });
                }
            );
        } catch (err) {
            return callBack(err);
        }
    },
    updateprocheckbed: (data, callBack) => {
        pool.query(
            `
            UPDATE  fb_pro_check_bed
            SET
                fb_final_check = ?,
                fb_final_ovc=?,
                fb_final_remark=?,
                edit_user = ?
            WHERE
                fb_check_bed_slno = ?
            `,
            [
                data.fb_final_check,
                data.fb_final_ovc,
                data.fb_final_remark,
                data.create_user,
                data.fb_check_bed_slno

            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, { insertId: results.insertId });
            })
    }, UpdateHkAssignedBed: (data, callBack) => {
        pool.query(
            `
            UPDATE  fb_hk_check_bed
            SET
                fb_hk_status = 1,
                edit_user = ?
            WHERE
                fb_hk_slno = ?
            `,
            [
                data.edit_user,
                data.fb_hk_slno

            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, { insertId: results.insertId });
            })
    },
    updateipfollowup: (data, callBack) => {
        pool.query(
            `
            UPDATE  fb_ip_date_schedule
            SET
                fb_schedule_date = ?,
                fb_pro_remark=?,
                edit_user=?
            WHERE
                fb_date_schedule_slno = ?
            `,
            [
                data.Schedule_date,
                data.fb_pro_remark,
                data.edit_user,
                data.slno
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, { insertId: results.insertId });
            })
    },
    CheckProCheckBedPresent: (data, callBack) => {
        pool.query(
            ` select fb_check_bed_slno from fb_pro_check_bed where fb_bed_slno = ? and fb_final_check IS NULL;`,
            [
                data.fb_bed_slno,
            ]
            , (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    InsertProCheckListDetail: (data, callBack) => {
        const { detail, fb_check_bed_slno, create_user } = data;
        const promises = detail?.map((item) => {
            return new Promise((resolve, reject) => {
                pool.query(
                    ` INSERT INTO  fb_pro_checklist_detail(
                    fb_check_bed_slno,
                    fb_item_slno,
                    fb_item_present,
                    fb_present_condition,
                    create_user
                ) 
                VALUES(?,?,?,?,?)
            `,
                    [
                        fb_check_bed_slno,
                        item.fb_item_slno,
                        item.ispresent,
                        item.ispresentcondition,
                        create_user
                    ],
                    (error, results, fields) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(results);
                        }
                    }
                );
            });
        });
        // Use Promise.all to wait for all insertions
        Promise.all(promises)
            .then((results) => {
                callBack(null, results);
            })
            .catch((error) => {
                callBack(error);
            });
    },
    UpdateProCheckListDetail: (data, callBack) => {
        const { detail, fb_check_bed_slno, create_user } = data;
        const promises = detail?.map((item) => {
            return new Promise((resolve, reject) => {
                pool.query(
                    ` UPDATE fb_pro_checklist_detail
                    SET
                        fb_item_condition = ?,
                        edit_user = ?
                    WHERE
                        fb_check_bed_slno = ? and fb_item_slno = ?
            `,
                    [
                        item.iscondtion,
                        create_user,
                        fb_check_bed_slno,
                        item.fb_item_slno
                    ],
                    (error, results, fields) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(results);
                        }
                    }
                );
            });
        });
        // Use Promise.all to wait for all insertions
        Promise.all(promises)
            .then((results) => {
                callBack(null, results);
            })
            .catch((error) => {
                callBack(error);
            });
    },
    getprochecklistdetail: (data, callBack) => {
        pool.query(
            `select 
    fb_check_dt_slno,
    fb_pro_checklist_detail.fb_check_bed_slno,
    fb_patient_rm_checklist.fb_item_slno,
    fb_item_present,
    fb_item_condition,
    fb_bed.fb_bed_slno,
    fb_bed.fb_bdc_no,
    fb_initial_check,
    fb_final_check,
    fb_item_name,
    fb_present_condition,
    fb_initial_remark,
    fb_initial_ovc,
    fb_final_ovc,
    fb_final_remark,
    creator.em_name as created_by,
    editor.em_name as edited_by
from fb_pro_check_bed
left join fb_pro_checklist_detail  on fb_pro_checklist_detail.fb_check_bed_slno = fb_pro_check_bed.fb_check_bed_slno
left join fb_patient_rm_checklist on fb_patient_rm_checklist.fb_item_slno = fb_pro_checklist_detail.fb_item_slno
left join co_employee_master as creator on creator.em_id = fb_pro_check_bed.create_user
left join co_employee_master as editor on editor.em_id = fb_pro_check_bed.edit_user
 left join fb_bed on fb_bed.fb_bed_slno = fb_pro_check_bed.fb_bed_slno
where fb_pro_check_bed.fb_bed_slno = ?;`,
            [
                data
            ]
            , (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    getDischargepatient: (sql, params, callback) => {
        pool.query(sql, params, (error, results) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        });
    },
    insertHkdetails: (data, callBack) => {
        const promises = data?.map((item) => {
            return new Promise((resolve, reject) => {
                pool.query(
                    ` INSERT INTO  fb_hk_bed_detail(
                            fb_hk_slno,
                            fb_hk_rm_cklist_slno,
                            fb_hk_rm_item_condition
                        ) 
                        VALUES(?,?,?)
            `,
                    [
                        item.fb_hk_slno,
                        item.fb_hk_rm_cklist_slno,
                        item.fb_hk_rm_item_condition
                    ],
                    (error, results, fields) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(results);
                        }
                    }
                );
            });
        });
        // Use Promise.all to wait for all insertions
        Promise.all(promises)
            .then((results) => {
                callBack(null, results);
            })
            .catch((error) => {
                callBack(error);
            });

    }, gethkcheckdtl: (data, callBack) => {
        pool.query(
            `
            SELECT 
                fb_hk_rm_item_condition, fb_hk_rm_cklist_slno
            FROM
                fb_hk_bed_detail
            WHERE
                fb_hk_slno = ?;	
            `,
            [
                data.fb_hk_slno
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    gethkbedDetails: (data, callBack) => {
        pool.query(
            `  
            SELECT 
                fb_hk_sv_assign,
                fb_hk_bed_remark,
                fb_hk_check_status,
                em_name,
                fb_hk_bed_status
            FROM
                fb_hk_check_bed
            left join co_employee_master on fb_hk_check_bed.fb_hk_sv_assign = co_employee_master.em_id
            WHERE
                fb_hk_bed_slno = ?
            `,
            [
                data.fb_hk_slno
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },

    gethkcomplaintdetails: (data, callBack) => {
        pool.query(
            `
          SELECT 
            cm_complaint_mast.complaint_slno,
            complaint_desc,
            compalint_status,
            
            GROUP_CONCAT(DISTINCT assigned_em.em_name SEPARATOR ', ') AS assigned_employees,

            GROUP_CONCAT(
                DISTINCT CASE 
                    WHEN cm_complaint_detail.assign_rect_status = 1 
                    THEN assigned_em.em_name 
                END 
                SEPARATOR ', '
            ) AS rectified_employees,

            created_by.em_name AS Registered_user,
            cm_complaint_mast.create_user

        FROM cm_complaint_mast
        LEFT JOIN cm_complaint_detail 
            ON cm_complaint_detail.complaint_slno = cm_complaint_mast.complaint_slno
        LEFT JOIN co_employee_master AS assigned_em 
            ON assigned_em.em_id = cm_complaint_detail.assigned_emp
        LEFT JOIN co_employee_master AS created_by 
            ON created_by.em_id = cm_complaint_mast.create_user

        WHERE 
            complaint_deptslno = ?
            AND cm_complaint_location = ?
            AND fb_ticket = ?

        GROUP BY 
            cm_complaint_mast.complaint_slno,
            complaint_desc,
            compalint_status,
            created_by.em_name,
            cm_complaint_mast.create_user;
            `,
            [
                data.complaint_deptslno,
                data.location,
                data.fb_ticket
            ]
            , (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },


}
