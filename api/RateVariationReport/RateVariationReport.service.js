const { pool } = require('../../config/database')
module.exports = {

    checkInsertVal: (data, callback) => {
        const values = data.map(item => [item.grn_no, item.item_name]);
        pool.query(
            `SELECT grn_no, item_name
         FROM rate_variation_report
         WHERE (grn_no, item_name) IN (?)`,
            [values],
            (error, results) => {
                if (error) return callback(error);
                return callback(null, results);
            }
        );
    },

    insertRateVariationBulkService: (data, callback) => {

        const values = data.map(item => [
            item.grn_no,
            item.grn_date,
            item.item_name,
            item.grn_rate,
            item.grn_selling_rate,
            item.grn_dis,
            item.rate,
            item.disc,
            item.po_margin,
            item.rate_variation,
            item.quo_margin,
            item.purchase_margin,
            item.margin_diff,
            item.grn_variation_qty,
            item.grn_variation_free,
            item.date_diff,
            item.disc_variation,
            item.create_user
        ]);

        pool.query(
            `INSERT INTO rate_variation_report
        (
          grn_no, grn_date, item_name, grn_rate, grn_selling_rate, grn_dis,
          rate, disc, po_margin, rate_variation, quo_margin, purchase_margin,
          margin_diff, grn_variation_qty, grn_variation_free,
          date_diff, disc_variation, create_user
        )
        VALUES ?`,
            [values],
            (error, results) => {
                if (error) return callback(error);
                return callback(null, results);
            }
        );
    },

    selectRateVariation: (callBack) => {
        pool.query(
            ` SELECT slno, grn_no, grn_date, item_name, grn_rate, grn_selling_rate, grn_dis, rate, disc,supplier_name,po_margin, rate_variation, quo_margin, purchase_margin, ROUND(margin_diff, 0) AS margin_diff, grn_variation_qty, grn_variation_free,
            date_diff, disc_variation, create_date, update_date, create_user, edit_user,comments FROM rate_variation_report where resolved_status=0
                   `, [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    insertComment: (data, callback) => {
        pool.query(
            `INSERT INTO rate_variation_comment_tbl
            ( 
             rate_variation_report_slno, cmt_grn_no, cmt_item_name, comment, cmt_done_by, cmt_user ,cmt_status)
            VALUES(?,?,?,?,?,?,?)`,
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
    getCommentsbyID: (id, callBack) => {
        pool.query(
            `SELECT cmt_slno, rate_variation_report_slno, cmt_grn_no, cmt_item_name, comment, cmt_done_by, cmt_user, cmt_date
             FROM rate_variation_comment_tbl where rate_variation_report_slno=?
             `, [id],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    updateRateVariationReport: (data, callback) => {
        pool.query(
            `UPDATE rate_variation_report SET
            comments= ?,
            resolved_status=?
            WHERE
            slno = ?`,
            [data.selectedAction, data.checkResolved, data.rate_variation_slno],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    RateVarWithMarginDiff: (data, callback) => {
        pool.query(
            `INSERT INTO rate_variation_with_margin_diff_report
            ( 
              grn_no, grn_date, item_name, grn_rate, grn_selling_rate, grn_dis, rate, disc,po_margin, rate_variation, quo_margin, purchase_margin, margin_diff, grn_variation_qty, grn_variation_free, date_diff, disc_variation,create_user
            )
            VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.grn_no,
                data.grn_date,
                data.item_name,
                data.grn_rate,
                data.grn_selling_rate,
                data.grn_dis,
                data.rate,
                data.disc,
                data.po_margin,
                data.rate_variation,
                data.quo_margin,
                data.purchase_margin,
                data.margin_diff,
                data.grn_variation_qty,
                data.grn_variation_free,
                data.date_diff,
                data.disc_variation,
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

    checkInsertValofMarginDiff: (data, callBack) => {
        pool.query(
            `SELECT grn_no,
            item_name
            FROM rate_variation_with_margin_diff_report
            WHERE grn_no=? and item_name=?`,
            [
                data.grn_no,
                data.item_name, ,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },

    ratevariationResolvedList: (callBack) => {
        pool.query(
            `SELECT * FROM rate_variation_report where resolved_status=1`, [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

}



