
const { pool } = require('../../config/database')


/* ===================== COMMON TERMS ===================== */

const insertCommonTerms = (conn, table, woMainSlno, data) => {
    if (!data?.terms || data.terms.length === 0) {
        return Promise.resolve();
    }

    const values = data.terms.map(term => [
        woMainSlno,
        data.validUpto,
        term,
        data.loginId
    ]);

    return new Promise((resolve, reject) => {
        conn.query(
            `INSERT INTO ${table}
        (wo_main_slno, wo_valid_date,term_desc, create_user)
       VALUES ?`,
            [values],
            (err) => {
                if (err) return reject(err);
                resolve();
            }
        );
    });
};

/* ===================== MAIN SERVICES ===================== */

const getCRFDatas = (callback) => {
    pool.query(
        `SELECT req_date,request_deptsec_slno,expected_date,req_slno,
            work_order_status,crm_request_master.company_slno,
            sec_name,company_name
     FROM crm_request_master
     LEFT JOIN co_deptsec_mast U 
       ON U.sec_id = crm_request_master.user_deptsec  
     LEFT JOIN crm_company_master C 
       ON crm_request_master.company_slno = C.company_slno
     WHERE work_order_status = 1`,
        [],
        (error, results) => {
            if (error) return callback(error);
            callback(null, results);
        }
    );
};

const insertWorkOrderMain = (conn, vendor) => {
    return new Promise((resolve, reject) => {
        conn.query(
            `INSERT INTO work_order_main_tbl
       (wo_type, wo_number, wo_date, wo_fromdate, wo_todate,
        vendor_slno, vendor_desc,bom_regno,bom_req_date,
         req_dept, create_user)
       VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
            [
                vendor.contract_type,
                vendor.wo_number,
                vendor.wod,
                vendor.from_date,
                vendor.to_date,
                vendor.vendor_slno,
                vendor.vendor_desc,
                vendor.crf_no,
                vendor.req_date,
                vendor.sec_name,
                vendor.loginId
            ],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        );
    });
};

// const insertWorkOrderMain = async (conn, vendor) => {
//     const result = await new Promise((resolve, reject) => {
//         conn.query(
//             `INSERT INTO work_order_main_tbl
//             (wo_type, wo_date, wo_fromdate, wo_todate,
//              vendor_slno, vendor_desc, bom_regno, bom_req_date,
//              req_dept, create_user)
//             VALUES (?,?,?,?,?,?,?,?,?,?)`,
//             [
//                 vendor.contract_type,
//                 vendor.wod,
//                 vendor.from_date,
//                 vendor.to_date,
//                 vendor.vendor_slno,
//                 vendor.vendor_desc,
//                 vendor.crf_no,
//                 vendor.req_date,
//                 vendor.sec_name,
//                 vendor.loginId
//             ],
//             (err, result) => {
//                 if (err) reject(err);
//                 resolve(result);
//             }
//         );
//     });

//     // const woSlno = result.insertId;
//     // const year = new Date().getFullYear();
//     // const woNumber = `WO-${year}-${String(woSlno).padStart(5, '0')}`;

//     // await conn.query(
//     //     `UPDATE work_order_main_tbl SET wo_number = ? WHERE wo_slno = ?`,
//     //     [woNumber, woSlno]
//     // );

//     // return woNumber;
// };



const insertMaterialDetails = (conn, woMainSlno, materials) => {
    if (!materials?.length) return Promise.resolve();

    const values = materials.map(m => [
        woMainSlno,
        m.item_name,
        m.item_code,
        m.brand,
        m.qty,
        m.uom,
        m.unit_price,
        m.gst_amount,
        m.total_amount,
        m.gross_amount,
        m.loginId
    ]);
    return new Promise((resolve, reject) => {
        conn.query(
            `INSERT INTO wo_material_details
       (wo_main_slno, item_name, item_code, item_brand,item_oty,
         umo, unit_price, gst_amt, total_amt, gross_amt, create_user)
       VALUES ?`,
            [values],
            (err) => err ? reject(err) : resolve()
        );
    });
};

const insertLabourDetails = (conn, woMainSlno, labours) => {
    if (!labours?.length) return Promise.resolve();

    const values = labours.map(l => [
        woMainSlno,
        l.description,
        l.specification,
        l.rate_unit,
        l.unit_rate,
        l.quantity,
        l.total_amount,
        l.loginId
    ]);

    return new Promise((resolve, reject) => {
        conn.query(
            `INSERT INTO wo_labour_details
       (wo_main_slno, labour_desc, specifications, rate_type,
        unit_rate, qty, total, create_user)
       VALUES ?`,
            [values],
            (err) => err ? reject(err) : resolve()
        );
    });
};

const insertRetentionDetails = (conn, woMainSlno, retention) => {
    if (!retention?.amount) return Promise.resolve();

    return new Promise((resolve, reject) => {
        conn.query(
            `INSERT INTO wo_rentention_details
       (wo_main_slno, rent_description, rent_payment_type, rent_amount, create_user)
       VALUES (?,?,?,?,?)`,
            [
                woMainSlno,
                retention.description,
                retention.payment_type,
                retention.amount,
                retention.loginId
            ],
            (err) => err ? reject(err) : resolve()
        );
    });
};

/* ===================== TERMS HELPERS ===================== */

const insertTerms = (conn, woMainSlno, data) =>
    insertCommonTerms(conn, 'wo_terms_conditions', woMainSlno, data);

const insertPaymentTerms = (conn, woMainSlno, data) =>
    insertCommonTerms(conn, 'wo_payment_terms_conditions', woMainSlno, data);

const insertBillingTerms = (conn, woMainSlno, data) =>
    insertCommonTerms(conn, 'wo_billing_terms_conditions', woMainSlno, data);


/* ===================== EXPORT ONCE ===================== */
module.exports = {
    getCRFDatas,
    insertWorkOrderMain,
    insertMaterialDetails,
    insertLabourDetails,
    insertRetentionDetails,
    insertTerms,
    insertPaymentTerms,
    insertBillingTerms,

    // getWorkOrderDetails: (callBack) => {
    //     const query = `
    //    SELECT
    //         w.wo_slno,
    //         w.wo_type,
    //         w.wo_number,
    //         w.wo_date,
    //         w.wo_fromdate,
    //         w.wo_todate,
    //         w.vendor_slno,
    //         w.vendor_desc,
    //         w.bom_regno,
    //         w.bom_req_date,
    //         w.req_dept,
    //         w.create_user,
    //         w.create_date,
    //         w.edit_user,
    //         w.edit_date,
    //         w.wo_current_level,
    //         w.wo_current_level_review_status,
    //         v.it_supplier_name,
    //         c.sec_name
    //     FROM work_order_main_tbl w
    //     LEFT JOIN it_bill_supplier_details_mast v ON v.it_supplier_slno = w.vendor_slno
    // 	LEFT JOIN co_deptsec_mast c ON c.sec_id = w.req_dept
    //     ORDER BY w.create_date DESC
    // `;

    //     pool.query(query, (error, results) => {
    //         if (error) {
    //             return callBack(error);
    //         }
    //         return callBack(null, results);
    //     });
    // },

    getWorkOrderDetails: (level_no, callBack) => {
        const query = `
        SELECT
            w.wo_slno,
            w.wo_type,
            w.wo_number,
            w.wo_date,
            w.wo_fromdate,
            w.wo_todate,
            w.vendor_slno,
            w.vendor_desc,
            w.bom_regno,
            w.bom_req_date,
            w.req_dept,
            w.create_user,
            w.create_date,
            w.edit_user,
            w.edit_date,
            w.wo_current_level,
            w.wo_current_level_review_status,
            v.it_supplier_name,
            c.sec_name
        FROM work_order_main_tbl w
        LEFT JOIN it_bill_supplier_details_mast v 
            ON v.it_supplier_slno = w.vendor_slno
        LEFT JOIN co_deptsec_mast c 
            ON c.sec_id = w.req_dept
        WHERE w.wo_current_level = ?
        ORDER BY w.create_date DESC
    `;

        pool.query(query, [level_no], (error, results) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, results);
        });
    },

    getmaterialData: (id, callBack) => {
        const sql = `
  SELECT 
    w.*,

    -- Material Details
    (SELECT JSON_ARRAYAGG(
        JSON_OBJECT(
            'wom_slno', m.wom_slno,
            'item_name', m.item_name,
            'item_code', m.item_code,
            'item_brand', m.item_brand,
            'item_oty', m.item_oty,
            'umo', m.umo,
            'unit_price', m.unit_price,
            'gst_amt', m.gst_amt,
            'total_amt', m.total_amt,
            'gross_amt', m.gross_amt
        )
    ) FROM meliora.wo_material_details m WHERE m.wo_main_slno = w.wo_slno) AS material_details,

    -- Labour Details
    (SELECT JSON_ARRAYAGG(
        JSON_OBJECT(
            'wol_slno', l.wol_slno,
            'labour_desc', l.labour_desc,
            'specifications', l.specifications,
            'rate_type', l.rate_type,
            'unit_rate', l.unit_rate,
            'qty', l.qty,
            'total', l.total
        )
    ) FROM meliora.wo_labour_details l WHERE l.wo_main_slno = w.wo_slno) AS labour_details,

    -- Retention Details
    (SELECT JSON_ARRAYAGG(
        JSON_OBJECT(
            'wor_slno', r.wor_slno,
            'rent_description', r.rent_description,
            'rent_payment_type', r.rent_payment_type,
            'rent_amount', r.rent_amount
        )
    ) FROM meliora.wo_rentention_details r WHERE r.wo_main_slno = w.wo_slno) AS retention_details,

    -- Terms Conditions
    (SELECT JSON_ARRAYAGG(
        JSON_OBJECT(
            'wot_slno', t.wot_slno,
            'wo_valid_date', t.wo_valid_date,
            'term_desc', t.term_desc
        )
    ) FROM meliora.wo_terms_conditions t WHERE t.wo_main_slno = w.wo_slno) AS terms_conditions,

    -- Payment Terms
    (SELECT JSON_ARRAYAGG(
        JSON_OBJECT(
            'wop_slno', p.wop_slno,
            'wo_valid_date', p.wo_valid_date,
            'term_desc', p.term_desc
        )
    ) FROM meliora.wo_payment_terms_conditions p WHERE p.wo_main_slno = w.wo_slno) AS payment_terms,

    -- Billing Terms
    (SELECT JSON_ARRAYAGG(
        JSON_OBJECT(
            'wob_slno', b.wob_slno,
            'wo_main_slno', b.wo_main_slno,
            'wo_valid_date', b.wo_valid_date,
            'term_desc', b.term_desc
        )
    )
    FROM meliora.wo_billing_terms_conditions b
    WHERE b.wo_main_slno = w.wo_slno
    ) AS billing_terms

FROM meliora.work_order_main_tbl w
WHERE w.wo_slno = ?
    `;

        pool.query(sql, [id], (error, results) => {
            if (error) {
                return callBack(error);
            }

            // Parse JSON fields into arrays, handle NULL safely
            const formattedResults = results.map(row => ({
                wo_slno: row.wo_slno,
                material_details: row.material_details ? JSON.parse(row.material_details) : [],
                labour_details: row.labour_details ? JSON.parse(row.labour_details) : [],
                retention_details: row.retention_details ? JSON.parse(row.retention_details) : [],
                terms_conditions: row.terms_conditions ? JSON.parse(row.terms_conditions) : [],
                payment_terms: row.payment_terms ? JSON.parse(row.payment_terms) : [],
                billing_terms: row.billing_terms ? JSON.parse(row.billing_terms) : []
            }));

            return callBack(null, formattedResults);
        });
    },

    getLastWoNumber: (callBack) => {
        const query = `
       SELECT *
       FROM work_order_main_tbl
       ORDER BY wo_slno DESC
       LIMIT 1
    `;
        pool.query(query, (error, results) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, results);
        });
    },
    woLevelApproval: (data, callback) => {
        pool.query(
            `INSERT INTO wo_approval_log_tbl
            ( 
             wo_no,wo_approval_remark,wo_approval_level_name,wo_appproval_level_no,wo_level_review_state,wo_approval_user)
            VALUES(?,?,?,?,?,?,?)`,
            [
                wo_slno,
                remarks,
                level_name,
                level_no,
                review_status,
                empid
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    updateWoApprovalStatus: (data, callback) => {
        pool.query(
            `UPDATE work_order_main_tbl
             SET
             wo_current_level=?,
             wo_current_level_review_status=?
             where wo_slno=?`,
            [
                data.rate_variation_slno,
                data.grn_no,
                data.item_name,
                data.comment,
                data.Cmt_Dept,
                data.loginId,
                data.selectedAction
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
};

