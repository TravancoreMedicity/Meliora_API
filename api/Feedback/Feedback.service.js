const { error } = require("winston")
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
WHERE meliora.fb_subcategory_master.fb_category_slno= ?`,
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
                            console.log(error);

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
            create_user
            ) 
            VALUES(?,?,?,?,?,?,?)
            `,
            [
                data.fb_transact_slno,
                data.fdmast_slno,
                data.fb_ip_num,
                data.fb_patient_num,
                data.fb_patient_name,
                data.fb_patient_mob,
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
        const { answer, fb_transact_slno, create_user } = data
        return Promise.all(answer.map((items) => {
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
                    VALUES (?, ?, ?, ?, ?,?,?,?)
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
  meliora.fb_transaction_detl
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
        console.log("findMenuAlreadyExists", data);

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
            `SELECT em_id, em_name FROM meliora.co_employee_master where em_dept_section=? 
            and em_status=1 and em_no!=1 and em_id!=1606 order by em_name ASC`,
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
    insertbddetail: (data, callBack) => {
        const promises = data.map((item) => {
            return new Promise((resolve, reject) => {
                pool.query(
                    `
                    INSERT INTO fb_bed(
                        fb_bd_code,
                        fb_bdc_no,
                        fb_ns_code,
                        fb_rt_code,
                        fb_bdc_occup,
                        fb_bdn_cccno,
                        fb_bdc_status,
                        fb_hkd_cleaningreq,
                        fb_rm_code,
                        fb_bdc_mhcode,
                        fb_bdc_vipbed
                    )
                    VALUES(?,?,?,?,?,?,?,?,?,?,?)       
                    `,
                    [
                        item.BD_CODE,
                        item.BDC_NO,
                        item.NS_CODE,
                        item.RT_CODE,
                        item.BDC_OCCUP,
                        item.OCCU,
                        item.BDC_STATUS,
                        item.HKD_CLEANINGREQ,
                        item.RM_CODE,
                        item.BDC_MHCODE,
                        item.BDC_VIPBED
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
    CheckBedAlreadyPresent: (data, callBack) => {
        const promises = data.map((item) => {
            return new Promise((resolve, reject) => {
                pool.query(
                    `
                     SELECT
                        fb_bed_slno, 
                        fb_bd_code,
                        fb_bdc_no,
                        fb_ns_code,
                        fb_rt_code,
                        fb_bdc_occup,
                        fb_bdn_cccno,
                        fb_bdc_status,
                        fb_hkd_cleaningreq,
                        fb_rm_code,
                        fb_bdc_mhcode,
                        fb_bdc_vipbed
                    FROM 
                        fb_bed 
                    where 
                    fb_bd_code = ?  and fb_bdc_no = ?  
                    `,
                    [
                        item.BD_CODE,
                        item.BDC_NO,
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
    updatebeddetail: (data, callBack) => {
        const promises = data.map((item) => {
            return new Promise((resolve, reject) => {
                pool.query(
                    `
                     UPDATE fb_bed 
                     SET
                        fb_bd_code = ?,
                        fb_bdc_no = ?,
                        fb_ns_code = ?,
                        fb_rt_code = ?,
                        fb_bdc_occup = ?,
                        fb_bdn_cccno = ?,
                        fb_bdc_status = ?,
                        fb_hkd_cleaningreq = ?,
                        fb_rm_code = ?,
                        fb_bdc_mhcode = ?,
                        fb_bdc_vipbed = ?
                    where 
                        fb_bed_slno = ?  
                    `,
                    [
                        item.BD_CODE,
                        item.BDC_NO,
                        item.NS_CODE,
                        item.RT_CODE,
                        item.BDC_OCCUP,
                        item.OCCU,
                        item.BDC_STATUS,
                        item.HKD_CLEANINGREQ,
                        item.RM_CODE,
                        item.BDC_MHCODE,
                        item.BDC_VIPBED,
                        item.fb_bed_slno
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
    CheckRoomTypeAlreadyPreseint: (data, callBack) => {
        const promises = data.map((item) => {
            return new Promise((resolve, reject) => {
                pool.query(
                    `
                     SELECT
                        fb_rmtp_slno, 
                        fb_rt_code,
                        fb_rtc_desc,
                        fb_rtc_alias,
                        fb_rc_code,
                        fb_rtc_status, 
                        fb_icu,
                        fb_rtc_mhcode     
                    FROM 
                        fb_room_type 
                    where 
                        fb_rt_code = ?  
                    `,
                    [
                        item.RT_CODE,
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
    insertrtdetail: (data, callBack) => {
        const promises = data.map((item) => {
            return new Promise((resolve, reject) => {
                pool.query(
                    `
                    INSERT INTO fb_room_type(
                        fb_rt_code,
                        fb_rtc_desc,
                        fb_rtc_alias,
                        fb_rc_code,
                        fb_rtc_status, 
                        fb_icu,
                        fb_rtc_mhcode
                    )
                    VALUES(?,?,?,?,?,?,?)       
                    `,
                    [
                        item.RT_CODE,
                        item.RTC_DESC,
                        item.RCC_DESC,
                        item.RC_CODE,
                        item.RTC_STATUS,
                        item.ICU,
                        item.RTC_MHCODE
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
    updatertdetail: (data, callBack) => {
        const promises = data.map((item) => {
            return new Promise((resolve, reject) => {
                pool.query(
                    `
                     UPDATE fb_room_type 
                     SET
                        fb_rt_code = ?,
                        fb_rtc_desc = ?,
                        fb_rtc_alias = ?,
                        fb_rc_code = ?,
                        fb_rtc_status = ?, 
                        fb_icu = ?,
                        fb_rtc_mhcode = ?
                    where 
                        fb_rmtp_slno = ?  
                    `,
                    [
                        item.RT_CODE,
                        item.RTC_DESC,
                        item.RCC_DESC,
                        item.RC_CODE,
                        item.RTC_STATUS,
                        item.ICU,
                        item.RTC_MHCODE,
                        item.fb_rmtp_slno
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
    CheckpatientAlreadyPresent: (data, callBack) => {
        const promises = data.map((item) => {
            return new Promise((resolve, reject) => {
                pool.query(
                    `
                     SELECT
                       fb_ipad_slno, fb_ip_no, fb_ipd_date, fb_pt_no, fb_ptc_name, fb_ptc_sex, fb_ptd_dob, fb_ptn_dayage, fb_ptn_monthage, fb_ptn_yearage, fb_ptc_loadd1, fb_ptc_loadd2, fb_ptc_loadd3, fb_ptc_loadd4, fb_ptc_lopin, fb_rc_code, fb_bd_code, fb_do_code, fb_rs_code, fb_ipd_disc, fb_ipc_status, fb_dmc_slno, fb_dmd_date, fb_ptc_mobile, fb_ipc_mhcode, fb_doc_name
                    FROM 
                        fb_ipadmiss 
                    where 
                    fb_ip_no = ?  and fb_pt_no = ?  
                    `,
                    [
                        item.IP_NO,
                        item.PT_NO,
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
    insertPatientDetail: (data, callBack) => {
        const promises = data.map((item) => {
            return new Promise((resolve, reject) => {
                pool.query(
                    `
                    INSERT INTO fb_ipadmiss (
                        fb_ip_no,
                        fb_ipd_date,
                        fb_pt_no,
                        fb_ptc_name,
                        fb_ptc_sex,
                        fb_ptd_dob,   
                        fb_ptn_dayage,
                        fb_ptn_monthage,
                        fb_ptn_yearage,
                        fb_ptc_loadd1,
                        fb_ptc_loadd2, 
                        fb_ptc_loadd3,
                        fb_ptc_loadd4,
                        fb_ptc_lopin,
                        fb_rc_code,
                        fb_bd_code,
                        fb_do_code, 
                        fb_rs_code, 
                        fb_ipd_disc,
                        fb_ipc_status,
                        fb_dmc_slno,
                        fb_dmd_date,
                        fb_ptc_mobile, 
                        fb_ipc_mhcode,
                        fb_doc_name
                    ) VALUES ( ?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    `,
                    [
                        item.IP_NO,
                        item.IPD_DATE,
                        item.PT_NO,
                        item.PTC_PTNAME,
                        item.PTC_SEX,
                        item.PTD_DOB,
                        item.PTN_DAYAGE,
                        item.PTN_MONTHAGE,
                        item.PTN_YEARAGE,
                        item.PTC_LOADD1,
                        item.PTC_LOADD2,
                        item.PTC_LOADD3,
                        item.PTC_LOADD4,
                        item.PTC_LOPIN,
                        item.RC_CODE,
                        item.BD_CODE,
                        item.DO_CODE,
                        item.RS_CODE,
                        item.IPD_DISC,
                        item.IPC_STATUS,
                        item.DMC_SLNO,
                        item.DMD_DATE,
                        item.PTC_MOBILE,
                        item.IPC_MHCODE,
                        item.PTC_REFDOCTOR
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
        Promise.all(promises)
            .then((results) => {
                callBack(null, results);
            })
            .catch((error) => {
                callBack(error);
            });
    },
    updatePatientDetail: (data, callBack) => {
        const promises = data.map((item) => {
            return new Promise((resolve, reject) => {
                pool.query(
                    `
                    UPDATE fb_ipadmiss
                    SET 
                        fb_ip_no = ?, 
                        fb_ipd_date = ?, 
                        fb_pt_no = ?, 
                        fb_ptc_name = ?, 
                        fb_ptc_sex = ?, 
                        fb_ptd_dob = ?, 
                        fb_ptn_dayage = ?, 
                        fb_ptn_monthage = ?, 
                        fb_ptn_yearage = ?, 
                        fb_ptc_loadd1 = ?, 
                        fb_ptc_loadd2 = ?, 
                        fb_ptc_loadd3 = ?, 
                        fb_ptc_loadd4 = ?, 
                        fb_ptc_lopin = ?, 
                        fb_rc_code = ?, 
                        fb_bd_code = ?, 
                        fb_do_code = ?, 
                        fb_rs_code = ?, 
                        fb_ipd_disc = ?, 
                        fb_ipc_status = ?, 
                        fb_dmc_slno = ?, 
                        fb_dmd_date = ?, 
                        fb_ptc_mobile = ?, 
                        fb_ipc_mhcode = ?, 
                        fb_doc_name = ?
                    WHERE fb_ipad_slno = ?
                    `,
                    [
                        item.IP_NO,
                        item.IPD_DATE,
                        item.PT_NO,
                        item.PTC_PTNAME,
                        item.PTC_SEX,
                        item.PTD_DOB,
                        item.PTN_DAYAGE,
                        item.PTN_MONTHAGE,
                        item.PTN_YEARAGE,
                        item.PTC_LOADD1,
                        item.PTC_LOADD2,
                        item.PTC_LOADD3,
                        item.PTC_LOADD4,
                        item.PTC_LOPIN,
                        item.RC_CODE,
                        item.BD_CODE,
                        item.DO_CODE,
                        item.RS_CODE,
                        item.IPD_DISC,
                        item.IPC_STATUS,
                        item.DMC_SLNO,
                        item.DMD_DATE,
                        item.PTC_MOBILE,
                        item.IPC_MHCODE,
                        item.PTC_REFDOCTOR,
                        item.fb_ipad_slno
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
        Promise.all(promises)
            .then((results) => {
                callBack(null, results);
            })
            .catch((error) => {
                callBack(error);
            });

    },
    CheckRoomsinMasterPresent: (data, callBack) => {
        const promises = data.map((item) => {
            return new Promise((resolve, reject) => {
                pool.query(
                    `
                     SELECT
                        fb_rm_slno,
                        fb_rm_code,
                        fb_rmc_desc,
                        fb_rmc_alias,
                        fb_rac_status,
                        fb_rmc_mhcode,
                        fb_ns_code      
                    FROM 
                        fb_room_master 
                    where 
                        fb_rm_code = ?  
                    `,
                    [
                        item.RM_CODE,
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
    insertRoomMasterdetail: (data, callBack) => {
        const promises = data.map((item) => {
            return new Promise((resolve, reject) => {
                pool.query(
                    `
                    INSERT INTO fb_room_master(
                        fb_rm_code,
                        fb_rmc_desc,
                        fb_rmc_alias,
                        fb_rac_status,
                        fb_rmc_mhcode,
                        fb_ns_code
                    )
                    VALUES(?,?,?,?,?,?)       
                    `,
                    [
                        item.RM_CODE,
                        item.RMC_DESC,
                        item.RMC_ALIAS,
                        item.RMC_STATUS,
                        item.RMC_MHCODE,
                        item.NS_CODE
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
    updateRoomMasterDetail: (data, callBack) => {
        const promises = data.map((item) => {
            return new Promise((resolve, reject) => {
                pool.query(
                    `
                     UPDATE fb_room_master 
                     SET
                        fb_rm_code = ?,
                        fb_rmc_desc = ?,
                        fb_rmc_alias = ?,
                        fb_rac_status = ?,
                        fb_rmc_mhcode = ?,
                        fb_ns_code= ?
                    where 
                        fb_rm_slno = ?  
                    `,
                    [
                        item.RM_CODE,
                        item.RMC_DESC,
                        item.RMC_ALIAS,
                        item.RMC_STATUS,
                        item.RMC_MHCODE,
                        item.NS_CODE,
                        item.fb_rm_slno
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
    CheckadmnReasonsExits: (data, callBack) => {
        const promises = data.map((item) => {
            return new Promise((resolve, reject) => {
                pool.query(
                    `
                     SELECT
                        fb_adrn_slno,
                        fb_rs_code, 
                        fb_rsc_desc,
                        fb_rsc_alias,
                        fb_rsc_status      
                    FROM 
                        fb_admn_reason 
                    where 
                        fb_rs_code = ?  
                    `,
                    [
                        item.RS_CODE,
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
    insertadminReasons: (data, callBack) => {
        const promises = data.map((item) => {
            return new Promise((resolve, reject) => {
                pool.query(
                    `
                    INSERT INTO fb_admn_reason(
                        fb_rs_code, 
                        fb_rsc_desc,
                        fb_rsc_alias,
                        fb_rsc_status  
                    )
                    VALUES(?,?,?,?)       
                    `,
                    [
                        item.RS_CODE,
                        item.RSC_DESC,
                        item.RSC_ALIAS,
                        item.RSC_STATUS
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
    updateadmnReasons: (data, callBack) => {
        const promises = data.map((item) => {
            return new Promise((resolve, reject) => {
                pool.query(
                    `
                     UPDATE fb_admn_reason 
                     SET
                        fb_rs_code = ?,
                        fb_rsc_desc = ?,
                        fb_rsc_alias = ?,
                        fb_rsc_status = ?
                    where 
                        fb_adrn_slno = ?  
                    `,
                    [
                        item.RS_CODE,
                        item.RSC_DESC,
                        item.RSC_ALIAS,
                        item.RSC_STATUS,
                        item.fb_adrn_slno
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
    CheckRoomCategoryExists: (data, callBack) => {
        const promises = data.map((item) => {
            return new Promise((resolve, reject) => {
                pool.query(
                    `
                     SELECT
                        fb_rc_slno,
                        fb_rc_code,
                        fb_rcc_desc,
                        fb_rcc_alias,
                        fb_rcc_status,
                        fb_rcc_mhocde      
                    FROM 
                        fb_room_category 
                    where 
                        fb_rc_code = ?  
                    `,
                    [
                        item.RC_CODE,
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
    insertRoomCategoryDetail: (data, callBack) => {
        const promises = data.map((item) => {
            return new Promise((resolve, reject) => {
                pool.query(
                    `
                    INSERT INTO fb_room_category(
                        fb_rc_code,
                        fb_rcc_desc,
                        fb_rcc_alias,
                        fb_rcc_status,
                        fb_rcc_mhocde 
                    )
                    VALUES(?,?,?,?,?)       
                    `,
                    [
                        item.RC_CODE,
                        item.RCC_DESC,
                        item.RCC_ALIAS,
                        item.RCC_STATUS,
                        item.RCC_MHCODE
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
    UpdateRoomCategoryDetail: (data, callBack) => {
        const promises = data.map((item) => {
            return new Promise((resolve, reject) => {
                pool.query(
                    `
                     UPDATE fb_room_category 
                     SET
                        fb_rc_code = ?,
                        fb_rcc_desc = ?,
                        fb_rcc_alias = ?,
                        fb_rcc_status = ?,
                        fb_rcc_mhocde = ?
                    where 
                        fb_rc_slno = ?  
                    `,
                    [
                        item.RC_CODE,
                        item.RCC_DESC,
                        item.RCC_ALIAS,
                        item.RCC_STATUS,
                        item.RCC_MHCODE,
                        item.fb_rc_slno
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
                    fb_ptn_yearage                              
                FROM 
                    fb_ipadmiss,fb_bed,fb_nurse_station_master
                WHERE 
                        fb_bed.fb_bd_code = fb_ipadmiss.fb_bd_code
                       AND fb_nurse_station_master.fb_ns_code=fb_bed.fb_ns_code
                       AND fb_nurse_station_master.fb_ns_code = ?
                       AND fb_ipadmiss.fb_bd_code = ?
                       ORDER BY fb_ipadmiss.fb_ip_no
    
            `,
            [
                data.fb_ns_code,
                data.fb_bd_code,

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
               fb_bed_remarks.fb_bed_reason,
               fb_bed_remarks.fb_bed_status
               FROM meliora.fb_bed
               LEFT JOIN fb_nurse_station_master 
               ON fb_bed.fb_ns_code = fb_nurse_station_master.fb_ns_code
               LEFT JOIN fb_room_type 
               ON fb_bed.fb_rt_code = fb_room_type.fb_rt_code
               LEFT JOIN fb_bed_remarks 
               ON fb_bed.fb_bdc_no = fb_bed_remarks.fb_bdc_no 
               AND fb_bed_remarks.fb_bed_status = 1 
               WHERE fb_bed.fb_bdc_occup = "N"
               
            `,
            []
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
            fb_bd_code,
            fb_bdc_no,
            fb_ns_code,
            fb_bed_reason,
            fb_bed_remarks,
            fb_bed_status,
            create_user
            ) 
            VALUES(?,?,?,?,?,?,?,?)
            `,
            [
                data.fb_bed_slno,
                data.fb_bd_code,
                data.fb_bdc_no,
                data.fb_ns_code,
                data.fb_bed_reason,
                data.fb_bed_remarks,
                data.fb_bed_status,
                data.create_user
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
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
    getempdetail: (data, callBack) => {
        pool.query(
            `select em_department,em_dept_section from co_employee_master where em_id = ?`,
            [
                data
            ]
            , (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    }
}





